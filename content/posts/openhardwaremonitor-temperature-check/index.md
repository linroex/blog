---
title: "OpenHardwareMonitor - 檢查電腦硬碟、顯示卡、CPU的溫度"
date: 2011-02-11T08:30:51
slug: "openhardwaremonitor-temperature-check"
aliases: ["/posts/openhardwaremonitor-%e6%aa%a2%e6%9f%a5%e9%9b%bb%e8%85%a6%e7%a1%ac%e7%a2%9f%e3%80%81%e9%a1%af%e7%a4%ba%e5%8d%a1%e3%80%81cpu%e7%9a%84%e6%ba%ab%e5%ba%a6/"]
tags: ["顯示卡", "CPU", "OpenHardwareMonitor", "溫度", "硬碟"]
categories: ["軟體分享", "Windows系列"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_203335.jpg"><img class="size-large wp-image-4690 aligncenter" title="2011-02-08_203335" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_203335-455x500.jpg" alt="" width="455" height="500" /></a></p>
因為之前有過顯示卡發出燒焦味才發現顯卡壞掉的慘痛經驗，所以才發現我原本用的那套硬體溫度檢查程式功能不夠用，原本用的那套只能偵測CPU溫度，後來我就去找了OpenHardwareMonitor這套軟體，他可以取得你電腦裡許多硬體的溫度，例如：硬碟、顯示卡、CPU、主機板等等，同時還能將溫度變化繪製成圖表或是匯出成檔案


<!--more-->

<h2>OpenHardwareMonitor介紹：</h2>
<ul>
	<li>官方網站：<a href="http://openhardwaremonitor.org/">http://openhardwaremonitor.org/</a></li>
	<li>下載點：Xun6 ｜ <a href="http://www.4shared.com/file/fDOTg7jQ/openhardwaremonitor-v021-beta.html ">4Shared </a>｜ <a href="http://www.box.net/shared/espvtur36n">Box.net</a> ｜ <a href="http://open-hardware-monitor.googlecode.com/files/openhardwaremonitor-v0.2.1-beta.zip">官方載點</a></li>
	<li>MD5碼：b49aa6923b202c22ef9f7e01c32e3ab0</li>
</ul>
<h2>OpenHardwareMonitor特色：</h2>
<ul>
	<li>可將溫度變化繪製成圖表</li>
	<li>可監控多項硬體設備的溫度（硬碟、顯示卡、CPU、主機板）</li>
	<li>持續更新中，支援許多種新硬體設備(包括AMD、Intel兩大陣營CPU)</li>
</ul>
<h2>OpenHardwareMonitor使用教學：</h2>
1.開啟OpenHardwareMonitor主程式，開啟速度有點慢要等他一下

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_200608.jpg"><img class="alignnone size-large wp-image-4682" title="2011-02-08_200608" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_200608-520x312.jpg" alt="" width="520" height="312" /></a>

2.主介面就會顯示出電腦裡的硬體的溫度還有硬體相關資訊，例如CPU時脈、主機版型號等等

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201105.jpg"><img class="alignnone size-large wp-image-4683" title="2011-02-08_201105" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201105-282x500.jpg" alt="" width="282" height="500" /></a>

3.要看硬體溫度算是比較簡單的，但如果要把硬體溫度的變化繪製成圖表呢？ 點選上方工具列的【View】→【Show Plot】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201404.jpg"><img class="alignnone size-full wp-image-4684" title="2011-02-08_201404" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201404.jpg" alt="" width="486" height="464" /></a>

4.開啟Show Plot之後你會注意到程式最下方多了一個框框，另外在各項溫度值的前面多了一個小框框讓你勾選，他的用意就是繪在下面的大框框裡顯示你勾選的溫度

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202055.jpg"><img class="alignnone size-large wp-image-4685" title="2011-02-08_202055" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202055-282x500.jpg" alt="" width="282" height="500" /></a>

例如我要顯示4個CPU的溫度，我就在CPU前打勾（我是4核心），然後下面就會有溫度變化

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202324.jpg"><img class="alignnone size-large wp-image-4686" title="2011-02-08_202324" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202324-426x500.jpg" alt="" width="426" height="500" /></a>

5.也可以將他設定成開機啟動，方法是按上方工具列【Options】→【 Run On Windows Startup 】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202538.jpg"><img class="alignnone size-large wp-image-4687" title="2011-02-08_202538" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202538-426x500.jpg" alt="" width="426" height="500" /></a>
