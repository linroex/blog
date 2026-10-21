---
title: "BigQuery SQL で指定日付から月初日・月末日を取得する"
date: 2017-07-29T18:38:56
slug: "bigquery-sql-get-first-or-last-day-of-month-from-specify-date"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
draft: false
---

BigQuery で日付（またはタイムスタンプ、DATETIME 型）から月初日を取得したい場合、たとえば "2017-05-24" から "2017-05-01" を得たいときは、Legacy SQL では UTC_USEC_TO_MONTH 関数を、Standard SQL では DATE_TRUNC() 関数を使えます。実は BigQuery には、日付から月初日・時間・週の初めなどを取得するための関数が一式そろっています。


<!--more-->

<h2>Legacy SQL</h2>
<strong>月初日</strong>

タイムスタンプから月初日を取得する場合：
<pre>SELECT USEC_TO_TIMESTAMP(UTC_USEC_TO_MONTH(NOW()))</pre>
1501322861000000 は 2017-07-29 10:07:41 UTC なので、このクエリは 2017-07-01 00:00:00 UTC を出力します。

UTC_USEC_TO_MONTH 関数には Unix タイムスタンプ（マイクロ秒、int）を入力でき、その月の初日の Unix タイムスタンプを出力します。

UTC_USEC_TO_MONTH のような関数には、次のようなものもあります：
<ul>
  <li>UTC_USEC_TO_WEEK</li>
  <li>UTC_USEC_TO_HOUR</li>
  <li>UTC_USEC_TO_DAY</li>
  <li>UTC_USEC_TO_YEAR</li>
</ul>
<strong>月末日</strong>

月末日が必要な場合は、月初日を求めてから 1 秒戻します。たとえば次のようになります：
<pre>SELECT DATE_ADD( UTC_USEC_TO_MONTH( DATE_ADD( NOW(), 1, 'month' ) ), -1, 'second' )</pre>
現在のタイムスタンプを取得 -&gt; 1 か月加算 -&gt; 翌月の初日 -&gt; 1 秒減算 -&gt; 当月の月末日

週、時間、日、年でも同じ考え方です。
<h2>Standard SQL</h2>
Standard SQL は Legacy SQL よりも簡単です。TIMESTAMP 型には TIMESTAMP_TRUNC を、DATETIME 型と DATE 型には DATETIME_TRUNC と DATE_TRUNC を使えます。

<strong>月初日</strong>
<pre>SELECT TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)</pre>
第 2 引数で、月初日にするか、週の初日にするかなどを指定します。注意点として、第 2 引数は文字列ではありません！

第 2 引数には次の値を使えます：
<ul>
  <li>DAY</li>
  <li>WEEK</li>
  <li>MONTH</li>
  <li>QUARTER</li>
  <li>YEAR</li>
</ul>
DATE 型を入力したい場合は DATE_TRUNC を使う必要があります。DATETIME 型も同様です。

<strong>月末日</strong>

Legacy SQL と同じように、一部の関数を Standard SQL 用のものに変えるだけです。たとえば次のようになります：
<pre>SELECT DATE_SUB(DATE_TRUNC(DATE_ADD(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH), INTERVAL 1 DAY)</pre>
TIMESTAMP_ADD は MONTH をサポートしていないため、先に TIMESTAMP を DATETIME か DATE に変換する必要があります。
