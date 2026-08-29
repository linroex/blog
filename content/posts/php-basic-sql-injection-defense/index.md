---
title: "在PHP裡面如何做到基本的SQL injection防禦？"
date: 2011-08-02T07:00:27
slug: "php-basic-sql-injection-defense"
aliases: ["/posts/%e5%9c%a8php%e8%a3%a1%e9%9d%a2%e5%a6%82%e4%bd%95%e5%81%9a%e5%88%b0%e5%9f%ba%e6%9c%ac%e7%9a%84sql-injection%e9%98%b2%e7%a6%a6%ef%bc%9f/"]
tags: ["PHP", "SQL", "php.ini", "magic_quotes_gpc", "mysql_real_escape_string", "SQL injection"]
categories: ["PHP"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_222010.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: block; margin-left: auto; margin-right: auto; padding-top: 0px; border-width: 0px; border-color: initial; border-style: initial;" title="2011-08-01_222010" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_222010_thumb.jpg" alt="2011-08-01_222010" width="524" height="401" border="0" /></a>

最近幾天因為寫了一個聯絡人整理的小程式，所以研究了蠻多東西，其中在處理資料庫的部份為了避免所謂的SQL injection，也就是會在你的參數裡面放入惡意字串，用來攻擊你的資料庫，所以使用了一些基本的防禦，而以下要介紹的就是如何對SQL injection做一些基本防禦～


<!--more-->


另外昨天有人在我的網站上質疑使用組合字串的方式會造成SQL injection的問題，在這裡我可能要解釋一下：的確使用組合字串可能導致SQL injection的問題，但如果你有對使用者輸入的資料進行一些檢查，其實可以避免這個問題，我在想會認為組合字串有風險的人，可能第一他不夠了解SQL injection吧，二來可能他認為只要不使用字串組合就可以完全避免SQL injection，如果是前者還可以接受，如果是後者我想就很嚴重，很多網站的安全性這麼差就是因為有一批不懂裝懂的人在混，抱歉說的難聽了一點，但這是實話，如果你對於使用者輸入的資料都不做檢查，那你的網站被攻擊是正常的，而且沒有100％抵擋SQL injection的方式，只能增加安全性而已，我想那位網友可能會想來嗆我這篇文章，說我教的方法對於SQL injection完全沒有效果吧？拭目以待囉～
<h2>一、啟動magic_quotes_gpc</h2>
<strong>magic_quotes_gpc</strong>是PHP內建，一項防禦SQL injection的基本手段，他會自動去將所有透過GET、POST傳值的資訊進行處理，把一些符號（例如單引號、雙引號）加入轉義符號（反斜線），藉此來避免SQL injection的問題，不過magic_quotes_gpc有個缺點就是，如果使用者傳入的資料並非是攻擊字串，可是在開啟magic_quotes_gpc的情況下他仍然會進行處理，這時候就會導致使用者的輸入資料與原本的不同，因此是否要啟動magic_quotes_gpc就看你個人選擇

參考資料：
<ul>
	<li><a href="http://php.net/manual/en/security.magicquotes.php">http://php.net/manual/en/security.magicquotes.php</a></li>
</ul>
啟動magic_quotes_gpc很簡單，開啟你的php.ini，然後搜尋「magic_quotes_gpc」

把<strong>magic_quotes_gpc=off改成magic_quotes_gpc=on</strong>

預設情況下是開啟的

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_215928.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="2011-08-01_215928" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_215928_thumb.jpg" alt="2011-08-01_215928" width="524" height="414" border="0" /></a>
<h2>二、將傳入的資料進行處理</h2>
前面講過，因為<strong>magic_quotes_gpc</strong>會對傳入的資料進行處理，有時候會處理到不該處理的資料，這時候可能會造成困擾，因此有人會將此項功能關閉，如果你把magic_quotes_gpc關閉的話也沒有關係，這裡要介紹兩個PHP的函式，可以做到跟magic_quotes_gpc一樣的效果，只是彈性更大，<strong>magic_quotes_gpc會對「所有」GET、POST都做處理</strong>，但是這裡介紹的函式是可以指定性的使用的～

這裡要介紹的兩個函式分別是<strong>mysql_real_escape_string</strong>跟<strong>addslashes</strong>，這兩個函式功能相近，只是mysql_real_escape_string的功能更多，他會處理更多資料，而addslashes只會對「單引號、雙引號、反斜線進行處理」，至於要用哪個就看你自己的選擇，另外在使用這兩個函式之前，要先透過get_magic_quotes_gpc這個函式檢查式有有開啟magic_quotes_gpc模式，如果再開啟magic_quotes_gpc的情況下使用這兩個函式，就會造成重複處理，會出問題

兩個函式的使用都是直接將要處理的變數傳進去就可以了，另外get_magic_quotes_gpc的部份，當返回0代表沒有啟動，返回1代表有啟動

<strong>參考資料：</strong>
<ul>
	<li><a href="http://php.net/manual/en/function.get-magic-quotes-gpc.php">http://php.net/manual/en/function.get-magic-quotes-gpc.php</a></li>
	<li><a href="http://php.net/manual/en/function.mysql-real-escape-string.php">http://php.net/manual/en/function.mysql-real-escape-string.php</a></li>
	<li><a href="http://php.net/manual/en/function.addslashes.php">http://php.net/manual/en/function.addslashes.php</a></li>
	<li><a href="http://goo.gl/Umwh2" target="_blank">http://goo.gl/Umwh2</a></li>
</ul>
<strong>範例：</strong>
<pre lang="php">echo '是否有啟動magic_quotes_gpc：' . get_magic_quotes_gpc();
$content='"我"以為';
echo '處理前：' . $content ;
echo '使用mysql_real_escape_string處理：';
echo '結果：' . mysql_real_escape_string($content);
echo '使用addslashes處理：';
echo '結果：' . addslashes($content);</pre>
