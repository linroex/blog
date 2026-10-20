---
title: "【CSS 3】純粹使用CSS就可以讓你的網站擁有圓角效果！"
date: 2011-04-16T11:32:53
slug: "css3-border-radius"
aliases: ["/posts/%e3%80%90css-3%e3%80%91%e7%b4%94%e7%b2%b9%e4%bd%bf%e7%94%a8css%e5%b0%b1%e5%8f%af%e4%bb%a5%e8%ae%93%e4%bd%a0%e7%9a%84%e7%b6%b2%e7%ab%99%e6%93%81%e6%9c%89%e5%9c%93%e8%a7%92%e6%95%88%e6%9e%9c%ef%bc%81/"]
tags: ["CSS"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_111212.jpg"><img class="size-large wp-image-395 aligncenter" title="2011-04-16_111212" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_111212-540x314.jpg" alt="" width="540" height="314" /></a>

在CSS 2的時代，我們如果要讓圖片、div標籤擁有圓角效果其實是蠻麻煩的，簡單點的用法是套用jQuery裡面別人幫你寫好的Function，如果喜歡自己搞的話，就必須要設計圓角圖，然後讓圓角圖去重疊，反正就是很複雜就對了，但是在CSS 3裡面，你不在需要用那麼麻煩的東西，直接在CSS語法裡面設定就可以了！


<!--more-->
<strong>註：使用此功能，需要瀏覽器支援CSS 3，例如：IE 9、Firefox 4、Chrome、Safari等等新的瀏覽器</strong>
<h2>語法：</h2>
<pre lang="css">border-radius:圓角程度;  //這是指左上、左下、右上、右下的四個角都用成圓角</pre>
圓角程度的那裡可以填入各種單位，例如px、cm都是有效果的
<h2>範例：</h2>
建立一個id=ex的div標籤，然後將他的style設定為：
<pre lang="css">#ex{
	width:200px;		//設定方塊的寬度
	eight:200px;		//設定方塊的高度
	margin:0px auto;	//將方塊置中，與圓角效果無關
	border:1px solid #000;	//設定邊框方便識別圓角
	border-radius: 10pt;	//設定10pt的圓角效果
}</pre>
我在網路上有看到說可以針對左上或左下或右上或右下的某一個角做圓角，但是實際測試發現好像都不能達到效果，另外網路上很多文章是說要加上moz-或webkit-的前墜才能在Firefox、Chrome、Safari上達到圓角效果，但根據我的測試，目前最新版的瀏覽器都已經不需要加上前墜了，因為border-redius已經是CSS 3的標準格式囉～ 加上前墜(moz-、webkit-)就沒有那麼需要了，除非你很在乎向下相容啦xD

範例html下載： <a href="http://www.box.net/shared/edbsgcivsz">Box.net</a>｜<a href="http://www.4shared.com/file/Vv9V4HRv/border-radius.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/border-radius.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMDRjZDNlZjUtYjViNi00YWU1LWI4M2EtNGNiZWJhNGM2NDMz&amp;hl=zh_TW">Google</a>
