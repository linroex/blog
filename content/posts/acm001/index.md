---
title: "ACM: Q001 (★☆☆☆☆)"
date: 2009-07-25T21:39:49
slug: "acm001"
tags: []
categories: ["ACM"]
---

<p style="text-align: left;"><strong> </strong>請寫一個程式求出2個數的GCD(最大公因數)</p>
<p style="text-align: left;"><span style="color: #ffffff;">.</span></p>
Input and Output

輸入包含好幾筆資料，每筆資料一行，包含2個整數a,b。(0&lt;a,b&lt;10000000)
0 0代表輸入結束。
對每行輸入，輸出這2個數的GCD

<span style="color: #ffffff;">.</span>

Sample Input
12 36
25 24
0 0

Sample Output
GCD(12,36)=12
GCD(25,24)=1


<!--more-->

<p style="text-align: left;">解法：</p>
<p style="text-align: left;">此題為最大公因數的求法，運用輾轉相除法的原理來做</p>
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
---------            '此時 x  mod  y  =  0，y為最大公因數
0

.

.

程式碼:(VB6)
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
