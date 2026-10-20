---
title: "JavaScript 計算函式執行時間"
date: 2017-01-24T18:56:38
slug: "javascript-measure-function-time"
aliases: ["/posts/javascript-%e8%a8%88%e7%ae%97%e5%87%bd%e5%bc%8f%e5%9f%b7%e8%a1%8c%e6%99%82%e9%96%93/"]
tags: ["JavaScript"]
categories: ["Programming"]
---

要在 JavaScript 計算函式的執行時間，可以用現在的 Timestamp 和函式執行後的 Timestamp 相減，即可獲得執行時間，大多數人都會用 new Date().getTime() 來取得時間戳，但如果你的函式執行時間小於 1 毫秒，就會因為 Timestamp 最小單位只到毫秒而無法計算執行時間，因此在這建議使用 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now">Window.Performance API</a>，它可以提供從網頁載入到現在的豪秒數，精確度到千分之一毫秒。


<!--more-->


請參考下面的範例程式碼，會執行 say_hi 一百次，並計算這一百次的平均執行時間（毫秒）
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
