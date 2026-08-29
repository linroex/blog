---
title: "WordPress安裝教學 － 全球最多人使用的部落格(Blog)架站軟體(此教學適用於WP2.9以下版本)"
date: 2010-05-31T11:02:53
slug: "wordpress-installation-tutorial"
aliases: ["/posts/wordpress%e5%ae%89%e8%a3%9d%e6%95%99%e5%ad%b8-%ef%bc%8d-%e5%85%a8%e7%90%83%e6%9c%80%e5%a4%9a%e4%ba%ba%e4%bd%bf%e7%94%a8%e7%9a%84%e9%83%a8%e8%90%bd%e6%a0%bcblog%e6%9e%b6%e7%ab%99%e8%bb%9f%e9%ab%94/"]
tags: ["PHP", "WordPress", "Blog", "CPanel"]
categories: ["WordPress"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/wordpress-logo-stacked-rgb.png"><img class="alignnone size-full wp-image-3200" title="wordpress-logo-stacked-rgb" src="{{< param imageBase >}}/wp-content/uploads/2010/05/wordpress-logo-stacked-rgb.png" alt="" width="350" height="217" /></a>

<del datetime="2010-05-29T07:06:50+00:00">你問我愛你有多深?我愛你有幾分? </del> (誤~)  你問我這世界上我認為最好用的部落格架站成是是什麼? 我一定告訴你是WordPress,並非因為我自己的網誌是用WordPress架設才這樣說,當初在選擇要用甚麼軟體來架設逐風者時我有考慮用Xoops這類程式搭配外掛來建構Blog,後來也試過LifeType這套學校所使用的部落格架站程式,可是都不是很好用,尤其是LifeType這套程式的介面真的讓人很受不了,十分不人性化,搞得我們英文老師三不五時來問我怎麼看回覆,怎麼發文章............ 而且LifeType的擴充性也沒有WordPress這麼好,反正就是WordPress最好啦^^ 不信的話你可以安裝看看呀~~


<!--more-->


註:再架設WordPress之前建議你至少對網路要有點了解,雖然WordPress強調簡單.直覺,但還是需要一點基礎才能搞好的

再架設WordPress之前請各位先準備好一個空間來架網站,你可以去購買虛擬主機或是使用免費的主機,也可以自己架設主機(不建議,除非你是高手),不過你用的是哪種主機都必須要支援PHP.Mysql以及Apache,基本上每間虛擬主機都有支援這三種服務,但是你最好還是注意一下以免受騙
<h2>WordPress特色</h2>
<ul>
	<li>擴充性高,有很多免費外掛</li>
	<li>有很多免費&amp;付費的佈景(theme)</li>
	<li>安裝WordPress主程式以及外掛.佈景十分簡單</li>
	<li>比起BSP(無名.痞客幫)自由度更高</li>
</ul>
<h2>WordPress資訊</h2>
<ul>
	<li>官方網站: <a href="http://wordpress.org/">http://wordpress.org/</a></li>
	<li>中文網站: <a href="http://tw.wordpress.org/">http://tw.wordpress.org/</a></li>
	<li>主程式+繁體中文語系載點(2.9.2版): <a href="http://tw.wordpress.org/wordpress-2.9.2-zh_TW.zip">官方</a> |  <a href="http://www.4shared.com/file/mpVUzgmI/wordpress-292-zh_TW.html ">4Shared</a> | <a href="http://www.box.net/shared/xpfi7btf9a">Box.net</a></li>
</ul>
<h2>WordPress安裝教學</h2>
1.首先請準備好一個虛擬主機,進入到後台,輸入帳號&amp;密碼再按【Login】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_095949.jpg"><img class="alignnone size-large wp-image-3211" title="2010-05-31_095949" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_095949-500x303.jpg" alt="" width="500" height="303" /></a>

2.點選【MySQL Databases】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100415.jpg"><img class="alignnone size-large wp-image-3212" title="2010-05-31_100415" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100415-500x303.jpg" alt="" width="500" height="303" /></a>

3.在【Create a NEW database::】那裏輸入資料庫名稱,然後按【Create database】創建新資料庫

<span style="color: #ff0000;"><strong>P.S.部分主機商會讓你自己設定資料庫帳號密碼,部分主機商則是預設好的,看當初你申請虛擬主機時主機商寄給你的信是怎麼寫的,像我這間就是預設</strong></span>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100911.jpg"><img class="alignnone size-large wp-image-3213" title="2010-05-31_100911" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100911-500x303.jpg" alt="" width="500" height="303" /></a>

4.建立完資料庫以後開啟FTP程式(沒裝FTP的人也可以用線上版的<a href="http://www.net2ftp.com/">net2ftp</a>),然後把WP的檔案上傳上去你的資料庫

<span style="color: #ff0000;"><strong>P.S.你登入虛擬主機的FTP之後可能會發現有一個資料夾叫做htdocs,如果有這個資料夾你就把WordPress的主程式都上傳到那個資料夾中,如果沒有這個資料夾就直接上傳到根目錄即可</strong></span>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_102025.jpg"><img class="alignnone size-large wp-image-3214" title="2010-05-31_102025" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_102025-500x303.jpg" alt="" width="500" height="303" /></a>

5.上傳完成之後開啟瀏覽器(Chrome.IE.Firefox.....)輸入你的網站網址,然後按一下【Create a Configuration File】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104056.jpg"><img class="alignnone size-large wp-image-3217" title="2010-05-31_104056" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104056-500x303.jpg" alt="" width="500" height="303" /></a>

6.按一下【開始】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104240.jpg"><img class="alignnone size-large wp-image-3218" title="2010-05-31_104240" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104240-500x303.jpg" alt="" width="500" height="303" /></a>

7.輸入資料庫的相關資訊,資料庫前前綴與主機位址『基本上』不用改,維持預設值即可,設定完之後按【送出】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104706.jpg"><img class="alignnone size-large wp-image-3220" title="2010-05-31_104706" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104706-500x303.jpg" alt="" width="500" height="303" /></a>

按送出之後如果出現下圖代表你資料庫的資訊填錯了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104811.jpg"><img class="alignnone size-large wp-image-3221" title="2010-05-31_104811" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104811-500x303.jpg" alt="" width="500" height="303" /></a>

8.輸入你Blog的站名還有你個人的信箱然後按安裝WordPress即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105104.jpg"><img class="alignnone size-large wp-image-3222" title="2010-05-31_105104" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105104-500x303.jpg" alt="" width="500" height="303" /></a>

9.這裡會顯示出你的登入帳號以及密碼,密碼是系統隨機產生的,按一下登入,等等可以到後台去修改

<strong><span style="color: #ff0000;">P.S.WordPress3.0就可以讓使用者自行設定帳號以及密碼了</span></strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105338.jpg"><img class="alignnone size-large wp-image-3223" title="2010-05-31_105338" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105338-500x303.jpg" alt="" width="500" height="303" /></a>

10.輸入帳號還有剛剛系統給你的密碼,下面我會教各位如何去改密碼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105450.jpg"><img class="alignnone size-large wp-image-3224" title="2010-05-31_105450" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105450-500x303.jpg" alt="" width="500" height="303" /></a>

11.依序點選帳號個人資訊,然後在個人履歷的新密碼那裏輸入你要的密碼,設定完後按更新個人資訊

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105844.jpg"><img class="alignnone size-large wp-image-3225" title="2010-05-31_105844" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105844-500x303.jpg" alt="" width="500" height="303" /></a>

完成~~我之後還會再寫WordPress的佈景與外掛安裝教學,大家有看不懂的地方可以留言問我
