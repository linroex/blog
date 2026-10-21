---
title: "Sikuli Script - 画像でプログラムを書ける、書きやすいプログラミング言語"
date: 2010-02-05T11:28:04
slug: "sikuli-script-visual-programming"
tags: ["Sikuli"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/02/set-ip.png"><img class="size-large wp-image-2616 aligncenter" title="set-ip" src="{{< param imageBase >}}/wp-content/uploads/2010/02/set-ip-399x400.png" alt="" width="399" height="400" /></a></p>
<strong><a href="http://sikuli.org/">SIKULI</a></strong>とは何でしょうか。オンラインゲームの補助プログラム（いわゆるチート）を使ったことがある人なら、有名なマクロツール「按鍵精靈」を知っているでしょう。キーボードやマウスの操作を自動化するツールです。<strong>Sikuli Script</strong> は、その按鍵精靈にとてもよく似ています（ただし、チートではありません）。Sikuli Script を使うと、とても簡単にプログラムを作ることができます。今の多くのプログラミング言語は完全にテキストベースのコードですが、Sikuli Script は違います。そのコードは画像なのです。<strong>Sikuli Script</strong> の作者は、こんなに創造的なアイデアを思いつくなんて本当に天才だと思います。とはいえ、これだけではピンとこない方も多いでしょう（画像でプログラムを書くって、どういうこと……？）。では、一緒に <strong>Sikuli Script</strong> のプログラムを作ってみましょう！


<!--more-->


今のところ <strong>Sikuli Script</strong> は、主にスクリプトを書くために使われています。たとえば、ゲームやインスタントメッセンジャー（IM）への自動ログインといった自動化の用途です。<strong>Sikuli Script</strong> はまだ登場して日が浅いため、機能は十分に整っていません。ただ、if 文やループといった基本的な機能はすでにサポートされているので、それなりに完成したプログラムを書くことはできます。<span style="color: #ff0000;"><strong>また、Sikuli Script をさらに研究したいなら、プログラミング言語の <a href="http://www.python.org/">Python</a> を学んでみるとよいでしょう。</strong></span>公式サイトによると、Sikuli Script は Python で開発されているからです。<a href="http://www.python.org/">Python</a> のループや条件分岐の使い方は、<strong>Sikuli Script</strong> とほとんど同じです。
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="425" height="344" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/FxDOlhysFcM&amp;hl=zh_TW&amp;fs=1&amp;" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="425" height="344" src="http://www.youtube.com/v/FxDOlhysFcM&amp;hl=zh_TW&amp;fs=1&amp;" allowscriptaccess="always" allowfullscreen="true"></embed></object>
<h2></h2>
<div style="width: 100%;">
<div style="display: block; float: right; margin: 0px; padding: 4px 0px 0px 0px;"><a style="font-size: 11px; margin: 0px; font-family: verdana; text-decoration: none; padding: 0px;" title="あなたのファンバッジを作成" href="http://www.facebook.com/facebook-widgets/fanbadges.php" target="_TOP"><span style="color: #ffffff;">あなたのファンバッジを作成</span></a></div>
</div>
<!-- Facebook Fan Badge END -->
<h2>Sikuli Script の情報：</h2>
<ul>
	<li>公式サイト：<a href="http://sikuli.org/">http://sikuli.org/</a></li>
	<li>作者のブログ：<a href="http://blog.vgod.tw/">http://blog.vgod.tw/</a></li>
	<li>ダウンロード：<a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-win-20100201.exe">Windows版</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-osx-10.5-20100201.zip">Mac 10.5版</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-osx-10.6-20100201.zip">Mac 10.6版</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-linux-20100201.zip">Linux版</a></li>
	<li>チュートリアル：<a href="http://goo.gl/PV6D">http://goo.gl/PV6D</a></li>
	<li>動作条件：どのオペレーティングシステムでも使えますが、<a href="http://www.java.com/getjava">JRE6+</a> のインストールが必要です。また、この言語は現在 x86 の CPU でのみ動作します。</li>
	<li>個人のダウンロード先（Windows版）：Xun6 | <a href="http://www.4shared.com/file/225758699/56cc4834/Sikuli-IDE-win-20100201.html">4Shared</a> | <a href="http://www.box.net/shared/s2m59klvxm">Box.net</a></li>
	<li>ウイルススキャンのレポート：<a href="http://www.virustotal.com/analisis/c212eaa8228269471391a0efb7000cca43856cf932cc7d1a796332ec3cf2b27a-1265271782">VirusTotal</a></li>
	<li>MD5：9b8cd09164195cdafb295f3a06953095</li>
</ul>
<span style="font-size: x-large;"><span><strong>
</strong></span></span><strong>SIKULI のインストール：</strong>

P.S. この記事はすべて Windows XP を例に説明します。

1. まず、公式の <a href="http://sikuli.csail.mit.edu/">SIKULI</a> サイトからインストーラーをダウンロードします。そのうえで、パソコンに JRE がインストールされていることを確認し、SIKULI のインストーラーを開きます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101215.png"><img class="alignnone size-large wp-image-2617" title="2010-02-05_101215" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101215-500x375.png" alt="" width="500" height="375" /></a>

2. 【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101559.png"><img class="alignnone size-large wp-image-2618" title="2010-02-05_101559" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101559-500x400.png" alt="" width="500" height="400" /></a>

3. SIKULI のインストール先を設定し、【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101653.png"><img class="alignnone size-large wp-image-2619" title="2010-02-05_101653" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101653-500x400.png" alt="" width="500" height="400" /></a>

設定したフォルダーにインストールしてよいかの確認が表示されるので、【確定】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101743.png"><img class="alignnone size-full wp-image-2620" title="2010-02-05_101743" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101743.png" alt="" width="268" height="122" /></a>

4. 【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101959.png"><img class="alignnone size-large wp-image-2621" title="2010-02-05_101959" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101959-500x400.png" alt="" width="500" height="400" /></a>

5. インストールが始まります。上下二本のバーがどちらも完了したら、【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102112.png"><img class="alignnone size-large wp-image-2622" title="2010-02-05_102112" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102112-500x400.png" alt="" width="500" height="400" /></a>

6. そのまま【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102152.png"><img class="alignnone size-large wp-image-2623" title="2010-02-05_102152" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102152-500x400.png" alt="" width="500" height="400" /></a>

7. 完了です

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102219.png"><img class="alignnone size-large wp-image-2624" title="2010-02-05_102219" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102219-500x400.png" alt="" width="500" height="400" /></a>
<!--nextpage-->
<h2>SIKULI で簡単な小さなプログラムを書く</h2>
ここでは、SIKULI を使ってインスタントメッセンジャーに自動ログインする小さなプログラムを書きます。手順どおりに進めてください。

1. SIKULI のメインプログラムを開き、【File】→【New】の順にクリックして新しいプロジェクトを作成します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104351.png"><img class="alignnone size-full wp-image-2630" title="2010-02-05_104351" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104351.png" alt="" width="478" height="518" /></a>

2. インスタントメッセンジャーのメインプログラムを開きますが、まだログインしないでください（最小化もしないでください）

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104210.png"><img class="alignnone size-full wp-image-2629" title="2010-02-05_104210" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104210.png" alt="" width="251" height="511" /></a>

3. コード欄に click() と入力し、カーソルを（）の中に置きます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110524.png"><img class="alignnone size-large wp-image-2631" title="2010-02-05_110524" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110524-447x400.png" alt="" width="447" height="400" /></a>

4. SIKULI プログラムの左上にあるカメラボタンをクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_103320.png"><img class="alignnone size-large wp-image-2626" title="2010-02-05_103320" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_103320-500x370.png" alt="" width="500" height="370" /></a>

5. マウスをドラッグして枠を描き、インスタントメッセンジャーのアカウント入力欄を囲みます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110856.png"><img class="alignnone size-large wp-image-2632" title="2010-02-05_110856" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110856-500x375.png" alt="" width="500" height="375" /></a>

6. 自動的にコード編集欄に戻るので、改行してから type("你的帳號t你的密碼") と入力します

例：type("linroext12345689")

この手順では、プログラムがアカウントを入力し、自動的に改行してからパスワードを入力するようになります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111737.png"><img class="alignnone size-large wp-image-2636" title="2010-02-05_111737" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111737-447x400.png" alt="" width="447" height="400" /></a>

7. 同じく改行して click() と入力し、カーソルを（）の中に置いたままカメラボタンをクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111420.png"><img class="alignnone size-large wp-image-2634" title="2010-02-05_111420" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111420-447x400.png" alt="" width="447" height="400" /></a>

8. 同じくマウスをドラッグして枠を描き、ログインボタンを囲みます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111557.png"><img class="alignnone size-large wp-image-2635" title="2010-02-05_111557" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111557-500x375.png" alt="" width="500" height="375" /></a>

9. これでほぼ完成です。コードが私のものと同じか確認してください。同じであれば、先にインスタントメッセンジャーのプログラムを開き、緑色の三角ボタンをクリックすると実行されます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_1119571.png"><img class="alignnone size-full wp-image-2638" title="2010-02-05_111957" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_1119571.png" alt="" width="622" height="672" /></a>

10. 書き終わったら、プログラムを保存できます。ただし、私が試したかぎりでは、現時点では exe ファイルとして保存できず、プロジェクトファイルとしてしか保存できません。使うときは SIKULI のメインプログラムを開いて実行します。将来は exe ファイルとして保存できるようになるとよいと思います。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_112436.png"><img class="alignnone size-full wp-image-2639" title="2010-02-05_112436" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_112436.png" alt="" width="597" height="534" /></a>
<h2>SIKULI 使用時の注意点：</h2>
<ol>
	<li>SIKULI は大文字と小文字を厳密に区別します。たとえば、openapp と openApp は別物です。</li>
</ol>
まとめ：ここまでのチュートリアルを読んで、皆さんは <strong><a href="http://sikuli.org/">Sikuli Script</a></strong> について少し理解できたと思います。もしあなたがプログラマーなら、今の気持ちはきっと複雑でしょう！こんなに簡単なプログラミング言語があったら、これからプログラマーはどうやって食べていけばいいのでしょう！ でも、心配はいりません。良いプログラムを書くことは、使う言語とはあまり関係がありません（機械語を除けば……）。大事なのはロジックです。また、SIKULI は初心者でも本格的なプログラムが書けるようにするためのものではありません。その目的は、コードの可読性を高めることです。最後にひとつ。SIKULI の作者は台湾の人で、このプログラミング言語は台湾の誇りと言ってもいいでしょう〜
