---
title: "JavaScript で関数の実行時間を計測する"
date: 2017-01-24T18:56:38
slug: "javascript-measure-function-time"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

JavaScript で関数の実行時間を計測するには、関数の実行前に取得したタイムスタンプと、実行後に取得したタイムスタンプの差を取ればよいです。多くの人は new Date().getTime() でタイムスタンプを取得しますが、関数の実行時間が1ミリ秒未満の場合は、タイムスタンプの最小単位がミリ秒までなので計算できません。そこでここでは、<a href="https://developer.mozilla.org/en-US/docs/Web/API/Performance/now">Window.Performance API</a> の使用をおすすめします。これはページの読み込み開始からの経過ミリ秒数を提供し、精度は1000分の1ミリ秒までです。


<!--more-->


以下のサンプルコードでは say_hi を100回実行し、その100回の平均実行時間（ミリ秒）を計算しています。
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
