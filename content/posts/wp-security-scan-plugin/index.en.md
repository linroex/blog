---
title: "WP Security Scan - Scan Your WordPress for Vulnerabilities"
date: 2009-11-14T16:39:56
slug: "wp-security-scan-plugin"
tags: ["WordPress", "Hardening"]
categories: ["Blog"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-27-06.jpg"><img class="size-medium wp-image-2223 aligncenter" title="2009-11-14 15 27 06" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-27-06-300x216.jpg" alt="2009-11-14 15 27 06" width="300" height="216" /></a></p>
WP Security Scan is a WordPress plugin that scans your site and reports WordPress vulnerabilities. If you host your own site, you probably already know that before setting things up you need to configure file permissions — things like 777 and 655. What WP Security Scan actually does is check whether your file permissions are set correctly, and it can also check and change your database prefix. It's a great fit for beginners.

<!--more-->

<h3>WP Security Scan plugin info:</h3>
<ul>
	<li><span style="background-color: #ffffff;">Official site:   <a href="http://semperfiwebdesign.com/">http://semperfiwebdesign.com/</a></span></li>
	<li><span style="background-color: #ffffff;">Current version:   2.7.1.1</span></li>
	<li><span style="background-color: #ffffff;">Compatible WordPress:   2.3~2.8.4</span></li>
	<li><span style="background-color: #ffffff;">Download: <a href="http://downloads.wordpress.org/plugin/wp-security-scan.zip">http://downloads.wordpress.org/plugin/wp-security-scan.zip</a></span></li>
</ul>
<h3>Built-in features of WP Security Scan:</h3>
<ol>
	<li><span style="background-color: #ffffff;">Check file permissions</span></li>
	<li><span style="background-color: #ffffff;">Change the WP database prefix</span></li>
	<li><span style="background-color: #ffffff;">Change the WordPress password</span></li>
	<li><span style="background-color: #ffffff;">Hide the WordPress version number</span></li>
</ol>
<h2>How to install WP Security Scan</h2>
1. Go to the WordPress admin, click 【Plugins】→【Add New】in order, then type "<span style="background-color: #ffffff;">WP Security Scan"</span> in the text box.

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-36-47.jpg"><img class="alignnone size-large wp-image-2224" title="2009-11-14 15 36 47" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-36-47-500x360.jpg" alt="2009-11-14 15 36 47" width="500" height="360" /></a></span>

<span style="background-color: #ffffff;">2. Next, WordPress shows the similar plugins it found. Click Install after the first one, and a screen will pop up showing the WP Security Scan info. You should see 【Install Now】next to it — just click that.</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-42-29.jpg"><img class="alignnone size-large wp-image-2225" title="2009-11-14 15 42 29" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-42-29-500x360.jpg" alt="2009-11-14 15 42 29" width="500" height="360" /></a></span>

3. Finally, WordPress will ask for your server's ID and password — that's your hosting account's username and password. Enter them and click Start, and WordPress will begin installing.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-45-25.jpg"><img class="alignnone size-large wp-image-2226" title="2009-11-14 15 45 25" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-45-25-500x360.jpg" alt="2009-11-14 15 45 25" width="500" height="360" /></a>

<span style="color: #ffffff;">.</span>
<h2>How to use WP Security Scan:</h2>
<span style="color: #ffffff;">.</span>
<strong>1. Take a first look at the basic info with WP Security Scan</strong>
Once WP Security Scan is installed, open the WordPress admin and scroll all the way to the bottom. You'll see a Security option in the sidebar — click straight into it and it will show your server's basic info. Since it's in English, I've included a Chinese translation below.

P.S. This plugin shows the parts that aren't configured properly (that is, the vulnerabilities) in red, and the safe parts in green.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-55-16.jpg"><img class="alignnone size-large wp-image-2227" title="2009-11-14 15 55 16" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-15-55-16-500x360.jpg" alt="2009-11-14 15 55 16" width="500" height="360" /></a>

In the scan results, WP Security Scan shows your current version number, whether the database prefix has been changed, whether the WordPress version number is hidden, and whether the default admin account has been changed. If you can't understand what it says, throw it into Google Translate — everyone's output is different, so I can't just hand you a translation.
<strong>2. Changing the database prefix</strong>
Why change the database prefix? It's because the WordPress installer automatically sets the database prefix to wp_ from the start. Although that saves everyone the trouble of coming up with a database prefix (which isn't really that much trouble anyway), it also gives hackers an opening. The well-known Zero-day attack, for example, uses the database prefix to attack sites. So for the sake of security, this plugin gives you a way to change the database prefix.

