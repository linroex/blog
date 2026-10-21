---
title: "iOS Safari でウェブ・インスペクタを使う方法"
date: 2017-02-03T11:58:14
slug: "how-to-use-web-inspector-on-ios-safari"
tags: ["iOS", "Safari"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/02/螢幕快照-2017-02-04-上午12.53.17.jpg"]
draft: false
---

パソコンでフロントエンド開発をするとき、ブラウザには便利な開発者ツールが用意されていて、エラーメッセージの確認、ストレージの中身の確認、JS のステップ実行などができます。では、モバイル端末でウェブページをテストするときは、どうやってこの強力な開発者ツールを開けばよいのでしょうか。小さな画面の中に収めることなど、できるはずがありません！ この記事では、iOS デバイスの場合に、Mac に接続して Mac の Safari の開発者ツールを使い、iOS Safari で動いているウェブページを遠隔操作する方法を紹介します。これで iOS でのテストがずっと簡単になります。


<!--more-->


モバイル端末のフロントエンドテストといえば、実機でのテストのほかに、ブラウザの Device Toolbar を使う方法もあります。ただ、通常は画面解像度と User-Agent をシミュレートできるだけです。構文の互換性などをテストしたい場合は、シミュレーターか実機を使う必要があります。モバイルでのテストは重要ではないと思わないでください。当たり前のように使っている HTML5 や CSS3 の多くの機能が、モバイル端末ではサポートされていなかったり、動作が異なったりすることがあります。ドキュメントに iOS Safari が対応していると書かれていても、実際に対応しているとは限りません。ですから、念のため自分で一度テストすることをおすすめします。

iOS Safari と Mac Safari を接続するには、まずもちろんケーブルが必要です。そのうえで、iOS Safari の Web インスペクタをオンにする必要があります。iOS の設定 =&gt; Safari =&gt; 詳細 で「Web インスペクタ」を有効にしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/IMG_6640.png"><img class="alignnone wp-image-7373 size-full" src="{{< param imageBase >}}/wp-content/uploads/2017/02/IMG_6640-e1486140119554.png" width="400" height="711" /></a>

有効にしたら、iOS Safari でテストしたいウェブページを開きます。次に、Mac Safari の開発者機能を有効にします。Chrome や Firefox と違い、Mac Safari の開発者機能はデフォルトでは非表示になっています。環境設定 =&gt; 詳細 で有効にする必要があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_44_26.jpg"><img class="alignnone size-full wp-image-7374" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_44_26.jpg" alt="" width="776" height="632" /></a>

「開発」メニューにチェックを入れると、Mac Safari のメニューバーに「開発」が表示されます。「開発」をクリックすると、iOS デバイスの名前と、そのデバイスで開いているウェブページが表示されます。テストしたいページを選択すれば、開発者ツールが表示されます！

この Mac Safari の開発者ツールは、実際には iOS を遠隔操作しているため、パソコン上で iOS のウェブページの動作状況を直接確認できます。エラーメッセージを見たい場合は、そのまま出力することもできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_48_59.jpg"><img class="alignnone size-large wp-image-7375" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_48_59-1024x553.jpg" alt="" width="660" height="356" /></a>

期待どおりにクリックできる URL が表示されない場合は、次の項目を確認してください。
<ul>
 	<li>スマートフォンとパソコンは接続されていますか？</li>
 	<li>スマートフォンの画面はロックが解除されていますか？</li>
 	<li>iOS Safari は開いたままになっていますか？</li>
 	<li>この機能は iOS Safari でのみ利用できます。（ただし iOS Chrome も JS エンジンは Safari と同じなので、Safari でテストすれば十分です）</li>
</ul>
