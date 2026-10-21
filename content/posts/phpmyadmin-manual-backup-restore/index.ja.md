---
title: "phpMyAdminでデータベースを手動でバックアップ・復元する"
date: 2011-02-11T11:11:08
slug: "phpmyadmin-manual-backup-restore"
tags: ["PHPMyAdmin", "MySQL", "Backup"]
categories: ["SRE"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110444.jpg"><img class="alignnone size-full wp-image-220" title="2011-02-11_110444" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110444.jpg" alt="" width="478" height="378" /></a>

今回の記事では、データベースを「手動で」バックアップ・復元する方法を紹介します。サイト作りについて少しでも知っている方なら、データベースは定期的にバックアップしたほうがいいとご存じでしょう。サイトのデータはほとんどがデータベースに保存されているからです。しかし、実際にデータベースをバックアップしている人はどれくらいいるでしょうか？ 多くの人は「10分で始めるサイト作り」のような本でサイトの作り方を学びますが、そうした本は深い内容まで教えてくれないことがほとんどです。そのため、データベースのバックアップ方法を知らない人も多くいます。そこでここでは、MySQLデータベースを手動でバックアップする方法を、皆さんにお伝えします。

<span style="color: #ffffff;">.
<!--more-->

</span>
<h2>データベースのバックアップ</h2>
1.まず、MySQLデータベースに入り、【エクスポート】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110641.jpg"><img class="alignnone size-large wp-image-221" title="2011-02-11_110641" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110641-540x447.jpg" alt="" width="540" height="447" /></a>

2.エクスポートの欄の下にある【全選択】をクリックし、エクスポート形式をSQLに選びます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110750.jpg"><img class="alignnone size-large wp-image-222" title="2011-02-11_110750" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110750-540x447.jpg" alt="" width="540" height="447" /></a>

3.【ファイルとして保存】にチェックを入れてから、【実行】をクリックします。圧縮ファイルについては、使わないことをおすすめします。すべてのホストが圧縮ファイルに対応しているわけではないからです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110917.jpg"><img class="alignnone size-large wp-image-223" title="2011-02-11_110917" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110917-540x447.jpg" alt="" width="540" height="447" /></a>

バックアップの手順はここまでで、ほぼ終わりです。

次は復元の方法を説明します。バックアップしても復元できなければ意味がありませんからね。

<span style="color: #ffffff;">
</span>
<h2>データベースの復元</h2>
1.バックアップのときと同じように、まずphpMyAdminの管理画面に入ります。ただし今回は【エクスポート】ではなく【インポート】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195158.jpg"><img class="alignnone size-full wp-image-224" title="2009-07-14_195158" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195158.jpg" alt="" width="500" height="340" /></a>

2.【インポートするファイル】の下にある【参照】ボタンをクリックして、先ほどバックアップしたファイルの保存場所を選び、【実行】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195353.jpg"><img class="alignnone size-full wp-image-225" title="2009-07-14_195353" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195353.jpg" alt="" width="500" height="312" /></a>

復元には時間がかかります。バックアップファイルの大きさによりますね。私がサイトを引っ越したときは、10MBのバックアップファイルの復元に約5分かかりました。フリーズしたと思って、パソコンを強制的にシャットダウンしたりしないでくださいね ^^

バックアップ時に圧縮していた場合は、復元がもっと速くなります。

また、Shachiさんの高速SQL復元方法もおすすめです：<a href="http://shachi.tw/cpanel-quickly-upload-sql/">http://shachi.tw/cpanel-quickly-upload-sql/</a>
