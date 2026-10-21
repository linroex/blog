---
title: "ループの中でリストの要素を削除してはいけない"
date: 2017-01-12T20:35:34
slug: "python-dont-delete-list-in-loop"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

「何度踏んでも懲りない愚かな行為」を、また繰り返してしまいました。間違った書き方も一度経験すれば身につくはずだと思っていたのですが、今日も会社で3時間も地雷を踏んでしまいました。どこに問題があるのかさっぱりわからず、最後にあらためてコードを丁寧に読み直したところ……また同じ問題でした。一言でまとめると、「ループの中で配列の要素を削除してはいけない」です。


<!--more-->


次のコードを見て、どんな問題が起こるか考えてみてください：
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]

for i, value in enumerate(stus):
  if stus[i]['name'] == "C":
  del stus[i]

print(stus)</pre>
name="C" のものをすべて削除したいのですが、結果を見ると C は1つしか削除されていません。

原因がわかりましたか？ 実は `i` が関係しています。`stus[i]` を削除すると配列の長さが変わります。`i = 3` のときに `stus[3]` を削除すると、長さが変わったため、元の `suts[4]` が `suts[3]` に繰り上がります（後ろから前へ移動します）。しかし、ループの `i` は増え続けるため、ループは処理がすべて終わったと判断してしまいます。ところが実際には、後ろのデータが前に詰められていたのです。

同じ原理で、予期しない問題がさまざまに起こります。そのため、ループの中で配列の要素を削除するのは避けることをおすすめします。どうしても必要な場合は、次の2つの書き方を試してみてください：

リスト内包表記を使うか、同様の方法でフィルターを書く方法です：
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]

stus = [stu for stu in stus if stu['name'] != "C"]</pre>
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]
new_stu = []

for i, stu in enumerate(stus):
  if stu['name'] != "C":
    new_stu.append(stu)

print(new_stu)</pre>
