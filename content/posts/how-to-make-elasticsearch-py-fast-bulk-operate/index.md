---
title: "How to make elasticsearch.py Fast (Bulk Operate)"
date: 2016-12-08T00:57:01
slug: "how-to-make-elasticsearch-py-fast-bulk-operate"
tags: ["Python", "Elasticsearch", "AWS Lambda"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-1.png"]
---

用 Python 操作 Elasticsearch 時不免俗的肯定會安裝官方推出的 <a href="https://elasticsearch-py.readthedocs.io/en/master/">elasticsearch.py</a>，最近在用 Python 接收 Email Log 並寫入 Elasticsearch 時有蠻多心得可以分享的，大家都知道 AWS lambda 是用執行時間算錢的，所以在撰寫 AWS Lambda 時我可說是分秒必爭，看到執行超過 0.5 秒就各種吐血，所以從最開始的 .index 一筆一筆插入資料到 Elasticsearch，到後來用 streaming_bulk 處理，最後受不了用 parallel_bulk 混合 streaming_bulk 操作，以下就來聊聊這幾種方式的差異以及地雷吧！


<!--more-->

<h2>單筆新增</h2>
最開始，想要插入資料到 Elasticsearch 大家肯定會想到 es.index() 這東西，然後用迴圈去跑，如果你一次只插入一筆資料，這樣做當然沒問題，但如果一次需要插入 N 筆資料，這就是一個很糟的方式！ 原因是每次執行 es.index() ，Python 都會傳送資料給 Elasticsearch 一次，如果有十筆資料就傳送十次，如果傳送一筆並等 Elasticsearch 處理完要 100ms，十筆資料就需要 1s，所以多筆資料時十分不推薦 es.index() 。

<strong>範例程式碼</strong>
<pre>from elasticsearch import Elasticsearch

es = Elasticsearch("http://127.0.0.1:9200/")

es.index(index="test-index", doc_type='tweet', id=1, body={
  "name": "Karl",
  "email": "karl@gmail.com"
})</pre>
<h2>單執行緒批次新增</h2>
其實 Elasticsearch 本身有支援批次操作，你可以把一整個 List 的東西傳送給 Elasticsearch 讓他自己去處理，不管是寫入、更新或刪除都可以這麼做，操作時間會比 es.index() 的單筆操作快上許多！

但，如果你仔細觀察會發現，當資料數量增加時，執行速度依舊會變得很慢，這是因為雖然 Elasticsearch Server 本身能夠批次處理，但網路傳輸也是需要時間的，當資料數量增加時，雖然只要傳送一次資料，但這一次資料卻可能是 30MB，速度依舊會慢下來，我依舊不滿足。

如果是批次處理的話，你需要在每筆資料（Dict）裡面都設定 _type 跟 _index，然後整理成一個 List 傳送到 Elasticsearch 他就會幫你處理。

<strong>範例程式碼</strong>
<pre>from elasticsearch import Elasticsearch 
from elasticsearch import helpers as es_helpers

es = Elasticsearch('http://127.0.0.1:9200')

data = [
  {'name': 'Karl 1', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 1},
  {'name': 'Karl 2', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 2},
  {'name': 'Karl 3', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 3}
]

es_helpers.bulk(es, data)</pre>
<h2>多執行緒批次新增</h2>
最後的大決，就是用多個執行緒平行化的傳送資料到 Elasticsearch，這樣做在資料量大的時候確實單執行緒快很多，但當資料量少時，你會發現速度反而變得比單執行緒還要慢，這是因為執行緒的建立本身是很耗費時間的，如果你只有 10 筆資料，放在原本的執行緒裡傳送可能只要 300ms，但放到多執行緒裡，每 5 筆一個執行緒，反而可能要 600ms。

多執行緒處理有個小地雷，當你執行完 parallel_bulk 以後其實不會發生任何事情，資料不會真的新增進去，parallel_bulk 會回傳一個 generator，你必須把這個產生器跑過一次，才會真的新增進去... 這東西一開始沒注意到，害我掉了一小時的資料，詳細可以看下面的範例：

參考閱讀 <a href="https://github.com/elastic/elasticsearch-py/issues/336">elasticsearch2.1,paralle_bulk don't work,why?</a>

<strong>範例程式碼</strong>
<pre>from collections import deque

from elasticsearch import Elasticsearch 
from elasticsearch import helpers as es_helpers

es = Elasticsearch('http://127.0.0.1:9200')

data = [
 {'name': 'Karl 1', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 1},
 {'name': 'Karl 2', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 2},
 {'name': 'Karl 3', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 3},
]

# chunk_size 是以筆數為單位
deque(es_helpers.parallel_bulk(es, data, thread_count=4, chunk_size=50), maxlen=0)</pre>
需要特別介紹一下 deque 這東西，其實他本意是建立一個雙向的 List，但這邊我們有點取巧，利用他高效能的優勢來作為 Generator 的 Consume Method，他的使用其實就和下面的程式碼目的相同（把 Generator 全部使用過一次）：
<pre>for response in es_helpers.parallel_bulk(es, data, thread_count=4, chunk_size=50):
  pass</pre>
參考閱讀 <a href="https://docs.python.org/2/library/itertools.html#recipes">https://docs.python.org/2/library/itertools.html#recipes</a>
<h2>大決！</h2>
其實最好的方式，是設定臨界值，如果資料筆數大於臨界值就使用多執行緒，如果小於臨界值，就使用單執行緒批次操作，至於臨界值是多少就需要你觀察實際情況判斷，以我處理 Mandrill Email Webhook 來說我是設定 100 筆，如果超過 100 筆資料就用多執行緒處裡，否則用單執行緒就足夠快了。
