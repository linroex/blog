---
title: "How Do I Manually Enable and Disable WordPress Maintenance Mode?"
date: 2011-02-14T09:00:32
slug: "wordpress-manual-maintenance-mode"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204200.jpg"><img class="size-large wp-image-4693 aligncenter" title="2011-02-08_204200" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204200-520x282.jpg" alt="" width="520" height="282" /></a></p>
Maintenance mode seems to have been introduced around WordPress 3.0. When your WordPress is being updated, it automatically enters maintenance mode to keep visitors from seeing error messages. I had actually been looking forward to this feature for a long time, because almost every other mature CMS has it — Xoops, for example, lets you temporarily shut down your site, and the well-known forum software Discuz! can also temporarily close a forum and restrict access to specific users. WordPress's maintenance mode, though, isn't very good yet: you can't enable it manually. It only turns on automatically while files are being updated. This article will show you how to enable maintenance mode by hand.


<!--more-->
Also, WordPress's maintenance mode is handy, but it has one problem: when you use the built-in automatic update feature and the update fails, your blog stays stuck in maintenance mode forever... Today, when I updated to WP 3.0.5, something went wrong and it left me stuck in maintenance mode... I only learned how to turn maintenance mode off manually after searching around online.
<h2>Manually enabling and disabling maintenance mode</h2>
1. To enable maintenance mode manually, download the PHP file I put together and upload it to the root directory of your blog.

Maintenance mode enabler file: <a href="http://www.box.net/shared/ezqyjllbk6">Box.net</a> ｜ <a href="http://goo.gl/dnusD">Xun6 </a>｜ <a href="http://www.4shared.com/file/Vdd82EnM/WP_online.html ">4Shared</a>

p.s. Unzip it after downloading.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204744.jpg"><img class="alignnone size-large wp-image-4694" title="2011-02-08_204744" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204744-520x424.jpg" alt="" width="520" height="424" /></a>

2. Now go take a look at your blog — it's already in maintenance mode～

You can unzip the file you just downloaded and look at the source code.

When the WP system detects a .maintenance file in the root directory, it reads it and decides whether to enter maintenance mode. It does this by checking whether the gap between the timestamp stored in the $upgrading variable and the current time exceeds 10 minutes. If it exceeds 10 minutes, maintenance mode is turned off. With the way I wrote it, that can never happen XDD

3. When you decide to cancel maintenance mode, go into your site's root directory and delete or rename the .maintenance file. In my case, I just appended .txt to the filename.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_205157.jpg"><img class="alignnone size-large wp-image-4695" title="2011-02-08_205157" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_205157-520x424.jpg" alt="" width="520" height="424" /></a>
