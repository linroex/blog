---
title: "[C++] How to Do Exponentiation and Square Roots (sqrt, pow)"
date: 2011-03-18T15:05:05
slug: "c-power-and-square-root-sqrt-pow"
tags: ["C++", "Math"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_151805.jpg"><img class="alignnone size-large wp-image-367" title="2011-03-18_151805" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_151805-540x380.jpg" alt="" width="540" height="380" /></a>

In some programming languages, you can do exponentiation directly with the ^ operator. But while working on a problem, I found out that in C++, you have to use the pow function to do exponentiation. This article introduces two functions: pow, which does exponentiation for you, and sqrt, which takes square roots.


<!--more-->

<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td valign="top" width="84"></td>
<td valign="top" width="84">sqrt</td>
<td valign="top" width="84">pow</td>
</tr>
<tr>
<td valign="top" width="84">What it does</td>
<td valign="top" width="84">Square root</td>
<td valign="top" width="84">Exponentiation</td>
</tr>
<tr>
<td valign="top" width="84">Library</td>
<td valign="top" width="84">math.h</td>
<td valign="top" width="84">math.h</td>
</tr>
</tbody>
</table>
Code download: <a href="http://www.box.net/shared/xpp8gs31c8">Box.net</a>|<a href="http://www.4shared.com/file/U1MumMpB/sqrtpow.html<br />
">4Shared</a>|<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/sqrt%26pow.zip">Dropbox</a>|<a href="http://goo.gl/DcL2i">Google</a>
<h2>1. Square root:</h2>
Format: result=sqrt(the number you want the square root of)

Example: get the square root of 9
<pre lang="cpp">#include
#includeusing namespace std;

int main()
{
    cout <</pre>
<h2>2. Exponentiation:</h2>
Format: result=pow(x, y)

Example: get 2 to the power of 4
<pre lang="cpp">#include
#include

using namespace std;

int main()
{
    cout <</pre>
