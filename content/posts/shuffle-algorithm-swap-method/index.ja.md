---
title: "シャッフルアルゴリズム（交換法）"
date: 2011-06-05T01:00:07
slug: "shuffle-algorithm-swap-method"
tags: ["Algorithms", "C++"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005920.jpg"><img class="size-large wp-image-534 aligncenter" title="2011-06-05_005920" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005920-540x352.jpg" alt="" width="540" height="352" /></a>

シャッフルアルゴリズムは、重複しない乱数を生成できるアルゴリズムの一つです。たとえば、10 個の乱数を生成し、そのすべてが「重複しない」必要があるとします。多くの人は、まず rand 関数で乱数を 1 つ取得して配列に格納し、配列にすでにある数字と比較する方法を思いつくと思います。この方法は簡単ですが、性能がとても悪くなります。ここで紹介するシャッフルアルゴリズムは、性能の面でその方法とは天と地ほどの差があります。シャッフルアルゴリズムの原理は実はとても単純で、まず配列に数字を入れ、その後に数字を打ち散らす（シャッフルする）というものです。


<!--more-->

<h2><a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005837.jpg"><img class="alignnone size-large wp-image-533" title="2011-06-05_005837" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005837-529x540.jpg" alt="" width="529" height="540" /></a></h2>
<h2>解説：</h2>
たとえば、10 個の重複しない乱数を生成したいとします。

まず、配列を作成して 1～10 を格納します。
<pre lang="cpp">int x[10]={0};

for(int i=0;i<=9;i++){
	x[i]=i;		//配列 x の 1~10 の要素に順番にデータを入れる（例：x[1]=1, x[2]=2）
}</pre>
つまり、x[0]=0、x[1]=1、x[2]=2……となります。

次に、交換法を使って配列のデータを打ち散らします。
<pre lang="cpp">time_t xx;
    srand((unsigned)time(NULL));			//現在の時刻で乱数表を初期化する

    for(int ii=0;ii<=1000;ii++){
        int n1=rand()%10;		//0～9 の乱数を生成する
        int n2=rand()%10;
        //配列のデータを交換する（打ち散らす）
		int temp=x[n1];
        x[n1]=x[n2];
        x[n2]=temp;

    }</pre>
0～9 の乱数を生成して n1、n2 に代入し、x[n1] と x[n2] のデータを入れ替えます。

この動作をある回数（ここでは 1000 回と仮定します）繰り返すと、配列 x のデータは完全にばらばらになります。

つまり、x[0] に入っているのが必ずしも 0 とは限らず、x[1] に入っているのも必ずしも 1 とは限らなくなります。

これでアルゴリズムの説明は完了です。

配列の中身を出力すると、それは実質的に乱数になっていて、しかも数字が重複しません。
<h2>詳細なソースコード：</h2>
<pre lang="cpp">/*
	洗牌演算法（シャッフルアルゴリズム）
	重複しない乱数を生成する
	座席の割り当てに使える
*/

#include <iostream>
#include<stdlib.h>		//乱数関数に必要
#include<time.h>

using namespace std;

int main()
{
    int x[10]={0};

    for(int i=0;i<=9;i++){
        x[i]=i;		//配列 x の 1~10 の要素に順番にデータを入れる（例：x[1]=1, x[2]=2）
    }

    time_t xx;
    srand((unsigned)time(NULL));			//現在の時刻で乱数表を初期化する

    for(int ii=0;ii<=1000;ii++){
        int n1=rand()%10;		//0～9 の乱数を生成する
        int n2=rand()%10;
        //配列のデータを交換する（打ち散らす）
		int temp=x[n1];
        x[n1]=x[n2];
        x[n2]=temp;

    }

    for(int i=0;i<=9;i++){
        cout<<x[i]<<endl;		//出力
    }
    system("pause");
    return 0;
}</pre>
<strong>プロジェクトファイルのダウンロード：<a href="http://www.box.net/shared/ng2m4bob8y">Box.net</a>｜<a href="http://www.4shared.com/file/yqDqpjHk">4Shared</a>｜<a href="http://goo.gl/6z39H">Google</a>｜<a href="http://goo.gl/tmUt9">Dropbox</a></strong>
<h2>シャッフルアルゴリズムの原理：</h2>
原理はそれほど難しくありません。最初、配列 x の中身は 1～10 の順に並んでいます。打ち散らした後も x には 1～10 の数字が入ったままですが、元の並び順はなくなっています。そのあとに x[0] から x[9] を順番に出力すると、その出力結果が乱数になるのです。
<h2>あとがき：</h2>
シャッフルアルゴリズムはどんなときに使うのでしょうか。いちばん身近な例は、座席の割り当てでしょう。各座席に番号を振り、配列の添字を生徒の出席番号に対応させます。そしてシャッフルアルゴリズムを使えば、どの生徒も「ランダムな」座席を得られ、同じ座席が二度割り当てられることもありません。
