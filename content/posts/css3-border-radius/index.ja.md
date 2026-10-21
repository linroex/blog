---
title: "【CSS 3】CSS だけでサイトに角丸効果を付けられる！"
date: 2011-04-16T11:32:53
slug: "css3-border-radius"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_111212.jpg"><img class="size-large wp-image-395 aligncenter" title="2011-04-16_111212" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_111212-540x314.jpg" alt="" width="540" height="314" /></a>

CSS 2 の時代は、画像や div 要素に角丸効果を付けるのはかなり面倒でした。簡単な方法は、jQuery で誰かが書いてくれた関数を使うことでした。自分で作りたい場合は、角丸の画像をデザインして重ねて配置する必要があります。要するに、とても複雑だったのです。しかし CSS 3 では、そのような面倒な方法はもう必要ありません。CSS に直接書くだけで設定できます！


<!--more-->
<strong>注：この機能を使うには、IE 9、Firefox 4、Chrome、Safari などの新しいブラウザのように、CSS 3 に対応したブラウザが必要です。</strong>
<h2>構文：</h2>
<pre lang="css">border-radius:角丸の大きさ;  //左上、左下、右上、右下の 4 つの角すべてに角丸を適用します</pre>
角丸の大きさの部分には、px や cm など、さまざまな単位を指定できます。
<h2>例：</h2>
id=ex の div を作成し、その style を次のように設定します。
<pre lang="css">#ex{
	width:200px;		//ボックスの幅を設定
	eight:200px;		//ボックスの高さを設定
	margin:0px auto;	//ボックスを中央に配置（角丸効果とは無関係）
	border:1px solid #000;	//角丸が分かりやすいように枠線を設定
	border-radius: 10pt;	//10pt の角丸効果を設定
}</pre>
ネットでは、左上・左下・右上・右下のうち特定の 1 つの角だけを丸くできるという情報も見かけました。しかし実際に試してみたところ、どれもうまくいかないようでした。また、Firefox、Chrome、Safari で角丸にするには -moz- や -webkit- のプレフィックスを付ける必要がある、と書いている記事も多いです。ただ、私が試した限りでは、最新版のブラウザではプレフィックスはもう必要ありません。border-radius が CSS 3 の標準的な書き方になったからです。プレフィックス（-moz-、-webkit-）は、古いブラウザとの互換性を本当に気にするのでなければ、もうほとんど必要ありません xD

サンプル HTML のダウンロード：<a href="http://www.box.net/shared/edbsgcivsz">Box.net</a>｜<a href="http://www.4shared.com/file/Vv9V4HRv/border-radius.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/border-radius.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMDRjZDNlZjUtYjViNi00YWU1LWI4M2EtNGNiZWJhNGM2NDMz&amp;hl=zh_TW">Google</a>
