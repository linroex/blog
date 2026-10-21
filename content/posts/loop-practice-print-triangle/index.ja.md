---
title: "三角形の生成：左上、左下、右上、右下"
date: 2011-03-21T02:46:28
slug: "loop-practice-print-triangle"
tags: ["C++"]
categories: ["Programming"]
draft: false
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-21_024015.jpg"><img class="size-large wp-image-379 aligncenter" title="2011-03-21_024015" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-21_024015-540x492.jpg" alt="" width="540" height="492" /></a></p>
<p>これは、プログラムの先生が授業でループを教えたときに出してくれた例の一つです。問題そのものは難しくないと思いますが、ループの練習や反応速度のトレーニングにはとても向いています。それに、今の私は VB の腕がだいぶ落ちてしまいました……。そこで、C++ のコードを添付するので、ぜひ研究してみてください～</p>
<p>
<!--more-->
</p>
<p>問題は一番上の画像のとおりです。ループだけを使って、上の 4 種類の三角形を出力してください。解答は下にあります。</p>
<h2>コード：</h2>
<p>ダウンロード先：<a href="http://www.box.net/shared/p6ucecd7o0">Box.net</a>｜<a href="http://www.4shared.com/file/wnU82uNf/_cpp.html
">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E4%B8%89%E8%A7%92%E5%BD%A2_cpp.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOOGMzNmEzOGEtMzBiNC00ODkzLWE2NWUtNzM5OThiYTAzMGUz&hl=zh_TW">Google</a></p>
<pre lang="cpp">

#include <iostream>
#include <math.h>

using namespace std;

int main()
{
    int x=5;
    cout<<"三角形一："<<endl;
    for(int i=1;i<=x;i++){
        for(int y=1;y<=i;y++){
            cout<<"*";
        }
        cout<<endl;
    }
    cout<<endl;
    cout<<"三角形二："<<endl;
    for(int i=x;i>=1;i--){
        for(int y=1;y<=i;y++){
            cout<<"*";
        }
        cout<<endl;
    }
    cout<<endl;
    cout<<"三角形三："<<endl;
    for(int i=1;i<=x;i++){
        for(int y=x;y>i;y--){
            cout<<" ";
        }
        for(int y=1;y<=i;y++){
            cout<<"*";
        }

        cout<<endl;
    }
    cout<<endl;
    cout<<"三角形四："<<endl;
    for(int i=1;i<=x;i++){
        for(int y=1;y<i;y++){
            cout<<" ";
        }
        for(int y=x;y>=i;y--){
            cout<<"*";
        }

        cout<<endl;
    }
    return 0;
}

</pre>
