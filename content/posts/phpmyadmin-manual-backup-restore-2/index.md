---
title: "phpMyAdmin資料庫手動備份與還原"
date: 2009-07-14T19:55:49
slug: "phpmyadmin-manual-backup-restore-2"
aliases: ["/posts/phpmyadmin%e8%b3%87%e6%96%99%e5%ba%ab%e6%89%8b%e5%8b%95%e5%82%99%e4%bb%bd%e8%88%87%e9%82%84%e5%8e%9f-2/"]
tags: []
categories: ["伺服器"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_112304.jpg"><img class="alignnone size-full wp-image-1609" title="2009-07-14_112304" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_112304.jpg" alt="2009-07-14_112304" width="152" height="35" /></a>

今天這篇文章是要敎各位如何用"手動"的方式來備份與還原資料庫,大家如果有點架站常識的話都知道要定期備份資料庫,因為網站裡的資料幾乎都是存放在資料庫內,但話是這麼說確有多少人會備份資料庫呢?大多數人會架站都是去看所謂"十分鐘架站密笈"學的,通常那類書籍不會教你深入的東西,也因此有很多人不懂如何備份資料庫,所以在這裡站長要敎大家手動備分資料庫(Mysql的資料庫)

<span style="color: #ffffff;">.
<!--more-->

</span>
<h2>資料庫備份</h2>
1.先進入到你的Mysql主控台(在下使用的是phpMyAdmin,因為它有提供圖形界片比較方便,目前網路上的免費空間也都是用這個)然後點選輸出

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_112434.jpg"><img class="alignnone size-full wp-image-1610" title="2009-07-14_112434" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_112434.jpg" alt="2009-07-14_112434" width="500" height="360" /></a>

2.按一下輸出那欄底下的"全選",然後然選擇匯出類型為SQL

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_194443.jpg"><img class="alignnone size-full wp-image-1611" title="2009-07-14_194443" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_194443.jpg" alt="2009-07-14_194443" width="500" height="578" /></a>

3.把"下載儲存"那項打勾,然後選擇執行,至於是否使用壓縮檔的部份建議是不要使用,因為不是所有主機都支援壓縮檔

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_194748.jpg"><img class="alignnone size-full wp-image-1612" title="2009-07-14_194748" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_194748.jpg" alt="2009-07-14_194748" width="499" height="170" /></a>

到這裡就差不多結束了

接下來要敎各位還原的方法,畢竟只會備份不會還原也沒有用

<span style="color: #ffffff;">.</span>

<hr /><span style="color: #ffffff;">.</span>
<h2>資料庫還原</h2>
1.跟剛剛備份一樣,先進入到phpMyadmin的後台,但是這次不是點選輸入而是要點選"載入"

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_195158.jpg"><img class="alignnone size-full wp-image-1613" title="2009-07-14_195158" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_195158.jpg" alt="2009-07-14_195158" width="500" height="340" /></a>

2.點選"載入檔案"下方的瀏覽按鈕,選擇剛剛備份檔存放的位置,然後在按一下"執行"

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_195353.jpg"><img class="alignnone size-full wp-image-1614" title="2009-07-14_195353" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-14_195353.jpg" alt="2009-07-14_195353" width="500" height="312" /></a>

基本上還原的過程要等一下,看你備份檔多大,我當初搬家時的備份檔有10M就用了5分鐘左右,大家可別以為是當機就把電腦從開^^
