---
title: "Amazon Web Service 多重驗證（MFA）設備遺失處理記述"
date: 2014-01-15T00:00:09
slug: "aws-mfa-device-lost-recovery"
aliases: ["/posts/amazon-web-service-%e5%a4%9a%e9%87%8d%e9%a9%97%e8%ad%89%ef%bc%88mfa%ef%bc%89%e8%a8%ad%e5%82%99%e9%81%ba%e5%a4%b1%e8%99%95%e7%90%86%e8%a8%98%e8%bf%b0/"]
tags: ["AWS"]
categories: ["SRE"]
---

這是一篇記錄AWS MFA遺失時處理方式的文章，我的AWS帳戶都會啟用多重驗證，也就是登入時除了輸入密碼，還要輸入手機上面的驗證碼，但之前因為不小心刪掉驗證碼的App，害我不能登入AWS，而且AWS不知為何，一般會使用二段式驗證的網路服務，都會讓使用者可以把驗證碼寄到簡訊，但AWS卻只有提供手機App產生驗證碼這種方式！ 後來我查了些文章才解決這次危機。


<!--more-->


以下簡單記錄Amazon Web Service對於多重驗證設備遺失的處理方式，簡單來講他會要求留下你的電話號碼給他，之後客服會打電話給你，並且寄一封含有PIN碼的信到你信箱，在電話中他會和你核對PIN、Email以及登入密碼，如果核對成功他就會幫你把多重驗證（MFA）取消

首先是登入時會要求你輸入驗證碼，這時下面會有一行字「Having problems with your authentication device? Click here」，點進去並選擇「Contact Us」

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.35.02-PM.jpeg"><img alt="Screen Shot 2014-01-14 at 11.35.02 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.35.02-PM-520x279.jpeg" width="520" height="279" /></a>

&nbsp;

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.35.32-PM.jpg"><img class="alignnone size-large wp-image-6331" alt="Screen Shot 2014-01-14 at 11.35.32 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.35.32-PM-520x272.jpg" width="520" height="272" /></a>

他會要求輸入你的聯絡電話，就開心的輸入手機號碼吧，另外注意要輸入國碼（886）然後送出

問題的部份選預設的「Lost, stolen or damaged」即可

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.35.45-PM.jpg"><img class="alignnone size-large wp-image-6332" alt="Screen Shot 2014-01-14 at 11.35.45 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.35.45-PM-520x283.jpg" width="520" height="283" /></a>

大約過五分鐘，你就會接到一通沒有來電顯示的電話，請別猶豫，接起來就對了，也千萬不要因為聽到英文就直覺以為人家打錯電話，我還蠢蠢的回：「Sorry,I think you call wrong number.」

聽不懂英文不要怕，不會講英文也真的別怕，這邊簡單講接下來的流程

首先他會自我介紹，我就是自我介紹時聽到他說Amazon才搞懂是怎麼回事，在來他會問你信箱是什麼，請回答你註冊Amazon Web Service時的信箱

接者他會說一串英文，大概是說他要寄一封信到你的信箱，而這封信裡面會有一組PIN碼，請去收信並且告訴他PIN是多少

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.47.38-PM.jpg"><img class="alignnone size-large wp-image-6333" alt="Screen Shot 2014-01-14 at 11.47.38 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-14-at-11.47.38-PM-520x311.jpg" width="520" height="311" /></a>

&nbsp;

當你告訴客服PIN之後，他會在問你登入的密碼，其實我當時猶豫是否要跟他說，因為我的密碼是全球通用，如果這客服素質太低的話我會很歡樂，不過後來為了移除我的MFA還是告訴他了

等到三項資料都驗證完以後，他就會幫你把多重驗證（MFA）移除掉，之後可以直接透過帳號、密碼進行登入，歡呼吧！
<h2>感言：</h2>
沒錯，我要寫感言，因為這次經驗實在太難得了！當時我接到電話時完全嚇壞了，平常有外國人跟我問路，我都要比手畫腳講老半天，而且我的單字發音嚴重不標準，叫我講一兩句英語都夠難了，現在卻直接升級成英語會話，當時我第一個念頭是衝去找個英文好的人求救，可是感覺實在太丟臉哈哈，所以就硬者頭皮用破英文跟他聊完，中間還發生許多笑話，幸好客服人員脾氣真的很好，聽到我動不動冒出中文沒有什麼特別的反應，其實我超希望電話講到一半，他會突然冒出一句：「其實你可以講中文」，可是最後我的夢想還是破滅了；不過這次經驗真的很酷，跟老外講話沒有想像中的難，他們對於發音的容忍程度實在很高，而且英文對話真的不用太多單字，外國人講話只是稍微快一點，但你可以一直跟他說：「Sorry, can you repeat?」，連我這種多益考不到四百分的人都能成功和他溝通了！！ 這真的讓我信心暴增哈哈！

&nbsp;

&nbsp;
