---
title: "How Can I Check That My Crontab Is Working Correctly?"
date: 2017-01-20T18:16:15
slug: "check-crontab-working"
tags: ["Linux", "crontab"]
categories: ["SRE"]
draft: false
---

Have you ever had this problem? When you first learn crontab, you are never quite sure whether your settings are correct. After each change, you wonder whether the job will actually run the way you expect. Here I share two ways to confirm that your crontab is set up correctly!


<!--more-->


First, you do not need to worry about syntax errors. Just like with Apache config, if the format is wrong, crontab will not let you save the file! But if you want to verify that the schedule matches what you intended, the difference can be huge. For example, you might think you set a job to run every five days, but it actually runs on the fifth day of every month. Please don't laugh. I have made exactly that mistake myself, haha.

To verify the schedule, the first method is to use one of the many crontab testers available online. Here I will introduce one of them, crontab.guru. Enter your schedule string, and the site displays it in a "human-readable" form, along with the times of the "last five runs"!

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/crontab.gif"><img class="alignnone size-full wp-image-7285" src="{{< param imageBase >}}/wp-content/uploads/2017/01/crontab.gif" alt="" width="889" height="578" /></a>

The second method is for when you still do not trust online tools. On Linux, every crontab run is recorded in syslog. This lets you confirm that a job ran at the scheduled time. If the program your job runs produces any output, you can also see it here. Note: search for uppercase "CRON", not lowercase. The two give very different results!
<pre>grep CRON /var/log/syslog*</pre>
You will see results like this:
<pre>Jan 20 04:30:01 CODERTW CRON[25813]: (root) CMD (service apache2 restart)</pre>
The date is at the beginning of each line, and the command that was run is at the end.

If there are too many CRON log entries after a run, you can try a two-step grep to find the records you need. For a more detailed explanation of this technique, see <a href="https://coder.tw/?p=7287">Linux Grep Tips – Searching for Lines That Contain a Given String</a>.
<pre>grep CRON syslog.1 | grep -E "apache|backup"</pre>
Reminders
<ol>
 	<li>Because syslog is split across multiple files, do not panic if you do not see your run in the log. It may be inside a compressed file.</li>
 	<li>If the timing is not what you expected, check your server's time zone setting. Try running date in the Terminal to see the current time.</li>
</ol>
