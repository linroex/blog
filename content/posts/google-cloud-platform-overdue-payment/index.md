---
title: "Google Cloud Platform 自動扣款餘額不足處理"
date: 2017-02-07T10:19:02
slug: "google-cloud-platform-overdue-payment"
aliases: ["/posts/google-cloud-platform-%e8%87%aa%e5%8b%95%e6%89%a3%e6%ac%be%e9%a4%98%e9%a1%8d%e4%b8%8d%e8%b6%b3%e8%99%95%e7%90%86/"]
tags: ["GCP"]
categories: ["SRE"]
---

因為我登記在 GCP 的信用卡是「VISA 金融卡」形式，所以每月自動扣款時有可能會遇到銀行餘額不足的問題，目前 GCP 針對該問題的做法，會再扣款失敗後寄信提醒你，並在一日後重試扣款，如果依舊失敗就會要求你在解決問題後自行登入 ＧCP 後台付款，過去在登入 GCP 後台付款都沒有遇到問題，但這次似乎動線有改變，按照他的連結引導會被帶到帳單頁面，但無法執行扣款動作，此外即使你找到正確的扣款按鍵，但使用 Chrome Canary 卻似乎會有前端的問題導致扣款對話框無限載入中，必須要切換到正常版 Chrome 才可以正常扣款，真好奇這個扣款對話框是用了什麼最新最潮的技術...


<!--more-->


在 GCP 扣款失敗後，會收到像這樣的一封信，依照信件的指示會到「付款方式」頁面，點擊修正可以解決「餘額不足」問題

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_39.jpg"><img class="alignnone size-large wp-image-7389" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_39-1024x590.jpg" alt="" width="660" height="380" /></a>

但如果你使用 Chrome Canary 版本，會看到對話框一直轉一直轉，我試過讓它轉 10 分鐘都沒有出現。解決方法是：換到正常版的 Chrome 瀏覽器。

Chrome Canary is Offical Nightly Build Version Chrome

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_48.jpg"><img class="alignnone size-full wp-image-7390" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_48.jpg" alt="" width="647" height="610" /></a>

此外，如果你直接登入 GCP 的帳單頁面，會看到像這樣的提示，

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_07.jpg"><img class="alignnone size-full wp-image-7391" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_07.jpg" alt="" width="979" height="693" /></a>

點擊「Make a Payment」後會被引導至帳單頁面，但這頁卻沒辦法付款阿！！！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-07-上午9.47.26.jpg"><img class="alignnone size-large wp-image-7392" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-07-上午9.47.26-1024x599.jpg" alt="" width="660" height="386" /></a>

不得不說即使是 Google 都會犯錯的，還是這有什麼深意我沒搞懂也說不定T_T 我只知道，我花了好多時間在想辦法......
