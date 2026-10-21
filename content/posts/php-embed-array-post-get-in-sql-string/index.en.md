---
title: "How to Embed Arrays, $_POST, and $_GET Directly in a PHP String (SQL Query)"
date: 2011-08-01T14:23:03
slug: "php-embed-array-post-get-in-sql-string"
tags: ["PHP", "SQL"]
categories: ["Programming"]
draft: false
---

Over the past few days, while writing a small program, I ran into a problem. I wanted to put a $_POST variable directly into my SQL query string instead of using the concatenation operator. But because of quoting issues, it took me quite a while to figure out how. Here is a brief introduction. I also want to thank Bu and Cang Shixian for teaching me this method! If it weren't for them, I might still not know about it. Also, this method isn't limited to $_POST; it works with other arrays too.


<!--more-->


P.S. Embedding variables this way carries a risk of SQL injection, so I recommend processing the variable first before putting it into the SQL query.

As everyone knows, in PHP you can put variables inside double quotes. For example:
<pre lang="php">$x=4;
echo "print $x";</pre>
The code above outputs: "print 4"

But if you write:
<pre lang="php">$x=4;
echo 'print $x';</pre>
it outputs: "print $x"

What I mean is that I wrap the SQL query in double quotes and put variables inside it. Regular variables work fine, but putting $_POST in there causes a small problem…..

Embedding a regular variable in an SQL query:
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$name'");</pre>
The above works correctly.

But if I change it to:
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$_POST["name"]' ");
mysql_query("select * from `sql_tab` where `name`='$_POST['name']' ");</pre>
Both of the above produce errors because of the quotes.

So how should you write it? As it turns out, in PHP, the key inside $_POST doesn't have to be wrapped in quotes.

In other words, we can write:
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$_POST[name]'");</pre>
With this form, name doesn't need to be wrapped in single or double quotes.

However, this form hurts performance a bit, because PHP first checks whether a $name variable exists in the program. If it doesn't, then it treats $_POST[name] as $_POST["name"]. So performance gets worse.

So is there a better way? This is where I owe thanks to Bu, who showed me the light! It can be rewritten as:
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='{$_POST["name"]}'");</pre>
In this form, $_POST is wrapped in curly braces, and the name part is still wrapped in double quotes. With this approach, you can embed $_POST or arrays in your SQL query string~
