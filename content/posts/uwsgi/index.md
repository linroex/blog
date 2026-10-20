---
title: "uWSGI"
date: 2015-07-24T19:17:45
slug: "uwsgi"
tags: ["Python", "uWSGI"]
categories: ["SRE"]
---

<h1>介紹</h1>
uWSGI 是一種協議，同時它也是一個程式。

為什麼這麼複雜？從程式講起吧，uWSGI 這個程式最初是為了讓 Python 所撰寫的 Web Application 能夠跟 Nginx、Apache 等等的 Web Server 溝通而設計的，他採用自己設計的 uwsgi 通訊協議，此外他也支援 cgi、fastcgi、socket 等多種協議，所以除了服務 Python 之外，他也可以跟 PHP、Go 等等的程式語言整合。


<!--more-->
我目前理解 uWSGI 像是一個 Server，有出口跟入口，你可以透過他支援的各種協定丟資料進去，他會透過支援的各種 plugin 處理，像是 python、php 等等，處理完之後也會透過各種協定丟資料出來，這些資料可以轉發到 nginx、apache 或是直接噴出 http。

uWSGi 的原理跟 FastCGI 很類似，讓多個執行序常駐啟動，有任務進來時丟給這些執行序處理，處理完之後回傳。

Nginx 內建支援 uWSGi
uWSGI 還可以開 vhost
<h1>安裝</h1>
這邊我們安裝 python3 以及相關的工具，並使用 pip 安裝 uwsgi
<pre><code>$ sudo apt-get install python3 python3-pip python-dev build-essential
$ pip3 install --upgrade pip
$ pip3 install virtualenv uwsgi
</code></pre>
網路上的文章，有些會用 apt-get 直接安裝 uwsgi，但這樣的版本會很舊，建議用 pip 安裝。
此外，透過 apt-get 安裝最新版本的 Nginx
<pre><code>$ sudo apt-get install python-software-properties  
$ sudo add-apt-repository ppa:nginx/stable  
$ sudo apt-get update  
$ sudo apt-get install nginx  
</code></pre>
會這樣安裝，是因為 apt-get 內建的 nginx 版本太舊
<h1>設定</h1>
設定大致分成 Nginx 端的以及 uWSGI 端的，其運作流程如下圖

所有的流量會先進入 Nginx，其中如果是靜態需求，像是圖片、HTML、檔案等等，就由 Nginx 處理，如果是動態需求，例如 Python、PHP 等等，就轉發給 uWSGI 處理，uWSGI 處理完之後會再轉發回 Nginx。

這邊要設定的有
1. Nginx vHost
2. uWSGI vHost and forward

此外設定大概分成兩階段
1. 基本設定（Nginx、uWSGI）
2. 設定開機啟動、服務

首先來設定 Nginx 吧！

跟 Nginx 相關的主要是兩個資料夾：
<ul>
	<li>/etc/nginx/sites-available</li>
	<li>/etc/nginx/sites-enabled</li>
</ul>
是的，看起來跟 Apache 的 vhost 配置很像，但實際上，你要自己建立連結…. 換句話說只有在 sites-enabled 的設定檔會生效，available 的存在，只是方便你管理，你可以選擇建立在 available 裡面然後 link 到enabled，但我個人比較懶，就直接建立在 enabled 裡面。
<pre><code>$ sudo rm /etc/nginx/sites-available/default
$ sudo rm /etc/nginx/sites-enabled/default
$ cd /etc/nginx/sites-enabled
$ sudo vi demo.conf
</code></pre>
內容大致如下：
<pre><code>server {
    listen 80;
    server_name 52.68.0.97;
    charset utf-8;
    client_max_body_size 20M;

    location / {
        uwsgi_pass unix:/var/www/demo/demo.sock;
        # uwsgi_pass 127.0.0.1:8080;
        include uwsgi_params;
    }

     location /static {
          alias /var/www/demo/static;
     }
}
</code></pre>
設定檔很好理解，監聽某個 Port 跟 Domain，關鍵是在於 uwsgi_pass 那邊，當監聽的 port 跟 domain 有消息傳進來時，轉發給 uwsgi_pass 裡面設定的東西，有兩種設定方式，分別是直接讀娶對方建立的 scok file，或是直接用 socket 傳到指定的 port，uwsgi 會在那邊監聽。

這邊以 sock file 的方式設定，因為比較複雜

設定完之後存檔，記得重新啟動 Nginx
<pre><code>$ sudo service nginx restart
</code></pre>
接著，在 /var/www 裡面建立一個示範用的 python website (flask)，你會注意到這裡使用了 virtualenv，這是因為 uWSGI 支援載入不同的環境給每個 application，所以你的網站程式，可以用 python2 或是 python3 撰寫都不是問題哦！
<pre><code>$ sudo mkdir demo
$ sudo chown -R ubuntu:ubuntu demo
$ cd demo
$ virtualenv venv
$ source venv/bin/activate
$ pip install flask
$ vi hello_module.py
</code></pre>
在 hello_module.py 這個檔案裡面放入最基本的 Flask example: Hello world
<pre><code>from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
</code></pre>
建立完示範用的程式後，我們可以先用最簡單的 uwsgi command 來測試前面的所有設定是否成功，分段檢測有助於我們找出問題點。
<pre><code>$ uwsgi --module demo_module --callable app --http :1234 --venv /var/www/demo/venv
</code></pre>
這行指令會把 demo_module.py 當成一個模組給 uWSGI 載入，此外每當 Nginx 呼叫時，uWSGi 會去尋找 app 這個物件（callable），並且設定使用 http 協定在 1234 port 輸出，最後是設定所需要的 package 位置（–venv）

