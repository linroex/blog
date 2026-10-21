---
title: "Facebook でシェアしたリンクが期待どおりに表示されない？ サイトを Facebook 向けに最適化する方法"
date: 2017-02-18T20:39:46
slug: "facebook-share-function-optimization"
tags: ["Facebook", "SEO"]
categories: ["Blog"]
draft: false
---

どのサイト運営者にとっても、Facebook はすでに Google と同じくらい重要なトラフィックの源になっていると思います。これまでは検索エンジンのために多くの SEO 最適化をしてきましたが、ご存じでしたか？ 実は Facebook も『<a href="https://developers.facebook.com/docs/sharing/best-practices">ウェブサイトとモバイルアプリのシェアのベストプラクティス</a>』というドキュメントを公開しています。これは、ユーザーがページを Facebook でシェアしたときに、最適な形で表示されるようにページを調整する方法を説明したものです。この記事では、私が個人のブログで試したことを紹介します。


<!--more-->


Facebook のタイムラインに URL を投稿すると、その投稿には自動的にタイトル、概要、テキストが表示されます。何も設定しないと、Facebook はそのページに含まれる画像を一枚選んで表示するか、テキストだけで画像のない表示になることもあります。

最良の場合：内容に合った画像があり、タイトルと概要のテキストも表示される

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.54.06.jpg"><img class="alignnone size-full wp-image-7456" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.54.06.jpg" alt="" width="520" height="685" /></a>

Facebook 向けに最適化していないと、タイトルと概要しか表示されなかったり、テキストが間違っていたり、無関係だったりすることもあります。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.57.03.jpg"><img class="alignnone size-full wp-image-7457" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.57.03.jpg" alt="" width="521" height="281" /></a>

上の二つを比べると、どちらが Facebook ユーザーの興味を引きやすいかは明らかでしょう。適切な画像と魅力的なテキストやタイトルがあれば、投稿が目を引きやすくなるのは周知のことです。最適化をしていないせいでページが Facebook で正しく表示されないのは、本当にもったいないことです。

次に、私の個人ブログ『碼人日誌』では、どのように対応しているかを紹介します。ソーシャルメディアの担当者で技術面がよく分からない方も、この記事を読んでエンジニアと相談するきっかけにしてください。

WordPress にはアイキャッチ画像の機能があり、記事ごとに一枚の画像を設定できます。私のサイトの仕組みは、この機能を前提にしています。記事にアイキャッチ画像が設定されていれば、それを Facebook のシェア用に使います。設定されていなければ、記事の一枚目の画像を使います。どちらもない場合は、記事のカテゴリのアイキャッチ画像をシェア用に使います。概要のテキストは、記事の先頭 100 文字を使っています。
<h2>基本情報</h2>
記事を Facebook でシェアすると、Facebook のクローラーがページにアクセスして、タイトル、概要、カバー画像などの情報を取得します。Open Graph Meta Tag を設定しておけば、Facebook が正しくページを取得できるようになります。設定していない場合、クローラーは独自のアルゴリズムで判断します。

このコードを修正して、HTML の head 内に追加してください。
<pre>&lt;meta property="og:title" content="碼人日誌文章標題"&gt;
&lt;meta property="og:image" content="https://example.com/hello.jpg"&gt;
&lt;meta property="og:description" content="這是一段簡介文字"&gt;</pre>
複数の画像を表示して、ユーザーが選べるようにしたい場合は、次のように og:image を複数設定できます。
<pre>&lt;meta property="og:image" content="https://example.com/hello1.jpg"&gt;
&lt;meta property="og:image" content="https://example.com/hello2.jpg"&gt;
&lt;meta property="og:image" content="https://example.com/hello3.jpg"&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/5__林熙哲_🔊.png"><img class="alignnone size-full wp-image-7460" src="{{< param imageBase >}}/wp-content/uploads/2017/02/5__林熙哲_🔊.png" alt="" width="524" height="507" /></a>

この三つの Open Graph Meta Tag のほかに、必要に応じて次のものも追加できます。<a href="https://developers.facebook.com/docs/sharing/opengraph/object-properties#standard">Open Graph の標準オブジェクトプロパティ</a>

