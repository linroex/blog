---
title: "如何確認我的 Crontab 正常運作？"
date: 2017-01-20T18:16:15
slug: "check-crontab-working"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e7%a2%ba%e8%aa%8d%e6%88%91%e7%9a%84-crontab-%e6%ad%a3%e5%b8%b8%e9%81%8b%e4%bd%9c%ef%bc%9f/"]
tags: ["Linux", "crontab"]
categories: ["SRE"]
---

不知道大家是否都有同樣的煩惱？ 剛學會 crontab 時，始終不確定自己的設定是否正確，每次設定完都不確定是否有照預期的跑，在這我分享兩招可以讓大家確定自己的 crontab 是否正確設定！


<!--more-->


首先，其實不用擔心語法錯誤的問題，就跟 Apache Config 一樣，如果格式有誤，在你儲存 crontab config 時就不會讓你儲存囉！ 但如果你想驗證你設定的時間是否和預期的一樣，比如你可能以為你設定的是每五天執行一次，最後卻變成每月第五天執行一次，這兩者就差很多囉，別笑！ 因為我就是幹過這種蠢事的人哈。

要驗證排程時間，第一招，可以透過網路上許多的 crontab tester 來確認，這邊就介紹其中一款 crontab.guru ，可以將你寫好的排程字串放入，軟體就會用「人能理解」的方式顯示出來，以及「最近五次執行」的時間哦！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/crontab.gif"><img class="alignnone size-full wp-image-7285" src="{{< param imageBase >}}/wp-content/uploads/2017/01/crontab.gif" alt="" width="889" height="578" /></a>

第二招，你可能還是對線上工具不放心，其實在 Linux 裡面每次執行 crontab 都會被記錄在 syslog 裡面，除了可以驗證是否有按照預定時間執行外，如果你排程執行的程式有輸出資訊，也可以在這裡看到。 注意，是搜尋大寫的「CRON」，別寫成小寫，這兩者差很多哦！
<pre>grep CRON /var/log/syslog*</pre>
你會看到像這樣的結果：
<pre>Jan 20 04:30:01 CODERTW CRON[25813]: (root) CMD (service apache2 restart)</pre>
最前面是日期，最後面則是執行的指令

如果執行後有太多 CRON log 的話，也可以試試看兩層的 grep 來找出需要的紀錄。更詳細的寫法可以參考 <a href="https://coder.tw/?p=7287">Linux Grep Tips – 搜尋有指定字串的列</a>
<pre>grep CRON syslog.1 | grep -E "apache|backup"</pre>
提醒
<ol>
 	<li>因為 syslog 會分多個檔案，所以如果沒看到執行的紀錄出現也別緊張，可能是在壓縮檔裡面。</li>
 	<li>如果時間不如預期，記得檢查你伺服器的時區設定，試試在 Terminal 輸入 date 看看現在時間。</li>
</ol>
