---
title: "JavaScript で文字列をすべて置換する"
date: 2017-01-16T01:20:29
slug: "javascript-string-replace-all"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

JavaScript で String.replace を使うときは、期待どおりに動かない場合があるので注意してください。ある文字列を置換しようとすると、replace は最初の1つしか置換しないことに気づくでしょう。たとえば "AAA".replace("A", "B") は、"BBB" になると思うかもしれませんが、実際には "BAA" になります。これは、JS の replace の第1引数が実は文字列ではなく正規表現だからです。文字列を渡すと、最初に見つかったものだけが置換されるため、期待と異なる結果になります。


<!--more-->


JS の String.replace がすべての文字列を置換しない問題の解決は簡単です。正規表現で書けばよいのです。たとえば：
<pre># BBB
"AAA".replace(/A/g, "B");

# HiHi
"{msg}{msg}".replace(/{msg}/g, "Hi");</pre>
検索したい文字列を正規表現のスラッシュで囲み、g フラグを付ければよいだけです。ただし、検索の第1引数は正規表現なので、一部の記号はエスケープが必要です。たとえば、次のコードは正しく動きません：
<pre># [HiHiHi][HiHiHi]
"[msg][msg]".replace(/[msg]/g, "Hi")</pre>
これは、角括弧 [] が正規表現の中で特別な意味を持つためです。このような場合は、バックスラッシュを付けて、次のように書き換えます：
<pre># HiHi
"[msg][msg]".replace(/\[msg\]/g, "Hi")</pre>
