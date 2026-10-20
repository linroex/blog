---
title: "【Google API】透過Google Chart API產生QR-Code，附PHP範例程式碼"
date: 2011-02-24T23:25:20
slug: "google-chart-api-qr-code-php"
aliases: ["/posts/%e3%80%90google-api%e3%80%91%e9%80%8f%e9%81%8egoogle-chart-api%e7%94%a2%e7%94%9fqr-code%ef%bc%8c%e9%99%84php%e7%af%84%e4%be%8b%e7%a8%8b%e5%bc%8f%e7%a2%bc/"]
tags: ["Google API", "PHP", "QR Code"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_230500.jpg"><img class="size-large wp-image-328 aligncenter" title="2011-02-24_230500" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_230500-540x396.jpg" alt="" width="540" height="396" /></a>

在這篇文章中我們會教大家如何使用Google Chart API來製作QR-Code，也就是當下很流行的二維條碼，本來你如果要產生二維條碼是很麻煩的，但是現在有了Google Chart API你可以用一段網址就快速產生出QR-Code，其實我原本是打算寫一篇文章專門講Google Chart API的，但是後來想想還是拆開來好了～（還有就是剛好看到<a href="http://www.dotblogs.com.tw/shadow/archive/2011/02/24/21557.aspx" target="_blank">Shadow的技術資料庫</a>這個網站在介紹他，就忍不住寫了～）


<!--more-->

<h2>Google Chart API產生QR Code格式：</h2>
https://chart.googleapis.com/chart?各項參數

<strong>參數：</strong>
<ul>
	<li>cht=圖表格式，填qr即可</li>
	<li>chs=條碼大小，填入wdith x height，注意寬度跟高度中間是英文字母的x</li>
	<li>chl=條碼內要存放的資料</li>
	<li>choe=編碼方式，建議填UTF-8</li>
	<li>chld=容錯能力，分成L、M、Q、H四個等級</li>
</ul>
<strong>範例：</strong>

我要產生一個包含linroex字串，大小是120*120的二維條碼

<a href="https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=linroex&amp;choe=UTF-8">https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=linroex&amp;choe=UTF-8</a>
<h2>範例PHP程式碼：</h2>
載點：<a href="http://www.box.net/shared/0ejo0tqyuh" target="_blank"> Box.net</a>｜<a href="http://www.4shared.com/file/3jZerRVS/google_chart_api_qrcode.html " target="_blank">4Shared</a>｜<a href="http://goo.gl/tN0Bl" target="_blank">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMmEwYTEwNDUtOTFlMS00MDRjLTk4MjgtYWFlN2IxNzRjZTFm&amp;hl=zh_TW" target="_blank">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_232301.jpg"><img class="alignnone size-large wp-image-329" title="2011-02-24_232301" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_232301-540x364.jpg" alt="" width="540" height="364" /></a>
