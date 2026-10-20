---
title: "安裝雙系統時電腦變得無法開機? 來修復MBR檔吧~"
date: 2010-09-11T22:19:31
slug: "fix-mbr-dual-boot-cannot-start"
aliases: ["/posts/%e5%ae%89%e8%a3%9d%e9%9b%99%e7%b3%bb%e7%b5%b1%e6%99%82%e9%9b%bb%e8%85%a6%e8%ae%8a%e5%be%97%e7%84%a1%e6%b3%95%e9%96%8b%e6%a9%9f-%e4%be%86%e4%bf%ae%e5%be%a9mbr%e6%aa%94%e5%90%a7/"]
tags: ["Windows"]
categories: ["Hardware"]
---

最近在玩Ubuntu時遇上了一件事,那就是如果你手動的把Ubuntu所在的硬碟給格式化你的電腦就會無法進入作業系統,這是因為系統的MBR檔被破壞了,同樣會遇到這種情況不只是把Ubuntu直接格式化會遇到,有時候灌雙系統也會遇到這種情況,遇到這種事情時別驚慌,因為MBR檔是可以修復的,而且步驟上也不是很難,首先要先準備好Windows的安裝光碟,然後設定好光碟開機....
<!--more-->

<blockquote>關於MBR的介紹可以參考:<a href="http://goo.gl/iiPV ">維基百科</a>

<strong>主開機紀錄</strong>（Master Boot Record，縮寫：MBR），又叫做<strong>主引導磁區</strong>，是<a title="電腦" href="http://zh.wikipedia.org/zh-tw/%E8%AE%A1%E7%AE%97%E6%9C%BA">電腦</a>開機後存取<a title="硬碟" href="http://zh.wikipedia.org/zh-tw/%E7%A1%AC%E7%9B%98">硬碟</a>時所必須要讀取的首個磁區，它在硬碟上的三維位址為（柱面，磁頭，磁區）＝（0，0，1）。

對於硬碟而言，一個磁區可能的位元組數為128×2<sup>n</sup> (n=0,1,2,3)。大多情況下，取n=2，即一個磁區(sector)的大小為512位元組。主引導磁區記錄著硬碟本身的相關資訊以及硬碟各個分割的大小及位置資訊，是資料資訊的重要入口。如果它受到破壞，硬碟上的基本資料結構資訊將會丟失，需要用繁瑣的方式試探性的重建資料結構資訊後才可能重新存取原先的資料。主引導磁區內的資訊是透過FDISK寫入的，它是<a title="低階格式化" href="http://zh.wikipedia.org/zh-tw/%E4%BD%8E%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96">低階格式化</a>的產物，和作業系統沒有任何關聯(作業系統是建立在<a title="高階格式化" href="http://zh.wikipedia.org/zh-tw/%E9%AB%98%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96">高階格式化</a>的硬碟分割之上，是和一定的檔案系統相聯繫的)。</blockquote>
<h2>請先準備好:</h2>
<ol>
	<li>Windows安裝光碟</li>
</ol>
<strong>並且將您的電腦設為光碟開機</strong>
<h2>MBR修復教學開始</h2>
1.把Windows安裝光碟放進電腦裡,然後讓他載入安裝畫面

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101227.jpg"><img class="alignnone size-large wp-image-3757" title="2010-09-11_101227" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101227-483x400.jpg" alt="" width="483" height="400" /></a>

2.進入到Windows的安裝歡迎畫面時按R來開啟修復主控台

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101350.jpg"><img class="alignnone size-large wp-image-3758" title="2010-09-11_101350" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101350-550x387.jpg" alt="" width="550" height="387" /></a>

3.輸入下列命令:

chkdsk c: /r

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101448.jpg"><img class="alignnone size-large wp-image-3759" title="2010-09-11_101448" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101448-550x387.jpg" alt="" width="550" height="387" /></a>

這個命令是檢查硬碟中有沒有錯誤,需要跑一段時間,c:˙部分改成你作業系統安裝的那顆硬碟代號,等ckhdsk命令跑完之後在輸入下面的命令:

fixmbr

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101701.jpg"><img class="alignnone size-large wp-image-3760" title="2010-09-11_101701" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101701-504x400.jpg" alt="" width="504" height="400" /></a>

這個命令可以自動幫你修復mbr檔,等他修好之後應該就ok了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101822.jpg"><img class="alignnone size-large wp-image-3761" title="2010-09-11_101822" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101822-504x400.jpg" alt="" width="504" height="400" /></a>

相關資訊可以到<a href="http://support.microsoft.com/kb/314058/zh-tw">http://support.microsoft.com/kb/314058/zh-tw</a> 這裡找
