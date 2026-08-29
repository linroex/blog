---
title: "Google Chrome OS - Google出的雲端作業系統(安裝教學)"
date: 2010-07-11T18:11:31
slug: "google-chrome-os-install-tutorial"
aliases: ["/posts/google-chrome-os-google%e5%87%ba%e7%9a%84%e9%9b%b2%e7%ab%af%e4%bd%9c%e6%a5%ad%e7%b3%bb%e7%b5%b1%e5%ae%89%e8%a3%9d%e6%95%99%e5%ad%b8/"]
tags: ["Google", "小筆電", "Chrome OS", "作業系統", "雲端運算"]
categories: ["Linux", "Google"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-19_160846.jpg"><img class="alignnone size-large wp-image-3310" title="2010-06-19_160846" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-19_160846-537x400.jpg" alt="" width="537" height="400" /></a>

<strong>Google Chrome OS</strong>(以下簡稱Chrome OS)是Google所出的一款作業系統,主攻小筆電為主的市場,Chrome OS這款作業系統的特色在於超快的開機速度.超低的耗電量以及超低硬體需求,號稱開機七秒<strong>(據Google表示,開機七秒是指固態硬碟的況下)</strong>,採用Linux作為核心,整體介面跟時下當紅的Chrome瀏覽器幾乎一樣


<!--more-->


<strong>Chrome OS</strong>因為將多數的功能都放置在網路上,也就是使用所謂的雲端技術,所以在硬體效能上要求不高,也讓它十分適合使用在硬體效能普遍不高的小筆電上,不過Chrome OS有一個很致命的缺點就是它一定要有網路才能使用,不過這問題其實不大,目前寬頻網路普及率十分高,還有Chrome OS也不能處理太耗效能的東西,例如:影片剪輯,寫程式,只能用來做一般的文書編輯還有上網,不過一般會買小筆電的人也不可能拿小筆電來寫程式吧~

很多人都以為<strong>Chrome OS</strong>還處於只聞樓梯響的階段,其實<strong>早在去年11月Google就已經釋出了Chrome OS的原始碼</strong>,而且在最近的國電展,沒記錯的話Acer也計畫推出搭載<a href="http://goo.gl/B3Tr " target="_blank">Chrome OS的小筆電</a>,<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px; font-size: xx-small;">我個人是蠻看好Chrome OS的前景,畢竟目前Windows裝在小筆電上有點太耗效能了,Chrome OS的出現剛好讓小筆電族群可以享受不LAG的電腦環境</span>

<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px; font-size: xx-small;"><a href="http://blog.chromium.org/2009/12/whats-difference-between-chromium-os.html" target="_blank">P.S.忘記說一件事了,目前自行編譯的應該都要叫做Chromium OS而不是Chrome OS,不過我記不住Chromium這個單字..... 所以文章裡就直接叫做Chrome OS了xD</a></span>

<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px;">
</span>

<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="560" height="340" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/0QRO3gKj3qw&amp;hl=zh_TW&amp;fs=1&amp;" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="560" height="340" src="http://www.youtube.com/v/0QRO3gKj3qw&amp;hl=zh_TW&amp;fs=1&amp;" allowscriptaccess="always" allowfullscreen="true"></embed></object>
<h2>Chrome OS要點</h2>
<ol>
	<li>適用於小筆電</li>
	<li>低耗電量</li>
	<li>低硬體需求</li>
	<li>雲端技術為主,沒有網路不行用</li>
	<li>未來可能會要求安裝在特定硬體上(固態硬碟)</li>
	<li>號稱開機七秒(實際上雖然沒有七秒但也相去不遠)</li>
</ol>
<h2>Chrome OS試玩</h2>
安裝前要先提醒,不是所有電腦都能成功使用,像我的電腦就一直失敗= =

在這篇文章中,用來做教學的Chrome OS版本並非官非所釋出的,而是由熱心於Gooogle的玩家自行編譯然後分享出來的,你如果覺得裡面會被加木馬你可以不要用,你可以自己去下載原始碼來編譯,部要問我說哪裡可以下載到官方的Chrome OS,因為官方只有釋出原始碼要你自己編譯,並沒有提供已經編譯完成的Chrome OS

1.先到<a href="http://chromeos.hexxeh.net/">http://chromeos.hexxeh.net/</a>這裡下載非官方編譯的Chrome OS,按一下【Download the VMWare image】就可以下載它的檔案了

P.S.沒看到【Download the VMWare image】的人請把網頁往下拉一點就能看到了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_163334.jpg"><img class="alignnone size-large wp-image-3464" title="2010-07-11_163334" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_163334-550x334.jpg" alt="" width="550" height="334" /></a>

2.下載中,請稍等,<strong>趁者這個時間去下載</strong><a href="http://www.virtualbox.org/wiki/Downloads"><strong>VirtualBox</strong></a><strong>這款虛擬機程式並且安裝好</strong>,等等要玩Chrome OS還要先準備好虛擬機才行

3.下載好之後開啟VirtualBox,然後依序按【新增】→【下一個】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_164155.jpg"><img class="alignnone size-large wp-image-3466" title="2010-07-11_164155" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_164155-550x343.jpg" alt="" width="550" height="343" /></a>

4.在名稱那裏輸入Chrome OS,然後作業系統類型選擇【Linux】,版本選擇【other Linux】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174239.jpg"><img class="alignnone size-full wp-image-3467" title="2010-07-11_174239" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174239.jpg" alt="" width="549" height="372" /></a>

5.這裡是設定你要給虛擬機多少記憶體,每台電腦都不太相同0.0,基本上至少給它給512MB吧~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174404.jpg"><img class="alignnone size-full wp-image-3468" title="2010-07-11_174404" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174404.jpg" alt="" width="549" height="372" /></a>

6.先把剛剛下載下來的Chrome OS解壓縮

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174616.jpg"><img class="alignnone size-large wp-image-3469" title="2010-07-11_174616" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174616-550x321.jpg" alt="" width="550" height="321" /></a>

<!--nextpage-->

7.回到剛剛VirtualBox的介面,選擇【使用現有硬碟】,然後按那個資料夾圖案

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175006.jpg"><img class="alignnone size-full wp-image-3470" title="2010-07-11_175006" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175006.jpg" alt="" width="549" height="372" /></a>

8.按一下【加入】,然後選擇剛剛下載的那個檔案

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175242.jpg"><img class="alignnone size-large wp-image-3471" title="2010-07-11_175242" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175242-534x400.jpg" alt="" width="534" height="400" /></a>

9.選擇剛剛加入的那個檔案,然後按【選取】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175403.jpg"><img class="alignnone size-large wp-image-3472" title="2010-07-11_175403" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175403-512x400.jpg" alt="" width="512" height="400" /></a>

10.按【下一個】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175440.jpg"><img class="alignnone size-full wp-image-3473" title="2010-07-11_175440" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175440.jpg" alt="" width="549" height="372" /></a>

11.按【完成】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175505.jpg"><img class="alignnone size-full wp-image-3474" title="2010-07-11_175505" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175505.jpg" alt="" width="549" height="372" /></a>

12.到這裡就安裝完Chrome OS囉~ 接下來只要滑鼠連點Chrome SO兩下即可開啟

原本我是想寫USB安裝Chrome OS的方式,可是Flow官網提供的檔案怪怪的0.0 一直安裝不成功= =

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175718.jpg"><img class="alignnone size-large wp-image-3475" title="2010-07-11_175718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175718-536x400.jpg" alt="" width="536" height="400" /></a>

13.使用時因為虛擬機程式會自動抓取你的滑鼠,所以你如果要從虛擬機跳到正常電腦時按一下鍵盤右邊的Ctrl即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175901.jpg"><img class="alignnone size-full wp-image-3476" title="2010-07-11_175901" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175901.jpg" alt="" width="390" height="267" /></a>

14.不知道為什麼,我自己測試時都開不了@@

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_180726.jpg"><img class="alignnone size-large wp-image-3477" title="2010-07-11_180726" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_180726-550x361.jpg" alt="" width="550" height="361" /></a>

<strong>預設的Chrome OS帳密:</strong>

默認的用戶名是facepunch，默認密碼是facepunch。
<h2>後記:</h2>
個人是覺得如果你是使用小筆電的話不妨將內鍵的作業系統改成Chrome OS,低耗電量而且硬體要求也不高,完全是為了小筆電族群設計的,還有Chrome OS有一個特殊設計上面沒有講,就是當你要關機時你會發現你找不到關機的選項,據Google的工程師表示,Chrome OS的關機很簡單,直接按下你的筆電關機鈕就好^^,不用擔心會出問題,因為Chrome OS的資料都是存在網路上,所以不會像一般作業系統一樣出問題,我當初也被這設計嚇到,因為平常所受的電腦教育就是:絕對不行直接按關機鍵,現在有了Chrome OS,以後電腦課哪個老師在說不能直接按關機鍵就可以問老師說Chrome OS怎麼辦～ 我自己是很少會使用Chrome OS,因為家裡沒有再用小筆電,但是之前有看一位前輩的小筆電安裝Chrome OS,用起來真的很方便的說!
