---
title: "How to make a Dashboard on TV"
date: 2016-12-23T01:58:44
slug: "how-to-make-a-dashboard-on-tv"
tags: ["Dashboard", "Monitoring"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午1.57.42.jpg"]
---

電視掛在辦公室上頭很久了，一直空蕩蕩的也不是辦法，所以最近開始在規劃把一些重要的數據例如轉換率、流量、即時訪客等等放到電視上，原以為 Dashboard 不過是簡單的需求，花個 2-3 天後端整理資料，前端用 D3.js 繪製出圖表就可以，甚至更簡單還可以用 Google Analytics 的自訂報表來做，沒想到研究下去後卻發現事情並不單純，就讓我們娓娓道來吧。


<!--more-->


Dashboard 是一種把各種數據、資訊匯集在單一頁面的... 存在 (?) 在許多資訊公司都會有 Dashboard 掛在電視機上面，讓員工可以很快速地看到一些重要資訊，又或者是發布重要公告時使用；也有 Dashboard 不是在電視機上，而是單純顯示在後台首頁，讓使用者登入後台就可以馬上了解各項重要資訊，例如 WordPress 後台首頁就可以看到最新的文章、留言等等。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午12.44.56.jpg"><img class="alignnone size-large wp-image-7123" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午12.44.56-1024x698.jpg" alt="" width="660" height="450" /></a>

&nbsp;
<h2>設計儀表板的目的</h2>
在設計 Dashboard 之前要先思考「為什麼要有 Dashboard」才能決定要在上面放置哪些數據，畢竟空間有限，在小小的一頁內究竟該放今日流量還是每月流量，亦或者是訪客瀏覽器比例，這些其實都取決於「Why Dashboard」 以及公司的業務形態。

我認為 Dashboard 是為了這兩件事情而存在的：
<ul>
 	<li>團結目的：想像工程部門開發的新功能終於要上線了，大家圍在電視前聚精會神看著數字成長的那種感覺！ 我認為一個公眾展示（放在電視上）的 Dashboard 最主要就是讓團隊的向心力更增加，例如活躍會員數字、前五項最新上線功能、即時人數等等，其實都是為了達到這個目的。</li>
 	<li>警世意味：想想看你平常會無聊打開 Google Analytics 然後發現今天訪客突然變少嗎？ 或是打開 Skylight (ROR 的效能監控工具) 發現最新上線的功能跑很慢嗎？ 不會，除非公司有專門的測試、分析人員，否則平常絕對不會有人把這些數據打開來的，通常都是等客訴電話響起我們才會發現這些問題，而 Dashboard TV 就掛在辦公室，可以預期大家每天進來就會看一眼，這當然是擺放警世數據的大好機會啦！ 例如把最新的客戶抱怨放上去，又或者是網站每個月的上線率比較，當工程師發現這個月上線率怎麼比上個月低時，自然就會有所警覺了。</li>
</ul>
當然，每個公司的 Dashboard 都有不同的目的而設計，重要的是想清楚你為什麼而設計這個儀表板，最忌諱的就是「因為別人有，我也想要有」這種想法，因為這是在浪費工程師的生命阿！！！
<h2>思考載具特性</h2>
除了目的外，也要想清楚你的載具，最開始設計 Dashboard 時完全忘記是放在電視上做展示用，還以為跟以前一樣在後台首頁讓大家操作，這兩者設計邏輯上完全相反，最明顯的，如果以電視作為載具，就不會有任何的互動功能，畢竟... 你應該不會想用遙控器操作電視，但如果是放在使用者電腦螢幕的，就可以搭配一些方便的互動功能，例如日期選擇、多頁呈現等等；但即使是以電視作為載具，也有很多特效可以善用來增加呈現資料的空間，例如每隔幾秒自動翻面、換頁的功能，或是流動性的圖表等等，善用「合適」的特效，可以讓你呈現更多的資料在小小的電視螢幕上。

此外，載具還會影響尺寸、字體大小等等的要素，我自己在設計介面時很看感覺，但是在電腦上看起來好看的設計，放到電視上未必好看，可能電腦螢幕上覺得字很大，但放到電視上後，閱讀者是坐在自己位置上，可能就變得有點不清楚，這些都需要有一定的經驗才能解決，又或是上線後再做調整。
<h2>數據如何呈現</h2>
數據的呈現也是很重要的課題，絕對不只是把圓餅圖、折線圖畫出來這麼簡單，不同的目的有不同的呈現方式，數據本身就只是數據，但透過合適的呈現方式，才可以達到你期望的效益。

以即時訪客為例，呈現即時訪客是為了營造出「哇，好多人」的感覺呢？ 還是為了瞭解網站的負荷呢？ 如果想營造出哇的感覺，光是數字的顯示就沒有太大的效果，而需要搭配「比較」的元素，例如用折線圖的方式呈現這一秒和上一秒的差別，同時也將現在的數字呈現出來，透過時間的差異比對就會讓閱讀者有種「哇，人突然變多」的感覺。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午1.27.42.jpg"><img class="alignnone size-full wp-image-7124" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午1.27.42.jpg" alt="" width="951" height="371" /></a>

以金額為例，呈現金額只是單純的呈現出數字嗎？ 例如 190,000,000 ；亦或是用 1.9 億這樣的呈現方式呢？ 我想這兩者高下立判，用純數字的方式表達，閱讀者看到後其實沒有什麼感覺，畢竟「就只是一串數字」，但如果改成 1.9 億，相對之下就更好理解，甚至可以加上比喻的方式，常看到報章雜誌使用「省下的書本可以堆成好幾棟 101」就是類似的用法。
<h2>好幫手們</h2>
「工欲善其事，必先利其器」其實在開發 Dashboard 時也很有很多工具可以幫助你完成目標，這邊就分享我自己覺得不錯的幾個：
<ul>
 	<li><a href="http://dashing.io/">Shopify/Dashing</a>： 這是由 Shopify 所開發的 Dashboard Framework，你可以把資料喂進去，就可以快速的產生 Dashboard 啦！ 比較可惜的是目前 Shopify 已經停止維護了。類似 Dashing 的還有 Freeboard、Dashku 等等，但我沒深入研究過就不多做介紹了，可以用 dashboard framework 作為關鍵字查詢。</li>
 	<li><a href="https://github.com/airbnb/superset">Airbnb/Superset</a>：沒錯，這是由 Airbnb 推出的資料檢視軟體（需要自己架設），原名 Caravel ，他是為了讓非技術人士可以更快速、簡單的將資料視覺化並進行觀察而設計的，內建許多種圖表，可以透過它快速的建立 Dashboard，</li>
 	<li><a href="https://www.elastic.co/products/kibana">Kibana</a>：這是和 Superset 類似的軟體（需要自己架設），同樣可以讓使用者快速的建立圖表，主要差別在於 Kibana 背後是使用 Elasticsearch，所以在全文搜尋這方便比較強大，支援的圖表類型雖然較 Superset 少（但可以安裝外掛），但開發時間較長，社群、穩定性都較 Superset 高，個人認為 Kibana 比較適合工程師使用，而 Superset 則是適合非工程師使用。</li>
 	<li><a href="https://www.google.com/analytics/data-studio/">Google Data Studio</a>：這是 Google 新推出的神器級別工具，可以讓你快速的繪製出各式各樣的圖表，最大特色是它可以和 Google Analytics、Google BigQuery 等相關服務無縫串接，甚至是你自己的資料庫（MySQL）都可以串連上去，透過他可以在很短的時間內製作出一份數據動態載入的線上報告！ 我個人是將它拿來設計 Dashboard 使用啦（笑）不過用 Google Data Studio 設計 Dashboard 可能會有些問題，畢竟彈性不太夠，像我要調整頁面尺寸時就無法處理，以及想條列最新 Merge 的前五個功能時，也用了不少 Dirty Hack。</li>
 	<li><a href="https://d3js.org/">D3.js</a>：談到繪圖絕對不能不提到強大的 D3.js 啦！ 你可以藉由 D3 的幫助快速的繪製出想要的圖表，且 D3.js 是從最底層開始繪圖，所以可以讓你隨心所欲創造出想要的圖表。</li>
 	<li><a href="http://c3js.org/">C3.js</a>：D3.js 本身太過底層，好處是可以製作很彈性的報表，但缺點就是入門門檻較高、開發速度相對慢，而 C3.js 利用 D3.js 作為底層，但 API 更容易使用，類似的還有 <a href="http://nvd3.org/">NVD3.js</a>、<a href="https://plot.ly/javascript/">Plotly.js</a> 等等。</li>
</ul>
▼ Google Data Studio

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午1.55.33.jpg"><img class="alignnone size-full wp-image-7125" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-23-上午1.55.33.jpg" alt="" width="958" height="874" /></a>
<h2>如何展示在電視</h2>
最後，最重要的，Dashboard 做完了但究竟要如何展示在電視上呢？ 用 HDMI 接你的筆電嗎？ 這未免也太不經濟實惠吧，難道就為了展示 Dashboard 你就必須把電腦放在電視旁一整天嗎？大家可能想說用樹莓派或是買台簡單的主機來展示，但事實上你只需要手掌大小的 <a href="https://www.google.com/intl/zh-tw_tw/chromecast/?utm_source=chromecast.com">Chromecast</a> 就可以啦！ （註：最近有支援 4K 的 Chromecast Ultra 可以買哦）

<a href="https://www.google.com/intl/zh-tw_tw/chromecast/?utm_source=chromecast.com">Chromecast</a> 本身可以讓你開發 Receiver App，而這個 Receiver App 其實就是一個 HTML，或者說 Chromecast 本身就是一個瀏覽器，所以只要將你的 Dashboard 設計成 Receiver App 並做優化就可以輕鬆讓他整天展示在電視上囉！

此外，有些智慧型電視本身有瀏覽器，也可以透過它內建的瀏覽器來展示 Dashboard，如此一來就不需要另外接一台電腦了！

&nbsp;
