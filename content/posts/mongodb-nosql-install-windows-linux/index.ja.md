---
title: "MongoDB ― ドキュメント指向の NoSQL システムと、Windows・Linux へのインストール手順"
date: 2012-01-24T14:26:45
slug: "mongodb-nosql-install-windows-linux"
tags: ["MongoDB"]
categories: ["Programming"]
draft: false
---

少し前、Ben さんの指導のおかげで、以前から興味があったのになかなか実際に触れてこなかった NoSQL の世界に足を踏み入れました。最初に触れた NoSQL システムは MongoDB で、今のところ使えるのもこれだけです。NoSQL について書かれた記事をいろいろ読んで、最初は SQL とはずいぶん違うものだと思っていました。しかし実際に MongoDB を使ってみると、両者はとてもよく似ていることがわかりました。原理には多少の違いがあり、性能はより良いです。もちろん、SQL でできることの中には NoSQL ではできないこともあるので、それは各自のトレードオフや要件次第です。ただ、NoSQL の話はこの記事の主題ではありません。この記事では MongoDB を紹介し、Windows へのインストール方法をお伝えします。


<!--more-->


MongoDB は 10gen チームが開発した NoSQL プログラムです。ドキュメント指向のデータベースシステムで、つまり MongoDB の各データベースは、フォルダの中に「ファイル」として保存されます。データベースを削除したいときは、そのファイルを削除するだけです。また、複数の OS に対応しており、現在よく使われている Windows、Mac、Linux はすべてサポートされています。さらに、PHP、C++、Python、.NET、Java など、有名なプログラミング言語の多くも MongoDB に対応しています。対応言語の一覧は、こちらのページを参照してください（<a href="http://www.mongodb.org/display/DOCS/Drivers">http://www.mongodb.org/display/DOCS/Drivers</a>）。

また、MongoDB の大きな特徴の一つは、構文が JavaScript によく似ていることです。MongoDB のコマンドの中で多くの JavaScript の構文を使えますし、ループや条件分岐なども使えます。たとえば for(var i=0;i

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142949.jpg"><img class="aligncenter size-large wp-image-798" title="2012-01-24_142949" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142949-540x352.jpg" alt="" width="540" height="352" /></a>

mongod の中で、Date などの各種 JavaScript オブジェクトを直接使うこともできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_143306.jpg"><img class="aligncenter size-large wp-image-799" title="2012-01-24_143306" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_143306-540x352.jpg" alt="" width="540" height="352" /></a>
<h2>MongoDB の情報</h2>
<ul>
	<li>公式サイト：<a href="http://www.mongodb.org/">http://www.mongodb.org/</a></li>
	<li>ダウンロードページ：<a href="http://www.mongodb.org/downloads">http://www.mongodb.org/downloads</a></li>
	<li>ドキュメント：<a href="http://www.mongodb.org/display/DOCS/Home">http://www.mongodb.org/display/DOCS/Home</a></li>
	<li>SQL と MongoDB の対応表：<a href="http://www.mongodb.org/display/DOCS/SQL+to+Mongo+Mapping+Chart">http://www.mongodb.org/display/DOCS/SQL+to+Mongo+Mapping+Chart</a></li>
</ul>
<h2>MongoDB の特徴</h2>
<ul>
	<li>ドキュメント指向の NoSQL</li>
	<li>JavaScript と統合されている</li>
	<li>高性能</li>
	<li>シンプルでわかりやすい構文</li>
</ul>
<h2>Windows・Linux への MongoDB のインストール</h2>
1. まず MongoDB のダウンロードページから必要なメインプログラムをダウンロードします。32 ビット版と 64 ビット版は別物なので注意してください。ダウンロード後に解凍すると、中に bin フォルダがあります。その bin フォルダの中のファイルを C:WINDOWS に移動します。

Linux にインストールする場合は、bin の中のファイルを /usr/bin に移動してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140448.jpg"><img class="aligncenter size-large wp-image-790" title="2012-01-24_140448" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140448-540x468.jpg" alt="" width="540" height="468" /></a>

2. システムのルートディレクトリ（C:）に data フォルダを作成し、その中に db フォルダを作成します。このフォルダは、MongoDB がデータベースを保存する場所として使われます。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140812.jpg"><img class="aligncenter size-large wp-image-791" title="2012-01-24_140812" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140812-540x468.jpg" alt="" width="540" height="468" /></a>

Linux の場合：
<blockquote>sudo mkdir -p /data/db

sudo chown `id -u` /data/db</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142443.jpg"><img class="aligncenter size-large wp-image-794" title="2012-01-24_142443" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142443-540x355.jpg" alt="" width="540" height="355" /></a>

3. ここまでで、インストールは完了です。CMD を開き、mongod と入力します。これは MongoDB サーバーを起動するという意味です。用途に応じて、後ろにさまざまなパラメーターを付けることができます。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140924.jpg"><img class="aligncenter size-large wp-image-792" title="2012-01-24_140924" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140924-540x352.jpg" alt="" width="540" height="352" /></a>

4. 次に、もう一つ CMD のウィンドウを開き、mongo と入力します。これは MongoDB のシェルを起動するという意味で、ここから MongoDB を直接操作できます。デフォルトでは、ローカルマシンの mongod サーバーに接続されます。別のコンピューターの mongod に接続したい場合は、[mongo ip/dbname] と入力します。たとえば 200.0.0.15 の test データベースに接続するには、mongo 200.0.0.15/test と入力します。mongod サーバーのポートを変更している場合は、[mongo ip:port/dbname] と入力します。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_141350.jpg"><img class="aligncenter size-large wp-image-793" title="2012-01-24_141350" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_141350-540x352.jpg" alt="" width="540" height="352" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142542.jpg"><img class="aligncenter size-large wp-image-795" title="2012-01-24_142542" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142542-540x352.jpg" alt="" width="540" height="352" /></a>

5. 最後に、bin/mongod をコンピューターの起動時に自動で実行されるように設定することもできます。ただし、そうする場合はセキュリティの設定に注意してください。
