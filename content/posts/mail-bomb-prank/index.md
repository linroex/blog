---
title: "Mail Bomb - 純粹惡作劇的信箱炸彈~"
date: 2010-10-05T22:28:00
slug: "mail-bomb-prank"
aliases: ["/posts/mail-bomb-%e7%b4%94%e7%b2%b9%e6%83%a1%e4%bd%9c%e5%8a%87%e7%9a%84%e4%bf%a1%e7%ae%b1%e7%82%b8%e5%bd%88/"]
tags: ["PHP", "Mail Bomb", "信箱炸彈", "惡作劇"]
categories: []
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_223404.jpg"><img class="size-large wp-image-3846 aligncenter" title="2010-10-05_223404" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_223404-550x299.jpg" alt="" width="550" height="299" /></a></p>
信箱炸彈是什麼? 其實這個詞可能是第一次出現... 在過去大家可能比較常聽到即時通炸彈,也就是一種會一直傳訊息給即時通聯絡人,然後讓對方因為短時間之內收到過多訊息而斷線的程式,Mail Bomb跟他很像,Mail Bomb直接翻成中文就叫做信箱炸彈,他跟即時通炸彈一樣都是會傳很多訊息給別人,但不同的是Mail Bomb他其實只是惡作劇...並沒有什麼真正的功能,他也不可能把對方信箱塞爆,因為以現在信箱的容量來講要塞爆是很困難的,還有別想用我的Mail Bomb系統來寄垃圾信件,因為這套程式是針對單一信箱寄很多封信,而不是針對很多信箱寄一封信,下面就來教大家怎用Mail Bomb吧~


<!--more-->
網址: <a href="http://linroex.summerhost.info/mail-bomb.php">http://linroex.summerhost.info/mail-bomb.php</a>

介面設計的很簡單,程式原理就是直接利用虛擬主機上提供的SMTP伺服器寄信,由於我架這程式的空間是國外的,所以寄信速度很慢,有時候還會被擋信,建議大家可以去下載原始檔,裝到自己的空間上執行,原始檔載點: <a href="http://goo.gl/WyuC">http://goo.gl/WyuC</a>

話說今天無聊就寫了這個程式,介面啥的都很簡陋,只有簡單用CSS做了些置中的效果,寄信的部份也是用PHP內建的mail函式,可能之後有空會改成用Gmail的SMTP寄信吧~

1.進入到Mail Bomb以後,輸入相關資訊,然後按開始轟炸,要注意的是要寄的數量那裡最高只能填50,還有對方電子郵件如果用Yahoo的話會被擋信(把原始檔裝到你的空間應該就可以正常了),再來就是信件的內文會跟主旨一模一樣,也就是說你主旨填Test的話那信件內文也會是Test,接下來要講的是這程式最好玩,也最能惡作劇的地方,就是透過這程式寄出的信,美依封的寄件者跟收件者都長的一樣,檢如你收件者填xxx@gmail.com,那麼等xxx他收到這封信時他會發現寄件者是他自己~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_222612.jpg"><img class="alignnone size-large wp-image-3843" title="2010-10-05_222612" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_222612-550x299.jpg" alt="" width="550" height="299" /></a>
