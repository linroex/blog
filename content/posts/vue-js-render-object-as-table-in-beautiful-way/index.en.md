---
title: "Vue.js Render Object as Table in Beautiful Way"
date: 2017-03-17T01:39:34
slug: "vue-js-render-object-as-table-in-beautiful-way"
tags: ["Vue.js", "JavaScript"]
categories: ["Programming"]
draft: false
---

In Vue.js, we can use v-for to render an Array as an HTML table or list nicely. But if we want to render an Object's keys and values as a table, for example, I use JS Objects and an Array to store a lot of contact info, and each contact has different keys. I want to display the info for Contact 1 in a table. It seems v-for isn't a good fit here?


<!--more-->


For example, I want to convert a JS Object to HTML like below:
<pre>{
  "name": "Karl",
  "age": 10,
  "school": "NTUST"
}</pre>
HTML:
<pre>&lt;p&gt;name：Karl&lt;/p&gt;
&lt;p&gt;age：10l&lt;/p&gt;
&lt;p&gt;school：NTUST &lt;/p&gt;</pre>
At first, I tried using Object.keys and v-for to solve this, but I think it's very messy. Then I found a nice syntax that solves it:
<pre>&lt;p v-for="(val, key) in contacts[0]"&gt;{{key}}：{{val}}&lt;/p&gt;</pre>
