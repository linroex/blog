---
title: "Python の出力が tee で表示されない理由"
date: 2018-06-16T01:12:08
slug: "why-python-no-output-with-tee"
tags: ["Python", "Linux"]
categories: ["Programming"]
draft: false
---

最近 Python で Slack Bot を作りました。横着をして、log のメッセージを print でそのまま出力し、tee コマンドでファイルに保存していました。こうすると、コンソールで動作の情報を見ながら、同じ情報をファイルにも残せます。ところが Python の print() と tee を組み合わせて使うと、指定した log ファイルの中身がよく空っぽになったり、本来すぐ出るはずのメッセージがずっと後になって出てきたりしたのです。調べてみると、Python の print 関数は出力先を判断していることがわかりました。出力先が Shell であればすぐに出力されますが、そうでなければ一度 Buffer に溜めておき、バッファがいっぱいになってからまとめて出力されます。つまり Python を tee と組み合わせて使うと、このバッファの問題にぶつかり、期待した出力がすぐには画面にもファイルにも現れないのです。


<!--more-->


Python を実行するとき、元々の書き方は次のとおりでした：
<pre><code>python bot.py | tee log.txt
</code></pre>
Python は出力先を自動で判断するので、出力先が shell ではなく tee だとわかると、メッセージをバッファに溜めてしまいます。そのため log.txt を開いても、中身は真っ白でした。

Python Stdout Buffer の問題を避けるには、次のように書き換えます：
<pre><code>python -u bot.py | tee log.txt
</code></pre>
