---
title: "Pastie - 讓你張貼程式碼的網站，並且可以嵌入外部網站！"
date: 2011-06-12T02:13:32
slug: "pastie-paste-code-site"
aliases: ["/posts/pastie-%e8%ae%93%e4%bd%a0%e5%bc%b5%e8%b2%bc%e7%a8%8b%e5%bc%8f%e7%a2%bc%e7%9a%84%e7%b6%b2%e7%ab%99%ef%bc%8c%e4%b8%a6%e4%b8%94%e5%8f%af%e4%bb%a5%e5%b5%8c%e5%85%a5%e5%a4%96%e9%83%a8%e7%b6%b2%e7%ab%99/"]
tags: ["Pastie"]
categories: ["Web Apps"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_015959.jpg"><img class="size-large wp-image-540 aligncenter" title="2011-06-12_015959" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_015959-540x443.jpg" alt="" width="540" height="443" /></a>

有時候你可能要分享某些程式碼給朋友看，請朋友幫你除錯，這時候直接傳檔案給對方是最好的方法了，但如果對方不能接收檔案呢？這時候<strong><a href="http://pastie.org/">Pastie</a></strong>就派上用場啦，你可以把程式碼貼到Pastie上面，然後這個網站會給你一串網址，你只要把網址給別人，對方就可以看到你的程式碼了，目前類似Pastie這類功能的網站很多，但是Pastie的最大特色在於他可以嵌入到外部網站～


<!--more-->
<strong>網站網址：<a href="http://pastie.org/">http://pastie.org</a> </strong>
<h2>使用教學</h2>
1.進入到<a href="http://pastie.org/">Pastie</a>的網站，然後把程式碼貼上去

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020325.jpg"><img class="alignnone size-large wp-image-541" title="2011-06-12_020325" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020325-540x443.jpg" alt="" width="540" height="443" /></a>

2.設定你所貼的資料的格式（程式語言）

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020512.jpg"><img class="alignnone size-large wp-image-542" title="2011-06-12_020512" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020512-540x443.jpg" alt="" width="540" height="443" /></a>

3.設定完之後按下Paste按鈕就可以囉～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020631.jpg"><img class="alignnone size-large wp-image-543" title="2011-06-12_020631" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020631-540x443.jpg" alt="" width="540" height="443" /></a>

4.你可以直接把網址傳給對方，或是你可能要把程式碼貼到你的網站上面，那就把右邊的那串語法複製起來貼到你的網站上即可

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020830.jpg"><img class="alignnone size-large wp-image-544" title="2011-06-12_020830" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020830-540x443.jpg" alt="" width="540" height="443" /></a>
<h2>原理分析</h2>
如果你要把程式碼嵌入到你的網站裡，就必須要先複製一串Javascript的程式碼，然後貼到你的網站上面，其實他的原理很簡單，就只是利用Javascript裡面的一個方法：document.write來輸出內容到螢幕上面，透過這種方式輸出你的程式碼而已

▼▼js擋的內容是一堆document.write

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_021235.jpg"><img class="alignnone size-large wp-image-545" title="2011-06-12_021235" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_021235-540x338.jpg" alt="" width="540" height="338" /></a>
