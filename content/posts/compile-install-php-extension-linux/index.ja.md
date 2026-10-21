---
title: "PHP 拡張機能を手動でコンパイル・インストールする（Linux）"
date: 2012-01-26T16:53:57
slug: "compile-install-php-extension-linux"
tags: ["PHP", "Linux"]
categories: ["SRE"]
draft: false
---

PHP に拡張機能をインストールするにはどうすればよいでしょうか。多くの人は Pecl を使うと答えるでしょう。確かに Pecl は拡張機能を簡単にインストールできる、とても便利な方法です。しかし、サーバーに Pecl がない場合はどうすればよいでしょうか。また、何らかの理由で Pecl をインストールできない場合はどうでしょう。そのときは、手動でコンパイルしてインストールするしかありません～ この記事では、Linux で PHP 拡張機能を手動でコンパイルする方法を紹介します。


<!--more-->


上で触れた「Pecl をインストールできない」状況は、本当に起こるのでしょうか。私の場合は、パッケージ型の環境でサイトを運用しているため、この問題に遭遇しました。少し前、MongoDB の PHP ドライバーをインストールする必要がありました。しかし、サーバーには LNMP のお手軽パッケージが入っていて、Pecl は含まれていませんでした。手動で Pecl をインストールすると、もともと LNMP に入っていたプログラムの一部が上書きされてしまいます。そこで、拡張機能を手動でコンパイルすることにしたのです～～
<h2>PHP 拡張機能を手動でコンパイルする手順</h2>
1.PHP 拡張機能を自分でコンパイルするには、まず当然ながらソースコードを取得する必要があります～

個人的には、Pecl の公式サイト（<a href="http://pecl.php.net/">http://pecl.php.net</a>）から PHP 拡張機能のソースコードをダウンロードすることをおすすめします。ここでは MongoDB ドライバーを例に説明します
<blockquote>wget -c http://pecl.php.net/get/mongo-1.2.7.tgz

tar -zxf mongo-1.2.7.tgz

cd mongo-1.2.7</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163751.jpg"><img class="aligncenter size-large wp-image-826" title="2012-01-26_163751" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163751-540x382.jpg" alt="" width="540" height="382" /></a>

2.phpize を実行して初期化します
<blockquote>phpize</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163941.jpg"><img class="aligncenter size-large wp-image-827" title="2012-01-26_163941" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163941-540x382.jpg" alt="" width="540" height="382" /></a>

3.configure の設定を行います。$PATH は php-config の場所です。デフォルトでは、PHP のルートディレクトリにある bin フォルダの中にあります
<blockquote>./configure --with-php-config=$PATH</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164501.jpg"><img class="aligncenter size-large wp-image-828" title="2012-01-26_164501" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164501-540x382.jpg" alt="" width="540" height="382" /></a>

4.いよいよコンパイルです～ コマンド：
<blockquote>make &amp;&amp; make install</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164638.jpg"><img class="aligncenter size-large wp-image-829" title="2012-01-26_164638" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164638-540x382.jpg" alt="" width="540" height="382" /></a>

5.コンパイルが完了すると、mongo.so ファイルは自動的に PHP の拡張機能のフォルダに保存されます

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164741.jpg"><img class="aligncenter size-large wp-image-830" title="2012-01-26_164741" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164741-540x382.jpg" alt="" width="540" height="382" /></a>

6.php.ini を編集し、次の一行を追加します：
<blockquote>vi php.ini

extension="mongo.so"</blockquote>
mongo.so の部分は、インストールした拡張機能の .so ファイル名に置き換えてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165033.jpg"><img class="aligncenter size-large wp-image-831" title="2012-01-26_165033" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165033-540x319.jpg" alt="" width="540" height="319" /></a>

7.最後に apache を再起動し、phpinfo() のファイルを確認すると、インストールが成功したかどうかがわかります～

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165248.jpg"><img class="aligncenter size-large wp-image-832" title="2012-01-26_165248" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165248-529x540.jpg" alt="" width="529" height="540" /></a>

参考記事：<a href="http://mattiasgeniar.be/2008/09/14/how-to-compile-and-install-php-extensions-from-source/" target="_blank">http://mattiasgeniar.be/2008/09/14/how-to-compile-and-install-php-extensions-from-source/</a>
