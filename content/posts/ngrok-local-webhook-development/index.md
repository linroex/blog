---
title: "Ngrok - 讓本機也可以開發 webhook 免部署環境的神器"
date: 2017-01-09T23:36:47
slug: "ngrok-local-webhook-development"
aliases: ["/posts/ngrok-%e8%ae%93%e6%9c%ac%e6%a9%9f%e4%b9%9f%e5%8f%af%e4%bb%a5%e9%96%8b%e7%99%bc-webhook-%e5%85%8d%e9%83%a8%e7%bd%b2%e7%92%b0%e5%a2%83%e7%9a%84%e7%a5%9e%e5%99%a8/"]
tags: ["Ngrok"]
categories: ["Programming"]
---

<a href="https://ngrok.com">Ngrok</a> 是後端開發者必備的神器，每次在本機 localhost 開發網站時，遇到 webhook、API Callback、OAuth 都會很頭痛，以之前開發 Mandrill Webhook 接收開信、發信事件為例，因為要設定網址在 Mandrill 後台才能測試，所以程式寫完後要上傳到伺服器才能知道結果，對於開發速度會造成蠻大的影響，而 <a href="https://ngrok.com">Ngrok</a> 就是為了解決這樣的問題而誕生！


<!--more-->


在你的電腦執行 <a href="https://ngrok.com">Ngrok</a> 後，你會拿到一組隨機產生的網址，將這組網址提供給 webhook 或其他有需要 Remote URL 的地方（例如 Facebook Messenger BOT），當有人對該網址發出請求，Ngrok 就會將這些請求轉發到你的電腦，原理簡單但又實用！  Ngrok 的免費方式有些限制，例如每分鐘最多 40 個連線、一台電腦只能同時開啟一個 ngrok 等等，詳細的限制和價格方案可以看<a href="https://ngrok.com/product#pricing">這裡</a>。就我個人目前的使用經驗，免費方案已經蠻夠用了，除了極少數情況外我幾乎沒遇到問題，付費也十分合理，畢竟需要經過 ngrok 的伺服器來轉發這些流量，其實流量也不便宜。

<a href="https://ngrok.com">Ngrok</a> 的核心概念就是做一個轉發的伺服器，他可以把外界的請求轉發到你指定的 Port，依循這個概念可以做到許多事情，例如：
<ul>
 	<li>在本機開發 webhook，例如 facebook messenger bot</li>
 	<li>黑客松尾聲的 demo，讓你省掉架設伺服器的時間，又可以把產品丟給大家玩</li>
 	<li>行動裝置測試：以前要實際用手機測試，需要先 Deploy 到伺服器，但有了 Ngrok 就可以省掉這步驟直接測試囉</li>
</ul>
<h2>Ngrok Info</h2>
<ul>
 	<li>Offical：<a href="https://ngrok.com">https://ngrok.com</a></li>
 	<li>Download：<a href="https://ngrok.com/download">https://ngrok.com/download</a></li>
</ul>
<h2>Usage</h2>
Mac、Linux 都可使用，安裝十分簡單無需編譯，直接下載後就可以使用了，或是丟到 /usr/local/bin 之類的路徑去，方便之後使用。

使用時，到 Terminal 輸入指令即可，最基本的指令：
<pre>ngrok http 8080</pre>
這代表要把外界的流量導到 localhost 的 8080 port，並且需要是 http protocol。執行後就會出現這個畫面囉：

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-09-下午11.20.48.jpg"><img class="alignnone size-full wp-image-7212" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-09-下午11.20.48.jpg" alt="" width="777" height="589" /></a>

你要提供給外界的網址，就是 Forwarding 的網址，如果有需要 SSL 的話可以選 https 開頭的（第二個），兩個網址的目標都是相同的，唯一差別只在於是否使用 SSL 加密。

按下 Ctrl + C 就可以跳出並停止轉發。

有些功能需要免費註冊後才能使用，例如 HTTP Auth。到 Ngrok 官方網站點擊右上角的 Login 進行註冊，可以用 Github 或 Google 登入，登入後就會看到像這樣的畫面，照指令執行即可。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/ngrok_-_secure_introspectable_tunnels_to_localhost.png"><img class="alignnone size-full wp-image-7213" src="{{< param imageBase >}}/wp-content/uploads/2017/01/ngrok_-_secure_introspectable_tunnels_to_localhost.png" alt="" width="732" height="736" /></a>

別忘記執行下面這行指令，ngrok 才會知道你有註冊呀！！ 後面的 token 記得換成自己的。
<pre>ngrok authtoken {token}</pre>
註冊後就可以享有會員專屬的功能囉，例如 HTTP Auth
<pre>ngrok http -auth "user:passwd" 80</pre>
此外，有時候你會需要把流量導向到指定的 local domain，明明是本機，但透過 /etc/hosts 修改的方式，本機也可以有偽造的 Domain，例如 coder.tw 是我的部落格，但為了開發方便，我的 localhost 有個假的網域 coder.dev 會指向到本機，且伺服器那邊也設定 listen coder.dev（像是 Powder 就是這樣的狀況），這時候可以用這行語法：
<pre>ngrok http -host-header=myapp.dev mayapp.dev:80</pre>
&nbsp;
