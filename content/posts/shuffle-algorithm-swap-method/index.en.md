---
title: "Shuffle Algorithm (Swap Method)"
date: 2011-06-05T01:00:07
slug: "shuffle-algorithm-swap-method"
tags: ["Algorithms", "C++"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005920.jpg"><img class="size-large wp-image-534 aligncenter" title="2011-06-05_005920" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005920-540x352.jpg" alt="" width="540" height="352" /></a>

The shuffle algorithm is a way to generate random numbers that never repeat. For example, suppose you need to generate ten random numbers, and all ten must be "unique." Many people's first instinct is to call the rand function to get a random value, store it in an array, and compare it against the numbers already in the array. That method is simple, but its performance is very poor. The shuffle algorithm introduced here is worlds apart from that approach in terms of performance. The principle behind the shuffle algorithm is actually very simple: first store the numbers in an array, then scramble them.


<!--more-->

<h2><a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005837.jpg"><img class="alignnone size-large wp-image-533" title="2011-06-05_005837" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-05_005837-529x540.jpg" alt="" width="529" height="540" /></a></h2>
<h2>Explanation:</h2>
For example, suppose we want to generate 10 non-repeating random numbers.

First, we create an array and store 1～10 in it.
<pre lang="cpp">int x[10]={0};

for(int i=0;i<=9;i++){
	x[i]=i;		//Fill elements 1~10 of array x in order, for example x[1]=1, x[2]=2
}</pre>
That is, x[0]=0, x[1]=1, x[2]=2, and so on.

Next, we scramble the data in the array using the swap method.
<pre lang="cpp">time_t xx;
    srand((unsigned)time(NULL));			//Reseed the random number table with the current time

    for(int ii=0;ii<=1000;ii++){
        int n1=rand()%10;		//Generate a random number from 0 to 9
        int n2=rand()%10;
        //Swap the array data (shuffle)
		int temp=x[n1];
        x[n1]=x[n2];
        x[n2]=temp;

    }</pre>
Generate random numbers from 0 to 9, assign them to n1 and n2, and swap the data at x[n1] and x[n2].

After this action has been repeated a certain number of times (here, assumed to be 1000), the data in array x is completely scrambled.

That means x[0] no longer necessarily holds 0, and x[1] doesn't necessarily hold 1.

That's it for the algorithm!

Output the data in the array. What you get is essentially random numbers, and none of them repeat.
<h2>Full source code:</h2>
<pre lang="cpp">/*
	Shuffle algorithm
	Generate non-repeating random numbers
	Can be used for seating arrangements
*/

#include <iostream>
#include<stdlib.h>		//Needed for the random number functions
#include<time.h>

using namespace std;

int main()
{
    int x[10]={0};

    for(int i=0;i<=9;i++){
        x[i]=i;		//Fill elements 1~10 of array x in order, for example x[1]=1, x[2]=2
    }

    time_t xx;
    srand((unsigned)time(NULL));			//Reseed the random number table with the current time

    for(int ii=0;ii<=1000;ii++){
        int n1=rand()%10;		//Generate a random number from 0 to 9
        int n2=rand()%10;
        //Swap the array data (shuffle)
		int temp=x[n1];
        x[n1]=x[n2];
        x[n2]=temp;

    }

    for(int i=0;i<=9;i++){
        cout<<x[i]<<endl;		//Output
    }
    system("pause");
    return 0;
}</pre>
<strong>Project file download: <a href="http://www.box.net/shared/ng2m4bob8y">Box.net</a>｜<a href="http://www.4shared.com/file/yqDqpjHk">4Shared</a>｜<a href="http://goo.gl/6z39H">Google</a>｜<a href="http://goo.gl/tmUt9">Dropbox</a></strong>
<h2>How the shuffle algorithm works:</h2>
The principle isn't hard to understand. At the start, the contents of array x are in order, 1～10. After shuffling, x still contains the numbers 1～10, but the original order is gone. If you then output x[0] through x[9] in sequence, the output is random.
<h2>Afterword:</h2>
When would you use a shuffle algorithm? The most common example is probably assigning seats. Give every seat a number and let the array indices represent students' student numbers. With the shuffle algorithm, each student gets a "random" seat, and no seat is ever assigned twice.
