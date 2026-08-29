---
title: "Siege - HTTP 網站壓力測試好幫手"
date: 2017-01-06T22:54:59
slug: "siege-http-load-testing"
aliases: ["/posts/siege-http-%e7%b6%b2%e7%ab%99%e5%a3%93%e5%8a%9b%e6%b8%ac%e8%a9%a6%e5%a5%bd%e5%b9%ab%e6%89%8b/"]
tags: ["Siege", "壓力測試"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2017/01/螢幕快照-2017-01-06-下午10.57.02.jpg"]
---

身為一個後端工程師，偶爾想幫網站做一下壓力測試也沒什麼好意外的，透過壓力測試我們可以了解伺服器架構的穩定度，以及在某種層面上觀察程式的效能，常見的工具有 ab、jMeter 等等，我想應該沒有人是選擇用人工來做壓力測試的吧（抖），今天要跟大家介紹 Siege，、它是個功能蠻完善但又簡單的 HTTP 壓力測試工具，用命令列的方式執行，透過 Siege 可以幫助你測試網站、API 的負載能力，但也要注意效能測試是很多層面的事情，並非壓力測試通過就萬無一失哦！


<!--more-->

<ul>
 	<li>Github：<a href="https://github.com/JoeDog/siege">https://github.com/JoeDog/siege</a></li>
 	<li>Docs：<a href="https://www.joedog.org/siege-manual/">https://www.joedog.org/siege-manual/</a></li>
</ul>
安裝 Siege 十分簡單，Mac 可以用 brew 安裝，Ubuntu 則使用 apt-get 安裝。
<pre>brew install siege</pre>
常見的需求是同時 N 個執行緒，每個執行緒進行 M 次存取，此外還可以讓每次存取之間有一定秒數的間隔，透過這樣的方式測試伺服器、網站的負載能力，可參考以下指令：

siege -c 100 -r 200 -d1 "http://google.com.tw"
<ul>
 	<li>-c 100 代表 100 個執行緒同時執行</li>
 	<li>-r 200 代表每個執行緒會發出 200 次請求</li>
 	<li>-d1 代表每個執行緒的請求會間隔 1 秒發出，如果只輸入 -d 則代表隨機時間間格。</li>
</ul>
<img class="alignnone size-large wp-image-7200" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-06-下午10.29.25-1024x841.jpg" alt="" width="660" height="542" />

像這樣，Siege 會列出執行的過程，以及每次 HTTP 請求所得到的回應。這邊可以觀察回應時間是否有變慢的趨勢，以及是否有 404、500 等異常發生，也可以到伺服器去看記憶體、CPU 等等的變化；但要注意回應時間變慢（及其他異常）未必就是程式的問題，很多時候也可能是因為這樣頻繁的存取，讓防火牆阻擋了你的請求，甚至直接封鎖 IP，所以需要再自行判斷可能的原因。

有時候，我們要測試的目標需要用 POST、PUT 等非 GET 的 HTTP Method，例如 API，雖然 Siege 文件裡沒有寫，但其實很簡單就可以達到：
<pre>siege -c 10 -r 10 "http://yahoo.com.tw/ POST"
siege -c 10 -r 10 "http://yahoo.com.tw/ DELETE"</pre>
其實只要在網址後面加上 method 就可以，但要注意，網址最後一定要用斜線做結尾，例如下面這種寫法就會出錯
<pre>siege -c 10 -r "http://yahoo.com.tw POST"</pre>
此外，有些情況我們會需要傳送資料給後端進行處理，這時候也可以直接寫在 HTTP Method 後，例如：
<pre>siege -c 10 -r 'http://yahoo.com.tw POST {"name": "karl"}'</pre>
但如果是 GET 的話可以直接寫在網址上哦，例如
<pre>siege -c 10 -r 'http://yahoo.com.tw?name=karl'</pre>
測試完成後，會有像這樣的數據給你參考，包含總共測試花了多少時間、多少個成功（失敗）、平均回應時間等等
<pre>Transactions: 200 hits
Availability: 100.00 %
Elapsed time: 9.57 secs
Data transferred: 0.00 MB
Response time: 0.42 secs
Transaction rate: 20.90 trans/sec
Throughput: 0.00 MB/sec
Concurrency: 8.74
Successful transactions: 200
Failed transactions: 0
Longest transaction: 1.10
Shortest transaction: 0.27</pre>
