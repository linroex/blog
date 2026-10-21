---
title: "BigQuery SQL でランダムに N 行を抽出する"
date: 2017-07-28T23:57:37
slug: "bigquery-get-random-n-row-sampling-legacy-sql-standard-sql"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
draft: false
---

データ分析をしていると、データからランダムに N 行を取り出す（サンプリングする）ことはよくある要件です。データが正しいかどうかを確認するためにサンプルを見る場合もあれば、データが多すぎて処理しきれないため、モデル構築用にサンプルを取る場合もあります。データベース内で SQL を使ってサンプリングするのは実はとても簡単です。ここでは BigQuery Standard SQL で説明しますが、Legacy SQL でも方法は同じです。


<!--more-->


仕組みはシンプルです。SQL の rand() 関数で乱数を生成し、ORDER BY で並べ替えてから先頭の N 行を取得します。クエリを実行するたびに乱数の列が変わるため、毎回異なるデータが取得でき、それがサンプルになります。この方法ができるのは BigQuery だけではありません。MySQL や PostgreSQL なども、同じ要領で書けます。
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
