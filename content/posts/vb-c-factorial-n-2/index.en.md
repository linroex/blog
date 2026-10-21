---
title: "[VB] [C++] Calculating n! (Factorial)"
date: 2011-01-05T05:58:10
slug: "vb-c-factorial-n-2"
tags: ["VB", "C++", "Algorithms"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_054100.jpg"><img class="alignnone size-large wp-image-4369" title="2011-01-05_054100" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_054100-520x253.jpg" alt="" width="520" height="253" /></a>

Calculating the factorial of n is very simple. I wrote this program for permutations and combinations: I wanted a rough idea of how many possible answers there would be, so I wrote an n! function to compute the factorial value. A factorial is 1*2*3.....*n. In a permutation of 5 items, the result is at most 5*4*3*2*1, which means there are at most 120 possible answers.

Below, I've made n! into a Function, with a VB version and a C++ version. People who are just starting to learn loops can use this function to practice how loops work. Also, because I was worried that an integer wouldn't be able to hold the result, I used a string to return the value. When you use this Function, you need to convert the return value to a numeric type first.
<h2>
<!--more-->

VB Version of the n! Function</h2>
<pre lang="vb">    Function n_factorial(ByVal n As Integer) As String
        Dim temp As UInteger = 1
        For x = 1 To n
            temp *= x
        Next
        n_factorial = Str(temp)
    End Function</pre>
<strong>Project file download (VS2010): Xun6 ｜ <a href="http://www.4shared.com/file/hTzT5aAh/n_factorial.html ">4Shared </a>｜<a href="http://www.box.net/shared/5ngk747nvc"> Box.net</a></strong>
<h2>C++ Version of the n! Function</h2>
<pre lang="c">int n_factorial(int n){
	int temp=1,x=1;
	for(x=1;x<=n;x++){
		temp*=x;
	}
	return temp;
}</pre>
<strong>Project file download (by code::blocks): Xun6 ｜ <a href="http://www.4shared.com/file/C5K4w3SU/n_factorial_c.html ">4Shared </a>｜ <a href="http://www.box.net/shared/5aohsvmftq">Box.net</a></strong>

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_055623.jpg"><img class="alignnone size-large wp-image-4371" title="2011-01-05_055623" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-05_055623-520x392.jpg" alt="" width="520" height="392" /></a></strong>
