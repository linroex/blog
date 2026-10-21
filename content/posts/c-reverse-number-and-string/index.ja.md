---
title: "【C++】数字の反転・文字列の反転（応用：型変換、文字列処理、ループ）"
date: 2011-03-06T11:18:22
slug: "c-reverse-number-and-string"
tags: ["C++", "Algorithms"]
categories: ["Programming"]
draft: false
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-06_111510.jpg"><img class="size-large wp-image-342 aligncenter" title="2011-03-06_111510" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-06_111510-540x382.jpg" alt="" width="540" height="382" /></a></p>
<p>これはかなり簡単な問題で、数字や文字列を反転させるだけです。たとえば「linroex」と入力すると「xeornil」が、123 と入力すると 321 が出力されます。解き方は難しくありません。C++ では文字列を配列のようにアクセスできる特徴を利用して、入力文字列の長さをループの終了値に設定します。ループを 1 回まわすたびに、文字列 X の最後の文字を文字列 Y の先頭に移します。ループが終わったとき、反転が完了しています。</p>
<p>
<!--more-->
上では文字列の反転を説明しましたが、数字の反転も基本的な考え方は同じです。違うのは、最後に反転させた文字列の配列を int に変換することです。こうすると先頭の 0 を取り除くことができます。</p>
<blockquote><p>数字の反転とは？</p>
<p>数字の桁を逆にすることです。先頭に 0 があれば取り除きます。たとえば、500 と入力すると 5 が、5050 と入力すると 505 が返されます。</p>
</blockquote>
<h2></h2>
<h2>数字の反転：</h2>
<pre lang="cpp">
/*
数字の反転機能
例：123 と入力すると 321 が出力される
500 と入力すると 5 が出力される（0 は取り除く）
512 と入力すると 215 が出力される
*/
#include <iostream>
#include <stdlib.h>

using namespace std;

int main()
{
    string x;
    while(cin>>x){
        char re[100000]="";
        for(int i=0;i<x.length();i++){		//ループを作る。終了値は x の長さ
            re[i]=x[x.length()-i-1];		//x の文字を逆順に re の配列へコピーする。x は後ろから読み、re は前から詰める
        }
        cout<<atoi(re)<<endl;		//re の配列を int に変換して出力する
    }
    return 0;
}

</pre>
<p>プログラムのダウンロード： <a href="http://www.box.net/shared/lgo8sycqfk" target="_blank">Box.net</a>｜<a href="http://www.4shared.com/file/sQlfh6gA/_online.html " target="_blank">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E6%95%B8%E5%AD%97%E7%BF%BB%E8%BD%89.zip" target="_blank">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZjNjNWM3YjktMjE5Yi00OTQzLWJiNDgtYTM0ZTU4MThmZGI2&amp;sort=name&amp;layout=list&amp;num=50" target="_blank">Google</a></p>
<p>文字列の反転にしたい場合は、
<pre lang="cpp">cout<<atoi(re)<<endl;</pre>
の行を
<pre lang="cpp">cout<<re<<endl</pre>
に変えると、文字列の反転になります。</p>
