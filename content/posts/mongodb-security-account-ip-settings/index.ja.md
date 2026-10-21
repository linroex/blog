---
title: "MongoDB のセキュリティ設定：アカウント設定とログイン IP の設定"
date: 2012-01-25T15:12:55
slug: "mongodb-security-account-ip-settings"
tags: ["MongoDB", "Hardening"]
categories: ["SRE"]
draft: false
---

デフォルトの状態の MongoDB には、まったく保護がありません。アカウントがなくてもリモートからログインできてしまい、プログラミングに使うにはとても危険です。そこでこの記事では、MongoDB にアカウント設定を追加して、ログインにユーザー名とパスワードが必要になるようにする方法と、ログインを IP で制限する方法を紹介します。


<!--more-->


公式チュートリアル：<a href="http://www.mongodb.org/display/DOCS/Security+and+Authentication">http://www.mongodb.org/display/DOCS/Security+and+Authentication</a>
<h1>MongoDB のアカウント設定</h1>
MongoDB のアカウント設定は、一般的な方法とは少し異なります。私も最初は理解するのにずいぶん時間がかかりました。MongoDB では、まずサーバー全体に対する最高権限の管理アカウントを設定しなければなりません。このアカウントを設定すると、MongoDB にログインするたびにユーザー名とパスワードを入力しないとデータにアクセスできなくなります。そのあとで、個々のデータベースにユーザーを設定し、そのデータベースにアクセスできるようにします。最高権限のアカウントを先に設定しないと、個別のデータベースにユーザーを作ってもまったく意味がありません。ユーザーがログインするときに、ユーザー名もパスワードも入力せずにデータにアクセスできてしまうからです。

以下でデモをお見せします。最高権限のアカウントとは、admin データベースにユーザーを追加したものです。このユーザーは Mongo サーバー全体のすべてのデータを閲覧でき、個々のデータベースのユーザーによる制限を受けません。このユーザーを設定していなければ、アカウント機能は有効になりません。

最高権限を設定する前は、show dbs と入力すると、既存のデータベースがそのまま表示されます：

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141031.jpg"><img class="aligncenter size-large wp-image-806" title="2012-01-25_141031" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141031-540x352.jpg" alt="" width="540" height="352" /></a>

最高権限を設定すると、ログインしていない状態ではエラーメッセージが表示されます。この状態になってから、個別のデータベースにアカウントを設定します：

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141245.jpg"><img class="aligncenter size-large wp-image-807" title="2012-01-25_141245" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141245-540x365.jpg" alt="" width="540" height="365" /></a>

一方、最高権限を設定せず、個別のデータベースに直接ユーザーを追加した場合は、まったく効果がありません：

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141856.jpg"><img class="aligncenter size-large wp-image-808" title="2012-01-25_141856" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141856-540x365.jpg" alt="" width="540" height="365" /></a>

上のデモからわかるのは、admin データベースにユーザーを設定すると、システムはそれを「アカウント機能」を有効にする操作とみなす、ということです。つまり、データにアクセスするにはログインが必要になります。逆に admin にユーザーを設定しなければ、システムはアカウント機能を無効とみなします。この場合、ほかのデータベースにユーザーがいても、そのままデータにアクセスできてしまいます。そのため、admin のアカウントがなければ、ほかのデータベースにアカウントを追加しても意味がありません。

要するに、設定の手順は「admin データベースにユーザーを設定 → 最高権限でログイン → 個別のデータベースにユーザーを設定」です。

※以下のチュートリアルを読む前に、mongod を --auth パラメーターを付けて起動してください。これは認証機能を有効にするという意味です。このパラメーターなしで mongod を起動すると、アカウントを設定しても効果がありません。
<blockquote>mongod --auth</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150321.jpg"><img class="aligncenter size-large wp-image-815" title="2012-01-25_150321" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150321-540x352.jpg" alt="" width="540" height="352" /></a>
<h2>詳しい説明：</h2>
1. mongod サーバーに接続したら、admin データベースに切り替えます。
<blockquote>mongo

use admin</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_142603.jpg"><img class="aligncenter size-large wp-image-809" title="2012-01-25_142603" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_142603-540x365.jpg" alt="" width="540" height="365" /></a>

2. 最高権限のユーザーを追加します。
<blockquote>db.addUser('username','passwd','readOnly')</blockquote>
<strong>説明：</strong>

db.addUser コマンドはユーザーを追加するためのものです。第1引数の username がアカウント名、第2引数の passwd がパスワードです。第3引数は少し特殊で、このアカウントを読み取り専用にするかどうかを設定できます。1 にすると読み取り専用、0 にすると読み取り専用ではない、つまり書き込みが可能になります。デフォルトは読み取り専用ではない設定です。

また、アカウント名とパスワードは大文字と小文字が区別されます。さらに、文字列として扱われるように、アカウント名とパスワードは一重引用符で囲んでください。

<strong>例：</strong>
<blockquote>db.addUser('root','0000',1)     //アカウント root、パスワード 0000、読み取り専用（読むことはできるが書き込みはできない）</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143455.jpg"><img class="aligncenter size-large wp-image-810" title="2012-01-25_143455" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143455-540x365.jpg" alt="" width="540" height="365" /></a>

