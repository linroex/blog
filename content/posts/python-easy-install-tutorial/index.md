---
title: "讓Python安裝模組變得更簡單～ easy_install使用教學+egg檔安裝教學"
date: 2011-05-01T16:50:04
slug: "python-easy-install-tutorial"
aliases: ["/posts/%e8%ae%93python%e5%ae%89%e8%a3%9d%e6%a8%a1%e7%b5%84%e8%ae%8a%e5%be%97%e6%9b%b4%e7%b0%a1%e5%96%ae%ef%bd%9e-easy_install%e4%bd%bf%e7%94%a8%e6%95%99%e5%ad%b8/"]
tags: ["Python"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827.jpg"><img class="aligncenter" title="2011-05-01_170827" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827-540x352.jpg" alt="" width="540" height="352" /></a>

大家都知道Python這套程式語言的特點就是它的擴充性極高，可以安裝一些第三方的模組來達到你想要的功能，例如你想要使用「中文」來寫程式的話可以安裝zhpy這個模組，但是安裝這些模組說難也還好，就是很麻煩，有些可能只要按下一步就好了，有些可能還要去調整系統的設定，在這裡要介紹一個程式叫做「easy_install」，它可以讓你的Pythonm樣安裝模組時變得很簡單，用法跟Linux的yum其實很類似，有了他你只需要一行指令就可以安裝好模組啦～ 另外easy_install還有一個功能就是可以幫你安裝所謂的egg格式
<h2>
<!--more-->
easy_install簡介</h2>
<ul>
	<li>安裝前需要你的電腦有安裝Python</li>
	<li>下載點：<a href="http://www.box.net/shared/fibb0r0dia">Box.net</a>｜<a href="http://www.4shared.com/file/zkrsEBgV/ez_setup.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/ez_setup.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZjYwYzY0ZWItOTVmNS00MGE4LThiMWItYzE3ZTVlMWNmNDUz&amp;hl=zh_TW">Google</a></li>
</ul>
<h2>easy_install安裝教學</h2>
1.把剛剛下載的檔案移動到Python根目錄（例如C:Python27）

2.打開cmd，然後輸入指令：
<ul>
	<li>cd c:Python27</li>
	<li>python ez_setup.py setuptools</li>
</ul>
P.S.  c:Python27的那部分請改成你的python路徑

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170026.jpg"><img class="alignnone size-large wp-image-457" title="2011-05-01_170026" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170026-540x352.jpg" alt="" width="540" height="352" /></a>

3.當你看到紅框中訊息時代表easy_install已經安裝成功囉

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170047.jpg"><img class="alignnone size-large wp-image-458" title="2011-05-01_170047" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170047-540x352.jpg" alt="" width="540" height="352" /></a>

4.安裝好之後，請把你的python資料夾中的Script資料夾加入到環境變數Path中，以我的舉例：

C:Python27Scripts  ->將這個路徑加入到環境變數Path中

每個人的路徑都可能不同

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170507.jpg"><img class="alignnone size-full wp-image-459" title="2011-05-01_170507" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170507.jpg" alt="" width="416" height="457" /></a>
<h2>如何快速安裝模組？</h2>
1.開啟CMD，然後輸入指令：

easy_install 模組名稱

如此....就可以安裝了，如果你是要安裝egg格式的模組也很簡單，模組名稱的地方改成模組安裝檔的位置，例如我把安裝檔存在c:download裡，然後檔名是123.egg，則指令為：

<strong>eazy_install c:download123.egg</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170735.jpg"><img class="alignnone size-large wp-image-460" title="2011-05-01_170735" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170735-540x352.jpg" alt="" width="540" height="352" /></a>

2.看到跟我很類似的畫面時代表安裝成功

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827.jpg"><img class="alignnone size-large wp-image-461" title="2011-05-01_170827" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827-540x352.jpg" alt="" width="540" height="352" /></a>
