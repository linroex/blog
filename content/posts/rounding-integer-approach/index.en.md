---
title: "Implementing a Round-Up-to-Whole-Number Feature: Ideas and Methods"
date: 2017-01-11T23:30:33
slug: "rounding-integer-approach"
tags: ["JavaScript"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/01/螢幕快照-2017-01-11-下午11.30.05.jpg"]
draft: false
---

Recently I came across a "round up" feature on Zeczec. For example, if a checkout total is NT$1359, pressing the round-up button changes it to NT$1400. It's a fun feature, but when I actually tried to implement it, I found that rounding up isn't easy. There are many non-technical concerns. Here I'll record the problems I ran into while implementing it, the process I went through, and the final solution!


<!--more-->


Looking at Zeczec's round-up feature, it seems to use two strategies. The first is to round up the leading digit: for example, 1001 becomes 2000 directly, 3499 becomes 4000, and any amount under 1000 is rounded up to 1000. The second is based on the idea of lucky numbers: clicking the round-up button repeatedly brings up some numbers that are not integers, such as 6666 and 8888.

I personally think Zeczec's lucky numbers are interesting, but I honestly can't tell whether rounding up the leading digit is a bug or intentional... If I buy something for 1001 and rounding up makes it 2000, or buy something for 199 and it becomes 1000, that's a bit ridiculous. I think the first constraint for rounding up is: "the premium from rounding up must not exceed the original amount." For example, an item priced at NT$399 can be rounded up to 400 or 500, but not to 1000, because 1000 - 399 is a premium of NT$601, which is more than the item itself!

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/湊整數.gif"><img class="alignnone size-full wp-image-7217" src="{{< param imageBase >}}/wp-content/uploads/2017/01/湊整數.gif" alt="" width="652" height="556" /></a>

My first idea was to round up from the first or second digit. For example, 199 has a first digit of 1, so it rounds up to 2 and the remaining digits are filled with zeros to get 200. Following this method, 10599 becomes 20000 or 11000. That seems reasonable, right? But there's a problem! This approach can lead to a "premium that exceeds the original amount," which feels strange to the consumer.

Later I realized I had made things too complicated. Rounding up can basically be done with division: divide by 100, round up unconditionally, then multiply by 100 to restore the magnitude. The advantage of this method is that it limits rounding to the hundreds place, so it doesn't produce outrageous results. For example, 1999 / 100 = 19.99. Rounding up unconditionally gives 20, and then 20 * 100 = 2000, which completes basic rounding. This method gives results like these:
<ul>
 	<li>199 =&gt; 200</li>
 	<li>799 =&gt; 800</li>
</ul>
Here is the example JS code:
<pre>Math.ceil(1999 / 100) * 100</pre>
This approach keeps rounding within the hundreds place and is simple to implement. But consider the following numbers. How would you round them up?
<ul>
 	<li>15000</li>
 	<li>17500</li>
 	<li>1500</li>
</ul>
In these cases, the amount the consumer entered is already an integer. What should we do?

At first I thought that if the number was already an integer, there was no need to round it up again. But on reflection, if a consumer knows the number is already an integer, why would they still press the round-up button? That suggests they feel the number isn't "round" enough yet! Or maybe they just want to pay a little more (lol). Since that's what they want, we should absolutely grant their wish. Here I chose to start from the right and find the first digit that is not zero, then round up that digit. For example:
<ul>
 	<li>15000 =&gt; 16000</li>
</ul>
Counting from the right, the first non-zero digit is 5, so rounding it up gives 6, and filling in the rest gives 16000.

Another method is similar in concept, but the number is filled in at the position just before the first non-zero digit. For example:
<ul>
 	<li>15000 =&gt; 20000</li>
</ul>
Which of these two methods you use basically depends on how ruthless you're willing to be. The premise is: "The user knows it's already an integer, so why press the button again?"

Here is the JS code for this approach. It works in two stages: if the number isn't already a whole multiple of 100, it uses the round-up-to-hundreds method; otherwise, it uses the round-up-the-first-non-zero-digit method. Here, a regular expression is used to find the position of the first non-zero digit.
<pre>function happy_money(num) {
  // If it's already rounded to a whole hundred
  if(Math.floor(num / 100) == num/100) {
  // Position of the first non-zero digit, counting from the right
    var posi = /[1-9][0]*$/.exec(Number(num).toString())[0].length - 1;
    return num + Math.pow(10,posi);
  } else {
    // 123 -&gt; 200
    // 123001 -&gt; 123100
    return Math.ceil(num / 100) * 100;
  }
}</pre>
If you're interested in lucky numbers, the principle is basically to build an array in advance that holds many lucky numbers, then find the lucky number closest to the consumer's amount and jump to it.

When I test it myself, I like to use these numbers to check whether the results match what I expect or need adjusting:
<ul>
 	<li>99</li>
 	<li>199</li>
 	<li>150</li>
 	<li>1500</li>
 	<li>20000</li>
 	<li>2010100</li>
</ul>
In the end, which method to choose, or whether to mix them, really depends on the use case. For example, for an item priced at NT$100000, rounding up to a whole number within NT$1000 may seem fine (?). Or for a charity-type project, using lucky numbers, random numbers, or rounding up by larger amounts may be fine. But for low-priced items, you certainly wouldn't want to round up to something too expensive.
