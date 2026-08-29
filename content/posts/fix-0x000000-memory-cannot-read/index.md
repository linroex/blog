---
title: "如何解決「0x000000記憶體不能為Read」"
date: 2009-02-07T09:24:00
slug: "fix-0x000000-memory-cannot-read"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e8%a7%a3%e6%b1%ba%e3%80%8c0x000000%e8%a8%98%e6%86%b6%e9%ab%94%e4%b8%8d%e8%83%bd%e7%82%baread%e3%80%8d/"]
tags: []
categories: ["Windows系列"]
---

最近玩遊戲時常發生一個問題

程式有時候會出現錯誤

顯示"0x000000記憶體不能為Read"

我在書上看到說是記憶體讀取錯誤位置

可是書上沒講怎麼辦

所以我又上網找了一下

網路上有一個方法是使用cmd指令來從新註冊dll檔案


<!--more-->


這裡分享出來

首先請先開啟命令提示字元

<a href="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210801.jpg"><img class="alignnone size-full wp-image-1937" title="2009-09-21_210801" src="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210801.jpg" alt="2009-09-21_210801" width="347" height="175" /></a>

輸入 for %1 in (%windir%system32*.dll) do regsvr32.exe /s %1

<a href="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210800.jpg"><img class="alignnone size-full wp-image-1935" title="2009-09-21_210800" src="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210800.jpg" alt="2009-09-21_210800" width="550" height="374" /></a>

接下來他會一直跑東西

跑完之後就可以了

另外電腦中木馬或病毒以後也建議從新註冊dll檔案

因為病毒往往會感染到dll檔身上

而防毒軟體為了移除病毒只好將該dll檔移除

這時如果沒有重新註冊依次電腦就可能出錯
