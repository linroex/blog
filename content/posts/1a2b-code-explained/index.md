---
title: "1A2B程式碼、詳解"
date: 2011-07-08T18:00:28
slug: "1a2b-code-explained"
aliases: ["/posts/1a2b%e7%a8%8b%e5%bc%8f%e7%a2%bc%e3%80%81%e8%a9%b3%e8%a7%a3/"]
tags: ["C++", "1A2B"]
categories: ["C++"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_175731.jpg"><img class="alignnone size-large wp-image-550" title="2011-07-08_175731" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_175731-540x352.jpg" alt="" width="540" height="352" /></a>

這是之前老師上課時出的作業，就是設計一個1A2B的遊戲，其實在上這堂課之前我一直以為1A2B很難寫，等到這堂課上完才知道，不是很難寫，是我這傢伙太宅了，根本不知道1A2B的規則是啥....


<!--more-->
所謂的1A2B是一種猜數字遊戲，假設我現在設定答案是1234，然後讓你來猜數字

當你輸入1567的時候，因為有一個數字的位置、答案都正確（1），這時候就是1A0B

當你輸入1256的時候，因為有兩個數字的位置、答案都正確（1、2），這時候就是2A0B

再來解釋B的來源

當你輸入4321時，有4個數字是跟答案一樣的，但是位置錯誤，所以是0A4B

當你輸入4325時，有3個數字是跟答案一樣的，但是位置錯誤，這時候就是0A3B

簡單講A就是位置對、而且是答案的字母有幾個

B則是「有出現在答案裡面」，但是位置錯誤的字母有幾個
<blockquote>維基百科的解釋：<a href="http://goo.gl/FvfLq">http://goo.gl/FvfLq</a>

兩個人玩，一方出<a title="數字" href="http://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%97">數字</a>，一方猜。出數字的人要先想好一個沒有重複數字的4位數，不能讓猜的人知道。猜的人就可以開始猜。每猜一個數，出數者就要根據這個數字給出幾A幾B，其中A前面的數字表示位置正確的數的個數，而B前的數字表示數字正確而位置不對的數的個數。</blockquote>
從以上規則來看，我們可以分成計算A跟計算B來寫程式
<h2>解題說明：</h2>
首先在檢查A與B之前，必須先把預定的答案以及使用者猜的數字分成陣列（一個字元一個空間）

再來檢查A其實很簡單，大多數人都會寫，就是逐一檢查每一個位置，當同一位置上面，答案相同時，就代表A增加一個，可以寫成

if(x[i]==y[i]){a++;}

/*

x、y陣列存放答案以及使用者的輸入值，i會一直做i++的運算直到大於等於x、y的維度

*/

以上是計算A的邏輯，在來計算B就比較複雜

因為剛剛說B是不同位置、有出現過的數字，所以我們就用類似循序搜尋法的方式，陣列的每一格空間都找看看，如果有遇到相同的數字，而且是出現在不同的位置，則B+1，然後開始執行下一個字母的搜尋

以下是完整的程式碼，我分成A、B兩部分寫，另外我的程式碼寫的比較簡單，用的是數學的方法解題，請先看註解，不然你會看不懂我在寫什麼

專案檔載點：<a href="http://www.box.net/shared/7u2m75t6scofm3h7hssn">Box.net</a>｜<a href="http://www.4shared.com/file/VREvULtr/1A2B.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/1A2B.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZmZiMmU0ZWMtZjI4Ni00NDBhLTk2NzAtZTNhMzIzMjlkMzRl&amp;hl=zh_TW">Google</a>

程式碼：
<pre lang="cpp">/*
    計算1A2B的程式
    演算法不同於一般的字串比對
    而是直接以Integer儲值使用者輸入的資料，然後透過除法的運用分寫出每個字
    例如：
    1234/1000%10=4
    1234/100%10=3
    1234/10%10=2
*/

#include <cstdlib>
#include <iostream>

using namespace std;

int main(int argc, char *argv[])
{
    int x=1234;     //被猜的數字
    int a=0,b=0;        //用來統計A、B數量
    int y;      //儲存使用者輸入的值
    while(x!=y){
        a=0;b=0;
        cout<<"請輸入你要猜的數字：";
        cin>>y;
        cout<<endl;

        //計算A
        for(int i=1;i<=1000;i*=10){     //透過數學的方式，把1234分解
            if((x/i%10)==(y/i%10)){     //如果x與y兩變數，在相同位置上有相同的數字，則a+1
                    a+=1;
                }
            }

        //計算B
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
