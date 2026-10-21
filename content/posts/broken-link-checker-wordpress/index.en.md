---
title: "Broken Link Checker - Automatically Find Dead Links and Broken Images in WordPress"
date: 2010-05-28T00:05:48
slug: "broken-link-checker-wordpress"
tags: ["WordPress", "WordPress Plugins"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-28_000215.jpg"><img class="size-large wp-image-3186 alignleft" title="2010-05-28_000215" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-28_000215-500x303.jpg" alt="" width="500" height="303" /></a>

When you look for files online, you often run into an annoying situation: you finally find the file you want, click the link, and get... "This page has been removed. Please contact the site administrator." It's really frustrating. But it's not entirely the webmaster's fault. Once a website grows, it has a lot of outgoing links, and the webmaster can't check every one of them by hand. Some webmasters ask users to report broken links, but I don't think that works well. Someone who has already hit a dead link is annoyed enough. Why would they bother reporting it? Here I want to introduce <strong>Broken Link Checker</strong>, a plugin made specifically for WordPress. It automatically checks your WordPress blog for broken links and broken images (the broken-image icons that Chinese speakers jokingly call "steamed buns"). <strong>Broken Link Checker</strong> can also email you when a broken link appears on your blog. It's very convenient, but I'd recommend that first-time installers don't turn that feature on right away. Many people find over a thousand broken links or images the first time they run it, and their inbox gets flooded XD


<!--more-->

<h2>Broken Link Checker Info</h2>
<ul>
	<li>Official website:  <a href="http://goo.gl/gU0N">http://goo.gl/gU0N</a></li>
	<li>Download:  <a href="http://downloads.wordpress.org/plugin/broken-link-checker.0.9.3.zip">Official download</a> | Xun6 | <a href="http://www.box.net/shared/lujjd6vgko">Box.net</a> | <a href="http://www.4shared.com/file/abKqTYfN/broken-link-checker093.html ">4Shared</a></li>
</ul>
(If you can't install it directly from the WordPress admin, download the file from here and install it manually.)
<h2>Features of Broken Link Checker:</h2>
<ul>
	<li>Automatically checks WordPress for broken links &amp; images, with a very low false-positive rate</li>
	<li>Can be set to check automatically every few hours</li>
	<li>Can notify the site owner of broken links by email</li>
	<li>Can be set to stop running when the server's CPU usage goes above a certain level</li>
</ul>
<h2>Broken Link Checker Tutorial</h2>
1. First, go to the WordPress admin area and click [Plugins] → [Add New]. Type "Broken Link Checker" into the search box and click "Search Plugins".

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224055.png"><img class="alignnone size-large wp-image-3179" title="2010-05-27_224055" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224055-500x303.png" alt="" width="500" height="303" /></a>

2. Select the first plugin in the results, then click [Install] → [Install Now].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224811.jpg"><img class="alignnone size-large wp-image-3180" title="2010-05-27_224811" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_224811-500x303.jpg" alt="" width="500" height="303" /></a>

3. Enter the required information, then click [Continue].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_225135.jpg"><img class="alignnone size-large wp-image-3181" title="2010-05-27_225135" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_225135-500x303.jpg" alt="" width="500" height="303" /></a>

4. After installing the plugin, click [Activate Plugin], then click [Settings] → [Link Checker].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_231006.jpg"><img class="alignnone size-large wp-image-3182" title="2010-05-27_231006" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_231006-312x400.jpg" alt="" width="312" height="400" /></a>

5. Here you can see all of Broken Link Checker's settings. I had planned to make a Traditional Chinese language file for everyone, but it got too late and I didn't get to it. So below, I explain some of the important settings.
<blockquote>Status: Shows which broken links you have.

Re-check all pages: Manually re-checks all links.

Check each link: Sets how many hours to wait between link checks. I recommend at least 3 days, because checking every day puts too much load on the server.

Broken link CSS / Removed link CSS: Sets the style for broken links and for removed links. (I personally never change these.)

Broken link SEO: If checked, it automatically adds a <a href="http://www.google.com/support/webmasters/bin/answer.py?hl=b5&amp;answer=96569">nofollow tag</a> after broken links.

Exclusion list: Links listed here are automatically excluded from the broken-link results. This prevents false positives. Currently, https links are known to have a very high false-positive rate.

E-mail notifications: Automatically sends you an email when broken links appear on your blog.

Server load limit: When the server's CPU load goes above this value, link checking stops automatically. This keeps your web host from blocking you. I've been through this before: too many people were online at the same time, I had this plugin turned on, and... I got blocked.</blockquote>
6. You can also check your broken links under [Dashboard] → [Tools] → [Broken Links].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_233634.jpg"><img class="alignnone size-large wp-image-3185" title="2010-05-27_233634" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-27_233634-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>Review</h2>
I've been using Broken Link Checker for quite a while now. My only impression is that it's very convenient. Since I started using this plugin, no readers have complained to me about broken links on my blog. However, Broken Link Checker sometimes gives false positives. For example, if your website is hosted in mainland China, false positives happen easily, because many websites are blocked there, so the Broken Link Checker bot marks those blocked sites as broken. I've also found that https URLs get flagged by mistake quite often, probably because of the encryption. And broken links can cost you points with search engines. I installed Broken Link Checker in the first place because I read about this in a book.
