---
title: "Vue.js でオブジェクトを表として美しく表示する方法"
date: 2017-03-17T01:39:34
slug: "vue-js-render-object-as-table-in-beautiful-way"
tags: ["Vue.js", "JavaScript"]
categories: ["Programming"]
draft: false
---

Vue.js では、v-for を使うと、配列を HTML のテーブルやリストとして見やすくレンダリングできます。しかし、オブジェクトのキーと値をテーブルとして表示したい場合はどうすればよいのでしょうか。例えば、連絡先の情報を JS のオブジェクトと配列で多数保存していて、連絡先ごとにキーが異なるとします。連絡先1の情報をテーブルで表示したいのですが、v-for はこの用途には向いていないのでしょうか？


<!--more-->


例えば、次のような JS のオブジェクトを HTML に変換したいとします：
<pre>{
  "name": "Karl",
  "age": 10,
  "school": "NTUST"
}</pre>
HTML:
<pre>&lt;p&gt;name：Karl&lt;/p&gt;
&lt;p&gt;age：10l&lt;/p&gt;
&lt;p&gt;school：NTUST &lt;/p&gt;</pre>
最初は Object.keys と v-for を組み合わせて解決しようとしましたが、とても冗長だと感じました。そこで、この問題を解決できる良い構文を見つけました：
<pre>&lt;p v-for="(val, key) in contacts[0]"&gt;{{key}}：{{val}}&lt;/p&gt;</pre>
