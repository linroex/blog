---
title: "Yam Batch Download - Yam の音楽を一括取得してスマートに命名する機能"
date: 2010-07-27T22:33:05
slug: "yam-batch-download-smart-naming-2"
tags: ["Yam"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_220336.jpg"><img class="size-large wp-image-3515 aligncenter" title="2010-07-27_220336" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_220336-550x380.jpg" alt="" width="550" height="380" /></a></p>
今回ご紹介する Yam Batch Download は、私が自分で書いたプログラムです。主な機能は、Yam天空から音楽をまとめて取得し、自動で名前を付けることです。このプログラムを作ろうと思ったのは、私の音楽のほとんどが GootubeFlv というツールを使って、<a href="http://mymedia.yam.com/">Yam天空影音分享</a>から取得したものだからです。Gootubeflv はとても便利ですが、音楽をまとめて取得したい人には面倒です。「URL をコピー → GootubeFLV に貼り付け → 音楽名をコピー → ダウンロード欄に貼り付け → ダウンロード」という操作を何度も繰り返す必要があるからです。そこで、URL をプログラムに貼り付けるだけで、自動でダウンロードして名前も付けてくれる Yam Batch Download を作りました。


<!--more-->


実はもともと VC++ でこのプログラムを書くつもりでした。でも技術的な理由で……。C++ の難しさを甘く見ていました= =。同じ VS シリーズのコンパイラなので、コントロールの使い方もほぼ同じだろうと思っていたのですが、C++ のコントロールでは -> 記号を使う必要があり、しかも以前は VS で C++ のウィンドウプログラムを書いたことがなかったので、初めて書いたときは手探りで多くの時間を費やしました。結局 VB で書くことに決めました（途中では PHP で書くことも考えました^^）。
<h2>プログラム情報</h2>
<ul>
	<li>ダウンロード先：Xun6 | <a href="http://www.4shared.com/file/znNMxx7W/Yam_Batch_Download.html ">4Shared </a>| <a href="http://www.box.net/shared/6kq1r2vozp">Box.net</a></li>
	<li>公開日：7/27</li>
	<li>謝辞：<a href="http://jeremy.coder.tw/">滄海</a> と PaNtHeR</li>
</ul>
7/31 の更新情報：
<ol>
	<li>ダウンロード状況の表示機能を追加</li>
	<li>応答しなくなる不具合を修正しました</li>
	<li>プログラムには、URL が音楽か動画かを自動判定する設定がありましたが、動画のダウンロードが非常に遅い問題がありました</li>
	<li>ファイルのダウンロードに、より高速な方法を使うように変更しました</li>
</ol>
<h2>使い方</h2>
このソフトの使い方はとても簡単で、ほぼ 2 つのステップで完了します。まずファイルをダウンロードして、起動してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221718.jpg"><img class="alignnone size-large wp-image-3516" title="2010-07-27_221718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221718-550x394.jpg" alt="" width="550" height="394" /></a>

次に、音楽の URL を大きな白い入力欄に貼り付けます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221957.jpg"><img class="alignnone size-large wp-image-3517" title="2010-07-27_221957" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221957-550x343.jpg" alt="" width="550" height="343" /></a>

複数の URL をまとめて貼り付けることもできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222140.jpg"><img class="alignnone size-large wp-image-3518" title="2010-07-27_222140" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222140-550x380.jpg" alt="" width="550" height="380" /></a>

次に、音楽の保存先を設定します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222303.jpg"><img class="alignnone size-large wp-image-3519" title="2010-07-27_222303" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222303-550x381.jpg" alt="" width="550" height="381" /></a>

最後に「ダウンロード開始」を押します。ひとつ小さな問題があって、プログラムには進捗バーを付けていません（XDD。理由は面倒くさくて……）。そのため、左下隅のステータスを見る必要があります。ダウンロードが終わると、自動で「ダウンロード完了」に変わります。反応がないように見えても、フリーズしたわけではないので安心してください～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222530.jpg"><img class="alignnone size-large wp-image-3520" title="2010-07-27_222530" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222530-550x380.jpg" alt="" width="550" height="380" /></a>

ダウンロードが完了しました～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222642.jpg"><img class="alignnone size-large wp-image-3521" title="2010-07-27_222642" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222642-550x380.jpg" alt="" width="550" height="380" /></a>
