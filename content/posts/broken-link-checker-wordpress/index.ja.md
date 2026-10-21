---
title: "Broken Link Checker - WordPressの失効リンクと表示されない画像を自動でチェック"
date: 2010-05-28T00:05:48
slug: "broken-link-checker-wordpress"
tags: ["WordPress", "WordPress Plugins"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-28_000215.jpg"><img class="size-large wp-image-3186 alignleft" title="2010-05-28_000215" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-28_000215-500x303.jpg" alt="" width="500" height="303" /></a>

インターネットでファイルを探していると、やっと目的のファイルを見つけてリンクをクリックしたら「このページは削除されました。サイト管理者にお問い合わせください」と表示された、という困った経験はよくあるものです。本当にがっかりしますよね。ただ、これはサイト運営者だけの責任とも言えません。サイトが大きくなると外部へのリンクがたくさん増え、運営者がすべてのリンクを一つひとつ確認するのは現実的ではないからです。ユーザーに失効リンクを報告してもらう方法もありますが、個人的にはあまり効果的ではないと思っています。リンク切れに遭ってすでに不快な思いをしている人が、わざわざ報告してくれるとは思えないからです。ここでは WordPress 専用のプラグイン <strong>Broken Link Checker</strong> を紹介します。このプラグインを使うと、ブログ内のすべての失効リンクや、表示されない画像（台湾では「包子画像」と俗に呼ばれています）を自動でチェックできます。さらに <strong>Broken Link Checker</strong> は、ブログに失効リンクが出現したときにメールで知らせてくれる機能もあり、とても便利です。ただ、初めてインストールする方は、この機能をすぐにオンにしないことをおすすめします。初回のチェックで数千件もの失効リンクや画像が見つかることが多く、メールボックスがあふれてしまうかもしれません XD


<!--more-->

<h2>Broken Link Checker 情報</h2>
<ul>
	<li>公式サイト：<a href="http://goo.gl/gU0N">http://goo.gl/gU0N</a></li>
	<li>ダウンロード：<a href="http://downloads.wordpress.org/plugin/broken-link-checker.0.9.3.zip">公式ダウンロード</a> ｜ Xun6 ｜ <a href="http://www.box.net/shared/lujjd6vgko">Box.net</a> ｜ <a href="http://www.4shared.com/file/abKqTYfN/broken-link-checker093.html ">4Shared</a></li>
</ul>
（管理画面から直接インストールできない場合は、ここからファイルをダウンロードして手動でインストールしてください）
<h2>Broken Link Checker の特徴：</h2>
<ul>
	<li>WordPress 内の失効リンク&amp;画像を自動でチェックでき、誤検知の率が非常に低い</li>
	<li>数時間ごとに自動でチェックするように設定できる</li>
	<li>メールで失効リンクをサイト管理者に知らせられる</li>
	<li>サーバーの CPU 使用率が一定以上になったら動作を停止するように設定できる</li>
</ul>
<h2>Broken Link Checker の使い方</h2>
1. まず WordPress の管理画面を開き、【プラグイン】→【新規追加】の順にクリックします。検索欄に「Broken Link Checker」と入力して、「プラグインを検索」をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224055.png"><img class="alignnone size-large wp-image-3179" title="2010-05-27_224055" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224055-500x303.png" alt="" width="500" height="303" /></a>

2. 検索結果の一番上のプラグインを選び、【インストール】→【今すぐインストール】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224811.jpg"><img class="alignnone size-large wp-image-3180" title="2010-05-27_224811" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224811-500x303.jpg" alt="" width="500" height="303" /></a>

3. 必要な情報を入力し、【続ける】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_225135.jpg"><img class="alignnone size-large wp-image-3181" title="2010-05-27_225135" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_225135-500x303.jpg" alt="" width="500" height="303" /></a>

4. インストールが終わったら【プラグインを有効化】をクリックし、続けて【設定】→【Link Checker】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_231006.jpg"><img class="alignnone size-large wp-image-3182" title="2010-05-27_231006" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_231006-312x400.jpg" alt="" width="312" height="400" /></a>

5. ここで Broken Link Checker のさまざまな設定を確認できます。本当は皆さんのために繁体字中国語の言語ファイルを作るつもりでしたが、時間が遅くなってしまい作れませんでした。そこで、以下に重要な設定項目について説明します。
<blockquote>Status：失効リンクの一覧が表示されます

Re-check all pages：すべてのリンクを手動で再チェックします

Check each link：リンクを何時間ごとにチェックするかを設定します。毎日チェックするとサーバーへの負荷が大きいため、少なくとも 3 日に設定することをおすすめします

Broken link CSS / Removed link CSS：失効リンクや削除されたリンクのスタイルを設定します（私自身は設定していません）

Broken link SEO：チェックを入れると、失効リンクの後ろに <a href="http://www.google.com/support/webmasters/bin/answer.py?hl=b5&amp;answer=96569">nofollow タグ</a> が自動で追加されます

Exclusion list：ここに登録したリンクは、失効リンクの対象から自動的に除外されます。誤検知を防ぐための機能で、現在は https のリンクで誤検知が起きやすいことが知られています

E-mail notifications：ブログに失効リンクが現れたとき、メールで自動的に知らせてくれます

Server load limit：サーバーの CPU 負荷がこの値を超えると、リンクのチェックを自動的に停止します。これはホスティング業者に遮断されるのを防ぐためのものです。私は以前、オンラインの人数が多い時間帯にこのプラグインを有効にしていて、結果的に遮断されたことがあります……</blockquote>
6. 失効リンクの一覧は、【ダッシュボード】→【ツール】→【Broken Links】で確認することもできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_233634.jpg"><img class="alignnone size-large wp-image-3185" title="2010-05-27_233634" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_233634-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>レビュー</h2>
私は Broken Link Checker を長く使っています。率直な感想は、とても便利だということです。このプラグインを使い始めてから、ブログのリンク切れを読者から指摘されることはほとんどなくなりました。ただ、Broken Link Checker は時々誤検知をすることがあります。たとえば、サイトのホスティングサーバーが中国本土にある場合は誤検知が起きやすくなります。中国本土では多くのサイトがブロックされているため、Broken Link Checker のボットがそれらを失効したサイトと判断してしまうのです。また、https の URL も誤って検知されることが多いと感じています。暗号化が関係しているのかもしれません。さらに、失効リンクは検索エンジンの評価を下げる原因にもなります。私がこのプラグインを入れたのも、その点を本で読んだからでした。
