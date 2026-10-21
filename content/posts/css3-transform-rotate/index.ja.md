---
title: "【CSS 3】transform: rotate で画像やページを傾ける"
date: 2011-04-23T09:22:08
slug: "css3-transform-rotate"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-23_085636.jpg"><img class="size-large wp-image-422 aligncenter" title="2011-04-23_085636" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-23_085636-540x386.jpg" alt="" width="540" height="386" /></a>

以前ニュースで、Google のモバイル版で「傾斜」（中国語で「傾き」の意味）と検索すると、結果のページが右に傾いて表示される、と紹介されていました。この効果はそれほど難しくありません。CSS 3 の標準の一つなので、CSS の 1 行だけで実現できます。現時点では、IE 系のブラウザはこの CSS 3 の傾きの構文に対応していません（IE 9 も含みます）。また、実際には 1 行では済まず、ブラウザごとに構文が異なるため、複数行に分けて書く必要があります。この点は今後改善されるでしょう。


<!--more-->

<h2>はじめに：</h2>
今回使う傾きの効果は、CSS 3 の変形機能である transform によるものです。このプロパティを使えば、CSS だけで簡単なアニメーションを作れます。transform では、ブロックを傾けるだけでなく、移動、拡大・縮小、パースペクティブなどの効果も作れます。ただ、今回扱うのは回転、つまり transform のうち傾きの部分だけです。
<h2>構文：</h2>
<pre lang="css">-webkit-transform: rotate(角度);
-moz-transform: rotate(角度);
-o-transform: rotate(角度);
-ms-transform:rotate(角度)</pre>
「ほぼ」すべてのブラウザで表示されるように、この 3 行はまとめて書くのがおすすめです。もちろん、現時点では IE 系のブラウザではこの機能が表示されません（IE 9 では対応済みです）。
<ul>
	<li>-webkit の行は、Safari や Chrome など WebKit エンジンを使うブラウザ向けです。</li>
	<li>-moz の行は、Firefox や Firefox をベースにしたブラウザ向けです。</li>
	<li>-o の行は、Opera 向けです。</li>
	<li>-ms の行は、IE 9 向けです。</li>
</ul>
角度の単位は deg です。たとえば、img を 1 度だけ傾けたい場合の構文は次のとおりです。
<pre lang="css">-webkit-transform: roate(1deg);</pre>
サンプルファイルのダウンロード：<a href="http://www.box.net/shared/qggenzip7e">Box.net</a> ｜ <a href="http://www.4shared.com/file/YdDnTT8s/css3-transform-rotate.html ">4Shared </a>｜ <a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOM2IzODdlMDAtZjZiYi00NWEwLWE4OTAtOTY2ZjRiMWU4OWM5&amp;hl=zh_TW">Google </a>｜ <a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/css3-transform-rotate.zip">Dropbox</a>
