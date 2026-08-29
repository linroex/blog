---
title: "十大WordPress安全設置技巧"
date: 2009-11-14T22:51:54
slug: "top-10-wordpress-security-tips"
aliases: ["/posts/%e3%80%90%e8%bd%89%e8%bc%89%e3%80%91%e5%8d%81%e5%a4%a7wordpress%e5%ae%89%e5%85%a8%e8%ae%be%e7%bd%ae%e6%8a%80%e5%b7%a7/"]
tags: ["WordPress"]
categories: ["WordPress"]
---

<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">正所謂樹大招風,WordPress是目前世界上最多人使用的部落格架站套件,自然也是全球駭客的攻擊目標,因此將WordPress的安全性提高是每一位站長都一定要做的事,雖然WordPress官方每隔一段時間就會出一次安全性更新,但是要保護好網站決的部份因素卻是要靠自己,日本某機構就曾經統計過,電腦災害(電腦被攻擊)的發生原因有很大部分來自於使用者的操作失當,而不是系統本身的問題,因此在這篇文章站長將借用大陸<a href="http://www.williamlong.info/archives/1617.html">月光博客</a>的一篇文章敎大家怎樣檢查自己的WordPress是否夠安全</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">
<!--more-->

</span></p>

<blockquote>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">以下內容引用自<a href="http://www.williamlong.info/archives/1617.html">http://www.williamlong.info/archives/1617.html</a></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>1、升級WordPress到最新版本</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">一般來說，新版本的WordPress安全性都會比老版本要好一些，並且解決了已知的各種安全性問題，特別當遇到重大的版本升級時，新版本可能會解決更多的關鍵性問題。</span> <span onmouseover="_tipon(this)" onmouseout="_tipoff()">（例如老版本WordPress有remv.php重大漏洞，可能會導致遭受DDoS攻擊，升級到最新2.7版本可解決這個問題）</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>2、隱藏WordPress版本</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">編輯你的header.php模板，將裡面關於WordPress的版本信息都刪除，這樣黑客就無法通過查看源代碼的防治得知你的WordPress有沒有升級到最新版本。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>3、更改WordPress用戶名</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">每個黑客都知道WordPress的管理員用戶是admin，具有管理員權限，會攻擊這個用戶，那麼你需要創建一個新用戶，將其設置為管理員權限，然後刪除老的admin帳號，這就能避免黑客猜測管理員的用戶名。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><span style="color: #ff0000;">站長補充</span></span></p>

<ol>
	<li><span style="color: #ff0000;">參考本文<a href="https://coder.tw/?p=2222"> </a></span><span style="color: #ff0000;"><a href="https://coder.tw/?p=2222">https://coder.tw/?p=2222</a></span></li>
	<li><span style="color: #ff0000;">另外如果你要手動修改,請記得要去修改wp-config.php的設定</span></li>
</ol>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>4、更改WordPress用戶密碼</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">安裝好WordPress後，系統會發送一個隨機密碼到你的信箱，修改這個密碼，因為這個密碼的長度只有6個字符，你要將密碼修改為10個字符以上的複雜密碼，並儘量使用字母、數字、符號相混合的密碼。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>5、防止WordPress目錄顯示</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">WordPress會默認安裝插件到/wp-content/plugins/目錄下，通常情況下直接瀏覽這個目錄會列出所有安裝的插件名，這很糟糕，因為黑客可以利用已知插件的漏洞進行攻擊，因此可以創建一個空的index.html文件放到這個目錄下，當然，修改Apache的.htaccess文件也可以起到相同的作用。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>6、保護wp-admin文件夾</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">你可以通過限定IP地址訪問WordPress管理員文件夾來進行保護，所有其他IP地址訪問都返回禁止訪問的信息，不過你也只能從一兩個地方進行博客管理。</span> <span onmouseover="_tipon(this)" onmouseout="_tipoff()">另外，你需要放一個新的.htaccess文件到wp-admin目錄下，防止根目錄下的.htaccess文件被替換。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>7、針對搜索引擎的保護</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">很多WordPress系統文件不需要被搜索引擎索引，因此修改你的robots.txt文件，增加一行「Disallow: /wp-*」</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><span style="color: #ff0000;">站長補充:robots.txt檔存在你的網站根目錄,它可以決定哪些檔案不被搜尋引擎收錄</span></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>8、安裝Login Lockdown插件</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><a style="text-decoration: underline; color: #4e0a13;" href="http://goo.gl/h4ap " target="_blank">這個插件</a>可以記錄失敗的登錄嘗試的IP地址和時間，如果來自某一個IP地址的這種失敗登錄超過一定條件，那麼系統將禁止這一IP地址繼續嘗試登錄。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>9、WordPress數據庫安全</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">數據表最好不要使用默認的wp_開頭，安裝數據庫備份插件，無論做了多少保護，你還是應該定期備份你的數據庫，使用WordPress Database Backup等插件可以實現數據庫的定期備份。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><span style="color: #ff0000;">站長補充:如果你在安裝時沒有修改掉wp_,那麼你可以手動去修改資料庫或使用</span><a href="https://coder.tw/?p=2222"><span style="color: #ff0000;">Wordpress Security Scan</span></a><span style="color: #ff0000;">來修改</span></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>10、安裝Wordpress Security Scan插件</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><a href="https://coder.tw/?p=2222">這個插件</a>會自動按照以上的安全建議對你的WordPress進行掃描，查找存在的問題，使用較為簡單。</span></p>
</blockquote>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">
</span></p>
