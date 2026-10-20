---
title: "如何在 Terminal 計算指令執行的時間？"
date: 2017-01-27T23:58:26
slug: "time-command-execution-in-terminal"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%9c%a8-terminal-%e8%a8%88%e7%ae%97%e6%8c%87%e4%bb%a4%e5%9f%b7%e8%a1%8c%e7%9a%84%e6%99%82%e9%96%93%ef%bc%9f/"]
tags: ["Linux"]
categories: ["SRE"]
---

你有想過幫你在 Terminal 執行的指令計算執行時間嗎？ 前陣子因為工作上的需求，用各種指令兜了一個檔案分類工具出來，但因為對效能有嚴格的要求，需要在指定時間內完成，所以查到 time 這個好用的指令可以幫我們計算指令的執行時間。


<!--more-->


提到計算執行時間，很直覺的肯定是用程式執行完成的時間減掉執行前的時間，但這樣的做法其實有點麻煩，在 Linux、macOS 裡，你可以在任何你想計算執行時間的指令前面加上 time，就可以得知該指令耗用的 CPU 和指令執行的時間長度，舉例來說我想知道 curl 花費多少時間：
<pre>time curl -XGET "https://coder.tw"</pre>
在最下面你會看到一行文字：「curl -XGET "https://coder.tw" 0.01s user 0.02s system 2% cpu 1.325 total」

這代表 curl 總共使用了 1.325 秒來執行，並使用了 2% 的 CPU Time。
