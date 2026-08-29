---
title: "How to Use Web Inspector on iOS Safari"
date: 2017-02-03T11:58:14
slug: "how-to-use-web-inspector-on-ios-safari"
tags: ["iOS", "Safari"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2017/02/螢幕快照-2017-02-04-上午12.53.17.jpg"]
---

在電腦上進行前端開發時，瀏覽器會提供方便的開發者工具，讓我們可以檢視錯誤訊息、儲存區內容、逐步執行 JS 等等，但如果要用行動裝置測試網頁，該如何開啟強大的開發者工具呢？ 畢竟小小的螢幕，總不可能開在手機裡吧！ 這邊分享 iOS Device 的情況下，可以和 Mac 電腦連線，使用 Mac Safari 的開發者工具來遠端遙控 iOS Safari 的網頁，讓你用 iOS 測試網頁更方便。


<!--more-->


提到行動裝置的前端測試，除了實機測試外，也可以選擇用瀏覽器提供的 Device Toolbar 測試，但通常只能模擬螢幕解析度和 User-Agent，如果希望測試語法相容性之類的項目，則必須要用模擬器或實機測試，千萬別以為行動裝置測試不重要，事實上很多你以為理所當然的 HTML5、CSS3 語法，在行動裝置上或不支援或行為不同，甚至文件上寫 iOS Safari 有支援不一定真的有支援，所以建議還是自己測試一次比較安心。

要讓 iOS Safari 和 Mac Safari 連結起來，首先當然是傳輸線，此外需要將 iOS Safari 的網頁檢閱器開啟。 在 iOS 的設定 =&gt; Safari =&gt; 進階裡面啟動「網頁檢閱器」

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/IMG_6640.png"><img class="alignnone wp-image-7373 size-full" src="{{< param imageBase >}}/wp-content/uploads/2017/02/IMG_6640-e1486140119554.png" width="400" height="711" /></a>

啟動後，在 iOS Safari 裡面把你要測試的網頁開啟，接著我們需要開啟 Mac Safari 的開發者功能，和 Chrome、Firefox 不同，Mac Safari 的開發者功能預設是隱藏的，需要到偏好設定 =&gt; 進階 裡面開啟。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_44_26.jpg"><img class="alignnone size-full wp-image-7374" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_44_26.jpg" alt="" width="776" height="632" /></a>

勾選「開發」選單後，Mac Safari 的選單列就會出現「開發」囉，點擊「開發」會看到你的 iOS Device 名稱以及所開啟的網頁顯示在裡面，選擇要測試的網頁，就會出現開發者工具囉！

這個 Mac Safari 的開發者工具其實是遠端遙控 iOS 的，所以可以直接在電腦上檢視 iOS 網頁的運作狀況，如果要看錯誤訊息也可以直接輸出。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_48_59.jpg"><img class="alignnone size-large wp-image-7375" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_48_59-1024x553.jpg" alt="" width="660" height="356" /></a>

如果沒有如預期的出現網址供點擊，可以檢查以下項目：
<ul>
 	<li>手機和電腦是否有連接再一起？</li>
 	<li>手機螢幕是否解鎖？</li>
 	<li>iOS Safari 是否開啟著？</li>
 	<li>這個功能限定 iOS Safari 使用（但其實 iOS Chrome 的 JS 核心跟 Safari 相同，所以只要測試 Safari 即可）</li>
</ul>
