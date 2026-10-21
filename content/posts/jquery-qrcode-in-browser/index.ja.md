---
title: "jQuery.qrcodeでブラウザ上にQRコードを直接生成する"
date: 2011-04-08T15:42:44
slug: "jquery-qrcode-in-browser"
tags: ["jQuery", "QR Code"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-08_153812.jpg"><img class="size-large wp-image-389 aligncenter" title="2011-04-08_153812" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-08_153812-540x357.jpg" alt="" width="540" height="357" /></a>

QRコードを描画する方法はたくさんあります。自分で関数を書いて描画することもできますし、他の人が提供しているAPIを使うこともできます。たとえば、Google Chat APIを使ってQRコードを生成するのはAPIを使う方法です。一方、この記事で紹介するjquery.qrcodeは、他の人が書いた関数を使ってコードを生成します。最初はjquery.qrcodeとGoogle Chat APIの違いがよくわかりませんでした。後から、Google Chat APIはデータをGoogleのサーバーに送って生成するのに対し、jquery.qrcodeはブラウザ上で直接描画することを知りました。

<!--more-->

注意点として、jquery.qrcodeはjQueryのプラグインなので、jQueryと組み合わせて使う必要があり、ブラウザ上でのみ動作します。
<ul>
	<li><strong>jquery.qrcodeのサンプルファイル：<a href="http://www.box.net/shared/957pg237sj">Box.net</a>｜<a href="http://www.4shared.com/file/yJ2Vh5Ij/jqueryqrcode.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/jquery.qrcode.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfONjZiZDRiOWQtMjkxOS00YTY0LTllMjQtZmRkMzNhODAwMzc2&amp;hl=zh_TW">Google</a></strong></li>
	<li><strong>jquery.qrcodeのダウンロード：<strong><a href="http://www.box.net/shared/r6e2gogniq">Box.net</a>｜<a href="http://www.4shared.com/document/7KQ0ngeB/jqueryqrcodemin.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/jquery.qrcode.min.js">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMDAzZmMyZTYtMDcyOS00NmFjLWJiM2UtZTRjZWQ5ZjE4MWFj&amp;hl=zh_TW">Google</a></strong></strong></li>
</ul>
<h2>構文：</h2>
説明：https://coder.tw のQRコードを生成し、id が qr の要素の中に表示します。

使用する前に、jQueryライブラリとjquery.qrcodeライブラリを読み込んでおいてください。
<pre lang="javascript">$('#qr').qrcode('https://coder.tw/');</pre>
この例では、https://coder.tw のコードを生成したいので、.qrcode の中に https://coder.tw を入れています。linroex を含むコードを生成したい場合は、.qrcode('linroex') に変更します。
