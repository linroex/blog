---
title: "Set Cross-Origin Resource Sharing (CORS) Enable on Google Cloud Storage"
date: 2016-12-02T13:50:59
slug: "set-cross-origin-resource-sharing-cors-enable-on-google-cloud-storage"
tags: ["Google", "Google Cloud Platform", "GCP Storage", "CORS"]
categories: []
---

最近因為社課教大家用 Phaser 開發小遊戲，有許多素材需要讓學員在 Codepen 上使用，所以需要一個支援 CORS 的網路空間來放置素材，腦筋動著動著就想到便宜大碗又可以綁定自己 Domain 的 Google Cloud Storage 去啦！

其實 Google Cloud Storage 預設是不支援 Cross-Origin Resource Sharing (CORS) 的，但只要透過 gsutil （Google Cloud Storage Cli Tool） 就可以幫指定的 Bucket 啟用 CORS 功能！


<!--more-->

<blockquote>CORS 是一個讓 JavaScript 可以在不同網域底下存取資源的方式，跟過去的 JSONP 想達到的目標一致，但 CORS 算是目前的業界標準，各家瀏覽器都有支援。</blockquote>
當然，請先把 gsutil 安裝並設定好，可以參考此篇官方教學 <a href="https://cloud.google.com/sdk/docs/">Install the latest Cloud Tools version</a>

你可以透過以下指令設定指定的 bucket 讓指定 domain 或是所有人都可以存取資源，要注意設定完之後如果未生效，可以換一台電腦或是開啟無痕模式嘗試，之前我設定完卻一直無效，還把封包抓下來看，結果 header 裡面 CORS 也確實有啟用，最後發現是 Chrome 的 Cache 太強大了......

gsutil cors set cors.config.json gs://s.ntustcoding.club

cors.config.json 內容如下
<pre>[
  {
    "origin": ["http://example.appspot.com"],
    "responseHeader": ["Content-Type"],
    "method": ["GET", "HEAD", "DELETE"],
    "maxAgeSeconds": 3600
  }
]</pre>
最關鍵的就是在 origin 那個欄位，你可以設定多個允許存取資源的 Domain 或是直接設為 * 代表所有人都可以存取。

參考： <a href="https://cloud.google.com/storage/docs/cross-origin">Google Cloud Storage - Cross-Origin Resource Sharing (CORS)</a>
