---
title: "Unity 3D開啟時出現Eorror loading page  couldn&#039;t read a file ://file"
date: 2014-01-26T17:53:14
slug: "unity-3d-error-loading-page-fix"
aliases: ["/posts/unity-3d%e9%96%8b%e5%95%9f%e6%99%82%e5%87%ba%e7%8f%beeorror-loading-page-couldnt-read-a-file-file/"]
tags: ["Unity", "Game Development"]
categories: ["Programming"]
---

有些朋友在安裝Unity時一切正常，但打開時卻遇到「Eorror loading page couldn't read a file ://file」這項錯誤訊息，會遇到此錯誤我猜測是因為用戶名稱有中文字，導致Unity在第一次執行時要載入認證金鑰卻遇到問題，此問題其實很好解決，只要手動將驗證金鑰傳入Unity即可，大家可以參考下面的教學來操作


<!--more-->


1. 先把網路關掉，別疑惑，這是為了讓Unity可以轉換成手動驗證模式，而不是網頁驗證

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173632.jpg"><img class="aligncenter size-full wp-image-916" alt="2014-01-26_173632" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173632.jpg" width="346" height="768" /></a>

&nbsp;

2.啟動Unity，這次你不會看到錯誤訊息，而是會遇到如下圖的頁面，這就是手動管理憑證的頁面，按一下「Manual Activation」之後按「Save License」

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173810.jpg"><img class="aligncenter size-full wp-image-917" alt="2014-01-26_173810" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173810.jpg" width="606" height="359" /></a> <a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173821.jpg"><img class="aligncenter size-medium wp-image-918" alt="2014-01-26_173821" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173821.jpg" width="392" height="229" /></a>

&nbsp;

3.進入手動驗證的網頁（https://license.unity3d.com/manual），把剛剛存的檔案上傳上去

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-26-at-5.45.32-PM.jpg"><img class="aligncenter size-full wp-image-919" alt="Screen Shot 2014-01-26 at 5.45.32 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-26-at-5.45.32-PM.jpg" width="877" height="521" /></a>4. 選擇「Activate the free version of Unity」

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174726.jpg"><img class="aligncenter size-full wp-image-920" alt="2014-01-26_174726" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174726.jpg" width="654" height="615" /></a>

5.按「Download」把金鑰檔案下載下來

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174926.jpg"><img class="aligncenter size-full wp-image-921" alt="2014-01-26_174926" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174926.jpg" width="654" height="615" /></a>

6.再次把網路關掉，然後開啟Unity主程式，跟第二步一樣按「Manual Activation」，再來請按「Load License」然後選擇剛剛下載的檔案

當你看到下圖畫面時代表你成功了，接下來重開Unity好好享受吧！

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_175005.jpg"><img class="aligncenter size-full wp-image-922" alt="2014-01-26_175005" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_175005.jpg" width="274" height="152" /></a>

&nbsp;
