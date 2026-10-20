---
title: "如何用 Python 印出進度條的效果"
date: 2023-02-18T16:16:32
slug: "python-print-progress-bar"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e7%94%a8-python-%e5%8d%b0%e5%87%ba%e9%80%b2%e5%ba%a6%e6%a2%9d%e7%9a%84%e6%95%88%e6%9e%9c/"]
tags: ["Python"]
categories: ["Programming"]
---

<figure class="wp-block-image size-full"><img src="{{< param imageBase >}}/wp-content/uploads/2023/02/CleanShot-2023-02-18-at-16.00.47.gif" alt="" class="wp-image-7786"/></figure>
<p>前陣子在開發實驗室的零食結帳工具時學到的小技巧，如果想在 Terminal 上作出類似 進度條 的效果，也就是「在原地印出文字，移除舊的文字」的話，可以參考這篇文章（其他語言也是相同原理）</p>
<!--more-->



<p>這個效果可以用在蠻多地方，例如顯示下載進度，又或是不希望輸出的版面太凌亂，想移除之前輸出的文字都可以用到。</p>
<p>一般情況下如果你直接用 print 印出東西，它會換行（或接續在原本輸出的後面）</p>
<pre class="wp-block-code"><code>for i in range(10):
    print("*", end="")</code></pre>
<figure class="wp-block-image size-full"><img src="{{< param imageBase >}}/wp-content/uploads/2023/02/CleanShot-2023-02-18-at-16.07.57.gif" alt="" class="wp-image-7787"/></figure>
<p>但其實搭配 Shell 的特殊字元 \r 就可以把 Terminal 的游標移到當前列的第一個字元，用取代的方式重新輸出</p>
<pre class="wp-block-code"><code>print("hello")
print("\rhi")</code></pre>
<p>可以看到輸出會變成 hillo，因為 hello 輸出完之後沒有換行，游標移到第一個字，印出 hi 兩個字，把 he 兩個字給取代掉了</p>
<p>運用這個原理，就可以作出類似進度條的效果：</p>
<pre class="wp-block-code"><code>from time import sleep

for i in range(10):
    print("\r", end="")
    print("*" * i, end="")
    sleep(0.5)</code></pre>
<p>其實不止 \r 可以用，如果想做到「全螢幕清空再輸出」的效果，也可以用 clear 指令（或 Windows 的話用 cls 指令），我是在做結帳程式時，因為有感於版面很亂，想要讓上一筆的操作記錄消失，只顯示當前的操作記錄，查了一下資料才發現答案近在眼前</p>
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
