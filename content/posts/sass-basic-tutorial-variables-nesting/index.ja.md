---
title: "SASS の基本的な使い方：変数、関数、継承、ネスト"
date: 2012-02-07T23:14:55
slug: "sass-basic-tutorial-variables-nesting"
tags: ["SASS", "CSS"]
categories: ["Programming"]
draft: false
---

前回の記事<a href="https://coder.tw/?p=859" target="_blank">《CSS が変数と関数に出会うと SASS になる～ SASS のインストール手順》</a>では、SASS のインストール方法を紹介しました。今回は SASS の使い方を説明します。この記事では、SASS の4つの特徴、変数（Variables）、関数（Mixin）、継承（extend）、ネスト（Nesting）を取り上げます。


<!--more-->


4つの特徴を紹介する前に、まず SASS のコンパイル方法を説明します。SASS には、手動コンパイルと監視コンパイル（--watch）の2つの方法があります。手動コンパイルは、CSS を書き終えたときにコマンドを実行してコンパイルする方法です。監視コンパイルは、フォルダを指定しておくと、そのフォルダ内の *.scss ファイルが変更（追加、上書きなど）されたときに自動でコンパイルする方法です。個人的には監視コンパイルがおすすめです。便利なので XD、ここでは監視コンパイルだけを紹介します…ㄎ
<h2>SASS のコンパイル</h2>
scss フォルダと css フォルダを作成します。
<blockquote>mkdir scss css</blockquote>
次に、scss フォルダの中に「style.scss」というファイルを作成します。SASS という名前ですが、拡張子は scss である点に注意してください。
<blockquote>cd scss

touch style.scss</blockquote>
style.scss の内容として、次のサンプルコードを入力してください：
<pre lang="css">$text:15px;
body{
	font-size:$text;
}</pre>
1つ上の階層に戻ると、コンパイルを始められます～
<blockquote>cd ..

sass --watch scss:css</blockquote>
sass --watch scss:css は、scss フォルダを監視し、コンパイル結果を css フォルダに保存するという意味です。プログラムを終了するまで、scss フォルダの監視を続けます。

<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_221457.jpg"><img class="aligncenter size-large wp-image-876" title="2012-02-07_221457" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_221457-540x493.jpg" alt="" width="540" height="493" /></a>
<h2>変数（Variables）</h2>
変数は、使う前に宣言して値を指定しておく必要があります。そうすると、CSS の中で変数を直接使えるようになります。

また、SASS では変数名の先頭を必ず $ にする必要があることにも注意してください。
<pre lang="css">$text:15px;

body{
	font-size:$text;
}
#top{
	width:$text;
}</pre>
上のコードは、15px を格納した $text という変数を宣言しています。そして font-size で $text 変数を直接使っています。

コンパイル結果：
<pre lang="css">body{
	font-size:15px;
}
#top{
	width:15px;
}</pre>
$text の値は、変数を使った箇所に代入されます。

これが変数の使い方です。さらに、演算子と組み合わせると、加減乗除の計算もできます。例えば：
<pre lang="css">$width:500px;

#content{
	width:$width;
	height:$width*2;
	font-size:$width/10;
}</pre>
コンパイル後の結果：
<pre lang="css">#content{
	width:500px;
	height:1000px;
	font-size:50px;
}</pre>
<h2>関数（Mixin）</h2>
SASS には関数があり、値を渡すこともできます。これは非常に優れた仕組みで、同じような CSS を何度も書く手間が省けます。

まず関数を宣言し、その後で呼び出します。次の例を参照してください：
<pre lang="css">@mixin border-radius($angle){
	border-radius:$angle;
	-webkit-border-radius:$angle;
	-moz-border-radius:$angle;
}</pre>
上の構文は、border-radius という名前の関数を宣言しています。@mixin は関数を宣言するためのキーワード、border-radius は関数名、その後の $angle は渡される引数です。複数の引数を渡す場合はカンマで区切ります。その下の3行が関数の中身です。<strong>関数の宣言は CSS の一番上に置くことをおすすめします</strong>。

