---
title: "CSS が変数と関数に出会うと SASS になる～ SASS のインストール手順"
date: 2012-02-07T21:31:00
slug: "sass-install-tutorial-variables-functions"
tags: ["SASS", "CSS"]
categories: ["Programming"]
draft: false
---

プログラムと CSS の両方を書く人なら、CSS にも変数や関数のような、プログラミング言語にある機能があればいいのに、と思ったことがあるでしょう。CSS には繰り返しの多い記述が多いので、変数や関数があれば、CSS を書くスピードがずっと速くなるはずです。一般的には、そんな夢は実現できないと思われてきました…… でも今日は、SASS という新しいおもちゃを紹介します。SASS を使えば、CSS がずいぶん違ったものになりますよ～


<!--more-->


SASS は Ruby で書かれたプログラムです。最大の特徴は、CSS を書くときに変数や関数を使えることです。SASS はコンパイルという方式で動きます。CSS を書き終えたら SASS にコンパイルを任せると、SASS がコンパイル済みの CSS ファイルを生成します。この仕組みによって、CSS の中で変数を設定できるようになります。この仕組みは少し難しく感じるかもしれませんが、分からなければ気にしなくても大丈夫です XD 使えれば十分です！
<h2>SASS の情報</h2>
<ul>
	<li>公式サイト：<a href="http://sass-lang.com/">http://sass-lang.com/</a></li>
	<li>ドキュメント：<a href="http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html">http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html</a></li>
</ul>
また、SASS の文法には2種類あることに注意してください。1つは scss、もう1つは sass です。sass 文法は波括弧を使わず、Python のようにインデントで波括弧の役割を果たします。scss 文法は通常の CSS と同じように波括弧を使います。この2つはきちんと区別してください。私の解説では scss を中心に紹介するので、間違えないようにしてください XD

SASS には変数や関数以外にも多くの機能がありますが、私個人はあまり使いません。SASS では演算子も使えるので、加減乗除の計算もできます。詳しい機能については <a href="http://sass-lang.com/tutorial.html">http://sass-lang.com/tutorial.html</a> を参照してください。また、SASS を使う利点としてデバッグのしやすさがあります。先ほど説明したように、SASS はコンパイル時に CSS の文法エラーを検出します。例えばセミコロンの書き忘れがあれば、エラーを表示し、何行目かも教えてくれます！！ ただ残念なことに、文法エラーを自動で修正してはくれません。例えば font-size を font-siae と書き間違えても、SASS は反応しません。

CSS で変数を使う利点は何でしょうか。もっとも多いのは、背景画像や文字サイズなどを設定するときです。多くのブロックで同じ文字サイズを設定する必要がある場合、例えば：
<pre lang="css">#top{
	font-size:15px;
	background:red;
}
#main{
	font-size:15px;
}</pre>
SASS を使うと、上のような CSS は次のように書けます：
<pre lang="css">$font_s:15px;
#top{
	font-size:$font_s;
	background:red;
}
#main{
	font-size:$font_s;
}</pre>
これが変数の使い方です。関数については、私が最もよく使うのは、ブラウザごとの互換性への対応です。現在の CSS3 の多くの機能は、Firefox、Chrome、IE 9 などでも使えるのですが、ブラウザごとに構文が違います。SASS の mixin（関数）を使うと、この問題をとても簡単に扱えます：
<pre lang="css">#box{
	border-radius:5px;
	moz-border-radius:5px;
	webkit-border-radius:5px;
}</pre>
SASS を使うと、構文は次のように書けます：
<pre lang="css">@mixin border-radius($x){
	border-radius:$x;
	moz-border-radius:$x;
	webkit-border-radius:$x;
}
#box{
	@include border-radius(5px);
}</pre>
「これだと短くならないのでは？」と思うかもしれません。それは、ここでの例が完全ではないからです。実際には、角丸はよく使われます。DIV ごとに角丸を指定するたびに、3行も書くのでしょうか？ mixin を使えば、1行書くだけで完全な border-radius が使えます。この方法は、ほかの多くの場面でも使えます。ぜひ自分で考えてみてください XD
<h2>SASS のインストール手順</h2>
SASS は Ruby で書かれているので、SASS を使う前に Ruby と Gem をインストールしておく必要があります。Windows の場合は RubyInstaller を使えば簡単です。インストーラは Ruby の公式サイト（<a href="http://www.ruby-lang.org/zh_TW/downloads/">http://www.ruby-lang.org/zh_TW/downloads/</a>）で見つけられます。

Linux の場合は、以下の手順に従って Ruby、gem、SASS の順にインストールしてください。ここではソースからコンパイルしてインストールします。apt-get でインストールすると問題が起きることがあるためです。

1. Ruby のソースコードをダウンロードして展開する
<ul>
	<li>wget ftp://ftp.ruby-lang.org//pub/ruby/1.9/ruby-1.9.2-p0.tar.gz</li>
	<li>tar -zxvf ruby-1.9.2-p0.tar.gz</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211242.jpg"><img class="aligncenter size-large wp-image-861" title="2012-02-07_211242" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211242-540x466.jpg" alt="" width="540" height="466" /></a>

2. 展開したら、そのフォルダに移動して設定を行う
<blockquote>cd ruby-1.9.2-p0

./configure</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211558.jpg"><img class="aligncenter size-large wp-image-862" title="2012-02-07_211558" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211558-540x466.jpg" alt="" width="540" height="466" /></a>

3. コンパイルしてインストールする
<blockquote>make &amp;&amp; make install</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211904.jpg"><img class="aligncenter size-large wp-image-863" title="2012-02-07_211904" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211904-540x466.jpg" alt="" width="540" height="466" /></a>

4. Ruby 全体のコンパイルが終わったら、SASS をインストールします。ここでは、Ruby のパッケージ管理システムである gem を使って SASS をインストールします。

まず、次のコマンドでシステムをアップグレードします。
<blockquote>gem update --system</blockquote>
次に SASS をインストールします。
<blockquote>gem install sass</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_212707.jpg"><img class="aligncenter size-large wp-image-864" title="2012-02-07_212707" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_212707-540x493.jpg" alt="" width="540" height="493" /></a>

ここまでで SASS のインストールは完了です。次のコマンドで、インストールされたバージョンを確認できます。
<blockquote>ruby -v

gem -v

sass -v</blockquote>
SASS の詳しい使い方は、次回の記事で紹介します～

<a href="https://coder.tw/?p=874">https://coder.tw/?p=874</a>
