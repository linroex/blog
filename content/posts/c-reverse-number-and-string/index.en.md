---
title: "[C++] Reversing Numbers and Strings (Applications: Type Conversion, String Handling, Loops)"
date: 2011-03-06T11:18:22
slug: "c-reverse-number-and-string"
tags: ["C++", "Algorithms"]
categories: ["Programming"]
draft: false
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-06_111510.jpg"><img class="size-large wp-image-342 aligncenter" title="2011-03-06_111510" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-06_111510-540x382.jpg" alt="" width="540" height="382" /></a></p>
<p>This is a fairly simple problem: it just reverses a number or a string. For example, input "linroex" and the output is "xeornil", or input 123 and get 321. The solution isn't hard. In C++, you can access a string like an array, so we set up a loop whose end value is the length of the input string. On each pass, we move the last remaining character of string X to the first position of string Y. When the loop finishes, the reversal is complete.</p>
<p>
<!--more-->
Above, I explained string reversal. For number reversal, the basic idea is the same. The only difference is that at the end, you convert the reversed string array to an int, which removes any leading zeros.</p>
<blockquote><p>What is number reversal?</p>
<p>It means reversing the digits of a number, and removing any leading zeros. For example, input 500 and you get 5, or input 5050 and you get 505.</p>
</blockquote>
<h2></h2>
<h2>Number reversal:</h2>
<pre lang="cpp">
/*
Number reversal feature
For example: input 123 outputs 321
input 500 outputs 5 (the 0 is removed)
input 512 outputs 215
*/
#include <iostream>
#include <stdlib.h>

using namespace std;

int main()
{
    string x;
    while(cin>>x){
        char re[100000]="";
        for(int i=0;i<x.length();i++){		//Loop whose end value is the length of x
            re[i]=x[x.length()-i-1];		//Copy the characters of array x into array re in reverse order: x is read from the back, and re is filled from the front
        }
        cout<<atoi(re)<<endl;		//Convert the re array to an int and print it
    }
    return 0;
}

</pre>
<p>Code download: <a href="http://www.box.net/shared/lgo8sycqfk" target="_blank">Box.net</a>|<a href="http://www.4shared.com/file/sQlfh6gA/_online.html " target="_blank">4Shared</a>|<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E6%95%B8%E5%AD%97%E7%BF%BB%E8%BD%89.zip" target="_blank">Dropbox</a>|<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZjNjNWM3YjktMjE5Yi00OTQzLWJiNDgtYTM0ZTU4MThmZGI2&amp;sort=name&amp;layout=list&amp;num=50" target="_blank">Google</a></p>
<p>To make it a string reversal instead, replace the line
<pre lang="cpp">cout<<atoi(re)<<endl;</pre>
with
<pre lang="cpp">cout<<re<<endl</pre>
and you get string reversal.</p>
