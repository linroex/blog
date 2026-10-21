---
title: "PHP で基本的な SQL インジェクション対策をするには？"
date: 2011-08-02T07:00:27
slug: "php-basic-sql-injection-defense"
tags: ["PHP", "SQL", "Hardening"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_222010.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: block; margin-left: auto; margin-right: auto; padding-top: 0px; border-width: 0px; border-color: initial; border-style: initial;" title="2011-08-01_222010" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_222010_thumb.jpg" alt="2011-08-01_222010" width="524" height="401" border="0" /></a>

ここ数日、連絡先を整理する小さなプログラムを書いていたので、いろいろと調べていました。データベースを扱う部分では、パラメータに悪意のある文字列を入れてデータベースを攻撃する、いわゆる SQL インジェクションを防ぐために、基本的な対策を入れています。以下では、SQL インジェクションに対する基本的な防御方法を紹介します～


<!--more-->


また、昨日私のサイトで、文字列の連結で SQL インジェクションが起きるのではないかという質問がありました。ここで説明させてください。確かに文字列の連結では SQL インジェクションが起こり得ますが、ユーザーの入力データをチェックしていれば、この問題は避けられます。文字列の連結を危険だと考える人は、おそらく二つのどちらかでしょう。一つは SQL インジェクションをあまりよく理解していないこと、もう一つは文字列の連結さえ使わなければ完全に防げると思っていることです。前者はまだ理解できますが、後者はかなり深刻です。知ったかぶりをする人たちが混ざっているせいで、多くのウェブサイトのセキュリティが弱くなっています。少し言葉がきつくなってすみませんが、これは事実です。ユーザーの入力データを何もチェックしていなければ、サイトが攻撃されるのは当然のことです。また、SQL インジェクションを100%防ぐ方法はありません。できるのはセキュリティを高めることだけです。この記事で紹介する方法は SQL インジェクションにまったく効果がないではないか、とこの記事に反論してくる読者もいるかもしれませんね。お手並み拝見です～
<h2>一、magic_quotes_gpc を有効にする</h2>
<strong>magic_quotes_gpc</strong> は PHP に組み込まれた、SQL インジェクションを防ぐ基本的な仕組みです。GET と POST で渡されたすべての情報を自動的に処理し、シングルクォートやダブルクォートなどの記号の前にエスケープ文字（バックスラッシュ）を追加することで、SQL インジェクションを防ぎます。ただし、magic_quotes_gpc には欠点があります。ユーザーが送ったデータが攻撃文字列ではなくても、オンにしていれば処理されてしまうのです。その結果、ユーザーの入力が元のものと違ってしまうことがあります。そのため、magic_quotes_gpc を有効にするかどうかはご自身で選んでください。

参考資料：
<ul>
	<li><a href="http://php.net/manual/en/security.magicquotes.php">http://php.net/manual/en/security.magicquotes.php</a></li>
</ul>
magic_quotes_gpc を有効にするのは簡単です。php.ini を開き、「magic_quotes_gpc」を検索します。

<strong>magic_quotes_gpc=off を magic_quotes_gpc=on に変更します</strong>

デフォルトではオンになっています。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_215928.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border-width: 0px;" title="2011-08-01_215928" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-01_215928_thumb.jpg" alt="2011-08-01_215928" width="524" height="414" border="0" /></a>
<h2>二、受け取ったデータを処理する</h2>
前に述べたように、<strong>magic_quotes_gpc</strong> は受け取ったデータを処理するため、時には処理すべきでないデータまで処理してしまい、問題になることがあります。そのため、この機能をオフにする人もいます。magic_quotes_gpc をオフにしても問題ありません。ここでは、magic_quotes_gpc と同じ効果を得られる PHP の関数を二つ紹介します。こちらのほうが柔軟性が高いです。<strong>magic_quotes_gpc は GET と POST の「すべて」を処理しますが、ここで紹介する関数は対象を指定して使えます</strong>～

紹介する二つの関数は <strong>mysql_real_escape_string</strong> と <strong>addslashes</strong> です。機能は似ていますが、mysql_real_escape_string のほうが多くの機能を持ち、より多くのデータを処理します。一方、addslashes は「シングルクォート、ダブルクォート、バックスラッシュ」だけを処理します。どちらを使うかはお好みで選んでください。また、この二つの関数を使う前に、get_magic_quotes_gpc 関数で magic_quotes_gpc が有効になっていないかを確認してください。magic_quotes_gpc がすでに有効な状態でこの二つの関数を使うと、データが二重に処理されてしまい、問題が起きます。

どちらの関数も、処理したい変数をそのまま引数に渡して使います。get_magic_quotes_gpc は、無効のときは 0、有効のときは 1 を返します。

<strong>参考資料：</strong>
<ul>
	<li><a href="http://php.net/manual/en/function.get-magic-quotes-gpc.php">http://php.net/manual/en/function.get-magic-quotes-gpc.php</a></li>
	<li><a href="http://php.net/manual/en/function.mysql-real-escape-string.php">http://php.net/manual/en/function.mysql-real-escape-string.php</a></li>
	<li><a href="http://php.net/manual/en/function.addslashes.php">http://php.net/manual/en/function.addslashes.php</a></li>
	<li><a href="http://goo.gl/Umwh2" target="_blank">http://goo.gl/Umwh2</a></li>
</ul>
<strong>例：</strong>
<pre lang="php">echo '是否有啟動magic_quotes_gpc：' . get_magic_quotes_gpc();
$content='"我"以為';
echo '處理前：' . $content ;
echo '使用mysql_real_escape_string處理：';
echo '結果：' . mysql_real_escape_string($content);
echo '使用addslashes處理：';
echo '結果：' . addslashes($content);</pre>
