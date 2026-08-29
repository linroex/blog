---
title: "BigQuery SQL Get Random N Row Sampling"
date: 2017-07-28T23:57:37
slug: "bigquery-get-random-n-row-sampling-legacy-sql-standard-sql"
tags: ["SQL", "Google Cloud Platform", "BigQuery"]
categories: []
---

在做資料分析時，從資料裡面取隨機 N 列（抽樣）是很常見的需求，可能是抽樣觀察資料正確性，也可能是抽樣去作模型避免資料太多跑不動，其實在資料庫內用 SQL 進行抽樣十分簡單，以下就用 BigQuery Standard SQL 進行示範，Legacy SQL 的作法相同。


<!--more-->


原理很簡單，運用 SQL rand() 函式產生一個隨機數值，接著用 ORDER BY 進行排序後取前 N 列，因為每次 Query 的亂數欄位都不相同，因此每次取得的資料即為抽樣。 不只是 BigQuery 可以這樣做到抽樣，其他如 MySQL、PostgreSQL 也可以依樣畫葫蘆。
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
