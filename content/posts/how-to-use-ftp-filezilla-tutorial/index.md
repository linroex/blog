---
title: "如何使用FTP連線? FileZilla連線教學"
date: 2010-08-30T22:04:23
slug: "how-to-use-ftp-filezilla-tutorial"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e4%bd%bf%e7%94%a8ftp%e9%80%a3%e7%b7%9a-filezilla%e9%80%a3%e7%b7%9a%e6%95%99%e5%ad%b8/"]
tags: ["FTP", "FileZilla"]
categories: ["Software"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213528.jpg"><img class="size-large wp-image-3729 aligncenter" title="2010-08-30_213528" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213528-480x400.jpg" alt="" width="480" height="400" /></a></p>
話說今天好像大家都開學了? 其實我在上周就開學了,這幾天下來是覺的高職生活蠻不錯的,只不過教官嚴了一點,老師也有點囉唆,但是老師囉嗦還算是好的,至少代表我們遇到的是會管的老師,原本都聽國中老師說高中時就部會有人在管你了,學好學壞是你自己的事,可是就現在來看老師蠻負責任的,但是負責任的有點過頭0.0 先不說這些班上的事情,免得教官跑來說我在網路上謾罵師長?  好啦~ 寫這篇文章主要是因為今天我們資處科15班上了計算機概論課,老師說之後班上交作業都要使用FTP,還有抓一些輔助資料時也要用到FTP,所以就寫這篇文章教大家怎麼用<a href="http://filezilla-project.org/">FileZilla</a>這套程式做連線

簡單介紹一下<a href="http://filezilla-project.org/">FileZilla</a>這套程式,<a href="http://filezilla-project.org/">FileZilla</a>是一套FTP連線程式,它可以讓你很方便地與FTP伺服器連線,並進行上傳&amp;下載檔案的工作,並且內建站台管理功能,可以幫你記住FTP伺服器的位址,帳號與密碼


<!--more-->

<h2>FileZilla資訊</h2>
<ul>
	<li>官方網站: <a href="http://filezilla-project.org/">http://filezilla-project.org/</a></li>
	<li>下載點: <a href="https://www.ohloh.net/p/filezilla/download?filename=FileZilla_3.3.4.1_win32.zip">官方載點</a> | <a href="http://www.box.net/shared/u8h8j2ahkm">Box.net</a> | Xun6 | <a href="http://www.4shared.com/file/wg5jeVUR/FileZilla_3341_win32.html ">4Shared</a></li>
	<li>檔案大小: 6MB</li>
</ul>
<h2>FileZilla使用教學</h2>
1.先到<a href="https://www.ohloh.net/projects/filezilla/download?filename=FileZilla_3.3.4.1_win32.zip">這裡</a>下載FileZilla主程式(或上面的任一載點),然後把它解壓縮

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213926.jpg"><img class="alignnone size-large wp-image-3730" title="2010-08-30_213926" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213926-515x400.jpg" alt="" width="515" height="400" /></a>

2.打開剛剛解壓縮出來的東西,然後開啟filezilla.exe

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214156.jpg"><img class="alignnone size-large wp-image-3731" title="2010-08-30_214156" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214156-515x400.jpg" alt="" width="515" height="400" /></a>

3.在主機那欄輸入FTP伺服器的位址,然後如果你連線的FTP需要帳號密碼就在使用者名稱與密碼的欄位裡輸入帳密,然後按快速連線,像我們學校的FTP就是不需要帳密的,就只需要輸入伺服器位址,然後按快速登入就會自動使用訪客身分登入

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214548.jpg"><img class="alignnone size-large wp-image-3732" title="2010-08-30_214548" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214548-484x400.jpg" alt="" width="484" height="400" /></a>

4.先來講一下上傳檔案怎麼上傳,首先在左邊那裏選擇你要上傳的檔案,然後對那個檔案(資料夾)按右鍵選上傳就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215228.jpg"><img class="alignnone size-large wp-image-3733" title="2010-08-30_215228" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215228-550x334.jpg" alt="" width="550" height="334" /></a>

5.再來是教大家如何從FTP上下載檔案,方法很簡單,把剛剛的步驟反做就可以了,原本是從左邊上傳檔案,這次改成從右邊按右鍵選下載

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215525.jpg"><img class="alignnone size-large wp-image-3734" title="2010-08-30_215525" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215525-550x334.jpg" alt="" width="550" height="334" /></a>

6.大致上的使用方式就是如此,另外只要你登入過一次之後FileZilla就會自動記錄下FTP伺服器的資料,你之後要登入就可以很快速地進入

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215907.jpg"><img class="alignnone size-large wp-image-3735" title="2010-08-30_215907" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215907-550x334.jpg" alt="" width="550" height="334" /></a>

7.另外當你一次下載很多檔案時你可以從程式下方的工作窗格查看進度

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_220153.jpg"><img class="alignnone size-large wp-image-3736" title="2010-08-30_220153" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_220153-484x400.jpg" alt="" width="484" height="400" /></a>

補充:需要小心的是建議不要在學校登入即時通或MSN,或任何需要輸入帳密的功能,原本是想說學校應該有還原卡,所以不用擔心病毒的問題,但是後來聽科主任說有一個硬碟是讓我們存資料的.... 也就是說裡面也可能會被人植入病毒,這樣的電腦我還真的不敢在裡面用及時(今天登入及時之後聽科主任講我整個瘋掉....)
