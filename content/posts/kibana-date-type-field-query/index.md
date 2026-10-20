---
title: "Kibana Date Type Field Query"
date: 2017-01-19T02:18:24
slug: "kibana-date-type-field-query"
tags: ["Kibana", "Elasticsearch"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2017/01/Kibana-6.png"]
---

在 Kibana 裡面，想要搜尋某段時間內的資料，第一個一定是想到 Kibana 內建的 Time Picker，不得不說這真的是很好用的工具，但少數情況你的資料可能不只一個日期欄位，而你必須用 Query 的方式而非 Time Picker 處理，例如 Email 的資料，寄信、開信、點擊都會有 Log 傳到我的伺服器，這時候會有兩個時間，一個是信件寄出的，另一個則是事件發生的時間（例如開信、點擊），像這樣的情況就可能會需要在搜尋框裡面用日期欄位做搜尋。


<!--more-->

<h2>Time Picker</h2>
首先，還是介紹一下 Time Picker 吧！ 大部分情況下應該用 Time Picker 就可以解決時間限制的問題，Time Picker 會在 Kibana 的右上角出現：

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana.png"><img class="alignnone size-large wp-image-7272" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-1024x460.png" alt="" width="660" height="296" /></a>

Time Picker 提供很多樣的時間選擇，要特別注意的是「Today」 是指今天的資料，如果現在是下午三點，那就只會有 00:00 - 15:00 的資料，而 Last 24 hours 則是指從現在開始反推回過去一天的意思，這兩個乍看很像但其實不太一樣。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-1.png"><img class="alignnone size-large wp-image-7273" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-1-1024x520.png" alt="" width="660" height="335" /></a>

此外，在 Timeline 那邊也可以直接用滑鼠選擇時間，請看範例

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/kibana.gif"><img class="alignnone size-full wp-image-7274" src="{{< param imageBase >}}/wp-content/uploads/2017/01/kibana.gif" alt="" width="917" height="310" /></a>

什麼？ 你說你沒看到 Time Picker 跟 Timeline？ 別緊張，那只是因為在建立 Index 時你沒有設定日期欄位給 Kibana；在建立 Index 時注意下圖的欄位，可千萬別忽略它呀！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-2.png"><img class="alignnone size-full wp-image-7275" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-2.png" alt="" width="712" height="652" /></a>
<h2>Query with Date Field</h2>
如果你確信 Time Picker 不能解決問題，必須要用 Query 的方式處理，像是 subject: "Hi" 這樣的方式的話，請看下面：
<pre>msg.ts:[2017-01-01T00:00:00.000Z TO 2017-01-03T00:00:00.000Z]</pre>
這是指找出 msg.ts 欄位是 2017/1/1 ~ 2017/1/3 的所有資料，直接輸入到 Query 的那塊即可。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-3.png"><img class="alignnone size-full wp-image-7276" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-3.png" alt="" width="1010" height="483" /></a>

除此之外也可以用 Kibana Filter 的方式處理，你可以在 Filter 使用 Elasticsearch DSL 的語法；不過這稍微複雜一點，因為 Kibana Filter 有點被隱藏起來，可以參考下面的說明

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-5.png"><img class="alignnone size-large wp-image-7278" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Kibana-5-1024x826.png" alt="" width="660" height="532" /></a>

接著搜尋框會出現像下圖的東西，點擊「編輯」後貼入語法即可

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照_2017-01-19_上午2_15_48.jpg"><img class="alignnone size-full wp-image-7279" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照_2017-01-19_上午2_15_48.jpg" alt="" width="911" height="457" /></a>
<pre>{
  "query": {
    "range": {
      "msg.ts": {
        "gte": 1483200000000,
        "lte": 1483372800000
      }
    }
  }
}</pre>
Timestamp 是以毫秒為單位。
