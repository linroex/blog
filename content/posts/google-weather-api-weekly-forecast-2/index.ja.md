---
title: "Google Weather API - 1週間分の天気情報を取得する"
date: 2011-02-04T00:48:56
slug: "google-weather-api-weekly-forecast-2"
tags: ["Google API", "PHP"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_004255.jpg"><img class="size-large wp-image-4648 aligncenter" title="2011-02-04_004255" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_004255-520x416.jpg" alt="" width="520" height="416" /></a></p>
<strong>Google Weather API</strong>は今日見つけたものです。最近開発しているPlurk-botに天気を調べる機能を追加したいと思い、天気情報を取得する方法をネットで探していました。当初は、中央気象局のWebページを読み込んで、そこにあるデータを解析するつもりでした。しかし、GoogleとYahooの両方が天気のAPIを提供していることがわかりました。その中で私は、Google Weather APIのほうが気に入りました。戻り値がXML形式で解析しやすいからです。一方、Yahooは HTML を返してきます……。また、Google Weather APIでは都市名を直接指定する機能もあります。たとえば台北市の天気を調べたいときは、APIに「Taipei」をそのまま渡せばOKです。一方、Yahooの天気APIはそれほど簡単ではありません。都市のコードを入力する必要があるため、Yahoo APIを使うには、事前に調べたい都市のコードを知っておく必要があります。
<h2>
<!--more-->
Google Weather APIの特徴</h2>
<ul>
	<li>都市名（中国語・英語どちらでも可）で検索できる</li>
	<li>緯度・経度で検索できる</li>
	<li>1週間分の最高気温、最低気温、雲の状況などのデータを返す</li>
	<li>戻り値はXML形式で、エンコーディングはBig5</li>
</ul>
<h2>Google Weather APIの形式</h2>
http://www.google.com/ig/api?hl=zh-tw&amp;weather=<strong>city_name</strong>

<strong>city_name</strong>の部分には、検索したい都市名、または緯度・経度を入力できます。

<strong>例：台北市の天気を調べる</strong>

http://www.google.com/ig/api?hl=zh-tw&amp;weather=<strong>Taipei</strong>

<strong>
</strong>
<h2>PHPの例</h2>
サンプルファイルのダウンロード先：Xun6 ｜<a href="http://www.4shared.com/file/nLlIIABH/google_weather_api.html ">4Shared </a>｜ <a href="http://www.box.net/shared/godst1y4q7">Box.net</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_003925.jpg"><img class="alignnone size-large wp-image-4649" title="2011-02-04_003925" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_003925-520x218.jpg" alt="" width="520" height="218" /></a>
