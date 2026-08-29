---
title: "【VB】分割字串成字元(mid+for迴圈)"
date: 2010-12-28T20:01:36
slug: "vb-split-string-mid-for-loop-2"
aliases: ["/posts/%e3%80%90vb%e3%80%91%e5%88%86%e5%89%b2%e5%ad%97%e4%b8%b2%e6%88%90%e5%ad%97%e5%85%83midfor%e8%bf%b4%e5%9c%88-2/"]
tags: ["VB", "mid", "ACM"]
categories: ["VB.NET"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-28_201330.jpg"><img class="size-full wp-image-4332 aligncenter" title="2010-12-28_201330" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-28_201330.jpg" alt="" width="312" height="344" /></a></p>
其實這篇文章要講的分割字串成字元很簡單,但他卻在做很多ACM的題目時需要用到,例如排列組合就必須要先把字串分割成字元再行運算,還有像凱撒加密法也是同樣的需要用到他,以下就以VB.Net來做示範,至於其他程式語言也可以做到,原理都相同


<!--more-->
在VB中有一個函式叫做mid,功能是指定位置及長度來取字串,例如mid("abcde",1,1),這樣子就會得到a這個字
<h2>mid函式介紹</h2>
mid(要分割的字串,起始值,長度)

要分割的字串不需要我多講,就是要被分割的那串字或變數

而起始值就是說你要從第幾個字開始分割,需注意不能為0

長度則是指要切割的長度
<h2>範例：</h2>
<pre lang="vb">dim x as string
x="linroex"
msgbox(mid(x,1,3))</pre>
這段範例就是說要把x這個變數中包含的資料,從第一個字開始剪三個字下來

透過mid這個函式在搭配迴圈就可以做到將字串分割成字元的功能了
<h2>字串分割成字元(VB)：</h2>
<pre lang="vb">Dim xin As String = TextBox1.Text
Dim xout() As String
ReDim xout(Len(xin))
For x = 1 To Len(xin)
    xout(x - 1) = Mid(xin, x, 1)
    ListBox1.Items.Add(xout(x - 1))
Next</pre>
專案檔(VS2010)：Xun6 ｜<a href="http://www.4shared.com/file/G4U1vBIU/_online.html ">4Shared </a>｜<a href="http://www.box.net/shared/c20xccj74z">Box.net</a>
