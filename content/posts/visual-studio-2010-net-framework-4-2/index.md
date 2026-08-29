---
title: "Visual Studio 2010 - 使用.NET Famework 4來做軟體開發、更完善的平行化運算、自動化UI測試"
date: 2010-12-13T17:56:39
slug: "visual-studio-2010-net-framework-4-2"
aliases: ["/posts/visual-studio-2010-%e4%bd%bf%e7%94%a8-net-famework-4%e4%be%86%e5%81%9a%e8%bb%9f%e9%ab%94%e9%96%8b%e7%99%bc%e3%80%81%e6%9b%b4%e5%ae%8c%e5%96%84%e7%9a%84%e5%b9%b3%e8%a1%8c%e5%8c%96%e9%81%8b%e7%ae%97-2/"]
tags: [".NET", "編譯器", "Microsoft", "Visual Studio 2010"]
categories: ["編譯器"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_224908.jpg"><img class="size-large wp-image-4164 aligncenter" title="2010-12-10_224908" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_224908-520x314.jpg" alt="" width="520" height="314" /></a></p>
在2010年5月上市的Visual Studio 2010我一直都沒有去用過,一直到幾天前在Windows 7裡面安裝Visual Studio時我手邊的安裝光碟是32位元安裝不了,所以才去下載了Visual Studio 2010 Express來用,原本我以為Visual Studio 2010跟Visual Studio 2008沒有太大的差別,但安裝完之後才知道我錯了,光是在編譯出來的執行檔上面效能就差了很多,這是因為Visual Studio 2010裡的所有控制項都是用.NET Famework 4做的,所以執行速度較快,且Visual Studio 2010還升級（新增）了很多東西,例如：異質平台開發管理、DataTips、平行運算


<!--more-->


在這次Visual Studio 2010的所有新功能裡面我最喜歡的就是平行運算函式庫還有DataTips,在以往要開發平行運算的程式十分麻煩,需要花很多時間,可是在Visual Studio 2010裡面你可以直接使用內建的函式庫做出平行運算功能,還有就是完善化的DataTips的功能也讓我在偵錯上方便的監看每一個變數的值,另外有聽說這次VS主要是強在團隊開發這方面,不過小弟沒學過這方面的東西所以根本不懂軟體生命週期、流程控管這些東西是啥,只大概知道程式碼版本管理的好處,因為之前常發生寫錯程式碼然後要找問題找很久的事情

另外就是因為目前.NET Famework 4的普及率其實不太高,所以VS2010裡面還內建多版本開發（Multi-Targeting Support）的功能,讓你可以用個版本的.NET Famework來建置應用程式,這樣就不用擔心別人電腦沒裝.NET Famework 4而不能開啟你的程式的問題
<h2>Visual Studio 2010資訊：</h2>
<ul>
	<li>官方網站：<a href="http://www.microsoft.com/visualstudio/zh-tw">http://www.microsoft.com/visualstudio/zh-tw</a></li>
	<li>海報下載：<a href="http://msdownload.longsun.net/visualstudio/NET_Framework_4_Poster.pdf">.NET Famework 4海報</a> ｜ <a href="http://msdownload.longsun.net/visualstudio/Visual_Studio_2010_Shortcuts.zip">VS2010快捷鍵海報</a></li>
	<li>主程式（Express）下載：<a href="http://www.microsoft.com/express/Downloads/">http://www.microsoft.com/express/Downloads/</a></li>
	<li>官方說明文件：<a href="http://goo.gl/70KoB">http://goo.gl/70KoB</a></li>
</ul>
建議直接下載Web版的安裝程式就好了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184023.jpg"><img class="alignnone size-large wp-image-4142" title="2010-12-10_184023" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184023-520x315.jpg" alt="" width="520" height="315" /></a>
<h2>Visual Studio 2010特色：</h2>
<ol>
	<li>強化過的偵錯功能(DataTips)</li>
	<li>異質平台開發管理（Team Explorer Everywhere）</li>
	<li>內建平行運算函式庫</li>
	<li>完善的軟體生命週期與流程控管（這是啥我也不太懂,只大概知道是團隊開發程式在用的）</li>
	<li>程式碼版本管理功能</li>
	<li>自動化UI測試</li>
	<li>Multi-Targeting Support</li>
</ol>
設定要用哪個版本的.NET Famework編譯▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_225321.jpg"><img class="alignnone size-large wp-image-4165" title="2010-12-10_225321" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_225321-520x420.jpg" alt="" width="520" height="420" /></a>
<h2>安裝Visual Studio 2010</h2>
在這裡以Visual Basic 2010的web安裝檔來寫教學,至於其他語言的Web安裝檔也是差不多的安裝方式

1.先開啟剛剛下載的安裝程式

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_183854.jpg"><img class="alignnone size-large wp-image-4143" title="2010-12-10_183854" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_183854-520x356.jpg" alt="" width="520" height="356" /></a>

2.載入安裝時需要用的一些元件

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184139.jpg"><img class="alignnone size-full wp-image-4144" title="2010-12-10_184139" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184139.jpg" alt="" width="292" height="123" /></a>

3.按下一步

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184234.jpg"><img class="alignnone size-full wp-image-4145" title="2010-12-10_184234" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184234.jpg" alt="" width="516" height="465" /></a>

4.選擇我已閱讀並且接受授權條款在按下一步

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184333.jpg"><img class="alignnone size-full wp-image-4146" title="2010-12-10_184333" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184333.jpg" alt="" width="506" height="454" /></a>

5.選擇你除了編譯器本身以外還要安裝哪些程式,如果你要寫的程式是資料庫的就選擇Microsoft SQL Server那項吧,至於Silverlight就讓他裝反正之後總會用的到,而且Silverlight檔案也很小不會花太多時間

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184408.jpg"><img class="alignnone size-full wp-image-4147" title="2010-12-10_184408" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184408.jpg" alt="" width="506" height="454" /></a>

6.這裡是問你要安裝在哪裡,通常是維持預設值然後按下一步,同時在這個畫面還會告訴你系統到時候會安裝哪些程式讓你做確認,確定ok之後就按安裝

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184618.jpg"><img class="alignnone size-full wp-image-4148" title="2010-12-10_184618" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184618.jpg" alt="" width="506" height="454" /></a>

7.到這一步就可以閃人了,系統會自動幫你處理好下載跟安裝的所有工作,不過要花蠻多時間的說..... 尤其網路慢的人可以先去睡覺了xD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184727.jpg"><img class="alignnone size-full wp-image-4149" title="2010-12-10_184727" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184727.jpg" alt="" width="506" height="454" /></a>
