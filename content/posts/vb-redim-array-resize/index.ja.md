---
title: "VB - Redim で配列の要素数を再設定する"
date: 2009-07-02T10:25:30
slug: "vb-redim-array-resize"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

VB を勉強したことがある人なら、Dim 構文はきっとご存じですよね。

Dim は変数（配列）を宣言し、プログラムのためにメモリ上の領域を確保するようコンピューターに伝える文です。

しかし、配列にいくつのデータが入るのか分からないこともあります。

そのような場合に最初から非常に大きな値を指定するのは無駄です。

今回紹介する Redim は、配列の要素数を後から再設定できる文です。


<!--more-->


構文：
<pre lang="vb">Redim 配列名(サイズ)</pre>
例：
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
注：

上の例では、最初に配列 x を「無限」として宣言し、その後 10（サイズ）に再設定しています。
