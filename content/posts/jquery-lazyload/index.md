---
title: "【jQuery】Lazyload - 延遲圖片載入"
date: 2011-04-27T19:15:30
slug: "jquery-lazyload"
aliases: ["/posts/%e3%80%90jquery%e3%80%91lazyload-%e5%bb%b6%e9%81%b2%e5%9c%96%e7%89%87%e8%bc%89%e5%85%a5/"]
tags: ["jQuery", "JavaScript"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-27_191427.jpg"><img class="size-large wp-image-429 aligncenter" title="2011-04-27_191427" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-27_191427-540x481.jpg" alt="" width="540" height="481" /></a>

在攝影類的網站通常會放很多的圖片，當訪客瀏覽這類網站時就要開啟蠻久的，因為要載入很多的照片，這對於網站主機的流量影響蠻大的，而且會造成訪客瀏覽時的CPU Time增加很多，在這裡要介紹一套叫做Lazyload的jQuery插件，它可以延遲圖片的載入，也就是說當你進入到一個網站時，並不會一次載入所有的圖片，而是只載入一部分的圖，當你拉動瀏覽器的捲軸時，它會載入「你正在看的區塊的圖片」，所以網頁的載入速度就會變得比較快

<!--more-->

<h2>Lazyload資訊：</h2>
<ul>
	<li>需搭配jQuery使用</li>
	<li>瀏覽器需要開啟Javascript</li>
	<li>範例檔：<a href="http://www.box.net/shared/auskrk0640">Box.net</a>｜<a href="http://www.4shared.com/file/UkViYDhu/lazyload_demo.html">4Shared</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMTM2NjUyMjUtMzU2Ny00Yzk1LWEyMjgtMDUxNjRmNjA5MjQ5&amp;hl=zh_TW">Google </a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/lazyload_demo.zip">Dropbox</a></li>
</ul>
<strong>要下載lazyload.js的朋友請下載範例檔，裡面就有lazyload.js了～</strong>
<h2>常用語法：</h2>
1.載入lazyload功能：
<pre lang="javascript">$("img").lazyload();</pre>
2.設定延遲載入時間
<pre lang="javascript">$("img").lazyload({ threshold : 200 });
//200請改成你的延遲值(毫秒)</pre>
3.設定圖片未載入前的背景圖
<pre lang="javascript">$("img").lazyload({ placeholder : "圖片路徑" });</pre>
如果要一次使用多個參數，可以用逗號把參數隔開，例如同時使用延遲載入及背景圖：
<pre lang="javascript">$("img").lazyload({ placeholder : "img/grey.gif",threshold:200 });</pre>
