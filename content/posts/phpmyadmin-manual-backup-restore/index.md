---
title: "PHPMyAdmin資料庫手動備份與還原"
date: 2011-02-11T11:11:08
slug: "phpmyadmin-manual-backup-restore"
aliases: ["/posts/phpmyadmin%e8%b3%87%e6%96%99%e5%ba%ab%e6%89%8b%e5%8b%95%e5%82%99%e4%bb%bd%e8%88%87%e9%82%84%e5%8e%9f/", "/posts/phpmyadmin-manual-backup-restore-2/", "/posts/phpmyadmin%e8%b3%87%e6%96%99%e5%ba%ab%e6%89%8b%e5%8b%95%e5%82%99%e4%bb%bd%e8%88%87%e9%82%84%e5%8e%9f-2/"]
tags: ["PHPMyAdmin", "MySQL", "Backup"]
categories: ["SRE"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110444.jpg"><img class="alignnone size-full wp-image-220" title="2011-02-11_110444" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110444.jpg" alt="" width="478" height="378" /></a>

今天這篇文章是要敎各位如何用"手動"的方式來備份與還原資料庫,大家如果有點架站常識的話都知道要定期備份資料庫,因為網站裡的資料幾乎都是存放在資料庫內,但話是這麼說確有多少人會備份資料庫呢?大多數人會架站都是去看所謂"十分鐘架站密笈"學的,通常那類書籍不會教你深入的東西,也因此有很多人不懂如何備份資料庫,所以在這裡站長要敎大家手動備分資料庫(Mysql的資料庫)

<span style="color: #ffffff;">.
<!--more-->

</span>
<h2>資料庫備份</h2>
1.先進入到你的Mysql資料庫然後點選【輸出】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110641.jpg"><img class="alignnone size-large wp-image-221" title="2011-02-11_110641" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110641-540x447.jpg" alt="" width="540" height="447" /></a>

2.按一下輸出那欄底下的【全選】,然後然選擇匯出類型為SQL

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110750.jpg"><img class="alignnone size-large wp-image-222" title="2011-02-11_110750" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110750-540x447.jpg" alt="" width="540" height="447" /></a>

3.把【下載儲存】那項打勾,然後選擇【執行】,至於是否使用壓縮檔的部份建議是不要使用,因為不是所有主機都支援壓縮檔

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110917.jpg"><img class="alignnone size-large wp-image-223" title="2011-02-11_110917" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110917-540x447.jpg" alt="" width="540" height="447" /></a>

到這裡就差不多結束了

接下來要敎各位還原的方法,畢竟只會備份不會還原也沒有用

<span style="color: #ffffff;">
</span>
<h2>資料庫還原</h2>
1.跟剛剛備份一樣,先進入到phpMyadmin的後台,但是這次不是點選輸入而是要點選【載入】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195158.jpg"><img class="alignnone size-full wp-image-224" title="2009-07-14_195158" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195158.jpg" alt="" width="500" height="340" /></a>

2.點選【載入檔案】下方的瀏覽按鈕,選擇剛剛備份檔存放的位置,然後在按一下【執行】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195353.jpg"><img class="alignnone size-full wp-image-225" title="2009-07-14_195353" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195353.jpg" alt="" width="500" height="312" /></a>

基本上還原的過程要等一下,看你備份檔多大,我當初搬家時的備份檔有10M就用了5分鐘左右,大家可別以為是當機就把電腦從開^^

如果剛剛備份時有用壓縮的話速度會比較快

另外在這裡推薦殺氣大大的快速SQL還原法：<a href="http://shachi.tw/cpanel-quickly-upload-sql/">http://shachi.tw/cpanel-quickly-upload-sql/</a>
