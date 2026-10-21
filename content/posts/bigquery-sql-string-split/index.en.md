---
title: "BigQuery SQL String Split"
date: 2017-09-17T13:39:48
slug: "bigquery-sql-string-split"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
draft: false
---

Most programmers are familiar with split. It's one of the ten most commonly used functions in programming. BigQuery has a split function too, but since it's SQL, the usage is quite different from general-purpose programming languages. On top of that, BigQuery comes in two versions, Standard SQL and Legacy SQL. Both have split, but they are used in completely different ways.


<!--more-->


<strong>Standard SQL</strong>

In BigQuery Standard SQL, you can get the split-up strings directly, in a way similar to working with an array. Here's an example:
<pre># Standard SQL

SELECT
  SPLIT(userID, '-')[OFFSET(0)],
  SPLIT(userID, '-')[OFFSET[1]]
FROM (
  SELECT 'de1ac465-233d-4a8d-54398ffd35a' AS userID )</pre>
The example above splits the string de1ac465-233d-4a8d-54398ffd35a on "-" and takes the 0th and 1st parts.

<strong>Legacy SQL</strong>

Legacy SQL doesn't have arrays, so you need to use the NTH function to pick out the split-up strings. Also, array indexes start at 0 but NTH starts at 1, so be careful about that.
<pre># Legacy SQL

SELECT
   NTH(1, SPLIT(userID, '-')),
   NTH(2, SPLIT(userID, '-'))
FROM (
   SELECT 'de1ac465-233d-4a8d-54398ffd35a' AS userID )</pre>
