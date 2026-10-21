---
title: "JavaScript: How to Check Whether a Variable Is NaN"
date: 2017-02-14T22:44:05
slug: "javascript-check-variable-nan"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

JavaScript has so many strange quirks! Today, while using parseFloat to convert a string into a number, I learned that if the input can't be converted to a number, it returns NaN (Not a Number). So I wrote the following code to check for it:
<pre>var score = parseFloat(prompt("Score:"));

if(score === NaN) {
    console.log("Not a Number");
} else {
    console.log(score);
}</pre>
At first glance, this code seems perfectly reasonable, just like comparing undefined or null directly with equality. Who knew it would completely fail?


<!--more-->


In JS, it's interesting: NaN is Number (Not a Number is a Number). If a return value is undefined, you can compare it directly, because the type of undefined is undefined. Intuitively, you'd expect NaN to be the same, with a type of NaN. But if you check, you'll find that the type of NaN is actually Number. When you run the following comparisons, they all return false!
<pre>NaN == NaN

"NaN" == NaN

"Hi" == NaN</pre>
This pitfall is really deep. The solution isn't hard: use the isNaN function to check, for example:
<pre>var score = parseFloat(prompt("Score:"));

if(isNaN(score)) {
    console.log("Not a Number");
} else {
    console.log(score);
}</pre>
This seems to solve the problem, but look closely at the following comparisons:
<pre>isNaN(NaN) == true

isNaN("hi") == true

isNaN(undefined) == true

isNaN(10) == false

isNaN("10") == false</pre>
Although isNaN seems to solve the problem, you'll notice it isn't a NaN === NaN check. isNaN("hi") returns true, but "hi" is a string. It's fair to say in plain terms that "hi" is not a number, but strictly speaking, "hi" === NaN should be false, because "hi" is a string while NaN is of the number type! This happens because when you pass an argument to isNaN, it is first converted to a Number. In other words, it checks Number("hi") === NaN, and Number("hi") itself returns NaN.

If you want a strict version of isNaN where only NaN counts as NaN, you can use Number.isNaN. See the following comparisons:
<pre>Number.isNaN(NaN) == true

Number.isNaN("hi") == false

Number.isNaN(undefined) == false</pre>
