---
title: "WordPress プラグイン・テーマのインストール手順（この手順は WordPress 2.9 以前のバージョン向けです）"
date: 2010-06-01T13:36:01
slug: "wordpress-plugin-theme-install-tutorial"
tags: ["WordPress", "WordPress Plugins"]
categories: ["Blog"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_112430.jpg"><img class="size-large wp-image-3230 aligncenter" title="2010-06-01_112430" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_112430-500x303.jpg" alt="" width="350" height="212" /></a></p>
先日、WordPress にはどんな機能があるのかと聞かれたのですが、実はとても答えにくい質問です。WordPress は拡張性が高く、プラグイン（Plugins）を使えばブログにいろいろな機能を追加できます。極端な話、ブログとはまったく別のものにすることもできます^^ また、テーマをインストールして、ブログの見た目をおしゃれに整えることもできます。技術に自信があれば、テーマを自作することもできますが、それはこの記事で扱う内容ではありません。この記事では、プラグインとテーマのインストール方法を紹介します
<h2>
<!--more-->
</h2>
<h2>1. プラグインのインストール手順 - 管理画面からの簡単インストール</h2>
P.S. この方法ではプログラム本体をダウンロードする必要はなく、プラグインを直接インストールできます

管理画面からのインストールは、私が最もよく使う方法です。とても便利で、プラグイン本体を別途ダウンロードする必要も、FTP ソフトを用意する必要もありません。WordPress の管理画面を開くだけで、プラグインをインストールできます

1. WordPress の管理画面に入り、【外掛】（プラグイン）→【新增】（新規追加）の順にクリックします。次に検索欄に、インストールしたいプラグイン名を入力し、【搜尋外掛】（プラグインを検索）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114355.jpg"><img class="alignnone size-large wp-image-3232" title="2010-06-01_114355" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114355-500x303.jpg" alt="" width="500" height="303" /></a>

2. 検索結果のプラグインの一覧が表示されます。通常は一番上に、インストールしたいプラグインが表示されます。プラグインの説明を大まかに確認して、目的のプラグインであることを確かめてください。そのあと、インストールしたいプラグインの後ろにある【安裝】（インストール）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114827.jpg"><img class="alignnone size-large wp-image-3233" title="2010-06-01_114827" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114827-500x303.jpg" alt="" width="500" height="303" /></a>

3. 【安裝】を押すと、そのプラグインの詳しい情報が表示されます。ざっと確認したら、【立刻安裝】（今すぐインストール）を押せば OK です

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115026.jpg"><img class="alignnone size-large wp-image-3234" title="2010-06-01_115026" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115026-500x303.jpg" alt="" width="500" height="303" /></a>

4. FTP のアカウント、パスワード、FTP の場所を入力し、【繼續】（続行）を押します。接続方式は FTP を選べば十分です。セキュリティを特に重視する場合は SSL を選ぶこともできますが、その場合はサーバーも SSL に対応している必要があります

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115239.jpg"><img class="alignnone size-large wp-image-3235" title="2010-06-01_115239" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115239-500x303.jpg" alt="" width="500" height="303" /></a>

5. プラグインのインストール後に『成功地安裝外掛XXX。』（プラグイン XXX のインストールに成功しました）と表示されれば、インストール成功です。表示されない場合は失敗なので、通常は一度もう一度試してみてください。それでも失敗する場合は、FTP でインストールしてください

▼▼【啟用外掛】（プラグインを有効化）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_121302.jpg"><img class="alignnone size-large wp-image-3240" title="2010-06-01_121302" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_121302-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>2. プラグインのインストール手順 - FTP でのインストール</h2>
管理画面からのインストールは素早く便利ですが、一部のレンタルサーバーでは管理画面からのインストールが制限されていることがあります。そのような場合は、昔ながらの FTP によるインストールが役に立ちます

1. ここでは <a href="http://filezilla-project.org/">FileZilla</a> を使って説明します。まず FTP のファイル転送ソフトを開き、FTP サイトにログインしてください

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115741.jpg"><img class="alignnone size-large wp-image-3236" title="2010-06-01_115741" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115741-500x303.jpg" alt="" width="500" height="303" /></a>

2. WordPress のディレクトリー → wp-content フォルダー → plugins フォルダーの順に開きます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120004.jpg"><img class="alignnone size-large wp-image-3237" title="2010-06-01_120004" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120004-500x303.jpg" alt="" width="500" height="303" /></a>

3. プラグイン本体を plugins フォルダーにアップロードします

<strong>注意：公式サイトからダウンロードしたプラグイン本体は圧縮ファイルなので、先に解凍してからアップロードしてください。アップロードするのは 1 つのフォルダーであり、複数のフォルダー（ファイル）ではありません</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120320.jpg"><img class="alignnone size-large wp-image-3238" title="2010-06-01_120320" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120320-500x303.jpg" alt="" width="500" height="303" /></a>

4. アップロードが終わったら管理画面に入り、【外掛】（プラグイン）→【已安裝】（インストール済み）の順に進み、先ほどアップロードしたプラグインの【啟用】（有効化）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120849.jpg"><img class="alignnone size-large wp-image-3239" title="2010-06-01_120849" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120849-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>3. テーマのインストール手順 - 管理画面からのインストール</h2>
プラグインの管理画面からのインストールと同じく、素早く便利です。ただし、WordPress 公式サイトに登録されているテーマしかインストールできないという欠点があります

1. WordPress の管理画面にログインし、【外觀】（外観）→【新增佈景主題】（テーマの新規追加）の順に進みます。次に検索欄にインストールしたいテーマ名を入力し、【搜尋】（検索）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_130725.jpg"><img class="alignnone size-large wp-image-3242" title="2010-06-01_130725" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_130725-499x398.jpg" alt="" width="499" height="398" /></a>

2. 検索結果のプラグイン一覧が表示されます。インストールしたいテーマを選んで【安裝】（インストール）→【立刻安裝】（今すぐインストール）の順に押します。または、【預覽】（プレビュー）を押して、テーマの見た目を先に確認することもできます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131620.jpg"><img class="alignnone size-large wp-image-3243" title="2010-06-01_131620" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131620-500x303.jpg" alt="" width="500" height="303" /></a>

3. FTP サイトの情報を入力し、【繼續】（続行）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131809.jpg"><img class="alignnone size-large wp-image-3244" title="2010-06-01_131809" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131809-500x303.jpg" alt="" width="500" height="303" /></a>

4. テーマのインストールが終わったら、【啟用】（有効化）を押せば完了です

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132419.jpg"><img class="alignnone size-large wp-image-3245" title="2010-06-01_132419" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132419-499x398.jpg" alt="" width="499" height="398" /></a>
<h2>4. テーマのインストール手順 - FTP でのインストール</h2>
インターネットで、とても美しい WordPress テーマを見かけることがあります。ただ、そうしたテーマは公式サイトに登録されていないことがあります。そのような場合は、FTP でテーマをサイトにアップロードしてからインストールできます

1. FTP のファイル転送ソフトを開き、FTP サイトにログインして、WordPress のディレクトリー → wp-content フォルダー → themes フォルダーの順に進みます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132733.jpg"><img class="alignnone size-large wp-image-3246" title="2010-06-01_132733" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132733-500x303.jpg" alt="" width="500" height="303" /></a>

2. テーマを themes フォルダーにアップロードします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132951.jpg"><img class="alignnone size-large wp-image-3247" title="2010-06-01_132951" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132951-500x303.jpg" alt="" width="500" height="303" /></a>

下は間違った例です▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133031.jpg"><img class="alignnone size-large wp-image-3248" title="2010-06-01_133031" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133031-456x400.jpg" alt="" width="456" height="400" /></a>

3. アップロードが終わったら、【後台】（管理画面）→【外觀】（外観）→【佈景主題】（テーマ）の順に進み、先ほどアップロードしたテーマの【啟用】（有効化）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133250.jpg"><img class="alignnone size-large wp-image-3249" title="2010-06-01_133250" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133250-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>よく使われる非公式テーマの配布サイト</h2>
<ul>
	<li><a href="http://www.smashingmagazine.com/" target="_blank">Smashing Magazine</a>（英語）</li>
	<li><a href="http://www.simplethemes.net/" target="_blank">Simple Themes</a>（英語）</li>
	<li><a href="http://www.skinpress.com/">SkinPress</a>（英語）</li>
</ul>
<strong>補足：ちょうど、とても良い <a href="http://www.boxcn.net/shared/rsk3lfcr37">WordPress プラグイン設計チュートリアル</a> を見つけました。興味のある方はぜひご覧ください </strong>
