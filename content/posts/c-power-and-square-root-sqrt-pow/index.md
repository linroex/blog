---
title: "【C++】如何進行次方與根號運算?(sqrt、pow)"
date: 2011-03-18T15:05:05
slug: "c-power-and-square-root-sqrt-pow"
aliases: ["/posts/%e3%80%90c%e3%80%91%e5%a6%82%e4%bd%95%e9%80%b2%e8%a1%8c%e6%ac%a1%e6%96%b9%e8%88%87%e6%9b%b4%e8%99%9f%e9%81%8b%e7%ae%97sqrt%e3%80%81pow/"]
tags: ["C++", "Math.h", "pow", "sqrt"]
categories: ["C++"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_151805.jpg"><img class="alignnone size-large wp-image-367" title="2011-03-18_151805" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_151805-540x380.jpg" alt="" width="540" height="380" /></a>

在一些程式語言裡面，要進行次方運算是可以直接用^運算子來達到的，但是之前在寫題目時才發現原來C++裡面要做次方運算必須要使用pow函式才能達到，在這篇文章裡要介紹兩個函式，一個是pow，它可以幫你做次方運算，另一個就是sqrt，它可以幫你做根更號的工作


<!--more-->

<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="84"></td>
<td valign="top" width="84">sqrt</td>
<td valign="top" width="84">pow</td>
</tr>
<tr>
<td valign="top" width="84">功能</td>
<td valign="top" width="84">開根號</td>
<td valign="top" width="84">次方運算</td>
</tr>
<tr>
<td valign="top" width="84">函式庫</td>
<td valign="top" width="84">math.h</td>
<td valign="top" width="84">math.h</td>
</tr>
</tbody>
</table>
程式碼載點：<a href="http://www.box.net/shared/xpp8gs31c8">Box.net</a>｜<a href="http://www.4shared.com/file/U1MumMpB/sqrtpow.html<br />
">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/sqrt%26pow.zip">Dropbox</a>｜<a href="http://goo.gl/DcL2i">Google</a>
<h2>一.根號運算：</h2>
格式： result=sqrt(要開根號的數字)

範例：取得9的根號結果
<pre lang="cpp">#include
#includeusing namespace std;

int main()
{
    cout <</pre>
<h2>二.次方運算：</h2>
格式： result=pow(x，y)

範例：取得2的4次方結果
<pre lang="cpp">#include
#include

using namespace std;

int main()
{
    cout <</pre>
