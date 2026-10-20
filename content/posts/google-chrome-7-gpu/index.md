---
title: "Google Chrome 7 - 支援GPU硬體加速"
date: 2010-10-24T15:30:53
slug: "google-chrome-7-gpu"
tags: ["Chrome", "Hardware Acceleration"]
categories: ["Software"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141649.jpg"><img class="alignnone size-full wp-image-3863" title="2010-10-24_141649" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141649.jpg" alt="" width="508" height="277" /></a>

<a href="http://www.google.com/chrome?hl=zh-TW">Google Chrome 7</a>正式發表了,這次Chrome 7主打的功能是GPU硬體加速,除了這項新功能以外還把Chrome 6的一些Bug給改掉了,速度上據說<a href="http://goo.gl/7f8j">增加了60倍</a>,不過在Chrome 7裡面的硬體加速並非預設開啟的,必須要通過特殊手段才能啟用

GPU硬體加速有什麼好處嘛？簡單來講開啟了GPU硬體加速之後,你利用瀏覽器玩遊戲的速度會增加很多,像有些舊型的電腦在玩Facebook時就非常明顯會Lag,開啟GPU加速之後就比較部會有這個問題,所以建議喜歡上網(Facebook~)玩遊戲的朋友們一定要開啟這個功能


<!--more-->


關於下載與安裝Chrome可以到<a href="http://www.google.com/chrome?hl=zh-TW">http://www.google.com/chrome?hl=zh-TW</a>
<h2>Google Chrome介紹</h2>
<ul>
	<li>官方網站：<a href="http://www.google.com/chrome">http://www.google.com/chrome</a></li>
	<li>開發公司：Google</li>
	<li>下載點：<a href="http://www.google.com/chrome">同官方網站</a></li>
</ul>
<h2>如何開啟GPU硬體加速</h2>
1.先把你的Chrome更新到Chrome 7,然後對你的Google Chrome捷徑(一定要捷徑)點右鍵-&gt;內容

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141835.jpg"><img class="alignnone size-full wp-image-3864" title="2010-10-24_141835" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141835.jpg" alt="" width="293" height="460" /></a>

2.<strong>在捷徑頁籤的目標欄最後面加上下面的命令</strong>,加完之後按確定即可（這段要仔細看,不然你可能會失敗）

P.S. 要注意一點就是你在加入命令的時候,<strong>目標欄裡原本存的資料別刪掉</strong>,這段命令插入在目標欄的最後面,<strong>要注意這段命令與目標欄原本的資料之間要有空格</strong>
<pre>-enable-accelerated-compositing</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152132.jpg"><img class="alignnone size-full wp-image-3875" title="2010-10-24_152132" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152132.jpg" alt="" width="367" height="473" /></a>

3.下面是開啟GPU硬體加速前與開啟後的FPS值,整整差了一倍!!

開啟前：

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152549.jpg"><img class="alignnone size-large wp-image-3879" title="2010-10-24_152549" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152549-550x241.jpg" alt="" width="550" height="241" /></a>

開啟後：

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152918.jpg"><img class="alignnone size-large wp-image-3880" title="2010-10-24_152918" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152918-550x252.jpg" alt="" width="550" height="252" /></a>
