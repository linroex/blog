---
title: "1A2B Code Explained"
date: 2011-07-08T18:00:28
slug: "1a2b-code-explained"
tags: ["C++"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_175731.jpg"><img class="alignnone size-large wp-image-550" title="2011-07-08_175731" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_175731-540x352.jpg" alt="" width="540" height="352" /></a>

This was an assignment from my teacher: design a 1A2B guessing game. Before this class, I always thought 1A2B was hard to write. After the class, I realized it wasn't hard at all. I was just too much of a homebody and didn't even know the rules of 1A2B....


<!--more-->
1A2B is a number-guessing game. Suppose the answer is 1234, and you try to guess it.

When you enter 1567, one digit is in the right position and matches the answer (1), so the result is 1A0B.

When you enter 1256, two digits are in the right positions and match the answer (1 and 2), so the result is 2A0B.

Now let me explain where B comes from.

When you enter 4321, all four digits appear in the answer, but none of them is in the right position, so the result is 0A4B.

When you enter 4325, three digits appear in the answer, but none of them is in the right position, so the result is 0A3B.

Simply put, A is the number of digits that are in the right position, and B is the number of digits that appear in the answer but are in the wrong position.
<blockquote>Wikipedia's explanation: <a href="http://goo.gl/FvfLq">http://goo.gl/FvfLq</a>

Two people play. One player picks a 4-digit <a title="number" href="http://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%97">number</a> with no repeated digits and keeps it secret. The other player starts guessing. After each guess, the player who picked the number gives the result as xA yB, where the number before A is the count of digits in the correct position, and the number before B is the count of digits that are correct but in the wrong position.</blockquote>
From these rules, we can split the problem into two parts: calculating A and calculating B.
<h2>Solution notes:</h2>
First, before checking A and B, we must split both the target answer and the user's guess into arrays (one character per slot).

Checking A is simple, and most people can write it. Compare each position one by one. When the answer and the guess match at the same position, A goes up by one. This can be written as:

if(x[i]==y[i]){a++;}

/*

x and y are the arrays that hold the answer and the user's input. i keeps increasing with i++ until it reaches the size of x and y.

*/

That covers the logic for A. Calculating B is more complicated.

Since B means digits that appear in the answer but in different positions, we use a method similar to linear search. We check every slot in the array. When we find the same digit in a different position, B goes up by one, and then we move on to search for the next digit.

Below is the complete code. I wrote A and B as separate parts. My code is simple and uses a math-based approach. Please read the comments first, or you won't understand what I wrote.

Project file download: <a href="http://www.box.net/shared/7u2m75t6scofm3h7hssn">Box.net</a> | <a href="http://www.4shared.com/file/VREvULtr/1A2B.html ">4Shared</a> | <a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/1A2B.zip">Dropbox</a> | <a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZmZiMmU0ZWMtZjI4Ni00NDBhLTk2NzAtZTNhMzIzMjlkMzRl&amp;hl=zh_TW">Google</a>

Code:
<pre lang="cpp">/*
    Program for 1A2B
    The algorithm differs from ordinary string comparison.
    It stores the user's input directly as an integer, then uses division to split out each digit.
    For example:
    1234/1000%10=4
    1234/100%10=3
    1234/10%10=2
*/

#include <cstdlib>
#include <iostream>

using namespace std;

int main(int argc, char *argv[])
{
    int x=1234;     //the number to guess
    int a=0,b=0;        //counters for A and B
    int y;      //stores the user's input
    while(x!=y){
        a=0;b=0;
        cout<<"請輸入你要猜的數字：";
        cin>>y;
        cout<<endl;

        //Count A
        for(int i=1;i<=1000;i*=10){     //split 1234 digit by digit using math
            if((x/i%10)==(y/i%10)){     //if x and y have the same digit at the same position, a+1
                    a+=1;
                }
            }

        //Count B
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
