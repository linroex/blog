---
title: "Let Google Protect Your Browsing - Google Public DNS"
date: 2010-01-02T17:27:13
slug: "google-public-dns"
tags: ["Google", "DNS"]
categories: ["Web Apps"]
draft: false
---

<strong>Google Public DNS</strong> is a service Google recently launched that lets you browse the web using Google's free DNS. The benefit of Google Public DNS is that it makes your browsing safer, <span style="color: #0000ff;">and your browsing speed may also improve</span>. By the way, <a href="http://www.opendns.com/">openDNS</a> also offers a DNS service, and it's pretty good too, so feel free to check it out. <strong>Google Public DNS</strong> is also one of the few Google services that doesn't require going to a website to use it (you just configure it directly on your computer).


<!--more-->


I think many people don't really know what DNS is, though! So first, I'll explain what DNS does before showing you how to set it up. DNS stands for Domain Name System. Its main job is to convert website addresses into IP addresses. For example, when you want to visit my blog (https://coder.tw), you type the address in directly, and then DNS converts it into an IP address to make the connection. My explanation may not be very clear, so I'd recommend reading the article by Avant Courier on this topic. Traditionally, DNS was handled by ISPs, and ISPs don't necessarily filter out malicious sites for you. But if you use <strong>Google Public DNS</strong>, it automatically checks whether the URLs you visit have any problems.
<blockquote>Quoted from http://avantcourier.digili.net/?p=1055

To put it in an analogy: just as every building in the real world has a GPS position, such as a latitude and longitude, those numbers are hard to remember. So we normally use a street address system, like "No. XX, XX Road, X Floor." Of course, this analogy isn't perfect, because a street address doesn't point directly to GPS coordinates. The two are actually different ways of locating things. Here, though, we're only drawing on the contrast in how they work for human communication and memory.</blockquote>
<h3>Google Public DNS Addresses</h3>
<ol>
	<li>8.8.8.8</li>
	<li>8.8.4.4</li>
</ol>
<h3>How to Use Google Public DNS</h3>
Using Google Public DNS is different from most Google services. You don't need to go to a special web page. Instead, you just make the settings directly on your computer. Here, I'll write a tutorial using Windows Vista. If you're using another operating system, you can refer to the <a href="http://code.google.com/intl/zh-TW/speed/public-dns/docs/using.html">simple guide</a> that Google provides.

1. Click 【Start】 in the bottom-left corner → 【Connect To】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_170929.jpg"><img class="alignnone size-large wp-image-2420" title="2010-01-02_170929" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_170929-350x400.jpg" alt="" width="350" height="400" /></a>
2. Select 【Network and Sharing Center (My Network Places)】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_171651.jpg"><img class="alignnone size-large wp-image-2422" title="2010-01-02_171651" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_171651-500x384.jpg" alt="" width="500" height="384" /></a>
3. Click 【Manage network connections】, then right-click 【Local Area Connection】 and select 【Properties】 (If you're using XP, go into My Network Places, then right-click the local area connection and select Properties.)
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172013.jpg"><img class="alignnone size-large wp-image-2423" title="2010-01-02_172013" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172013-500x383.jpg" alt="" width="500" height="383" /></a>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172029.jpg"><img class="alignnone size-large wp-image-2424" title="2010-01-02_172029" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172029-500x375.jpg" alt="" width="500" height="375" /></a>
4. Click 【IPv4】 → 【Properties】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172318.jpg"><img class="alignnone size-large wp-image-2425" title="2010-01-02_172318" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172318-342x400.jpg" alt="" width="342" height="400" /></a>
5. Select 【Use the following DNS server addresses】, enter 8.8.8.8 and 8.8.4.4, then click 【OK】
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172531.jpg"><img class="alignnone size-large wp-image-2426" title="2010-01-02_172531" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172531-386x400.jpg" alt="" width="386" height="400" /></a>
6. Once you've finished the settings, reconnect, and the settings will take effect.
