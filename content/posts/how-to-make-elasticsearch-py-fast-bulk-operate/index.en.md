---
title: "How to Make elasticsearch.py Fast (Bulk Operations)"
date: 2016-12-08T00:57:01
slug: "how-to-make-elasticsearch-py-fast-bulk-operate"
tags: ["Python", "Elasticsearch"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-1.png"]
draft: false
---

When you work with Elasticsearch in Python, you will inevitably install the official <a href="https://elasticsearch-py.readthedocs.io/en/master/">elasticsearch.py</a> library. Recently, while using Python to receive email logs and write them into Elasticsearch, I picked up quite a few lessons worth sharing. As everyone knows, AWS Lambda charges by execution time, so when writing Lambda functions every second counts. Anything that ran over 0.5 seconds had me in agony. So I went from inserting records one at a time with .index, to using streaming_bulk, and finally, unable to stand it anymore, mixing parallel_bulk with streaming_bulk. Here I will talk about the differences between these approaches and the pitfalls I ran into!


<!--more-->

<h2>Single Inserts</h2>
At first, when you want to insert data into Elasticsearch, you will probably think of es.index() and run it in a loop. If you only insert one record, that is fine. But if you need to insert N records, this is a very bad approach! The reason is that every call to es.index() sends the data to Elasticsearch separately. With ten records, that is ten requests. If sending one record and waiting for Elasticsearch to finish takes 100 ms, then ten records take 1 s. So with multiple records, es.index() is strongly discouraged.

<strong>Example code</strong>
<pre>from elasticsearch import Elasticsearch

es = Elasticsearch("http://127.0.0.1:9200/")

es.index(index="test-index", doc_type='tweet', id=1, body={
  "name": "Karl",
  "email": "karl@gmail.com"
})</pre>
<h2>Single-Threaded Bulk Inserts</h2>
Elasticsearch itself supports bulk operations. You can send an entire list to Elasticsearch and let it handle the work. This works for inserts, updates, and deletes. It is much faster than calling es.index() for each record!

However, if you look closely, you will notice that as the data volume grows, execution still becomes very slow. Although the Elasticsearch server can process a batch at once, network transfer also takes time. With a large data volume, even though you only send the data once, that single request might be 30 MB, and it will still slow things down. I was still not satisfied.

For bulk processing, you need to set _type and _index on each record (Dict), organize them into a list, and send it to Elasticsearch, and it will take care of the rest.

<strong>Example code</strong>
<pre>from elasticsearch import Elasticsearch 
from elasticsearch import helpers as es_helpers

es = Elasticsearch('http://127.0.0.1:9200')

data = [
  {'name': 'Karl 1', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 1},
  {'name': 'Karl 2', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 2},
  {'name': 'Karl 3', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 3}
]

es_helpers.bulk(es, data)</pre>
<h2>Multi-Threaded Bulk Inserts</h2>
The final showdown is sending data to Elasticsearch in parallel with multiple threads. When the data volume is large, this is indeed much faster than a single thread. But when the data volume is small, you will find it is even slower than a single thread. This is because creating threads itself takes a lot of time. If you have only 10 records, sending them in the original thread might take 300 ms. But splitting them across threads, with one thread per 5 records, might take 600 ms.

There is a small pitfall with multithreading. After you run parallel_bulk, nothing actually happens. The data is not really inserted. parallel_bulk returns a generator, and you have to iterate over that generator once before the data is actually inserted. I did not notice this at first, and it cost me an hour's worth of data. See the example below for details.

Related reading: <a href="https://github.com/elastic/elasticsearch-py/issues/336">elasticsearch2.1,paralle_bulk don't work,why?</a>

<strong>Example code</strong>
<pre>from collections import deque

from elasticsearch import Elasticsearch 
from elasticsearch import helpers as es_helpers

es = Elasticsearch('http://127.0.0.1:9200')

data = [
 {'name': 'Karl 1', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 1},
 {'name': 'Karl 2', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 2},
 {'name': 'Karl 3', 'email': 'karl@gmail.com', '_type': 'user', '_index': 'user_table', '_id': 3},
]

# chunk_size is counted in number of records
deque(es_helpers.parallel_bulk(es, data, thread_count=4, chunk_size=50), maxlen=0)</pre>
A quick word on deque: its original purpose is to build a double-ended list. Here we are taking a shortcut and using its high performance as a way to consume the generator. It has the same effect as the code below, which goes through the generator once in full:
<pre>for response in es_helpers.parallel_bulk(es, data, thread_count=4, chunk_size=50):
  pass</pre>
Related reading: <a href="https://docs.python.org/2/library/itertools.html#recipes">https://docs.python.org/2/library/itertools.html#recipes</a>
<h2>The Final Verdict!</h2>
The best approach is to set a threshold. If the number of records is above the threshold, use multithreading. If it is below, use single-threaded bulk operations. The exact threshold depends on your situation and needs to be determined by observation. For my case, processing Mandrill Email Webhooks, I set the threshold at 100 records. If there are more than 100 records, I use multithreading. Otherwise, a single thread is fast enough.
