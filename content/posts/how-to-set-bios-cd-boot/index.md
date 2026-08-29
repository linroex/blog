---
title: "如何設定BIOS成光碟開機?(重灌電腦必學)"
date: 2009-11-29T08:32:53
slug: "how-to-set-bios-cd-boot"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e8%a8%ad%e5%ae%9abios%e6%88%90%e5%85%89%e7%a2%9f%e9%96%8b%e6%a9%9f%e9%87%8d%e7%81%8c%e9%9b%bb%e8%85%a6%e5%bf%85%e5%ad%b8/"]
tags: ["BIOS"]
categories: ["BIOS", "作業系統"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_074650.jpg"><img style="border-bottom: 0px; border-left: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px" title="2009-11-29_074650" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_074650_thumb.jpg" border="0" alt="2009-11-29_074650" width="354" height="261" /></a>

光碟開機是學習重灌電腦最重要的一步,因為只要將光碟開機設定好,之後的安裝作業系統就不難了,幾乎都是按下一步即可搞定,所以今天這篇文章我要敎大家如何去修改BIOS上的開機設定。

何謂BIOS:<strong>基本輸出輸入系統</strong>（<strong>BIOS</strong>，<strong>B</strong>asic <strong>I</strong>nput/<strong>O</strong>utput <strong>S</strong>ystem），是載入在電腦硬體系統上的最基本的軟體程式碼，BIOS可以被視為專門與硬體溝通的微型作業系統，通常是使用針對相容CPU的組合語言寫成的。（此部份參考維基百科）


<!--more-->
<span style="color: #ffffff;">.</span>
<h3>基本操作 — 開啟BIOS選單</h3>
當電腦要開機時利用快捷鍵進入BIOS選單(一按下開機鍵就猛按快捷鍵),不過每間BIOS廠商進入BIOS選單的方法都不同,以下敎大家如何找出自己的進入鍵,首先當你開機以後會顯示很多文字不是嗎?這時候趕快找看看有沒有下圖中的文字或類似的字,找到以後就知道要按哪個鍵來進入BIOS了!像下圖是按DEL(Delete)來進入

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_075910.jpg"><img title="2009-11-29_075910" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_075910_thumb.jpg" border="0" alt="2009-11-29_075910" width="504" height="371" /></a>

註:通常桌上型電腦可按ESC,Delete或F4進入,而筆記型電腦通常都是按F2

<span style="color: #ffffff;">.</span>
<h3>基本操作 — BIOS控制方法</h3>
再來我得先敎大家如何使用BIOS,因為在BIOS裡面完全要用鍵盤來操控,不能用滑鼠,我以這部份大家要聽清楚囉

通常每間廠牌的BIOS控制方式都會寫在BIOS選單中,不過是英文的,所以下面我提供最常見的控制方式

<strong>1.AMIBIOS控制方式</strong>

方向鍵(↑↓):在項目間往上或往下移動,以下圖為例是在system Time跟system Date之間移動

方向鍵(→←):在標籤之間移動,所謂的標籤就是指上方的Main.Power.Boot等等

ESC:離開BIOS選單

F10:儲存設定並離開

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_080559.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_080559" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_080559_thumb.jpg" border="0" alt="2009-11-29_080559" width="504" height="371" /></a>

<strong>2.AwardBIOS控制方式</strong>

方向鍵:上下左右移動

ESC:離開BIOS選單

F10:儲存設定並離開

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082247.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082247" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082247_thumb.jpg" border="0" alt="2009-11-29_082247" width="504" height="263" /></a>
<h3><span style="color: #ffffff;">.</span></h3>
<h3>正式開始設定光碟開機</h3>
1.利用方向鍵移動到Boot這個標籤

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082423.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082423" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082423_thumb.jpg" border="0" alt="2009-11-29_082423" width="504" height="371" /></a>

2.在Boot Drevice Priority上按一下Enter來進入開機設定選單

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082558.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082558" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082558_thumb.jpg" border="0" alt="2009-11-29_082558" width="504" height="371" /></a>

3.選擇1st Boot Device上按一下Enter然後用方向鍵反白CDROM再按ENTER

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082726.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082726" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082726_thumb.jpg" border="0" alt="2009-11-29_082726" width="504" height="371" /></a>

註:有些電腦是要按+鍵或F8箭把CDROM這個選項推到最上面,方法並不難,先用方向鍵移動到CDROM選項上面再按+鍵即可

4.設定完以後按F10然後把安裝光碟插進去就會自動用光碟開機了

下圖為Windows PE3.0的開機選單

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082927.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082927" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082927_thumb.jpg" border="0" alt="2009-11-29_082927" width="504" height="433" /></a>
