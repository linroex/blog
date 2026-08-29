---
title: "Mongodb 文件式的NoSQL系統 ＆ Windows、Linux安裝教學"
date: 2012-01-24T14:26:45
slug: "mongodb-nosql-install-windows-linux"
aliases: ["/posts/mongodb-%e6%96%87%e4%bb%b6%e5%bc%8f%e7%9a%84nosql%e7%b3%bb%e7%b5%b1-%ef%bc%86-windows%e3%80%81linux%e5%ae%89%e8%a3%9d%e6%95%99%e5%ad%b8/"]
tags: ["Windows", "Linux", "Mongodb", "NoSQL"]
categories: ["Mongodb"]
---

前一陣子因為Ben大的指導，所以踏進了我一直很有興趣可是都沒有實際常試過的NoSQL世界，而我接觸到的第一個NoSQL System（也是目前唯一會的）就是Mongodb，原本看了很多介紹NoSQL的文章，我還以為NoSQL跟一般的SQL差很多，實際接觸Mongodb之後才發現其實兩者很像，只是在原理上有點不同，還有效能更好，不過鄉對應的，有些SQL可以做到的事情，NoSQL就不能達到，這部份就要看大家的取捨、需求，NoSQL的部份不是這篇文章要講的，這篇文章要講的是介紹Mongodb還有教大家怎麼安裝在Windows上面


<!--more-->


Mongodb是由10gen團隊所開發的一套NoSQL程式，它是文件式的資料庫系統，也就是說你的每一個Mongo資料庫都會以「檔案」的形式存放在資料夾中，如果要刪除資料庫，就直接把檔案刪掉就可以了，除此之外它支援多種作業系統，目前最常見的Windows、Mac、Linux都支援，另外有很多的程式語言也都支援Mongodb，例如著名的PHP、C++、Python、.NET、Java等等，詳細的支援列表可以參考此網頁（<a href="http://www.mongodb.org/display/DOCS/Drivers">http://www.mongodb.org/display/DOCS/Drivers</a>）

另外Mongodb的一大特色就是它的語法跟Javascript很像，你可以在你的Mongo命令裡面使用很多的Javascript語法，還可以在裡面使用迴圈、判斷式等等，例如for(var i=0;i

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142949.jpg"><img class="aligncenter size-large wp-image-798" title="2012-01-24_142949" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142949-540x352.jpg" alt="" width="540" height="352" /></a>

也可以直接在Mongod裡面使用各種Javascript物件，例如Date

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_143306.jpg"><img class="aligncenter size-large wp-image-799" title="2012-01-24_143306" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_143306-540x352.jpg" alt="" width="540" height="352" /></a>
<h2>Mongodb資訊</h2>
<ul>
	<li>官方網站：<a href="http://www.mongodb.org/">http://www.mongodb.org/</a></li>
	<li>下載頁面：<a href="http://www.mongodb.org/downloads">http://www.mongodb.org/downloads</a></li>
	<li>教學文件：<a href="http://www.mongodb.org/display/DOCS/Home">http://www.mongodb.org/display/DOCS/Home</a></li>
	<li>SQL＆Mongodb對應表：<a href="http://www.mongodb.org/display/DOCS/SQL+to+Mongo+Mapping+Chart">http://www.mongodb.org/display/DOCS/SQL+to+Mongo+Mapping+Chart</a></li>
</ul>
<h2>Mongodb特色</h2>
<ul>
	<li>文件式NoSQL</li>
	<li>結合Javascript</li>
	<li>高效能</li>
	<li>簡單易懂的語法</li>
</ul>
<h2>Install Mongodb on Windows、Linux</h2>
1.先到Mongodb的下載頁面下載你需要的主程式，注意32、64位元是不同的，下載好之後解壓縮，裡面有一個bin資料夾，將裡面的檔案移動到C:WINDOWS裡面

如果你是要安裝到Linux上面，請把bin裡的檔案移動到/usr/bin

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140448.jpg"><img class="aligncenter size-large wp-image-790" title="2012-01-24_140448" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140448-540x468.jpg" alt="" width="540" height="468" /></a>

2.在系統根目錄（C:）建立一個data資料夾，然後在data裡面建立db這個資料夾，這個資料夾是拿來給mongodb存放資料庫用的

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140812.jpg"><img class="aligncenter size-large wp-image-791" title="2012-01-24_140812" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140812-540x468.jpg" alt="" width="540" height="468" /></a>

Linux：
<blockquote>sudo mkdir -p /data/db

sudo chown `id -u` /data/db</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142443.jpg"><img class="aligncenter size-large wp-image-794" title="2012-01-24_142443" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142443-540x355.jpg" alt="" width="540" height="355" /></a>

3.到目前為止就算是安裝完成，打開CMD，然後輸入mongod，這是啟動mongodb server的意思，後面可以接很多不同的參數以達到不同的需求

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140924.jpg"><img class="aligncenter size-large wp-image-792" title="2012-01-24_140924" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140924-540x352.jpg" alt="" width="540" height="352" /></a>

4.接者在開啟另一個CMD視窗，然後輸入mongo，這是啟動Mongodb的Shell，你可以在這上面直接操控Mongodb，預設是連接到本機的Mongod Server，如果要連線到其他電腦的Mongod，可以輸入〔mongo ip/dbname〕，例如連接到200.0.0.15的test資料庫就輸入：mongo 200.0.0.15/test，如果指定的Mongod Server的Port有改變，那可以輸入〔mongo ip:port/dbname〕

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_141350.jpg"><img class="aligncenter size-large wp-image-793" title="2012-01-24_141350" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_141350-540x352.jpg" alt="" width="540" height="352" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142542.jpg"><img class="aligncenter size-large wp-image-795" title="2012-01-24_142542" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142542-540x352.jpg" alt="" width="540" height="352" /></a>

5.最後，你可以把bin/mongod這個程式加入到開機自動執行，不過你如果要讓他開機自動執行，需要注意安全性的設定
