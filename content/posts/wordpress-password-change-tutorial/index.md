---
title: "WordPress帳號&密碼修改教學"
date: 2009-05-17T12:40:18
slug: "wordpress-password-change-tutorial"
aliases: ["/posts/wp%e5%b8%b3%e5%af%86%e4%bf%ae%e6%94%b9%e6%95%99%e5%ad%b8/"]
tags: ["WordPress"]
categories: ["Blog"]
---

上一篇我們完成了WP的架設,系統也給了你一組帳號密碼,只不過那組密碼實在太難記了,而且帳號是adm很容易被猜出,對於部落格的安全有一定威脅
,現在就來?各位如何修改號&amp;密碼

一.帳號修改

1.進入虛擬主機的後台點選phpmyadmin


<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121342.jpg"><img class="alignnone size-full wp-image-1048" title="2009-05-17_121342" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121342.jpg" alt="2009-05-17_121342" width="640" height="310" /></a>

<!--more-->


2.你的資料庫後面會有一串字說啥"<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;"><strong>&lt;------------ Connect to this database",</strong>按一下即可進入資料庫管理界面</span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121112.gif"><img class="alignnone size-full wp-image-1049" title="2009-05-17_121112" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121112.gif" alt="2009-05-17_121112" width="549" height="376" /></a></span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">3.進入資料庫管理介面以後把網頁的捲軸往下拉,找到一個叫做"</span></span>wp_users<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">"的資料表<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121715.jpg"><img class="alignnone size-full wp-image-1050" title="2009-05-17_121715" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121715.jpg" alt="2009-05-17_121715" width="640" height="40" /></a></span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">4.進入到</span></span>wp_users資料表以後你會看到一項資料叫做admin的(如下圖),按一下admin後面的那隻筆即可修改

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122024.jpg"><img class="alignnone size-full wp-image-1051" title="2009-05-17_122024" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122024.jpg" alt="2009-05-17_122024" width="702" height="106" /></a>

5.把user_logi欄位的值改成你要的帳號,然後再按"執行"

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122806.jpg"><img class="alignnone size-full wp-image-1053" title="2009-05-17_122806" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122806.jpg" alt="2009-05-17_122806" width="640" height="461" /></a>


<!--more-->
二.修改密碼

接下來要交的修改密碼就不像剛剛那麼麻煩,還要去資料庫才行,只要從後台改就可以了,所以現在請先登入後台

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123050.jpg"><img class="alignnone size-full wp-image-1054" title="2009-05-17_123050" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123050.jpg" alt="2009-05-17_123050" width="640" height="461" /></a><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123141.jpg"><img class="alignnone size-full wp-image-1055" title="2009-05-17_123141" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123141.jpg" alt="2009-05-17_123141" width="460" height="383" /></a>

進入後台以後點一下帳號-個人資訊

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_1234411.jpg"><img class="alignnone size-full wp-image-1057" title="2009-05-17_1234411" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_1234411.jpg" alt="2009-05-17_1234411" width="173" height="511" /></a>

然後把捲軸拉到下面,有一個新密碼的欄位,把你要的密碼填進去,然後按更新個人資訊就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123616.jpg"><img class="alignnone size-full wp-image-1058" title="2009-05-17_123616" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123616.jpg" alt="2009-05-17_123616" width="827" height="194" /></a>
