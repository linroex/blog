---
title: "WTF Elastic X-Pack License - How to uninstall X-Pack"
date: 2017-01-16T10:30:47
slug: "wtf-elastic-x-pack-license-how-to-uninstall-x-pack"
tags: ["Elasticsearch", "Kibana"]
categories: ["SRE"]
---

如果你透過搜尋引擎找到這篇文章，想必對 X-Pack 跟我一樣有著滿滿的怨念。最開始覺得 X-Pack 是個免費好用的外掛就把它裝到 Elasticsearch 跟 Kibana 身上，結果過了 30 天才看到提示說因為 License 過期，你需要去「更新授權碼」，否則不能登入 Kibana，其實到這邊我都還以為是註冊一個帳號就可以拿到新的授權碼，結果到官方網站看了很久，我沒有看到任何關於授權、費用、購買之類的文字（後來發現其實有，很小... 你們是有沒有想賺錢阿），最後竟然是靠 Google 搜尋才找到價格方案的頁面。


<!--more-->


如果想要賺錢，拜託也把價格方案寫的清楚一點，我真的不懂 Elastic 是 UX 沒人管了還是這其實是策略，讓你先用了 30 天才發現「原來要錢」，因為在 X-Pack 的文件、官網上幾乎沒有任何關於付費的資訊，問了幾個朋友也都是 30 天過去才知道原來要錢，有點被騙的感覺，而且要錢也不打緊，好的東西我們都願意支持<del>（反正是公司的錢包）</del>，但你的官網上根本找不到付費相關資訊阿！ 我想花錢還要用 Google 去找付款頁面是哪招？

授權方案：<a href="https://www.elastic.co/subscriptions">https://www.elastic.co/subscriptions</a>

至於金額多少？ 不要問你會怕，網站上只寫：「洽詢業務」，通常看到這句話就知道了...... 更糟的是，不能分開買，比如只買 Auth 不買其他功能，Elastic 就只有一種付款方案，沒錢請離開。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/FireShot-Capture-4-X-Pack_-Extend-Elasticsearch-with-Sli_-https___www.elastic.co_products_x-pack.png"><img class="alignnone wp-image-7239 size-medium" src="{{< param imageBase >}}/wp-content/uploads/2017/01/FireShot-Capture-4-X-Pack_-Extend-Elasticsearch-with-Sli_-https___www.elastic.co_products_x-pack-103x300.png" width="103" height="300" /></a>

好吧，看到這邊我相信大家都跟我一樣選擇移除 X-Pack ，這邊提醒大家，移除時不要只移除 Elaskticsearch 的 X-Pack Plugin，Kibana 的 X-Pack 也要移除哦，如果在瀏覽器遇到「too many redirect」的錯誤訊息，那就是 Kibana's X-Pack 忘記移除了。
<pre>cd /usr/share/elasticsearch/bin/
./elasticsearch-plugin remove x-pack

cd /usr/share/kibana/bin/
./kibana-plugin remove x-pack</pre>
基本上這樣移除完就沒問題了，接著可以參考 【<a href="https://coder.tw/?p=7235">Elasticsearch、Kibana 使用者認證設定</a>】 這篇文章用 HTTP Auth 來做基本的用戶登入處理（或是搭配 Lua 做更複雜的）

補充：感謝網友分享，如果想申請基本功能的免費金鑰可到<a href="https://register.elastic.co/">此網頁</a>。
