---
title: "VB - Resizing an Array with Redim"
date: 2009-07-02T10:25:30
slug: "vb-redim-array-resize"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

Anyone who has learned VB has surely come across the Dim syntax, right?

It declares a variable (an array) and tells the computer to set aside a block of space for the program.

But sometimes you don't know how many items an array will hold.

So setting its size to something huge is a waste.

Today's topic, Redim, is a statement that lets you reset an array's size.


<!--more-->


Syntax:
<pre lang="vb">Redim ArrayName(Size)</pre>
Example:
<pre lang="vb.net">Module Module1

    Sub Main()
        Dim X(10)
        Console.WriteLine("Redim前x陣列的寬度" &amp; X.Length)
        Console.Write("設定x陣列的寬度:")
        Dim y As Integer = Console.ReadLine() - 1
        ReDim X(y)
        Console.WriteLine("Redim之後x陣列的寬度" &amp; X.Length)
        Console.ReadLine()

    End Sub

End Module</pre>
Note:

In the example above, array x is first declared as "unlimited," and then reset to 10 (its size).
