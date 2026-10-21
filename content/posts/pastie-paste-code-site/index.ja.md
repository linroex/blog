---
title: "Pastie ――コードを貼り付けられるサイト。外部サイトへの埋め込みも可能！"
date: 2011-06-12T02:13:32
slug: "pastie-paste-code-site"
tags: ["Pastie"]
categories: ["Web Apps"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_015959.jpg"><img class="size-large wp-image-540 aligncenter" title="2011-06-12_015959" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_015959-540x443.jpg" alt="" width="540" height="443" /></a>

友だちにコードを見てもらって、デバッグを手伝ってもらいたいときがあるかもしれません。そのような場合、ファイルを直接送るのが一番の方法ですが、相手がファイルを受け取れなかったらどうしましょう？ そんなときに役立つのが <strong><a href="http://pastie.org/">Pastie</a></strong> です。コードを Pastie に貼り付けると、サイトが URL を発行してくれます。その URL を相手に渡せば、相手はあなたのコードを見られます。Pastie のような機能のサイトは今ではたくさんありますが、Pastie の最大の特徴は、外部のウェブサイトに埋め込めることです～


<!--more-->
<strong>サイトの URL：<a href="http://pastie.org/">http://pastie.org</a> </strong>
<h2>使い方</h2>
1.<a href="http://pastie.org/">Pastie</a> のサイトにアクセスして、コードを貼り付けます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020325.jpg"><img class="alignnone size-large wp-image-541" title="2011-06-12_020325" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020325-540x443.jpg" alt="" width="540" height="443" /></a>

2.貼り付けたデータの形式（プログラミング言語）を設定します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020512.jpg"><img class="alignnone size-large wp-image-542" title="2011-06-12_020512" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020512-540x443.jpg" alt="" width="540" height="443" /></a>

3.設定できたら「Paste」ボタンを押せば完了です～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020631.jpg"><img class="alignnone size-large wp-image-543" title="2011-06-12_020631" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020631-540x443.jpg" alt="" width="540" height="443" /></a>

4.URL をそのまま相手に送ってもかまいません。コードを自分のウェブサイトに貼りたい場合は、右側にあるコードをコピーして、サイトに貼り付けてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020830.jpg"><img class="alignnone size-large wp-image-544" title="2011-06-12_020830" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020830-540x443.jpg" alt="" width="540" height="443" /></a>
<h2>仕組みの解説</h2>
コードをご自身のウェブサイトに埋め込みたい場合は、まず JavaScript のコードをコピーして、サイトに貼り付ける必要があります。仕組みは実はシンプルで、JavaScript の document.write というメソッドを使って、画面に内容を出力しているだけです。この方法で、コードを表示しているのです。

▼▼js ブロックの中身は、大量の document.write です

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_021235.jpg"><img class="alignnone size-large wp-image-545" title="2011-06-12_021235" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_021235-540x338.jpg" alt="" width="540" height="338" /></a>
