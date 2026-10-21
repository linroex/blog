---
title: "Linux Grep Tips - Finding Lines That Contain a String"
date: 2017-01-20T18:32:31
slug: "linux-grep-tips"
tags: ["Linux"]
categories: ["SRE"]
draft: false
---

On Linux, we sometimes need to quickly search a file for the "lines" that contain a keyword. For example, while reading a log, you might want to find the errors that happened at a certain time. Opening the file and scanning it line by line is not very efficient. That's when you need grep!


<!--more-->


grep is not hard to learn. Combined with a keyword, it quickly prints out the lines containing that keyword. Suppose I want to find all the CRON records in syslog. Here are a few different ways to write it, so you can use whichever fits the situation:
<pre>cat /var/log/syslog* | grep "CRON"

grep "CRON" /var/log/syslog*

grep "CRON" /var/log/syslog* &gt; result.txt</pre>
Keep in mind that it is case-sensitive!

But that alone is not enough. Below are various grep tips.
<h3>Highlighting the Keyword in Color</h3>
By default, grep's output has no color. But if you want it to highlight the keyword in color, add the --color option:
<pre>grep "CRON" --color /var/log/syslog*</pre>
<h3>A or B Search</h3>
If you want to search for data that matches A or B, you don't need to run the search twice. Either of these forms works:
<pre>grep -E "A|B" /var/log/syslog*

grep -e "A" -e "B" /var/log/syslog*</pre>
<h3>A and B Search</h3>
If you want to find data that matches both A and B, for example records that contain both CRON and apache, you don't need a single combined pattern. You can enter:
<pre>grep "CRON" /var/log/syslog* | grep "apache"</pre>
The same principle works for three, four, or more keywords, or you can combine it with A or B:
<pre># CRON, apache, and command must all be present to match
grep "CRON" /var/log/syslog* | grep "apache" | grep "command"

# CRON+apache or CRON+backup
grep "CRON" /var/log/syslog* | grep -E "apache|backup"</pre>
<h3>N Lines Before and After</h3>
By default, grep only shows the line that matched. But sometimes you need the lines before and after to understand what led up to it and what followed. For that, use the -A option for N lines after, and the -B option for N lines before:
<pre># Three lines before and after
grep "CRON" -A3 -B3 /var/log/syslog*</pre>
