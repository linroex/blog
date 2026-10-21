---
title: "macOS - キー入力を画面に表示して録画・ライブ配信する方法"
date: 2016-12-24T01:11:49
slug: "macos-show-keystrokes-on-screen"
tags: ["macOS", "Live Streaming"]
categories: ["Hardware"]
draft: false
---

オンライン講座が人気で、講座を動画にして公開する方も多くいます。このような「パソコン操作の解説動画」を録画するときは、押したキーをどう見せるかいつも悩みます。たとえば Ctrl + C でテキストをコピーしても、視聴者は動画を見ても何をしたのか分からないことがあります。録画ソフトによっては、キー入力も一緒に記録できるものがあります。キーを押すたびに、録画の中に仮想キーボードを表示する仕組みです。ただ、録画ソフトに機能がなくても、押したキーを画面上にそのまま表示できるアプリもあります！ ライブ配信やオンライン講座のほか、実際の講義やプレゼンテーションでも非常に役立ちます。


<!--more-->


<a href="https://github.com/keycastr/keycastr">KeyCastr</a> はオープンソースのソフトウェアで、Mac OS でのみ使えます。3 か月前まで開発が続けられていて、私が個人的にテストしたところ、macOS Sierra でも問題なく動きました。<a href="https://github.com/keycastr/keycastr">KeyCastr</a> の機能はとても強力です。キーボードで押したすべてのキーを、文字キーでもコマンドキー（Shift、Command、Optional など）でも、画面に表示できます。表示位置は調整でき、コマンドキーだけを表示する設定もできます。細かい設定も多く、キーを表示しておく時間、色、大きさなども変更できます。ただ、中国語の入力を扱うときには少し変わった動きをして、入力した注音記号（ボポモフォ）をすべて表示してしまいます。これは間違いかというと……まあ間違いとも言い切れません（笑）が、私の用途には合いませんでした。Objective-C に詳しい方がいれば、ぜひ Pull Request を送ってみてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.58.21.jpg"><img class="alignnone size-large wp-image-7140" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.58.21-1024x712.jpg" alt="" width="660" height="459" /></a>

なお、KeyCastr 自体もひとつのアプリなので、別のデスクトップに切り替えると表示されません。起動したデスクトップでのみ、仮想キーボードが表示されます！
<h2>KeyCastr 情報</h2>
<ul>
 	<li>GitHub： <a href="https://github.com/keycastr/keycastr">https://github.com/keycastr/keycastr</a></li>
 	<li>ダウンロードページ： <a href="https://github.com/keycastr/keycastr/releases">https://github.com/keycastr/keycastr/releases</a></li>
</ul>
<a href="https://github.com/keycastr/keycastr">KeyCastr</a> は brew-cask でインストールできます。または、公式サイトからビルド済みのファイルを直接ダウンロードすることもできます。最新版の keycastr.app.zip をダウンロードしてください。

インストールが終わると Launchpad に KeyCastr が表示されます。ただし、起動する前に十分な権限を与えておく必要があります。そうしないと、次のようなエラーメッセージが表示されます：

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.46.33.jpg"><img class="alignnone size-full wp-image-7137" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.46.33.jpg" alt="" width="422" height="268" /></a>

システム環境設定 =&gt; セキュリティとプライバシー =&gt; アクセシビリティ の順にクリックし、KeyCastr をリストに追加してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/mac-1.gif"><img class="alignnone size-full wp-image-7138" src="{{< param imageBase >}}/wp-content/uploads/2016/12/mac-1.gif" alt="" width="664" height="538" /></a>

設定が終わったら KeyCastr を開けます。開いたら、右上の角から設定を行えます。ここでは主な設定方法をいくつか紹介します：

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.53.44.jpg"><img class="alignnone size-full wp-image-7139" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.53.44.jpg" alt="" width="383" height="449" /></a>

最初に、KeyCastr には 2 種類の表示方法があります。それぞれのスクリーンショットを載せるので見比べてください。左が Default、右が Svelte モードです。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.59.31.jpg"><img class="alignnone size-full wp-image-7141" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.59.31.jpg" alt="" width="232" height="320" /></a> <a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.00.34.jpg"><img class="alignnone size-full wp-image-7142" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.00.34.jpg" alt="" width="212" height="110" /></a>

まず Default モードとその設定から紹介します。Default モードでは、タイピングしていないときは表示されません。初期設定ではすべての文字を表示しますが（コマンドボタンだけを表示する設定もできます）、入力すると黒い枠が現れ、しばらくすると自動的に消えます。ショートカットを押した場合も表示されます。個人的には、この方式のほうが Svelte より読みやすいと感じました。Default モードでは、文字の大きさや黒い枠を表示する時間などを設定できます。文字や背景の色も変えられます。

Default モードでは、初期設定で黒い枠が左下に表示されますが、マウスでドラッグして好きな位置に動かすこともできます！

一方、Svelte モードは、キーを押しているかどうかに関係なく、ツールバーのように画面上に表示され続けます。Default モードとは逆に、初期設定では文字キー（A〜Z、0〜9 など）は表示されませんが、設定でオンにすることができます。また、Default モードのように何行にも広がらないのも良い点です。打ち込みすぎたときに、下のような状況になるのを防げます……

画面を返して！！！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.10.43.jpg"><img class="alignnone size-large wp-image-7143" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.10.43-1024x576.jpg" alt="" width="660" height="371" /></a>
