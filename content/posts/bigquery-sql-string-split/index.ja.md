---
title: "BigQuery SQL の文字列分割（SPLIT）"
date: 2017-09-17T13:39:48
slug: "bigquery-sql-string-split"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
draft: false
---

split は、プログラマーなら誰もが馴染みのある関数で、最もよく使われる関数の 1 つといえるでしょう。BigQuery にも split がありますが、SQL であるため一般的なプログラミング言語とは使い方がかなり異なります。さらに BigQuery には Standard SQL と Legacy SQL の 2 つがあり、どちらにも split はありますが、使い方はまったく異なります。


<!--more-->


<strong>Standard SQL</strong>

BigQuery の Standard SQL では、配列と同じような方法で分割後の文字列を直接取得できます。次の例を見てください：
<pre># Standard SQL

SELECT
  SPLIT(userID, '-')[OFFSET(0)],
  SPLIT(userID, '-')[OFFSET[1]]
FROM (
  SELECT 'de1ac465-233d-4a8d-54398ffd35a' AS userID )</pre>
上の例では、文字列 de1ac465-233d-4a8d-54398ffd35a を "-" で分割し、0 番目と 1 番目の要素を取り出しています。

<strong>Legacy SQL</strong>

Legacy SQL には配列がないため、分割後の文字列を取り出すには NTH 関数を使う必要があります。また、配列のインデックスは 0 から始まりますが、NTH 関数は 1 から始まるので、この点にも注意が必要です。
<pre># Legacy SQL

SELECT
   NTH(1, SPLIT(userID, '-')),
   NTH(2, SPLIT(userID, '-'))
FROM (
   SELECT 'de1ac465-233d-4a8d-54398ffd35a' AS userID )</pre>
