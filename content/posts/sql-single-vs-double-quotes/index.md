---
title: "SQL注意事項 - `符號與&#039;符號的差別"
date: 2011-02-11T10:43:48
slug: "sql-single-vs-double-quotes"
aliases: ["/posts/sql%e6%b3%a8%e6%84%8f%e4%ba%8b%e9%a0%85-%e7%ac%a6%e8%99%9f%e8%88%87%e7%ac%a6%e8%99%9f%e7%9a%84%e5%b7%ae%e5%88%a5/", "/posts/sql-single-vs-double-quotes-2/", "/posts/sql%e6%b3%a8%e6%84%8f%e4%ba%8b-%e7%ac%a6%e8%99%9f%e8%88%87%e7%ac%a6%e8%99%9f%e7%9a%84%e5%b7%ae%e5%88%a5/"]
tags: ["SQL"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-07-27_233518.jpg"><img class="alignnone size-large wp-image-206" title="2010-07-27_233518" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-07-27_233518-540x259.jpg" alt="" width="432" height="207" /></a>

最近再用PHP來寫程式時剛好有碰到SQL的程式,所以就稍為研究一下,發現了一件新手很容易搞錯的事,那就是<strong>【 ` 】</strong>跟<strong>【 ' 】 </strong>這兩個符號功能是不一樣的,當初因為沒搞清楚這點,然後書上字又很小,就搞了兩個小時才發現原來是這個小問題....,所以在這裡我寫了篇文章來告訴大家其實這兩個是有差的

<!--more-->

首先先來講<strong>`</strong>這個符號在SQL語法裡的意義吧~,【`】這個符號在鍵盤左上角,他在SQL裡面主要是用來包覆住資料表名稱用的,舉例來說:
<pre lang="sql">SELECT `username` FROM `wp-user`;</pre>
`這個符號就必須要用來套住資料表名稱

再來是'這個符號,他的位置大概在鍵盤的右方,Enter的旁邊,會需要用到'這個符號通常是用在值,例如:
<pre lang="sql">SELECT `username` FROM `wp-user` WHERE `username` = 'linroex';</pre>
這兩個是有很大的差別的說,只要用錯就會執行不了,所以一定要分清楚,還有這可能是本站最後一篇技術類文章了,因為之後站長會再開一個新網誌(自己用PHP寫),新網誌會專門寫技術類文章
