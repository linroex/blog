---
title: "Yam Batch Download - 批次抓取Yam音樂以及智慧命名功能"
date: 2010-07-27T22:33:05
slug: "yam-batch-download-smart-naming-2"
aliases: ["/posts/yam-batch-download-%e6%89%b9%e6%ac%a1%e6%8a%93%e5%8f%96yam%e9%9f%b3%e6%a8%82%e4%bb%a5%e5%8f%8a%e6%99%ba%e6%85%a7%e5%91%bd%e5%90%8d%e5%8a%9f%e8%83%bd-2/"]
tags: ["Yam"]
categories: ["Software"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_220336.jpg"><img class="size-large wp-image-3515 aligncenter" title="2010-07-27_220336" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_220336-550x380.jpg" alt="" width="550" height="380" /></a></p>
這次要跟大家介紹的Yam Batch Download是小弟自己寫的一個程式,主要功能就是可以從Yam天空批次抓音樂,還有自動幫音樂命名,會想寫這個程式是因為我的音樂幾乎都是用GootubeFlv這套工具從<a href="http://mymedia.yam.com/">Yam天空影音分享</a>上抓來的,雖然Gootubeflv很方便,但是對於要批次抓音樂的人來講很麻煩,必須一直重複:複製網址->貼到GootubeFLV->複製音樂名稱->貼到下載框框->下載的這套動作,感覺很麻煩,所以就寫的這套Yam Batch Download,只要把網址貼到程式裡就會幫你抓下來,並且自動命名


<!--more-->


話說原本是打算用VC++寫這套程式的,可是後來因為技術原因.... 我對於C++的難度太低估了= = 原本以為同樣都是VS系列的編譯器,在控制項方面都是差不多用法,沒想到C++的控制像是要用->符號,而且以前都沒用VS寫過C++的視窗程式,第一次寫實花了好多時間摸索,最後就決定用VB寫了(中間還考慮過用PHP寫^^)
<h2>程式資訊</h2>
<ul>
	<li>檔案載點: Xun6 | <a href="http://www.4shared.com/file/znNMxx7W/Yam_Batch_Download.html ">4Shared </a>| <a href="http://www.box.net/shared/6kq1r2vozp">Box.net</a></li>
	<li>發表日期: 7/27</li>
	<li>感謝: <a href="http://jeremy.coder.tw/">滄海</a>與PaNtHeR</li>
</ul>
7/31更新訊息:
<ol>
	<li>新增下載狀態功能</li>
	<li>將無法回應的部分修改好了</li>
	<li>程式裡面有設定自動偵測網址為音樂或影片,但是下載影片時速度很慢</li>
	<li>檔案下載部分改用速度更快的方法進行下載</li>
</ol>
<h2>使用教學</h2>
這套軟體的使用很簡單,幾乎兩個步驟即可搞定,首先請先下載好檔案並且開啟他

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221718.jpg"><img class="alignnone size-large wp-image-3516" title="2010-07-27_221718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221718-550x394.jpg" alt="" width="550" height="394" /></a>

然後把音樂網址貼到那個大大的白色框框

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221957.jpg"><img class="alignnone size-large wp-image-3517" title="2010-07-27_221957" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221957-550x343.jpg" alt="" width="550" height="343" /></a>

也可以一次貼很多網址

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222140.jpg"><img class="alignnone size-large wp-image-3518" title="2010-07-27_222140" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222140-550x380.jpg" alt="" width="550" height="380" /></a>

然後設定音樂存放位置

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222303.jpg"><img class="alignnone size-large wp-image-3519" title="2010-07-27_222303" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222303-550x381.jpg" alt="" width="550" height="381" /></a>

最後~~ 按開始下載,然後你會發現有點小問題就是說程式沒有設計進度條XDD(原因:懶...)所以你必須看左下角的狀態,下載好時會自動變成下載完成,別以為他沒反應是當機~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222530.jpg"><img class="alignnone size-large wp-image-3520" title="2010-07-27_222530" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222530-550x380.jpg" alt="" width="550" height="380" /></a>

下載完成了~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222642.jpg"><img class="alignnone size-large wp-image-3521" title="2010-07-27_222642" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222642-550x380.jpg" alt="" width="550" height="380" /></a>
