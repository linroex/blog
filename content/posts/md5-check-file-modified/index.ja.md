---
title: "ファイルが改ざんされていないか確認する便利ツール - WindMD5（WindMD5 の使い方つき）"
date: 2009-05-20T18:28:56
slug: "md5-check-file-modified"
tags: ["MD5"]
categories: ["Software"]
summary: "MD5 は厳密にはプログラムではなく、暗号アルゴリズムです。ここで MD5 でファイルの改ざんを防げると述べているのは、ファイルに対して MD5 コードを生成できるからです。ファイルが変更されていた場合（たとえばトロイの木馬を仕込まれた場合）、そのファイルの MD5 コードも変わります。ただし、この MD5 コードの生成は人の手でできるものではなく、プログラムで行う必要があります。そこで今回は WindMD5 というプログラムを紹介します。\n\nこのプログラムは中国語版で、無料で、USB メモリに入れて持ち歩くこともでき、ドラッグ＆ドロップでの暗号化に対応しています。サイト運営者が最もおすすめするツールです..................."
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-20_182004.jpg"><img title="2009-05-20_182004" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-20_182004.jpg" alt="2009-05-20_182004" width="459" height="160" /></a>

<strong>MD5</strong> は厳密にはプログラムではなく、暗号アルゴリズムです。ここで MD5 でファイルの改ざんを防げると述べているのは、ファイルに対して MD5 コードを生成できるからです。ファイルが変更されていた場合（たとえばトロイの木馬を仕込まれた場合）、そのファイルの MD5 コードも変わります。ただし、この MD5 コードの生成は人の手でできるものではなく、プログラムで行う必要があります。

そこで今回は <strong>WindMD5</strong> というプログラムを紹介します。ファイルの MD5 コードを算出し、そのファイルが改ざんされたかどうかを確認できます。プログラムをダウンロードしたら、<strong>WindMD5</strong> で改ざんされていないかをチェックしてみることをおすすめします。（サイトによっては、ファイルの MD5 コードを公開しています。自分で生成した MD5 コードとサイトの値を照合すれば、変更されたかどうかが分かります。）
<h2>
<!--more-->
WindMD5 情報：</h2>
<ul>
	<li>ダウンロード先： <a href="http://www.box.net/shared/f57gqttc78">Box.net</a> | <a href="http://www.4shared.com/file/224502246/3836469f/WindMD5.html">4Share</a> | Xun6</li>
	<li>ウイルススキャンの結果： <a href="http://www.virustotal.com/analisis/ba175c012be571cc04bd61366896c5ff842718561b3c254da0f1c193a004c68e-1260159173">Virustotal</a></li>
</ul>
<h2>WindMD5 の使い方：</h2>
<span>まず </span><span id="maintopic">WindMD5 を開き、チェックしたいファイルをプログラムの中にドラッグします</span>

<span><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-20_182110.jpg"><img class="alignnone size-full wp-image-1075" title="2009-05-20_182110" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-20_182110.jpg" alt="2009-05-20_182110" width="512" height="160" /></a>
</span>

<span>ドラッグすると、文字列が表示されます。MD5 コードは「=」の後ろにある英字と数字の並びです。</span>

<span><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-20_182423.jpg"><img class="alignnone size-full wp-image-1076" title="2009-05-20_182423" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-20_182423.jpg" alt="2009-05-20_182423" width="500" height="200" /></a>
</span>

<span>
</span>
