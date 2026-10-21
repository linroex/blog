---
title: "[CSS] 画像の最大幅と最大高さを設定する"
date: 2009-05-15T21:00:17
slug: "set-max-image-size"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

CSS の記述を使うと、画像の最大幅と最大高さを設定できます。


<pre lang="css">最大幅:

タグ名 img{

max-width:幅の値

}

最大高さ:

タグ名 img{

max-height:高さの値

}
</pre>

また、高さ（幅）の値はパーセントで指定することもできます。

これらの記述を使うと、ブログの画像がはみ出さないようにできます。

ただし、この記述は IE6 では効果がありません。

IE でも効果を出す方法は、まだ調べているところです。

おそらく JavaScript を使えば実現できるでしょう。
