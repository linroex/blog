---
title: "Google Chrome 7 - GPU ハードウェアアクセラレーションに対応"
date: 2010-10-24T15:30:53
slug: "google-chrome-7-gpu"
tags: ["Chrome", "Hardware Acceleration"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141649.jpg"><img class="alignnone size-full wp-image-3863" title="2010-10-24_141649" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141649.jpg" alt="" width="508" height="277" /></a>

<a href="http://www.google.com/chrome?hl=zh-TW">Google Chrome 7</a> が正式に発表されました！ Chrome 7 の目玉機能は GPU ハードウェアアクセラレーションです。この新機能に加えて、Chrome 6 のバグもいくつか修正されています。速度は<a href="http://goo.gl/7f8j">60 倍向上した</a>と言われています。ただし、Chrome 7 のハードウェアアクセラレーションはデフォルトでは有効になっておらず、特別な方法で有効にする必要があります。

GPU ハードウェアアクセラレーションには、どんなメリットがあるのでしょうか。簡単に言えば、これを有効にすると、ブラウザでのゲームの動作が大幅に速くなります。古めのパソコンでは Facebook の動作が重くなりがちですが、GPU アクセラレーションを有効にすると、その問題が起きにくくなります。ですから、ブラウジング（Facebook～）やブラウザゲームを楽しむ方には、ぜひこの機能を有効にすることをおすすめします。


<!--more-->


Chrome のダウンロードとインストールについては、<a href="http://www.google.com/chrome?hl=zh-TW">http://www.google.com/chrome?hl=zh-TW</a> をご覧ください。
<h2>Google Chrome の概要</h2>
<ul>
	<li>公式サイト：<a href="http://www.google.com/chrome">http://www.google.com/chrome</a></li>
	<li>開発元：Google</li>
	<li>ダウンロード先：<a href="http://www.google.com/chrome">公式サイトと同じ</a></li>
</ul>
<h2>GPU ハードウェアアクセラレーションの有効化方法</h2>
1. まず Chrome を Chrome 7 に更新します。次に Google Chrome のショートカット（必ずショートカットを使ってください）を右クリックして、-&gt; プロパティを選択します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141835.jpg"><img class="alignnone size-full wp-image-3864" title="2010-10-24_141835" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141835.jpg" alt="" width="293" height="460" /></a>

2. <strong>ショートカットタブの「リンク先」欄の末尾に、次のコマンドを追加してください</strong>。追加したら OK をクリックします（ここは注意して読んでください。でないと失敗するかもしれません）。

P.S. コマンドを追加するときは注意してください。<strong>「リンク先」欄に元からあるデータは削除しないでください</strong>。このコマンドは「リンク先」欄の末尾に追加し、<strong>コマンドと元のデータの間には必ず半角スペースを入れてください</strong>。
<pre>-enable-accelerated-compositing</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152132.jpg"><img class="alignnone size-full wp-image-3875" title="2010-10-24_152132" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152132.jpg" alt="" width="367" height="473" /></a>

3. 以下は、GPU ハードウェアアクセラレーションを有効にする前と後の FPS の値です。ちょうど 2 倍の差になっています！！

有効にする前：

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152549.jpg"><img class="alignnone size-large wp-image-3879" title="2010-10-24_152549" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152549-550x241.jpg" alt="" width="550" height="241" /></a>

有効にした後：

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152918.jpg"><img class="alignnone size-large wp-image-3880" title="2010-10-24_152918" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152918-550x252.jpg" alt="" width="550" height="252" /></a>
