---
title: "Elasticsearch、Kibana 使用者認證設定"
date: 2017-01-15T10:00:51
slug: "elasticsearch-kibana-user-auth"
aliases: ["/posts/elasticsearch%e3%80%81kibana-%e4%bd%bf%e7%94%a8%e8%80%85%e8%aa%8d%e8%ad%89%e8%a8%ad%e5%ae%9a/"]
tags: ["Elasticsearch", "Kibana"]
categories: ["SRE"]
---

當你將 Elasticsearch 和 Kibana 安裝完後，你會發現一個十分嚴重的問題：「咦，帳號密碼勒？」沒錯，Elasticsearch 和 Kibana 是沒有提供一般常見的使用者模組，你只能透過 Bind IP 或是 Bind Port 的方式設定內網使用，但如果你跟敝公司一樣沒有固定 IP，或是你想要設定幾組帳密來使用的話，就繼續讀下去吧，這篇文章將會分享當 Elasticsearch 和 Kibana 的基本使用者認證該如何設定，採用 HTTP Auth 的方式。


<!--more-->


當然，你也可以選擇 X-Pack 來做權限管控，這是由官方所推出的外掛，可以讓你細分每個用戶的權限，可以給 Elasticsearch 和 Kibana 使用，但有個小問題：「X-Pack 是要錢的」 ，我最開始也是用 X-Pack，過了 30 天被禁止登入 Kibana 才知道原來 X-Pack 是付費的，如果你一開始也裝了 X-Pack 可以參考【<a href="https://coder.tw/?p=7238">WTF Elastic X-Pack License - How to uninstall X-Pack</a>】這篇文章先移除它，否則你根本無法登入 Kibana。

我的需求，需要讓 Kibana 和 Elasticsearch 可以和網際網路溝通，所以不能直接鎖在內網或某個網段；如果你的 Kibana 和 Elasticsearch 只需要內網使用，且不需要太複雜的權限功能或是紀錄誰有登入的話，可以考慮用 VPC 的方式直接把他們綁定一個網段來使用。

在架構上，透過 Nginx 作為出入口，所有的請求都直接發送到 Nginx，再讓 Nginx 轉發給 Elasticsearch （或是 Kibana），並設定 Elasticsearch 和 Kibana 鎖定 127.0.0.1；針對 Nginx 的部分設定 HTTP Basic Auth 來做驗證，這樣設定的好處是 Elasticsearch 本身的 API 是支援 HTTP Auth 的，所以你不需要再特別去修改程式。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Window_和_email_backer-founder_com.png"><img class="alignnone size-full wp-image-7236" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Window_和_email_backer-founder_com.png" alt="" width="401" height="242" /></a>

甚至更延伸，如果需要紀錄使用者的登入狀況、帳號密碼直接串連資料庫等等，也可以搭配 Lua 在 Nginx 上面進行程式撰寫，可參考 <a href="https://github.com/openresty/lua-nginx-module#readme">lua-nginx-module</a>。
<h2>動工</h2>
首先，請將 Elasticsearch 設定為 localhost only，打開 /etc/elasticsearch/elasticsearch.yml 並進行找到以下參數將行設定（請勿直接增加，大約在 55 行有，請將註解移除）：
<pre>#/etc/elasticsearch/elasticsearch.yml

network.host: 127.0.0.1
http.port: 9200</pre>
同樣的將 Kibana 也設為 localhost only
<pre>#/etc/kibana/kibana.yml

server.port: 5601
server.host: "127.0.0.1"</pre>
設定完成後記得重開 Kibana 和 Elasticsearch 才會生效哦，可以檢查一下是否在外網真的無法連線。
<pre>service elasticsearch restart
service kibana restart</pre>
我們讓 Nginx 當我們對外的入口，所以需要安裝 Nginx
<pre>sudo apt-get install nginx</pre>
接著把 /etc/nginx/sites-enabled 的 default 內容改成下面的內容：
<pre>#/etc/nginx/sites-enabled/default

server {
 listen 80;

 auth_basic "Kibana Auth";
 auth_basic_user_file /etc/nginx/passwd/kibana.passwd;

  location / {
    proxy_pass http://127.0.0.1:5601;
    proxy_redirect off;
  }
}

server {
 listen 9201;

 auth_basic "Elasticsearch Auth";
 auth_basic_user_file /etc/nginx/passwd/elasticsearch.passwd;

  location / {
    proxy_pass http://127.0.0.1:9200;
    proxy_redirect off;
  }
}

</pre>
上面的設定檔，讓 Nginx 可以接收外面的請求，並轉發到內部指定的 Port，此外使用 HTTP Basic Auth 來做最基本的登入限制。

接著我們要來建立密碼檔，讓 Nginx 知道有哪些帳號密碼，請安裝 Apache 的工具組：
<pre>sudo apt-get install apache2-utils</pre>
接著使用如下指令來建立密碼檔，user_name 的部分記得改成自己想要的，指令輸入後，系統會問你要設定的密碼，密碼會用 Hash 方式儲存，所以雖然是檔案也不用太擔心他的安危。
<pre>sudo htpasswd -c /etc/nginx/passwd/elasticsearch.passwd user_name
sudo htpasswd -c /etc/nginx/passwd/kibana.passwd user_name</pre>
可以設定多組帳密，方法就是把 -c 參數拿掉，因為 -c 代表 create，如果有它，密碼檔就會被覆蓋掉。
<pre>sudo htpasswd /etc/nginx/passwd/kibana.passwd userA
sudo htpasswd /etc/nginx/passwd/kibana.passwd userB</pre>
完成後記得把 Nginx 重新啟動，就可以去試試看 Elasticsearch 有沒有生效囉（先不用測試 Kibana，因為尚未完成）；如果遇到問題，比如設定明明正確卻沒有作用，可以去檢查相關服務的 Log，我自己遇到的狀況是指定的 Port 已經被使用，那就只好換一個 Port 來用囉！ 也可能是密碼檔的位置錯誤，

連線到 Elasticsearch 時可以用這樣的格式來連線：

http://username:password@192.168.0.1:9201

接著最後一小步，如果你的 Kibana 和 Elasticsearch 位在不同機器，因為我們幫 Elasticsearch 設定驗證的關係，所以 Kibana 無法和 ES 建立連線，同樣編輯 kibana.yml 進行設定（不要直接新增，去尋找然後修改）。當然，如果你是在同一台機器上就不用在做這邊的設定囉。
<pre># /etc/kibana/kibana.yml

elasticsearch.url: "http://192.168.0.1:9201"

elasticsearch.username: "username"
elasticsearch.password: "password"</pre>
&nbsp;
