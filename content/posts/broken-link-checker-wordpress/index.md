---
title: "Broken Link Checker - 自動幫你檢查WordPress中的失效連結與掛掉的圖片"
date: 2010-05-28T00:05:48
slug: "broken-link-checker-wordpress"
aliases: ["/posts/broken-link-checker-%e8%87%aa%e5%8b%95%e5%b9%ab%e4%bd%a0%e6%aa%a2%e6%9f%a5wordpress%e4%b8%ad%e7%9a%84%e5%a4%b1%e6%95%88%e9%80%a3%e7%b5%90%e8%88%87%e6%8e%9b%e6%8e%89%e7%9a%84%e5%9c%96%e7%89%87/"]
tags: ["WordPress", "WordPress外掛"]
categories: ["WordPress"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-28_000215.jpg"><img class="size-large wp-image-3186 alignleft" title="2010-05-28_000215" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-28_000215-500x303.jpg" alt="" width="500" height="303" /></a>

有的時候在網路上找檔案都會遇到一種很窘的情況,就是好不容易找到自己要的檔案,按下連結卻發現.......    此網頁已移除,請您連絡網站管理者,碰到這種情塊真的會讓人很不爽,但這其實也不能全怪站長,因為一個網站規模變大之後都會有很多對外的連結,而站長也不可能一個個連結去檢查,有些站長可能會讓使用者自行回報失效的連結,不過個人認為這種方式效果很差,別人點到無效的連結已經很不爽了哪裡還會幫你回報?在這裡我要介紹一個WordPress專用的外掛<strong>Broken Link Checker</strong>,他可以自動幫你檢查WordPress網誌中的所有無效連結以及掛掉的圖片(俗稱包子圖),另外<strong>Broken Link Checker</strong>還可以在你網誌出現失效連結時自動寄E-mail提醒你,可以說是十分方便,不過建議第一次安裝的人不要開這個功能,因為很多網友第一次安裝時都會檢查出上千的失效連結or圖片,到時候信箱準備被塞爆吧XD


<!--more-->

<h2>Broken Link Checker資訊</h2>
<ul>
	<li>官方網站:  <a href="http://goo.gl/gU0N">http://goo.gl/gU0N</a></li>
	<li>檔案載點:  <a href="http://downloads.wordpress.org/plugin/broken-link-checker.0.9.3.zip">官方載點</a> | Xun6 | <a href="http://www.box.net/shared/lujjd6vgko">Box.net</a> | <a href="http://www.4shared.com/file/abKqTYfN/broken-link-checker093.html ">4Shared</a></li>
</ul>
(當你不能直接用後台安裝時請從這裡下載檔案手動安裝)
<h2>Broken Link Checker特色:</h2>
<ul>
	<li>自動檢查WordPress中的失效連結&amp;圖片,且誤判率極低</li>
	<li>可以設定每隔幾小時自動檢查一次</li>
	<li>可以利用電子郵件通知站長失效的連結</li>
	<li>可以設定當伺服器CPU超過多少時停止運作</li>
</ul>
<h2>Broken Link Checker教學</h2>
1.請先來到WordPress的後台,依序點選【外掛】→【新增】,在搜尋那裏輸入Broken Link Checker然後按搜尋外掛

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224055.png"><img class="alignnone size-large wp-image-3179" title="2010-05-27_224055" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224055-500x303.png" alt="" width="500" height="303" /></a>

2.選擇第一個外掛然後按【安裝】→【立刻安裝】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224811.jpg"><img class="alignnone size-large wp-image-3180" title="2010-05-27_224811" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224811-500x303.jpg" alt="" width="500" height="303" /></a>

3.輸入好相關資訊然後按【繼續】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_225135.jpg"><img class="alignnone size-large wp-image-3181" title="2010-05-27_225135" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_225135-500x303.jpg" alt="" width="500" height="303" /></a>

4.安裝完外掛以後按一下【啟用外掛】,然後按一下【設定】→【Link Checker】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_231006.jpg"><img class="alignnone size-large wp-image-3182" title="2010-05-27_231006" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_231006-312x400.jpg" alt="" width="312" height="400" /></a>

5.在這裡你可以看到Broken Link Checker的各項設定,原本是打算幫大家做一份繁體中文語系,可是時間太晚了所以就沒做,下面列出一些重要設定選項的中文翻譯
<blockquote>Status:這裡會顯示你有哪些失效連結

Re-check all pages:手動重新檢查所有連結

Check each link:這裡可以設定你要隔幾個小時檢查一次連結,建議設定至少3天,因為每天檢查的話伺服器會太超

Broken link CSS.Removed link CSS:設定失效連結.被移除的連結的樣式(我自己是都不設定)

Broken link SEO:勾選的話會自動在失效的連結後面加入<a href="http://www.google.com/support/webmasters/bin/answer.py?hl=b5&amp;answer=96569">nofollow標籤</a>

Exclusion list:排除清單,設定在這裡的連結會自動排除於失效連結之外,這是為了防止誤判的情況發生,目前已知https的誤判機率很高

E-mail notifications:當網誌中出現失效連結時自動寄電子郵件通知你

Server load limit:當伺服器CPU負載超過此值時自動停止檢查連結,這可以防止你的主機商把你封鎖,之前我就遇過這種情況,同一時間的線ˋ上人數過高然後又把這外掛打開........ 結果就被封鎖了</blockquote>
6.你也可以在【後台】→【工具】→【Broken Links】裡面查看你的失效連結有哪些

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_233634.jpg"><img class="alignnone size-large wp-image-3185" title="2010-05-27_233634" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_233634-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>評測</h2>
我用Broken Link Checker這外掛已經蠻久一段時間了,個人的唯一感想就是很方便,因為這個外掛我網誌已經好久沒有網友抱怨有連結掛掉了,不過有時候Broken Link Checker這外掛會有誤判的情形出現,例如說:你的網站主機在中國大陸就很容易出現誤判,因為那中國那邊會封鎖掉很多網站,所以Broken Link Checker的機器人就會那些被封鎖的網站是失效的,另外個人測試https的網址也很常被誤判,可能是因為加密的關希吧!還有失效連結也會導致你被搜尋引擎扣分,我當初就是在書上看到這點所以才安裝Broken Link Checker的
