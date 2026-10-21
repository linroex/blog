---
title: "WordPress 2.9 - Quite a Few New Features Added, No Major Issues in My Own Testing"
date: 2009-12-19T16:11:03
slug: "wordpress-2-9-new-features"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162302.jpg"><img class="alignnone size-large wp-image-2386" title="2009-12-19_162302" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162302-500x303.jpg" alt="" width="500" height="303" /></a>

After I got up today and logged into 逐風者, I saw a very important message on the login screen - WordPress 2.9 has been released. And this time it isn't just a bunch of bug fixes; quite a few features have been added too. Based on my own testing, WordPress 2.9 doesn't have any major problems, so everyone can go ahead and update right away!!


<!--more-->


<span style="color: #ff0000;"><strong>Note: If you can't use the automatic upgrade, open wp-config.php and add the following directive<span style="color: #000000; font-family: Consolas, Monaco, 'Courier New', Courier, monospace; font-weight: normal; line-height: 18px; font-size: 12px; white-space: pre;">
</span></strong></span>

<strong> </strong>

<strong>
<pre lang="php">define('WP_MEMORY_LIMIT', '256M');</pre>
</strong>
<h3>New Features in WordPress 2.9</h3>
<ul>
	<li>Trash: deleted a post by accident? Don't worry, just go to the trash and get it back!</li>
	<li>Video embedding: no need to install other plugins. WordPress 2.9 has built-in video embedding - just paste the URL into a post and it will automatically be converted into an embedded video (go to Settings → Media and enable "Attempt to automatically embed all plain text URLs").</li>
	<li>Bulk plugin updates: you can update many plugins at once (from the WordPress admin).</li>
	<li>Built-in image editor: the name says it all!</li>
	<li>Built-in database optimization &amp; repair: you can enable the database optimization feature by adding a directive to the wp-config.php file. The directive is:<span style="color: #ff0000;"><span style="font-family: Consolas, Monaco, 'Courier New', Courier, monospace; line-height: 18px; font-size: 12px; white-space: pre;"><pre lang=php>define('WP_ALLOW_REPAIR', true);</pre></span>

</span></li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-20_103623.jpg"><img class="alignnone size-large wp-image-2390" title="2009-12-20_103623" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-20_103623-500x303.jpg" alt="" width="500" height="303" /></a>

▲ Enabling the video embedding feature

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162400.jpg"><img class="alignnone size-large wp-image-2387" title="2009-12-19_162400" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162400-500x303.jpg" alt="" width="500" height="303" /></a>

▲ Image editor

▼ Trash

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_171925.jpg"><img class="alignnone size-large wp-image-2388" title="2009-12-19_171925" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_171925-500x303.jpg" alt="" width="500" height="303" /></a>
<h3>WordPress 2.9 Related Resources</h3>
<ul>
	<li>WordPress 2.9 download: <a href="http://wordpress.org/latest.zip">http://wordpress.org/latest.zip</a></li>
	<li>Chinese language files: <a href="http://wordpress.kirin-lin.idv.tw/Home/oldfiles/latest.zip?attredirects=0">http://wordpress.kirin-lin.idv.tw/Home/oldfiles/latest.zip?attredirects=0</a></li>
	<li>P.S. Based on my testing, the Chinese language files on the official WP Chinese site still have some parts left untranslated (or maybe the files are simply old...), so just make do with them for now.</li>
</ul>
