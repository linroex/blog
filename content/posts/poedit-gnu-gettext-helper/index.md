---
title: "幫助你進行多國語系（GNU Gettext）製作的好幫手：Poedit"
date: 2011-07-21T20:00:50
slug: "poedit-gnu-gettext-helper"
aliases: ["/posts/%e5%b9%ab%e5%8a%a9%e4%bd%a0%e9%80%b2%e8%a1%8c%e5%a4%9a%e5%9c%8b%e8%aa%9e%e7%b3%bb%ef%bc%88gnu-gettext%ef%bc%89%e8%a3%bd%e4%bd%9c%e7%9a%84%e5%a5%bd%e5%b9%ab%e6%89%8b%ef%bc%9apoedit/"]
tags: ["Gettext", "mo", "po", "Poedit", "語系檔"]
categories: ["軟體分享"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195920.jpg"><img class="alignnone size-large wp-image-577" title="2011-07-21_195920" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195920-540x461.jpg" alt="" width="540" height="461" /></a>

今天要跟大家介紹一個很好用的「多國語系」製作程式：Poedit，我想很多人都有在網路上看過「中文化」這種事情吧？簡單來講Poedit就是幫助你進行「中文化」工作的程式，只是在台灣這類工作叫中文化，可是換到其他國家卻可能變成「英文化」、「日文化」，所以這類工作統統以「多國語系化」稱呼～


<!--more-->
Poedit這套程式他並非可以幫所有的程式進行多國語系化，他是Gettext專案的專屬工具，所謂的Gettext專案其實就是GNU底下的一個多國語系的東西，Poedit的檔案附檔名是po、mo，所以你如果再網路上看到某些程式他的語系檔也是po、mo的附檔名，代表他能夠用Poedit來進行中文化

一般來講軟體開發人員會把PO檔公布出來，方便大家去幫這個軟體做中文化，但是也有些軟體是直接公布原始碼的，你必須從他的原始碼裡面分析、製作出PO檔，然後再進行多國語系工作，這類方式比較少，通常都是PHP的程式才會這樣做，上面說要分析製作PO檔好像很難？別擔心～ Poedit的功能不僅僅是幫助你編輯PO檔，他還可以幫助你「製作」PO檔呢～

目前我所知道較知名、使用Gettext處理語系的程式是WordPress，他裡面的外掛、佈景都是使用這玩意來處理多國語系的，所以很多人會以為Poedit是給WordPress專用的語系製作程式（我當初也是這樣想xD） 其實不然，Poedit可以用在很多其他的程式上面，像有時候我會去參加國外的網頁設計比賽，這時就會有一個大問題就是我英文很差，可是網頁要用英文做.... 這時候我會先用中文做好網頁，然後再透過Gettext的方式找人幫忙做翻譯: )

P.S.Poedit可以讀取PO、POT兩種格式的檔案來做多國語系工作
<h2>Poedit資訊</h2>
<ul>
	<li>官方網站：<a href="http://www.poedit.net/">http://www.poedit.net/</a></li>
	<li>下載頁面：<a href="http://www.box.net/shared/jsbcze4r5cox4n3mo4oj">Box.net</a>｜<a href="http://www.4shared.com/file/8yU-GCU9/poedit-146-setup.html ">4Shared</a>｜<a href="http://goo.gl/ryC2J">Google</a>｜<a href="http://www.poedit.net/download.php#win32">官方載點</a></li>
	<li>作業系統：Windows、Linux、Mac</li>
</ul>
<h2>Poedit安裝教學</h2>
1.請先到官方網站下載安裝檔，執行，然後一直按Next把它安裝完吧～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195404.jpg"><img class="alignnone size-full wp-image-572" title="2011-07-21_195404" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195404.jpg" alt="" width="503" height="388" /></a>

2.遇到授權條約時，記得要選「I accept..... 」

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195618.jpg"><img class="alignnone size-full wp-image-573" title="2011-07-21_195618" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195618.jpg" alt="" width="503" height="388" /></a>

3.安裝中～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195657.jpg"><img class="alignnone size-full wp-image-574" title="2011-07-21_195657" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195657.jpg" alt="" width="503" height="388" /></a>

