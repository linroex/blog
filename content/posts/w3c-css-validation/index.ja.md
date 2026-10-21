---
title: "W3Cバリデーション：サイトのCSSが標準に準拠しているかを確認する"
date: 2009-09-06T13:36:56
slug: "w3c-css-validation"
tags: ["CSS", "HTML"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-000.jpg"><img class="alignnone size-full wp-image-1873" title="2009-09-06 000" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-000.jpg" alt="2009-09-06 000" width="405" height="84" /></a>
<h2>W3Cについて：</h2>
W3C は、ウェブの標準化に取り組む団体です。W3C は、ウェブに関するさまざまな仕様を策定しています。例えば、標準の CSS4 や XHTML は、W3C が策定したものです。なぜこうした仕様が必要なのでしょうか？ 理由はシンプルです。ウェブページは異なるブラウザで表示されます。もしブラウザごとに使える構文が違っていたら、ウェブデザイナーはとても大変です。しかし、すべてのブラウザメーカーに一つの標準で合意させるのは困難でした。おそらく主な理由は、メーカー同士が競争しているからでしょう。そこで、公正な第三者である W3C が生まれ、標準を策定し、IE、Opera、Firefox などの各ブラウザメーカーは、その基本的な構文に従わなければならなくなりました。もちろん、各ブラウザが独自の構文を追加することもできなくはありません。とはいえ、すべてのブラウザが W3C の仕様に従っているわけではありません。IE のような大手は従っていないため、多くのウェブデザイナーは IE に対して愛憎入り混じった感情を抱いてきました（愛は多くの人が使っているから、憎しみはルールを守らないから）。ここまで読んで、W3C についてある程度ご理解いただけたと思います。では、ウェブページが標準に準拠しているかを確認する方法を紹介しましょう。


<!--more-->


<h2>CSS の標準について：</h2>
サイトが標準に準拠しているかを確認すると、どんなメリットがあるのでしょうか？ 次のリストをご覧ください〜
<ol>
	<li>表示上のエラーが減る</li>
	<li>閲覧速度が上がる</li>
	<li>かわいいシールがもらえる XD</li>
</ol>
その中で最も重要なのは1番目です。シールがもらえることなんて、大したことではありません！ さて、サイトの CSS が標準に準拠しているかどうかは、どうやって確認すればよいのでしょうか？ この部分は W3C がすでに用意してくれています〜〜〜

サイトのURL：　<a href="http://jigsaw.w3.org/css-validator/">http://jigsaw.w3.org/css-validator/</a>
<h2>ページを直接チェックする</h2>
この方法は、私が最も速いと思うものです。URL を渡すだけでよく、他の方法のように CSS ファイルをアップロードする必要はありません。ウェブデザインを始めたばかりの方には、この方法をおすすめします。また、この記事ではこのチェック方法だけを紹介します。その他の方法は、ぜひご自身で試してみてください。分からないことがあれば、コメントで質問してください。

1.まず <a href="http://jigsaw.w3.org/css-validator/">css-validator</a> のサイトにアクセスし、Address の欄にチェックしたいサイトの URL を入力します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-002.jpg"><img class="alignnone size-full wp-image-1875" title="2009-09-06 002" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-002.jpg" alt="2009-09-06 002" width="550" height="214" /></a>

2.More Options をクリックし、Profile でチェックしたい CSS のバージョンを選びます。例えば、このブログは CSS level 3 です。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-003.jpg"><img class="alignnone size-full wp-image-1876" title="2009-09-06 003" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-003.jpg" alt="2009-09-06 003" width="550" height="263" /></a>

3.すべての設定が終わったら Check をクリックします。すると、ページ内の CSS ファイルが標準に準拠しているかのチェックが始まります。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-004.jpg"><img class="alignnone size-full wp-image-1877" title="2009-09-06 004" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-004.jpg" alt="2009-09-06 004" width="550" height="303" /></a>

少し待つと新しいページが表示されます。このページでは、明らかなエラーと、可能性のあるエラー（Warnings）が示されます。ページが英語なので、翻訳を添えておきますね〜

Sorry! We found the following errors (4)：かっこ内はエラーの数です

Warnings (107)：これは可能性のあるエラーを指します。どう説明すればよいか分かりませんが、そのまま訳せば「警告」です

主な翻訳は、だいたいこのような感じです。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-005.jpg"><img class="alignnone size-full wp-image-1878" title="2009-09-06 005" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-005.jpg" alt="2009-09-06 005" width="600" height="377" /></a>

↑↑↑レポートが読めない場合は、Google 翻訳の結果を参考にしてください。

また、サイトが合格していれば、そのことも教えてくれます。ただ、私のサイトは合格しなかったので、合格画面のスクリーンショットは撮れませんでした@@ 私のサイトが不合格だったからです。でも、合格すれば、少なくとも私と同じ画面にはならないと思いますXD

エラーが多くても、あまり落ち込まないでくださいね！！

Google のようなサイトでもエラーは1つありますし、Yahoo のサイトには3つのエラーがあります。エラーが多すぎなければ大丈夫です。もちろん、エラーがゼロなのが一番です。そうすればシールがもらえますから^^

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-008.jpg"><img class="alignnone size-full wp-image-1880" title="2009-09-06 008" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-008.jpg" alt="2009-09-06 008" width="550" height="161" /></a>
