---
title: "PHP の文字列（SQL クエリ）に配列・$_POST・$_GET を直接埋め込む方法"
date: 2011-08-01T14:23:03
slug: "php-embed-array-post-get-in-sql-string"
tags: ["PHP", "SQL"]
categories: ["Programming"]
draft: false
---

ここ数日、小さなプログラムを書いていて問題にぶつかりました。連結演算子を使わずに、$_POST の変数を SQL クエリの文字列に直接入れたかったのです。ところが引用符の問題があって、やり方がわかるまでかなり時間がかかりました。ここでは簡単に紹介します。また、この方法を教えてくれた Bu さんと蒼時弦さんにお礼を言いたいです！ お二人がいなければ、この方法は今でも知らなかったかもしれません。さらに、この方法は $_POST だけでなく、ほかの配列にも使えます。


<!--more-->


P.S. この記事の埋め込み方法には SQL インジェクションの危険があるので、変数をあらかじめ処理してから SQL クエリに入れることをおすすめします。

ご存じのとおり、PHP では二重引用符の中に変数を入れられます。たとえば次のようにします。
<pre lang="php">$x=4;
echo "print $x";</pre>
上のコードは「print 4」と出力します。

ただし、次のように書くと、
<pre lang="php">$x=4;
echo 'print $x';</pre>
「print $x」と出力されます。

私がやりたかったのは、SQL クエリ全体を二重引用符で囲み、その中に変数を入れることです。通常の変数であれば問題ありませんが、$_POST を入れると小さな問題が起きてしまいます…..

SQL クエリに通常の変数を埋め込む場合：
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$name'");</pre>
上の書き方は正しく動作します。

しかし、次のように書き換えると、
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$_POST["name"]' ");
mysql_query("select * from `sql_tab` where `name`='$_POST['name']' ");</pre>
どちらの書き方も引用符の問題でエラーになります。

では、どう書けばよいのでしょうか。実は PHP では、$_POST のキーを引用符で囲まなくてもよいのです。

つまり、次のように書けます。
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='$_POST[name]'");</pre>
この書き方なら、name を単一引用符や二重引用符で囲む必要はありません。

ただし、この書き方は少し性能に悪影響があります。PHP はまずプログラム内に $name という変数があるかを探し、なければ $_POST[name] を $_POST["name"] として扱うからです。そのため、性能が落ちてしまいます。

では、もっとよい書き方はないのでしょうか。ここで Bu さんが目から鱗の方法を教えてくれました！ 次のように書き換えられます。
<pre lang="php">mysql_query("select * from `sql_tab` where `name`='{$_POST["name"]}'");</pre>
この書き方では、$_POST を波かっこで囲み、name の部分は同じく二重引用符で囲みます。この方法なら、SQL クエリの文字列に $_POST や配列を埋め込めます～
