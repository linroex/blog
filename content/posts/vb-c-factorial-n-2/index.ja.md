---
title: "【VB】【C++】n!（階乗）の計算"
date: 2011-01-05T05:58:10
slug: "vb-c-factorial-n-2"
tags: ["VB", "C++", "Algorithms"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_054100.jpg"><img class="alignnone size-large wp-image-4369" title="2011-01-05_054100" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_054100-520x253.jpg" alt="" width="520" height="253" /></a>

n の階乗を計算するのは、とても簡単なことです。このプログラムを書いたのは、順列・組み合わせのためでした。答えがおよそどれくらいの数になるのかを知りたかったので、階乗の値を求める n! の関数を書きました。階乗とは 1*2*3.....*n のことです。順列では、並べるものが5つあれば、結果は最大でも 5*4*3*2*1 の値、つまり最大120通りの答えになります。

以下では n! を Function として作成しました。VB 版と C++ 版があります。ループを学び始めたばかりの人は、この関数でループの使い方を練習できます。また、integer では値が収まらないかもしれないと心配したため、戻り値は string で返すようにしました。この Function を使うときは、戻り値を先に数値型に変換する必要があります。
<h2>
<!--more-->

VB 版 n! 関数</h2>
<pre lang="vb">    Function n_factorial(ByVal n As Integer) As String
        Dim temp As UInteger = 1
        For x = 1 To n
            temp *= x
        Next
        n_factorial = Str(temp)
    End Function</pre>
<strong>プロジェクトファイルのダウンロード（VS2010）：Xun6 ｜ <a href="http://www.4shared.com/file/hTzT5aAh/n_factorial.html ">4Shared </a>｜<a href="http://www.box.net/shared/5ngk747nvc"> Box.net</a></strong>
<h2>C++ 版 n! 関数</h2>
<pre lang="c">int n_factorial(int n){
	int temp=1,x=1;
	for(x=1;x<=n;x++){
		temp*=x;
	}
	return temp;
}</pre>
<strong>プロジェクトファイルのダウンロード（code::blocks で作成）：Xun6 ｜ <a href="http://www.4shared.com/file/C5K4w3SU/n_factorial_c.html ">4Shared </a>｜ <a href="http://www.box.net/shared/5aohsvmftq">Box.net</a></strong>

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_055623.jpg"><img class="alignnone size-large wp-image-4371" title="2011-01-05_055623" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_055623-520x392.jpg" alt="" width="520" height="392" /></a></strong>