border-radius 関数を使うには @include が必要です。構文は次のとおりです：

@include mixin_name(args);
<ul>
	<li>mixin_name の部分は、関数名に置き換えます</li>
	<li>args は関連する引数です</li>
</ul>
<pre lang="css">#box{
	@include border-radius(10px);
}</pre>
コンパイル後の結果は次のようになります：
<pre lang="css">#box{
	border-radius:10px;
	-moz-border-radius:10px;
	-webkit-border-radius:10px;
}</pre>
また、Mixin には CSS のプロパティ（font-size、border、text-align など）だけでなく、CSS のブロック全体を入れることもできます。例えば：
<pre lang="css">@mixin border-radius($angle){
	#box{
		border-radius:10px;
		-moz-border-radius:10px;
		-webkit-border-radius:10px;
	}
}

@include border-radius(10px);</pre>
コンパイル後の結果は次のとおりです：
<pre lang="css">#box {
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px; }</pre>
box{} のブロック全体が渡されていることに注意してください。これが、プロパティだけでなく CSS 全体を渡せると説明した理由です。
<h2>継承（Extend）</h2>
SASS の継承は、オブジェクト指向プログラミングの継承によく似ています。指定した CSS の定義のプロパティを引き継ぐことができます。例えば：
<pre lang="css">.ext{
	font-size:10px;
	width:400px;
}
body{
	@extend .ext;
	height:600px;
}</pre>
コンパイル後：
<pre lang="css">.ext, body {
  font-size: 10px;
  width: 400px; }

body {
  height: 600px; }</pre>
body は .ext のプロパティ設定を「継承」しています。これは Mixin に少し似ていますが、同じではありません。Mixin は値を渡すことができ、CSS のブロック全体を関数の中身として使えます。一方、@extend では、指定した要素のプロパティを取得して自分自身に適用することしかできません。上の例では、.ext のプロパティを取得して body に適用しています。

構文はおおよそ「@extend name」です。

name の部分には、継承したい要素の名前を入れます。
<h2>ネスト（Nesting）</h2>
ネストを使うと CSS の可読性が上がりますが、慣れるまでには少し時間がかかります。

例（SASS 公式サイトから引用）：
<pre lang="css">table.hl {
  margin: 2em 0;
  td.ln {
    text-align: right;
  }
}

li {
  font: {
    family: serif;
    weight: bold;
    size: 1.2em;
  }
}</pre>
コンパイル後：
<pre lang="css">table.hl {
  margin: 2em 0;
}
table.hl td.ln {
  text-align: right;
}

li {
  font-family: serif;
  font-weight: bold;
  font-size: 1.2em;
}</pre>
よく見ると、上の階層の要素を直接「継承」しているのが分かります。例えば、コンパイル前の table.hl{} の中にある td.ln{} は、コンパイル後に table.hl td.ln{} になります。コンパイル後は table.hl td.ln となり、カンマ区切りの table.hl,td.ln ではなく、スペースで区切られている点に注意してください。この2つはまったく別のものです。

table.hl td.ln は、table.hl の中にある td.ln という意味です。一方、table.hl,td.ln は、table.hl と td.ln の両方の要素に同じプロパティを適用するという意味です。2つは別物なので注意してください！！

また、
<pre lang="css">li {
  font: {
    family: serif;
    weight: bold;
    size: 1.2em;
  }
}</pre>
この部分は次のようになります
<pre lang="css">li {
  font-family: serif;
  font-weight: bold;
  font-size: 1.2em;
}</pre>
つまり、font の下の family、weight、size は、それぞれ font-family、font-weight、font-size を意味します。言い換えると：
<pre lang="css">body{
	text:{
		align:center;
		indent:10px;
		transform:none;
	}
}</pre>
は次のようになります：
<pre lang="css">body {
  text-align: center;
  text-indent: 10px;
  text-transform: none; }</pre>
おおよそこういう意味です。プログラミングを学んだことがない方は、この部分を自分で理解してみてください！
