---
title: "Code::Blocks 10.05 - Dev C++ に匹敵する C/C++ コンパイラ。クロスプラットフォーム（Ubuntu、Windows、Mac）"
date: 2011-02-11T10:42:29
slug: "codeblocks-cross-platform-c-compiler"
tags: ["C++", "IDE"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182355.jpg"><img class="alignnone size-full wp-image-191" title="2010-10-28_182355" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182355.jpg" alt="" width="440" height="217" /></a></p>
Dev C++ というコンパイラをご存じでしょうか。多くの学校では、このコンパイラを C 言語の授業の環境として使っています。たとえば台湾の高校の情報の授業でも、このコンパイラが使われているようです。ただし、ここで紹介したいのは Dev C++ ではなく、<strong><a href="http://www.codeblocks.org/">Code::Blocks</a></strong> です。Code::Blocks と Dev C++ はどちらも C 言語（C と C++）のコンパイラです。ただ、Dev C++ の動向を追っていた方なら、このところ長く更新されていないことにお気づきかもしれません。一方 <strong><a href="http://www.codeblocks.org/">Code::Blocks</a></strong> は、Dev C++ と同じく無料でオープンソースであるうえ、Windows や Linux など複数の OS に対応しています。そのため、Ubuntu で C のプログラムを書きたい場合は、このソフトを試してみるとよいでしょう。

この記事は Windows 向けのチュートリアルです。


<!--more-->


私が Code::Blocks を試した感想としては、なかなか使いやすいと思いました。Dev C++ でできることは、Code::Blocks でも一通りできます。ただ一点残念だったのは、Code::Blocks に繁体字中国語の表示がないことです。そのため使い始めるハードルがやや高くなります。プログラムを書く人は英語が得意な人が多いとはいえ（私は例外ですが XD）、やはり母語で使えるソフトのほうが慣れやすいものです。もう一つの特徴は、コードのコンパイルに使うコンパイラを自由に指定できることです。Code::Blocks 内蔵のコンパイラを使わなくてもかまいません。たとえば、Code::Blocks でコードを書きながら、コンパイルには VC++ を使いたい場合は、設定画面で直接指定できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182239.jpg"><img class="alignnone size-large wp-image-192" title="2010-10-28_182239" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182239-540x405.jpg" alt="" width="540" height="405" /></a>

<strong>Code::Blocks の情報</strong>
<ul>
	<li>公式サイト：<a href="http://www.codeblocks.org/">http://www.codeblocks.org/</a></li>
	<li>対応言語：英語...</li>
	<li>ダウンロードページ：<a href="http://www.codeblocks.org/downloads/26">http://www.codeblocks.org/downloads/26</a></li>
	<li><a href="http://www.codeblocks.org/downloads/26"></a>対応 OS：Linux、Windows（2000～7）、Mac</li>
</ul>
<h2>Code::Blocks の特徴</h2>
<ul>
	<li>3 つの OS に対応</li>
	<li>プラグインを使える</li>
	<li>継続的に更新されている（Dev C++ と違って）</li>
</ul>
<h2>Code::Blocks のインストール方法</h2>
<span style="color: #ff0000;">この記事は Windows のみを対象にしています</span>

1.まず <a href="http://www.codeblocks.org/downloads/26">Code::Blocks の公式サイト</a> からメインプログラムをダウンロードし、インストーラーを実行します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182821.jpg"><img class="alignnone size-large wp-image-193" title="2010-10-28_182821" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182821-540x293.jpg" alt="" width="540" height="293" /></a>

2.【Next】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183608.jpg"><img class="alignnone size-full wp-image-194" title="2010-10-28_183608" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183608.jpg" alt="" width="503" height="393" /></a>

3.【I Agree】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183650.jpg"><img class="alignnone size-full wp-image-195" title="2010-10-28_183650" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183650.jpg" alt="" width="503" height="393" /></a>

4.【Next】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183701.jpg"><img class="alignnone size-full wp-image-196" title="2010-10-28_183701" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183701.jpg" alt="" width="503" height="393" /></a>

5.【Install】を押すとインストールが始まります

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183837.jpg"><img class="alignnone size-full wp-image-197" title="2010-10-28_183837" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183837.jpg" alt="" width="503" height="393" /></a>
<h2>Code::Blocks の使い方――Console プロジェクトの作成</h2>
このチュートリアルでは、初心者が最もよく使う基本、つまりコンソールアプリケーションについて簡単に説明します。Code::Blocks の機能は多すぎて、すべては紹介しきれません。実際には、Code::Blocks でさまざまな種類のプログラムを開発できます。内蔵のプロジェクトテンプレートには Console のほかにも、Code::Blocks Plugins、Directx、ARM Project など多くのテンプレートがあります。慣れてきたら、ぜひ自分でいろいろ試してみてください。

1.Code::Blocks を起動し、【File】→【New】→【Project】の順に選びます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184650.jpg"><img class="alignnone size-large wp-image-198" title="2010-10-28_184650" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184650-492x540.jpg" alt="" width="492" height="540" /></a>

2.左側で【Projects】を選び、【Console Application】を選択してから【Go】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184857.jpg"><img class="alignnone size-large wp-image-199" title="2010-10-28_184857" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184857-540x404.jpg" alt="" width="540" height="404" /></a>

3.ここでは、C と C++ のどちらでプログラムを開発するかを選びます。選んだら【Next】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184939.jpg"><img class="alignnone size-large wp-image-200" title="2010-10-28_184939" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184939-540x438.jpg" alt="" width="540" height="438" /></a>

4.プロジェクトの名前と保存場所を設定します

『Project Title』はプロジェクトの名前です

『Folder to create project in』はプロジェクトの保存場所です

その下の 2 つの項目は設定しなくてかまいません

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185209.jpg"><img class="alignnone size-large wp-image-201" title="2010-10-28_185209" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185209-540x438.jpg" alt="" width="540" height="438" /></a>

5.ビルドに関する設定を行います。基本的にはデフォルトのままで問題ありません。設定が終わったら【Finish】を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185529.jpg"><img class="alignnone size-large wp-image-202" title="2010-10-28_185529" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185529-540x438.jpg" alt="" width="540" height="438" /></a>

6.【Finish】を押した後、何も表示されないと不思議に思うかもしれませんが、心配はいりません。メイン画面の左側にあるプロジェクトツリーから、先ほど作成したプロジェクトを開くことができます。その後、キーボードの【F9】を押すと、プログラムをコンパイルできます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185848.jpg"><img class="alignnone size-large wp-image-203" title="2010-10-28_185848" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185848-540x405.jpg" alt="" width="540" height="405" /></a>
