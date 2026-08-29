---
title: "[VB]利用Replace函式達到取代的功能"
date: 2009-04-17T12:19:00
slug: "vb-replace-function"
aliases: ["/posts/vb%e5%8f%96%e4%bb%a3%e5%87%bd%e5%bc%8f/"]
tags: ["VB"]
categories: ["VB.NET"]
---

在VB裡面如果想要將字串裡的一部分內容去待成另一份的話
可以使用replace函式

語法如下:
<pre lang="vb">字串名稱.replace(A,B)

</pre>
字串名稱那裡就是你儲存文字的變數名稱

例如你把123456存在S1裡面

則輸入S1.replace(A,B)
<!--more-->


另外A跟B是他的兩個參數

A代表要被取代的文字

B代表要取代成XXXXX

例:我把WERTSDFG存在S1裡

然後我要把WERT換成123,則語法為

S1.replace(WERT,123)

就可以了
<pre lang="vb">---------------範例程式----------

dim s1 = wertsdfg

console.writeline(s1)

console.writeline(s1.replace(wert,123))

console.readline()

</pre>
