---
title: "BigQuery SQL Get First or Last Day of Month From a Specified Date"
date: 2017-07-29T18:38:56
slug: "bigquery-sql-get-first-or-last-day-of-month-from-specify-date"
tags: ["BigQuery", "SQL"]
categories: ["Programming"]
draft: false
---

In BigQuery, if you want to get the first day from a date (or a timestamp or datetime value), for example turning "2017-05-24" into "2017-05-01", you can call the UTC_USEC_TO_MONTH function in Legacy SQL, or DATE_TRUNC() in Standard SQL. In fact, BigQuery has a whole series of functions that do these things, getting the first day, hour, week, and so on from a date.


<!--more-->

<h2>Legacy SQL</h2>
<strong>First Day</strong>

If you want to get the first day from a timestamp:
<pre>SELECT USEC_TO_TIMESTAMP(UTC_USEC_TO_MONTH(NOW()))</pre>
1501322861000000 is 2017-07-29 10:07:41 UTC, and this query will output: 2017-07-01 00:00:00 UTC

You can input a Unix timestamp (usec, int) into the UTC_USEC_TO_MONTH function, and it will output a Unix timestamp for the first day of the month.

Other functions like UTC_USEC_TO_MONTH:
<ul>
  <li>UTC_USEC_TO_WEEK</li>
  <li>UTC_USEC_TO_HOUR</li>
  <li>UTC_USEC_TO_DAY</li>
  <li>UTC_USEC_TO_YEAR</li>
</ul>
<strong>Last Day</strong>

If you need the last day of the month, you can get the first day of the month and then go back 1 second. For example:
<pre>SELECT DATE_ADD( UTC_USEC_TO_MONTH( DATE_ADD( NOW(), 1, 'month' ) ), -1, 'second' )</pre>
Get the current timestamp -&gt; add a month -&gt; first day of next month -&gt; subtract 1 second -&gt; last day of the current month

Week, hour, day, or year? It works the same way!
<h2>Standard SQL</h2>
In Standard SQL, it's easier than in Legacy SQL. You can use TIMESTAMP_TRUNC for TIMESTAMP values, or DATETIME_TRUNC and DATE_TRUNC for the other types.

<strong>First Day</strong>
<pre>SELECT TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)</pre>
The second parameter controls what you get, whether it's the first day of the month, the first day of the week, and so on. Pay attention: the second parameter is not a string!

You can use these for the second parameter:
<ul>
  <li>DAY</li>
  <li>WEEK</li>
  <li>MONTH</li>
  <li>QUARTER</li>
  <li>YEAR</li>
</ul>
If you want to input a DATE type, you need to use DATE_TRUNC. The same goes for the DATETIME type.

<strong>Last Day</strong>

Just like Legacy SQL, you only need to change some of the functions to the Standard SQL versions. For example:
<pre>SELECT DATE_SUB(DATE_TRUNC(DATE_ADD(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH), INTERVAL 1 DAY)</pre>
Because TIMESTAMP_ADD doesn't support MONTH, you need to convert the TIMESTAMP to a DATETIME or DATE first.
