---
title: "【Firefox 4】讓Firefox可以直接進行SSH連線的附加元件 - FireSSH"
date: 2011-04-08T08:00:40
slug: "firefox-extension-firessh-ssh"
aliases: ["/posts/%e3%80%90firefox-4%e3%80%91%e8%ae%93firefox%e5%8f%af%e4%bb%a5%e7%9b%b4%e6%8e%a5%e9%80%b2%e8%a1%8cssh%e9%80%a3%e7%b7%9a%e7%9a%84%e9%99%84%e5%8a%a0%e5%85%83%e4%bb%b6-firessh/"]
tags: ["Firefox", "瀏覽器", "ssh", "FireSSH", "附加元件"]
categories: ["Firefox"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003704.jpg"><img class="size-large wp-image-4992 aligncenter" style="border: 1px solid black;" title="2011-04-05_003704" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003704-520x254.jpg" alt="" width="520" height="254" /></a></p>
如果你有在使用VPS，或是有在玩Linux的話，那你應該對SSH不陌生，他可以說是每一個Linux使用者都必須要學會的東西，SSH的功能就類似是遠端搖控，不過他是文字的遠端遙控，而非圖型的，一般來講我們進行SSH連線都是使用Pietty，如果是在iOS裝置上的話(iPhone、iPad等)，我會使用iSSH，但是如果是在瀏覽器上呢？ 透過FireSSH這個附加元件就可以讓你在上網時直接進行ssh的連線，不用再額外去開一個軟體～
<h2>
<!--more-->
FireSSH安裝教學</h2>
P.S.目前FireSSH只能在Firefox 4.0上運作

1.開啟Firefox，然後進入附加元件頁面

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003919.jpg"><img class="alignnone size-large wp-image-4993" title="2011-04-05_003919" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003919-520x412.jpg" alt="" width="520" height="412" /></a>

2.搜尋【FireSSH】然後按【安裝】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004100.jpg"><img class="alignnone size-large wp-image-4994" title="2011-04-05_004100" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004100-520x412.jpg" alt="" width="520" height="412" /></a>

3.安裝中....

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004118.jpg"><img class="alignnone size-large wp-image-4995" title="2011-04-05_004118" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004118-520x412.jpg" alt="" width="520" height="412" /></a>

4.安裝完之後要重開Firefox才會生效

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004150.jpg"><img class="alignnone size-large wp-image-4996" title="2011-04-05_004150" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004150-520x412.jpg" alt="" width="520" height="412" /></a>
<h2>FireSSH使用教學</h2>
1.在網址列輸入ssh:address:port即可

以下解釋ssh:address:port的意思：
<ul>
	<li>address就是你要進行ssh連線的目的地ip或網址</li>
	<li>port就是你的SSH所走的Port，預設都是22，除非你有更改，不然可以不寫Port是多少</li>
</ul>
例如：我要對本機進行SSH連線，然後我的SSH走66號Port則輸入：

ssh:localhost:66

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004924.jpg"><img class="alignnone size-large wp-image-4997" title="2011-04-05_004924" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004924-520x424.jpg" alt="" width="520" height="424" /></a>

2.他會要求你輸入帳號跟密碼

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005030.jpg"><img class="alignnone size-full wp-image-4998" title="2011-04-05_005030" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005030.jpg" alt="" width="275" height="190" /></a>

3.連線中

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005039.jpg"><img class="alignnone size-large wp-image-4999" title="2011-04-05_005039" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005039-520x427.jpg" alt="" width="520" height="427" /></a>

4.連線成功～輸入指令也都正常

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005136.jpg"><img class="alignnone size-large wp-image-5000" title="2011-04-05_005136" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005136-520x427.jpg" alt="" width="520" height="427" /></a>

&nbsp;
