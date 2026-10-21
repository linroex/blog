---
title: "JSでフロントエンドのファイルアップロードを処理する：プレビュー、サイズ、寸法、形式"
date: 2017-02-09T13:44:33
slug: "js-file-upload-preview-validation"
tags: ["JavaScript", "HTML"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/02/Facebook.png"]
draft: false
---

ファイルをアップロードするときに一番嫌なのは、5分後に「ファイルが大きすぎる」「サイズが正しくない」と言われることです。アップロードの検証は通常バックエンドに任せるため、条件を満たしているかを確認するには、まずファイルをアップロードしなければなりません。特に画像は縦横比も確認する必要があります。これらすべてをバックエンドに任せきりにすると、ユーザー体験が損なわれることがあります。以前、NewTalkでプロフィール画像のアップロードを調べていたとき、これらの多くはフロントエンドで処理できることがわかりました。JSとHTML5 APIを使えば、ファイルの形式、サイズ（20MB）、寸法（100x100）をチェックできます。プレビューやフロントエンドでの画像の切り抜き・変換まで行えるのです！


<!--more-->


始める前に、次の重要な注意点をお読みください。
<ul>
 	<li>ファイルアップロードの検証を、フロントエンドだけに任せてはいけません。バックエンドでも必ず検証してください。フロントエンドでの処理は、ユーザー体験を向上させるためのものです。</li>
 	<li>一部のブラウザやスマートフォンでは、フロントエンドでのチェックに対応していない可能性があることにも注意してください。</li>
 	<li>画像の切り抜きや形式変換を、すべてフロントエンドで行うことはおすすめしません。サーバーの負荷を下げ、転送を速くできますが、ブラウザの互換性を考慮する必要があるためです。「ブラウザが対応していればフロントエンドで切り抜き、対応していなければバックエンドで処理する」という連携がおすすめです。</li>
</ul>
HTMLには <a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader">FileReader</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image">Image</a> の3つのAPIがあります。これらを使うと、アップロードの形式・寸法・サイズのチェックやプレビュー機能を実現できます。3つのAPIのブラウザ対応状況はかなり良好ですが、スマートフォンでは多少の違いがあります。詳しくは上のリンクから確認できます。
<h2>ファイルのサイズと形式のチェック</h2>
form:input でユーザーがファイルをアップロードしたら、input:file の DOM から File オブジェクトを取得して、ファイルのサイズ（バイト）と形式をチェックできます。次のサンプルを参考にしてください。

<strong>HTML</strong>
<pre>&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>$("#uploader").change(function(){
    var upploader_dom = $("#uploader")[0];

    # 単一ファイルのアップロードを想定し、先頭（0番目）のファイルをそのまま取得する
    console.log(uploader_dom.file[0].size + " KB");

    # ファイル形式は拡張子で判断する
    console.log(uploader_dom.file[0].type);
})</pre>
<h2>ファイルのプレビュー</h2>
画像以外のファイルをプレビューしたい場合や、ファイルの寸法をチェックしたい場合は、まずこちらをお読みください。

ファイルがアップロードされたら（change イベント）、FileReader オブジェクトを使ってユーザーがアップロードしたファイルを DataURL 形式で読み込み、img の src 属性に設定します。こうすれば、バックエンドサーバーを経由せず、ファイルをアップロードすることなく画像の内容をプレビューできます。

<strong>HTML</strong>
<pre>&lt;img id="preview_img" alt="empty preview"&gt;
&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>var reader = new FileReader();

reader.onload = function(e) {
    $("#preview_img").attr("src", e.target.result);
}

$("#uploader").change(function() {
    var upload_file = $("#uploader")[0].files[0];
    reader.readAsDataURL(upload_file);
})</pre>
FileReader.readAsDataURL() のほかにも、readAsText() や readAsBinaryString() などのメソッドがあるため、画像以外のファイルもプレビューできます。たとえばテキストファイルを読み込んで textarea に表示することもできます。
<h2>画像の寸法のチェック</h2>
プロフィール画像やバナーなどの画像をアップロードするときは、縦横比をチェックする必要があります。実は &lt;img&gt; というHTMLタグで、画像の幅と高さを取得できます。例えば次のようにします。
<pre>&lt;img src="https://example.com/hi.jpg"&gt;

&lt;script&gt;
    var img_dom = $("img")[0];

    console.log(img_dom.width);
    console.log(img_dom.height);
&lt;/script&gt;</pre>
img の DOM の中身は Image オブジェクトです。用途やプロパティについて詳しく知りたい場合は、<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image">MDN の Image API</a> を確認してください。

上で紹介した特性と、FileReader、File を組み合わせることで、アップロードされた画像の縦横比をチェックできます。サンプルコードは次のとおりです。

<strong>HTML</strong>
<pre>&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>var reader = new FileReader();
var img = new Image();

reader.onload = function(e) {
    img.src = e.target.result;
}

img.onload = function() {
    console.log(this.width);
    console.log(this.height);
}

$("#uploader").change(function() {
    var upload_file = $("#uploader")[0].files[0];
   reader.readAsDataURL(upload_file);
})</pre>
