---
title: "【JavaScript】encodeURIComponent 編碼網址用的函式"
date: 2009-07-22T14:49:56
slug: "javascript-encodeuricomponent"
aliases: ["/posts/javascriptencodeuricomponent-%e7%b7%a8%e7%a2%bc%e7%b6%b2%e5%9d%80%e7%94%a8%e7%9a%84%e5%87%bd%e5%bc%8f/"]
tags: []
categories: ["JavaScript"]
---

當你在使用JavaScript來做一些GET指令時你應該經常會發現一個問題就是JavaScript他會要求你把網址編碼吧,遇到這種需要編碼網址才能使用的函式你可以使用encodeURIComponent來幫網址進行編碼

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_144915.jpg"><img class="alignnone size-full wp-image-1666" title="2009-07-22_144915" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_144915.jpg" alt="2009-07-22_144915" width="397" height="134" /></a>


<!--more-->


<span style="color: #ffffff;">.</span>
encodeURIComponent語法格式:
<pre lang="javascript">var 儲存用變數=encodeURIComponent("被加密網址")</pre>
<span style="color: #ffffff;">.</span>

<span style="color: #ffffff;">.</span>

範例:
<pre lang="javascript">
在網址列貼上以下語法

javascript:alert(encodeURIComponent(location.href));

</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145001.jpg"><img class="alignnone size-full wp-image-1667" title="2009-07-22_145001" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145001.jpg" alt="2009-07-22_145001" width="550" height="57" /></a>

另外你可以使用decodeURIComponwent來把被encodeURIComponent編碼過的網址回復原狀

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145730.jpg"><img class="alignnone size-full wp-image-1669" title="2009-07-22_145730" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145730.jpg" alt="2009-07-22_145730" width="545" height="58" /></a>

語法格式跟encodeURIComponent一樣都是:
<pre lang="javascript">
var 儲存用變數=encodeURIComponent("被加密網址") 
</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145924.jpg"><img class="alignnone size-full wp-image-1670" title="2009-07-22_145924" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145924.jpg" alt="2009-07-22_145924" width="355" height="134" /></a>
