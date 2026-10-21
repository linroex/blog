---
title: "CSS Inner Border：ボックスの内側に枠線を描く"
date: 2017-04-26T09:54:28
slug: "css-inner-border"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

今回、<a href="http://me.coder.tw">個人のポータルページ</a>をデザインしていたときに、内側の枠線（Inner Border）の効果を作りたくなり、とても賢いやり方を学びました。CSS で内側の枠線を作ると聞くと、まず padding や margin でボックスを大きくすることを思いつくと思います。しかし、それではうまくいきません。ボックスを広げると枠線も一緒に動いてしまうため、この方法では内側の枠線のスタイルを作れないのです。


<!--more-->


ネットで見つけた解決策は、まず元の位置に border を描き、次に box-shadow を使って、ボックスの外側にボックスの背景と同じ色の「影」を描くというものです。この影にはオフセットがないので、内側に枠線があるように見える錯覚が生まれるのです！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照-2017-04-26-上午10.10.30.jpg"><img class="alignnone size-full wp-image-7634" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照-2017-04-26-上午10.10.30.jpg" alt="" width="747" height="405" /></a>

上の画像を例にすると、box-shadow でボックスの外側に 5px の白い影を描いています。オフセットがないため、この影はボックスの一部のように見えます。参考までに CSS は次のとおりです。
<pre>.box {
  background: white;
  border: red 1px solid;
  box-shadow: 0 0 0 5px white;
}</pre>
