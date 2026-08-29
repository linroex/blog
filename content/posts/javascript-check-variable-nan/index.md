---
title: "JavaScript 判斷變數是否等於 NaN"
date: 2017-02-14T22:44:05
slug: "javascript-check-variable-nan"
aliases: ["/posts/javascript-%e5%88%a4%e6%96%b7%e8%ae%8a%e6%95%b8%e6%98%af%e5%90%a6%e7%ad%89%e6%96%bc-nan/"]
tags: ["JavaScript"]
categories: []
---

在 JavaScript 實在有太多奇怪的眉眉角角了，今天因為把字串轉數字用到 parseFloat，如果進去的參數無法轉成數字則會回應 NaN (Not a Number)，我就寫了如下語法來判斷：
<pre>var score = parseFloat(prompt("Score:"));

if(score === NaN) {
    console.log("Not a Number");
} else {
    console.log(score);
}</pre>
這段程式碼乍看之下理所當然，就像 undefined、null 一樣可以直接相等運算，誰知道完全不如預期。


<!--more-->


在 JS 裡面很有趣，NaN is Number (Not a Number is a Number)，如果今天回傳值是 undefined 的話可以直接相等，因為 undefined 的型態就是 undefined，一般直覺認為 NaN 也是同樣的，型態應該是 NaN，但如果你去檢查會發現，其實 NaN 的型態是 Number，當你進行下面這些運算時，全部都是 False！
<pre>NaN == NaN

"NaN" == NaN

"Hi" == NaN</pre>
這地雷真的踩很深，其實解法不難，使用 isNaN 函式來判斷即可，例如：
<pre>var score = parseFloat(prompt("Score:"));

if(isNaN(score)) {
    console.log("Not a Number");
} else {
    console.log(score);
}</pre>
這樣看起來解決問題了，但仔細看下面的幾個運算：
<pre>isNaN(NaN) == true

isNaN("hi") == true

isNaN(undefined) == true

isNaN(10) == false

isNaN("10") == false</pre>
isNaN 雖然看似解決問題了，但你會發現他並非 NaN === NaN 的判斷，因為 isNaN("hi") 回傳是 true，但 "hi" 是個字串，雖然看起來 "hi" is not a number 沒有錯，但嚴格定義來看 "hi" === NaN 應該要是 false，因為 "hi" 是字串，而 NaN 是數字型態！ 會發生這種問題是因為當你傳入參數到 isNaN 時，他會先轉換成 Number，也就是 Number("hi") === NaN，而 Number("hi") 本身會回傳 NaN。

如果你希望「只有 NaN 才是 NaN」嚴格定義版本的 isNaN，可以用 Number.isNaN，參考以下運算：
<pre>Number.isNaN(NaN) == true

Number.isNaN("hi") == false

Number.isNaN(undefined) == false</pre>
