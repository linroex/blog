---
title: "修改PHP的執行時間上限，避免程式執行過久被終止"
date: 2011-08-09T15:04:03
slug: "php-max-execution-time-limit"
aliases: ["/posts/%e4%bf%ae%e6%94%b9php%e7%9a%84%e5%9f%b7%e8%a1%8c%e6%99%82%e9%96%93%e4%b8%8a%e9%99%90%ef%bc%8c%e9%81%bf%e5%85%8d%e7%a8%8b%e5%bc%8f%e5%9f%b7%e8%a1%8c%e9%81%8e%e4%b9%85%e8%a2%ab%e7%b5%82%e6%ad%a2/"]
tags: ["PHP"]
categories: ["PHP"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_150333.jpg"><img class="alignnone size-large wp-image-678" title="2011-08-09_150333" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_150333-540x423.jpg" alt="" width="540" height="423" /></a>

在PHP裡面預設有30秒的執行上限，當你寫的程式執行超過30秒時就會出現「<strong>Fatal error</strong>: Maximum execution time of 30 seconds exceeded」這樣的錯誤訊息，這是為了避免你寫的程式裡面有錯，寫了一些無窮迴圈或奇怪的東西，最後導致系統爆掉的一個設計，不過有時候你寫的程式可能就需要執行到超過30秒，例如你現在要用PHP處理一個很大的檔案，例如資料庫的備份檔有時候上百MB，用PHP執行要很久，就可能不小心超過30秒，還有像我之前寫Plurk BOT、蜘蛛程式等等，也很容易超過30秒，以下要教大家兩種方式去調整這項時間上限


<!--more-->

<h2>方法一：修改PHP.ini</h2>
修改php.ini這個檔案可以把執行時間上限調高，這個方法的特色在於它是「全域」的修改，你現在修改了設定，未來「所有的PHP Script」都是使用這個時間上限，這有好有壞，好處是方便，壞處是如果你的程式碼裡面有錯誤，那會很難發現，而且可能會導致系統爆掉。

開啟php.ini(/etc/php.ini)然後搜尋「max_execution_time」

預設都是30，把30改成你要的時間上限及可（單位：秒）

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_145234.jpg"><img class="alignnone size-large wp-image-677" title="2011-08-09_145234" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_145234-540x321.jpg" alt="" width="540" height="321" /></a>
<h2>方法二：set_time_limit</h2>
有時候你用的是虛擬主機，沒辦法去修改php.ini，或者你不喜歡所有的程式都沒有上限設定，這時候你可以用set_time_limit這個函式，它可以直接加到程式碼裡面，用軟的方式去設定執行時間上限，所做的修改也不是全域的

另外set_time_limit在PHP的安全模式（Safe mode）是沒有效果的
<pre lang="php">set_time_limit(時間上限)</pre>
時間上限的部份單位是秒，如果要設為無上限，可以設定0
<pre lang="php">set_time_limit(0)</pre>
像上面這樣就是無上限

建議把這個函式加在程式碼的最上面

關於set_time_limit的官方說明：<a href="http://php.net/manual/en/function.set-time-limit.php">http://php.net/manual/en/function.set-time-limit.php</a>
