---
title: "How to Convert a Decimal Number to Binary?"
date: 2011-04-16T19:38:38
slug: "decimal-to-binary-conversion"
tags: ["C++", "Math"]
categories: ["Programming"]
draft: false
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_185412.jpg"><img title="2011-04-16_185412" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_185412.jpg" alt="" width="205" height="237" /></a></p>
<p><del>I expect someone will say this article is too simple again once I finish writing it...</del> Without further ado: this week, our teacher gave our class a problem, which is how to convert a decimal number to binary. If you do it with math, it isn't hard. Just use short division and take the remainders.</p>
<p>
<!--more-->
</p>
<h2>How It Works</h2>
<p>We can write the calculation out as a series of equations: (converting 10 from decimal to binary)</p>
<p>10/2=5...0</p>
<p>5/2=2...1</p>
<p>2/2=1...0</p>
<p>1/2=0...1</p>
<p>So the binary form of 10 is 1010</p>
<p>Following this calculation, we can write a do...loop. When the quotient is less than or equal to 0, the loop ends. Each time, we record the remainder and the quotient, use the quotient for the next division, and finally print the remainders "from bottom to top" to get the answer. This may be a little hard to follow in words, so take a look at the code~</p>
<h2>VB Code:</h2>
<p>VBScript download: <a href="http://www.box.net/shared/nubbnrl49z"> Box.net</a>｜<a href="http://www.4shared.com/file/qkbUp3AR/doctobinary.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/doctobinary.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOOWEzN2M1NWMtOTFlYS00YzllLWE1ZGMtYjIzMDMxMjEzOGNi&amp;hl=zh_TW">Google</a></p>
<pre lang="vb">msgbox("此程式可幫你把十進位轉成二進位")
x=inputbox("請輸入一個數字")	'Get the number to convert
a=x
do while(a>0)	'Perform the division while a>0
	q=a mod 2 & q  	'Get the remainder. The key here is printing from bottom to top
	a=a2		'Get the integer part for the next division
loop
msgbox(q)		'Output the result</pre>
<h2>C++ Code:</h2>
<p>Code download: <a href="http://www.box.net/shared/ctyl4f1ecz">Box.net</a>｜<a href="http://www.4shared.com/file/Z4iuHu0_/_cpp_.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E5%8D%81%E9%80%B2%E4%BD%8D%E8%BD%89%E4%BA%8C%E9%80%B2%E4%BD%8D%28cpp%29.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOYzE1MTE4ZWUtOThiNy00YWZjLTg4ZWEtYzYyMzdmNmJkYjY3&hl=zh_TW">Google</a></p>
<pre lang="cpp">
#include <iostream>
#include <math.h>

using namespace std;

int main()
{
    int x,y,;
    cout<<"Please input one number:";     cin>>x;
    cout<<"result:"<<endl;
    y=x;
    do{
        cout<<!(y % 2)<<endl;
        y=(int)y/2;
      }while(y>0);
    return 0;
}
</pre>
