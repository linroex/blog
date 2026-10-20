---
title: "如何測試網站是否成功設定 CORS"
date: 2017-01-04T11:58:44
slug: "test-cors-enabled-on-website"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e6%b8%ac%e8%a9%a6%e7%b6%b2%e7%ab%99%e6%98%af%e5%90%a6%e6%88%90%e5%8a%9f%e5%95%9f%e7%94%a8-cross-origin-resource-sharing%ef%bc%88cors%ef%bc%89/"]
tags: ["CORS", "cURL"]
categories: ["Programming"]
---

透過 Cross-Origin Resource Sharing（以下簡稱 CORS）的設定可以讓 JavaScript 突破瀏覽器同源政策，存取不同網域的資源（API），但每次設定完 CORS 都很頭痛要如何判斷伺服器真的有設定成功，因為有時候瀏覽器針對 CORS 會做快取，導致伺服器設定無誤，但不管你怎麼重新整理網頁都失敗的現象。這邊教大家用 cURL 直接檢視 header 是否有啟用 CORS 囉！


<!--more-->


透過 cURL 模擬瀏覽器的行為跟伺服器索取資源，因為 CORS 其實是在封包的 header 裡面加入  Access-Control-Allow-Origin 的方式讓瀏覽器可以做後續處理，所以只要觀察 header 裡面有沒有 Access-Control-Allow-Origin 就可以知道設定是否正常啦！ 這是最底層的做法了，如果透過這方法檢查後發現沒有 Access-Control-Allow-Origin，那毫無疑問，肯定是伺服器設定錯誤！
<pre>curl --verbose -XPOST "https://coder.tw"</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-05-上午12.58.19.jpg"><img class="alignnone size-full wp-image-7189" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-05-上午12.58.19.jpg" alt="" width="945" height="664" /></a>

其實很簡單，就只是加上 -verbose 參數，讓 cURL 把詳細的過程給列出來，如果回應裡面有 「 &lt; Access-Control-Allow-Origin 」的話，代表 CORS 設定成功，當然還要看你設定的 Domain 是否正確。
