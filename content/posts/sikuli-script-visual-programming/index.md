---
title: "Sikuli Script - 創新.易寫的程式語言"
date: 2010-02-05T11:28:04
slug: "sikuli-script-visual-programming"
aliases: ["/posts/sikuli-script-%e5%89%b5%e6%96%b0-%e6%98%93%e5%af%ab%e7%9a%84%e7%a8%8b%e5%bc%8f%e8%aa%9e%e8%a8%80/"]
tags: ["MIT", "Sikuli", "程式語言"]
categories: ["程式語言"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/02/set-ip.png"><img class="size-large wp-image-2616 aligncenter" title="set-ip" src="{{< param imageBase >}}/wp-content/uploads/2010/02/set-ip-399x400.png" alt="" width="399" height="400" /></a></p>
<strong><a href="http://sikuli.org/">SIKULI</a></strong>是什麼?我想有用過外掛(線上遊戲輔助程式)的人都知道按鍵精靈這套有名的程式吧,目前的<strong>Sikuli Script</strong>就很類似按鍵精靈(但他不是外掛),Sikuli Script可以讓你很簡單的完成一個程式,目前大多數的程式語言都是完全文字式的程式碼,但Sikuli Script不一樣,它的程式碼是圖片,<strong>Sikuli Script</strong>的作者根本就是個天才,竟然想的到這麼有創意的東西,不過這樣講大家好像很不懂(什麼叫做用圖片寫程式....),下面就帶大家來完成一個<strong>Sikuli Script</strong>的程式吧!


<!--more-->


目前<strong>Sikuli Script</strong>的應用層面主要是寫腳本程式,例如自動登陸遊戲.即時通這類自動化功能,因為<strong>Sikuli Script</strong>才剛出來一段時間所以功能還不是很完備,但是Sikuli Script已經支援基本的if.loop等基本功能,所以還是可以寫出一個還算完整的程式啦~<span style="color: #ff0000;"><strong>另外你如果有意對Sikuli Script研究的話可以去研究<a href="http://www.python.org/">Python</a>這個程式語言,</strong></span>因為據官網說明Sikuli Script是使用Python所開發的,所以<a href="http://www.python.org/">Python</a>的那些迴圈.判斷式的用法跟<strong>Sikuli Script</strong>幾乎是一模一樣的
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="425" height="344" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/FxDOlhysFcM&amp;hl=zh_TW&amp;fs=1&amp;" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="425" height="344" src="http://www.youtube.com/v/FxDOlhysFcM&amp;hl=zh_TW&amp;fs=1&amp;" allowscriptaccess="always" allowfullscreen="true"></embed></object>
<h2></h2>
<div style="width: 100%;">
<div style="display: block; float: right; margin: 0px; padding: 4px 0px 0px 0px;"><a style="font-size: 11px; margin: 0px; font-family: verdana; text-decoration: none; padding: 0px;" title="建立你的粉絲名片貼" href="http://www.facebook.com/facebook-widgets/fanbadges.php" target="_TOP"><span style="color: #ffffff;">建立你的粉絲名片貼</span></a></div>
</div>
<!-- Facebook Fan Badge END -->
<h2>Sikuli Script資訊:</h2>
<ul>
	<li>官方網站: <a href="http://sikuli.org/">http://sikuli.org/</a></li>
	<li>作者網誌: <a href="http://blog.vgod.tw/">http://blog.vgod.tw/</a></li>
	<li>下載點: <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-win-20100201.exe">Windows版</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-osx-10.5-20100201.zip">Mac10.5版</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-osx-10.6-20100201.zip">Mac10.6版</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-linux-20100201.zip">Linux版</a></li>
	<li>教學: <a href="http://goo.gl/PV6D">http://goo.gl/PV6D</a></li>
	<li>使用條件:任何作業系統皆可使用,但電腦需安裝<a href="http://www.java.com/getjava">JRE6+</a>,另外此程式語言目前只支援在x86的CPU上使用</li>
	<li>個人載點(Windows版): Xun6 | <a href="http://www.4shared.com/file/225758699/56cc4834/Sikuli-IDE-win-20100201.html">4Shared</a> | <a href="http://www.box.net/shared/s2m59klvxm">Box.net</a></li>
	<li>掃毒報告: <a href="http://www.virustotal.com/analisis/c212eaa8228269471391a0efb7000cca43856cf932cc7d1a796332ec3cf2b27a-1265271782">VirusTotal</a></li>
	<li>MD5碼: 9b8cd09164195cdafb295f3a06953095</li>
</ul>
<span style="font-size: x-large;"><span><strong>
</strong></span></span><strong>SIKULI安裝:</strong>

P.S.本篇文章皆以Windows XP作教學範例

1.先到<a href="http://sikuli.csail.mit.edu/">SIKULI</a>的官網下載好安裝檔,然後確定自己的電腦有裝JRE這套程式之後開啟SIKULI的安裝檔

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101215.png"><img class="alignnone size-large wp-image-2617" title="2010-02-05_101215" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101215-500x375.png" alt="" width="500" height="375" /></a>

2.點擊【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101559.png"><img class="alignnone size-large wp-image-2618" title="2010-02-05_101559" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101559-500x400.png" alt="" width="500" height="400" /></a>

3.設定SIKULI的安裝位置然後按【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101653.png"><img class="alignnone size-large wp-image-2619" title="2010-02-05_101653" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101653-500x400.png" alt="" width="500" height="400" /></a>

程式會向您確認是否真的要安裝在您設定的資料夾,按【確定】即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101743.png"><img class="alignnone size-full wp-image-2620" title="2010-02-05_101743" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101743.png" alt="" width="268" height="122" /></a>

4.點擊【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101959.png"><img class="alignnone size-large wp-image-2621" title="2010-02-05_101959" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101959-500x400.png" alt="" width="500" height="400" /></a>

5.開始安裝,當上下兩條都完成時就按下【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102112.png"><img class="alignnone size-large wp-image-2622" title="2010-02-05_102112" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102112-500x400.png" alt="" width="500" height="400" /></a>

6.直接按下【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102152.png"><img class="alignnone size-large wp-image-2623" title="2010-02-05_102152" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102152-500x400.png" alt="" width="500" height="400" /></a>

7.完畢

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102219.png"><img class="alignnone size-large wp-image-2624" title="2010-02-05_102219" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102219-500x400.png" alt="" width="500" height="400" /></a>
<!--nextpage-->
<h2>用SIKULI寫一個簡單的小程式</h2>
以下我們要利用SIKULI來寫一個自動登錄即時通的小程式,各位看者步驟做即可

1.開啟Sikuli的主程式,然後依序點選【File】→【New】來開啟一個新的專案

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104351.png"><img class="alignnone size-full wp-image-2630" title="2010-02-05_104351" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104351.png" alt="" width="478" height="518" /></a>

2.開啟即時通主程式,但先不要登錄(也不要縮小)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104210.png"><img class="alignnone size-full wp-image-2629" title="2010-02-05_104210" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104210.png" alt="" width="251" height="511" /></a>

3.在程式碼區輸入click()然後把游標停在（）內

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110524.png"><img class="alignnone size-large wp-image-2631" title="2010-02-05_110524" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110524-447x400.png" alt="" width="447" height="400" /></a>

4.按一下SIKULI程式左上角的相機按鈕

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_103320.png"><img class="alignnone size-large wp-image-2626" title="2010-02-05_103320" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_103320-500x370.png" alt="" width="500" height="370" /></a>

5.用滑鼠拖曳出一個框框然後把及時通的輸入帳號框住

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110856.png"><img class="alignnone size-large wp-image-2632" title="2010-02-05_110856" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110856-500x375.png" alt="" width="500" height="375" /></a>

6.接下來會自動回到程式碼編輯區,換行在輸入type("你的帳號t你的密碼")

例如:type("linroext12345689")

這個步驟是要讓程式輸入你的帳號並自動換行再輸入密碼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111737.png"><img class="alignnone size-large wp-image-2636" title="2010-02-05_111737" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111737-447x400.png" alt="" width="447" height="400" /></a>

7.接下來一樣換行並輸入程式碼click(),游標一樣停在()內並且按一下相機按紐

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111420.png"><img class="alignnone size-large wp-image-2634" title="2010-02-05_111420" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111420-447x400.png" alt="" width="447" height="400" /></a>

8.一樣又滑鼠拖曳出一個框框並把登入的按鈕框住

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111557.png"><img class="alignnone size-large wp-image-2635" title="2010-02-05_111557" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111557-500x375.png" alt="" width="500" height="375" /></a>

9.到這樣就大概完成囉,妳先檢查一下你的程式碼是否跟我一樣,如果一樣的話就先把及時通的程式開啟,然後按一下綠色三角形按鈕就可以開始執行

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_1119571.png"><img class="alignnone size-full wp-image-2638" title="2010-02-05_111957" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_1119571.png" alt="" width="622" height="672" /></a>

10.寫完以後你可以把你的程式儲存起來,但是根據我的測試目前不能存成exe檔,只能存成專案檔,等你要用時再開啟Sikuli主程式來執行,希望以後可以用成exe檔

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_112436.png"><img class="alignnone size-full wp-image-2639" title="2010-02-05_112436" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_112436.png" alt="" width="597" height="534" /></a>
<h2>使用sikuli注意事項:</h2>
<ol>
	<li>sikuli很重視大小寫,例如openapp跟openApp是有差別的</li>
</ol>
小結:看完了上面的教學,大家都對<strong><a href="http://sikuli.org/">Sikuli Script</a></strong>有了一點認識,如果你是一個程式設計師現在的心情想必很複雜吧!因為有了這麼簡單的程式語言那以後還怎麼混飯吃阿！其實還好,因為要寫出一個好的程式其實跟使用的語言關希不大(機器語言除外.....),主要是在於人的邏輯,而IKULI它的用處也不是真的讓一個智障可以寫程式,而是要讓程式碼更具可讀性,令外在告訴各位一點,其實SIKULI的作者是台灣人,這個程式語言簡直就是台灣之光阿~
