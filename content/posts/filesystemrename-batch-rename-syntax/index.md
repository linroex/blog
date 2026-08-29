---
title: "【VB.Net】使用rename修改檔名"
date: 2009-04-23T10:12:00
slug: "filesystemrename-batch-rename-syntax"
aliases: ["/posts/filesystemrename-%e6%94%b9%e6%aa%94%e5%90%8d%e7%9a%84%e8%aa%9e%e6%b3%95/"]
tags: ["VB"]
categories: ["VB.NET"]
---

今天要教各位的是使用VB本身提供的一個方法來修改檔名

他的語法格式是:
<pre lang="vb">Filesystem.rename(a,b)</pre>
a代表輸入的檔案,也就是要被改名的檔案

b代表的則是輸出的檔名

請注意,a與b兩項參數都必須要以完整形式出現

假設現在要修改c:123.txt這個檔案改名成456.txt的話則輸入
<pre lang="vb">Filesystem.rename("c:123"."c:456.txt")</pre>
注意喔!我的兩個參數都是有副檔名的,而且都有磁碟號跟資料夾名稱

如果b參數沒有填上完整名稱則修改好的檔案會被移動到程式的根目錄

大家都有看懂吧

這個語法2008跟2005都可以用,不過VB6我就沒試過了
