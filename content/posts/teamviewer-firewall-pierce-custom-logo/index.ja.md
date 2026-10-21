---
title: "TeamViewer - 個人用のリモートコントロールソフトを作る"
date: 2009-09-26T19:21:47
slug: "teamviewer-firewall-pierce-custom-logo"
tags: ["TeamViewer"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-000.jpg"><img class="alignnone size-full wp-image-1930" title="2009-09-20-000" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-000.jpg" alt="2009-09-20-000" width="306" height="100" /></a>

<strong>TeamViewer</strong> は非常に便利なリモートコントロールソフトです。最大の特徴は、ファイアウォールの制限を突破できることで、パソコンにファイアウォールが入っていても使えます。私の考えでは、<strong>TeamViewer</strong> の仕組みはおそらく、まず同社のサーバーに接続し、そこから操作される側のパソコンに接続するのだと思います。ただ、そうなるとコストはかなり大きいはずです。さらに <strong>TeamViewer</strong> には特別な機能もあります。『自分だけの TeamViewer』をカスタマイズできるのです。これは公式サイトが提供するサービスで、ロゴを自分のものに差し替えることができます。すごいでしょう！


<!--more-->

<h3>一. TeamViewer の情報</h3>
<ul>
	<li>種類：無料のソフト、リモートコントロール</li>
	<li>ダウンロード先：Xun6 | <a href="http://www.4shared.com/file/225103036/f1a92af1/Teamviewer.html ">4Shared</a> | <a href="http://www.box.net/shared/ucj6l85rpf">Box.net </a>| <a href="http://download.cnet.com/TeamViewer/3000-7240_4-10398150.html?part=dl-6271747&amp;subj=dl&amp;tag=button">公式ダウンロード</a></li>
	<li>ウイルススキャンレポート：<a href="http://www.virustotal.com/analisis/7f8729ee3528ebc4883af02f753990278c81d6f9961d55331551389ca29f8ec9-1265870524">VirusTotal </a></li>
	<li>MD5：<span style="font-family: 'Courier New', Courier, mono; line-height: 16px; font-size: 12px;">a745f4c1d7d990d04adac56ceb68edc0</span></li>
	<li>（上記のバージョン以外にも、MSI 専用版など多くのバージョンがあります。詳しくは公式サイトの<a href="http://www.teamviewer.com/download/index.aspx">ダウンロードページ</a>をご覧ください）</li>
</ul>
<div id="_mcePaste"></div>
さらに、新バージョンでは次の機能が追加されています：
<ol>
	<li>操作される側のシステム情報を表示</li>
	<li>操作される側の解像度を設定</li>
	<li>録画機能を内蔵</li>
	<li>ホストと操作される側を入れ替える機能を内蔵</li>
	<li>より細かいアクセス制御の設定</li>
	<li>パスワードの長さの設定</li>
	<li>TeamViewer のサーバーを経由せず、直接接続できる</li>
</ol>
上記の機能以外にも、実はまだまだたくさんあります。

<span style="color: #ffffff;">.</span>
<h3>二. TeamViewer のバージョン紹介</h3>
完全版：その名の通り、TeamViewer のすべての機能に対応したバージョンです。設定はやや面倒ですが、接続速度を制御したり、接続時にデスクトップを残すかどうかなど、より細かい設定ができます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-003.jpg"><img class="alignnone size-full wp-image-1934" title="2009-09-20-003" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-003.jpg" alt="2009-09-20-003" width="550" height="381" /></a>

簡易版：リモート操作の機能だけを持つソフトです。設定などの調整は不要です（そもそも調整できません）。また、簡易版では他人のパソコンを操作することはできず、他人から操作されることしかできません。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-002.jpg"><img class="alignnone size-full wp-image-1933" title="2009-09-20-002" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-20-002.jpg" alt="2009-09-20-002" width="278" height="360" /></a>
<h3>三. 個性化 TeamViewer の作成</h3>
個性化 TeamViewer とは、TeamViewer に自分のロゴを表示できることを指します。ただし、これができるのは TeamViewerQS（他の人から接続されるだけのバージョン）のみで、他のバージョンではできません。方法も使えません。下記の手順に従ってください。

1. 200*100 ピクセルの画像を用意します（JPEG、BMP、GIF のいずれでも可）。次に TeamViewer の<a href="http://www.teamviewer.com/download/index.aspx">ダウンロード</a>ページに移動し、ページを少し下にスクロールすると「<em>For the instant customer:</em> TeamViewer QuickSupport」という一文が見つかります。この一文の下にある<a title="Download Windows" href="http://www.teamviewer.com/download/customdesign_4x.aspx">Customize Quicksupport</a>をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_184545.jpg"><img class="alignnone size-full wp-image-1947" title="2009-09-26_184545" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_184545.jpg" alt="2009-09-26_184545" width="549" height="212" /></a>

2. 個性化 TeamViewer の設定ページに入ったら、関連する情報を入力し、先ほど用意した画像をアップロードします。

ラベルの説明：
<ul>
	<li>Language（言語）：デフォルトのままで構いません。</li>
	<li><span id="customDesign_titleDescription">Title（タイトル）：</span>TeamViewer のタイトルです。プログラムの最上部に表示されます</li>
	<li><span id="customDesign_explanationDescription">Text（テキスト）：個性化</span>TeamViewer に表示される内容です</li>
	<li>Logo（ロゴ）：ロゴをアップロードします。</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185013.jpg"><img class="alignnone size-full wp-image-1948" title="2009-09-26_185013" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185013.jpg" alt="2009-09-26_185013" width="321" height="379" /></a>

<span id="customDesign_lblTextColor">Text color（文字色）：文字の色です。枠をクリックすると色を選ぶ画面が表示されます</span>

<span id="customDesign_lblBGColor">Background color（背景色）：背景の色です。設定方法もほぼ同じです</span>

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185206.jpg"><img class="alignnone size-full wp-image-1949" title="2009-09-26_185206" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_185206.jpg" alt="2009-09-26_185206" width="675" height="312" /></a>

ほかの設定はそのままで構いません。"<span id="customDesign_btnLabel">Generate QuickSupport</span>" をクリックするだけです。

3. 赤い枠内のボタンをクリックすればダウンロードできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_191938.jpg"><img class="alignnone size-full wp-image-1950" title="2009-09-26_191938" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-26_191938.jpg" alt="2009-09-26_191938" width="550" height="296" /></a>
<h3 style="text-align: center;"><span style="color: #0000ff;">次回の記事もお楽しみに - <a href="https://coder.tw/?p=2026">TeamViewer リモート操作チュートリアル</a></span></h3>