4.安裝完成

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195734.jpg"><img class="alignnone size-full wp-image-575" title="2011-07-21_195734" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195734.jpg" alt="" width="503" height="388" /></a>
<h2>Poedit使用教學：直接開啟PO、POT檔</h2>
在這段落，我會教大家如何從原始檔裡面分析出需要翻譯的字串，並且製作成PO檔，如果你要翻譯的專案有提供POT檔給你，那你也可以參考本文直接開啟PO檔進行翻譯工作，最後再將檔案匯出為mo檔就完成啦！

1.開啟Poedit，然後按下左上角的「檔案」->「開啟」

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002330.jpg"><img class="alignnone size-large wp-image-584" title="2011-07-22_002330" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002330-540x461.jpg" alt="" width="540" height="461" /></a>

如果來源檔案是POT的話，選擇「檔案」->「從POT檔新增編目檔」

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002410.jpg"><img class="alignnone size-large wp-image-585" title="2011-07-22_002410" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002410-540x461.jpg" alt="" width="540" height="461" /></a>

2.如果剛剛選擇的是「從POT檔新增編目檔」，那他會要求你進行一些設定，紅框內的是必填的，填好之後按OK然後他會要求你儲存po檔

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002633.jpg"><img class="alignnone size-full wp-image-586" title="2011-07-22_002633" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002633.jpg" alt="" width="357" height="340" /></a>

3.接者就可以開始翻譯囉～  選擇你要翻譯的字串，然後輸入翻譯的結果就可以啦，另外我建議翻譯一小段就馬上存檔（Ctrl+S）

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002948.jpg"><img class="alignnone size-large wp-image-587" title="2011-07-22_002948" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002948-540x461.jpg" alt="" width="540" height="461" /></a>

4.當你按下Ctrl+S或「檔案」->「儲存」時，Poedit會自動產生mo檔，你不用再去做匯出的動作

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003214.jpg"><img class="alignnone size-large wp-image-588" title="2011-07-22_003214" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003214-540x514.jpg" alt="" width="540" height="514" /></a>
<h2>Poedit教學：製作PO檔</h2>
有時候你是一個開發者，需要整理一份PO檔給其他工作人員作多國語系用，或者你是一個翻譯人員，然後你要翻譯的程式只有程式碼沒有PO檔，這時候你就可以參考這裡的教學來製作PO檔

1.開啟Poedit，依序按下「檔案」->「新增編目檔」

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003916.jpg"><img class="alignnone size-large wp-image-589" title="2011-07-22_003916" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003916-540x461.jpg" alt="" width="540" height="461" /></a>

2.填好一些資料，其中專案資訊的部份一定要設定「專案名稱及版本」、「字元集」、「源碼字元集」
<ul>
	<li>專案名稱及版本：自行設定</li>
	<li>字元集：utf-8</li>
	<li>源碼字元集：utf-8</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_004455.jpg"><img class="alignnone size-full wp-image-590" title="2011-07-22_004455" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_004455.jpg" alt="" width="357" height="340" /></a>

3.接者進入「路徑」頁籤，然後「基礎路徑」的地方填入你要多國語系的檔案的位址，這部份需要注意，如果你的程式資料夾只有一層的結構，那就只需要設定基礎路徑，但如果你設定的基礎路徑底下還有其他資料夾，那就必須在下面新增路徑

舉例來講：現在我的程式在C:Appservwwwtest這個資料夾裡面，然後裡面有config、core、js這三個資料夾，則
<ul>
	<li>基礎路徑：C:Appservwwwtest</li>
	<li>底下要設定：</li>
	<li>config</li>
	<li>core</li>
	<li>js</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005207.jpg"><img class="alignnone size-full wp-image-591" title="2011-07-22_005207" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005207.jpg" alt="" width="357" height="340" /></a>

4.最後進入「關鍵字」頁籤，這裡是設定遇到哪些關鍵字時要做處理，通常我們會設定：（二、三為底線）
<ul>
	<li>Gettext</li>
	<li>_</li>
	<li>__</li>
	<li>gettext_noop</li>
	<li>_e</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005511.jpg"><img class="alignnone size-full wp-image-592" title="2011-07-22_005511" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005511.jpg" alt="" width="357" height="340" /></a>

5.當這些都設定好之後，按下OK，然後他會問你PO檔要存在哪裡，存好之後就可以直接進行翻譯工作
<h2>影片教學</h2>
<h2><iframe src="http://www.youtube.com/embed/W5BkxT2dVo4" frameborder="0" width="480" height="390"></iframe></h2>
