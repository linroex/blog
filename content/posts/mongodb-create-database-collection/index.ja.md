---
title: "MongoDB でデータベースとコレクションを作成するには？"
date: 2012-01-23T18:38:22
slug: "mongodb-create-database-collection"
tags: ["MongoDB"]
categories: ["Programming"]
draft: false
---

以前、MongoDB で遊んでいたとき、公式ドキュメントの中でデータベースやテーブルの作り方を長いこと探しましたが、見つかりませんでした。一般的に SQL では、テーブルを事前に作成しておく必要があり、Create Table や Create Database といったコマンドがあります。しかし MongoDB には、そうしたコマンドがまったく見つかりませんでした。後からネットで調べて、これが MongoDB の特徴の一つであると知りました。それが Schema Free です。


<!--more-->


MongoDB では、データベース、フィールド、テーブルを事前に作成する必要はありません。自動的に作成してくれます。この仕組みの利点は、テーブル設計にかかる時間の一部を省けることです。たとえば今回、松山工農の大会では、テーブル設計にかなりの時間を使いました。あのとき MongoDB を知っていれば、ずいぶん時間を節約できたはずです。ただし、だからといって、まったく設計しなくてよいわけではありません。必要な計画を立てておくことで、データベースはもっとスムーズに動くようになります！！

上の説明はわかりにくいかもしれないので、以下ではコマンドを使って説明します。

初期状態では、データベースは1つも作成されていません。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182500.jpg"><img class="aligncenter size-large wp-image-782" title="2012-01-23_182500" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182500-540x352.jpg" alt="" width="540" height="352" /></a>

次のコマンドを入力します：
<blockquote>use testDB

db.TableA.save({name:'linroex'})</blockquote>
続けて show dbs と入力すると、現在存在するデータベースの一覧が表示されます。データベースを作成する操作はしていないのに、testDB が増えていることがわかります。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182751.jpg"><img class="aligncenter size-large wp-image-783" title="2012-01-23_182751" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182751-540x352.jpg" alt="" width="540" height="352" /></a>

次に、show collections と入力します。現在使用中のデータベースにあるコレクション（テーブル）の一覧が表示されます。そこには TableA という項目があることがわかります。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182933.jpg"><img class="aligncenter size-large wp-image-785" title="2012-01-23_182933" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-23_182933-540x352.jpg" alt="" width="540" height="352" /></a>

以上のとおり、MongoDB がデータベースやテーブルを自動的に作成することの、何よりの証拠です！ データを「保存」するときに、存在しないデータベース、テーブル、さらにはフィールドまで自動的に作成してくれるのです。ただし、先ほどのコマンドの一つを思い出してください：
<blockquote>use testDB</blockquote>
このコマンドだけでは、データベースは作成されません。データベースとテーブルが作られるのは、後に続く save コマンドが実行されたときです。

&nbsp;
