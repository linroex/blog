---
title: "【PHP】curl-lib で無名/Yam の音楽の実際のダウンロード URL を取得する"
date: 2011-01-25T18:31:04
slug: "php-curl-get-yam-music-download-url-2"
tags: ["PHP", "cURL", "Yam"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182313.jpg"><img class="size-large wp-image-4437 aligncenter" title="2011-01-25_182313" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182313-520x356.jpg" alt="" width="520" height="356" /></a></p>
<p style="text-align: center;">私がデザインした UI はシンプルです^^</p>
この<strong>無名（Wretch）/ Yam の音楽の実際のダウンロード URL を取得する</strong>プログラムは、もともとブログ用の音楽タグを自動生成するプログラムにするつもりでした。ただ、すでに音楽タグのジェネレーターを運営している人がたくさんいるので、もう一つ作っても意味が薄いと考えました。そこで作らずに、コードを公開してみなさんに見てもらうことにしました。また、Yam や無名から音楽をダウンロードしたい人がいれば、このプログラムをダウンロードして自分のサーバーにインストールし、動かすこともできます。


<!--more-->


<strong>無名/Yam の音楽の実際のダウンロード URL を取得する</strong>仕組み自体は、実はそれほど難しくありません。ただ、書くのには少し苦労します。このプログラムを三つの部分に分けて説明します。まず、このプログラムは Michael Schrenk という、ネット上の先輩が書いた cURL のライブラリを使っています。この先輩のライブラリのおかげで、このプログラムを素早く完成させることができました。このライブラリには、ファイルのダウンロード、RSS の処理、ウェブクローラー、HTML の解析など、さまざまな機能があります。いつか時間があるときに紹介したいと思います。今日は時間があまりありません。このあとも会計の宿題を急いで仕上げないといけないので…

二つ目は Yam の音楽の取得です。Yam は音楽の URL を保護するためにいろいろと工夫していて、ソースコードから直接見つけることはできません。しかし、Flash Player で音楽を再生できるということは、ソースコードから取得する方法が必ずあるはずです。しばらく調べたところ、ある URL に GET リクエストを送ると、音楽の実際の URL が返ってくることがわかりました。本当によく隠されています。無名とは大違いです…

このプログラムの最後の部分は、無名の音楽の実際のアドレスの取得です。正直に言うと、無名は私たちをバカにしているとしか思えません。URL がソースコードにそのまま書かれているのです。PHP でその URL の文字列を探すのには explode を使って長い処理が必要でしたが、cURL を使えば、関数一つで実際の URL を取得できました…

上では十分に説明できていないので、詳しくは私のソースコードを見てください。

メインの解析機能は getreallink という PHP ファイルに書いてあります。使っているライブラリは aider という PHP ファイルです（aider.php は元の curl-lib ではなく、私が簡略化したバージョンです）。また、index.php と engine.php の二つが、このプログラムの UI になっています。使いやすさを考えて作りました XD

このプログラムはオブジェクトとして書いてあるので、使い方がわからない場合は index.php と engine.php の二つのファイルを参考にしてください。
<ul>
	<li>ソースコードのダウンロード：Xun6 ｜ <a href="http://www.4shared.com/file/NS8svxaU/getreallink.html ">4Shared</a> ｜<a href="http://www.box.net/shared/8kt0ptgslb">Box.net</a></li>
	<li>curllib のダウンロード先：Xun6 ｜ <a href="http://www.4shared.com/file/S04ZtMOD/curllib.html ">4Shared </a>｜<a href="http://www.box.net/shared/7hqe72dse2">Box.net</a></li>
</ul>
<h2>curllib に含まれるファイル：</h2>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182758.jpg"><img class="alignnone size-large wp-image-4438" title="2011-01-25_182758" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182758-520x454.jpg" alt="" width="520" height="454" /></a>
