---
title: "如何把十進位數字轉換成二進位？"
date: 2011-04-16T19:38:38
slug: "decimal-to-binary-conversion"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e6%8a%8a%e5%8d%81%e9%80%b2%e4%bd%8d%e6%95%b8%e5%ad%97%e8%bd%89%e6%8f%9b%e6%88%90%e4%ba%8c%e9%80%b2%e4%bd%8d%ef%bc%9f/"]
tags: ["C++", "二進位", "十進位"]
categories: ["VB6", "C++"]
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_185412.jpg"><img title="2011-04-16_185412" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_185412.jpg" alt="" width="205" height="237" /></a></p>
<p><del>我估計寫完這文章之後又有人要說我寫的文章太簡單了...</del> 廢話不多說，這週程式課我們老師給我們班出了一道題目，內容就是要如何把十進位轉換成二進位，如果是用數學來算的話其實不難，用短除法去算，然後取餘數就可以了</p>
<p>
<!--more-->
</p>
<h2>原理剖析</h2>
<p>我們可以把計算過程寫成算式：(10的十進位轉成2進位)</p>
<p>10/2=5...0</p>
<p>5/2=2...1</p>
<p>2/2=1...0</p>
<p>1/2=0...1</p>
<p>所以10的二進位就是1010</p>
<p>照者這個算式來看，我們可以寫一個do...loop迴圈，當商數等於或小於0的時候，代表迴圈要結束，另外要記錄每次做除法的餘數跟商數，用商數做下一次的除法運算，最後把餘數「從下往上」輸出就是答案了，這樣講可能有點難懂，請看Code～</p>
<h2>VB程式碼：</h2>
<p>VBScript檔下載：<a href="http://www.box.net/shared/nubbnrl49z"> Box.net</a>｜<a href="http://www.4shared.com/file/qkbUp3AR/doctobinary.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/doctobinary.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOOWEzN2M1NWMtOTFlYS00YzllLWE1ZGMtYjIzMDMxMjEzOGNi&amp;hl=zh_TW">Google</a></p>
<pre lang="vb">msgbox("此程式可幫你把十進位轉成二進位")
x=inputbox("請輸入一個數字")	'取得要轉換的數字
a=x
do while(a>0)	'當a>0的時候執行除法
	q=a mod 2 & q  	'取得餘數，這行的關鍵是在於由下往上列印
	a=a2		'取得整數部分，以進行下一次除法運算
loop
msgbox(q)		'輸出結果</pre>
<h2>C++程式碼：</h2>
<p>程式碼載點： <a href="http://www.box.net/shared/ctyl4f1ecz">Box.net</a>｜<a href="http://www.4shared.com/file/Z4iuHu0_/_cpp_.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E5%8D%81%E9%80%B2%E4%BD%8D%E8%BD%89%E4%BA%8C%E9%80%B2%E4%BD%8D%28cpp%29.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOYzE1MTE4ZWUtOThiNy00YWZjLTg4ZWEtYzYyMzdmNmJkYjY3&hl=zh_TW">Google</a></p>
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
