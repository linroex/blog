---
title: "手動編譯、安裝PHP Extension （Linux）"
date: 2012-01-26T16:53:57
slug: "compile-install-php-extension-linux"
aliases: ["/posts/%e6%89%8b%e5%8b%95%e7%b7%a8%e8%ad%af%e3%80%81%e5%ae%89%e8%a3%9dphp-extension-%ef%bc%88linux%ef%bc%89/"]
tags: ["PHP", "Linux"]
categories: ["SRE"]
---

如果要幫PHP安裝Extension的話要怎麼做呢？很多人都會回答Pecl，這的確是一個很方便的安裝Extension的方式，不過如果你的Server上面沒有Pecl怎麼辦呢？ 然後又因為某些原因不能安裝Pecl，這時候你就只好手動去編譯、安裝囉～ 而這篇文章也就是要教大家如何手動編譯PHP Extension在Linux上面


<!--more-->


上面講的「不能安裝Pecl」的情況可能發生嘛？像我是用傻瓜包架站的，就可能遇到這種問題，前一陣子因為要安裝Mongodb的PHP Driver，但是我的Server上面安裝的是LNMP懶人包，他沒有內建Pecl，如果手動安裝Pecl又會把原本LNMP的一些程式覆蓋掉，這時候你就可以手動編譯Extension啦～～
<h2>手動編譯PHP Extension教學</h2>
1.要自行編譯PHP Extension，第一步當然就是要先取得原始碼囉～

個人推薦大家到Pecl的網站（<a href="http://pecl.php.net/">http://pecl.php.net</a>）下載PHP Extension的原始碼，這裡我就用Mongodb driver來做示範
<blockquote>wget -c http://pecl.php.net/get/mongo-1.2.7.tgz

tar -zxf mongo-1.2.7.tgz

cd mongo-1.2.7</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163751.jpg"><img class="aligncenter size-large wp-image-826" title="2012-01-26_163751" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163751-540x382.jpg" alt="" width="540" height="382" /></a>

2.執行phpize這隻程式來做初始化
<blockquote>phpize</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163941.jpg"><img class="aligncenter size-large wp-image-827" title="2012-01-26_163941" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163941-540x382.jpg" alt="" width="540" height="382" /></a>

3.設定configure資訊，$PATH=php-config的位置，預設是在PHP根目錄的bin資料夾裡面
<blockquote>./configure --with-php-config=$PATH</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164501.jpg"><img class="aligncenter size-large wp-image-828" title="2012-01-26_164501" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164501-540x382.jpg" alt="" width="540" height="382" /></a>

4.開始編譯囉～ 指令：
<blockquote>make &amp;&amp; make install</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164638.jpg"><img class="aligncenter size-large wp-image-829" title="2012-01-26_164638" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164638-540x382.jpg" alt="" width="540" height="382" /></a>

5.編譯完成，mongo.so檔會自動存到PHP Extension裡面

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164741.jpg"><img class="aligncenter size-large wp-image-830" title="2012-01-26_164741" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164741-540x382.jpg" alt="" width="540" height="382" /></a>

6.編輯php.ini，然後加入一行：
<blockquote>vi php.ini

extension="mongo.so"</blockquote>
mongo.so的那邊可以換成你安裝的Extension的so檔名稱

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165033.jpg"><img class="aligncenter size-large wp-image-831" title="2012-01-26_165033" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165033-540x319.jpg" alt="" width="540" height="319" /></a>

7.最後，重新啟動apache，然後去看你的phpinfo()檔，就可以知道有沒有安裝成功囉～

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165248.jpg"><img class="aligncenter size-large wp-image-832" title="2012-01-26_165248" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165248-529x540.jpg" alt="" width="529" height="540" /></a>

參考文章：<a href="http://mattiasgeniar.be/2008/09/14/how-to-compile-and-install-php-extensions-from-source/" target="_blank">http://mattiasgeniar.be/2008/09/14/how-to-compile-and-install-php-extensions-from-source/</a>
