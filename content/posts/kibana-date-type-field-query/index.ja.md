---
title: "Kibana で日付型フィールドを使ってクエリする"
date: 2017-01-19T02:18:24
slug: "kibana-date-type-field-query"
tags: ["Kibana", "Elasticsearch"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2017/01/Kibana-6.png"]
draft: false
---

Kibana で特定の期間のデータを検索したいとき、まず思い浮かぶのは Kibana に標準で付いている Time Picker です。本当に便利なツールです。ただ、データによっては日付フィールドが複数あり、Time Picker ではなく Query で絞り込まなければならない場合があります。たとえばメールのデータでは、送信・開封・クリックのたびに私のサーバーへログが送られてきます。そのため時刻が 2 種類あることになります。メールが送られた時刻と、開封やクリックといったイベントが発生した時刻です。こうした場合は、検索バーで日付フィールドを使って検索する必要が出てきます。


<!--more-->

<h2>Time Picker</h2>
まずは改めて Time Picker を紹介しましょう。ほとんどの場合、時間の制限は Time Picker で解決できます。Time Picker は Kibana の右上に表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana.png"><img class="alignnone size-large wp-image-7272" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-1024x460.png" alt="" width="660" height="296" /></a>

Time Picker にはさまざまな時間の選択肢があります。特に注意したいのは「Today」です。これは今日のデータという意味です。今が午後 3 時なら、00:00 から 15:00 までのデータしか表示されません。「Last 24 hours」は、今から過去 24 時間をさかのぼる意味です。この 2 つは一見似ていますが、実は違います。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-1.png"><img class="alignnone size-large wp-image-7273" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-1-1024x520.png" alt="" width="660" height="335" /></a>

また、Timeline ではマウスで直接時間を選択することもできます。例を見てください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/kibana.gif"><img class="alignnone size-full wp-image-7274" src="{{< param imageBase >}}/wp-content/uploads/2017/01/kibana.gif" alt="" width="917" height="310" /></a>

え、Time Picker や Timeline が見えない？ 心配はいりません。それは Index を作成したときに、Kibana へ日付フィールドを指定していなかっただけです。Index を作成するときは、下の図のフィールドに注意してください。見落とさないように！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-2.png"><img class="alignnone size-full wp-image-7275" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-2.png" alt="" width="712" height="652" /></a>
<h2>Query with Date Field</h2>
Time Picker では解決できず、どうしても Query で処理しなければならない場合は、たとえば subject: "Hi" のような書き方と同じように、次のように書きます。
<pre>msg.ts:[2017-01-01T00:00:00.000Z TO 2017-01-03T00:00:00.000Z]</pre>
これは msg.ts フィールドが 2017/1/1 から 2017/1/3 までのすべてのデータを探す指定です。そのまま Query の欄に入力すれば OK です。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-3.png"><img class="alignnone size-full wp-image-7276" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-3.png" alt="" width="1010" height="483" /></a>

ほかにも Kibana Filter を使う方法があります。Filter では Elasticsearch DSL の構文を使えます。ただ、Kibana Filter は少し分かりにくい場所にあるため、やや複雑です。以下の説明を参考にしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-5.png"><img class="alignnone size-large wp-image-7278" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-5-1024x826.png" alt="" width="660" height="532" /></a>

すると、検索バーに下の図のようなものが表示されます。「編集」をクリックして、構文を貼り付けてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照_2017-01-19_上午2_15_48.jpg"><img class="alignnone size-full wp-image-7279" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照_2017-01-19_上午2_15_48.jpg" alt="" width="911" height="457" /></a>
<pre>{
  "query": {
    "range": {
      "msg.ts": {
        "gte": 1483200000000,
        "lte": 1483372800000
      }
    }
  }
}</pre>
Timestamp はミリ秒単位です。
