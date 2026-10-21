---
title: "多言語化（GNU Gettext）作業の頼もしい味方：Poedit"
date: 2011-07-21T20:00:50
slug: "poedit-gnu-gettext-helper"
tags: ["Gettext"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195920.jpg"><img class="alignnone size-large wp-image-577" title="2011-07-21_195920" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195920-540x461.jpg" alt="" width="540" height="461" /></a>

今回は、多言語化のためのとても使いやすいツール「Poedit」を紹介します。インターネットで「中文化」（中国語化）という言葉を見かけたことがある人も多いのではないでしょうか。簡単に言うと、Poeditは「中文化」（ローカライズ）作業を助けてくれるソフトです。台湾ではこの作業を「中文化」と呼びますが、ほかの国では「英文化」「日文化」などと呼ばれることもあるので、こうした作業全般を「多言語化」と呼んでいます～


<!--more-->
Poeditはすべてのプログラムを多言語化できるわけではありません。Gettextプロジェクト専用のツールです。Gettextは GNU の下にある多言語化の仕組みのことで、Poeditのファイルの拡張子は po と mo です。そのため、インターネットで見つけたプログラムの言語ファイルも po や mo の拡張子になっていれば、Poeditで中国語化（中文化）できることを意味します。

通常、ソフトウェアの開発者はPOファイルを公開して、みんなが翻訳しやすいようにしています。しかし、ソースコードだけを公開しているソフトもあり、その場合はソースコードを解析してPOファイルを作成してから、多言語化の作業をする必要があります。このやり方はあまり多くなく、通常はPHPのプログラムでこうした方法がとられます。ソースコードを解析してPOファイルを作るのは難しそうですか？ ご心配なく～ Poeditは、POファイルの編集だけでなく、POファイルの「作成」もしてくれます～

私が知っている中でGettextで多言語に対応している有名なプログラムはWordPressです。プラグインやテーマもすべてこの仕組みで多言語化されているので、多くの人はPoeditがWordPress専用のツールだと思っています（私も最初はそう思っていました xD）。でも実はそうではありません。Poeditは、ほかの多くのプログラムにも使えます。たとえば、私は海外のWebデザインコンテストに参加することがあるのですが、そこで大きな問題になるのが、私は英語が苦手なのに、Webページは英語で作らなければならないことです…… そこで私はまず中国語でページを作り、Gettextの仕組みを使って翻訳をお願いしています : )

P.S. Poeditは、多言語化作業のためにPOとPOTの2種類のファイルを開くことができます。
<h2>Poeditの情報</h2>
<ul>
	<li>公式サイト：<a href="http://www.poedit.net/">http://www.poedit.net/</a></li>
	<li>ダウンロードページ：<a href="http://www.box.net/shared/jsbcze4r5cox4n3mo4oj">Box.net</a>｜<a href="http://www.4shared.com/file/8yU-GCU9/poedit-146-setup.html ">4Shared</a>｜<a href="http://goo.gl/ryC2J">Google</a>｜<a href="http://www.poedit.net/download.php#win32">公式ダウンロード</a></li>
	<li>対応OS：Windows、Linux、Mac</li>
</ul>
<h2>Poeditのインストール手順</h2>
1.まず公式サイトからインストーラーをダウンロードして実行し、「Next」を押し続けてインストールしてください～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195404.jpg"><img class="alignnone size-full wp-image-572" title="2011-07-21_195404" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195404.jpg" alt="" width="503" height="388" /></a>

2.使用許諾契約が出てきたら、「I accept.....」を選ぶのを忘れないでください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195618.jpg"><img class="alignnone size-full wp-image-573" title="2011-07-21_195618" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195618.jpg" alt="" width="503" height="388" /></a>

3.インストール中～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195657.jpg"><img class="alignnone size-full wp-image-574" title="2011-07-21_195657" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195657.jpg" alt="" width="503" height="388" /></a>

4.インストール完了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195734.jpg"><img class="alignnone size-full wp-image-575" title="2011-07-21_195734" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195734.jpg" alt="" width="503" height="388" /></a>
<h2>Poeditの使い方：POファイル・POTファイルを直接開く</h2>
このセクションでは、ソースファイルから翻訳が必要な文字列を抽出して、POファイルを作成する方法を紹介します。翻訳するプロジェクトがPOTファイルを提供している場合は、この記事を参考にPOファイルを直接開いて翻訳作業を始めることもできます。最後にファイルをmoファイルとして書き出せば完了です！

