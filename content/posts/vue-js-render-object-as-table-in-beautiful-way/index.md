---
title: "Vue.js Render Object as Table in Beautiful Way"
date: 2017-03-17T01:39:34
slug: "vue-js-render-object-as-table-in-beautiful-way"
tags: ["JavaScript", "Vue.js"]
categories: ["英文"]
---

In Vue.js we can use v-for to render Array as HTML Table or List beautifully, but If we want render Object key and value as Table, for example, I use JS Object and Array to store many Contact info, each Contact have different key, I want display Contact 1 info in a table, It seems v-for not good at here?


<!--more-->


For Example, I want convert JS Object to HTML like below:
<pre>{
  "name": "Karl",
  "age": 10,
  "school": "NTUST"
}</pre>
HTML:
<pre>&lt;p&gt;name：Karl&lt;/p&gt;
&lt;p&gt;age：10l&lt;/p&gt;
&lt;p&gt;school：NTUST &lt;/p&gt;</pre>
At the first time, I try to use Object.keys and v-for to solve this situation but It is very dirty I think, and then I found a good syntax can solve it:
<pre>&lt;p v-for="(val, key) in contacts[0]"&gt;{{key}}：{{val}}&lt;/p&gt;</pre>
