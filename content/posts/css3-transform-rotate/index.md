---
title: "【CSS 3】透過transform: rotate做出圖片、網頁傾斜的效果"
date: 2011-04-23T09:22:08
slug: "css3-transform-rotate"
aliases: ["/posts/%e3%80%90css-3%e3%80%91%e9%80%8f%e9%81%8etransform-rotate%e5%81%9a%e5%87%ba%e5%9c%96%e7%89%87%e3%80%81%e7%b6%b2%e9%a0%81%e5%82%be%e6%96%9c%e7%9a%84%e6%95%88%e6%9e%9c/"]
tags: ["CSS", "CSS 3", "transform: rotate"]
categories: ["CSS"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-23_085636.jpg"><img class="size-large wp-image-422 aligncenter" title="2011-04-23_085636" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-23_085636-540x386.jpg" alt="" width="540" height="386" /></a>

之前新聞曾報導，在手機版的Google網頁裡面搜尋「傾斜」的話，得到的網頁會往右邊斜，這其實並不是很難做出來的效果，只要使用一行CSS語法就可以達到了，因為他已經是CSS 3的標準之一囉～ 目前來講這個傾斜的CSS 3語法IE系列還不支援(包含IE 9)，另外就是說使用的時候不是一行就能，而是要分成很多行，因為每種瀏覽器對應的語法都不太相同，這點應該在日後會改善


<!--more-->

<h2>前言：</h2>
今天要用到的傾斜特效源自於CSS 3中的變形功能：transform，透過這個屬性，你可以直接用CSS做出一個簡單的動畫，transform裡面除了可以把區塊傾斜以外，也可以做到：位移、縮放、透視等多種效果，不過我們今天要講的只有transform中的旋轉，也就是傾斜
<h2>語法格式：</h2>
<pre lang="css">-webkit-transform: rotate(傾斜角度);
-moz-transform: rotate(傾斜角度);
-o-transform: rotate(傾斜角度);
-ms-transform:rotate(傾斜角度)</pre>
建議要一次加入這三行，才可以讓「幾乎」所有的瀏覽器都支援，當然目前的話... IE核心的瀏覽器都還不能看到此功能（目前IE9已經支援了）
<ul>
	<li>-webkit的那行是要給使用webkit核心的瀏覽器的語法，例如：Safari、Chrome等瀏覽器都是使用webkit</li>
	<li>-moz的那行則是要給Firefox或是其他使用Firefox作為核心的瀏覽器在用的語法</li>
	<li>-o的那行則是要給Opera使用的</li>
	<li>-ms的那行則是要給IE 9使用的</li>
</ul>
「傾斜角度」的部份單位是deg，例如你要讓img傾斜一度，則語法為：
<pre lang="css">-webkit-transform: roate(1deg);</pre>
範例檔下載：<a href="http://www.box.net/shared/qggenzip7e">Box.net</a> ｜ <a href="http://www.4shared.com/file/YdDnTT8s/css3-transform-rotate.html ">4Shared </a>｜ <a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOM2IzODdlMDAtZjZiYi00NWEwLWE4OTAtOTY2ZjRiMWU4OWM5&amp;hl=zh_TW">Google </a>｜ <a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/css3-transform-rotate.zip">Dropbox</a>