1. Go to the blog admin, click 【<span style="background-color: #ffffff;">Security】→【Database】in order, then in the "Change the current" field enter the database prefix you want. It has to be in English letters, and you must add an underscore ( _ ) at the end.</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-27-37.jpg"><img class="alignnone size-large wp-image-2228" title="2009-11-14 16 27 37" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-27-37-500x360.jpg" alt="2009-11-14 16 27 37" width="500" height="360" /></a></span>
<div style="text-align: left;"><span style="background-color: #ffffff;">That's all it takes to make the change, but if after you click Start Renaming you see the text shown in the screenshot below, then you'll have to change it manually.</span></div>
<div style="text-align: left;"><span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-32-06.jpg"><img class="alignnone size-large wp-image-2229" title="2009-11-14 16 32 06" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-32-06-500x360.jpg" alt="2009-11-14 16 32 06" width="500" height="360" /></a></span></div>
<strong>3. Viewing the detailed scan results</strong>
<span style="background-color: #ffffff;">Here we're going to show you the most important feature of WP Security Scan: scanning whether your file permissions are set correctly.</span>

<span style="background-color: #ffffff;">1. Go to the admin, click 【Security】→【Scanner】in order.</span>

<span style="background-color: #ffffff;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-35-13.jpg"><img class="alignnone size-large wp-image-2230" title="2009-11-14 16 35 13" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-35-13-500x360.jpg" alt="2009-11-14 16 35 13" width="500" height="360" /></a></span>

<span style="background-color: #ffffff;">2. Next, a table shows the files that need to be changed. Green means it's already fixed, red means it hasn't been fixed yet. Here's the translation of that table:</span>
<blockquote><span style="background-color: #ffffff;"><strong>Name: file name</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong>File/Dir: file location (.. means the root directory)</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong> </strong><strong>Needed Chmod: the required file permission, that is, the number you enter when changing file permissions</strong></span>

<span style="background-color: #ffffff;"><strong> </strong><strong> </strong><strong></strong><strong>Current Chmod: the file's current permission</strong></span></blockquote>
<span style="background-color: #ffffff;"><strong></strong><strong></strong><strong></strong><strong><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-38-25.jpg"><img class="alignnone size-large wp-image-2231" title="2009-11-14 16 38 25" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14-16-38-25-500x360.jpg" alt="2009-11-14 16 38 25" width="500" height="360" /></a></strong></span>

<span style="background-color: #ffffff;"><strong>4. Changing the default admin account</strong></span>
<p style="text-align: left;">In the WordPress online installer, the default administrator account is admin. This is actually a big vulnerability, because it's basically publishing your username to the whole world — a hacker only needs a brute-force attack to crack your password. So I recommend changing the system's default account. Here's how:</p>
<p style="text-align: left;">1. Go into your hosting space's database.</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214115.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214115" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214115-500x358.jpg" alt="2009-11-14_214115" width="500" height="358" /></a></p>
<p style="text-align: left;">2. Click Browse next to wp-users.</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214234.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214234" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214234-500x358.jpg" alt="2009-11-14_214234" width="500" height="358" /></a></p>
<p style="text-align: left;">3. You'll now be in the wp-users table, which shows the accounts currently registered on your blog. Click the pencil icon next to the account named admin.</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214451.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214451" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214451-500x358.jpg" alt="2009-11-14_214451" width="500" height="358" /></a></p>
<p style="text-align: left;">4. Change the user-login field to the account name you want, then click Go and the change is done.</p>
<p style="text-align: left;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214700.jpg"><img style="border: 0px initial initial;" title="2009-11-14_214700" src="{{< param imageBase >}}/wp-content/uploads/2009/11/2009-11-14_214700-500x358.jpg" alt="2009-11-14_214700" width="500" height="358" /></a></p>
