---
title: "Google Weather API - 幫助你取得一整週的天氣狀況"
date: 2011-02-04T00:48:56
slug: "google-weather-api-weekly-forecast-2"
aliases: ["/posts/google-weather-api-%e5%b9%ab%e5%8a%a9%e4%bd%a0%e5%8f%96%e5%be%97%e4%b8%80%e6%95%b4%e9%80%b1%e7%9a%84%e5%a4%a9%e6%b0%a3%e7%8b%80%e6%b3%81-2/"]
tags: ["PHP", "API", "Google", "天氣"]
categories: ["Google"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_004255.jpg"><img class="size-large wp-image-4648 aligncenter" title="2011-02-04_004255" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_004255-520x416.jpg" alt="" width="520" height="416" /></a></p>
<strong>Google Weather API</strong>是我今天發現的東西，因為想要幫最近開發的Plurk-bot加上新的查天氣功能，所以就上網找了一下獲得天氣狀況的方法，原本預計的獲取方式是去讀取中央氣象局的網頁，然後分析上面的資料，可是後來我發現Google和Yahoo都有提供查天氣的API，其中我比較喜歡使用Google Weather API，因為他的回傳值是xml格式比較好解析，不過Yahoo傳一個html回來... 而且Google Weather API還支援直接指定城市名的功能，例如我要查台北市，我就在API上直接傳台北市過去就可以，可是Yahoo的天氣API卻不是這麼簡單，而是要你輸入一個城市的代碼，等於我要使用Yahoo的API時我還要先知道要查詢的城市的代碼
<h2>
<!--more-->
Google Weather API特色</h2>
<ul>
	<li>可以利用城市名稱(中英文皆可)進行查詢</li>
	<li>可以利用經緯度查詢</li>
	<li>會傳回一整周的最高溫、最低溫、雲層狀況等資料</li>
	<li>傳回的資料是xml格式，big5編碼</li>
</ul>
<h2>Google Weather API格式</h2>
http://www.google.com/ig/api?hl=zh-tw&amp;weather=<strong>city_name</strong>

<strong>city_name</strong>那裏填入你要查詢的城市名稱或是經緯度都可以

<strong>ex.查詢台北市天氣</strong>

http://www.google.com/ig/api?hl=zh-tw&amp;weather=<strong>Taipei</strong>

<strong>
</strong>
<h2>PHP範例</h2>
範例檔載點：Xun6 ｜<a href="http://www.4shared.com/file/nLlIIABH/google_weather_api.html ">4Shared </a>｜ <a href="http://www.box.net/shared/godst1y4q7">Box.net</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_003925.jpg"><img class="alignnone size-large wp-image-4649" title="2011-02-04_003925" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_003925-520x218.jpg" alt="" width="520" height="218" /></a>