你可以在瀏覽器輸入 http://localhost:1234 即可檢視，如果你的伺服器在遠端，也可以用 SSH Proxy 建構通道來測試（ ssh -ND 2001 remote_server ）

這邊如果出問題的話，可以檢視 uWSGi 噴在螢幕上的訊息，通常都會有說明問題出在哪裡，基本上這邊出問題都跟 Nginx 無關，因為目前的設定，是用 uWSGi 來處理所有的封包，尚未跟 Nginx 串接

如果這邊測試沒問題，我們就可以用 cmd 的方式暫時把他跟 Nginx 接起來測試囉
<pre><code>$ uwsgi --module demo_module --callable app --socket /var/www/demo/demo.sock --chown-socket www-data:www-data --venv /var/www/demo/venv
</code></pre>
這段指令跟前一段類似，但多出：

–socket ：這個參數是設定要用 sock file 和 nginx 溝通的意思
– chown-socket ：設定產生出來的 sock file 權限，設為 www-data 因為這是 Nginx 的 User name

如果你前面設定和 Nginx 使用 Socket 溝通的話，「–socket」參數可以設為 127.0.0.1:8080，然後不用設定 chown-socket 參數

接著一樣打開瀏覽器，輸入 http://localhost:80 測試（之前在 Nginx 設定的 port），應該會看到 Hello World，如果沒有看到的話，你可以到 /var/log/nginx 檢查 log 看有沒有什麼錯誤，因為之前已經測試過 uWSGI 沒問題，所以這邊我們可以判定問題一定跟 Python、uWSGi 無關。

到這邊都順利的話，恭喜，我們要把剛剛的一大串參數轉成設定檔，uWSGi 支援多種設定檔格式包含 ini、xml、json 等等，這邊用 ini 做示範：
<pre><code>$ vi demo.config.ini
</code></pre>
寫入以下內容
<pre><code>[uwsgi]
chdir = /var/www/demo
module = demo_module
callable =  app
venv = /var/www/demo/venv
socket = /var/www/demo/demo.sock
chown-socket = www-data:www-data
</code></pre>
接者執行這行指令，如果你在瀏覽器上還能看到 Hello World 的話，恭喜你，大功告成！ 只差把 uWSGI 設為 daemon 囉！
<pre><code>$ sudo uwsgi --ini demo.config.ini
</code></pre>
暫時告一段落喝杯茶，緊接而來的，是把 uwsgi 設為開機啟動，這邊的作法很多，比如你可以撰寫一個 script，把他當成 Upstart service，這麼做的好處是你可以方便的開啟、關閉他，你也可以用 uWSGI Emperor 來處理，如果你有很多 app 要啟動的話（like Heroku），這邊用 Upstart service 做示範：
<pre><code>$ sudo vi /etc/init/uwsgi.conf
</code></pre>
內容如下：
<pre><code>description "uWSGI instance to serve myapp"

start on runlevel [2345]
stop on runlevel [!2345]

script
    cd /var/www/demo
    source venv/bin/activate
    exec /usr/local/bin/uwsgi --ini demo.config.ini
end script
</code></pre>
存檔後，你就可以把他當成 service 召喚囉
<pre><code>$ sudo service uwsgi start
</code></pre>
<h1>More config</h1>
這邊提供一些設定說明

Ref. <a href="http://uwsgi-docs.readthedocs.org/en/latest/Options.html">Offical Options Page</a>
Ref. <a href="http://www.cnblogs.com/zhouej/archive/2012/03/25/2379646.html">非官方中文設定翻譯</a>
<h2>推薦</h2>
設為主程序

master = true

設定子程序數

processes = 4

每個程序佔用實體記憶體超過時重啟程序

reload-on-rss = 80

每個程序佔用虛擬記憶體超過時重啟程序

reload-on-as = 80

限制每個程序的虛擬記憶體使用上限

limit-as = 120

當 uwsgi 關閉時，把他產生的 sock 文件一併移除

vacuum = true

uWSGI 產生的 Log 增加記憶體用量欄位

memory-report = true

啟動 vhost 用一個 process 執行多個網站

vhost = true

把 log 檔放在指定位置

logto = /var/log/uwsgi/pada.log

當有改變時，自動重新載入，不用人工重啟服務，後面設定的秒數是代表如果某個程序正在工作中，等待最多 N 秒強制關閉它

reload-mercy = 8
<h1>簡單效能優化</h1>
前面有提到 reload-on-rss 、processes 這些設定，處理的好，可以讓效能更好，處理不好就悲劇了，這邊簡單說明一下要怎麼設定

processes 數字越高，理論上處理的速度會越快
reload-on-rss 數字越低，理論上處理的速度會越慢

但這都只是理論，實際的數字要看你在 uWSGI 上面跑的程式需要耗用多少記憶體，以及你的機器有多少閒置記憶體可以使用

你可以把 memory-report 啟用，藉此觀察你的程式每次執行，大約消耗多少 memory，並將這個數字拉高一些設為 reload-on-rss，並且計算你的伺服器在執行完 nginx、linux 以及其他 service 後約剩多少記憶體，假設閒置有 500M 記憶體，先扣除保留用的 200M，則有 300M 可以給 uwsgi 使用，而程式每次執行會消耗 30M 的記憶體，則 processes 可以設為 10。
