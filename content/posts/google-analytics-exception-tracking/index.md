---
title: "Google Analytics Exception Tracking"
date: 2017-02-19T10:15:29
slug: "google-analytics-exception-tracking"
tags: ["Google Analytics"]
categories: ["Blog"]
---

其實在 Google Analytics 有隱藏版例外追蹤的功能，透過 Google Analytics 搜集網站前後端（或 App）的例外訊息後加以分析，以我這次的應用場景舉例，當使用者填寫表單並送出後，我會驗證使用者填寫的資訊是否有錯誤，如果有忘記填某個欄位，就會將錯誤訊息送回 GA，之後到 GA 檢視錯誤訊息的出現次數，某種程度上可以猜測是否介面設計不好導致使用者漏了該欄位。


<!--more-->


參考資料：<a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions">Exception Tracking | Analytics for Web (analytics.js) | Google Developers</a>

以下的說明是以網頁前端 JavaScript 為主，如果希望從網站後端或 App 發送資料，可以參考 <a href="https://developers.google.com/analytics/devguides/collection/protocol/v1/">Measurement Protocol</a>。

要將例外訊息送到 GA 十分簡單，和事件追蹤類似：
<pre>ga('send', 'exception', {
  'exDescription': err_message,
  'exFatal': false
});</pre>
<ul>
 	<li>exDescription 參數：要送到 GA 的錯誤訊息，建議好好思考這段訊息的內容，依照不同的收集需求會有不同作法，千萬不要只是一段沒意義的訊息例如：「必填欄位未填寫」，誰知道是哪個欄位呀！</li>
 	<li>exFatal 參數：代表該錯誤是否致命。</li>
</ul>
比較特別的是 Google Analytics 預設的報表裡面其實沒有「例外」這項，需要用「自訂報表」才能檢視你所收到的例外訊息。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-19-上午10.14.59.jpg"><img class="alignnone size-full wp-image-7474" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-19-上午10.14.59.jpg" alt="" width="950" height="758" /></a>

總結來說 Google Analytics 提供的 Exception Tracking 十分基本，只能紀錄一段文字，但用在某些情況也已足夠，如果有需要更強大的功能例如錯誤通知、紀錄使用者等等，可以嘗試 <a href="https://rollbar.com/">Rollbar</a>。

&nbsp;
