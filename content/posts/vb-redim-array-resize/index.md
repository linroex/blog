---
title: "VB - Redim 重新設定陣列長度"
date: 2009-07-02T10:25:30
slug: "vb-redim-array-resize"
aliases: ["/posts/vb-redim-%e5%be%9e%e6%96%b0%e8%a8%ad%e5%ae%9a%e9%99%a3%e5%88%97%e9%95%b7%e5%ba%a6/"]
tags: ["VB"]
categories: ["Programming"]
---

學過VB的人想必都知道Dim語法吧

它可以幫你宣告變數(陣列),告訴電腦要清出一塊空間給程式

但有的時候你不知道陣列裡會存多少東西

所以就直接設定無限其實是很浪費的

今天要交各位用的Redim就是一個可以讓你從新設定陣列寬度的語法


<!--more-->


語法:
<pre lang="vb">Redim 陣列名稱(寬度)</pre>
範例:
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
註:

上面的範例代表一開始宣告陣列x為無限

然後再把它重新設定為10(寬度)