また、Facebook for Developers で App を作成し、app_id を入力しておくことをおすすめします。これにより、Facebook の分析ツールで、記事ごとのシェア数など、より詳しい情報を確認できるようになります。
<pre>&lt;meta property="fb:app_id" content="" /&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.16.06.jpg"><img class="alignnone size-large wp-image-7459" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.16.06-1024x779.jpg" alt="" width="660" height="502" /></a>
<h2>カバー画像</h2>
最良の表示効果を得るために、og:image のカバー画像は解像度を 1200×630 より大きくし、アスペクト比を 1.91:1 に近づけることをおすすめします。せっかく用意した画像の一部が切り取られるのを防げます。

比率を正しく調整しないと、次のような残念な結果になってしまいます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午9.30.11.jpg"><img class="alignnone size-full wp-image-7471" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午9.30.11.jpg" alt="" width="484" height="389" /></a>

また、次のような制限もあります。
<ul>
 	<li>画像ファイルのサイズは 8MB を超えられない</li>
 	<li>画像の解像度は 200×200 を下回れない</li>
</ul>
よく見ると、Facebook では共有リンクのカバー画像を二通りの形式で表示しています。一つは、タイトルの上に大きな画像を表示する形式です。注目を集めやすいので、通常はこちらをおすすめしています。もう一つは、画像をタイトルの左側に配置する形式です。

画像のサイズが 600×315 より小さい場合は、左側に画像を配置する形式で表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.25.57.jpg"><img class="alignnone size-full wp-image-7461" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.25.57.jpg" alt="" width="518" height="355" /></a>

ここまで読むと、もう待ちきれずに og:image を設定したのに、Facebook でシェアしてもまだ画像が出ない、と感じているかもしれませんね。それは、最初にリンクをシェアするとき、Facebook がカバー画像をすぐにはサーバーにダウンロードしないためです。通常は、2 回目にそのリンクをシェアしたときに、カバー画像が反映されます。私は、まずリンクを投稿欄に貼って投稿はせず、ページを再読み込みしてから、もう一度貼るようにしています。通常はこれで正しく表示されます。あるいは、次の二つの Open Graph Meta Tag を追加すれば、最初のシェアから正しく表示されるようになります。

og:image:width と og:image:height を設定すると、Facebook は画像ファイルをダウンロードして計算しなくても、画像の幅と高さを直接知ることができます。これにより、最初のシェアから画像を正しく表示できます。
<pre>&lt;meta property="og:image:width" content="1024"&gt;
&lt;meta property="og:image:height" content="600"&gt;</pre>
さらに、Facebook は JS で動的に生成された Open Graph Meta Tag にも対応しています。JS で og:image の内容を変更すれば、Facebook は正しく読み取ってくれます。この性質を利用して、私は og:image:width を設定する純粋なフロントエンドのプログラムを作りました。バックエンドから追加するとなると、画像の幅と高さを両方ともデータベースに保存する必要があるからです。個人的に少し面倒くさがりなので、バックエンドのコードは変更したくなくて……
<pre>window.onload = function() {
  var img_src = document.head.querySelectorAll("[property='og:image']")[0].content;
  var img = new Image();
  img.src = img_src;

  img.onload = function() {
    var og_width_meta = document.createElement("meta");
    var og_height_meta = document.createElement("meta");

    og_width_meta.setAttribute("property", "og:image:width");
    og_width_meta.setAttribute("content", img.width);

    og_height_meta.setAttribute("property", "og:image:height"); 
    og_height_meta.setAttribute("content", img.height);

    document.getElementsByTagName("head")[0].appendChild(og_width_meta);
    document.getElementsByTagName("head")[0].appendChild(og_height_meta);
  }
}</pre>
画像を変更した場合、Facebook にキャッシュがあるため、すぐには反映されません。その場合は、Facebook が提供している<a href="https://developers.facebook.com/tools/debug/sharing/batch/">一括無効化ツール</a>を使ってキャッシュを無効にできます。
<h2>エラーチェック</h2>
すべて設定したのに、いつまでも反映されない場合は、Facebook が提供している<a href="https://developers.facebook.com/tools/debug/sharing/">エラーチェックツール</a>を使って、設定に誤りがないか確認できます。

エラーチェックツール：<a href="https://developers.facebook.com/tools/debug/sharing/">https://developers.facebook.com/tools/debug/sharing/</a>

そのURLが初めて Facebook でシェアされた場合は、このようなメッセージが表示されます。「新しい情報を取得」をクリックすればOKです。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.38.26.jpg"><img class="alignnone size-full wp-image-7462" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.38.26.jpg" alt="" width="1010" height="590" /></a>
