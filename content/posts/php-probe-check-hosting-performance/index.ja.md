---
title: "PHP探針で、利用中のホスティング領域の安定性を確認する"
date: 2009-06-14T14:53:09
slug: "php-probe-check-hosting-performance"
tags: ["PHP"]
categories: ["SRE"]
draft: false
---

サイトを作るとき、無料のレンタルサーバーから始める方は多いのではないでしょうか。
自分の使っているホストが安定しているのか、速度はどのくらいなのか、きっと気になりますよね。
今日、無料のサイトの記事で、ある人が PHP 探針を使ってホストを調べていたのを見つけたので、皆さんもぜひ試してみてください～～～～

まずは <a href="http://goo.gl/X2XX ">PHP探針</a> をダウンロードしてください。

<!--more-->


ダウンロードしたら、スペースのルートディレクトリにアップロードします。
p.s. スペースに htdocs というフォルダがあれば、その中にアップロードしてください。
<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_143714.jpg"><img class="alignnone size-full wp-image-1352" title="2009-06-14_143714" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_143714.jpg" alt="2009-06-14_143714" width="640" height="461" /></a>
アップロードが終わったら、ブラウザで次のURLを開きます。
http://你的網址/phpinfo1.php

すると、見るべき画面が表示されます～

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_144519.jpg"><img class="alignnone size-full wp-image-1354" title="2009-06-14_144519" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_144519.jpg" alt="2009-06-14_144519" width="700" height="209" /></a>
無料のスペースなのに、思ったより速くてびっくりです XD

本プログラムの原作者：不明...........
