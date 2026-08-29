---
title: "端午連假，跟塞車說掰掰 - 宜蘭篇"
date: 2016-06-10T14:29:03
slug: "dragon-boat-festival-yilan-traffic"
aliases: ["/posts/%e7%ab%af%e5%8d%88%e9%80%a3%e5%81%87%ef%bc%8c%e8%b7%9f%e5%a1%9e%e8%bb%8a%e8%aa%aa%e6%8e%b0%e6%8e%b0-%e5%ae%9c%e8%98%ad%e7%af%87/"]
tags: ["Google", "Data", "BigQuery"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2016/06/IMG_2865.jpg"]
---

維睽將近一年之久，終於又發表新文章啦。2016 端午連假，相信許多台北朋友的首選肯定是宜蘭吧！不管是開車或搭客運，經國道五號雪隧到宜蘭<strong>順利的話</strong>只要 40 分鐘，當然大家都知道，端午連假這種時候肯定不那麼順利的... 今天小弟就要來跟大家分析一下雪隧的塞車模式，讓大家可以避開車潮順利抵達宜蘭！ 下面會有簡單的技術說明，以及分析過程，非技術的朋友可以直接看結論！ 附帶一提，小弟今天人就在宜蘭，這篇文章其實是撰寫於金車伯朗咖啡城堡。


<!--more-->

<h2>結論</h2>
說話要說重點，寫文章也是如此，所以就讓我們先來講結論吧！

避開車潮的最好方式，就是避開假日，經過下面的分析你會發現通往宜蘭的道路實在太少了，不需要端午節這種四天連假，只要平常的週休二日，雪隧就塞得動彈不得，即使你闖過了雪隧，你還需要擔心市區塞車、停車位不足等等問題。

週休二日或連續假日，火車絕對是最佳選擇，小弟今天搭乘普悠瑪號直達宜蘭（票是昨天才買的），只花了一小時左右，這和搭乘客運的時間不相上下，但絕對不會塞車！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2840.jpg"><img class="alignnone size-large wp-image-6895" src="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2840-1024x768.jpg" alt="IMG_2840" width="660" height="495" /></a>

如果你覺得火車班次太少，那麼客運也是個不錯的選擇，至少真的塞起來，車不是你在開，倒頭大睡就可以了事了... 不過搭乘客運的話要注意，不建議早上搭乘（笑），下午和半夜是最佳時間；大部分的人都會想說早點開車避開塞車，但從下面的分析你會發現車潮的最高峰其實是早上十點和十二點，反而到了下午車潮就慢慢減少。

除此之外，抵達宜蘭後也千萬別租汽車，租機車就好了，否則停車位絕對會是你一整天的夢靨，這是小弟今天早上騎車四處趴趴走的最佳感想，看著旁邊的車子全都塞在停車場門口，心裡就忍不住慶幸沒去租汽車嘿嘿嘿。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2848.jpg"><img class="alignnone size-large wp-image-6896" src="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2848-1024x768.jpg" alt="IMG_2848" width="660" height="495" /></a>
<h3>技術說明</h3>
結論講解完畢，再來就是技術部分囉；以下的報告是從 交通部高公局 所提供的 <a href="http://tisvcloud.freeway.gov.tw/history/TDCS/">高速公路ETC資料</a> 分析而來，技術背景的朋友可以參考這段說明，自行分析其他路段的車流量資料。

首先，我所使用的是 M03A 車流量統計資料，這項資料集包含從 2014 年 1 月 1 日至今，每個 ETC 偵測站每五分鐘通過的車流量數字，此外還有通過的車輛種類，最適合拿來分析高速公路的堵塞情況。
<ul>
 	<li>原始資料下載：<a href="http://tisvcloud.freeway.gov.tw/history/TDCS/">http://tisvcloud.freeway.gov.tw/history/TDCS/</a></li>
 	<li>資料集使用說明：<a href="https://ntust.me/2vdn5">https://ntust.me/2vdn5</a></li>
 	<li>資料整理程式：<a href="https://ntust.me/gpv6t">https://ntust.me/gpv6t</a></li>
</ul>
這份資料不小，以 M03A 來說大約 11GB ，格式尚算可以接受，原本我打算直接丟 MySQL 分析，但發現查詢速度實在太慢了，最後就丟到 Google BigQuery 處理，強烈推薦這套服務，使用上十分簡單，價格便宜，又可以直接使用 SQL 語法做查詢。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/Google_BigQuery.png"><img class="alignnone size-large wp-image-6887" src="{{< param imageBase >}}/wp-content/uploads/2016/06/Google_BigQuery-1024x483.png" alt="Google_BigQuery" width="660" height="311" /></a>

因為資料集本身分很多檔案，所以我寫了一隻 Python 程式協助我整理資料，整理後使用 gsutil 上傳到 Google Cloud Storage，最後再用 BigQuery 直接到 Cloud Storage 擷取資料並建立 Table，最後使用 SQL 語法取得我有興趣的資料，再丟到 Google Sheets 做進一步處理，最後丟到 Plotly 繪製圖表。

以下的報告皆以 05F0055S、05F0055N 兩個監測站的資料來進行分析。這兩個測站是在台北往宜蘭，進入雪隧入口的兩個監測站，分別代表南下、北上。時間範圍為 2014-1-1 至 2016-5-1。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖.png"><img class="alignnone wp-image-6886 size-full" src="{{< param imageBase >}}/wp-content/uploads/2016/06/交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖.png" alt="交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖" width="821" height="584" /></a>

<!--nextpage-->
<h3>塞車條件判斷</h3>
透過高速公路 ETC 資料，我可以很輕易的知道每小時、每天或是每週的車流量，但有個問題是：「車流量多少會塞車呢？」 光只有車流量就是一串數字罷了，我這邊透過低標、均標和高標的方式來做是否會塞車的判斷，所得數字如下：

<strong>南下（每日）</strong>
<ul>
 	<li>低標： 25100 輛</li>
 	<li>均標： 28213 輛</li>
 	<li>高標： 34209 輛</li>
</ul>
<strong>北上（每日）</strong>
<ul>
 	<li><strong>低標： </strong>25667 輛</li>
 	<li>均標： 28542 輛</li>
 	<li>高標： 33950 輛</li>
</ul>
此外搭配 2015 年端午節雪隧塞車的<a href="http://www.nownews.com/n/2015/06/21/1724384">新聞</a>（這時候 Google 就很好用了），我們可以知道 2015 年 5 月 20 雪隧北上塞很嚴重，而透過資料顯示當天北上車流量約 35807 輛，故可以驗證雪隧北上確實在高標的單日車流量會是堵塞的。當然以日來做統計還是不夠精確，應該要到小時才足夠，不過這邊為了節省篇幅（笑）。
<h3>一般趨勢分析</h3>
這邊以天為單位，搭配前面所得到的低標、均標和高標分析，並善用 Google Sheets 提供的條件格式化工具，我們可以發現每逢例假日，無論北上南下的車流量幾乎都在高標左右。

下圖是宜蘭往台北的車流量，完整資料可點選<a href="https://docs.google.com/spreadsheets/d/1dgLT3a01_adWdbgKrf7LLdKetkUMvn7eZra-_yTg5Ew/edit?usp=sharing">此連結</a>

大家會注意到，每逢週日、周一車流量就會飆高，反觀週六車流量相對較少。至於平日的車流量則幾乎都在低標以下。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表.png"><img class="alignnone size-full wp-image-6889" src="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表.png" alt="雪隧北上南下資料_-_Google_試算表" width="496" height="509" /></a>

下圖則是台北往宜蘭的車流量，和北上相反，熱點大多聚集在週六和週日。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表-1.png"><img class="alignnone size-full wp-image-6890" src="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表-1.png" alt="雪隧北上南下資料_-_Google_試算表" width="502" height="502" /></a>

由以上兩張圖我們可以合理猜測，大部分的民眾皆是在週六去宜蘭玩，週日或週一回台北上班。

此外附上更細節的資料圖表，這份資料是以週一到週五為範圍，每小時為區間的車流量資料，這份資料以 Plotly 繪製，可以點擊或使用滑鼠圈選以檢視細節。

<strong>南下</strong>

<iframe src="https://plot.ly/~KarlLin/6.embed?share_key=gx70Z1ajvor5iCysGlCvFD" width="900" height="800" frameborder="0" scrolling="no"></iframe>

<strong>北上</strong>

<iframe src="https://plot.ly/~KarlLin/7.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>
<h3>一般單日分析</h3>
這邊則是以天為範圍，以小時為間隔，讓大家知道如果真的要開車或搭客運，你可以在幾點出門比較合適。 當然也可以直接取用原資料並分析，畢竟從週一到週日的情況可能都不大相同。

<strong>南下</strong>

<iframe src="https://plot.ly/~KarlLin/9.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>

<strong>北上</strong>

<iframe src="https://plot.ly/~KarlLin/11.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>

其實除了以上的分析方向外，還可以嚐試很多不同的面向，例如遇到三天連假、四天連假的車流量變化，甚至把天氣的因素也導入；此外或許不同偵測站會有不同的現象也說不定，如果你也有興趣的話，拿起鍵盤開工吧！  等下次有機會，也許發一篇詳細的技術說明。
<h3></h3>
