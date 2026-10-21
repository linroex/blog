---
title: "【VB】文字列を1文字ずつ分割する（Mid + For ループ）"
date: 2010-12-28T20:01:36
slug: "vb-split-string-mid-for-loop-2"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-28_201330.jpg"><img class="size-full wp-image-4332 aligncenter" title="2010-12-28_201330" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-28_201330.jpg" alt="" width="312" height="344" /></a></p>
実は、この記事で扱う「文字列を1文字ずつ分割する」処理はとても簡単ですが、ACM の問題ではよく必要になります。たとえば順列・組み合わせの問題では、計算の前に文字列を文字に分割しなければなりません。シーザー暗号にも同じ処理が使われます。以下では VB.NET で例を示しますが、ほかのプログラミング言語でも同じことができ、原理は同じです。


<!--more-->
VB には Mid という関数があります。これは開始位置と長さを指定して文字列の一部を取り出す関数です。たとえば Mid("abcde",1,1) では "a" が得られます。
<h2>Mid 関数の説明</h2>
Mid(分割する文字列, 開始位置, 長さ)

分割する文字列は、分割したい文字列または変数のことです。説明するまでもないでしょう。

開始位置は、分割を始める文字の位置です。0 にはできないので注意してください。

長さは、切り取る文字数です。
<h2>例：</h2>
<pre lang="vb">dim x as string
x="linroex"
msgbox(mid(x,1,3))</pre>
この例では、変数 x の先頭から 3 文字を切り取っています。

Mid 関数を For ループと組み合わせると、文字列を1文字ずつに分割できます。
<h2>文字列を1文字ずつ分割する（VB）：</h2>
<pre lang="vb">Dim xin As String = TextBox1.Text
Dim xout() As String
ReDim xout(Len(xin))
For x = 1 To Len(xin)
    xout(x - 1) = Mid(xin, x, 1)
    ListBox1.Items.Add(xout(x - 1))
Next</pre>
プロジェクトファイル（VS2010）：Xun6 ｜<a href="http://www.4shared.com/file/G4U1vBIU/_online.html ">4Shared </a>｜<a href="http://www.box.net/shared/c20xccj74z">Box.net</a>
