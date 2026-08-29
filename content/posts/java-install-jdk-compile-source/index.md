---
title: "【Java】如何安裝JDK並且編譯Java原始碼？"
date: 2011-02-10T17:53:21
slug: "java-install-jdk-compile-source"
aliases: ["/posts/%e3%80%90java%e3%80%91%e5%a6%82%e4%bd%95%e5%ae%89%e8%a3%9djdk%e4%b8%a6%e4%b8%94%e7%b7%a8%e8%ad%afjava%e5%8e%9f%e5%a7%8b%e7%a2%bc%ef%bc%9f/"]
tags: ["Java", "JDK", "編譯"]
categories: ["Java"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_232013.jpg"><img class="size-large wp-image-87 aligncenter" title="2011-01-27_232013" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_232013-540x352.jpg" alt="" width="540" height="352" /></a></p>
最近這一週我都在台北商專上Java、JSP、SQL相關的課程,原本就有打算學Java,因為有一位網友說以後要做工程師必須要會的語言有C++跟Java,C++我有稍微碰過,不能說很強,但是要寫個小東西的能力還是有的,但是Java可以說是完全沒有碰過,剛好老師問說我要不要去台北商專上課就很高興的去了～

原本我是覺得Java沒有很好用,會想學除了因為他是工程師必修,還有一個原因是因為他的跨平台特性,可以讓我很方便的寫出Java甚至是手機的程式,還有Android的基礎也是Java,但是上了幾堂課之後我開始喜歡Java,有了當初第一次學程式語言時的衝勁,開始會凌晨12點抱者書念了... 這次當初學VB.NET時才有的感覺！！


<!--more-->


廢話不多說了,以下就由我來教大家如何安裝JDK,也就是寫完Java程式之後要用來編譯的工具,還有如何編譯java程式碼吧～ 以下的教學都是以命令提示字元模式來做教學,並不是Eclipse的教學
<h2>Java資訊</h2>
<ul>
	<li>Java官方網站：<a href="http://www.java.com/zh_TW/">http://www.java.com/zh_TW/</a></li>
	<li>JDK官方網站：<a href="http://www.oracle.com/us/technologies/java/index.html">http://www.oracle.com/us/technologies/java/index.html</a></li>
	<li>最新版本號：1.6</li>
	<li>可應用領域：手機程式、網路應用程式、一般桌面程式等皆可用到Java</li>
</ul>
<h2>安裝JDK</h2>
1.先將JDK下載好,以下是Windows的下載連結

JDK下載頁面：<a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">http://www.oracle.com/technetwork/java/javase/downloads/index.html</a>

JDK Windows 32bit：<a href="http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS_Developer-Site/en_US/-/USD/VerifyItem-Start/jdk-6u23-windows-i586.exe?BundledLineItemUUID=48.J_hCuQboAAAEtzvpZDb0I&amp;OrderID=1POJ_hCu3aQAAAEtwvpZDb0I&amp;ProductID=_omJ_hCwMp4AAAEsQIMcKluK&amp;FileName=/jdk-6u23-windows-i586.exe">官方載點</a>

JDK Windows 64bit：<a href="http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS_Developer-Site/en_US/-/USD/VerifyItem-Start/jdk-6u23-windows-x64.exe?BundledLineItemUUID=qaaJ_hCuZa8AAAEtOwdZDb0K&amp;OrderID=so6J_hCupHsAAAEtMAdZDb0K&amp;ProductID=ZUuJ_hCwEmwAAAEsOoMcKluK&amp;FileName=/jdk-6u23-windows-x64.exe">官方載點</a>

2.執行剛剛下載的JDK主程式,然後按【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_220638.jpg"><img class="alignnone size-full wp-image-88" title="2011-01-27_220638" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_220638.jpg" alt="" width="504" height="382" /></a>

3.這個頁面是設定你要把JDK安裝在哪裡,建議維持預設值以免後續設定麻煩

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_221009.jpg"><img class="alignnone size-full wp-image-89" title="2011-01-27_221009" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_221009.jpg" alt="" width="504" height="382" /></a>

4.安裝中請稍後～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_221940.jpg"><img class="alignnone size-full wp-image-90" title="2011-01-27_221940" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_221940.jpg" alt="" width="504" height="382" /></a>

5.安裝完成

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_222027.jpg"><img class="alignnone size-full wp-image-91" title="2011-01-27_222027" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_222027.jpg" alt="" width="504" height="382" /></a>

到這裡JDK就安裝完成了,但事實上有這麼簡單嘛？當然不可能,接者我們要來設定環境變數,也就是要讓你的作業系統知道jdk安裝在電腦的哪個資料夾的設定
<h2>環境變數設定</h2>
1.對我的電腦按右鍵選擇【內容】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_222555.jpg"><img class="alignnone size-full wp-image-92" title="2011-01-27_222555" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_222555.jpg" alt="" width="351" height="307" /></a>

2.如果你是Windows 7用戶的話要先點【進階系統設定】然後再點選【進階】→【環境變數】,而XP用戶則直接點【進階】→【環境變數】即可

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_223454.jpg"><img class="alignnone size-large wp-image-93" title="2011-01-27_223454" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_223454-540x423.jpg" alt="" width="540" height="423" /></a>

3.選擇【PATH】然後按【編輯】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_223744.jpg"><img class="alignnone size-full wp-image-94" title="2011-01-27_223744" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_223744.jpg" alt="" width="394" height="406" /></a>

4.在變數值的最後面加上【C:Program FilesJavajdk1.6.0_23bin;】,注意不要覆蓋掉你原本的變數值,是要在原本的變數值後面增加！如果你剛剛安裝jdk有改安裝位置的話那這裡也要改

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_223848.jpg"><img class="alignnone size-full wp-image-95" title="2011-01-27_223848" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_223848.jpg" alt="" width="357" height="145" /></a>

5.設定完之後按確定就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_224126.jpg"><img class="alignnone size-full wp-image-96" title="2011-01-27_224126" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_224126.jpg" alt="" width="396" height="404" /></a>

6.接者你可以開啟cmd(命令提示字元)來測試看看有沒有修改成功

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_224314.jpg"><img class="alignnone size-large wp-image-97" title="2011-01-27_224314" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_224314-397x540.jpg" alt="" width="397" height="540" /></a>

輸入javac然後按enter如果顯示【'javac' 不是內部或外部命令、可執行的程式或批次檔。】代表你設定有誤

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_224459.jpg"><img class="alignnone size-large wp-image-98" title="2011-01-27_224459" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_224459-540x352.jpg" alt="" width="540" height="352" /></a>
<h2>編譯java原始碼教學</h2>
當你寫好一個java程式時你必須要先把它存成*.java的檔案,然後進行編譯,而jdk的工作就是用來進行編譯用的～ 所以以下要教大家如何編譯和執行java程式

1.開啟cmd,然後輸入javac 〈你的原始碼位置〉→→javac跟原始碼位址中間是有空格的! 還有原始碼位址是完整位址包含磁碟機跟檔案名稱+附檔名的

輸入完之後按Enter

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_225638.jpg"><img class="alignnone size-large wp-image-99" title="2011-01-27_225638" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_225638-540x352.jpg" alt="" width="540" height="352" /></a>

2.如果你沒有出現任何訊息的話代表編譯成功,在你的原始碼的資料夾裡面應該會多一個附檔名class的檔案才對

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_225347.jpg"><img class="alignnone size-large wp-image-100" title="2011-01-27_225347" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_225347-540x372.jpg" alt="" width="540" height="372" /></a>

3.接者是要執行那個class檔,一樣打開cmd,然後接者的動作有點複雜：

(1)如果你的class檔不是在c槽的話,那就先輸入class檔所在地的磁碟編號,例如在d槽就輸入d:然後cmd就會切換到d槽

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_230234.jpg"><img class="alignnone size-large wp-image-101" title="2011-01-27_230234" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_230234-540x352.jpg" alt="" width="540" height="352" /></a>

(2)輸入cd 〈你的class檔路徑〉

p.s.不用包含檔名

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_230504.jpg"><img class="alignnone size-large wp-image-102" title="2011-01-27_230504" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_230504-540x352.jpg" alt="" width="540" height="352" /></a>

(3)輸入java 〈你的java程式名稱〉

p.s.程式名稱部分假設是test.class的話就輸入【java test】不用附檔名

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_231018.jpg"><img class="alignnone size-large wp-image-103" title="2011-01-27_231018" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-01-27_231018-540x305.jpg" alt="" width="540" height="305" /></a>

教學到此結束～ 希望大家Java玩的愉快
