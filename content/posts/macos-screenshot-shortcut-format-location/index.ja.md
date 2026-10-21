---
title: "macOS のスクリーンショットのショートカット、ファイル形式、保存先の設定"
date: 2017-01-01T10:00:26
slug: "macos-screenshot-shortcut-format-location"
tags: ["macOS", "Screenshots"]
categories: ["Hardware"]
draft: false
---

私が Mac を使っている理由のひとつは、スクリーンショットや画像編集など、便利な機能が標準で入っていることです。Windows にも同じような機能はありますが、正直なところあまり役に立たないので、結局いろいろなアプリをインストールすることになります。今回は、Mac OS にはすでにとても強力なスクリーンショット機能が標準で入っていることを紹介します！ 撮影後の保存先やファイル形式なども設定できるのです！


<!--more-->


Mac OS では、目的に応じて次の 2 種類のショートカットを使えます：
<ul>
 	<li>全画面： Command + Shift + 3</li>
 	<li>範囲指定： Command + Shift + 4</li>
</ul>
特定のウィンドウを直接撮影したい場合は、次のショートカットを使います（範囲指定のあとにスペースキーを押します）：
<ul>
 	<li>Command + Shift + 4 を押して十字が出たらスペースキーを押すと、カメラのアイコンに変わります</li>
</ul>
ウィンドウを撮影するときは、範囲指定ではなく、ウィンドウのスクリーンショットを使うことをおすすめします。ウィンドウのスクリーンショットには、きれいな影が付くからです！ 次の画像をご覧ください。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.55.48.jpg"><img class="alignnone size-full wp-image-7175" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.55.48.jpg" alt="" width="344" height="432" /></a>

ただ、影が気になる場合は、ウィンドウを撮影するときに option キーを押しながら操作することもできます。つまり、Command + Shift + 4 + Space を押したあとに、option (Alt) キーを押しながらウィンドウをクリックします。これで、影のないウィンドウだけを撮影できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午12.09.19.jpg"><img class="alignnone size-full wp-image-7181" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午12.09.19.jpg" alt="" width="668" height="598" /></a>

初期設定では、写真はデスクトップに保存されます。私のように、デスクトップにファイルがたくさんあるのが好きではない場合は、ターミナルで次のコマンドを入力すると、初期の保存先を変更できます（末尾のパスは必ず変更してください）：
<pre>defaults write com.apple.screencapture location <b>/users/screenhosts</b></pre>
ファイルとして保存せず、Windows のように直接クリップボードに入れたい場合は、スクリーンショットを撮るときに Ctrl キーを押します。こうすると保存されず、画像を使いたい場所にそのまま貼り付けられます。

初期設定の形式は PNG です。JPEG 形式で保存したい場合は、同じようにターミナルで次のコマンドを入力します：
<pre> defaults write com.apple.screencapture type jpg</pre>
現在サポートされているファイル形式は、PNG、JPG、PDF、TIFF です。
