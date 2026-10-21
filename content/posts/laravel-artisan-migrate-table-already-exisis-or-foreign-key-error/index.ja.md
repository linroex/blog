---
title: "Laravel Artisan の migrate で出る「Table Already Exists」「Foreign Key」エラー"
date: 2016-12-12T04:57:46
slug: "laravel-artisan-migrate-table-already-exisis-or-foreign-key-error"
tags: ["PHP", "Laravel"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/laravel.png"]
draft: false
---

半年前に Laravel 5.2 で開発したプロジェクトをデプロイしたとき、いくつか問題にぶつかりました。その一つが、php artisan migrate を実行すると Table Already Exists エラーが出ることです。しかし、そのテーブルを作成した覚えは一度もありません。詳しく調べると、テーブル自体は存在していたのですが、project_migrations テーブルにはその記録がありませんでした。そこでテーブルを手動で削除してから、もう一度 php artisan migrate を実行しました。すると今度は、本当のエラーメッセージが表示されました。「General error: 1005 Can't create table 'dbname.#sql-fbc1_15e6' (errno: 121) (SQL: alter table `karl_project` add constraint `project_user_id_foreign` foreign key (`user_id`) references `karl_user`
(`id`))」


<!--more-->


&nbsp;

もしあなたも Table Already Exists エラーに遭遇しているなら、migrations フォルダに記録があるか、そしてそのテーブルが本当に存在するかを確認してみてください。当てはまるようなら、先を読んでみてください。私と同じ問題に当たっているかもしれません！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.56.jpg"><img class="alignnone size-full wp-image-7037" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.56.jpg" alt="" width="567" height="305" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.39.jpg"><img class="alignnone size-full wp-image-7038" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.39.jpg" alt="" width="572" height="285" /></a>

この問題の原因は二つ考えられます。一つ目は、Foreign Key 機能を使うには MySQL のエンジンを InnoDB に設定する必要があることです。これは config/database.php の mysql engine の設定で変更できます。ただ、Laravel はデフォルトで InnoDB を使うため、データベースに別の設定をしていなければ、この問題とは関係ないはずです。問題のテーブルが InnoDB エンジンを使っているかどうかは、次の SQL 文で確認できます。
<pre>SELECT TABLE_SCHEMA,TABLE_NAME,ENGINE FROM information_schema.TABLES WHERE TABLE_NAME = '<span style="color: #808080;">table_name</span>';</pre>
確認したところ、すでに InnoDB を使っていたため、この可能性は除外しました。

次に、さらに多くの記事を調べたところ、もう一つの可能性が見つかりました。Migration ファイルで Foreign Key を設定するとき、私はいつも次のように、テーブルを作成すると同時に Foreign Key も作成する書き方をしていました。
<pre>Schema::create('project', function($table){
    $table-&gt;increments('id');
    $table-&gt;string('project_name', 100);
    $table-&gt;string('author', 100);
    $table-&gt;timestamps();
    $table-&gt;integer('user_id')-&gt;unsigned();
    $table-&gt;foreign('user_id')-&gt;references('id')-&gt;on('user');
});</pre>
<div>この書き方でも、これまではマイグレートが問題なく成功していました。バージョン番号も変更していません。しかし、この書き方がエラーの原因になるという記事もありました。user_id の Foreign Key を作成する時点では、そのカラムがまだ存在しないため、ここで処理が失敗するというのです。そうなると、テーブルは作成されるのに migrations テーブルには記録が残らず、その後のすべての Migration ファイルも実行されないことになります。筋は通っていると思いました（ただ、以前は動いていたのに急に動かなくなった理由は、まだよくわかりません）。そこで、公式ドキュメントが推奨している書き方に変更しました。次のとおりです。</div>
<div>
<pre>Schema::create('project', function($table){
    $table-&gt;increments('id');
    $table-&gt;string('project_name', 100);
    $table-&gt;string('author', 100);
    $table-&gt;timestamps();
    $table-&gt;integer('user_id')-&gt;unsigned();
});

Schema::table('news', function($table) {
    $table-&gt;foreign('user_id')-&gt;references('id')-&gt;on('user');
});</pre>
</div>
<div>この書き方の違いは、Foreign Key の作成を別の処理に切り出したことだけです。すると案の定、無事に実行できました…</div>
