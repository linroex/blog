---
title: "SQL の注意事項 - ` と ' の違い"
date: 2011-02-11T10:43:48
slug: "sql-single-vs-double-quotes"
tags: ["SQL"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-07-27_233518.jpg"><img class="alignnone size-large wp-image-206" title="2010-07-27_233518" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-07-27_233518-540x259.jpg" alt="" width="432" height="207" /></a>

最近、PHP でプログラムを書いている途中で SQL のコードに出会ったので、少し調べてみました。すると、初心者がよく間違えるポイントを発見しました。それは、<strong>`</strong> と <strong>'</strong> という二つの記号は、働きが違うということです。当時はそのことを知らず、しかも本の文字が小さかったため、この小さな問題に気づくまでに二時間もかかってしまいました……。そこで、この二つには違いがあることを皆さんに伝えるために、この記事を書きました。

<!--more-->

まず、SQL の構文における <strong>`</strong> 記号の意味から説明します。バッククォートのキーはキーボードの左上にあり、SQL では主にテーブル名を囲むために使います。たとえば次のとおりです。
<pre lang="sql">SELECT `username` FROM `wp-user`;</pre>
この記号は、テーブル名を囲むために必ず使う必要があります。

次は ' 記号です。キーボードの右側、Enter キーの隣にあります。' 記号は通常、値に使います。たとえば次のとおりです。
<pre lang="sql">SELECT `username` FROM `wp-user` WHERE `username` = 'linroex';</pre>
この二つは大きく異なり、間違えて使うと実行できなくなるため、必ず区別してください。また、これが本サイトの最後の技術系の記事になるかもしれません。今後、私は新しいブログ（自分で PHP を使って書いています）を開設する予定で、新しいブログでは技術系の記事を専門に書くつもりです。
