---
title: "飯店訂房介面的三兩事"
date: 2017-02-25T16:55:26
slug: "hotel-booking-ui-notes"
aliases: ["/posts/%e9%a3%af%e5%ba%97%e8%a8%82%e6%88%bf%e4%bb%8b%e9%9d%a2%e7%9a%84%e4%b8%89%e5%85%a9%e4%ba%8b/"]
tags: ["Airbnb", "旅遊"]
categories: []
---

你都在哪裡訂飯店呢？ 是 Agoda、Booking.com 還是 Airbnb 呢？ 恰好最近要去日本旅遊，穿梭各訂房網站時，發現許多有趣的事情，例如明明評價篩選很簡單，為何 Airbnb 到現在還不肯提供呢？ 以及同樣簡單的日期選擇，在這次訂房的過程中，就看到兩種的做法，其實仔細去看不同訂房網站的介面，會發現許多有趣的事情呢！


<!--more-->


注意：這是來自一個旅客的不專業想法，想希望可以跟大家一起討論看看。

在選擇住宿日期時，常見的做法有兩種：
<ul>
 	<li>選擇入住、退房日期</li>
 	<li>選擇入住日期與天數</li>
</ul>
大部分平台如 Agoda、樂天旅遊、Airbnb 都是「選擇入住、退房日期」，而我在大江戶溫泉物語的官網看到的是「選擇入住日期與天數」，個人比較喜歡後者，不知道大家是否跟我一樣，對於時間的觀念不好；在 Airbnb 訂房時，我不太確定 3/5 ~ 3/9 到底是睡四天還是五天，反而在訂大江戶溫泉物語時，我可以很簡單的選擇 3/7 住一晚，這對我而言是比較直覺的選項。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.25.jpg"><img class="alignnone size-large wp-image-7521" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.25-1024x279.jpg" alt="" width="660" height="180" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.45.jpg"><img class="alignnone size-large wp-image-7522" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.45-1024x317.jpg" alt="" width="660" height="204" /></a>

此外，選擇日期的 UI 普遍都會使用 Date Picker，我個人很喜歡 Airbnb 的做法，如果已經客滿的日期會無法點選，這樣一目瞭然不用等送出後才發現，是不錯的做法。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.20.53.jpg"><img class="alignnone size-full wp-image-7523" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.20.53.jpg" alt="" width="332" height="493" /></a>

講到這個，就順便分享下 Peach 的日期選擇，真的超喜歡這介面的！可以一眼就找到最便宜的日期，不用在那邊「上一週」、「下一週」慢慢按，也就是這介面導致我不小心買了機票...

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.22.18.jpg"><img class="alignnone size-full wp-image-7524" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.22.18.jpg" alt="" width="988" height="604" /></a>

在訂房金額呈現方面，以三日兩人來說，分為幾種做法：
<ul>
 	<li>顯示總金額</li>
 	<li>顯示每日每人金額</li>
 	<li>顯示每日每房金額</li>
 	<li>顯示每日金額</li>
</ul>
以 Airbnb 來說顯示的金額是每日的金額，會自動幫你計算人數，而 Booking.com 則是顯示三日兩人的總金額，個人認為顯示的方式當然是挑「看起來最少」的那個，雖然實質上沒有差，但你有聽過「朝三暮四」的故事嗎？ 別以為只有猴子是這樣，其實人類也差不遠呢，此外在金額顯示時要清楚的說明計算方式是總金額還是每日金額，避免使用者誤會，這點 Airbnb 雖然有做，但顯示的不是很清楚，最開始我還以為是每日每房金額，不分人數的。

Booking.com 雖然介面設計不好看，但在金額標示的部分很清楚。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.30.50.jpg"><img class="alignnone size-full wp-image-7525" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.30.50.jpg" alt="" width="823" height="242" /></a>

Airbnb 雖然做得很簡潔，但金額究竟是每、每房還是總金額卻容易混淆。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.31.26.jpg"><img class="alignnone size-large wp-image-7526" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.31.26-1024x640.jpg" alt="" width="660" height="413" /></a>

&nbsp;

常使用 Airbnb 的朋友，不知是否也跟我有相同困擾：「為什麼 Airbnb 不讓我用評價去過濾或排序？」這在技術上絕非困難，其他的訂房網站也都有提供，但這問題必須回歸到 Airbnb 的基本特性 - 共享經濟，他的房源大多都是「家」而非「飯店」，這些房源的營運時間落差很大，不像飯店 24 小時營業，Airbnb 的房源可以選擇只在某幾天租給別人住，這時候如果提供評價篩選，部分「較少營業」的房源就很容易被篩選掉，這其實是商業考量而非技術問題。今天如果有評價排序，那些低評價數量的自然很容易被篩選掉，這對後進者以及真正符合 Airbnb 精神的房主人而言十分不利。

Airbnb 和其他訂房網站在「數據呈現」這方面都做得很好，會善用各種數據吸引使用者儘快下訂，例如 Agoda 會顯示「最後一間」或「還有 10 人也在看」來誘惑你，Airbnb 也會用「過去一週瀏覽量」、「200 位旅客儲存了此房源」來提供數據化、易於比較的資訊，這是我認為很棒的做法，針對最後一步 Cal to Action，也提供數據來做客觀比較。不過要注意，在呈現這些數字時，請務必強調時間遠近，例如「過去一週」，畢竟一年來的瀏覽量其實對使用者意義不大，還有別像 Agoda 一樣每間都是「最後一間」。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.00.03.jpg"><img class="alignnone size-full wp-image-7527" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.00.03.jpg" alt="" width="340" height="515" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.45.26.jpg"><img class="alignnone size-large wp-image-7528" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.45.26-1024x453.jpg" alt="" width="660" height="292" /></a>

最後也是最重要的，雖然呈現完整的資訊給旅客很重要，但如果不經設計全都顯示出來，只會變成髒亂的頁面，要善用網頁的互動特性，讓介面簡潔但又能呈現各項資訊，這件事情 Airbnb 做得很好，這也是我很喜歡 Airbnb 但討厭 Agoda、Booking.com 的原因，每次到 Agoda 這類傳統訂房網站，都有種在看廣告網站的感覺，究其原因只是呈現的資訊太過「完整」卻沒有善加收納。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.49.45.jpg"><img class="alignnone size-large wp-image-7529" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.49.45-1024x775.jpg" alt="" width="660" height="500" /></a>

相對於 Airbnb (下圖) ，Agoda (上圖) 的房源清單頁明顯雜亂，呈現過多資訊希望讓旅客全面的了解，但這樣做卻反而造成干擾。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.50.27.jpg"><img class="alignnone size-large wp-image-7530" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.50.27-1024x631.jpg" alt="" width="660" height="407" /></a>

金額部分也是，好好的呈現「一種金額」很難嗎？

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.53.18.jpg"><img class="alignnone size-large wp-image-7531" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.53.18-1024x442.jpg" alt="" width="660" height="285" /></a>

有時會覺得，不是 Airbnb UX 做太好，是他的對手都太不用心了... 簡單的分享，只是些我在訂房時發現的小事。
