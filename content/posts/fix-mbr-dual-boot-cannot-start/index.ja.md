---
title: "二重起動の後に起動しなくなった？MBR を修復しましょう~"
date: 2010-09-11T22:19:31
slug: "fix-mbr-dual-boot-cannot-start"
tags: ["Windows"]
categories: ["Hardware"]
draft: false
---

最近 Ubuntu で遊んでいたときに、ある事態に遭遇しました。Ubuntu をインストールしているハードディスクを手動でフォーマットすると、パソコンがオペレーティングシステムに入れなくなるのです。これはシステムの MBR ファイルが壊れたことが原因です。Ubuntu を直接フォーマットしたときだけでなく、二重起動（デュアルブート）の環境を作ったときにも同じことが起きる場合があります。そのような場合でも慌てないでください。MBR ファイルは修復できますし、手順もそれほど難しくありません。まず Windows のインストールディスクを用意し、パソコンがディスクから起動するように設定します....
<!--more-->

<blockquote>MBR についての解説は、次を参照してください：<a href="http://goo.gl/iiPV ">ウィキペディア</a>

<strong>マスターブートレコード</strong>（Master Boot Record、略称：MBR）は、<strong>マスターブートセクタ</strong>とも呼ばれ、<a title="コンピュータ" href="http://zh.wikipedia.org/zh-tw/%E8%AE%A1%E7%AE%97%E6%9C%BA">コンピュータ</a>が起動した後に<a title="ハードディスク" href="http://zh.wikipedia.org/zh-tw/%E7%A1%AC%E7%9B%98">ハードディスク</a>にアクセスする際、最初に読み込まなければならないセクタです。ディスク上での 3 次元のアドレスは（シリンダ、ヘッド、セクタ）＝（0, 0, 1）です。

ハードディスクでは、1 セクタのバイト数は 128×2<sup>n</sup>（n=0,1,2,3）のいずれかになります。多くの場合 n=2 で、1 セクタは 512 バイトです。MBR にはハードディスク自体の基本情報や、各パーティションのサイズと位置の情報が記録されており、データにアクセスするための重要な入口です。これが壊れると、ディスクの基本的なデータ構造の情報が失われ、元のデータに再びアクセスできるようになるまで、試行錯誤しながら面倒な手順でデータ構造を再構築する必要があります。MBR の情報は FDISK で書き込まれたもので、<a title="低レベルフォーマット" href="http://zh.wikipedia.org/zh-tw/%E4%BD%8E%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96">低レベルフォーマット</a>の産物であり、オペレーティングシステムとは直接の関係はありません（オペレーティングシステムは<a title="高レベルフォーマット" href="http://zh.wikipedia.org/zh-tw/%E9%AB%98%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96">高レベルフォーマット</a>で作られたパーティションの上に構築され、特定のファイルシステムと結びついています）。</blockquote>
<h2>事前に準備するもの：</h2>
<ol>
	<li>Windows のインストールディスク</li>
</ol>
<strong>そして、パソコンがディスクから起動するように設定してください</strong>
<h2>MBR 修復の手順</h2>
1. Windows のインストールディスクをパソコンに入れ、インストール画面を読み込ませます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101227.jpg"><img class="alignnone size-large wp-image-3757" title="2010-09-11_101227" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101227-483x400.jpg" alt="" width="483" height="400" /></a>

2. Windows のインストール開始画面で R キーを押し、回復コンソールを開きます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101350.jpg"><img class="alignnone size-large wp-image-3758" title="2010-09-11_101350" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101350-550x387.jpg" alt="" width="550" height="387" /></a>

3. 次のコマンドを入力します：

chkdsk c: /r

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101448.jpg"><img class="alignnone size-large wp-image-3759" title="2010-09-11_101448" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101448-550x387.jpg" alt="" width="550" height="387" /></a>

このコマンドはハードディスクにエラーがないかを調べるもので、しばらく時間がかかります。「c:」の部分は、OS をインストールしているハードディスクのドライブ文字に変更してください。chkdsk コマンドが終わったら、次のコマンドを入力します：

fixmbr

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101701.jpg"><img class="alignnone size-large wp-image-3760" title="2010-09-11_101701" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101701-504x400.jpg" alt="" width="504" height="400" /></a>

このコマンドは MBR ファイルを自動で修復してくれます。修復が終われば、おそらく問題は解決しているはずです。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101822.jpg"><img class="alignnone size-large wp-image-3761" title="2010-09-11_101822" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101822-504x400.jpg" alt="" width="504" height="400" /></a>

関連情報は、こちらで確認できます：<a href="http://support.microsoft.com/kb/314058/zh-tw">http://support.microsoft.com/kb/314058/zh-tw</a>
