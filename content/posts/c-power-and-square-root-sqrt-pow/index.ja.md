---
title: "【C++】べき乗と平方根の計算方法（sqrt、pow）"
date: 2011-03-18T15:05:05
slug: "c-power-and-square-root-sqrt-pow"
tags: ["C++", "Math"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_151805.jpg"><img class="alignnone size-large wp-image-367" title="2011-03-18_151805" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_151805-540x380.jpg" alt="" width="540" height="380" /></a>

一部のプログラミング言語では、^ 演算子を使って直接べき乗を計算できます。しかし、ある問題を解いているときに、C++ ではべき乗の計算に pow 関数を使う必要があることに気づきました。この記事では、2 つの関数を紹介します。1 つは べき乗を計算してくれる pow、もう 1 つは平方根を求めてくれる sqrt です。


<!--more-->

<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="84"></td>
<td valign="top" width="84">sqrt</td>
<td valign="top" width="84">pow</td>
</tr>
<tr>
<td valign="top" width="84">用途</td>
<td valign="top" width="84">平方根</td>
<td valign="top" width="84">べき乗</td>
</tr>
<tr>
<td valign="top" width="84">ライブラリ</td>
<td valign="top" width="84">math.h</td>
<td valign="top" width="84">math.h</td>
</tr>
</tbody>
</table>
プログラムのダウンロード： <a href="http://www.box.net/shared/xpp8gs31c8">Box.net</a>｜<a href="http://www.4shared.com/file/U1MumMpB/sqrtpow.html<br />
">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/sqrt%26pow.zip">Dropbox</a>｜<a href="http://goo.gl/DcL2i">Google</a>
<h2>1. 平方根：</h2>
書式： result=sqrt(平方根を求めたい数)

例：9 の平方根を求める
<pre lang="cpp">#include
#includeusing namespace std;

int main()
{
    cout <</pre>
<h2>2. べき乗：</h2>
書式： result=pow(x, y)

例：2 の 4 乗を求める
<pre lang="cpp">#include
#include

using namespace std;

int main()
{
    cout <</pre>
