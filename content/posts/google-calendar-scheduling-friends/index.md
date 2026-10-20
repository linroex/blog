---
title: "善用 Google 行事曆讓你輕鬆和朋友客戶約時間！"
date: 2017-04-07T11:30:39
slug: "google-calendar-scheduling-friends"
aliases: ["/posts/%e5%96%84%e7%94%a8-google-%e8%a1%8c%e4%ba%8b%e6%9b%86%e8%ae%93%e4%bd%a0%e8%bc%95%e9%ac%86%e5%92%8c%e6%9c%8b%e5%8f%8b%e5%ae%a2%e6%88%b6%e7%b4%84%e6%99%82%e9%96%93%ef%bc%81/"]
tags: ["Google"]
categories: ["Web Apps"]
---

約時間，是一門學問！每次信件往返喬開會時間時，總會希望能夠把行事曆直接寄給對方，讓對方直接選擇它可以的時間，乾淨利落！想著想著總覺得強大的 Google 應該有這類功能才對呀！ 研究後果不其然，Google 日曆可以讓你以網址形式分享行事曆給任何人，並將所有的行程都匿名成「忙碌」，對方只能看到你該時段有事情，但無法得知該行識背後的任何資訊（內容、時間、參與者等等）。


<!--more-->


預設情況下這個行事曆網址只能給單一行事曆使用；如果跟我一樣，你也將學校、公司、社團的事情分到多個行事曆內，別擔心，只要在網址的參數稍做手腳，就可以合併多個行事曆的資料囉！ 同樣的原理稍作應用，也可以是多個朋友的行事曆合併再一起看，一眼望去什麼時間可以約吃飯就明白啦，當然前提是你和朋友們都有使用行事曆的習慣囉！

首先登入 Google 行事曆，並選擇右上角的「設定」

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-07_下午11_58_38.jpg"><img class="alignnone size-full wp-image-7588" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-07_下午11_58_38.jpg" alt="" width="694" height="623" /></a>

進入行事曆設定後，選擇「日曆」並在想要分享的行事曆最後點擊「共用：編輯設定」

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22.jpg"><img class="alignnone size-full wp-image-7589" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22.jpg" alt="" width="871" height="859" /></a>

將「公開此日曆」和「僅分享我的有空/忙碌資訊」都打勾後儲存，這可以避免別人看到你的行程內容。如果希望同時合併多個行事曆一起顯示，記得每個都要打開。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_03_31.jpg"><img class="alignnone size-full wp-image-7590" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_03_31.jpg" alt="" width="735" height="664" /></a>

接著會回到「日曆」頁面，點選你想要分享日曆的名字

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22-1.jpg"><img class="alignnone size-full wp-image-7591" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22-1.jpg" alt="" width="871" height="859" /></a>

進到日曆詳細資訊後，往下滑你會看到「日曆網址」，對著 HTML 按右鍵複製連結網址就可以啦！ 接著你可以把這個網址分享給朋友，對方就能直接看到妳何時忙碌囉！

後面的日曆 ID 之後我們也會用到，可以先記著。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_07_26.jpg"><img class="alignnone size-large wp-image-7592" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_07_26-916x1024.jpg" alt="" width="660" height="738" /></a>

如果你只有一個行事曆，恭喜你，大功告成，但如果你跟我一樣是三刀流的話，把你剛剛複製的網址貼到記事本，例如：
<pre>https://calendar.google.com/calendar/embed?src=linroex%40gmail.com&amp;ctz=Asia/Taipei</pre>
你會發現裡面有個 src 參數，而 src 參數恰恰是剛剛的「日曆 ID」，事實上 src 參數可以填寫多個，例如這是我的公開忙碌行事曆，其中就有多個 src 參數，而這就是同時顯示多個行事曆的方式啦！
<pre>https://calendar.google.com/calendar/b/1/embed?src=5568b8r12gsksk53jvnuttuifo@group.calendar.google.com&amp;src=g8596g4q67n4g5q9in12d6j0h0@group.calendar.google.com&amp;src=38i6i61131mt5tbdu8gp0tu71s@group.calendar.google.com&amp;ctz=Asia/Taipei</pre>
除了 src 參數外，還有以下幾個參數可以使用：
<ul>
 	<li>title： 設定公開行事曆左上角的標題</li>
 	<li>wkst： 每週的一天從星期幾開始（週日=1）建議設為 2</li>
 	<li>mode：設定預設的顯示模式（ WEEK、AGENDA、MONTH ）</li>
</ul>
像我有將近 10 個行事曆，這時真的忍不住怨嘆自己幹嘛分這麼細，好的沒關係，懶人如我當然早就找到解法，可以快速獲取日曆 ID 啦！ 回到 Google 日曆首頁，按下右鍵檢視原始碼，並使用你的任何一個日曆 ID 搜尋，你會看到一團很像 JSON 的東西，把他們複製起來丟到 JSON Formatter ，後面的事情相信大家就可以自己搞定囉！
