---
title: "【Python】Python インタプリタのインストール方法"
date: 2011-02-18T22:01:26
slug: "python-interpreter-install-tutorial"
tags: ["Python", "IDE"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_214318.jpg"><img class="size-full wp-image-274 aligncenter" title="2011-02-15_214318" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_214318.jpg" alt="" width="511" height="297" /></a></p>
最近 Google Storage で遊んでいたので、長らく眠らせていた Python の本を取り出して読んでみました。Google Code のドキュメントも参考にしながら、自動バックアップの小さなプログラムを書きました。まだ簡単なものなので今は公開しませんが、このプログラムを書いてみて、Python はかなり簡単なプログラミング言語だと実感しました。習得のしやすさや厳密さでは VB と同じくらいですが、冗長さでは Python のほうが VB より優れています（VB のほうが冗長だという意味です XD）。たとえば VB の条件文は if.....then.......end if と書く必要がありますが、Python なら if....: だけで始められます。また Python ではインデントがとても重要です。インデントが正しくないとプログラムは実行できません。インタプリタがインデントを使って、条件分岐やループなどの構造がどこで終わるかを判断しているためです。個人的には、初心者の方に Python をおすすめします。とてもきれいなコードが書けるようになりますよ～


<!--more-->
ただ、先ほど述べたように Python は VB と同じくらい緩い言語で、率直に言えば VB よりもさらに緩いくらいです……。変数や型を強制的に宣言する必要がないからです。VB6 も宣言を強制していませんでしたが、VB.Net では強制されるようになりました XD。とはいえ、厳密ではないのに多くの大企業が開発に使っています。たとえば Google には Python で開発されたプログラムが多くありますし、GAE（Google App Engine）も開発には Python か Java が必要です。ですから、弱いなどと思ってはいけません！！ また、TIOBE の統計によると、Python はすでに使用者数で 4 位の言語となり、PHP を追い抜きました。しかも成長率もかなり高いです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_213901.jpg"><img class="alignnone size-large wp-image-273" title="2011-02-15_213901" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_213901-526x540.jpg" alt="" width="526" height="540" /></a>

ところで、現在の Python の最新版は Python 3 で、Python 3k や Python 3000 と呼ぶ人もいます。ただ、インターネット上では Python 2.x のコードのほうがよく見られます。たとえば GAE は Python 2.x で開発されています。Python 3.x と 2.x の違いはかなり大きいので、Python を学ぶ前にどちらを学ぶか決めておいたほうがよいです。2 つのバージョンを一度に学ぶのはやめましょう。
<h2>Python の情報：</h2>
<ul>
	<li>公式サイト：<a href="http://www.python.org/">http://www.python.org</a></li>
	<li>インタプリタのダウンロードページ：<a href="http://www.python.org/getit/">http://www.python.org/getit/</a></li>
</ul>
<h2>Python の特徴：</h2>
<ul>
	<li>インデントで反復処理や条件分岐の終わりを判断する</li>
	<li>C、Java、.NET と組み合わせて開発でき、市場で最もよく使われている実装は CPython である</li>
	<li>変数や型を宣言する必要がない</li>
	<li>文法がシンプル</li>
</ul>
<h2>Python のインストール</h2>
以下では Python 3.0 を例に説明します。Python 2.x のインストール方法も似たようなものです。また、Linux に Python をインストールする場合は yum を使わないでください。私の経験では、yum に入っている Python のバージョンはとても古く、2.4 くらいだったと思います....

1. まず Python のダウンロードページにアクセスし、インストーラーをダウンロードします。公式サイトでは Windows、Mac、Linux など複数の OS 向けのインタプリタが提供されていますが、ここでは Windows でのインストール方法のみ紹介します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222223.jpg"><img class="alignnone size-large wp-image-297" title="2011-02-18_222223" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222223-540x396.jpg" alt="" width="540" height="396" /></a>

2. インストーラーを実行します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222536.jpg"><img class="alignnone size-large wp-image-298" title="2011-02-18_222536" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222536-540x399.jpg" alt="" width="540" height="399" /></a>

3. このコンピューターのすべてのユーザー向けに Python をインストールするか、自分のユーザーだけに入れるかを尋ねられます。家族みんなで同じパソコンを使っていて、家族に自分がどのプログラムを使っているか知られたくない場合は、【Install just for me】→【Next】を選択してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222827.jpg"><img class="alignnone size-full wp-image-299" title="2011-02-18_222827" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222827.jpg" alt="" width="499" height="428" /></a>

4. Python をインストールする場所を設定します。デフォルトのままにしておくことをおすすめします。また、インストール先のパスを控えておいてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223025.jpg"><img class="alignnone size-full wp-image-300" title="2011-02-18_223025" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223025.jpg" alt="" width="499" height="428" /></a>

5. そのまま【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223359.jpg"><img class="alignnone size-full wp-image-301" title="2011-02-18_223359" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223359.jpg" alt="" width="499" height="428" /></a>

6. インストール中です。しばらくお待ちください～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223440.jpg"><img class="alignnone size-full wp-image-302" title="2011-02-18_223440" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223440.jpg" alt="" width="499" height="428" /></a>

7. インストール完了です～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223521.jpg"><img class="alignnone size-full wp-image-303" title="2011-02-18_223521" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223521.jpg" alt="" width="499" height="428" /></a>

8. 先ほど Python をインストールしたフォルダーに移動します。手順 4 で控えておいたパスです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224154.jpg"><img class="alignnone size-large wp-image-306" title="2011-02-18_224154" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224154-540x399.jpg" alt="" width="540" height="399" /></a>

9. 【python.exe】を実行すると、プログラムを書き始められます～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224319.jpg"><img class="alignnone size-large wp-image-307" title="2011-02-18_224319" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224319-540x307.jpg" alt="" width="540" height="307" /></a>