3. 続いて、ほかのデータベースにユーザーを追加できます。たとえば test データベースに「root_test」というユーザーを追加します。

ただし、<strong>ほかのデータベースにユーザーを作成する前に、データを保存する資格のあるユーザー（Not ReadOnly）でログインしておく必要があります。現時点でその資格があるのは最高権限のユーザーだけなので、ほかのデータベースにユーザーを作るには、最高権限のアカウントでログインしなければなりません</strong>。
<blockquote>use admin    //最高権限でログインするには、必ず admin データベースに切り替えます

db.auth('root','0000')</blockquote>
<blockquote>use test       //test データベースに切り替え

db.addUser('root_test','0000')</blockquote>
説明：db.auth はログインのコマンドです。第1引数がアカウント名、第2引数がパスワードです。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143739.jpg"><img class="aligncenter size-large wp-image-811" title="2012-01-25_143739" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143739-540x365.jpg" alt="" width="540" height="365" /></a>

※なお、MongoDB ではユーザーの作成は<strong>「グローバルではありません」</strong>。つまり、testA データベースに root アカウントを追加しても、testB データベースにも root アカウントを追加できます。最高権限でログインするときに、まず admin データベースに切り替える必要があるのはこのためです。最高権限のアカウントは admin データベースに属しており、システムが admin データベースのアカウントに最高権限を与えているだけなのです。

4. このように、アカウント保護を有効にしたうえで、ほかのデータベースにアカウントを設定しておけば、接続するときは、どのデータベースを使うかを決めて、<strong>まずそのデータベースに切り替えてから、ログインする</strong>だけでよいのです。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_144426.jpg"><img class="aligncenter size-large wp-image-812" title="2012-01-25_144426" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_144426-540x365.jpg" alt="" width="540" height="365" /></a>

5. あるデータベースのユーザーを削除したい場合は、まずそのデータベースに切り替えてから、ユーザーを削除します。たとえば test データベースの root_test ユーザーを削除するには（ログイン済みで、データを変更できる状態である必要があります）：
<blockquote>use test

db.removeUser('root_test')</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145018.jpg"><img class="aligncenter size-large wp-image-813" title="2012-01-25_145018" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145018-540x365.jpg" alt="" width="540" height="365" /></a>

あるデータベースに現在どのアカウントがあるかを確認したい場合は、db.system.users.find() と入力します。

これは、すべてのアカウントデータが system.users というコレクションに保存されているためです。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145156.jpg"><img class="aligncenter size-large wp-image-814" title="2012-01-25_145156" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145156-540x365.jpg" alt="" width="540" height="365" /></a>

<strong>まとめ：</strong>ここまで少し話が散らかってしまったので、最後に整理します。要するに、MongoDB でアカウント保護を有効にするには、まず最高権限のアカウントを追加しなければなりません。admin データベースに作成したアカウントが最高権限になります。このアカウントを作成したら、必ず先に最高権限でログインしてから、個別のデータベースにユーザーを追加してください。また、MongoDB のユーザーはグローバルではありません。A データベースのユーザーは A に属し、B データベースのユーザーは B に属します。そのため、ログインやユーザーの削除を行うときは、必ず正しいデータベースに切り替えなければなりません。たとえば A と B の両方に root アカウントがあり、A データベースの test を削除したい場合は、先に use A を実行してから db.removeUser('root') を実行する必要があります。そうしないと、別のデータベースのユーザーを誤って削除してしまうかもしれません。または、B データベースの root にログインしたい場合は、先に B に切り替えてからログインします。A データベースで db.auth() を実行してしまうと、ログインするのは A のアカウントであり、そのアカウントでは B のデータにアクセスできません！

また、admin 以外の一般のデータベースに初めてユーザーを作成するときは、admin データベースのユーザー（つまり最高権限）でログインし、ログインした状態で「最初の」ユーザーデータを追加する必要があります。ただし、一般のデータベースに最初のユーザーデータができてしまえば、そのユーザーでログインして、最高権限でログインしなくても、さらにユーザーを追加できます。これは、最初のユーザーを作成する時点では、そのデータベースには最高権限以外に、アクセス権を持つユーザーが存在しないためです。addUser は実際には、指定したデータベースの Collection にユーザーデータを書き込む処理なので、書き込みの権限を得るために、まず最高権限でログインしなければならないのです。
<h1>ログイン IP の設定</h1>
MongoDB では、いわゆるホワイトリストを設定できます。つまり、指定した IP からだけ mongod サーバーに接続できるようにすることができます。

設定は簡単で、mongod を起動するときに --bind_ip パラメーターを追加するだけです。たとえば、ローカルマシンからだけログインを許可したい場合は、mongod を起動するコマンドは次のとおりです：
<blockquote>mongod --bind_ip 127.0.0.1</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150959.jpg"><img class="aligncenter size-large wp-image-816" title="2012-01-25_150959" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150959-540x352.jpg" alt="" width="540" height="352" /></a>

ただし、複数の IP を指定できるかどうかは、まだ調査中です。現時点では、ホワイトリストに指定できる IP は1つだけです……。
