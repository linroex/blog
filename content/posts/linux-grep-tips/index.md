---
title: "Linux Grep Tips - 搜尋有指定字串的列"
date: 2017-01-20T18:32:31
slug: "linux-grep-tips"
aliases: ["/posts/linux-grep-tips-%e6%90%9c%e5%b0%8b%e6%9c%89%e6%8c%87%e5%ae%9a%e5%ad%97%e4%b8%b2%e7%9a%84%e5%88%97/"]
tags: ["Linux", "grep"]
categories: []
---

在 Linux 裡面有時我們會需要從檔案中快速的搜尋帶有關鍵字的「列」，例如在看 log 時可能會想找出某個時間發生的錯誤，打開檔案一行行找實在不怎麼經濟實惠，這時你就會需要 grep 的幫助啦！


<!--more-->


grep 不難學，他可以搭配指定的關鍵字，快速的將帶有該關鍵字的那列印出來，下面假設我想從 syslog 中找出所有帶有 CRON 的紀錄，提供幾種不同的寫法，可以因地制宜使用：
<pre>cat /var/log/syslog* | grep "CRON"

grep "CRON" /var/log/syslog*

grep "CRON" /var/log/syslog* &gt; result.txt</pre>
要注意，大小寫有差！

但光是這樣還不夠，下面整理 grep 的各種技巧給大家
<h3>關鍵字標出顏色</h3>
預設 grep 找出的結果是沒有顏色的，但如果你希望他幫你用顏色標出關鍵字的話，可以用加上 --color 參數
<pre>grep "CRON" --color /var/log/syslog*</pre>
<h3>A or B 搜尋</h3>
如果想搜尋符合 A 或 B 的資料，不用分兩次執行，可以任選一種寫法：
<pre>grep -E "A|B" /var/log/syslog*

grep -e "A" -e "B" /var/log/syslog*</pre>
<h3>A and B 搜尋</h3>
如果你希望找到 A 和 B 都符合，例如字串中帶有 CRON 同時也有 apache 的紀錄，但不用串再一起，那你可以輸入：
<pre>grep "CRON" /var/log/syslog* | grep "apache"</pre>
相同原理加以應用，可以有三個、四個甚至更多關鍵字，或是和 A or B 結合使用：
<pre># CRON、apache、command 都要有才會被搜尋到
grep "CRON" /var/log/syslog* | grep "apache" | grep "command"

# CRON+apache or CRON+backup
grep "CRON" /var/log/syslog* | grep -E "apache|backup"</pre>
<h3>前後 N 行</h3>
grep 預設只顯示搜尋到的那行資料，但有的時候我們可能會需要前後幾行資料來了解前因後果，這時可以用 -A 參數代表後 N 行，以及 -B 參數代表前 N 行：
<pre># 前後各三行
grep "CRON" -A3 -B3 /var/log/syslog*</pre>
