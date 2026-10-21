---
title: "【Java】JDK のインストールと Java ソースファイルのコンパイル解説"
date: 2011-01-27T23:11:20
slug: "java-jdk-install-compile-tutorial"
tags: ["Java"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_232013.jpg"><img class="alignnone size-large wp-image-4475" title="2011-01-27_232013" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_232013-520x339.jpg" alt="" width="520" height="339" /></a>

この1週間は、台北商専で Java、JSP、SQL の授業を受けています。もともと Java を学ぶつもりでした。あるネット上の知り合いが、エンジニアとして必ず身につけるべき言語は C++ と Java だと言っていたからです。C++ は少しだけ触ったことがあり、小さなプログラムなら書ける程度ですが、Java はまったく触ったことがありませんでした。先生から台北商専の授業に来ないかと聞かれたときは、とても嬉しくてすぐに参加しました。

もともとは、Java はあまり使い勝手がよくないと思っていました。それでも学ぼうと思ったのは、エンジニアに必須の言語であることに加えて、クロスプラットフォームに対応しているからです。デスクトップ向けのプログラムはもちろん、携帯電話向けのプログラムも簡単に書けるようになります。Android の基礎も Java でできています。ところが、数回授業を受けただけで Java が好きになってきました。初めてプログラミング言語を学んだときのような意欲がよみがえり、本を抱えて夜中の12時まで勉強するようになったのです……。VB.NET を学んだときに感じたのと同じ感覚です!!


<!--more-->


前置きはこのくらいにして、ここからは JDK のインストール方法と、Java プログラムのコンパイル方法を説明します。JDK は Java プログラムを書いたあとにコンパイルするためのツールです。以下の解説はすべてコマンドプロンプトで行います。Eclipse ではありません。
<h2>Java 情報</h2>
<ul>
	<li>Java 公式サイト：<a href="http://www.java.com/zh_TW/">http://www.java.com/zh_TW/</a></li>
	<li>JDK 公式サイト：<a href="http://www.oracle.com/us/technologies/java/index.html">http://www.oracle.com/us/technologies/java/index.html</a></li>
	<li>最新バージョン：1.6</li>
	<li>利用分野：携帯アプリ、ネットワークアプリケーション、一般的なデスクトップアプリなどに Java を使えます</li>
</ul>
<h2>JDK のインストール</h2>
1. まず JDK をダウンロードします。以下は Windows 版のダウンロードリンクです。ダウンロードリンクが無効になっている場合は、<a href="https://coder.tw/?page_id=1909">【こちらから報告】</a>してください。

JDK ダウンロードページ：<a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">http://www.oracle.com/technetwork/java/javase/downloads/index.html</a>

JDK Windows 32bit：<a href="http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS_Developer-Site/en_US/-/USD/VerifyItem-Start/jdk-6u23-windows-i586.exe?BundledLineItemUUID=48.J_hCuQboAAAEtzvpZDb0I&amp;OrderID=1POJ_hCu3aQAAAEtwvpZDb0I&amp;ProductID=_omJ_hCwMp4AAAEsQIMcKluK&amp;FileName=/jdk-6u23-windows-i586.exe">公式ダウンロード</a> ｜<a href="http://www.4shared.com/file/rHlCLIcI/jdk-6u23-windows-i586.html ">4Shared</a>

JDK Windows 64bit：<a href="http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS_Developer-Site/en_US/-/USD/VerifyItem-Start/jdk-6u23-windows-x64.exe?BundledLineItemUUID=qaaJ_hCuZa8AAAEtOwdZDb0K&amp;OrderID=so6J_hCupHsAAAEtMAdZDb0K&amp;ProductID=ZUuJ_hCwEmwAAAEsOoMcKluK&amp;FileName=/jdk-6u23-windows-x64.exe">公式ダウンロード</a> ｜<a href="http://www.4shared.com/file/wTQCoTsm/jdk-6u23-windows-x64.html ">4Shared</a>

2. ダウンロードした JDK のインストーラーを実行し、【Next】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_220638.jpg"><img class="alignnone size-full wp-image-4454" title="2011-01-27_220638" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_220638.jpg" alt="" width="504" height="382" /></a>

3. このページでは JDK のインストール先を設定します。後の設定で面倒にならないよう、初期値のままにしておくことをおすすめします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221009.jpg"><img class="alignnone size-full wp-image-4455" title="2011-01-27_221009" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221009.jpg" alt="" width="504" height="382" /></a>

4. インストール中です。しばらくお待ちください~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221940.jpg"><img class="alignnone size-full wp-image-4456" title="2011-01-27_221940" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221940.jpg" alt="" width="504" height="382" /></a>

5. インストール完了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222027.jpg"><img class="alignnone size-full wp-image-4457" title="2011-01-27_222027" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222027.jpg" alt="" width="504" height="382" /></a>

ここまでで JDK のインストールは完了です。でも、本当にこれだけで済むのでしょうか？ もちろんそんなことはありません。次に環境変数を設定します。環境変数とは、JDK がパソコンのどのフォルダーにあるのかを、OS に教える設定です。
<h2>環境変数の設定</h2>
1. 「マイ コンピュータ」を右クリックして【プロパティ】を選びます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222555.jpg"><img class="alignnone size-full wp-image-4458" title="2011-01-27_222555" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222555.jpg" alt="" width="351" height="307" /></a>

2. Windows 7 のユーザーは、まず【システムの詳細設定】をクリックし、次に【詳細設定】→【環境変数】をクリックします。XP のユーザーは、直接【詳細設定】→【環境変数】をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223454.jpg"><img class="alignnone size-large wp-image-4459" title="2011-01-27_223454" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223454-520x408.jpg" alt="" width="520" height="408" /></a>

3. 【Path】を選んで【編集】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223744.jpg"><img class="alignnone size-full wp-image-4460" title="2011-01-27_223744" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223744.jpg" alt="" width="394" height="406" /></a>

4. 変数値の末尾に【C:Program FilesJavajdk1.6.0_23bin;】を追加します。既存の変数値を上書きしないように注意してください。元の変数値の後ろに追加する必要があります！ JDK のインストール時にインストール先を変更した場合は、このパスも変更してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223848.jpg"><img class="alignnone size-full wp-image-4461" title="2011-01-27_223848" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223848.jpg" alt="" width="357" height="145" /></a>

5. 設定が終わったら【OK】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224126.jpg"><img class="alignnone size-full wp-image-4462" title="2011-01-27_224126" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224126.jpg" alt="" width="396" height="404" /></a>

6. 続いて cmd（コマンドプロンプト）を開き、設定が正しく反映されたかを確認します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224314.jpg"><img class="alignnone size-large wp-image-4463" title="2011-01-27_224314" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224314-368x500.jpg" alt="" width="368" height="500" /></a>

「javac」と入力して Enter を押してください。【'javac' は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません。】と表示されたら、設定に誤りがあります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224459.jpg"><img class="alignnone size-large wp-image-4464" title="2011-01-27_224459" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224459-520x339.jpg" alt="" width="520" height="339" /></a>
<h2>Java ソースコードのコンパイル解説</h2>
Java プログラムを書き終えたら、まず *.java という拡張子のファイルとして保存し、コンパイルする必要があります。JDK の役割はそのコンパイルを行うことです。そこで以下では、Java プログラムのコンパイルと実行の方法を説明します。

1. cmd を開き、javac <ソースファイルの場所> と入力します →→ javac とソースファイルの場所の間には必ずスペースを入れてください！ また、ソースファイルの場所はドライブ文字、ファイル名、拡張子を含む完全なパスで指定します。

入力したら Enter を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225638.jpg"><img class="alignnone size-large wp-image-4468" title="2011-01-27_225638" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225638-520x339.jpg" alt="" width="520" height="339" /></a>

2. 何もメッセージが表示されなければコンパイルは成功です。ソースコードと同じフォルダーに、拡張子 .class のファイルができているはずです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225347.jpg"><img class="alignnone size-large wp-image-4467" title="2011-01-27_225347" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225347-520x358.jpg" alt="" width="520" height="358" /></a>

3. 次に class ファイルを実行します。もう一度 cmd を開いてください。手順が少し複雑です。

(1) class ファイルが C ドライブにない場合は、まず class ファイルがあるドライブ文字を入力します。たとえば D ドライブにある場合は d: と入力すると、cmd が D ドライブに切り替わります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230234.jpg"><img class="alignnone size-large wp-image-4470" title="2011-01-27_230234" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230234-520x339.jpg" alt="" width="520" height="339" /></a>

(2) cd <class ファイルのパス> と入力します

p.s. ファイル名は含めなくて大丈夫です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230504.jpg"><img class="alignnone size-large wp-image-4471" title="2011-01-27_230504" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230504-520x339.jpg" alt="" width="520" height="339" /></a>

(3) java <Java プログラム名> と入力します

p.s. プログラム名が test.class だと仮定すると、【java test】と入力します。拡張子は不要です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_231018.jpg"><img class="alignnone size-large wp-image-4472" title="2011-01-27_231018" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_231018-520x294.jpg" alt="" width="520" height="294" /></a>

ここで解説は終わりです~ みなさんが Java を楽しく学べることを願っています。
