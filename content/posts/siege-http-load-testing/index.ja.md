---
title: "Siege - HTTP の負荷テストに便利なツール"
date: 2017-01-06T22:54:59
slug: "siege-http-load-testing"
tags: ["Siege", "Load Testing"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2017/01/螢幕快照-2017-01-06-下午10.57.02.jpg"]
draft: false
---

バックエンドエンジニアをしていると、Webサイトの負荷テストをしたくなることは珍しくありません。負荷テストを行うと、サーバーのアーキテクチャがどれくらい安定しているかを把握でき、ある程度はプログラムの性能も確認できます。代表的なツールには ab や JMeter などがあります。手作業で負荷テストをする人はいないと思います（笑）。今日は、機能が充実していながらシンプルな HTTP 負荷テストツール Siege を紹介します。コマンドラインから実行でき、Webサイトや API の負荷への耐性を測定できます。ただし、性能テストには多くの側面があるので、負荷テストに通ったからといって完璧だとは限らないことにも注意してください！


<!--more-->

<ul>
 	<li>GitHub：<a href="https://github.com/JoeDog/siege">https://github.com/JoeDog/siege</a></li>
 	<li>ドキュメント：<a href="https://www.joedog.org/siege-manual/">https://www.joedog.org/siege-manual/</a></li>
</ul>
Siege のインストールはとても簡単です。Mac なら brew、Ubuntu なら apt-get を使えます。
<pre>brew install siege</pre>
よくある要件は、N 個のスレッドを同時に動かし、それぞれのスレッドが M 回アクセスするというものです。さらに、アクセスごとに一定の秒数の間隔を空けることもできます。このようにしてサーバーやWebサイトの負荷耐性をテストできます。次のコマンドを参考にしてください。

siege -c 100 -r 200 -d1 "http://google.com.tw"
<ul>
 	<li>-c 100 は、100 個のスレッドが同時に実行されることを意味します</li>
 	<li>-r 200 は、各スレッドが 200 回リクエストを送ることを意味します</li>
 	<li>-d1 は、各スレッドのリクエストを 1 秒間隔で送ることを意味します。-d だけを指定すると、間隔はランダムになります。</li>
</ul>
<img class="alignnone size-large wp-image-7200" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-06-下午10.29.25-1024x841.jpg" alt="" width="660" height="542" />

上のように、Siege は実行の経過と、各 HTTP リクエストに対するレスポンスを表示します。ここでは、レスポンス時間が遅くなる傾向がないか、404 や 500 などの異常が発生していないかを確認できます。サーバーのメモリや CPU などの変化も確認できます。ただし、レスポンス時間の低下（やその他の異常）が必ずしもプログラムの問題とは限らない点に注意してください。このように頻繁にアクセスすると、ファイアウォールがリクエストをブロックしたり、IP アドレスを直接遮断したりすることも多いため、原因は自分で判断する必要があります。

テスト対象によっては、GET 以外の HTTP メソッド（POST、PUT など）を使う必要があります。たとえば API の場合です。Siege のドキュメントには書かれていませんが、実は簡単に指定できます。
<pre>siege -c 10 -r 10 "http://yahoo.com.tw/ POST"
siege -c 10 -r 10 "http://yahoo.com.tw/ DELETE"</pre>
URL の後ろにメソッドを付けるだけです。ただし、URL の末尾は必ずスラッシュで終わらせてください。たとえば、次のような書き方はエラーになります。
<pre>siege -c 10 -r "http://yahoo.com.tw POST"</pre>
また、バックエンドに処理させるためにデータを送る必要がある場合もあります。その場合は、HTTP メソッドの後ろに直接書くことができます。たとえば次のようになります。
<pre>siege -c 10 -r 'http://yahoo.com.tw POST {"name": "karl"}'</pre>
GET の場合は、URL にそのまま付けることができます。たとえば次のようになります。
<pre>siege -c 10 -r 'http://yahoo.com.tw?name=karl'</pre>
テストが終わると、次のような結果が参考として表示されます。テストに要した合計時間、成功（失敗）したトランザクションの数、平均レスポンス時間などが含まれます。
<pre>Transactions: 200 hits
Availability: 100.00 %
Elapsed time: 9.57 secs
Data transferred: 0.00 MB
Response time: 0.42 secs
Transaction rate: 20.90 trans/sec
Throughput: 0.00 MB/sec
Concurrency: 8.74
Successful transactions: 200
Failed transactions: 0
Longest transaction: 1.10
Shortest transaction: 0.27</pre>
