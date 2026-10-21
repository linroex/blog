---
title: "DNS Firewall - Block Access to Specific Websites and Quickly Edit DNS Mappings"
date: 2011-01-21T11:46:20
slug: "dns-firewall-block-websites-2"
tags: ["DNS", "VB"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_112455.jpg"><img class="size-full wp-image-4393 aligncenter" title="2011-01-21_112455" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_112455.jpg" alt="" width="339" height="413" /></a></p>
DNS Firewall is a program recently written by a webmaster. Its main function is to block access to certain websites. For example, if you have kids at home and you don't want them visiting adult sites or Facebook, you enter the URLs of those two sites into the program, and then this computer can no longer connect to them! The principle behind DNS Firewall is actually very simple. It modifies the hosts file built into Windows and maps the DNS entries of the blocked sites to 127.0.0.1, which is your own computer, so the browser simply can't reach those sites xD


<!--more-->

<h2>DNS Firewall Information</h2>
<ul>
	<li>Author: 聽．風</li>
	<li>Development environment: VB2010</li>
	<li>Download: Xun6 ｜ <a href="http://www.4shared.com/file/Lg4ma-Yy/DNS_Firewall.html">4Shared </a>｜<a href="http://www.box.net/shared/yu97dzye3z"> Box.net</a></li>
	<li>Source code: <a href="http://www.4shared.com/file/vvqOV3P0/DNS_Firewall.html ">4Shared </a>｜ <a href="http://www.box.net/shared/8933686dvh">Box.net</a> ｜ Xun6</li>
	<li>Requirements: .NET Framework 3 or later</li>
</ul>
<h2>How to Use DNS Firewall</h2>
1.Download DNS Firewall, then right-click the program and select "Run as administrator"

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113344.jpg"><img class="alignnone size-large wp-image-4394" title="2011-01-21_113344" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113344-318x500.jpg" alt="" width="318" height="500" /></a>

2.Once the program is open, enter the URL of each site you want to block into the large box (see the image below). Enter one URL per line.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113634.jpg"><img class="alignnone size-full wp-image-4395" title="2011-01-21_113634" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113634.jpg" alt="" width="339" height="413" /></a>

3.After you've set the sites to block, click "Write to hosts file," then restart your network connection, and you're done!

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113752.jpg"><img class="alignnone size-full wp-image-4396" title="2011-01-21_113752" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_113752.jpg" alt="" width="339" height="413" /></a>

4.If you made a mistake and added a site you didn't actually want to block, click "View" → "Clear all DNS mappings."

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_114347.jpg"><img class="alignnone size-full wp-image-4397" title="2011-01-21_114347" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-21_114347.jpg" alt="" width="339" height="413" /></a>
