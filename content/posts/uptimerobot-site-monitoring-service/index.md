---
title: "UptimeRobot - 網站存活狀態檢查服務"
date: 2017-01-31T17:26:37
slug: "uptimerobot-site-monitoring-service"
aliases: ["/posts/uptimerobot-%e7%b6%b2%e7%ab%99%e5%ad%98%e6%b4%bb%e7%8b%80%e6%85%8b%e6%aa%a2%e6%9f%a5%e6%9c%8d%e5%8b%99/"]
tags: ["Monitoring"]
categories: ["SRE"]
---

<a href="https://uptimerobot.com">UptimeRobot</a> 是一個老牌子、穩定且功能完整的網站狀態檢查服務，當你設定完成後，UptimeRobot 會定時去檢查網站是否在線上，這對於網站管理者十分重要，試想如果你更新伺服器後網站壞掉 3 小時你才發現，這三小時的客戶就都流失了！ <a href="https://uptimerobot.com">UptimeRobot</a> 的免費方案是 50 個觀測對象內、每五分鐘檢查一次，此外有支援 HTTP Status、Keyword、Ping、Port 等四種檢測方式，如果有狀況 UptimeRobot 支援簡訊、Email、Slack、WebHook 等多種通知方式，對我而言更重要的是 UptimeRobot 經營穩定，我從 2011 年使用至今。


<!--more-->


網址： <a href="https://uptimerobot.com/">https://uptimerobot.com/</a>

帳號註冊這些我就不多廢話了，登入後你需要做兩件事情，首先設定你接收通知的方式，其次設定你要監測的網站以及監測方式。

登入後在頁面中間的 My Settings 即可設定通知方式，UptimeRobot 除了基本的簡訊、Email、WebHook 外，還內建支援許多第三方服務例如 Slack、Twitter 等等。 你可以設定多個通知方式，當網站狀態改變（ Up / Down ） 時就會透過設定好的管道通知你。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard.png"><img class="alignnone wp-image-7355 size-large" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard-1024x573.png" width="660" height="369" /></a>

設定完通知方式後，點選左邊的「Add New Monitor」就可以設定檢測對象，以我個人來說最常使用「Keyword」的方式，因為「HTTPS」的檢測方式只會看 HTTP 狀態，例如變成 404、301 等等的就會通知，但有些情況如資料庫錯誤、程式錯誤等等，HTTP 狀態依舊是 200，但使用者卻無法看到預期的內容，但 「Keyword」因為是檢查指定的關鍵字是否存在於網頁內，可以避免這問題，但也要注意，別設定一個會變化的關鍵字呀！

設定檢測對象的同時，右邊也記得要勾選「該對象適用的通知管道」哦

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard-1.png"><img class="alignnone wp-image-7356 size-large" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard-1-1024x657.png" width="660" height="423" /></a>

&nbsp;
