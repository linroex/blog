---
title: "BigQuery SQL Get First or Last Day of Month From Specify Date"
date: 2017-07-29T18:38:56
slug: "bigquery-sql-get-first-or-last-day-of-month-from-specify-date"
tags: ["SQL", "Google Cloud Platform", "BigQuery"]
categories: []
---

In BigQuery, If you want get first day from a Date (or timestamp, datetime type) , for example, type "2017-05-24" and get "2017-05-01", you can call UTC_USEC_TO_MONTH function in Legacy SQL, or DATE_TRUNC() in Standard SQL, In fact, BigQuery have a series function do these thing, Get First day, hour, week.....etc from a Date.


<!--more-->

<h2>Legacy SQL</h2>
<strong>First Day</strong>

If you want get first day from timestamp:
<pre>SELECT USEC_TO_TIMESTAMP(UTC_USEC_TO_MONTH(NOW()))</pre>
1501322861000000 is 2017-07-29 10:07:41 UTC, and this query will output: 2017-07-01 00:00:00 UTC

You can input a Unix Timestamp (usec, int) into UTC_USEC_TO_MONTH function, and It can output a Unix Timestamp that is first day of month for you.

Some function like UTC_USEC_TO_MONTH:
<ul>
 	<li>UTC_USEC_TO_WEEK</li>
 	<li>UTC_USEC_TO_HOUR</li>
 	<li>UTC_USEC_TO_DAY</li>
 	<li>UTC_USEC_TO_YEAR</li>
</ul>
<strong>Last Day</strong>

If you need last day of month, you can get first day of month, and back 1 second, then you can get last day of month, for example:
<pre>SELECT DATE_ADD( UTC_USEC_TO_MONTH( DATE_ADD( NOW(), 1, 'month' ) ), -1, 'second' )</pre>
Get Current Timestamp -&gt; Add a Month -&gt; Next Month First Day -&gt; Decrease 1 Second -&gt; Get Current Month Last Day

Week, Hour, Day or Year? Similarly!
<h2>Standard SQL</h2>
In Standard SQL, It's easy than Legacy SQL, you can use TIMESTAMP_TRUNC do same for TIMESTAMP type, or DATETIME_TRUNC, DATE_TRUNC function.

<strong>First Day</strong>
<pre>SELECT TIMESTAMP_TRUNC(CURRENT_TIMESTAMP(), MONTH)</pre>
Second param control what you need, is first day of month or first day of week...etc, and pay attention, the second param is not String!

You can use these at second param:
<ul>
 	<li>DAY</li>
 	<li>WEEK</li>
 	<li>MONTH</li>
 	<li>QUARTER</li>
 	<li>YEAR</li>
</ul>
If you want input a DATE type, you need use DATE_TRUNC, DATETIME type either.

<strong>Last Day</strong>

Like Legacy SQL, just change some Function for Standard SQL use, for example:
<pre>SELECT DATE_SUB(DATE_TRUNC(DATE_ADD(CURRENT_DATE(), INTERVAL 1 MONTH), MONTH), INTERVAL 1 DAY)</pre>
Because TIMESTAMP_ADD doesn't support MONTH, so you need convert TIMESTAMP to DATETIME or DATE.
