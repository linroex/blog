---
title: "DNS Firewall - 指定したサイトへのアクセスを制限し、DNS の対応先をすばやく変更"
date: 2011-01-21T11:46:20
slug: "dns-firewall-block-websites-2"
tags: ["DNS", "VB"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_112455.jpg"><img class="size-full wp-image-4393 aligncenter" title="2011-01-21_112455" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_112455.jpg" alt="" width="339" height="413" /></a></p>
DNS Firewall は、ある Web 運営者が最近作成したプログラムです。主な機能は、特定の Web サイトへのアクセスを禁止することです。たとえば、家に子どもがいて、アダルトサイトや Facebook を見せたくない場合は、その 2 つのサイトの URL をプログラムに入力します。すると、このパソコンからそのサイトに接続できなくなります！ DNS Firewall の仕組みは実はとても単純です。Windows に標準で入っている hosts ファイルを書き換え、禁止したサイトの DNS の対応先を 127.0.0.1、つまり自分のパソコンに向けるのです。そのため、ブラウザからそのサイトに届かなくなります xD


<!--more-->

<h2>DNS Firewall 情報</h2>
<ul>
	<li>作者：聽．風</li>
	<li>開発環境：VB2010</li>
	<li>ダウンロード：Xun6 ｜ <a href="http://www.4shared.com/file/Lg4ma-Yy/DNS_Firewall.html">4Shared </a>｜<a href="http://www.box.net/shared/yu97dzye3z"> Box.net</a></li>
	<li>ソースコード： <a href="http://www.4shared.com/file/vvqOV3P0/DNS_Firewall.html ">4Shared </a>｜ <a href="http://www.box.net/shared/8933686dvh">Box.net</a> ｜ Xun6</li>
	<li>動作条件：.NET Framework 3 以上のインストール</li>
</ul>
<h2>DNS Firewall の使い方</h2>
1.DNS Firewall をダウンロードしたら、プログラムを右クリックして「管理者として実行」を選択します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113344.jpg"><img class="alignnone size-large wp-image-4394" title="2011-01-21_113344" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113344-318x500.jpg" alt="" width="318" height="500" /></a>

2.プログラムを開いたら、ブロックしたいサイトの URL を大きな枠に入力します（下の画像を参照）。1 行に 1 つの URL を入力します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113634.jpg"><img class="alignnone size-full wp-image-4395" title="2011-01-21_113634" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113634.jpg" alt="" width="339" height="413" /></a>

3.ブロックするサイトを設定したら「host ファイルに書き込む」をクリックし、ネットワークを再接続すれば完了です～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113752.jpg"><img class="alignnone size-full wp-image-4396" title="2011-01-21_113752" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113752.jpg" alt="" width="339" height="413" /></a>

4.間違えて、ブロックするつもりのないサイトを追加してしまった場合は、「表示」→「すべての DNS 対応をクリア」をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_114347.jpg"><img class="alignnone size-full wp-image-4397" title="2011-01-21_114347" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_114347.jpg" alt="" width="339" height="413" /></a>
