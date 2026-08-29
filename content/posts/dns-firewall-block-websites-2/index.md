---
title: "DNS Firewall - 限制進入指定網站，快速修改DNS對應"
date: 2011-01-21T11:46:20
slug: "dns-firewall-block-websites-2"
aliases: ["/posts/dns-firewall-%e9%99%90%e5%88%b6%e9%80%b2%e5%85%a5%e6%8c%87%e5%ae%9a%e7%b6%b2%e7%ab%99%ef%bc%8c%e5%bf%ab%e9%80%9f%e4%bf%ae%e6%94%b9dns%e5%b0%8d%e6%87%89-2/"]
tags: ["DNS", "Windows", "Facebook", "localhost"]
categories: ["軟體分享", "VB.NET"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_112455.jpg"><img class="size-full wp-image-4393 aligncenter" title="2011-01-21_112455" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_112455.jpg" alt="" width="339" height="413" /></a></p>
DNS Firewall是站長最近寫的一個程式，主要功能是可以設定禁止進入某些網站，像是你家裡面有小孩然後你要禁止他們去看色情網站或是上Facebook的話，你就在程式你輸入這兩個網站的網址，然後之後這台電腦就不能連線到這兩個網站囉～ DNS Firewall這程式原理其實很簡單就是去修改Windows內建的一個host檔，然後將那些被禁止的網站的DNS對應到127.0.0.1，也就是自己電腦，所以他就上不去那些網站囉xD


<!--more-->

<h2>DNS Firewall資訊</h2>
<ul>
	<li>作者：聽．風</li>
	<li>開發環境：VB2010</li>
	<li>下載點：Xun6 ｜ <a href="http://www.4shared.com/file/Lg4ma-Yy/DNS_Firewall.html">4Shared </a>｜<a href="http://www.box.net/shared/yu97dzye3z"> Box.net</a></li>
	<li>專案原始碼： <a href="http://www.4shared.com/file/vvqOV3P0/DNS_Firewall.html ">4Shared </a>｜ <a href="http://www.box.net/shared/8933686dvh">Box.net</a> ｜ Xun6</li>
	<li>執行條件：安裝.NET Famework 3及以上版本</li>
</ul>
<h2>DNS Firewall使用教學</h2>
1.先下載好DNS Firewall，並且對此程式點選右鍵，選擇【以系統管理員身分執行】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113344.jpg"><img class="alignnone size-large wp-image-4394" title="2011-01-21_113344" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113344-318x500.jpg" alt="" width="318" height="500" /></a>

2.開啟此程式之後，把你要封鎖的網站網址填到那個大框框裡（參下圖）一行可以填一個網址

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113634.jpg"><img class="alignnone size-full wp-image-4395" title="2011-01-21_113634" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113634.jpg" alt="" width="339" height="413" /></a>

3.設定好要封鎖的網站之後，按一下【寫入host檔】然後重開網路就可以了～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113752.jpg"><img class="alignnone size-full wp-image-4396" title="2011-01-21_113752" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113752.jpg" alt="" width="339" height="413" /></a>

4.如果有設定錯誤把你其實沒有要封鎖的網站也加到封鎖名單的話，就按一下【檢視】→【清除所有DNS對應】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_114347.jpg"><img class="alignnone size-full wp-image-4397" title="2011-01-21_114347" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_114347.jpg" alt="" width="339" height="413" /></a>
