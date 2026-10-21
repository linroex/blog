---
title: "Yam Batch Download - Batch Downloading Yam Music with Smart Naming"
date: 2010-07-27T22:33:05
slug: "yam-batch-download-smart-naming-2"
tags: ["Yam"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_220336.jpg"><img class="size-large wp-image-3515 aligncenter" title="2010-07-27_220336" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_220336-550x380.jpg" alt="" width="550" height="380" /></a></p>
This time I want to introduce Yam Batch Download, a program I wrote myself. Its main feature is that it can batch-download music from Yam Sky, and it also names the music automatically. The reason I wanted to write this program is that almost all of my music was grabbed from <a href="http://mymedia.yam.com/">Yam Sky Media Sharing</a> using a tool called GootubeFlv. GootubeFlv is convenient, but for anyone who wants to batch-download music it's a real hassle — you have to repeat the same sequence over and over: copy the URL -> paste it into GootubeFLV -> copy the music name -> paste it into the download box -> download. It felt really tedious, so I wrote Yam Batch Download. Just paste the URLs into the program and it will download them for you and name them automatically.


<!--more-->


Originally I planned to write this program in VC++, but later, for technical reasons... I had underestimated how hard C++ was = = I assumed that since they're both VS-series compilers, the controls would work pretty much the same way, but it turned out C++ controls need the -> symbol, and I had never written a C++ windowed program in VS before. The first attempt took me a lot of time to figure out, so in the end I decided to write it in VB (along the way I also considered writing it in PHP ^^)
<h2>Program Information</h2>
<ul>
	<li>Download links: Xun6 | <a href="http://www.4shared.com/file/znNMxx7W/Yam_Batch_Download.html ">4Shared </a>| <a href="http://www.box.net/shared/6kq1r2vozp">Box.net</a></li>
	<li>Release date: 7/27</li>
	<li>Thanks to: <a href="http://jeremy.coder.tw/">Canghai</a> and PaNtHeR</li>
</ul>
7/31 update notes:
<ol>
	<li>Added a download status feature</li>
	<li>Fixed the part that was becoming unresponsive</li>
	<li>The program is set to automatically detect whether a URL is music or video, but downloading videos is very slow</li>
	<li>Changed the file download part to use a faster download method</li>
</ol>
<h2>Usage Tutorial</h2>
Using this software is very simple — it takes almost just two steps. First, download the file and open it.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221718.jpg"><img class="alignnone size-large wp-image-3516" title="2010-07-27_221718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221718-550x394.jpg" alt="" width="550" height="394" /></a>

Then paste the music URLs into that big white box.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221957.jpg"><img class="alignnone size-large wp-image-3517" title="2010-07-27_221957" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_221957-550x343.jpg" alt="" width="550" height="343" /></a>

You can also paste many URLs at once.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222140.jpg"><img class="alignnone size-large wp-image-3518" title="2010-07-27_222140" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222140-550x380.jpg" alt="" width="550" height="380" /></a>

Then set where the music should be saved.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222303.jpg"><img class="alignnone size-large wp-image-3519" title="2010-07-27_222303" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222303-550x381.jpg" alt="" width="550" height="381" /></a>

Finally~~ click Start Download, and then you'll notice a small issue: the program doesn't have a progress bar XDD (reason: laziness...) So you have to watch the status in the bottom-left corner. When the download finishes it will automatically change to "Download complete". Don't think it's frozen just because it isn't responding~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222530.jpg"><img class="alignnone size-large wp-image-3520" title="2010-07-27_222530" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222530-550x380.jpg" alt="" width="550" height="380" /></a>

Download complete~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222642.jpg"><img class="alignnone size-large wp-image-3521" title="2010-07-27_222642" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-27_222642-550x380.jpg" alt="" width="550" height="380" /></a>
