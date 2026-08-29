---
title: "CSS Inner Border - 內框線"
date: 2017-04-26T09:54:28
slug: "css-inner-border"
aliases: ["/posts/css-inner-border-%e5%85%a7%e6%a1%86%e7%b7%9a/"]
tags: ["CSS"]
categories: []
---

這次在設計<a href="http://me.coder.tw">個人入口頁</a>時因為想做出內框線（Inner Border）的效果，學到一種很聰明的寫法，提到 CSS Inner Border，直覺肯定是想到用 padding 或 margin 把盒子撐大，但其實這樣是行不通的，當你把盒子撐大時，框線也會跟著移動，無法做出內框線的樣式。


<!--more-->


在網路上看到的解法，首先在原地繪製 border，接著用 box-shadow 在盒子外面繪製一層和盒子背景同色的「陰影」，但這層陰影沒有任何偏移，如此就會造成「內框線」的視覺假象啦！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照-2017-04-26-上午10.10.30.jpg"><img class="alignnone size-full wp-image-7634" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照-2017-04-26-上午10.10.30.jpg" alt="" width="747" height="405" /></a>

以上圖為例，用 box-shadow 在盒子外面繪製出 5px 白色陰影，但因為沒有偏移，所以這層陰影看起來是盒子的一部份，參考 CSS 如下：
<pre>.box {
  background: white;
  border: red 1px solid;
  box-shadow: 0 0 0 5px white;
}</pre>
