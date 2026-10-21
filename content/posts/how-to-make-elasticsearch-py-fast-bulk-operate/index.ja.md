---
title: "elasticsearch.py を高速化する方法（バルク操作）"
date: 2016-12-08T00:57:01
slug: "how-to-make-elasticsearch-py-fast-bulk-operate"
tags: ["Python", "Elasticsearch"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-1.png"]
draft: false
---

Python で Elasticsearch を操作するなら、公式の <a href="https://elasticsearch-py.readthedocs.io/en/master/">elasticsearch.py</a> を入れることになるのは避けられません。最近、Python で Email Log を受け取って Elasticsearch に書き込む処理を作っていて、共有したい知見がかなりたまりました。AWS Lambda は実行時間で課金されるため、Lambda 関数を書くときは秒単位で気を遣います。0.5 秒を超えるたびに頭を抱えていました。そこで、最初は .index で1件ずつ挿入し、次に streaming_bulk を使い、最後はどうにも我慢できず parallel_bulk と streaming_bulk を組み合わせました。ここでは、これらの方法の違いと踏んだ落とし穴についてお話しします！


<!--more-->

<h2>1件ずつの追加</h2>
最初は、Elasticsearch にデータを挿入するとなると、es.index() を思い浮かべてループで回すでしょう。1件だけ挿入するならそれで問題ありません。しかし N 件を挿入する必要があるなら、これは非常によくない方法です！ es.index() を呼ぶたびに、Python はデータを Elasticsearch に1回ずつ送信します。10件あれば10回送信することになります。1件を送信して Elasticsearch の処理完了を待つのに 100ms かかるなら、10件で 1 秒かかります。ですから複数件の場合、es.index() はあまりおすすめできません。

<strong>サンプルコード</strong>
<pre>from elasticsearch import Elasticsearch

es = Elasticsearch("http://127.0.0.1:9200/")

es.index(index="test-index", doc_type='tweet', id=1, body={
  "name": "Karl",
  "email": "karl@gmail.com"
})</pre>
<h2>シングルスレッドのバルク追加</h2>
実は Elasticsearch 自体がバルク操作をサポートしています。リスト全体をまとめて Elasticsearch に送り、処理を任せることができます。書き込み、更新、削除のいずれにも使えます。個別に es.index() を呼ぶよりずっと速くなります！

ただし、よく見ると、データ量が増えると実行速度はやはり遅くなっていきます。Elasticsearch サーバー自体はまとめて処理できますが、ネットワーク転送にも時間がかかるためです。データ量が増えると、送信は1回で済んでも、その1回のデータが 30MB になることもあり、やはり遅くなってしまいます。それでも私は満足できませんでした。

バルク処理では、各データ（Dict）に _type と _index を設定し、リストにまとめて Elasticsearch に送信します。あとは Elasticsearch が処理してくれます。

<strong>サンプルコード</strong>
<pre>from elasticsearch import Elasticsearch 
from elasticsearch import helpers as es_helpers

es = Elasticsearch('http://127.0.0.1:9200')

data = [
  {'name': 'Karl 1', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 1},
  {'name': 'Karl 2', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 2},
  {'name': 'Karl 3', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 3}
]

es_helpers.bulk(es, data)</pre>
<h2>マルチスレッドのバルク追加</h2>
最後の決戦は、複数のスレッドで並列に Elasticsearch へデータを送信する方法です。データ量が多いときは、確かにシングルスレッドよりずっと速くなります。しかしデータ量が少ないと、シングルスレッドより遅くなることもわかります。スレッドを作成する処理自体に時間がかかるからです。データが10件しかないなら、元のスレッドで送信すれば 300ms ほどで済むかもしれません。しかし5件ごとにスレッドを割り当てると、600ms かかることもあります。

マルチスレッドには小さな落とし穴があります。parallel_bulk を実行しても、実は何も起きません。データは実際には挿入されていません。parallel_bulk はジェネレーターを返すので、そのジェネレーターを一度最後まで回して初めて、データが挿入されるのです。最初は気づかず、そのせいで1時間分のデータを失いました。詳細は以下のサンプルをご覧ください。

参考文献：<a href="https://github.com/elastic/elasticsearch-py/issues/336">elasticsearch2.1,paralle_bulk don't work,why?</a>

<strong>サンプルコード</strong>
<pre>from collections import deque

from elasticsearch import Elasticsearch 
from elasticsearch import helpers as es_helpers

es = Elasticsearch('http://127.0.0.1:9200')

data = [
 {'name': 'Karl 1', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 1},
 {'name': 'Karl 2', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 2},
 {'name': 'Karl 3', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 3},
]

# chunk_size は件数の単位です
deque(es_helpers.parallel_bulk(es, data, thread_count=4, chunk_size=50), maxlen=0)</pre>
ここで deque について少し紹介します。本来は双方向リストを作るためのものですが、ここでは少し工夫して、その高い性能を利用してジェネレーターを消費する方法として使っています。その働きは、次のコードと同じです。ジェネレーターを最後まで1回通しています。
<pre>for response in es_helpers.parallel_bulk(es, data, thread_count=4, chunk_size=50):
  pass</pre>
参考文献：<a href="https://docs.python.org/2/library/itertools.html#recipes">https://docs.python.org/2/library/itertools.html#recipes</a>
<h2>結論！</h2>
最も良い方法は、しきい値を設定することです。データ件数がしきい値より多ければマルチスレッドを使い、少なければシングルスレッドのバルク操作を使います。しきい値の具体的な値は、実際の状況を観察して判断する必要があります。私の場合は Mandrill Email Webhook を処理しており、しきい値を 100 件に設定しました。100 件を超えたらマルチスレッドで処理し、それ以下ならシングルスレッドで十分速いです。
