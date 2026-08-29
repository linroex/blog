---
title: "本站換用新主機DirectSpace，並且7/11~7/15可能沒辦法寫文章"
date: 2011-07-08T17:03:03
slug: "new-host-directspace-711-715-outage"
aliases: ["/posts/%e6%9c%ac%e7%ab%99%e6%8f%9b%e7%94%a8%e6%96%b0%e4%b8%bb%e6%a9%9fdirectspace%ef%bc%8c%e4%b8%a6%e4%b8%94711715%e5%8f%af%e8%83%bd%e6%b2%92%e8%be%a6%e6%b3%95%e5%af%ab%e6%96%87%e7%ab%a0/"]
tags: ["公告", "VPS", "DirectSpace"]
categories: ["本站公告"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_165402.jpg"><img class="size-full wp-image-5324 aligncenter" title="2011-07-08_165402" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_165402.jpg" alt="" width="244" height="61" /></a>

嗯，記得半年前我因為忍受不了「補夢網」虛擬主機的穩定性、效能所以改租用PhotonVPS這家公司的半管理VPS，當時因為是第一次嘗試使用VPS，所以怕自己會後悔，因此當時只有付半年的租金，然後就在昨天（7/7），半年的VPS租約到期，因此我就把網站換到了另一家VPS商，他叫做DirectSpace


<!--more-->


說實話我用了半年的PhotonVPS，感覺他們服務還算不錯，雖然網路上很多人都建議不要買這家，原因是對岸網友太多、主機不穩定，但是我這半年也沒遇到什麼大問題，主機當掉好像只遇過一次，而且不到半小時就修好了，資料消失這種大事也沒有遇上，不過既然如此為何我還要換用DirectSpace呢？ 這是因為價格的考量，PhotonVPS是所謂的「半管理」，也就是說你付的租金其實有一部分是在買他的服務，但是DirectSpace則是所謂的「無管理」，也就是說主機商的網管人員只負責「硬體方面的問題」，至於軟體方面就要由你自己解決，這兩者在價格上相差蠻多的，用了半年的PhotonVPS感覺我的能力也算可以了，所以就很高興的去租了無管理的VPS囉～

話說無管理跟半管理價格差異到底有多大？ 以PhotonVPS、DirectSpace來做比較，我的半管理VPS半年需要1800元（RAM：512MB），然後無管理的VPS也是半年1800元左右（RAM：1.5GB），直接看價格好像沒差，但注意記憶體的量差了3倍，價格卻是一樣的，如果都單用512MB RAM來做比較的話，DirectSpace最便宜可以到1000元半年的價格

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170023.jpg"><img class="alignnone size-large wp-image-5325" title="2011-07-08_170023" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170023-520x342.jpg" alt="" width="520" height="342" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170239.jpg"><img class="alignnone size-large wp-image-5326" title="2011-07-08_170239" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170239-520x343.jpg" alt="" width="520" height="343" /></a>

順便打一下廣告吧，如果有人想要換VPS的話推薦這家DirectSpace，他們是無管理的，還有他們在Portland（西岸）的機房很便宜，連線速度也很快，我目前就是用Portland的機房，這個機房會比較便宜不是因為有問題，而是因為Portland是DirectSpace的自有機房，所以價格當然便宜很多，另外DirectSpace是沒有中文客服人員的！ 所以發tk時別用中文，對方看不懂...

推薦連結：http://directspace.net/eportal/aff.php?aff=706

還有就是可能有人發現最近網站速度變得很快，我在想可能原因之一是因為新的主機，然後可能原因二我想可能是因為這次換主機，我把伺服器軟體也換掉了，改用所謂的lnamp來架設伺服器，用apache來處理網站的後端運算，然後用nginx來處理前端運算，聽網友說這麼做會讓網站速度變得很快，缺點是很吃記憶體，畢竟是一次執行兩個程序，目前平均會用到320MB的記憶體，還有lnamp的記憶體用量比起之前的lnmp不穩定，之前用lnmp時記憶體用量通常會固定一個區間，大約220MB~240MB，可是lnamp的變動還蠻大的，從250MB~350MB都有可能

另外就是說我下週要去參加一個活動，一整週的時間幾乎都在外面，晚上回到家也要忙者做一個比賽，所以下週（7/11～7/15）沒辦法發文章，還請讀者見諒
