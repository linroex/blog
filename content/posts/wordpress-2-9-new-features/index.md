---
title: "WordPress 2.9 - 增加了蠻多的新功能,個人測試沒有重大問題"
date: 2009-12-19T16:11:03
slug: "wordpress-2-9-new-features"
aliases: ["/posts/wordpress-2-9-%e5%a2%9e%e5%8a%a0%e4%ba%86%e8%a0%bb%e5%a4%9a%e7%9a%84%e6%96%b0%e5%8a%9f%e8%83%bd%e5%80%8b%e4%ba%ba%e6%b8%ac%e8%a9%a6%e6%b2%92%e6%9c%89%e9%87%8d%e5%a4%a7%e5%95%8f%e9%a1%8c/"]
tags: ["WordPress"]
categories: ["Blog"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162302.jpg"><img class="alignnone size-large wp-image-2386" title="2009-12-19_162302" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162302-500x303.jpg" alt="" width="500" height="303" /></a>

今天起床登陸逐風者以後,在登錄畫面看到了一則很重要的訊息 - WordPress2.9發布了,而且這次不只是修改一些Bug,也有增加蠻多功能,根據站長自己的測試WordPress2.9是沒有太大的問題大家可以趕快去更新了!!


<!--more-->


<span style="color: #ff0000;"><strong>註'如果不能使用自動升級請將wp-config.php打開並加入指令<span style="color: #000000; font-family: Consolas, Monaco, 'Courier New', Courier, monospace; font-weight: normal; line-height: 18px; font-size: 12px; white-space: pre;">
</span></strong></span>

<strong> </strong>

<strong>
<pre lang="php">define('WP_MEMORY_LIMIT', '256M');</pre>
</strong>
<h3>WordPress2.9新功能</h3>
<ul>
	<li>垃圾桶:不小心刪除文章?別擔心,去垃圾筒找回它吧！</li>
	<li>影片嵌入:不需要安裝其他的Plugins,WordPress2.9內建影片嵌入的功能,只要把網址貼在文章上就會自動轉換成嵌入式影片(請到設定→媒體開啟「Attempt to automatically embed all plain text URLs」這項功能)</li>
	<li>批次更新插件:可以一次更新很多插件(WordPress後臺更新)</li>
	<li>內建圖像編輯器:這功能又看的就知道是什麼了吧!</li>
	<li>內建資料庫優化&amp;修復功能:你可以到wp-config.php檔案增加指令即可開啟資料庫優化功能,指令:<span style="color: #ff0000;"><span style="font-family: Consolas, Monaco, 'Courier New', Courier, monospace; line-height: 18px; font-size: 12px; white-space: pre;"><pre lang=php>define('WP_ALLOW_REPAIR', true);</pre></span>

</span></li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-20_103623.jpg"><img class="alignnone size-large wp-image-2390" title="2009-12-20_103623" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-20_103623-500x303.jpg" alt="" width="500" height="303" /></a>

▲開啟影片嵌入功能

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162400.jpg"><img class="alignnone size-large wp-image-2387" title="2009-12-19_162400" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162400-500x303.jpg" alt="" width="500" height="303" /></a>

▲圖片編輯器

▼垃圾桶

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_171925.jpg"><img class="alignnone size-large wp-image-2388" title="2009-12-19_171925" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_171925-500x303.jpg" alt="" width="500" height="303" /></a>
<h3>WordPress2.9相關資料</h3>
<ul>
	<li>WordPress2.9載點: <a href="http://wordpress.org/latest.zip">http://wordpress.org/latest.zip</a></li>
	<li>中文化檔案: <a href="http://wordpress.kirin-lin.idv.tw/Home/oldfiles/latest.zip?attredirects=0">http://wordpress.kirin-lin.idv.tw/Home/oldfiles/latest.zip?attredirects=0</a></li>
	<li>P.S.根據站長測試目前WP中文官網的中文化檔案還是有些地方沒有翻譯到(或者這檔案根本是舊的.....),大家將就用用吧</li>
</ul>
