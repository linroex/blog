---
title: "Linux に Python を手動でインストールし、yum が動かなくなる問題を避ける方法"
date: 2011-08-19T08:00:45
slug: "linux-install-python-manually-keep-yum"
tags: ["Linux", "Python"]
categories: ["SRE"]
draft: false
---

以前、Linux 上の重要なデータを自動でバックアップして Google Storage にアップロードするプログラムを書いたことがあります。当時は Python 2.7 を使っていましたが、Linux に標準で入っている Python は 2.4 で、yum でアップグレードしても最新は 2.4 までです。そのため新しいバージョンの Python を使うには、自分でコンパイルするしかありません。以下では Python 3.2 を例に説明します。


<!--more-->


また、Linux に yum がインストールされている場合、新しい Python をインストールした後に問題が起きます。yum が使えなくなってしまうのです。以下の手順で修正できます。yum は Python 2.4 を使っているため、新しい Python を入れると動かなくなるのは当然です～

1. まず、下のページから Python のソースコードをダウンロードします。

<a href="http://www.python.org/download/releases/">http://www.python.org/download/releases/</a>

必ず拡張子が tgz のファイルをダウンロードしてください。これがソースコードです。

wget -c http://www.python.org/ftp/python/3.2.1/Python-3.2.1.tgz

次に、ダウンロードしたファイルを展開します。

tar -zxvf Python-3.2.1.tgz

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_174820.jpg"><img class="alignnone size-large wp-image-697" title="2011-08-17_174820" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_174820-540x341.jpg" alt="" width="540" height="341" /></a>

2. 展開したフォルダに移動します。

cd Python-3.2.1

続けて、次のコマンドでインストールオプションを設定し、ビルド環境を確認します。

./configure --prefix=/usr

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175427.jpg"><img class="alignnone size-large wp-image-699" title="2011-08-17_175427" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175427-540x341.jpg" alt="" width="540" height="341" /></a>

通常は多くの出力が表示されます。数行で終わってしまい、最後の 3 行が「Creating ....」ではない場合は、必要なプログラムが足りない可能性があります。通常は make と gcc です。先にそれらをインストールしてから、Python のインストールを始めてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175804.jpg"><img class="alignnone size-large wp-image-700" title="2011-08-17_175804" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175804-540x340.jpg" alt="" width="540" height="340" /></a>

3. make を実行します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175923.jpg"><img class="alignnone size-large wp-image-701" title="2011-08-17_175923" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175923-540x342.jpg" alt="" width="540" height="342" /></a>

&nbsp;

コンパイル中

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180042.jpg"><img class="alignnone size-large wp-image-703" title="2011-08-17_180042" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180042-540x340.jpg" alt="" width="540" height="340" /></a>

4. 先ほどのコマンドが終わったら、make install を実行します。これでインストールが始まります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180152.jpg"><img class="alignnone size-large wp-image-704" title="2011-08-17_180152" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180152-540x341.jpg" alt="" width="540" height="341" /></a>

&nbsp;

5. Linux に yum が入っている場合、問題が起きることがあります。まず which yum で場所を確認し、vi で開きます。

次のようなメッセージが表示されることがあります：
<blockquote>There was a problem importing one of the Python modules
required to run yum. The error leading to this problem was:
No module named yum
Please install a package which provides this module, or
verify that the module is installed correctly.
It's possible that the above module doesn't match the
current version of Python, which is:</blockquote>
ただし、この問題が起きない人もいます。yum を実行して正常に動くか確認してください。正常に動いているなら、そのままにしておいてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181409.jpg"><img class="alignnone size-large wp-image-705" title="2011-08-17_181409" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181409-540x405.jpg" alt="" width="540" height="405" /></a>

6. 1 行目の「#!/usr/bin/python」を「#!/usr/bin/python2.4」に変更すると、正常に動くようになります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181714.jpg"><img class="alignnone size-large wp-image-706" title="2011-08-17_181714" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181714-540x410.jpg" alt="" width="540" height="410" /></a>

最後になって、スクリーンショットの背景が違うことに気づきました……XD
