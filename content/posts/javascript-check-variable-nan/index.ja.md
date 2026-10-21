---
title: "JavaScript で変数が NaN かどうかを判定する"
date: 2017-02-14T22:44:05
slug: "javascript-check-variable-nan"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

JavaScript には本当に奇妙な落とし穴がたくさんあります。今日、文字列を数値に変換するために parseFloat を使っていたところ、渡された値を数値に変換できない場合は NaN（Not a Number）が返ることを知りました。そこで、次のようなコードで判定することにしました：
<pre>var score = parseFloat(prompt("Score:"));

if(score === NaN) {
    console.log("Not a Number");
} else {
    console.log(score);
}</pre>
一見すると当然に見えるコードです。undefined や null のように、直接等値比較できそうに思えます。まさかまったく期待どおりに動かないとは思いもしませんでした。


<!--more-->


JS には面白い点があります。NaN is Number（Not a Number is a Number）なのです。戻り値が undefined の場合は直接比較できます。undefined の型は undefined だからです。直感的には NaN も同じで、型は NaN だと思うでしょう。ところが調べてみると、NaN の型は実は Number なのです。次の比較をすると、どれもが false になります！
<pre>NaN == NaN

"NaN" == NaN

"Hi" == NaN</pre>
この罠は本当に深いです。解決策は難しくありません。isNaN 関数で判定すればよいのです。たとえば：
<pre>var score = parseFloat(prompt("Score:"));

if(isNaN(score)) {
    console.log("Not a Number");
} else {
    console.log(score);
}</pre>
これで問題は解決したように見えますが、次の比較結果をよく見てください：
<pre>isNaN(NaN) == true

isNaN("hi") == true

isNaN(undefined) == true

isNaN(10) == false

isNaN("10") == false</pre>
isNaN は一見問題を解決しているように見えますが、NaN === NaN の判定ではないことに気づくでしょう。isNaN("hi") は true を返しますが、"hi" は文字列です。普通の意味では「"hi" は数値ではない」と言って問題ありませんが、厳密に言えば "hi" === NaN は false であるべきです。"hi" は文字列で、NaN は数値型だからです。この問題は、isNaN に引数を渡すとまず Number に変換されるために起こります。つまり Number("hi") === NaN を判定していることになり、Number("hi") 自体が NaN を返すのです。

「NaN だけが NaN である」という厳密な定義の isNaN がほしい場合は、Number.isNaN を使えます。次の比較結果を参照してください：
<pre>Number.isNaN(NaN) == true

Number.isNaN("hi") == false

Number.isNaN(undefined) == false</pre>
