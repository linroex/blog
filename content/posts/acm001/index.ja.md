---
title: "ACM: Q001 (★☆☆☆☆)"
date: 2009-07-25T21:39:49
slug: "acm001"
tags: ["ACM"]
categories: ["Programming"]
draft: false
---

<p style="text-align: left;"><strong> </strong>2つの数の GCD（最大公約数）を求めるプログラムを書いてください。</p>
<p style="text-align: left;"><span style="color: #ffffff;">.</span></p>
入力と出力

入力は複数の行からなり、各行に整数 a と b が 1 組ずつ含まれます。(0&lt;a,b&lt;10000000)
「0 0」の行が入力の終わりを表します。
入力の各行について、その 2 つの数の GCD を出力してください。

<span style="color: #ffffff;">.</span>

入力例
12 36
25 24
0 0

出力例
GCD(12,36)=12
GCD(25,24)=1


<!--more-->

<p style="text-align: left;">解法：</p>
<p style="text-align: left;">この問題は最大公約数を求める問題です。ユークリッドの互除法（剰余を繰り返す方法）の原理を使って解きます。</p>
<p style="text-align: left;">Ex1:
12 " 36
36
---------
12    0</p>
Ex2:         x       y
50 " 17  --- 50 mod 17 = 16
34
---------
16 " 17  --- 17 mod 16 = 1
16
---------
16 "  1  --- 16 mod  1 = 0
16
---------            'このとき x mod y = 0 なので、y が最大公約数
0

.

.

コード（VB6）:
<pre lang="vb">Private Sub Form_Load()
    ifile = App.Path &amp; "test.txt"
    ofile = App.Path &amp; "result.txt"
Open ifile For Input As #1
Open ofile For Output As #2
    Do Until EOF(1)
    Input #1, x
    Input #1, y
        a = x
        b = y
        If x = 0 And y = 0 Then
            End
        End If
        While x Mod y &lt;&gt; 0
            z = x Mod y
            x = y
            y = z
        End While
    Print #2, "GCD(" &amp; a &amp; "," &amp; b &amp; ")=" &amp; Trim(y)
    Loop
    Close()
    End
End Sub</pre>
