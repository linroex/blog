---
title: "Python のモジュールインストールをもっと簡単に～ easy_install の使い方と egg ファイルのインストール方法"
date: 2011-05-01T16:50:04
slug: "python-easy-install-tutorial"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827.jpg"><img class="aligncenter" title="2011-05-01_170827" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827-540x352.jpg" alt="" width="540" height="352" /></a>

ご存じのとおり、Python は拡張性が非常に高いのが特徴です。サードパーティ製のモジュールをインストールすれば、欲しい機能を追加できます。例えば、「中国語」でプログラムを書きたい場合は zhpy というモジュールをインストールできます。ただ、こうしたモジュールのインストールは、難しくはないものの手間がかかります。ボタンを何回か押すだけで済むものもあれば、システムの設定を変更しなければならないものもあります。そこで今回は「easy_install」というプログラムを紹介します。これを使うと、Python でのモジュールのインストールがずっと簡単になります。Linux の yum に近い使い方で、一行のコマンドでモジュールをインストールできます～ さらに easy_install では、いわゆる egg 形式のパッケージもインストールできます。
<h2>
<!--more-->
easy_install の紹介</h2>
<ul>
	<li>インストール前に、パソコンに Python がインストールされている必要があります</li>
	<li>ダウンロード先：<a href="http://www.box.net/shared/fibb0r0dia">Box.net</a>｜<a href="http://www.4shared.com/file/zkrsEBgV/ez_setup.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/ez_setup.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZjYwYzY0ZWItOTVmNS00MGE4LThiMWItYzE3ZTVlMWNmNDUz&amp;hl=zh_TW">Google</a></li>
</ul>
<h2>easy_install のインストール手順</h2>
1. 先ほどダウンロードしたファイルを Python のルートディレクトリ（例：C:Python27）に移動します。

2. cmd を開き、次のコマンドを入力します：
<ul>
	<li>cd c:Python27</li>
	<li>python ez_setup.py setuptools</li>
</ul>
P.S.  c:Python27 の部分は、お使いの Python のパスに置き換えてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170026.jpg"><img class="alignnone size-large wp-image-457" title="2011-05-01_170026" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170026-540x352.jpg" alt="" width="540" height="352" /></a>

3. 赤枠で囲まれたメッセージが表示されたら、easy_install のインストールは成功です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170047.jpg"><img class="alignnone size-large wp-image-458" title="2011-05-01_170047" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170047-540x352.jpg" alt="" width="540" height="352" /></a>

4. インストールが終わったら、Python フォルダの中にある Scripts フォルダを環境変数 Path に追加してください。私の場合の例は次のとおりです：

C:Python27Scripts  ->このパスを環境変数 Path に追加します

パスは人によって異なる場合があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170507.jpg"><img class="alignnone size-full wp-image-459" title="2011-05-01_170507" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170507.jpg" alt="" width="416" height="457" /></a>
<h2>モジュールをすばやくインストールするには？</h2>
1. CMD を開き、次のコマンドを入力します：

easy_install モジュール名

これでインストールできます。egg 形式のモジュールをインストールする場合も簡単です。モジュール名の部分を、モジュールのインストールファイルの場所に置き換えるだけです。例えば、インストールファイルを c:download に保存し、ファイル名が 123.egg の場合、コマンドは次のようになります：

<strong>eazy_install c:download123.egg</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170735.jpg"><img class="alignnone size-large wp-image-460" title="2011-05-01_170735" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170735-540x352.jpg" alt="" width="540" height="352" /></a>

2. 私の画面と似た表示になっていれば、インストールは成功です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827.jpg"><img class="alignnone size-large wp-image-461" title="2011-05-01_170827" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827-540x352.jpg" alt="" width="540" height="352" /></a>