1.Poeditを開き、左上の「ファイル」→「開く」をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002330.jpg"><img class="alignnone size-large wp-image-584" title="2011-07-22_002330" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002330-540x461.jpg" alt="" width="540" height="461" /></a>

ソースファイルがPOTファイルの場合は、「ファイル」→「POTファイルから新規カタログを作成」を選びます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002410.jpg"><img class="alignnone size-large wp-image-585" title="2011-07-22_002410" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002410-540x461.jpg" alt="" width="540" height="461" /></a>

2.先ほど「POTファイルから新規カタログを作成」を選んだ場合は、いくつかの設定を入力するよう求められます。赤枠内は必須項目です。入力したらOKをクリックすると、POファイルを保存するよう求められます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002633.jpg"><img class="alignnone size-full wp-image-586" title="2011-07-22_002633" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002633.jpg" alt="" width="357" height="340" /></a>

3.これで翻訳を始められます～ 翻訳したい文字列を選び、翻訳結果を入力すれば大丈夫です。また、短い区間を翻訳するたびにすぐ保存（Ctrl+S）することをおすすめします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002948.jpg"><img class="alignnone size-large wp-image-587" title="2011-07-22_002948" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002948-540x461.jpg" alt="" width="540" height="461" /></a>

4.Ctrl+S、または「ファイル」→「保存」を押すと、Poeditが自動的にmoファイルを生成するので、別途書き出す操作は必要ありません。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003214.jpg"><img class="alignnone size-large wp-image-588" title="2011-07-22_003214" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003214-540x514.jpg" alt="" width="540" height="514" /></a>
<h2>Poeditの使い方：POファイルの作成</h2>
開発者として、ほかのスタッフが多言語化に使えるようにPOファイルをまとめたい場合や、翻訳者として、翻訳したいプログラムにコードしかなくPOファイルがない場合もあるでしょう。そんなときは、ここの手順を参考にしてPOファイルを作成してください。

1.Poeditを開き、「ファイル」→「新規カタログ」の順にクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003916.jpg"><img class="alignnone size-large wp-image-589" title="2011-07-22_003916" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003916-540x461.jpg" alt="" width="540" height="461" /></a>

2.いくつかの情報を入力します。プロジェクト情報の部分では、「プロジェクト名とバージョン」「文字セット」「ソースコードの文字セット」を必ず設定してください。
<ul>
	<li>プロジェクト名とバージョン：任意に設定</li>
	<li>文字セット：utf-8</li>
	<li>ソースコードの文字セット：utf-8</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_004455.jpg"><img class="alignnone size-full wp-image-590" title="2011-07-22_004455" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_004455.jpg" alt="" width="357" height="340" /></a>

3.次に「パス」タブに進み、「ベースパス」の欄に多言語化したいファイルの場所を入力します。ここは注意が必要です。プログラムのフォルダが一階層だけの構造なら、ベースパスを設定するだけで十分です。しかし、設定したベースパスの下にさらにフォルダがある場合は、その下にパスを追加する必要があります。

例えば、私のプログラムは C:Appservwwwtest というフォルダにあり、その中に config、core、js の3つのフォルダがあるとします。その場合は次のようになります。
<ul>
	<li>ベースパス：C:Appservwwwtest</li>
	<li>その下に設定する：</li>
	<li>config</li>
	<li>core</li>
	<li>js</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005207.jpg"><img class="alignnone size-full wp-image-591" title="2011-07-22_005207" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005207.jpg" alt="" width="357" height="340" /></a>

4.最後に「キーワード」タブに進みます。ここでは、どのキーワードに遭遇したときに処理するかを設定します。通常は次のように設定します（二つ目と三つ目はアンダースコアです）。
<ul>
	<li>Gettext</li>
	<li>_</li>
	<li>__</li>
	<li>gettext_noop</li>
	<li>_e</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005511.jpg"><img class="alignnone size-full wp-image-592" title="2011-07-22_005511" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005511.jpg" alt="" width="357" height="340" /></a>

5.これらの設定がすべて終わったら、OKを押します。するとPOファイルの保存先を聞かれるので、保存すればすぐに翻訳作業を始められます。
<h2>動画での解説</h2>
<h2><iframe src="http://www.youtube.com/embed/W5BkxT2dVo4" frameborder="0" width="480" height="390"></iframe></h2>
