---
title: "如何手動開啟、關閉WordPress的維護模式？"
date: 2011-02-14T09:00:32
slug: "wordpress-manual-maintenance-mode"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e6%89%8b%e5%8b%95%e9%96%8b%e5%95%9f%e3%80%81%e9%97%9c%e9%96%89wordpress%e7%9a%84%e7%b6%ad%e8%ad%b7%e6%a8%a1%e5%bc%8f%ef%bc%9f/"]
tags: ["WordPress", "維護模式"]
categories: ["WordPress"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204200.jpg"><img class="size-large wp-image-4693 aligncenter" title="2011-02-08_204200" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204200-520x282.jpg" alt="" width="520" height="282" /></a></p>
好像是在WordPress 3.0的時候推出了維護模式這個功能，當你的WordPress在進行更新時繪自動進入維護模式，防止訪客看到錯誤訊息，這功能其實我期待很久了，因為其他發展較成熟的CMS系統幾乎都有這個功能，像是Xoops就可以把網站暫時關閉，還有著名的架論壇軟體Discuz! 也能將論壇暫時關閉，限制特定使用者進入，不過WordPress的維護模式目前還不算很好，不能手動啟用，只有在進行檔案更新時會自動開啟維護模式，而在這篇文章就是要教大家如何手動啟用維護模式


<!--more-->
另外WordPress的維護模式好用是好用，只是有個問題就是當你使用系統內建的自動更新功能時，如果更新失敗，你的網誌就會一直停留在維護模式...  今天更新WP 3.0.5的時候出問題然後就給我卡在維護模式... 後來上網爬文才學會手動關閉維護模式的方法
<h2>手動開啟、關閉維護模式</h2>
1.要手動開啟維護模式的話，下載我製作好的一個PHP檔，並且將他上傳到你網誌所在的根目錄

維護模式啟用檔：<a href="http://www.box.net/shared/ezqyjllbk6">Box.net</a> ｜ <a href="http://goo.gl/dnusD">Xun6 </a>｜ <a href="http://www.4shared.com/file/Vdd82EnM/WP_online.html ">4Shared</a>

p.s.下載好之後先解壓縮

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204744.jpg"><img class="alignnone size-large wp-image-4694" title="2011-02-08_204744" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204744-520x424.jpg" alt="" width="520" height="424" /></a>

2.接下來去看你的網誌，就已經進入維護狀態囉～

你可以把剛下載的檔案解開來看原始碼

當WP的系統檢查到根目錄有.maintenance這個檔案時，就會讀取並且判斷是否要進入維護模式，判斷方式就是檢查$upgrading變數儲存的時間戳與現在的時間間隔是否超過10分鐘，如果超過10分鐘就會關閉維護模式，而像我這樣的寫法則是永遠不可能超過的XDD

3.當你決定把維護模式取消時，進入網站根目錄，把.maintenance這個檔案移除掉或是改名就可以了，像我就是在檔案後面加上.txt

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_205157.jpg"><img class="alignnone size-large wp-image-4695" title="2011-02-08_205157" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_205157-520x424.jpg" alt="" width="520" height="424" /></a>
