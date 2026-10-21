---
title: "Python で漢語ピンインを処理する（氏名・住所の中国語→英語変換）"
date: 2016-12-09T00:05:43
slug: "python-chinese-to-pinyin-conversion"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

今日は同僚の手伝いで、大量の氏名と住所を中国語から英語に変換する必要が出てきたので、Python で漢語ピンインをどう扱えばよいかを調べてみました。まさか、一件ずつ郵便局のフォームやウェブサイトにコピーしていくわけにもいきませんからね（笑）。結果は意外なほど簡単でした。住所の翻訳は各社の Geocoder API で処理でき、漢語ピンインはサードパーティのライブラリを使えます。翻訳の精度もなかなか良好です。完璧とは言えませんが、人の手による「工人智慧」（「人工智慧」（AI）のもじり）と組み合わせれば、小さな欠点は十分にカバーできます。最後の小さな欠点を解消するには、膨大なリソースと技術を投入し、機械学習の手法を導入する必要があるでしょう。（実はいつか試してみたいと思っています。中国語圏では使える便利なツールが本当に少ないですから。）


<!--more-->

<h2>氏名の中国語→英語変換</h2>
氏名については、Python ライブラリの python-pinyin を使うことができます。一字多音の文字もうまく処理してくれますし、複数の形式で出力することもできます。漢語ピンインだけでなく、注音符号（ボポモフォ）まで出力できるほどです……。ただ、この変換結果は必ずしもパスポートに載っている名前とは一致しないことに注意してください。私の場合、パスポートはウェード式（Wade-Giles）で表記されているので、用途に応じて使えるかどうかを判断する必要があります。今日は荷物を送るだけなので問題ありませんでしたが、渡航書類の申請や航空券の購入などには、自分で試すことはおすすめしません。JavaScript 版や Go 版も公開されていますよ！

ただし、氏名の翻訳には細かい注意点も多くあります。例えば、姓と名の順番を逆にしてしまうことや、先住民族の漢字名をどう翻訳するかといった点です。これらは氏名を翻訳するときに特に注意すべき部分です。

GitHub：<a href="https://github.com/mozillazg/python-pinyin">https://github.com/mozillazg/python-pinyin</a>

サンプルコード：
<pre>from pypinyin import pinyin, lazy_pinyin
import pypinyin

# 一般的なパスポートで使われている形式です
print(pinyin("貝殼放大", 0))

print(pinyin("貝殼放大", 1))
print(pinyin("貝殼放大", 2))</pre>
<h2>住所の中国語→英語変換</h2>
住所の翻訳はもっと複雑です。住所を解析することだけでも大きな問題です。同じ漢語ピンインを使うとはいえ、氏名と同じように直接訳してしまうと、荷物は確実に届きません。さらに、住所の解析問題を解決できたとしても、ユーザーは必ず変わった住所を入力したり、誤字を入れたりします。例えば、次のようなものです：
<ul>
 	<li>基隆路2段15號台科大資管系（基隆路2段15号 台科大資管系）</li>
 	<li>基隆路二段15號3樓(男宿林先生)（基隆路二段15号3階、男子寮の林さん）</li>
</ul>
コンピューターにとって、これらを判断するには、やはり人工知能（AI）が必要なのでしょう……。でも大丈夫！ Google という心強い味方があります。実は Google、百度（Baidu）、Yahoo などの企業は、いわゆる Geocoder API を提供しています。入力された住所を解析し、緯度・経度や英語の住所などの情報を返してくれます。HTTP API のため少し遅く、だいたい1件につき1秒ほどかかりますが、十分実用的です。また注意点として、こうした API の多くは利用枠に制限があり、超過すると料金を支払う必要があります。

私のやり方は、翻訳後に自分の目で確認することです。コンピューターにできることには限りがありますから。私の経験では、だいたい9割は正しく翻訳されます。さらに、荷物には中国語と英語の両方の住所を書いておくのが最も安全な方法です、えへへ。

<strong>注意：住所に階数が含まれている場合、Google Geocode API では翻訳されないことがあります。</strong>

<strong>関連情報</strong>
<ul>
 	<li><a href="https://developers.google.com/maps/documentation/geocoding/intro?hl=zh-tw">Google Geocoding API Docs</a></li>
 	<li><a href="http://api.map.baidu.com/lbsapi/webservice-geocoding.htm">百度 Geocoding API Docs</a></li>
 	<li><a href="http://www.jianshu.com/p/59a7431a552d">怎么样用Python实现地理编码（Python でジオコーディングを実装する方法、簡体字の記事）</a></li>
</ul>
さらに、geocoder という素晴らしい Python ライブラリもあります。各社の Geocoding API をまとめて扱えるようにしてくれるもので、Baidu、Google、Mapbox、Yahoo など数十社に対応しています。各社の解析の得意分野はそれぞれ異なります。例えば中国の住所であれば、Google で解析しようとは思わないでしょう？ py-geocoder を使えば、関数を呼び出してキーを入力するだけで、必要な情報が返ってきます！！

注意：翻訳の速度は遅いですが、マルチスレッドで実行するのは絶対にやめてください！ すぐに API プロバイダーからブロックされてしまうかもしれません……
<ul>
 	<li>GitHub：<a href="https://github.com/DenisCarriere/geocoder/">https://github.com/DenisCarriere/geocoder/</a></li>
 	<li>Docs：<a href="http://geocoder.readthedocs.io/">http://geocoder.readthedocs.io/</a></li>
</ul>
<strong>サンプルコード：</strong>
<pre>import geocoder

addr = geocoder.google("台北市大安區基隆路四段5號6樓")

# 英語の住所
print(addr.address)

print(addr.geojson)
print(addr.postal)</pre>
