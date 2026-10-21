---
title: "Measuring Function Execution Time in JavaScript"
date: 2017-01-24T18:56:38
slug: "javascript-measure-function-time"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

To measure a function's execution time in JavaScript, you can subtract the timestamp taken before the function runs from the timestamp taken after it finishes. Most people use new Date().getTime() to get a timestamp, but if your function runs in less than 1 millisecond, this won't work, because the smallest unit of a timestamp is the millisecond. So I recommend the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now">Window.Performance API</a>. It gives you the number of milliseconds since the page started loading, with precision down to a thousandth of a millisecond.


<!--more-->


The example code below runs say_hi 100 times and calculates the average execution time (in milliseconds) of those 100 runs.
<pre>function timeit(func) {
  var sum = 0;

  for(var i = 0; i &lt; 100; i++) {
    var start = performance.now();
    func()
    var end = performance.now();
    sum += (end - start)/100;
  }

  return sum;
}

function say_hi() {
  console.log("Hi");
}

console.log(timeit(say_hi))</pre>
&nbsp;
