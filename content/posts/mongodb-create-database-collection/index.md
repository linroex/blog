---
title: "如何在Mongodb裡面建立資料庫、資料表？"
date: 2012-01-23T18:38:22
slug: "mongodb-create-database-collection"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%9c%a8mongodb%e8%a3%a1%e9%9d%a2%e5%bb%ba%e7%ab%8b%e8%b3%87%e6%96%99%e5%ba%ab%e3%80%81%e8%b3%87%e6%96%99%e8%a1%a8%ef%bc%9f/"]
tags: ["Mongodb", "NoSQL"]
categories: ["Mongodb"]
---

之前在玩Mongodb時，在他官方的文件裡面找了很久都找不到關於如何建立資料庫、資料表的語法。一般來講在SQL裡面，都是要預先建立好資料表的，也會有相關的指令，例如Create Table、Create Database，然而我在Mongodb裡面完全找不到相關指令，後來上網找了一下資料才知道原來這就是他的特色之一：Schema Free


<!--more-->


在Mongodb裡面，你不需要預先去建立資料庫、欄位、資料表，他會自動幫你建立，這樣做的好處就是可以省掉一部分規劃資料表的時間，像我這次在松山工農比賽，就花了蠻多時間是在設計資料表上面，如果那時候有學會Mongodb，應該能省下很多時間，不過這不代表可以完全不去設計資料表，必要的規劃可以讓你的資料庫跑的更順利！！

上面的文字描述可能大家有點難以理解，下面我用語法來解釋：

預設情況在最初使狀態，沒有建立任何資料庫

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182500.jpg"><img class="aligncenter size-large wp-image-782" title="2012-01-23_182500" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182500-540x352.jpg" alt="" width="540" height="352" /></a>

輸入下面的語法：
<blockquote>use testDB

db.TableA.save({name:'linroex'})</blockquote>
然後輸入show dbs，顯示目前有哪些資料庫，你會發現，明明沒有Create DB的動作，但是資料庫卻多了一個testDB

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182751.jpg"><img class="aligncenter size-large wp-image-783" title="2012-01-23_182751" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182751-540x352.jpg" alt="" width="540" height="352" /></a>

再來，輸入：show collections，顯示目前使用的資料庫裡面有哪些資料表，你會發現有TableA這個項目

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182933.jpg"><img class="aligncenter size-large wp-image-785" title="2012-01-23_182933" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182933-540x352.jpg" alt="" width="540" height="352" /></a>

以上，就是Mongodb會自動建立資料表、資料庫的最佳證明！ 他會在你「存入」資料時，自動建立不存在的資料庫、資料表甚至是欄位，但像剛剛我們有一行指令是：
<blockquote>use testDB</blockquote>
單純這行指令是不會建立資料庫的，要等到後面的save指令，才會同步建立資料庫以及資料表

&nbsp;
