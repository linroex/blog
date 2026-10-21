---
title: "HTML Anchor の本文がメニューに隠れる問題の解決方法"
date: 2017-02-20T23:28:39
slug: "fix-html-anchor-hidden-by-menu"
tags: ["HTML", "CSS"]
categories: ["Programming"]
draft: false
---

HTML の Anchor（アンカー）機能はとても便利です。ページが長いとき、Anchor を使えば訪問者は指定した段落へすばやく移動できます。この手法は多くの技術ドキュメントやブログで使われています。https://coder.tw/?p=123#section1 のような URL を見たことがあれば、それが HTML Anchor の特性を利用したものです。この機能は便利ですが、いくつか問題も生じます。最もよくあるのは、ページの最上部に固定のフローティングメニューがある場合です。訪問者が Anchor リンクをクリックすると、ブラウザは指定の章まで自動でスクロールしてくれますが、一部の文字がメニューに隠れてしまうのです。私はずっとこの問題に悩んでいました。今日たまたま Facebook の技術ドキュメントを読んでいたところ、彼らの解決方法を見つけ、なかなか良いと思いました。


<!--more-->


HTML Anchor を使うと、任意の HTML タグに ID を設定できます。そして URL の末尾に #id を付けると、そのURLにアクセスしたときに、ページが ID の位置まですばやくスクロールします。
<pre>&lt;!-- https://example.com/index.html#section2 --&gt;
&lt;h2 id="section2"&gt;&lt;/h2&gt;</pre>
HTML Anchor のリンクは自動でページを指定位置までスクロールしますが、フローティングメニューがあると一部の文字が隠れてしまいます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-21-上午1.22.26.jpg"><img class="alignnone size-full wp-image-7481" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-21-上午1.22.26.jpg" alt="" width="1016" height="888" /></a>

解決方法はとてもおもしろいものです。Anchor リンクをクリックすると、ブラウザは h2 の上端が見える位置までスクロールします。そこで h2 の高さを増やし、h2 の中の文字を下寄せにすれば、フローティングメニューに隠れずに済みます。以下では CSS の :before を使ってこれを実現する例を紹介します。

例：<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/html_anchor.html">html_anchor</a> | <a href="https://gist.github.com/anonymous/7c2dba7f47bb05718565ece8a7102f46">Gist</a>

最も重要な CSS コード：
<pre>body :target:before{
  display: block;
  content: "";
  height: 160px;
  margin: -160px 0 0;
}</pre>
簡単に言うと、:before で h2 の前に高さ 160px のブロックを追加しています。また :target は、HTML Anchor リンクの移動先を表す疑似セレクタで、CSS3 で登場し、現在ではほとんどのブラウザが対応しています。この数行の CSS を使えば、Anchor リンクがフローティングメニューと衝突しなくなります！
