---
title: "Visual Studio 2010 - .NET Famework 4 による開発、より充実した並列化演算、自動化された UI テスト"
date: 2010-12-13T17:56:39
slug: "visual-studio-2010-net-framework-4-2"
tags: ["Visual Studio", ".NET"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_224908.jpg"><img class="size-large wp-image-4164 aligncenter" title="2010-12-10_224908" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_224908-520x314.jpg" alt="" width="520" height="314" /></a></p>
2010 年 5 月に発売された Visual Studio 2010 を、私は数日前まで一度も使ったことがありませんでした。Windows 7 に Visual Studio をインストールしようとしたとき、手元のインストールディスクが 32 ビット版で、インストールできなかったのです。そこで Visual Studio 2010 Express をダウンロードして使うことにしました。当初は Visual Studio 2010 と Visual Studio 2008 にそれほど違いはないと思っていましたが、インストールしてみて考えが間違っていたと分かりました。コンパイルされた実行ファイルの性能が大きく違うのです。Visual Studio 2010 のコントロールはすべて .NET Famework 4 で作られているため、実行速度が速くなっています。また、Visual Studio 2010 では多くの機能が追加（強化）されました。たとえば、異種プラットフォーム開発の管理、DataTips、並列演算などです。


<!--more-->


Visual Studio 2010 の新機能の中で、私が一番気に入っているのは並列演算ライブラリと DataTips です。以前は並列処理のプログラムを作るのが非常に面倒で、多くの時間がかかっていました。しかし Visual Studio 2010 では、内蔵のライブラリをそのまま使って並列処理の機能を作れます。また、強化された DataTips によって、デバッグ中に各変数の値を簡単に確認できるようになりました。このバージョンの VS はチーム開発に強いとも聞いています。ただ、私はその方面を勉強していないので、ソフトウェアのライフサイクルやプロセス管理がどのようなものか、よく分かっていません。コードのバージョン管理の利点だけは、なんとなく分かっています。以前はバグのあるコードをよく書いてしまい、その問題を探すのに長い時間がかかっていたからです。

また、.NET Famework 4 はまだあまり普及していないため、VS2010 にはマルチターゲット（Multi-Targeting Support）機能も含まれています。これを使うと、別のバージョンの .NET Famework を対象にしてアプリケーションをビルドできます。そのため、.NET Famework 4 がインストールされていないパソコンでプログラムが開けないという心配もありません。
<h2>Visual Studio 2010 の情報：</h2>
<ul>
	<li>公式サイト：<a href="http://www.microsoft.com/visualstudio/zh-tw">http://www.microsoft.com/visualstudio/zh-tw</a></li>
	<li>ポスターのダウンロード：<a href="http://msdownload.longsun.net/visualstudio/NET_Framework_4_Poster.pdf">.NET Famework 4 のポスター</a> ｜ <a href="http://msdownload.longsun.net/visualstudio/Visual_Studio_2010_Shortcuts.zip">VS2010 ショートカットのポスター</a></li>
	<li>メインプログラム（Express）のダウンロード：<a href="http://www.microsoft.com/express/Downloads/">http://www.microsoft.com/express/Downloads/</a></li>
	<li>公式ドキュメント：<a href="http://goo.gl/70KoB">http://goo.gl/70KoB</a></li>
</ul>
Web 版のインストーラーを直接ダウンロードするのがおすすめです。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184023.jpg"><img class="alignnone size-large wp-image-4142" title="2010-12-10_184023" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184023-520x315.jpg" alt="" width="520" height="315" /></a>
<h2>Visual Studio 2010 の特徴：</h2>
<ol>
	<li>強化されたデバッグ機能（DataTips）</li>
	<li>異種プラットフォーム開発の管理（Team Explorer Everywhere）</li>
	<li>並列演算ライブラリを内蔵</li>
	<li>充実したソフトウェアのライフサイクルとプロセス管理（これもよく分かっていませんが、チーム開発で使われるものだとは大まかに理解しています）</li>
	<li>コードのバージョン管理機能</li>
	<li>自動化された UI テスト</li>
	<li>Multi-Targeting Support</li>
</ol>
コンパイルに使う .NET Famework のバージョンを設定する ▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_225321.jpg"><img class="alignnone size-large wp-image-4165" title="2010-12-10_225321" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_225321-520x420.jpg" alt="" width="520" height="420" /></a>
<h2>Visual Studio 2010 のインストール</h2>
ここでは Visual Basic 2010 の Web インストーラーを使って手順を説明します。ほかの言語の Web インストーラーも、インストールの方法はほぼ同じです。

1. まず、先ほどダウンロードしたインストーラーを開きます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_183854.jpg"><img class="alignnone size-large wp-image-4143" title="2010-12-10_183854" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_183854-520x356.jpg" alt="" width="520" height="356" /></a>

2. インストールに必要なコンポーネントを読み込みます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184139.jpg"><img class="alignnone size-full wp-image-4144" title="2010-12-10_184139" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184139.jpg" alt="" width="292" height="123" /></a>

3. 次へ をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184234.jpg"><img class="alignnone size-full wp-image-4145" title="2010-12-10_184234" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184234.jpg" alt="" width="516" height="465" /></a>

4. 「使用許諾契約書に同意します」を選択し、次へ をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184333.jpg"><img class="alignnone size-full wp-image-4146" title="2010-12-10_184333" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184333.jpg" alt="" width="506" height="454" /></a>

5. コンパイラー本体以外にインストールするプログラムを選びます。データベースのプログラムを作るなら、Microsoft SQL Server を選んでください。Silverlight は、そのまま入れておいてください。いずれ使うことになりますし、Silverlight のファイルは小さいので時間もかかりません。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184408.jpg"><img class="alignnone size-full wp-image-4147" title="2010-12-10_184408" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184408.jpg" alt="" width="506" height="454" /></a>

6. インストール先を指定する画面です。通常は既定値のまま次へ をクリックします。この画面では、インストールされるプログラムの一覧も表示されるので、確認できます。問題なければ インストール をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184618.jpg"><img class="alignnone size-full wp-image-4148" title="2010-12-10_184618" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184618.jpg" alt="" width="506" height="454" /></a>

7. この段階まで来たら、席を立っても大丈夫です。ダウンロードとインストールはすべてシステムが自動で行います。ただし、かなり時間がかかります……。特に回線が遅い場合は、先に寝てしまってもいいでしょう xD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184727.jpg"><img class="alignnone size-full wp-image-4149" title="2010-12-10_184727" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184727.jpg" alt="" width="506" height="454" /></a>
