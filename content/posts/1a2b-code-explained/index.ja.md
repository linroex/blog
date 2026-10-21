---
title: "1A2B のコードと解説"
date: 2011-07-08T18:00:28
slug: "1a2b-code-explained"
tags: ["C++"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_175731.jpg"><img class="alignnone size-large wp-image-550" title="2011-07-08_175731" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_175731-540x352.jpg" alt="" width="540" height="352" /></a>

これは先生が出した課題で、1A2B というゲームを作るものでした。この授業を受けるまで、1A2B は難しいものだと思っていました。授業が終わってみると、全然難しくありませんでした。私が引きこもりすぎて、1A2B のルールすら知らなかっただけでした....


<!--more-->
1A2B は数当てゲームです。答えが 1234 だとして、あなたがその数字を当てようとするとします。

1567 と入力すると、位置も数字も合っている数字が 1 つ（1）あるので、結果は 1A0B です。

1256 と入力すると、位置も数字も合っている数字が 2 つ（1 と 2）あるので、結果は 2A0B です。

次に B の由来を説明します。

4321 と入力すると、4 つの数字すべてが答えに含まれていますが、どれも位置が合っていないので、結果は 0A4B です。

4325 と入力すると、3 つの数字が答えに含まれていますが、どれも位置が合っていないので、結果は 0A3B です。

簡単にいうと、A は位置も数字も合っている数の個数で、B は答えに含まれているけれど位置が違う数の個数です。
<blockquote>ウィキペディアの説明：<a href="http://goo.gl/FvfLq">http://goo.gl/FvfLq</a>

2 人で遊びます。一方が重複のない 4 桁の<a title="数字" href="http://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%97">数字</a>を決め、相手に知られないようにします。もう一方が当て始めます。数字を当てるたびに、数字を決めた側が xA yB の形で結果を返します。A の前の数字は位置も数字も合っている数の個数、B の前の数字は数字は合っているけれど位置が違う数の個数です。</blockquote>
以上のルールから、A を計算する部分と B を計算する部分に分けて考えられます。
<h2>解き方の説明：</h2>
まず A と B を調べる前に、答えとユーザーが入力した数字を、どちらも配列に分けておく必要があります（1 マスに 1 文字）。

A の計算は簡単で、ほとんどの人が書けるはずです。同じ位置を 1 つずつ比べていき、答えと入力が同じ位置で一致したら A を 1 増やします。次のように書けます。

if(x[i]==y[i]){a++;}

/*

x と y は答えとユーザーの入力を入れる配列です。i は i++ で増えていき、x と y のサイズに達するまで続きます。

*/

以上が A の計算ロジックです。B の計算は少し複雑です。

B は「答えに含まれているが、位置が違う数字」なので、線形探索に似た方法を使います。配列の各マスを調べ、違う位置で同じ数字が見つかったら B を 1 増やし、次の数字の探索に進みます。

以下が完全なコードです。A と B を分けて書きました。私のコードは簡単で、数学的な方法で解いています。読めるように、まずコメントを読んでください。

プロジェクトファイルのダウンロード：<a href="http://www.box.net/shared/7u2m75t6scofm3h7hssn">Box.net</a> | <a href="http://www.4shared.com/file/VREvULtr/1A2B.html ">4Shared</a> | <a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/1A2B.zip">Dropbox</a> | <a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZmZiMmU0ZWMtZjI4Ni00NDBhLTk2NzAtZTNhMzIzMjlkMzRl&amp;hl=zh_TW">Google</a>

コード：
<pre lang="cpp">/*
    1A2B のプログラム
    アルゴリズムは一般的な文字列比較とは異なります。
    ユーザーの入力を直接整数として保存し、割り算を使って各桁を取り出します。
    例：
    1234/1000%10=4
    1234/100%10=3
    1234/10%10=2
*/

#include <cstdlib>
#include <iostream>

using namespace std;

int main(int argc, char *argv[])
{
    int x=1234;     //当てられる数字
    int a=0,b=0;        //A と B を数えるカウンター
    int y;      //ユーザーの入力を保存
    while(x!=y){
        a=0;b=0;
        cout<<"請輸入你要猜的數字：";
        cin>>y;
        cout<<endl;

        //A を数える
        for(int i=1;i<=1000;i*=10){     //数学的な方法で 1234 を桁ごとに分解
            if((x/i%10)==(y/i%10)){     //x と y が同じ位置で同じ数字なら a+1
                    a+=1;
                }
            }

        //B を数える
        for(int ii=1;ii<=1000;ii*=10){
            for(int i=1;i<=1000;i*=10){
                if(i==ii){i*=10;}
                    if((x/i%10)==(y/ii%10)){
                        b+=1;
                        break;
                    }
                }
            }

        cout<<"Result："<<a<<"A"<<b<<"B"<<endl;
    }

    cout<<"恭喜您答對了"<<endl;
    system("pause");
    return EXIT_SUCCESS;
}</pre>
