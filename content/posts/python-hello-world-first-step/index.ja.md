---
title: "【Python】Python の世界への第一歩：HelloWorld（文字の出力とコメントの書き方）"
date: 2011-02-20T09:00:54
slug: "python-hello-world-first-step"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056.jpg"><img class="size-large wp-image-315 aligncenter" title="2011-02-18_231056" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056-540x393.jpg" alt="" width="540" height="393" /></a></p>
多くのプログラミング言語の入門書では、最初の練習プログラムは HelloWorld です。HelloWorld とは、プログラムに「HelloWorld」と出力させることです。この記事では、最初の Python プログラムの書き方を紹介し、Python の基本的な使い方もあわせて簡単に解説します。


<!--more-->
1.【helloworld.py】という名前のファイルを作成します。拡張子は必ず .py にしてください。

.py は Python のソースコード専用の拡張子です。C++ の .cpp や Java の .java のようなものだと考えてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224908.jpg"><img class="alignnone size-large wp-image-310" title="2011-02-18_224908" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224908-540x502.jpg" alt="" width="540" height="502" /></a>

2.先ほど作成したファイルを右クリックして、【Edit with IDLE】を選択します。

IDLE は Python 公式が提供している IDE ツールです。個人的にはなかなか使いやすいと思います～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225006.jpg"><img class="alignnone size-large wp-image-311" title="2011-02-18_225006" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225006-540x467.jpg" alt="" width="540" height="467" /></a>

3.以下のコードを入力します：
<pre lang="python">#C:Python31python.exe
# -*- coding:utf-8 -*-</pre>
簡単に説明すると、1行目はインタープリタの場所を設定し、2行目はコードの文字コードを UTF-8 に設定しています。2行目を設定しておくと、多くのエラーを防ぐことができます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225412.jpg"><img class="alignnone size-full wp-image-312" title="2011-02-18_225412" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225412.jpg" alt="" width="508" height="323" /></a>

4.次に、以下のコードを入力します：
<pre lang="python">print("HelloWorld")

text="HelloWorld_Text"
print(text)</pre>
このコードの中の print は、出力を行う関数です。

1行目は HelloWorld を出力するという意味です。

3行目は text 変数の内容を出力するもので、text 変数の内容は HelloWorld_Text です。

5.次に、Python でのコメントの書き方を説明します。

Python では、# で始まる行が1行コメントになります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230809.jpg"><img class="alignnone size-full wp-image-313" title="2011-02-18_230809" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230809.jpg" alt="" width="526" height="402" /></a>

複数行のコメントは、連続した3つのシングルクォートで書きます。

例：
<pre lang="python">'''
これは Python を学ぶための練習プログラムです
'''</pre>
上記が複数行コメントです。3つの連続したシングルクォートで囲まれた部分は自動的に読み飛ばされ、実行されません。

6.最後に、コードを実行してみましょう～ 本記事の手順どおりに IDLE で Python を書いている場合は、ショートカットキーの F5 を押すと実行されます。F5 を押すと、保存するかどうかを尋ねるダイアログが表示されることがあります。その場合は Save を選択すればOKです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230949.jpg"><img class="alignnone size-full wp-image-314" title="2011-02-18_230949" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230949.jpg" alt="" width="526" height="402" /></a>

7.無事に実行できました～ 期待どおりの結果が表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056.jpg"><img title="2011-02-18_231056" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056-540x393.jpg" alt="" width="540" height="393" /></a>
