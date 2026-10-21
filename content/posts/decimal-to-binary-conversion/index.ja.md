---
title: "10進数を2進数に変換する方法は？"
date: 2011-04-16T19:38:38
slug: "decimal-to-binary-conversion"
tags: ["C++", "Math"]
categories: ["Programming"]
draft: false
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_185412.jpg"><img title="2011-04-16_185412" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_185412.jpg" alt="" width="205" height="237" /></a></p>
<p><del>この記事を書き終えたら、また「簡単すぎる」と言う人が出てくるでしょうね……</del> さて本題に入ります。今週、プログラミングの授業で先生からクラス全員に出された課題は、10進数を2進数に変換する方法でした。数学的に計算するなら難しくありません。割り算の余りを取っていく短除法を使えばいいだけです。</p>
<p>
<!--more-->
</p>
<h2>原理の解説</h2>
<p>計算の過程を式で書くと次のようになります。（10 を 10進数から 2進数に変換する場合）</p>
<p>10/2=5...0</p>
<p>5/2=2...1</p>
<p>2/2=1...0</p>
<p>1/2=0...1</p>
<p>したがって、10 の 2進数は 1010 になります。</p>
<p>この式に従えば、do...loop の繰り返し処理を書けます。商が 0 以下になったらループを終了します。また、割り算のたびに余りと商を記録し、商を次の割り算に使います。最後に余りを「下から上へ」出力すれば答えになります。言葉だけでは少し分かりにくいかもしれないので、コードを見てみてください～</p>
<h2>VB のコード：</h2>
<p>VBScript ファイルのダウンロード：<a href="http://www.box.net/shared/nubbnrl49z"> Box.net</a>｜<a href="http://www.4shared.com/file/qkbUp3AR/doctobinary.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/doctobinary.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOOWEzN2M1NWMtOTFlYS00YzllLWE1ZGMtYjIzMDMxMjEzOGNi&amp;hl=zh_TW">Google</a></p>
<pre lang="vb">msgbox("此程式可幫你把十進位轉成二進位")
x=inputbox("請輸入一個數字")	'変換する数値を取得
a=x
do while(a>0)	'a>0 の間、割り算を実行
	q=a mod 2 & q  	'余りを取得。ここでのポイントは下から上へ出力すること
	a=a2		'次の割り算のために整数部分を取得
loop
msgbox(q)		'結果を出力</pre>
<h2>C++ のコード：</h2>
<p>コードのダウンロード：<a href="http://www.box.net/shared/ctyl4f1ecz">Box.net</a>｜<a href="http://www.4shared.com/file/Z4iuHu0_/_cpp_.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E5%8D%81%E9%80%B2%E4%BD%8D%E8%BD%89%E4%BA%8C%E9%80%B2%E4%BD%8D%28cpp%29.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOYzE1MTE4ZWUtOThiNy00YWZjLTg4ZWEtYzYyMzdmNmJkYjY3&hl=zh_TW">Google</a></p>
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
