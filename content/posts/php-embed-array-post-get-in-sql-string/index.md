---
title: "如何直接在PHP字串（SQL Query）中夾帶陣列、$_POST、$_GET"
date: 2011-08-01T14:23:03
slug: "php-embed-array-post-get-in-sql-string"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e7%9b%b4%e6%8e%a5%e5%9c%a8php%e5%ad%97%e4%b8%b2%ef%bc%88sql-query%ef%bc%89%e4%b8%ad%e5%a4%be%e5%b8%b6%e9%99%a3%e5%88%97%e3%80%81_post%e3%80%81_get/"]
tags: ["PHP", "SQL", "String"]
categories: ["PHP"]
---

最近幾天在寫一個小程式的時候遇到一個問題，就是我想要直接在我的SQL查詢語句裡面夾帶$_POST變數，不想要用串接運算子來做串接，可是因為引號的問題所以讓我搞了很久才會用，這裡簡單的介紹一下，並且我要感謝Bu跟蒼時弦教會我這個方法！如果不是他們我可能還不知道這個方式，另外這個方式不只可以用在$_POST，也可以用在其他陣列


<!--more-->


P.S.使用本文的夾帶方式有SQL注入的危險，建議先將變數處理過在放到SQL Query中

大家都知道在PHP裡面，雙引號裡面可以放變數，例如：
<pre lang="php">$x=4;
echo "print $x";</pre>
以上程式碼會輸出：「print 4」

但如果是：
<pre lang="php">$x=4;
echo 'print $x';</pre>
則會輸出：「print $x」

而我現在的意思就是說我把SQL查詢命令用雙引號包住，然後再裡面放變數，放一般變數是可以的，但如果放$_POST的話就會出一點小問題…..

SQL查詢命令夾帶一般變數：
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$name'");</pre>
上面這樣是可以正常運作的

但如果改成：
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$_POST["name"]' ");
mysql_query("select * from `sql_tab` where `name`='$_POST['name']' ");</pre>
以上兩種寫法都是會出錯的，因為引號的問題

所以， 該怎麼寫呢？ 原來，在PHP裡面，你的$_POST其實不一定要用引號框住

也就是說我們可以寫成：
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$_POST[name]'");</pre>
這樣的寫法，name不需要用單引、雙引框住

但是這樣的寫法對效能有些傷害，因為PHP會先去搜尋程式裡面是否有$name這個變數，如果沒有，才會把$_POST[name]當成$_POST["name"]來處理，所以效能變差了

既然如此，還有什麼更好的寫法嘛？這時候就要感謝Bu大大在我頭上開了一盞明燈！ 可以改寫成：
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='{$_POST["name"]}'");</pre>
以上的寫法，把$_POST用大括弧包住，然後name的部份一樣用雙引號處理，透過這種寫法，就可以在SQL查詢語句裡面夾帶$_POST或是陣列囉～
