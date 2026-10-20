---
title: "把筆記型電腦化身為無線網路基地台"
date: 2010-04-03T10:21:01
slug: "turn-laptop-into-wifi-hotspot"
aliases: ["/posts/%e6%8a%8a%e7%ad%86%e8%a8%98%e5%9e%8b%e9%9b%bb%e8%85%a6%e5%8c%96%e8%ba%ab%e7%82%ba%e7%84%a1%e7%b7%9a%e7%b6%b2%e8%b7%af%e5%9f%ba%e5%9c%b0%e5%8f%b0/"]
tags: ["Windows", "Wi-Fi"]
categories: ["Hardware"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_164010.png"><img class="aligncenter size-medium wp-image-2890" title="2010-03-28_164010" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_164010-300x283.png" alt="" width="300" height="283" /></a>

還記得前些日子站長買了一台iPod Touch吧!iPod Touch這種東西為了要求短小輕薄所以只能使用無線網路而不能使用一般較為常見的以太網路(ADSL這類),所以站長一直在想辦法把家裡的ADSL轉換成無線網路訊號,原本是打算直接買一台寬頻分享器,但是後來看價格有點貴,買不下手,所以就自己研究了一下剛好發現Vista裡面(XP.W7也可以)可以利用無線網卡把ADSL訊號直接轉成無線訊號,而且有效距離達30英呎,對於我這種需要無線網路的人而言真的很方便


<!--more-->


簡單來說,今天要介紹的東西其實就利用無線網卡來架設一個無線的區域網路,然後再將寬頻網路共用給連上這個區域網路的人,越多人連上來速度就會越慢,另外不只是寬頻網路可以共用,3G網路也可以共用

XP部分教學: <a href="http://blog.xuite.net/pccompass/travel/12341636">http://blog.xuite.net/pccompass/travel/12341636</a>

<a href="http://blog.xuite.net/pccompass/travel/12341636"></a>Windows 7部分教學: <a href="http://www.techbang.com.tw/posts/2080">http://www.techbang.com.tw/posts/2080</a>
<h2>筆電變身基地台教學</h2>
1.按【開始】→【連線到】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122441.png"><img class="size-medium wp-image-2880 alignnone" title="2010-03-28_122441" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122441-239x300.png" alt="" width="239" height="300" /></a>

2.按一下【設定連線或網路】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122919.png"><img class="alignnone size-large wp-image-2881" title="2010-03-28_122919" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122919-500x384.png" alt="" width="500" height="384" /></a>

3.連按兩下【設定無線網路臨機操作(電腦對電腦)網路】,不過iPod Touch或HTC這類的手持式設備也可以分享到網路的XD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122950.png"><img class="alignnone size-large wp-image-2882" title="2010-03-28_122950" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122950-500x384.png" alt="" width="500" height="384" /></a>

4.Ckick to 下一步(按一下【下一步】)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123009.png"><img class="alignnone size-large wp-image-2883" title="2010-03-28_123009" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123009-500x384.png" alt="" width="500" height="384" /></a>

5.網路名稱那裏輸入『這個無線網路的名字(自取)』,安全性類型那裏是要讓你設定需不需要加密,如果你怕你的訊號被人攔截或是怕別人偷用你的網路的話建議設定加密(選WEP或WPA2皆可),我個人都懶得設加密,反正我用iPod Tocuh時都沒再用啥重要東西,如果『你有設定加密的話就必須要把下面的安全性金鑰填好』,別看它寫的很難懂,其實『安全性金鑰=登錄網路時的密碼』,最後,把【儲存這個網路】給勾選在按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123048.png"><img class="alignnone size-large wp-image-2884" title="2010-03-28_123048" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123048-500x384.png" alt="" width="500" height="384" /></a>

<!--nextpage-->

6.正在設定當中,請把你的無線網路開關打開才可以成功

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123130.png"><img class="alignnone size-large wp-image-2885" title="2010-03-28_123130" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123130-500x384.png" alt="" width="500" height="384" /></a>

7.設定完成之後按一下【啟動網路網路連線共用】來開啟網際網路連線的共用

<strong>
</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123147.png"><img class="alignnone size-large wp-image-2886" title="2010-03-28_123147" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123147-500x384.png" alt="" width="500" height="384" /></a>

P.S.如果你找不到這個選項也可以直接對你要共用的網路連線(例如:ADSL)按右鍵→內容→共用,然後把【允許其它網路使用者透過這台電腦的網際網路連線來連線」打勾，然後再把下方的「允許其它網路使用者來控制或停用網際網路連線】勾選即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/04/2010-05-08_233154.jpg"><img class="alignnone size-large wp-image-3107" title="2010-05-08_233154" src="{{< param imageBase >}}/wp-content/uploads/2010/04/2010-05-08_233154-355x400.jpg" alt="" width="355" height="400" /></a>

8.【可用的選項】那裏選擇你的網路(ADSL或3G上網)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123230.png"><img class="alignnone size-large wp-image-2887" title="2010-03-28_123230" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123230-500x384.png" alt="" width="500" height="384" /></a>

9.設定中,請稍候^^

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123240.png"><img class="alignnone size-large wp-image-2888" title="2010-03-28_123240" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123240-500x384.png" alt="" width="500" height="384" /></a>

10.設定完成之後,照第一步的教學開啟【連線到】,然後雙擊兩下你剛剛新增的無線網路就完成嚕,之後開機也必須要照這個最後的步驟來開啟網路

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123338.png"><img class="alignnone size-large wp-image-2889" title="2010-03-28_123338" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123338-500x384.png" alt="" width="500" height="384" /></a>
