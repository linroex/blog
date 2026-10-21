---
title: "【jQuery】Lazyload - 画像の遅延読み込み"
date: 2011-04-27T19:15:30
slug: "jquery-lazyload"
tags: ["jQuery", "JavaScript"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-27_191427.jpg"><img class="size-large wp-image-429 aligncenter" title="2011-04-27_191427" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-27_191427-540x481.jpg" alt="" width="540" height="481" /></a>

写真系のサイトには一般的に多くの画像が掲載されています。訪問者がそうしたサイトを開くと、たくさんの写真を読み込むため、表示まで時間がかかります。これはサイトのホストのトラフィックに大きく影響するうえ、訪問者側のCPU Timeも大きく増えてしまいます。ここでは、画像の読み込みを遅らせるjQueryプラグイン「Lazyload」を紹介します。つまり、サイトにアクセスしたときにすべての画像を一度に読み込むのではなく、一部だけを読み込みます。ブラウザのスクロールバーを動かすと「今見ている範囲の画像」を読み込むので、ページの表示速度が速くなるのです。

<!--more-->

<h2>Lazyloadの情報：</h2>
<ul>
	<li>jQueryと併用する必要があります</li>
	<li>ブラウザでJavaScriptを有効にしておく必要があります</li>
	<li>サンプルファイル：<a href="http://www.box.net/shared/auskrk0640">Box.net</a>｜<a href="http://www.4shared.com/file/UkViYDhu/lazyload_demo.html">4Shared</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMTM2NjUyMjUtMzU2Ny00Yzk1LWEyMjgtMDUxNjRmNjA5MjQ5&amp;hl=zh_TW">Google </a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/lazyload_demo.zip">Dropbox</a></li>
</ul>
<strong>lazyload.jsをダウンロードしたい方は、サンプルファイルをダウンロードしてください。中にlazyload.jsが入っています～</strong>
<h2>よく使う構文：</h2>
1. lazyload機能を読み込む：
<pre lang="javascript">$("img").lazyload();</pre>
2. 遅延読み込みの時間を設定する
<pre lang="javascript">$("img").lazyload({ threshold : 200 });
//200を遅延値（ミリ秒）に変更してください</pre>
3. 画像が読み込まれる前に表示する背景画像を設定する
<pre lang="javascript">$("img").lazyload({ placeholder : "圖片路徑" });</pre>
複数のパラメータを同時に使うには、カンマで区切ります。たとえば、遅延読み込みと背景画像を同時に使う場合は次のようになります。
<pre lang="javascript">$("img").lazyload({ placeholder : "img/grey.gif",threshold:200 });</pre>
