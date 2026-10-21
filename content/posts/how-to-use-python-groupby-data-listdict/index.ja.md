---
title: "Python の GroupBy でデータをグループ化する方法（List+Dict）"
date: 2016-12-07T01:13:27
slug: "how-to-use-python-groupby-data-listdict"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

Python でデータを扱うとき、ある Key で GroupBy（グループ化）するのはよくある作業です。たとえば Email Log を分析するときに、件名ごとの送信件数を知りたい場合や、件名ごとの Email Provider の上位5件を一覧にしたい場合などです。データベースがあれば、これは非常に簡単な作業です。しかし、データをデータベースに入れたくない場合はどうすればよいでしょうか。

そうした場合、非常に強力なデータ処理ライブラリである Pandas がおすすめですが、実は Python 本体にも GroupBy が用意されています！


<!--more-->


itertools モジュールには groupby というメソッドがあります。コレクションを渡し、Key を指定すると、同じ Key のデータを1つのリストのようなもの（ただし実際にはリストではありません）にまとめてくれます。その後は、数を数えるか（同じ件名のメールの送信件数）、同じ Key のデータをそれぞれ一覧にする（件名ごとの Email Provider トップ5）ことができます。

ただし、GroupBy の前に、グループ化したい Key でデータを並べ替えておく必要があります。詳しい方法は以下のコードを参照してください（Python 3）。ここでは lambda を使って、Key にしたいフィールドを取得しています。
<pre><span style="font-family: Courier;">from itertools import groupby</span>

<span style="font-family: Courier;">dicts = [</span>
<span style="font-family: Courier;"> {'name': 'A', 'age': 16},</span>
<span style="font-family: Courier;"> {'name': 'B', 'age': 18},</span>
<span style="font-family: Courier;"> {'name': 'C', 'age': 17},</span>
<span style="font-family: Courier;"> {'name': 'D', 'age': 16},</span>
<span style="font-family: Courier;"> {'name': 'E', 'age': 17}</span>
<span style="font-family: Courier;">]</span>

<span style="font-family: Courier;">dicts.sort(key=lambda d : d['age'])</span>

<span style="font-family: Courier;"># Group By Age Field</span>
<span style="font-family: Courier;">for key, groups in groupby(dicts, lambda d : d['age']):</span>
<span style="font-family: Courier;"> # print(list(groups))</span>
<span style="font-family: Courier;"> # print(len(list(groups)))</span>
<span style="font-family: Courier;"> print(key)</span>

<span style="font-family: Courier;"> for item in groups:</span>
<span style="font-family: Courier;">   print(item)</span>
<span style="font-family: Courier;"> print('-----')</span></pre>
<div></div>
