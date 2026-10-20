---
title: "【Linux】如何修改使用者密碼（適用iOS系統修改SSH密碼）"
date: 2011-03-18T15:59:06
slug: "linux-change-user-password"
aliases: ["/posts/%e3%80%90linux%e3%80%91%e5%a6%82%e4%bd%95%e4%bf%ae%e6%94%b9%e4%bd%bf%e7%94%a8%e8%80%85%e5%af%86%e7%a2%bc%ef%bc%88%e9%81%a9%e7%94%a8ios%e7%b3%bb%e7%b5%b1%e4%bf%ae%e6%94%b9ssh%e5%af%86%e7%a2%bc%ef%bc%89/"]
tags: ["Linux", "SSH"]
categories: ["SRE"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_160128.jpg"><img class="size-large wp-image-4913 aligncenter" title="2011-03-18_160128" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_160128-520x395.jpg" alt="" width="520" height="395" /></a>

在Linux系統裡面為了安全性問題，我們一定要幫每個帳戶都設下一道密碼，使用者必須持有正確的密碼才能登入系統，而再這篇文章中就是要教大家在管理Linux類的主機、VPS時如何修改帳戶密碼，另外這個方法同樣可以應用在JB之後的iPad、iPhone等使用iOS的系統上，因為iOS預設的密碼是Alpine，如果你沒有去修改然後你的iOS裝置又有JB，那就有可能被別人攻擊
<h2>
<!--more-->
修改Linux使用者密碼:</h2>
1.連線到你的Linux主機，然後進入你要修改密碼的使用者，例如你要修改root的密碼，那你就要先登入root帳戶才可以

如果你是iOS設備，要修改密碼的話，就先登入root帳號，預設密碼是alpine，然後再照下面教學修改即可

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_154627.jpg"><img class="alignnone size-large wp-image-4907" title="2011-03-18_154627" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_154627-520x337.jpg" alt="" width="520" height="337" /></a>

2.輸入passwd，然後輸入新的密碼之後按Enter

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155428.jpg"><img class="alignnone size-large wp-image-4908" title="2011-03-18_155428" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155428-520x337.jpg" alt="" width="520" height="337" /></a>

3.再輸入一次密碼然後按Enter

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155556.jpg"><img class="alignnone size-large wp-image-4909" title="2011-03-18_155556" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155556-520x337.jpg" alt="" width="520" height="337" /></a>

4.當你看到以下訊息時代表密碼修改成功

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155625.jpg"><img class="alignnone size-large wp-image-4910" title="2011-03-18_155625" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155625-520x337.jpg" alt="" width="520" height="337" /></a>
