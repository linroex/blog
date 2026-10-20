---
title: "BigQuery SQL String Split"
date: 2017-09-17T13:39:48
slug: "bigquery-sql-string-split"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
---

相信大家對 split 都不陌生，這可說是程式設計師最常用的十個函式之一，在 BigQuery 也有 split，但因為是 SQL 的關係用法和一般程式語言不太一樣，此外 BigQuery 又分成 Standard SQL 和 Legacy SQL，而這兩種版本雖然都有 split，但使用方式更是截然不同。


<!--more-->


<strong>Standard SQL</strong>

在 BigQuery Standard SQL 我們可以直接用類似陣列的方式取得切割後的字串，請看範例：
<pre># Standard SQL

SELECT
  SPLIT(userID, '-')[OFFSET(0)],
  SPLIT(userID, '-')[OFFSET[1]]
FROM (
  SELECT 'de1ac465-233d-4a8d-54398ffd35a' AS userID )</pre>
以上範例會將 de1ac465-233d-4a8d-54398ffd35a 字串用 "-" 作切割，並取出第 0 個、第 1 個。

<strong>Legacy SQL</strong>

在 BigQuery Legacy SQL 因為沒有陣列的關係，所以需要搭配 NTH 函式來取出切割後的字串，此外陣列維度是從 0 開始，但 NTH 函式則是從 1 開始，這點也需要注意。
<pre># Legacy SQL

SELECT
   NTH(1, SPLIT(userID, '-')),
   NTH(2, SPLIT(userID, '-'))
FROM (
   SELECT 'de1ac465-233d-4a8d-54398ffd35a' AS userID )</pre>
