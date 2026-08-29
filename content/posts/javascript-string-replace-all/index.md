---
title: "JavaScript String Replace All"
date: 2017-01-16T01:20:29
slug: "javascript-string-replace-all"
tags: ["JavaScript"]
categories: []
---

在 JavaScript 使用 String.replace 時要注意它可能和你預期的行為不同，當你想取代某個字串時，你會發現 replace 只取代了第一個字串，例如 "AAA".replace("A", "B")，你預期會得到 "BBB" 但實際上你會得到的是 "BAA"，這是因為 JS replace 的第一個參數其實是 Regex 而非字串，如果你輸入字串，就只會取代第一個遇到的字串，導致和預期不同的問題。


<!--more-->


要解決 JS String.replace 不會取代全部字串的問題很簡單，只要用正規表達去寫即可，例如：
<pre># BBB
"AAA".replace(/A/g, "B");

# HiHi
"{msg}{msg}".replace(/{msg}/g, "Hi");</pre>
像這樣用正規表達的斜線夾住你要搜尋的字串，並加上 g 參數即可，但也因為前面的搜尋參數是正規表達，所以某些特殊符號需要跳脫，例如下面的語法就會出錯：
<pre># [HiHiHi][HiHiHi]
"[msg][msg]".replace(/[msg]/g, "Hi")</pre>
會這樣是因為中括號 [] 在正規表達式裡面有他的特殊含義，像這樣的情況可以加上反斜線，改寫成下面的形式：
<pre># HiHi
"[msg][msg]".replace(/\[msg\]/g, "Hi")</pre>
