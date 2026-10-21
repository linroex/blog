---
title: "WordPress インストール手順 － 世界で最も使われているブログ構築ソフト（この手順は WordPress 2.9 以前のバージョン向けです）"
date: 2010-05-31T11:02:53
slug: "wordpress-installation-tutorial"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/wordpress-logo-stacked-rgb.png"><img class="alignnone size-full wp-image-3200" title="wordpress-logo-stacked-rgb" src="{{< param imageBase >}}/wp-content/uploads/2010/05/wordpress-logo-stacked-rgb.png" alt="" width="350" height="217" /></a>

<del datetime="2010-05-29T07:06:50+00:00">「君は僕の愛がどれほど深いか知りたい？ 愛は何割なのかって？」</del>（間違えました〜）　私が思う、今いちばん使いやすいブログ構築ソフトは何かって？ 私は迷わず WordPress だと答えます。自分のブログが WordPress で作られているからそう言うのではありません。逐風者（このブログ）を立ち上げるソフトを選んだとき、Xoops のようなソフトにプラグインを組み合わせてブログを作ることも検討しました。その後、学校で使われているブログ構築ソフトの LifeType も試しましたが、どちらもあまり使いやすくはありませんでした。特に LifeType はインターフェースが本当に扱いにくく、人にやさしくない設計だと感じました。英語の先生が、返信の見方や記事の書き方を何度も私に聞きに来るほどでした……。さらに、LifeType は拡張性も WordPress ほど良くありません。というわけで、やはり WordPress が一番です^^ 信じられなければ、ぜひインストールして試してみてください〜〜


<!--more-->


注：WordPress を設置する前に、インターネットについて少なくともある程度の知識があることをおすすめします。WordPress はシンプルで直感的なことを重視していますが、それでもある程度の基礎がないと、うまく設定できません

WordPress を設置する前に、まずサイトを置くためのスペースを用意してください。レンタルサーバー（仮想ホスト）を購入するか、無料のホスティングを使うこともできます。自分でサーバーを立てることもできますが、上級者でない限りおすすめしません。どの種類のサーバーを使うにせよ、PHP、MySQL、Apache に対応している必要があります。基本的にどのレンタルサーバーもこの 3 つに対応していますが、だまされないように注意してください
<h2>WordPress の特徴</h2>
<ul>
	<li>拡張性が高く、無料のプラグインがたくさんあります</li>
	<li>無料・有料あわせて多くのテーマ（theme）があります</li>
	<li>WordPress 本体やプラグイン、テーマのインストールはとても簡単です</li>
	<li>BSP（無名・痞客幫などの台湾のブログサービス）と比べて、自由度が高いです</li>
</ul>
<h2>WordPress の情報</h2>
<ul>
	<li>公式サイト： <a href="http://wordpress.org/">http://wordpress.org/</a></li>
	<li>中国語版サイト： <a href="http://tw.wordpress.org/">http://tw.wordpress.org/</a></li>
	<li>本体＋繁体字中国語の言語パック（2.9.2 版）のダウンロード先： <a href="http://tw.wordpress.org/wordpress-2.9.2-zh_TW.zip">公式</a> |  <a href="http://www.4shared.com/file/mpVUzgmI/wordpress-292-zh_TW.html ">4Shared</a> | <a href="http://www.box.net/shared/xpfi7btf9a">Box.net</a></li>
</ul>
<h2>WordPress インストール手順</h2>
1. まずレンタルサーバー（仮想ホスト）を用意し、管理画面に入ります。アカウントとパスワードを入力して【Login】を押してください

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_095949.jpg"><img class="alignnone size-large wp-image-3211" title="2010-05-31_095949" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_095949-500x303.jpg" alt="" width="500" height="303" /></a>

2. 【MySQL Databases】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100415.jpg"><img class="alignnone size-large wp-image-3212" title="2010-05-31_100415" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100415-500x303.jpg" alt="" width="500" height="303" /></a>

3. 【Create a NEW database::】の欄にデータベース名を入力し、【Create database】を押して新しいデータベースを作成します

