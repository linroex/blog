---
title: "JavaScript String Replace All"
date: 2017-01-16T01:20:29
slug: "javascript-string-replace-all"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

In JavaScript, String.replace may behave differently than you expect. When you want to replace a string, you'll find that replace only replaces the first occurrence. For example, "AAA".replace("A", "B") gives "BAA", not the "BBB" you might expect. This is because the first argument of JS replace is actually a regular expression, not a string. If you pass in a string, only the first match is replaced, which leads to results you didn't expect.


<!--more-->


The fix for JS String.replace not replacing every occurrence is simple: write it as a regular expression. For example:
<pre># BBB
"AAA".replace(/A/g, "B");

# HiHi
"{msg}{msg}".replace(/{msg}/g, "Hi");</pre>
Just wrap the string you want to search for in regex slashes and add the g flag. But because the search argument is a regular expression, some special symbols need to be escaped. For example, the following code will go wrong:
<pre># [HiHiHi][HiHiHi]
"[msg][msg]".replace(/[msg]/g, "Hi")</pre>
This happens because square brackets [] have a special meaning in regular expressions. In cases like this, you can add a backslash and rewrite it as follows:
<pre># HiHi
"[msg][msg]".replace(/\[msg\]/g, "Hi")</pre>
