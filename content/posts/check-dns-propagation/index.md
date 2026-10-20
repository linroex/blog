---
title: "如何檢查網址的DNS是否設定成功？"
date: 2011-02-01T18:00:25
slug: "check-dns-propagation"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e6%aa%a2%e6%9f%a5%e7%b6%b2%e5%9d%80%e7%9a%84dns%e6%98%af%e5%90%a6%e8%a8%ad%e5%ae%9a%e6%88%90%e5%8a%9f%ef%bc%9f/"]
tags: ["DNS"]
categories: ["SRE"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163607.jpg"><img class="size-large wp-image-4567 aligncenter" title="2011-01-30_163607" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163607-520x339.jpg" alt="" width="520" height="339" /></a></p>
有在架網站的人應該很常設定網址對應DNS吧,也都知道DNS設定完之後要12～24小時才會正式對應完成,這是因為各家ISP業者需要清除DNS快取的關係,因為DNS對應完之後要等一段時間才能對應成功,不是立即的,所以今天要跟各位介紹一條指令,可以幫你檢查指定的網域是否對應到正確的IP了


<!--more-->


1.開啟cmd（命令提示字元）並輸入【nslookup】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163753.jpg"><img class="alignnone size-large wp-image-4568" title="2011-01-30_163753" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163753-520x339.jpg" alt="" width="520" height="339" /></a>

2.進入到nslookup之後,直接輸入你的域名,然後看返回的IP是否是正確的就可以檢查了~ 不用在那裡用Ping (寫到這裡突然啟發我一個想法XD)

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163947.jpg"><img class="alignnone size-large wp-image-4569" title="2011-01-30_163947" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163947-520x339.jpg" alt="" width="520" height="339" /></a>

3.你可以檢查完一個在繼續檢查下一個網址,都是直接輸入域名就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164048.jpg"><img class="alignnone size-large wp-image-4570" title="2011-01-30_164048" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164048-520x339.jpg" alt="" width="520" height="339" /></a>

4.使用完畢輸入exit就可以跳出了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164117.jpg"><img class="alignnone size-large wp-image-4571" title="2011-01-30_164117" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164117-520x339.jpg" alt="" width="520" height="339" /></a>
