---
title: "【VB】【C++】計算n!(階層)"
date: 2011-01-05T05:58:10
slug: "vb-c-factorial-n-2"
aliases: ["/posts/%e3%80%90vb%e3%80%91%e3%80%90c%e3%80%91%e8%a8%88%e7%ae%97n%e9%9a%8e%e5%b1%a4-2/"]
tags: ["n!", "C++", "function", "數學", "等差級數"]
categories: ["VB.NET", "C/C++"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_054100.jpg"><img class="alignnone size-large wp-image-4369" title="2011-01-05_054100" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_054100-520x253.jpg" alt="" width="520" height="253" /></a>

要計算n的階層是很簡單的一件事,會寫到這個程式是因為排列組合,我想要精確的知道答案會在幾種左右,因此就寫了n!的函數來幫忙求階層的值,所謂的階層就是指從1*2*3.....*n的意思,而在排列組合中如果要被排列的字有5個字,那麼排列後的結果就最多不超過5*4*3*2*1的值,也就是最多不超過120個答案

以下我把n!做成Function,有VB版的跟C++版的,剛開始學迴圈的人可以用這個函式來學習迴圈的用法,另外因為擔心integer會存不下資料,所以我使用string來傳回資料,到時候用這個Function時要先把傳回值轉成數字型別才可以
<h2>
<!--more-->

VB版n!函式</h2>
<pre lang="vb">    Function n_factorial(ByVal n As Integer) As String
        Dim temp As UInteger = 1
        For x = 1 To n
            temp *= x
        Next
        n_factorial = Str(temp)
    End Function</pre>
<strong>專案檔載點(VS2010)：Xun6 ｜ <a href="http://www.4shared.com/file/hTzT5aAh/n_factorial.html ">4Shared </a>｜<a href="http://www.box.net/shared/5ngk747nvc"> Box.net</a></strong>
<h2>C++版n!函式</h2>
<pre lang="c">int n_factorial(int n){
	int temp=1,x=1;
	for(x=1;x<=n;x++){
		temp*=x;
	}
	return temp;
}</pre>
<strong>專案檔載點(by code::blocks)：Xun6 ｜ <a href="http://www.4shared.com/file/C5K4w3SU/n_factorial_c.html ">4Shared </a>｜ <a href="http://www.box.net/shared/5aohsvmftq">Box.net</a></strong>

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_055623.jpg"><img class="alignnone size-large wp-image-4371" title="2011-01-05_055623" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_055623-520x392.jpg" alt="" width="520" height="392" /></a></strong>
