---
title: "Python で進捗バーのような表示を出力する方法"
date: 2023-02-18T16:16:32
slug: "python-print-progress-bar"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<figure class="wp-block-image size-full"><img src="{{< param imageBase >}}/wp-content/uploads/2023/02/CleanShot-2023-02-18-at-16.00.47.gif" alt="" class="wp-image-7786"/></figure>
<p>少し前に、研究室のお菓子の会計ツールを開発していたときに学んだちょっとしたテクニックです。ターミナルで進捗バーのような表示、つまり「その場に文字を出力して、古い文字を消す」ことをしたい場合は、この記事を参考にしてください（ほかの言語でも同じ原理です）。</p>
<!--more-->



<p>この効果はさまざまな場面で使えます。たとえばダウンロードの進捗を表示したいときや、出力画面が乱雑になるのを避けて、以前に出力した文字を消したいときなどに役立ちます。</p>
<p>通常、print で出力すると改行されます（または、前の出力の後ろに続けて表示されます）。</p>
<pre class="wp-block-code"><code>for i in range(10):
    print("*", end="")</code></pre>
<figure class="wp-block-image size-full"><img src="{{< param imageBase >}}/wp-content/uploads/2023/02/CleanShot-2023-02-18-at-16.07.57.gif" alt="" class="wp-image-7787"/></figure>
<p>しかし、シェルの特殊文字 \r を使うと、ターミナルのカーソルを現在の行の先頭に移動させ、その上から置き換える形で出力できます。</p>
<pre class="wp-block-code"><code>print("hello")
print("\rhi")</code></pre>
<p>出力結果は hillo になります。hello を出力した後に改行していないため、カーソルが先頭の文字に戻り、hi の 2 文字を出力すると、先頭の he が置き換えられるからです。</p>
<p>この仕組みを使うと、進捗バーのような効果を作れます。</p>
<pre class="wp-block-code"><code>from time import sleep

for i in range(10):
    print("\r", end="")
    print("*" * i, end="")
    sleep(0.5)</code></pre>
<p>実は \r だけでなく、画面全体をクリアしてから出力したい場合は clear コマンド（Windows なら cls コマンド）も使えます。私は会計プログラムを作っていたとき、画面が乱雑になって、前の操作ログを消して今の操作ログだけを表示したいと思いました。調べてみると、答えはすでに目の前にありました。</p>
<pre class="wp-block-code"><code>from os import system
from time import sleep

print("hello")
print("please login")

sleep(1)

for i in range(10):
    system("clear")
    print("*" * i)
    sleep(0.5)</code></pre>
<figure class="wp-block-image size-full"><img src="{{< param imageBase >}}/wp-content/uploads/2023/02/CleanShot-2023-02-18-at-16.15.27.gif" alt="" class="wp-image-7788"/></figure>
<p></p>
