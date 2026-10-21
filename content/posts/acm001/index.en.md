---
title: "ACM: Q001 (★☆☆☆☆)"
date: 2009-07-25T21:39:49
slug: "acm001"
tags: ["ACM"]
categories: ["Programming"]
draft: false
---

<p style="text-align: left;"><strong> </strong>Write a program that finds the GCD (greatest common divisor) of two numbers.</p>
<p style="text-align: left;"><span style="color: #ffffff;">.</span></p>
Input and Output

The input contains several lines of data, one pair of integers a and b per line. (0&lt;a,b&lt;10000000)
A line with 0 0 marks the end of the input.
For each input line, output the GCD of those two numbers.

<span style="color: #ffffff;">.</span>

Sample Input
12 36
25 24
0 0

Sample Output
GCD(12,36)=12
GCD(25,24)=1


<!--more-->

<p style="text-align: left;">Solution:</p>
<p style="text-align: left;">This problem is about finding the GCD. It uses the principle of the Euclidean algorithm (repeated division).</p>
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
---------            'Now x mod y = 0, so y is the GCD
0

.

.

Code (VB6):
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
