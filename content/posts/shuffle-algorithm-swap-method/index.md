---
title: "洗牌演算法（交換法）"
date: 2011-06-05T01:00:07
slug: "shuffle-algorithm-swap-method"
aliases: ["/posts/%e6%b4%97%e7%89%8c%e6%bc%94%e7%ae%97%e6%b3%95%ef%bc%88%e4%ba%a4%e6%8f%9b%e6%b3%95%ef%bc%89/"]
tags: ["C++", "亂數", "洗牌演算法"]
categories: ["C++", "演算法"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005920.jpg"><img class="size-large wp-image-534 aligncenter" title="2011-06-05_005920" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005920-540x352.jpg" alt="" width="540" height="352" /></a>

洗牌演算法就是可以產生不重複的亂數的一種演算法，舉例來講如果要產生十個亂數，並且這十個亂數必須是「不重複」的，那很多人的直覺是用rand函式取得一個亂數值以後，存入陣列，並且跟陣列內以有的數字做比對，這種方法簡單是簡單，但是效能很差，而這裡要介紹的洗牌演算法效能跟剛剛講的方法可說是天差地遠，洗牌演算法的原理其實很簡單，就是先在陣列裡存入數字，然後將數字打散


<!--more-->

<h2><a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005837.jpg"><img class="alignnone size-large wp-image-533" title="2011-06-05_005837" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005837-529x540.jpg" alt="" width="529" height="540" /></a></h2>
<h2>講解：</h2>
例如現在要產生10個不重複的亂數

則我們建立一個陣列，並在裡面存入1～10
<pre lang="cpp">int x[10]={0};

for(int i=0;i<=9;i++){
	x[i]=i;		//將x陣列的1~10元素依序填入資料，例如x[1]=1,x[2]=2
}</pre>
也就是說x[0]=0，x[1]=1，x[2]=2.....

再來我們將陣列的資料打散，利用交換法
<pre lang="cpp">time_t xx;
    srand((unsigned)time(NULL));			//用時間重設亂數表

    for(int ii=0;ii<=1000;ii++){
        int n1=rand()%10;		//產生0～9的亂數
        int n2=rand()%10;
        //將陣列資料進行交換（打散）
		int temp=x[n1];
        x[n1]=x[n2];
        x[n2]=temp;

    }</pre>
產生0～9的亂數，指定為n1、n2，並且將x[n1]與x[n2]的資料互換

趙這個動作持續一定次數之後（此處假設為1000次），陣列x裡面的資料就完全混亂了

也就是說x[0]裡面存的不再是0，x[1]裡面存的也未必是1

到這裡就算是完成囉～

輸出陣列裡的資料，然後他其實就是亂數XD，而且內容還不會重複
<h2>詳細原始碼：</h2>
<pre lang="cpp">/*
	洗牌演算法
	產生不重複亂數
	可用於排座位
*/

#include <iostream>
#include<stdlib.h>		//亂數函式要用的
#include<time.h>

using namespace std;

int main()
{
    int x[10]={0};

    for(int i=0;i<=9;i++){
        x[i]=i;		//將x陣列的1~10元素依序填入資料，例如x[1]=1,x[2]=2
    }

    time_t xx;
    srand((unsigned)time(NULL));			//用時間重設亂數表

    for(int ii=0;ii<=1000;ii++){
        int n1=rand()%10;		//產生0～9的亂數
        int n2=rand()%10;
        //將陣列資料進行交換（打散）
		int temp=x[n1];
        x[n1]=x[n2];
        x[n2]=temp;

    }

    for(int i=0;i<=9;i++){
        cout<<x[i]<<endl;		//輸出
    }
    system("pause");
    return 0;
}</pre>
<strong>專案檔下載：<a href="http://www.box.net/shared/ng2m4bob8y">Box.net</a>｜<a href="http://www.4shared.com/file/yqDqpjHk">4Shared</a>｜<a href="http://goo.gl/6z39H">Google</a>｜<a href="http://goo.gl/tmUt9">Dropbox</a></strong>
<h2>洗牌演算法原理：</h2>
他的原理其實不難懂，因為你一開始x陣列的內容是有順序的1～10，但是經過打散以後，x陣列的內容仍然是1～10的數字，但是原有的順序性就不再存在了，這時候如果再用x[0]～x[9]的順序來輸出，所輸出的資料就是亂數
<h2>後記：</h2>
大概什麼時候會用到洗牌演算法呢？像最常見可能就是選座位的時候吧，先把每個座位都設定好一個編號，然後陣列的維度就是代表同學的學號，透過洗牌演算法，就可以讓每個同學都分到「隨機」的座位，並且座位絕對不會重複
