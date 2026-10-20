---
title: "【PHP】使用curl-lib取得無名/Yam音樂的真實下載位址"
date: 2011-01-25T18:31:04
slug: "php-curl-get-yam-music-download-url-2"
aliases: ["/posts/%e3%80%90php%e3%80%91%e4%bd%bf%e7%94%a8curl-lib%e5%8f%96%e5%be%97%e7%84%a1%e5%90%8dyam%e9%9f%b3%e6%a8%82%e7%9a%84%e7%9c%9f%e5%af%a6%e4%b8%8b%e8%bc%89%e4%bd%8d%e5%9d%80-2/"]
tags: ["PHP", "cURL", "Yam"]
categories: ["Programming"]
---

<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182313.jpg"><img class="size-large wp-image-4437 aligncenter" title="2011-01-25_182313" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182313-520x356.jpg" alt="" width="520" height="356" /></a></p>
<p style="text-align: center;">我設計的UI很簡潔^^</p>
其實<strong>取得無名/Yam音樂的真實下載位址</strong>這個程式最原本是要做成自動產生部落格音樂語法的程式,可是後來發現現在已經很多人在經營音樂語法產生器,不差我這一個,所以就不想做就把它的程式碼釋放出來給大家看看～ 另外如果有人需要透過Yam或無名下載音樂的話也可以自己把這程式下載下去,然後裝到自己的伺服器裡面run


<!--more-->


<strong>取得無名/Yam音樂的真實下載位址</strong>這個程式的原理其實不難懂,只是撰寫上會有點困難,我將這個程式分成三部分來講,首先是這個程式使用了網路上一位叫Michael Schrenk的前輩所撰寫的cURL的Library,透過這位前輩撰寫的library讓我能夠快速的完成這個程式,這個library提供檔案下載、RSS處理、網路蜘蛛、HTML解析等多種功能,改天有時間我會在介紹這東西,今天時間不太夠等等還要趕會計作業...

第二部分就是Yam的音樂取得,Yam在音樂網址的保護上下過一番功夫,不能直接從原始碼裡面找,可是既然他的Flash Player能撥音樂那就代表他一定有方法可以從原始碼取得,後來研究一段時間才知道是要向一個網址發送GET請求,然後他會傳回音樂的真實網址,真的藏的蠻不錯的,不像無名...

關於這程式的最後一部分就是無名音樂真實位址的取得,只能說無名是把我們都當白痴,網址就直接放原始碼裡面,原本要用PHP找到那串網址還需要用explode處理很久才行,可是透過cURL,我才一個函式就抓到真實網址了...

上面其實沒有講的很清楚,大家自己看我原始碼就知道了

還有就是主要分析功能寫在getreallink這個php檔裡面,而我引用到的library則是aider這個php檔(aider.php並不是原本的那個curl-lib,是我簡化過的版本),還有index.php跟engine.php兩個就是這程式的UI,方便使用XD

還有我把這個程式寫成物件,所以使用時如果不會用的話可以參考index.php、engine.php這兩個檔案
<ul>
	<li>下載原始碼：Xun6 ｜ <a href="http://www.4shared.com/file/NS8svxaU/getreallink.html ">4Shared</a> ｜<a href="http://www.box.net/shared/8kt0ptgslb">Box.net</a></li>
	<li>curllib載點：Xun6 ｜ <a href="http://www.4shared.com/file/S04ZtMOD/curllib.html ">4Shared </a>｜<a href="http://www.box.net/shared/7hqe72dse2">Box.net</a></li>
</ul>
<h2>curllib內含檔案：</h2>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182758.jpg"><img class="alignnone size-large wp-image-4438" title="2011-01-25_182758" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182758-520x454.jpg" alt="" width="520" height="454" /></a>
