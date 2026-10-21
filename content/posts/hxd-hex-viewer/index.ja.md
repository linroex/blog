---
title: "HxD - 優れた16進数ビューア"
date: 2009-06-28T09:00:10
slug: "hxd-hex-viewer"
tags: ["Reverse Engineering"]
categories: ["Security"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-27-20.jpg"><img class="alignnone size-full wp-image-1478" title="2009-06-27-20" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-27-20.jpg" alt="2009-06-27-20" width="613" height="361" /></a>

今回ご紹介するプログラムは HxD です。ファイルを16進数のバイト列として表示できるプログラムです。HxD は無料ですが、プロ向けのエディタにもまったく劣りません。HxD は基本的な16進数表示に対応しているだけでなく、メモリを直接操作することもできます。また、データのエクスポート機能もあり、編集したファイルを VB や C++ などの言語のプロジェクトファイルとして直接書き出せます。個人的には、パソコンをよく使う人なら、万一のために USB メモリに入れておくとよいと思います。
<h2>
<!--more-->
プログラム情報：</h2>
<ul>
	<li>プログラム名：HxD</li>
	<li>公式サイト：<a href="http://mh-nexus.de/en/hxd/">http://mh-nexus.de/en/hxd/</a></li>
	<li>ダウンロードページ：<a href="http://mh-nexus.de/downloads/HxDSetupEN.zip">公式のダウンロード先</a> | Xun6 | <a href="http://www.4shared.com/file/225057326/662a6e6b/HxDSetupEN.html ">4Shared</a> | <a href="http://www.box.net/shared/da2j48nn9a">Box.net</a></li>
	<li>ウイルススキャンレポート：<a href="http://www.virustotal.com/analisis/ea6ea4d4cc90f891915856b0393f99f275c0b6bb2a9e75a6b262117a18a2a469-1266230069">VirusTotal</a></li>
	<li>MD5 ハッシュ：<span style="font-family: 'Courier New', Courier, mono; line-height: 16px; font-size: 12px;">18df5e00110513f15882709d06947f95</span></li>
</ul>
<ul></ul>
<h2>使い方：</h2>
File → Open で既存のファイルを開くか、New を押して新しいファイルを作成できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-01.jpg"><img class="alignnone size-full wp-image-1480" title="2009-06-28-01" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-01.jpg" alt="2009-06-28-01" width="613" height="361" /></a>

ファイルを開いたら、編集を行えます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-03.jpg"><img class="alignnone size-full wp-image-1482" title="2009-06-28-03" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-03.jpg" alt="2009-06-28-03" width="500" height="348" /></a>

編集が終わったら、File → Save を押して保存する必要があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-04.jpg"><img class="alignnone size-full wp-image-1483" title="2009-06-28-04" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-04.jpg" alt="2009-06-28-04" width="490" height="289" /></a>

また、File → Export を押すと、ファイルをエクスポートできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-02.jpg"><img class="alignnone size-full wp-image-1481" title="2009-06-28-02" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-02.jpg" alt="2009-06-28-02" width="593" height="555" /></a>

そして、先ほど私がメモリを直接変更できると言ったのを覚えていますか！

Extras → Open RAM を押し、変更したいプロセスを選ぶだけです。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-05.jpg"><img class="alignnone size-full wp-image-1484" title="2009-06-28-05" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-05.jpg" alt="2009-06-28-05" width="613" height="361" /></a>

ここで紹介した機能のほかにも、HxD にはたくさんの機能があります。ぜひ自分で探ってみてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-28-06.jpg">
</a>
