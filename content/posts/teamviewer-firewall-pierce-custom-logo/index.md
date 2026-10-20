---
title: "TeamViewer - 製作個人版的遠端遙控程式"
date: 2009-09-26T19:21:47
slug: "teamviewer-firewall-pierce-custom-logo"
aliases: ["/posts/teamviewer-%e8%bc%95%e9%ac%86%e7%aa%81%e7%a0%b4%e9%98%b2%e7%81%ab%e7%89%86%e9%82%84%e5%8f%af%e4%bb%a5%e6%94%be%e4%b8%8a%e8%87%aa%e5%b7%b1%e7%9a%84logo/"]
tags: ["TeamViewer"]
categories: ["Software"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-000.jpg"><img class="alignnone size-full wp-image-1930" title="2009-09-20-000" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-000.jpg" alt="2009-09-20-000" width="306" height="100" /></a>

<strong>TeamViewer</strong>是一個十分方便的遠端遙控程式,它的最大特色就是它可以突破防火牆的限制,即使你的電腦有裝防火牆也照樣可以使用它,我想<strong>TeamViewer</strong>的原理可能是先連到他的伺服器在連到受控端的電腦吧!不過這樣一來成本應該很大,另外<strong>TeamViewer</strong>還提供一個特殊的功能,你可以訂製一個『屬於自己的TeamViewer』,這是由官方網站提供的服務,它可以讓你把Logo換掉變你自己的,很神奇吧!


<!--more-->

<h3>一.TeamViewer資訊</h3>
<ul>
	<li>類型:免費程式,遠端遙控</li>
	<li>載點: Xun6 | <a href="http://www.4shared.com/file/225103036/f1a92af1/Teamviewer.html ">4Shared</a> | <a href="http://www.box.net/shared/ucj6l85rpf">Box.net </a>| <a href="http://download.cnet.com/TeamViewer/3000-7240_4-10398150.html?part=dl-6271747&amp;subj=dl&amp;tag=button">官方載點</a></li>
	<li>掃毒報告: <a href="http://www.virustotal.com/analisis/7f8729ee3528ebc4883af02f753990278c81d6f9961d55331551389ca29f8ec9-1265870524">VirusTotal </a></li>
	<li>MD5碼: <span style="font-family: 'Courier New', Courier, mono; line-height: 16px; font-size: 12px;">a745f4c1d7d990d04adac56ceb68edc0</span></li>
	<li>(除了上面幾種版本以外還有很多種,例如MSI專用版,詳細部分大家可以到官網的<a href="http://www.teamviewer.com/download/index.aspx">下載頁面</a>看)</li>
</ul>
<div id="_mcePaste"></div>
另外新版還增加了下列功能
<ol>
	<li>查看受控端系統訊息</li>
	<li>可以設定受控端解析度</li>
	<li>內建錄影功能</li>
	<li>內建主被控端互換功能</li>
	<li>更精細的存取控制設定</li>
	<li>密碼長度設定</li>
	<li>可以直接連線,不需經過TeamViewer伺服器</li>
</ol>
除了上面所說的功能以外其實還有很多種

<span style="color: #ffffff;">.</span>
<h3>二.TeamViewer版本介紹</h3>
完整版:顧名思義,就是支援TeamViewer這套程式所有功能的版本,設定上較麻煩,但可以控制連線的速度.連線時是否要保留桌面等較詳細設定

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-003.jpg"><img class="alignnone size-full wp-image-1934" title="2009-09-20-003" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-003.jpg" alt="2009-09-20-003" width="550" height="381" /></a>

簡易版:只具有遙控功能的程式,不需要去做任何調整(也調整不了),另外簡易版不能控制別人的電腦,只能讓別人來控制

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-002.jpg"><img class="alignnone size-full wp-image-1933" title="2009-09-20-002" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-002.jpg" alt="2009-09-20-002" width="278" height="360" /></a>
<h3>三.個性化TeamViewer製作</h3>
個性化TeamViewer其實是指說你可以把你自己的Logo放到TeamViewer上面,布過只限TeamViewerQS(只能被人連線的版本),其他的版本是不能的,方法也不能,按照下面教學做即可

1.準備一張200*100像素的圖片(可以是JPEG.BMP.GIF),然後進入到TeamViewer的<a href="http://www.teamviewer.com/download/index.aspx">下載</a>頁面,把網頁往下拉一點你會看到"<em>For the instant customer:</em> TeamViewer QuickSupport"這行字,按一下這行字底下的<a title="Download Windows" href="http://www.teamviewer.com/download/customdesign_4x.aspx">Customize Quicksupport</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_184545.jpg"><img class="alignnone size-full wp-image-1947" title="2009-09-26_184545" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_184545.jpg" alt="2009-09-26_184545" width="549" height="212" /></a>

2.進入到個性化TeamViewer的設定頁面以後,把輸入相關的資訊,然後把剛剛準備的圖片上傳上去

翻譯:
<ul>
	<li>Language:  語言,維持預設值即可</li>
	<li><span id="customDesign_titleDescription">Title: </span>TeamViewer的標題,會顯示在程式最上方</li>
	<li><span id="customDesign_explanationDescription">Text:  出現在個性化</span>TeamViewer的內容</li>
	<li>Logo: 把你的Logo傳上去吧</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185013.jpg"><img class="alignnone size-full wp-image-1948" title="2009-09-26_185013" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185013.jpg" alt="2009-09-26_185013" width="321" height="379" /></a>

<span id="customDesign_lblTextColor">Text color:  文字顏色,點一下那個框框就會出現選擇顏色的東西</span>

<span id="customDesign_lblBGColor">Background color: 背景顏色,設定方法也差不多</span>

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185206.jpg"><img class="alignnone size-full wp-image-1949" title="2009-09-26_185206" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185206.jpg" alt="2009-09-26_185206" width="675" height="312" /></a>

接下來的設定都不需動,按一下"<span id="customDesign_btnLabel">Generate QuickSupport</span>"即可

3.按一下紅色框框內的按鈕就可以下載囉

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_191938.jpg"><img class="alignnone size-full wp-image-1950" title="2009-09-26_191938" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_191938.jpg" alt="2009-09-26_191938" width="550" height="296" /></a>
<h3 style="text-align: center;"><span style="color: #0000ff;">敬請期待下一篇文章 - <a href="https://coder.tw/?p=2026">TeamViewer遠端遙控使用教學</a></span></h3>
