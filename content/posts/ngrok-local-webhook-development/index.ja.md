---
title: "Ngrok - デプロイ環境が不要で、ローカルでも webhook を開発できる便利ツール"
date: 2017-01-09T23:36:47
slug: "ngrok-local-webhook-development"
tags: ["Ngrok"]
categories: ["Programming"]
draft: false
---

<a href="https://ngrok.com">Ngrok</a> はバックエンド開発者にとって欠かせない道具です。localhost でウェブサイトを開発するたびに、webhook、API Callback、OAuth で頭を悩ませてきました。以前、Mandrill Webhook を開発してメールの開封や送信のイベントを受け取ったときを例にすると、テストするには Mandrill の管理画面で URL を設定しなければならないため、プログラムを書いた後にサーバーへアップロードしてからでないと結果がわかりませんでした。これは開発スピードに大きく影響します。そこで生まれたのが <a href="https://ngrok.com">Ngrok</a> です！


<!--more-->


お使いのパソコンで <a href="https://ngrok.com">Ngrok</a> を実行すると、ランダムに生成された URL が 1 つ発行されます。この URL を webhook や、リモート URL が必要なその他の場所（たとえば Facebook Messenger BOT）に設定します。その URL にリクエストが送られると、Ngrok がそのリクエストをあなたのパソコンへ転送します。仕組みはシンプルですが、とても実用的です！ Ngrok の無料プランにはいくつかの制限があります。たとえば、1 分あたりの接続は最大 40 件、1 台のパソコンで同時に開けるのは ngrok 1 つだけ、などです。詳しい制限や料金プランは<a href="https://ngrok.com/product#pricing">こちら</a>をご覧ください。私の個人的な使用経験では、無料プランでも十分すぎるほどです。ごくまれなケースを除いて、ほとんど問題に遭遇したことはありません。有料プランも妥当な価格だと思います。トラフィックは ngrok のサーバーを経由して転送されるので、その通信量もそれなりに高くつくからです。

<a href="https://ngrok.com">Ngrok</a> の核となる考え方は、転送用のサーバーを立てることです。外部からのリクエストを、指定したポートへ転送できます。この考え方を応用すると、たとえば次のようなことができます。
<ul>
 	<li>webhook をローカルで開発する（たとえば Facebook Messenger bot など）</li>
 	<li>ハッカソン終盤のデモ：サーバーを構築する時間を省き、みんなにプロダクトを触ってもらえる</li>
 	<li>モバイル端末でのテスト：以前は実機でテストするために、まずサーバーにデプロイする必要がありましたが、Ngrok があればその手順を省いて直接テストできます</li>
</ul>
<h2>Ngrok Info</h2>
<ul>
 	<li>公式サイト：<a href="https://ngrok.com">https://ngrok.com</a></li>
 	<li>ダウンロード：<a href="https://ngrok.com/download">https://ngrok.com/download</a></li>
</ul>
<h2>Usage</h2>
Mac と Linux で使えます。インストールはとても簡単で、コンパイルも不要です。ダウンロードしてすぐに使えますし、/usr/local/bin などのパスに置いておけば、後で使うときに便利です。

使うときは、Terminal でコマンドを入力します。最も基本的なコマンドは次のとおりです。
<pre>ngrok http 8080</pre>
これは、外部からのトラフィックを localhost の 8080 ポートへ転送することを意味し、http プロトコルを使う必要があります。実行すると、次の画面が表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-09-下午11.20.48.jpg"><img class="alignnone size-full wp-image-7212" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-09-下午11.20.48.jpg" alt="" width="777" height="589" /></a>

外部に提供する URL は Forwarding の URL です。SSL が必要な場合は、https で始まるもの（2 番目）を選んでください。2 つの URL の転送先は同じで、違いは SSL 暗号化を使うかどうかだけです。

Ctrl + C を押すと、転送を終了して停止できます。

HTTP Auth など、一部の機能は無料の登録が必要です。Ngrok の公式サイトにアクセスし、右上の Login をクリックして登録してください。GitHub または Google でサインインできます。ログイン後、このような画面が表示されるので、画面の指示どおりにコマンドを実行します。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/ngrok_-_secure_introspectable_tunnels_to_localhost.png"><img class="alignnone size-full wp-image-7213" src="{{< param imageBase >}}/wp-content/uploads/2017/01/ngrok_-_secure_introspectable_tunnels_to_localhost.png" alt="" width="732" height="736" /></a>

次のコマンドを実行するのを忘れないでください。ngrok に登録したことを知らせるためです！ 後ろの token は自分のものに置き換えてください。
<pre>ngrok authtoken {token}</pre>
登録すると、会員専用の機能を使えるようになります。たとえば HTTP Auth などです。
<pre>ngrok http -auth "user:passwd" 80</pre>
また、トラフィックを特定のローカルドメインへ向けたいことがあります。自分のパソコン内でも、/etc/hosts を変更すれば、ローカルに偽のドメインを持たせることができます。たとえば coder.tw は私のブログですが、開発の都合で、私の localhost には coder.dev という偽のドメインがあり、このパソコンを指すようになっています。サーバー側でも coder.dev を listen する設定になっています（Powder がまさにこのケースです）。このような場合は、次の構文を使います。
<pre>ngrok http -host-header=myapp.dev mayapp.dev:80</pre>
&nbsp;
