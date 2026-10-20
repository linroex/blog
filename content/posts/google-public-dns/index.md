---
title: "讓Google保護您的上網安全 - Google Public DNS"
date: 2010-01-02T17:27:13
slug: "google-public-dns"
aliases: ["/posts/%e8%ae%93google%e4%bf%9d%e8%ad%b7%e6%82%a8%e7%9a%84%e4%b8%8a%e7%b6%b2%e5%ae%89%e5%85%a8-google-public-dns/"]
tags: ["Google", "DNS"]
categories: ["Web Apps"]
---

<strong>Google Public DNS</strong>是Google最近推出的一項服務,可以讓您使用Google提供的免費DNS上網,使用Google Public DNS的好處就是可以讓你上網比較安全,<span style="color: #0000ff;">而且上網速度也可能會加快</span>,話說目前<a href="http://www.opendns.com/">openDNS</a>也有提供DNS服務,也蠻不錯用的,大家可以參考看看,另外<strong>Google Public DNS</strong>也是Google公司少數幾種不需要連到網站上即可使用的服務(直接在電腦上設定)


<!--more-->


不過我想很多人都不懂DNS是什麼吧!以下站長就先講解一下DNS的功用在教各位怎麼設定吧,所謂的DNS全名是Domain Name System,它的工作主要是將網址轉換成IP位址,例如現在你要連上站長的部落格(https://coder.tw)你會直接輸入網址,然後DNS會再將網址轉換成IP來連線,我的講解有點不清楚,這方面建議參考Avant Courier的文章,原本DNS的工作都是各大ISP來負責,各大ISP公司不一定會幫你逕行惡意網站的過濾等工作,但如果你使用<strong>Google Public DNS</strong>的話她會自動幫你檢查網址是否有問題
<blockquote>以下引用自http://avantcourier.digili.net/?p=1055

要比方的話，就如同現實世界中的建築物都會有其相對的 GPS 位置，北緯、東經幾度等，但那數值也不便記憶，所以我們平常用的是住址系統，XX路XX號X樓；當然這比喻不完全適切，因為住址系統並沒有直接指向 GPS 數值，兩者其實是不同的定位方式，但於此僅取其表現在人類溝通、記憶上的差異可對比之處。</blockquote>
<h3>Google Public DNS位址</h3>
<ol>
	<li>8.8.8.8</li>
	<li>8.8.4.4</li>
</ol>
<h3>Google Public DNS使用教學</h3>
使用Google Public DNS跟大部份的Google服務方法不一樣,不需要連到專門的網頁,而是直接在自己電腦上做設定即可,以下我們用Vista作業系統來做一篇教學,至於其他作業系統的用戶可以參考Google提供的<a href="http://code.google.com/intl/zh-TW/speed/public-dns/docs/using.html">簡易教學</a>

1.按左下角的【開始】→【連線到】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_170929.jpg"><img class="alignnone size-large wp-image-2420" title="2010-01-02_170929" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_170929-350x400.jpg" alt="" width="350" height="400" /></a>
2.選擇【網路和共用中心(網路上的芳鄰)】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_171651.jpg"><img class="alignnone size-large wp-image-2422" title="2010-01-02_171651" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_171651-500x384.jpg" alt="" width="500" height="384" /></a>
3.按一下【管理網路連線】,然後對【區域連線】按右鍵選【內容】(如果是XP用戶進入到網路上的芳鄰以後對區域網路案右鍵選內容)
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172013.jpg"><img class="alignnone size-large wp-image-2423" title="2010-01-02_172013" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172013-500x383.jpg" alt="" width="500" height="383" /></a>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172029.jpg"><img class="alignnone size-large wp-image-2424" title="2010-01-02_172029" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172029-500x375.jpg" alt="" width="500" height="375" /></a>
4.按一下【IPv4】→【內容】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172318.jpg"><img class="alignnone size-large wp-image-2425" title="2010-01-02_172318" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172318-342x400.jpg" alt="" width="342" height="400" /></a>
5.選擇【使用下列的DNS伺服器位址】,然後輸入8.8.8.8跟8.8.8.4再按【確定】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172531.jpg"><img class="alignnone size-large wp-image-2426" title="2010-01-02_172531" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172531-386x400.jpg" alt="" width="386" height="400" /></a>
6.設定完以後重新連線設定及會生效
