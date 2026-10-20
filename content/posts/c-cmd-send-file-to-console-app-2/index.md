---
title: "【C++】用CMD傳送檔案給主控台應用程式以及傳回資料"
date: 2010-12-04T10:00:16
slug: "c-cmd-send-file-to-console-app-2"
aliases: ["/posts/%e3%80%90c%e3%80%91%e7%94%a8cmd%e5%82%b3%e9%80%81%e6%aa%94%e6%a1%88%e7%b5%a6%e4%b8%bb%e6%8e%a7%e5%8f%b0%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f%e4%bb%a5%e5%8f%8a%e5%82%b3%e5%9b%9e%e8%b3%87%e6%96%99-2/"]
tags: ["C++", "Windows"]
categories: ["Programming"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_232836.jpg"><img class="size-large wp-image-4097 aligncenter" title="2010-11-26_232836" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_232836-520x365.jpg" alt="" width="520" height="365" /></a></p>
其實在C++裡面除了單純的使用fopen來讀取檔案之外,還有另外一種方法也可以讀取檔案,而且實作起來比fopen簡單很多,那就是利用cmd來餵檔案給C++程式,舉例來講現在有一個程式叫做test.exe,還有一個txt檔叫做x.txt,然後我要讓test.exe讀取x.txt的資料並顯示出來,則我開啟CMD,然後再裡面輸入 <em><strong>test.exe&lt;x.txt</strong></em> 就可以讀取並顯示出x.txt的內容了,下面文章要教大家的就是這種讀取檔案的方式,另外感謝網友滄海教會我這種用法


<!--more-->

<h2>讀取與傳回檔案：</h2>
這東西雖然很簡單,但卻很難用文字來形容,所以我拍了一段影片讓大家看

專案檔載點 <a href="http://goo.gl/n8W9G">http://goo.gl/n8W9G</a>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="480" height="385" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/jAr1WBhJg1M?fs=1&amp;hl=zh_TW" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="480" height="385" src="http://www.youtube.com/v/jAr1WBhJg1M?fs=1&amp;hl=zh_TW" allowscriptaccess="always" allowfullscreen="true"></embed></object>
