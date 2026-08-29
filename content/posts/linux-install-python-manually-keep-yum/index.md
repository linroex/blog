---
title: "如何在Linux裡面手動安裝Python並且避免yum不能運作的問題"
date: 2011-08-19T08:00:45
slug: "linux-install-python-manually-keep-yum"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%9c%a8linux%e8%a3%a1%e9%9d%a2%e6%89%8b%e5%8b%95%e5%ae%89%e8%a3%9dpython%e4%b8%a6%e4%b8%94%e9%81%bf%e5%85%8dyum%e4%b8%8d%e8%83%bd%e9%81%8b%e4%bd%9c%e7%9a%84%e5%95%8f%e9%a1%8c/"]
tags: ["Python", "Linux", "yum"]
categories: ["Python", "Linux"]
---

之前曾經寫過一個程式可以自動備份Linux裡的重要資料並且上傳到Google Storage，當時用的語言是Python 2.7，但是Linux裡面內建的Python是2.4，而且就算你用yum去進行升級，最高也只會到2.4，這時候你如果想要安裝更新版的Python就只能自行編譯了，下面將用Python 3.2進行教學


<!--more-->


另外你的Linux如果有安裝yum的話，在安裝完新版的Python之後會遇到一個問題就是yum無法使用，這時你可以參考下面的教學把它修復，這是因為yum使用的是Python 2.4，現在你裝了新版的Python當然會不能使用囉～

1.請先到下面的網頁下載Python的原始碼

<a href="http://www.python.org/download/releases/">http://www.python.org/download/releases/</a>

請下載附檔名為tgz的才是原始碼

wget -c http://www.python.org/ftp/python/3.2.1/Python-3.2.1.tgz

接者把剛下載的檔案解壓縮

tar -zxvf Python-3.2.1.tgz

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_174820.jpg"><img class="alignnone size-large wp-image-697" title="2011-08-17_174820" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_174820-540x341.jpg" alt="" width="540" height="341" /></a>

2.進入剛剛解壓縮出來的資料夾

cd Python-3.2.1

然後輸入下面的指令來設定一些安裝參數並且檢查安裝環境

./configure --prefix=/usr

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175427.jpg"><img class="alignnone size-large wp-image-699" title="2011-08-17_175427" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175427-540x341.jpg" alt="" width="540" height="341" /></a>

正常來講會跑很多東西，如果你只跑了幾行字就結束，而且最後三行不是「Creating ....」的話代表你電腦可能缺少一些需要的程式，通常是缺少make跟gcc，請先安裝好在開始裝Python

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175804.jpg"><img class="alignnone size-large wp-image-700" title="2011-08-17_175804" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175804-540x340.jpg" alt="" width="540" height="340" /></a>

3.輸入指令：make

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175923.jpg"><img class="alignnone size-large wp-image-701" title="2011-08-17_175923" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175923-540x342.jpg" alt="" width="540" height="342" /></a>

&nbsp;

編譯中

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180042.jpg"><img class="alignnone size-large wp-image-703" title="2011-08-17_180042" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180042-540x340.jpg" alt="" width="540" height="340" /></a>

4.等剛剛的指令跑完以後輸入：make install，這是開始安裝的意思

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180152.jpg"><img class="alignnone size-large wp-image-704" title="2011-08-17_180152" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180152-540x341.jpg" alt="" width="540" height="341" /></a>

&nbsp;

5.再來你的Linux如果有安裝yum的話，那可能會發生一些問題，請先輸入which yum取得他的位置，然後用vi開啟他

可能會出現的訊息：
<blockquote>There was a problem importing one of the Python modules
required to run yum. The error leading to this problem was:
No module named yum
Please install a package which provides this module, or
verify that the module is installed correctly.
It's possible that the above module doesn't match the
current version of Python, which is:</blockquote>
不過部分的人不會出問題，你可以執行看看yum是否會正常運作，如果你的yum正常就別亂動

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181409.jpg"><img class="alignnone size-large wp-image-705" title="2011-08-17_181409" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181409-540x405.jpg" alt="" width="540" height="405" /></a>

6.把第一行「#!/usr/bin/python」改成「#!/usr/bin/python2.4」就會正常了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181714.jpg"><img class="alignnone size-large wp-image-706" title="2011-08-17_181714" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181714-540x410.jpg" alt="" width="540" height="410" /></a>

寫到最後才發現圖片背景竟然不一樣......XD
