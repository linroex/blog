---
title: "FixDwndp で Microsoft のサイトに接続できない問題を解決"
date: 2009-06-20T20:26:08
slug: "fixdwndp-cannot-connect-microsoft-sites"
tags: ["Antivirus", "Microsoft"]
categories: ["Security"]
draft: false
---

今日ネットを見ていたところ、驚いたことに Microsoft のサイトに接続できなくなっていました。前にパソコンが壊れたときの悲惨な状況を思い出しました……そして、なんと本当にまた起きてしまったのです！

前回は、原因不明のまま Microsoft 関連のサイトにも、ウイルス対策ソフトのサイトにも接続できず、ウイルス定義ファイルも更新できませんでした。そのときは、パソコンをかなり長く使っていたこともあり、そのまま再インストールしました。でも今回はパソコンを買ったばかりなのに、もう不調を起こしているのです @@

前置きが長くなりましたが、今日 FixDwndp をおすすめする理由はこれです。この記事を読んでいる方は、今すぐご自分のパソコンに次のような症状が出ていないか確認することをおすすめします：
<ol>
	<li>Microsoft の公式サイトに入れない</li>
	<li>各種ウイルス対策ソフトのサイトに入れない</li>
	<li>長い間、自動更新のお知らせが出ていない</li>
	<li>ウイルス対策ソフトがウイルス定義を更新できない
<!--more-->
</li>
</ol>
上記のような症状がなければ、あなたは幸運です。この厄介なワームには遭遇していません。なぜ厄介なのかというと、ウイルス対策やセキュリティに関連するサイトに一切アクセスできなくなるため、削除するのがとても難しいからです。今日の私も、「香腸大哥」さんに頼んで削除ツールを手に入れてもらいました XD 本当にありがとうございました！

もし不運にも上記の状況になってしまったら……以下のチュートリアルに従ってください。きっとパソコンは息を吹き返すはずです！

補足：このワームは <span>Conficker</span> と呼ばれています。関連情報は、<a href="http://goo.gl/DieU">http://goo.gl/DieU</a><a href="http://www.zdnet.com.tw/news/software/0,2000085678,20135593,00.htm">
</a>をご覧ください。
<h2>FixDwndp 情報：</h2>
<ul>
	<li>会社：Symantec（シマンテック）</li>
	<li>ダウンロード先：Xun6 | <a href="http://www.4shared.com/file/225033762/200a55d/FixDwndp.html ">4Shared</a> | <a href="http://www.box.net/shared/yx8jh6xnk0">Box.net</a> | <a href="http://www.mediafire.com/?czqmbydjnnq">Mediafire</a></li>
	<li>ウイルススキャンのレポート：<a href="http://www.virustotal.com/analisis/71d96cca87605ee31f68a9e7bb865b15844c98585aab799cef3ac1f4c97b2b7c-1263559353">VirusTotal</a></li>
</ul>
<h2>FixDwndp の使い方：</h2>
ワームを取り除く最初のステップは、もちろんファイルをダウンロードすることです！個人的には 2 つ目のダウンロード先を使うことをおすすめします。1 つ目のダウンロード先は、たいてい <span>Conficker</span> にブロックされてしまうからです。

<span>ダウンロードが終わったらダブルクリックで開きます。ライセンス画面が表示されるので、「I Accept」をクリックしてください</span>

<span><a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-20-1.jpg"><img class="alignnone size-full wp-image-1404" title="2009-06-20-1" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-20-1.jpg" alt="2009-06-20-1" width="450" height="181" /></a></span>

<span>ソフトのメイン画面が表示されたら、Start をクリックするとスキャンが始まります</span>

<span><a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-20-2.jpg"><img class="alignnone size-full wp-image-1405" title="2009-06-20-2" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-20-2.jpg" alt="2009-06-20-2" width="465" height="190" /></a>
</span>

<span>スキャンが終わると、再起動するかどうかを尋ねるウィンドウが表示されます。もちろん Yes を選びます</span>

<span>再起動すれば、きっと問題は解決しているはずです XD</span>

<span>補足：ウイルススキャンの前に、システムの復元とネットワーク（LAN ケーブルを抜く）をオフにしてください
</span>
