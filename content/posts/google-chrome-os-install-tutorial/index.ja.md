---
title: "Google Chrome OS - Google のクラウド OS（インストール手順）"
date: 2010-07-11T18:11:31
slug: "google-chrome-os-install-tutorial"
tags: ["Chrome OS"]
categories: ["Hardware"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-19_160846.jpg"><img class="alignnone size-large wp-image-3310" title="2010-06-19_160846" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-19_160846-537x400.jpg" alt="" width="537" height="400" /></a>

<strong>Google Chrome OS</strong>（以下 Chrome OS）は Google が出したオペレーティングシステムで、主にネットブック市場をターゲットにしています。Chrome OS の特徴は、非常に速い起動速度、極めて低い消費電力、そして極めて低いハードウェア要件です。Google は起動に 7 秒しかかからないと謳っています<strong>（Google によると、この 7 秒は SSD を使った場合の話です）</strong>。カーネルには Linux を採用しており、全体のインターフェースは今話題の Chrome ブラウザとほぼ同じです。


<!--more-->


<strong>Chrome OS</strong> は、ほとんどの機能をウェブ上に置いており、いわゆるクラウド技術を利用しています。そのためハードウェア性能への要求は高くなく、ハードウェア性能が控えめなネットブックにとても向いています。ただし、Chrome OS には致命的な欠点があります。インターネットに接続していなければ、まったく使えないのです。しかし、これは大きな問題ではありません。今ではブロードバンドがとても普及しているからです。また、Chrome OS は動画編集やプログラミングのような負荷の大きい作業はできません。できるのは一般的な文書編集とウェブ閲覧くらいです。とはいえ、ネットブックを買う人が、そのネットブックでプログラミングをすることもないでしょう～

多くの人は <strong>Chrome OS</strong> がまだ「噂だけで、実態はまだ」という段階だと思っています。実は、<strong>Google は昨年 11 月にはすでに Chrome OS のソースコードを公開していました</strong>。また、最近の台北国際電脳展（Computex）では、私の記憶が正しければ、Acer も <a href="http://goo.gl/B3Tr " target="_blank">Chrome OS を搭載したネットブック</a>を発売する計画だと聞いています。<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px; font-size: xx-small;">個人的には Chrome OS の将来性にかなり期待しています。最近のネットブックに Windows を入れるのは少し重すぎるので、Chrome OS こそ、ネットブックユーザーに快適でストレスのないパソコン環境を提供してくれるものだと思います。</span>

<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px; font-size: xx-small;"><a href="http://blog.chromium.org/2009/12/whats-difference-between-chromium-os.html" target="_blank">P.S. 言い忘れていたことがあります。自分でビルドしたものは本来 Chrome OS ではなく Chromium OS と呼ぶべきなのですが、「Chromium」という単語が覚えられないので、この記事では単に Chrome OS と呼んでいます xD</a></span>

<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px;">
</span>

<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="560" height="340" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/0QRO3gKj3qw&amp;hl=zh_TW&amp;fs=1&amp;" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="560" height="340" src="http://www.youtube.com/v/0QRO3gKj3qw&amp;hl=zh_TW&amp;fs=1&amp;" allowscriptaccess="always" allowfullscreen="true"></embed></object>
<h2>Chrome OS のポイント</h2>
<ol>
	<li>ネットブック向け</li>
	<li>低消費電力</li>
	<li>低いハードウェア要件</li>
	<li>クラウド中心で、ネットワークがないと使えない</li>
	<li>将来は特定のハードウェア（SSD）への搭載が求められるかもしれない</li>
	<li>起動 7 秒をうたっている（実際には 7 秒ちょうどではありませんが、それほど遠くはありません）</li>
</ol>
<h2>Chrome OS を試してみる</h2>
インストールの前に注意していただきたいのですが、すべてのパソコンで成功するわけではありません。私のパソコンでは何度も失敗しました = =

この記事で使う Chrome OS は、公式にリリースされたものではありません。Google が好きな一部のユーザーが自分でビルドして公開したものです。その中にトロイの木馬が仕込まれていると心配なら、使わなくても構いません。自分でソースコードをダウンロードしてビルドすることもできます。公式の Chrome OS はどこでダウンロードできるのかと聞かないでください。公式プロジェクトはソースコードだけを公開していて、ビルド済みの Chrome OS は提供していないからです。

1. まず <a href="http://chromeos.hexxeh.net/">http://chromeos.hexxeh.net/</a> で、非公式にビルドされた Chrome OS をダウンロードします。【Download the VMWare image】をクリックすると、ファイルのダウンロードが始まります。

P.S. 【Download the VMWare image】が見つからない場合は、ページを少しスクロールすると見つかります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_163334.jpg"><img class="alignnone size-large wp-image-3464" title="2010-07-11_163334" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_163334-550x334.jpg" alt="" width="550" height="334" /></a>

2. ダウンロードが終わるまでお待ちください。<strong>この間に仮想マシンのプログラムである</strong> <a href="http://www.virtualbox.org/wiki/Downloads"><strong>VirtualBox</strong></a> <strong>をダウンロードしてインストールしておいてください</strong>。Chrome OS を試すには、先に仮想マシンを準備しておく必要があります。

3. ダウンロードが終わったら VirtualBox を開き、【新規】→【次へ】の順にクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_164155.jpg"><img class="alignnone size-large wp-image-3466" title="2010-07-11_164155" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_164155-550x343.jpg" alt="" width="550" height="343" /></a>

4. 名前の欄に Chrome OS と入力し、オペレーティングシステムの種類を【Linux】、バージョンを【Other Linux】に選択します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174239.jpg"><img class="alignnone size-full wp-image-3467" title="2010-07-11_174239" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174239.jpg" alt="" width="549" height="372" /></a>

5. ここでは仮想マシンに割り当てるメモリの量を設定します。パソコンによって違いますね 0.0 基本的には、少なくとも 512MB は割り当ててください～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174404.jpg"><img class="alignnone size-full wp-image-3468" title="2010-07-11_174404" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174404.jpg" alt="" width="549" height="372" /></a>

6. 先ほどダウンロードした Chrome OS のファイルを解凍します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174616.jpg"><img class="alignnone size-large wp-image-3469" title="2010-07-11_174616" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174616-550x321.jpg" alt="" width="550" height="321" /></a>

<!--nextpage-->

7. VirtualBox の画面に戻り、【既存のハードディスクを使用】を選択して、フォルダーのアイコンをクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175006.jpg"><img class="alignnone size-full wp-image-3470" title="2010-07-11_175006" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175006.jpg" alt="" width="549" height="372" /></a>

8. 【追加】をクリックし、先ほどダウンロードしたファイルを選択します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175242.jpg"><img class="alignnone size-large wp-image-3471" title="2010-07-11_175242" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175242-534x400.jpg" alt="" width="534" height="400" /></a>

9. 追加したファイルを選択し、【選択】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175403.jpg"><img class="alignnone size-large wp-image-3472" title="2010-07-11_175403" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175403-512x400.jpg" alt="" width="512" height="400" /></a>

10. 【次へ】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175440.jpg"><img class="alignnone size-full wp-image-3473" title="2010-07-11_175440" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175440.jpg" alt="" width="549" height="372" /></a>

11. 【完了】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175505.jpg"><img class="alignnone size-full wp-image-3474" title="2010-07-11_175505" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175505.jpg" alt="" width="549" height="372" /></a>

12. ここまでで Chrome OS のインストールは完了です～ あとは Chrome OS のアイコンをマウスで連続してダブルクリックすれば起動します。

本当は USB から Chrome OS をインストールする方法を書くつもりでしたが、Flow の公式サイトで提供されているファイルがおかしいようで、0.0 何度やってもインストールできませんでした = =

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175718.jpg"><img class="alignnone size-large wp-image-3475" title="2010-07-11_175718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175718-536x400.jpg" alt="" width="536" height="400" /></a>

13. 使うときは、仮想マシンのプログラムがマウスを自動的につかんでしまいます。仮想マシンから通常のパソコンに戻りたいときは、キーボード右側の Ctrl キーを押してください～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175901.jpg"><img class="alignnone size-full wp-image-3476" title="2010-07-11_175901" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175901.jpg" alt="" width="390" height="267" /></a>

14. 理由は分かりませんが、私が自分でテストしたときは起動できませんでした @@

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_180726.jpg"><img class="alignnone size-large wp-image-3477" title="2010-07-11_180726" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_180726-550x361.jpg" alt="" width="550" height="361" /></a>

<strong>Chrome OS のデフォルトのログイン情報：</strong>

デフォルトのユーザー名は facepunch、デフォルトのパスワードも facepunch です。
<h2>あとがき：</h2>
個人的には、ネットブックを使っているなら、内蔵の OS を Chrome OS に置き換えてしまうのもよいと思います。消費電力が低く、ハードウェア要件も控えめで、完全にネットブックのユーザーのために設計されているからです。また、Chrome OS には、上で触れなかった特別な設計があります。シャットダウンしようとしても、シャットダウンの項目が見当たらないのです。Google のエンジニアによると、Chrome OS のシャットダウンは簡単で、ノートパソコンの電源ボタンを押せばよいそうです～ 通常の OS のように問題が起きることもないと言います。Chrome OS のデータはネットワーク上に保存されるため、一般的な OS のようにデータが壊れる心配がないからです。私も最初にこの設計を知ったときは驚きました。パソコンの授業では、電源ボタンを直接押すのは絶対にダメだと教えられてきたからです。Chrome OS があれば、今後パソコンの授業で「電源ボタンを直接押してはいけない」と言う先生がいたら、「Chrome OS の場合はどうするんですか？」と聞けばいいのです～ 私自身は、家にネットブックがなくなったので Chrome OS をあまり使っていません。ただ以前、先輩のネットブックに Chrome OS を入れて使っているのを見たことがあります。本当に便利そうでした！
