---
title: "WP Security Scan - WordPress に脆弱性がないかスキャンする"
date: 2009-11-14T16:39:56
slug: "wp-security-scan-plugin"
tags: ["WordPress", "Hardening"]
categories: ["Blog"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-27-06.jpg"><img class="size-medium wp-image-2223 aligncenter" title="2009-11-14 15 27 06" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-27-06-300x216.jpg" alt="2009-11-14 15 27 06" width="300" height="216" /></a></p>
WP Security Scan は WordPress のプラグインで、WordPress の脆弱性をスキャンして、いくつか報告してくれます。自分でサーバーを立てている場合は、サイトを公開する前にファイルのパーミッションを設定する必要があることをご存じだと思います。たとえば 777.655 のような数値です。WP Security Scan の機能は、実際にはファイルのパーミッションが正しく設定されているかをチェックすることです。さらに、データベースの接頭辞の確認や変更もできるので、サイト構築の初心者にとても向いています。

<!--more-->

<h3>WP Security Scan プラグイン情報：</h3>
<ul>
	<li><span style="background-color: #ffffff;">公式サイト：   <a href="http://semperfiwebdesign.com/">http://semperfiwebdesign.com/</a></span></li>
	<li><span style="background-color: #ffffff;">現在のバージョン：   2.7.1.1</span></li>
	<li><span style="background-color: #ffffff;">対応する WordPress：   2.3~2.8.4</span></li>
	<li><span style="background-color: #ffffff;">ダウンロード先: <a href="http://downloads.wordpress.org/plugin/wp-security-scan.zip">http://downloads.wordpress.org/plugin/wp-security-scan.zip</a></span></li>
</ul>
<h3>WP Security Scan の機能：</h3>
<ol>
	<li><span style="background-color: #ffffff;">ファイルのパーミッションを確認</span></li>
	<li><span style="background-color: #ffffff;">WP データベースの接頭辞を変更</span></li>
	<li><span style="background-color: #ffffff;">WordPress のパスワードを変更</span></li>
	<li><span style="background-color: #ffffff;">WordPress のバージョン番号を非表示にする</span></li>
</ol>
<h2>WP Security Scan のインストール手順</h2>
1.WordPress の管理画面に入り、【プラグイン】→【新規追加】の順にクリックして、検索欄に「<span style="background-color: #ffffff;">WP Security Scan」</span>と入力します。

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-36-47.jpg"><img class="alignnone size-large wp-image-2224" title="2009-11-14 15 36 47" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-36-47-500x360.jpg" alt="2009-11-14 15 36 47" width="500" height="360" /></a></span>

<span style="background-color: #ffffff;">2.WordPress が検索した類似プラグインの一覧が表示されます。一番上のプラグインの「インストール」をクリックしてください。すると WP Security Scan の情報を表示する画面が開きます。横に【今すぐインストール】と書かれたボタンがあるはずなので、それを押せば OK です。</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-42-29.jpg"><img class="alignnone size-large wp-image-2225" title="2009-11-14 15 42 29" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-42-29-500x360.jpg" alt="2009-11-14 15 42 29" width="500" height="360" /></a></span>

3.最後に、WordPress からサーバーの ID とパスワードを求められます。これはレンタルサーバーのアカウント情報です。入力して「開始」を押すと、WordPress のインストールが始まります。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-45-25.jpg"><img class="alignnone size-large wp-image-2226" title="2009-11-14 15 45 25" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-45-25-500x360.jpg" alt="2009-11-14 15 45 25" width="500" height="360" /></a>

<span style="color: #ffffff;">.</span>
<h2>WP Security Scan の使い方：</h2>
<span style="color: #ffffff;">.</span>
<strong>一. WP Security Scan で基本情報を確認する</strong>
WP Security Scan をインストールしたら、WordPress の管理画面を開き、ページを一番下までスクロールします。サイドバーに「Security」という項目が表示されるので、それをクリックすると、サーバーの基本情報が表示されます。英語表示なので、以下に中国語訳を付けておきます。

P.S. WP Security Scan は、設定されていない部分（つまり脆弱性）を赤で表示し、安全な部分は緑で表示します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-55-16.jpg"><img class="alignnone size-large wp-image-2227" title="2009-11-14 15 55 16" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-55-16-500x360.jpg" alt="2009-11-14 15 55 16" width="500" height="360" /></a>

スキャン結果では、WP Security Scan が現在のバージョン番号、データベースの接頭辞を変更したかどうか、WordPress のバージョン番号を隠しているかどうか、初期設定の admin アカウントを変更したかどうかなどの情報を表示します。内容が理解できない場合は、Google 翻訳にかけてみてください。表示される情報は人によって異なるので、私が直接翻訳してあげることはできません。
<strong>二. データベースの接頭辞を変更する</strong>
では、なぜデータベースの接頭辞を変更する必要があるのでしょうか。WordPress のインストール時には、最初からデータベースの接頭辞が wp_ に自動設定されます。接頭辞を考える手間を省ける点では確かに便利です（実はそれほど手間でもないのですが @@）。しかし、それは攻撃者にとっても好都合になってしまいます。たとえば有名な Zero-day は、データベースの接頭辞を利用してサイトを攻撃するものでした。そのため、安全のためにデータベースの接頭辞を変更できる機能が用意されているのです。

1.ブログの管理画面に入り、【<span style="background-color: #ffffff;">Security】→【Database】の順にクリックします。次に「Change the current」の欄に、希望するデータベースの接頭辞を入力してください。英字である必要があり、末尾には必ずアンダースコア（ _ ）を付けてください。</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-27-37.jpg"><img class="alignnone size-large wp-image-2228" title="2009-11-14 16 27 37" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-27-37-500x360.jpg" alt="2009-11-14 16 27 37" width="500" height="360" /></a></span>
<div style="text-align: left;"><span style="background-color: #ffffff;">この手順だけで変更は完了です。ただし、「Start Renaming」を押したあとに下の画像のような文字が表示された場合は、手動で変更するしかありません。</span></div>
<div style="text-align: left;"><span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-32-06.jpg"><img class="alignnone size-large wp-image-2229" title="2009-11-14 16 32 06" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-32-06-500x360.jpg" alt="2009-11-14 16 32 06" width="500" height="360" /></a></span></div>
<strong>三. 詳細なスキャン結果を確認する</strong>
<span style="background-color: #ffffff;">ここでは、WP Security Scan で最も重要な機能、つまりファイルのパーミッションが正しく設定されているかをスキャンする方法を説明します。</span>

<span style="background-color: #ffffff;">1.管理画面に入り、【Security】→【Scanner】の順にクリックします。</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-35-13.jpg"><img class="alignnone size-large wp-image-2230" title="2009-11-14 16 35 13" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-35-13-500x360.jpg" alt="2009-11-14 16 35 13" width="500" height="360" /></a></span>

<span style="background-color: #ffffff;">2.次に、修正が必要なファイルを表示する表が出てきます。緑色は修正済み、赤色は未修正を表します。また、この表の項目の翻訳は以下のとおりです：</span>
<blockquote><span style="background-color: #ffffff;"><strong>Name: ファイル名</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong>File/Dir: ファイルの位置（.. はルートディレクトリを表す）</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong> </strong><strong>Needed Chmod：必要なファイルのパーミッション。つまり、パーミッションを変更するときに入力する数字です</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong> </strong><strong></strong><strong>Current Chmod：そのファイルの現在のパーミッション</strong></span></blockquote>
<span style="background-color: #ffffff;"><strong></strong><strong></strong><strong></strong><strong><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-38-25.jpg"><img class="alignnone size-large wp-image-2231" title="2009-11-14 16 38 25" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-38-25-500x360.jpg" alt="2009-11-14 16 38 25" width="500" height="360" /></a></strong></span>

<span style="background-color: #ffffff;"><strong>四. 初期設定の admin アカウントを変更する</strong></span>
<p style="text-align: left;">WordPress のオンラインインストーラーでは、初期の管理者アカウントは admin になっています。これは実は大きな脆弱性です。アカウント名が知られてしまうのと同じだからです。攻撃者はブルートフォース攻撃でパスワードを割り出せてしまいます。そのため、初期設定のアカウントは変更することをおすすめします。アカウント名の変更方法は次のとおりです：</p>
<p style="text-align: left;">1.サーバーのデータベースに入ります。</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214115.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214115" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214115-500x358.jpg" alt="2009-11-14_214115" width="500" height="358" /></a></p>
<p style="text-align: left;">2.wp-users の横にある「ブラウズ」をクリックします。</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214234.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214234" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214234-500x358.jpg" alt="2009-11-14_214234" width="500" height="358" /></a></p>
<p style="text-align: left;">3.wp-users テーブルに入ります。ここには現在ブログに登録されているアカウントが表示されます。admin という名前のアカウントの横にある鉛筆のアイコンをクリックします。</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214451.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214451" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214451-500x358.jpg" alt="2009-11-14_214451" width="500" height="358" /></a></p>
<p style="text-align: left;">4.user-login の項目を希望するアカウント名に書き換えて、「実行」を押せば変更完了です。</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214700.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214700" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214700-500x358.jpg" alt="2009-11-14_214700" width="500" height="358" /></a></p>
