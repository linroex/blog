---
title: "【C++】數字翻轉、字串翻轉(應用：轉型別、字串處理、迴圈)"
date: 2011-03-06T11:18:22
slug: "c-reverse-number-and-string"
aliases: ["/posts/%e3%80%90c%e3%80%91%e6%95%b8%e5%ad%97%e7%bf%bb%e8%bd%89%e3%80%81%e5%ad%97%e4%b8%b2%e7%bf%bb%e8%bd%89%e6%87%89%e7%94%a8%ef%bc%9a%e8%bd%89%e5%9e%8b%e5%88%a5%e3%80%81%e5%ad%97%e4%b8%b2%e8%99%95/"]
tags: ["C++", "Algorithms"]
categories: ["Programming"]
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-06_111510.jpg"><img class="size-large wp-image-342 aligncenter" title="2011-03-06_111510" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-06_111510-540x382.jpg" alt="" width="540" height="382" /></a></p>
<p>這算是蠻簡單的題目，就只是做數字or字串的翻轉，例如輸入：linroex會輸出：xeornil或是輸入123會傳回321，這題解法並不難，透過C++裡面字串可以用陣列的方式存取這個特性，我們設定一個迴圈，然後取得輸入字串的長度作為迴圈的結束值，接者當迴圈跑一圈時就把X字串最後一個字移到Y字串第一個字，這樣當迴圈跑完時就翻轉完成了</p>
<p>
<!--more-->
另外上面講的是字串翻轉，但如果要做數字翻轉的話，大致原理跟前述一樣，只是最後你要把字串陣列轉成Int的形態，就可以把0清除掉</p>
<blockquote><p>何謂數字翻轉？</p>
<p>將是把數字做翻轉，如果開頭有零就要去除掉，例如輸入500會傳回5，輸入5050會傳回505</p>
</blockquote>
<h2></h2>
<h2>數字翻轉：</h2>
<pre lang="cpp">
/*
數字翻轉功能
例如：輸入123會輸出321
輸入500會輸出5(因為0要去掉)
輸入512會輸出215
*/
#include <iostream>
#include <stdlib.h>

using namespace std;

int main()
{
    string x;
    while(cin>>x){
        char re[100000]="";
        for(int i=0;i<x.length();i++){		//建立一個迴圈，迴圈結束值是x的長度
            re[i]=x[x.length()-i-1];		//把x陣列的字轉移到re陣列，不過順序是：x從後面來，y從前面放
        }
        cout<<atoi(re)<<endl;		//將re陣列轉成int然後輸出
    }
    return 0;
}

</pre>
<p>程式碼載點： <a href="http://www.box.net/shared/lgo8sycqfk" target="_blank">Box.net</a>｜<a href="http://www.4shared.com/file/sQlfh6gA/_online.html " target="_blank">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E6%95%B8%E5%AD%97%E7%BF%BB%E8%BD%89.zip" target="_blank">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZjNjNWM3YjktMjE5Yi00OTQzLWJiNDgtYTM0ZTU4MThmZGI2&amp;sort=name&amp;layout=list&amp;num=50" target="_blank">Google</a></p>
<p>如果要做成字串翻轉，就把
<pre lang="cpp">cout<<atoi(re)<<endl;</pre>
那行改成
<pre lang="cpp">cout<<re<<endl</pre>
就是字串翻轉了</p>
