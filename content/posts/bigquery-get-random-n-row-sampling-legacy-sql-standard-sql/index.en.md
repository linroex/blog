---
title: "BigQuery SQL Get Random N Row Sampling"
date: 2017-07-28T23:57:37
slug: "bigquery-get-random-n-row-sampling-legacy-sql-standard-sql"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
draft: false
---

When doing data analysis, randomly picking N rows from a dataset (sampling) is a very common need. You might sample to check whether the data is correct, or sample so a model can be built when there is too much data to process comfortably. Sampling with SQL inside the database is actually very simple. Here I'll demonstrate with BigQuery Standard SQL, but Legacy SQL works the same way.


<!--more-->


The idea is simple. Use the SQL rand() function to generate a random number, sort by it with ORDER BY, and take the first N rows. Because the random column is different on every query, each run returns a different sample. It's not just BigQuery that can do this. MySQL, PostgreSQL, and others can follow the same approach.
<pre>SELECT
  id,
  title,
  rand() r
FROM
  `bigquery-public-data.samples.wikipedia`
ORDER BY
  r
LIMIT
  100</pre>
