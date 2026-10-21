---
title: "[VB] Splitting a String into Characters (Mid + For Loop)"
date: 2010-12-28T20:01:36
slug: "vb-split-string-mid-for-loop-2"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-28_201330.jpg"><img class="size-full wp-image-4332 aligncenter" title="2010-12-28_201330" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-28_201330.jpg" alt="" width="312" height="344" /></a></p>
Splitting a string into characters is actually very simple, but it comes up a lot in ACM problems. For example, permutation and combination problems require you to split a string into characters before doing any calculation. The Caesar cipher also uses this technique. Below I'll demonstrate with VB.NET. Other programming languages can do the same thing, and the principle is identical.


<!--more-->
VB has a function called Mid, which extracts part of a string by specifying a starting position and a length. For example, Mid("abcde",1,1) returns "a".
<h2>About the Mid function</h2>
Mid(the string to split, start position, length)

The string to split is simply the text or variable you want to split.

The start position is the character where the split begins. Note that it cannot be 0.

The length is how many characters to cut out.
<h2>Example:</h2>
<pre lang="vb">dim x as string
x="linroex"
msgbox(mid(x,1,3))</pre>
This example takes three characters from the variable x, starting from the first character.

By combining the Mid function with a loop, you can split a string into individual characters.
<h2>Splitting a string into characters (VB):</h2>
<pre lang="vb">Dim xin As String = TextBox1.Text
Dim xout() As String
ReDim xout(Len(xin))
For x = 1 To Len(xin)
    xout(x - 1) = Mid(xin, x, 1)
    ListBox1.Items.Add(xout(x - 1))
Next</pre>
Project file (VS2010): Xun6 | <a href="http://www.4shared.com/file/G4U1vBIU/_online.html ">4Shared </a>| <a href="http://www.box.net/shared/c20xccj74z">Box.net</a>
