---
title: "用MSNShell以及SimpLite-Yahoo加密你的即時通訊訊息,防止網管側錄"
date: 2010-01-22T19:26:07
slug: "msnshell-simplite-encrypt-im-messages"
aliases: ["/posts/%e7%94%a8msnshell%e4%bb%a5%e5%8f%8asimplite-yahoo%e5%8a%a0%e5%af%86%e4%bd%a0%e7%9a%84%e5%8d%b3%e6%99%82%e9%80%9a%e8%a8%8a%e8%a8%8a%e6%81%af%e9%98%b2%e6%ad%a2%e7%b6%b2%e7%ae%a1%e5%81%b4%e9%8c%84/"]
tags: ["Instant Messaging", "Encryption"]
categories: ["Security"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_194640.png"><img class="alignnone size-large wp-image-2525" title="2010-01-22_194640" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_194640-375x400.png" alt="" width="375" height="400" /></a>

昨天去看報紙時突然看到一篇新聞是說104人力銀行的主管<a href="http://tw.news.yahoo.com/article/url/d/a/100119/11/1z1hm.html">監看員工的即時通訊息</a>,針對這件事我不予置評,畢竟這是大人的事情,而且站在公司的角度當然要做一些措施來防範員工洩密,公司也有告知員工會測錄即時通訊軟體,但是站在員工的角度來看一定很不爽,畢竟沒有人喜歡自己被監視,說著說著好像有點偏題啦～～其實這篇文章要教大家使用兩套程式:<strong>MSNShell</strong>以及<strong>SimpLite-Yahoo。</strong>

<strong>
<!--more-->

</strong>

<strong>MSNShell</strong>以及<strong>SimpLite-Yahoo</strong>這兩套程式<span style="color: #ff0000;"><strong>一個是幫MSN訊息加密的,另一個則是幫Yahoo即時通訊息加密的</strong></span>,其實SimpLite也有推出MSN加密版,但因為<strong>MSNShell</strong>這套程式有中文介面,因此在MSN的部分我就以MSNShell這套程式為主,MSNShell以及SimpLite-Yahoo這兩套程式的原理不難懂,就是在傳送出即時訊息時會先加密再傳給別人,所以網管人員即使想側錄也只會側錄到一堆亂碼,不過使用MSNShell以及<strong>SimpLite-Yahoo</strong>有一個地方很不方便,<span style="color: #ff0000;"><strong>那就是除了發話端(你自己)要裝程式以外收話端(對方)也要裝程式</strong></span>,不然你傳給對方的訊息式不會經過加密的。
<blockquote><strong>補充:MSNShell這款程式除了單純的加密以外還有提供很多好玩的功能,未來有空站長會再講,大家也可以去他的</strong><a href="http://my.msnshell.com/"><strong>官網</strong></a><strong>找看看,另外千萬要注意如果是要加密訊息一定要兩台電腦都裝上加密程式,例如A電腦傳資料到B電腦那麼A.B兩台電腦都要裝加密程式才行</strong></blockquote>
<h3>MSNShell資訊</h3>
<ul>
	<li>主要功能: 加密MSN通訊的內容,防止惡意程式.網管人員監看</li>
	<li>官方網站: <a href="http://my.msnshell.com/">http://my.msnshell.com/</a></li>
	<li>載點: <a href="http://dl.msnshell.net/Install-MSNShell-5.4.12.15.exe">官方載點</a>｜Xun6 | <a href="http://www.4shared.com/file/225743738/308754ae/Install-MSNShell-541221.html ">4Shared</a> | <a href="http://www.box.net/shared/id12z85y39">Box.net</a></li>
	<li>掃毒報告: <a href="http://www.virustotal.com/analisis/c464f187c9a7af98eb7b75d352baffe2c0275a0f38b18ecace47416a381fc27a-1263915305">VirusTotal</a></li>
	<li>MD5碼: 9ff0682054070ece83a934bec3d493fa</li>
</ul>
<h3>SimpLite-Yahoo資訊</h3>
<ul>
	<li>主要功能: 加密即時通訊息的內容,防止惡意程式.網管人員監看</li>
	<li>官方網站: <a href="http://goo.gl/SO63">http://goo.gl/SO63</a></li>
	<li>下載點: <a href="http://www.secway.fr/us/products/simplite_yahoo/getsimp.php">官方載點</a>｜Xun6 | <a href="http://www.4shared.com/file/225758707/6174b44d/SimpLite-Yahoo-2_2_17-en.html">4Shared</a> | <a href="http://www.box.net/shared/eyp2yjns01">Box.net</a></li>
	<li>掃毒報告: <a href="http://www.virustotal.com/analisis/8ffc454dc529552570fb8065c54ae05b394ca094290b9c42867cf036b520d396-1262000460">VirusTotal</a></li>
	<li>MD5碼: c9d3007f4d74490b5ce11ec4567651e1</li>
	<li>介面語言: 英文</li>
</ul>
<h3>MSNShell安裝及使用教學:</h3>
1.下載完MSNShell安裝檔以後雙擊安裝檔

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234237.png"><img class="size-large wp-image-2482 alignnone" title="2010-01-19_234237" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234237-500x303.png" alt="" width="500" height="303" /></a>

2.如果出現安全性警告就直接按【執行】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234621.png"><img class="size-full wp-image-2484 alignnone" title="2010-01-19_234621" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234621.png" alt="" width="414" height="288" /></a>

3.選擇【正體中文】然後按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234837.png"><img class="size-full wp-image-2485 alignnone" title="2010-01-19_234837" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234837.png" alt="" width="455" height="344" /></a>

4.選擇【已閱讀.......】然後按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235024.png"><img class="alignnone size-full wp-image-2486" title="2010-01-19_235024" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235024.png" alt="" width="455" height="344" /></a>

5.接下來程式會提醒你一些東西,我是覺得沒什麼重點就直接按【下一步】吧

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235151.png"><img class="alignnone size-full wp-image-2487" title="2010-01-19_235151" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235151.png" alt="" width="455" height="344" /></a>

6.設定安裝路徑,除非你有作什麼硬碟空間規劃,不然預設值就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_2353151.png"><img class="alignnone size-full wp-image-2489" title="2010-01-19_235315" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_2353151.png" alt="" width="469" height="358" /></a>

7.開始安裝了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235343.png"><img class="alignnone size-full wp-image-2490" title="2010-01-19_235343" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235343.png" alt="" width="455" height="344" /></a>

8.安裝完畢後MSNShell會問你是否要安裝及設定其他的東西,例如表情符號,依你自己的需要設定即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235615.png"><img class="alignnone size-full wp-image-2491" title="2010-01-19_235615" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235615.png" alt="" width="455" height="344" /></a>

9.接下來開啟並登錄MSN主程式,然後選擇上方工具列【Shell】→【設定】(把視窗放大最大就會看到Shell的按鈕了)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220046.png"><img class="alignnone size-large wp-image-2493" title="2010-01-20_220046" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220046-334x400.png" alt="" width="334" height="400" /></a>

10.選擇【聊天通訊加密】然後把【啟用聊天加密】打勾在按【確定】就可以囉

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220354.png"><img class="alignnone size-large wp-image-2494" title="2010-01-20_220354" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220354-375x400.png" alt="" width="375" height="400" /></a>
<!--nextpage-->
<h3>SimpLite-Yahoo安裝及使用教學:</h3>
1.開啟SimpLite-Yahoo的安裝檔(如果出現安全性警告就直接按【執行】)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220628.png"><img class="alignnone size-large wp-image-2495" title="2010-01-20_220628" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220628-500x303.png" alt="" width="500" height="303" /></a>

2.按一下【NEXT＞】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220736.png"><img class="alignnone size-large wp-image-2496" title="2010-01-20_220736" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220736-493x400.png" alt="" width="493" height="400" /></a>

3.選擇【I Agree】然後按【Next＞】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220910.png"><img class="alignnone size-large wp-image-2497" title="2010-01-20_220910" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220910-493x400.png" alt="" width="493" height="400" /></a>

4.設定SimpLite-Yahoo這個程式要給哪些人使用,可以選擇只有自己(Just me)或所有人(every one),差別在於你設定只有自己的話就只有安裝這個程式的Windows帳戶能開啟這個程式,而設定所有人則代表這台電腦的所有使用者都能使用程式,另外你還可以設定安裝位置,設定完以後就按【NEXT＞】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221303.png"><img class="alignnone size-large wp-image-2498" title="2010-01-20_221303" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221303-493x400.png" alt="" width="493" height="400" /></a>

5.按一下【NEXT＞】就可以開始安裝了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221338.png"><img class="alignnone size-large wp-image-2499" title="2010-01-20_221338" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221338-493x400.png" alt="" width="493" height="400" /></a>

6.安裝完畢以後連續三個步驟都直接按【NEXT】就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221723.png"><img class="alignnone size-large wp-image-2501" title="2010-01-20_221723" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221723-493x400.png" alt="" width="493" height="400" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221827.png"><img class="alignnone size-large wp-image-2503" title="2010-01-20_221827" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221827-493x400.png" alt="" width="493" height="400" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221912.png"><img class="alignnone size-large wp-image-2502" title="2010-01-20_221912" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221912-493x400.png" alt="" width="493" height="400" /></a>

7.最後按一下【Close】即可完成

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222020.png"><img class="alignnone size-large wp-image-2504" title="2010-01-20_222020" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222020-493x400.png" alt="" width="493" height="400" /></a>

8.按下Close以後SimpLite-Yahoo會開啟一個視窗,直接按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222230.png"><img class="alignnone size-large wp-image-2505" title="2010-01-20_222230" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222230-500x330.png" alt="" width="500" height="330" /></a>

9.這裡是設定當沒有加密的訊息傳給你時是否要提醒,建議維持預設值然後按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180549.png"><img class="alignnone size-large wp-image-2507" title="2010-01-22_180549" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180549-500x330.png" alt="" width="500" height="330" /></a>

10.設定Yahoo即時通的連線方式,如果不知道就選【I don't know 】讓 SimpLite-Yahoo幫你設定然後按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180813.png"><img class="alignnone size-large wp-image-2508" title="2010-01-22_180813" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180813-500x330.png" alt="" width="500" height="330" /></a>

11.設定你即時通的版本,如果你是7~9版的就選A選項(見下圖),版本是7之前的話就選B選項,選完以後按【完成】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_181338.png"><img class="alignnone size-large wp-image-2509" title="2010-01-22_181338" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_181338-500x330.png" alt="" width="500" height="330" /></a>
<!--nextpage-->
12.接下來會開啟另一個視窗,直接按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185155.png"><img class="alignnone size-full wp-image-2510" title="2010-01-22_185155" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185155.png" alt="" width="492" height="345" /></a>

13.再來要設定你要使用的加密方法,設定方法請看下圖

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185507.png"><img class="alignnone size-full wp-image-2511" title="2010-01-22_185507" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185507.png" alt="" width="492" height="345" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185507.png"></a>14.接下來設定加密的密碼,如果設定太簡單的話系統會告知你要從新設定一個,如果不想重設的話就按【是】(參圖A)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185834.png"><img class="alignnone size-full wp-image-2512" title="2010-01-22_185834" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185834.png" alt="" width="416" height="166" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185834.png"></a><img class="alignnone size-full wp-image-2513" title="2010-01-22_190003" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190003.png" alt="" width="492" height="345" />

15.把你的滑鼠亂動,程式會利用滑鼠軌跡作一個金鑰,完成以後按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190124.png"><img class="alignnone size-full wp-image-2514" title="2010-01-22_190124" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190124.png" alt="" width="492" height="345" /></a>

16.程式會再跑另一個東西,等它跑完還是一樣按【下一步】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190346.png"><img class="alignnone size-full wp-image-2515" title="2010-01-22_190346" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190346.png" alt="" width="492" height="345" /></a>

17.終於完成了,感恩阿~~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190441.png"><img class="alignnone size-full wp-image-2516" title="2010-01-22_190441" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190441.png" alt="" width="492" height="345" /></a>

18.以後每次開機系統右下角都會出現一個小紅人就是有開啟成功,如果沒有出現小紅人的話可以到【開始→程式集→Secway→Simp Lite for Yahoo!→SimpLite for Yahoo!.exe】來開啟

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190807.png"><img class="alignnone size-full wp-image-2517" title="2010-01-22_190807" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190807.png" alt="" width="410" height="206" /></a>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_191206.png"><img class="alignnone size-large wp-image-2518" title="2010-01-22_191206" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_191206-298x400.png" alt="" width="298" height="400" /></a>

19.當你開機時也會出現一個視窗要你輸入密碼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-23_130350.png"><img class="alignnone size-full wp-image-2542" title="2010-01-23_130350" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-23_130350.png" alt="" width="398" height="314" /></a>

20.還有當有裝simplite-yahoo的人密你時系統會問你要不要交換金鑰,選擇Accept即可交換金鑰,交換完以後還要跟對方說你的密碼這樣子別人登陸時才能輸入密碼(上一個步驟要輸入密碼)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/617548902_c8d91b1a6b.jpg"><img class="alignnone size-full wp-image-2544" title="617548902_c8d91b1a6b" src="{{< param imageBase >}}/wp-content/uploads/2010/01/617548902_c8d91b1a6b.jpg" alt="" width="500" height="321" /></a>

<strong>注意:光你這裡設定要加密以外還要別人那裏設定才有用</strong>

<strong>有不懂得可以參考<a href="http://spock.pixnet.net/blog/post/5202866">http://spock.pixnet.net/blog/post/5202866</a></strong>