<span style="color: #ff0000;"><strong>P.S. レンタルサーバーによっては、データベースのアカウントとパスワードを自分で設定できるものと、あらかじめ決められているものがあります。どちらなのかは、レンタルサーバーを申し込んだときに届いたメールの内容で確認してください。私のところは、あらかじめ決められているタイプでした</strong></span>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100911.jpg"><img class="alignnone size-large wp-image-3213" title="2010-05-31_100911" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100911-500x303.jpg" alt="" width="500" height="303" /></a>

4. データベースを作成したら、FTP ソフトを開き（FTP ソフトがない場合は、オンライン版の <a href="http://www.net2ftp.com/">net2ftp</a> でもかまいません）、WordPress のファイルをアップロードします

<span style="color: #ff0000;"><strong>P.S. レンタルサーバーの FTP にログインすると、「htdocs」というフォルダーがあることがあります。そのフォルダーがあれば、WordPress の本体をすべてそのフォルダーにアップロードしてください。なければ、ルートディレクトリーに直接アップロードすれば OK です</strong></span>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_102025.jpg"><img class="alignnone size-large wp-image-3214" title="2010-05-31_102025" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_102025-500x303.jpg" alt="" width="500" height="303" /></a>

5. アップロードが終わったら、ブラウザー（Chrome、IE、Firefox など）でサイトの URL を入力し、【Create a Configuration File】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104056.jpg"><img class="alignnone size-large wp-image-3217" title="2010-05-31_104056" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104056-500x303.jpg" alt="" width="500" height="303" /></a>

6. 【開始】（スタート）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104240.jpg"><img class="alignnone size-large wp-image-3218" title="2010-05-31_104240" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104240-500x303.jpg" alt="" width="500" height="303" /></a>

7. データベースの情報を入力します。テーブル接頭辞（資料庫前綴）とホストアドレスは『基本的に』変更せず、初期値のままで構いません。設定が終わったら【送出】（送信）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104706.jpg"><img class="alignnone size-large wp-image-3220" title="2010-05-31_104706" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104706-500x303.jpg" alt="" width="500" height="303" /></a>

【送出】（送信）を押したあとに下の画面が表示された場合は、データベースの情報が間違っていることを意味します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104811.jpg"><img class="alignnone size-large wp-image-3221" title="2010-05-31_104811" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104811-500x303.jpg" alt="" width="500" height="303" /></a>

8. ブログのサイト名と自分のメールアドレスを入力し、【安裝WordPress】（WordPress をインストール）を押せば完了です

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105104.jpg"><img class="alignnone size-large wp-image-3222" title="2010-05-31_105104" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105104-500x303.jpg" alt="" width="500" height="303" /></a>

9. ここでログイン用のアカウントとパスワードが表示されます。パスワードはシステムがランダムに生成したものです。【登入】（ログイン）を押し、あとで管理画面から変更してください

<strong><span style="color: #ff0000;">P.S. WordPress 3.0 からは、ユーザーがアカウントとパスワードを自分で設定できるようになりました</span></strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105338.jpg"><img class="alignnone size-large wp-image-3223" title="2010-05-31_105338" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105338-500x303.jpg" alt="" width="500" height="303" /></a>

10. アカウントと、先ほどシステムが生成したパスワードを入力します。パスワードの変更方法は後ほど説明します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105450.jpg"><img class="alignnone size-large wp-image-3224" title="2010-05-31_105450" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105450-500x303.jpg" alt="" width="500" height="303" /></a>

11. 【帳號】（アカウント）→【個人資訊】（プロフィール）の順にクリックし、【個人履歷】（プロフィール欄）の【新密碼】（新しいパスワード）の欄に、希望するパスワードを入力します。設定が終わったら【更新個人資訊】（プロフィールを更新）を押してください

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105844.jpg"><img class="alignnone size-large wp-image-3225" title="2010-05-31_105844" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105844-500x303.jpg" alt="" width="500" height="303" /></a>

完了です〜〜 今後、WordPress のテーマとプラグインのインストール手順も書く予定です。わからないところがあれば、コメントで質問してください
