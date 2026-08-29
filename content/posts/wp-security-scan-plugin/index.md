---
title: "WP Security Scan - 掃描你的WordPress有沒有漏洞"
date: 2009-11-14T16:39:56
slug: "wp-security-scan-plugin"
aliases: ["/posts/wp-security-scan-%e6%8e%83%e6%8f%8f%e4%bd%a0%e7%9a%84wordpress%e6%9c%89%e6%b2%92%e6%9c%89%e6%bc%8f%e6%b4%9e/"]
tags: ["WordPress"]
categories: ["WordPress"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-27-06.jpg"><img class="size-medium wp-image-2223 aligncenter" title="2009-11-14 15 27 06" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-27-06-300x216.jpg" alt="2009-11-14 15 27 06" width="300" height="216" /></a></p>
WP Security Scan這套WordPress的外掛可以幫你掃描並提供你一些WordPress的漏洞,如果你的網站是自己架的我想你應該知道在架站前要先設定檔案屬性,也就是777.655這類的,WP Security Scan這個外掛的功能其實就是幫你檢查檔案屬性有沒有設定好,還有WP Security Scan可以幫你檢查及修改資料庫的前置詞,很適合架站新手使用

<!--more-->

<h3>WP Security Scan外掛資訊:</h3>
<ul>
	<li><span style="background-color: #ffffff;">官方網站:   <a href="http://semperfiwebdesign.com/">http://semperfiwebdesign.com/</a></span></li>
	<li><span style="background-color: #ffffff;">目前版本號:   2.7.1.1</span></li>
	<li><span style="background-color: #ffffff;">可安裝的WordPress:   2.3~2.8.4</span></li>
	<li><span style="background-color: #ffffff;">下載位址: <a href="http://downloads.wordpress.org/plugin/wp-security-scan.zip">http://downloads.wordpress.org/plugin/wp-security-scan.zip</a></span></li>
</ul>
<h3>WP Security Scan內建功能:</h3>
<ol>
	<li><span style="background-color: #ffffff;">檢查檔案屬性</span></li>
	<li><span style="background-color: #ffffff;">修改WP資料庫字首</span></li>
	<li><span style="background-color: #ffffff;">修改WordPress密碼</span></li>
	<li><span style="background-color: #ffffff;">隱藏WordPress版本代號</span></li>
</ol>
<h2>WP Security Scan安裝教學</h2>
1.進入WordPress後台,依序點選【外掛】→【新增外掛】,然後在文字框框內輸入「<span style="background-color: #ffffff;">WP Security Scan」</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-36-47.jpg"><img class="alignnone size-large wp-image-2224" title="2009-11-14 15 36 47" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-36-47-500x360.jpg" alt="2009-11-14 15 36 47" width="500" height="360" /></a></span>

<span style="background-color: #ffffff;">2.接下來會顯示出WordPress搜尋到的相似外掛,按一下第一個後面的安裝,然後會有一個介面跳出來顯示WP Security Scan的資訊,旁邊應該會有【現在安裝】四個字,按下去就對了</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-42-29.jpg"><img class="alignnone size-large wp-image-2225" title="2009-11-14 15 42 29" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-42-29-500x360.jpg" alt="2009-11-14 15 42 29" width="500" height="360" /></a></span>

3.最後WordPress會跟你要求伺服器的ID和密碼,就是你的空間的帳密啦,輸入進去在按開始,WordPress就會開始安裝嚕

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-45-25.jpg"><img class="alignnone size-large wp-image-2226" title="2009-11-14 15 45 25" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-45-25-500x360.jpg" alt="2009-11-14 15 45 25" width="500" height="360" /></a>

<span style="color: #ffffff;">.</span>
<h2>WP Security Scan使用教學:</h2>
<span style="color: #ffffff;">.</span>
<strong>一.用WP Security Scan初步檢視基本資訊</strong>
安裝好WP Security Scan以後,打開WordPress的後台,然後把網頁卷軸拉到最下面你會在側邊欄看到Security的選項直接點進去,就會顯示出你的伺服器的基本資訊,由於是英文的,所以下面附上中文翻譯

P.S.WP Security Scan這套外掛會將沒有設定好的部份(也就是漏洞)顯示成紅色,安全的部份顯示為綠色

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-55-16.jpg"><img class="alignnone size-large wp-image-2227" title="2009-11-14 15 55 16" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-55-16-500x360.jpg" alt="2009-11-14 15 55 16" width="500" height="360" /></a>

掃描結果的那裡,WP Security Scan會顯示出你目前的版本號.是否有修改資料庫字首.是否隱藏WordPress版本號以及是否修改過預設帳號admin等資訊,如果看不懂他的內容就丟到Google翻譯去看看吧,畢竟每個人顯示的資訊都不同,我也沒辦法直接給你翻譯
<strong>二.修改資料庫字首</strong>
為甚麼要修改資料庫字首呢?其實這是因為WordPress的安裝系統在一開始時會自動設定資料庫字首為wp_,濉然可以省去大家想資料庫字首的麻煩(其實也不會很麻煩@@),但是也讓一些駭客有機可乘,例如知名的Zero-day就是利用資料庫字首來攻擊網站的,所以為了安全起見提供你修改資料庫字首的功能

1.進入部落格後台,依序點選【<span style="background-color: #ffffff;">Security】→【Database】,然後再「Change the current」的那欄輸入你想要的資料庫字首,必須是英文的,而且後面一定要加上一個底線符號( _ )</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-27-37.jpg"><img class="alignnone size-large wp-image-2228" title="2009-11-14 16 27 37" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-27-37-500x360.jpg" alt="2009-11-14 16 27 37" width="500" height="360" /></a></span>
<div style="text-align: left;"><span style="background-color: #ffffff;">就這樣一個步驟即可完成更改,不過當你按下Start Renaming之後如果顯示的是下圖中的文字,那麼你就只能手動更改囉</span></div>
<div style="text-align: left;"><span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-32-06.jpg"><img class="alignnone size-large wp-image-2229" title="2009-11-14 16 32 06" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-32-06-500x360.jpg" alt="2009-11-14 16 32 06" width="500" height="360" /></a></span></div>
<strong>三.檢視詳細的掃描結果</strong>
<span style="background-color: #ffffff;">在這裡,我們要教各位WP Security Scan最重要的功能,也就是掃瞄檔案屬性有沒有設定好</span>

<span style="background-color: #ffffff;">1.進入後台,依序點選【Security】→【Scanner】</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-35-13.jpg"><img class="alignnone size-large wp-image-2230" title="2009-11-14 16 35 13" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-35-13-500x360.jpg" alt="2009-11-14 16 35 13" width="500" height="360" /></a></span>

<span style="background-color: #ffffff;">2.接下來會有一個表格顯示出需要修改的檔案,其中綠色代表已經改好的,紅色則是尚未改好的,另外這個表格的翻譯如下:</span>
<blockquote><span style="background-color: #ffffff;"><strong>Name: 檔案名稱</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong>File/Dir: 檔案位置(..代表根目錄)</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong> </strong><strong>Needed Chmod :需要的檔案屬性,也就是你改檔案屬性時要輸入的數字</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong> </strong><strong></strong><strong>Current Chmod : 該檔案目前的屬性</strong></span></blockquote>
<span style="background-color: #ffffff;"><strong></strong><strong></strong><strong></strong><strong><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-38-25.jpg"><img class="alignnone size-large wp-image-2231" title="2009-11-14 16 38 25" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-38-25-500x360.jpg" alt="2009-11-14 16 38 25" width="500" height="360" /></a></strong></span>

<span style="background-color: #ffffff;"><strong>四.修改掉預設的admin帳號</strong></span>
<p style="text-align: left;">在WordPress的線上安裝程式裡面預設的管理員帳號是admin,其實這就是一個很大的漏洞,因為這等於是把你的帳號公諸天下,駭客只要使用暴力破解法就能解開你的密碼,所以建議各位把系統預設的帳號給改掉,改帳號的方法:</p>
<p style="text-align: left;">1.進入架站空間的資料庫</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214115.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214115" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214115-500x358.jpg" alt="2009-11-14_214115" width="500" height="358" /></a></p>
<p style="text-align: left;">2.點選wp-users旁邊的瀏覽</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214234.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214234" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214234-500x358.jpg" alt="2009-11-14_214234" width="500" height="358" /></a></p>
<p style="text-align: left;">3.接下來你會進入到wp-users這個資料表,裡面會顯示目前註冊在裡部落格的帳號,點選一個叫admin的帳號旁邊的那隻筆</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214451.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214451" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214451-500x358.jpg" alt="2009-11-14_214451" width="500" height="358" /></a></p>
<p style="text-align: left;">4.把user-login那項改成你要的帳號在按執行即可完成更改</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214700.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214700" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214700-500x358.jpg" alt="2009-11-14_214700" width="500" height="358" /></a></p>
