---
title: "Why Python No Output With Tee"
date: 2018-06-16T01:12:08
slug: "why-python-no-output-with-tee"
tags: ["Python", "Linux"]
categories: []
---

最近用 Python 寫了個 Slack Bot，因為偷懶所以我把 log 訊息直接 print 出來後用 tee 指令存到檔案裡，這樣就可以同時在 console 看到運作的資訊，又能將這些資訊保留到檔案裡，不過在用 Python print() 搭配 tee 時我卻發現我指定的 log File 常常沒有內容，或是該出現的訊息很晚才出現，研究後才知道原來 Python 的 print 函式會判斷輸出的環境，如果是輸出到 Shell 的話會立刻輸出，但如果不是輸出到 Shell 則會先存在 Buffer，等緩衝區滿了再一次輸出，當你把 Python 搭配 tee 使用時就會遇到緩衝區的問題，導致預期的輸出沒有及時出現在螢幕和檔案中。


<!--more-->


在執行 Python 時，原本寫法如下：
<pre><code>python bot.py | tee log.txt
</code></pre>
因為 Python 會自動判斷輸出的環境，當他發現不是輸出到 shell 而是 tee 時，他就會先將訊息存在緩衝區內，導致檢視 log.txt 時發現裡面一片空白。

只要改成下面寫法就能避免 Python Stdout Buffer 的問題：
<pre><code>python -u bot.py | tee log.txt
</code></pre>
