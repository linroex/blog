---
title: "SQL Notes: The Difference Between the ` and ' Symbols"
date: 2011-02-11T10:43:48
slug: "sql-single-vs-double-quotes"
tags: ["SQL"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-07-27_233518.jpg"><img class="alignnone size-large wp-image-206" title="2010-07-27_233518" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-07-27_233518-540x259.jpg" alt="" width="432" height="207" /></a>

Recently, while writing a program in PHP, I ran into some SQL code, so I looked into it a bit and discovered something beginners easily get wrong: the <strong>`</strong> and <strong>'</strong> symbols do different things. When I didn't know this, and the book's print was small, it took me two hours to find out it was this small problem.... So I wrote this post to tell everyone that these two really are different.

<!--more-->

First, let's talk about what the <strong>`</strong> symbol means in SQL syntax. The backtick key is in the upper-left corner of the keyboard. In SQL, it's mainly used to wrap table names. For example:
<pre lang="sql">SELECT `username` FROM `wp-user`;</pre>
This `symbol must be used to wrap table names.

Next is the ' symbol. It's on the right side of the keyboard, next to Enter. The ' symbol is usually used for values. For example:
<pre lang="sql">SELECT `username` FROM `wp-user` WHERE `username` = 'linroex';</pre>
These two are very different, and using the wrong one will prevent the query from running, so you need to keep them straight. Also, this may be the last technical post on this site. Later I'm going to open a new blog (which I'm writing in PHP myself), and the new blog will focus on technical articles.
