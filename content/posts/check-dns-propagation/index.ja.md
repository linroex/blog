---
title: "ドメインの DNS が正しく設定されているか確認する方法は？"
date: 2011-02-01T18:00:25
slug: "check-dns-propagation"
tags: ["DNS"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163607.jpg"><img class="size-large wp-image-4567 aligncenter" title="2011-01-30_163607" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163607-520x339.jpg" alt="" width="520" height="339" /></a></p>
Web サイトを運営している方なら、ドメインに DNS の設定を何度も行ったことがあるでしょう。DNS の設定を変更した後、正式に反映されるまでに 12～24 時間かかることも、ご存じの方が多いと思います。これは、各 ISP が DNS キャッシュを消去する必要があるためです。DNS の対応づけは即座には反映されず、しばらく時間が経ってから有効になります。そこで今回は、指定したドメインが正しい IP アドレスに対応しているかを確認できるコマンドを紹介します。


<!--more-->


1.cmd（コマンドプロンプト）を開いて【nslookup】と入力します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163753.jpg"><img class="alignnone size-large wp-image-4568" title="2011-01-30_163753" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163753-520x339.jpg" alt="" width="520" height="339" /></a>

2.nslookup に入ったら、ドメイン名をそのまま入力し、返ってきた IP アドレスが正しいかを確認すれば OK です。Ping を使う必要はありません。（ここを書いていて、ふと別のアイデアが浮かびました（笑））

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163947.jpg"><img class="alignnone size-large wp-image-4569" title="2011-01-30_163947" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163947-520x339.jpg" alt="" width="520" height="339" /></a>

3.1 つのドメインの確認が終わったら、次のドメイン名を直接入力すれば、続けて確認できます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164048.jpg"><img class="alignnone size-large wp-image-4570" title="2011-01-30_164048" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164048-520x339.jpg" alt="" width="520" height="339" /></a>

4.使い終わったら exit と入力して終了します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164117.jpg"><img class="alignnone size-large wp-image-4571" title="2011-01-30_164117" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164117-520x339.jpg" alt="" width="520" height="339" /></a>
