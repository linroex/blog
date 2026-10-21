---
title: "【Google API】Google Chart API で QR コードを生成する（PHP のサンプルコード付き）"
date: 2011-02-24T23:25:20
slug: "google-chart-api-qr-code-php"
tags: ["Google API", "PHP", "QR Code"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_230500.jpg"><img class="size-large wp-image-328 aligncenter" title="2011-02-24_230500" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_230500-540x396.jpg" alt="" width="540" height="396" /></a>

この記事では、Google Chart API を使って QR コードを作成する方法をご紹介します。QR コードとは、今とても人気のある二次元バーコードのことです。以前は二次元バーコードを生成するのはとても面倒でしたが、Google Chart API を使えば、URL だけで素早く QR コードを生成できます。実は、最初は Google Chart API に特化した記事を書くつもりだったのですが、分けて書くことにしました～（ちょうど <a href="http://www.dotblogs.com.tw/shadow/archive/2011/02/24/21557.aspx" target="_blank">Shadow's Tech Database</a> というサイトでこれが紹介されているのを見かけて、つい書きたくなってしまいました～）


<!--more-->

<h2>Google Chart API で QR コードを生成する形式：</h2>
https://chart.googleapis.com/chart?[パラメータ]

<strong>パラメータ：</strong>
<ul>
	<li>cht=グラフの形式。qr を指定するだけです</li>
	<li>chs=バーコードのサイズ。幅 x 高さの形式で入力します。幅と高さの間の区切りは、英字の x であることに注意してください</li>
	<li>chl=バーコードに格納するデータ</li>
	<li>choe=エンコード方式。UTF-8 を推奨します</li>
	<li>chld=誤り訂正レベル。L、M、Q、H の 4 段階があります</li>
</ul>
<strong>例：</strong>

「linroex」という文字列を含む、120*120 の QR コードを生成したいとします。

<a href="https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=linroex&amp;choe=UTF-8">https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=linroex&amp;choe=UTF-8</a>
<h2>PHP のサンプルコード：</h2>
ダウンロード先：<a href="http://www.box.net/shared/0ejo0tqyuh" target="_blank"> Box.net</a>｜<a href="http://www.4shared.com/file/3jZerRVS/google_chart_api_qrcode.html " target="_blank">4Shared</a>｜<a href="http://goo.gl/tN0Bl" target="_blank">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMmEwYTEwNDUtOTFlMS00MDRjLTk4MjgtYWFlN2IxNzRjZTFm&amp;hl=zh_TW" target="_blank">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_232301.jpg"><img class="alignnone size-large wp-image-329" title="2011-02-24_232301" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_232301-540x364.jpg" alt="" width="540" height="364" /></a>
