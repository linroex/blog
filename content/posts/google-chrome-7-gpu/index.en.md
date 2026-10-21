---
title: "Google Chrome 7: GPU Hardware Acceleration Support"
date: 2010-10-24T15:30:53
slug: "google-chrome-7-gpu"
tags: ["Chrome", "Hardware Acceleration"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141649.jpg"><img class="alignnone size-full wp-image-3863" title="2010-10-24_141649" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141649.jpg" alt="" width="508" height="277" /></a>

<a href="http://www.google.com/chrome?hl=zh-TW">Google Chrome 7</a> has officially launched! The main feature of Chrome 7 is GPU hardware acceleration. Besides this new feature, it also fixes some bugs from Chrome 6. The speed is said to be <a href="http://goo.gl/7f8j">60 times faster</a>. However, hardware acceleration in Chrome 7 isn't enabled by default. You have to use a special method to turn it on.

So what are the benefits of GPU hardware acceleration? Simply put, once you turn it on, games you play in the browser run much faster. On some older computers, Facebook lags noticeably, and turning on GPU acceleration makes that less likely. So I recommend that friends who like browsing (Facebook~) and playing games in the browser should definitely turn this on.


<!--more-->


For downloading and installing Chrome, see <a href="http://www.google.com/chrome?hl=zh-TW">http://www.google.com/chrome?hl=zh-TW</a>
<h2>Introduction to Google Chrome</h2>
<ul>
	<li>Official website: <a href="http://www.google.com/chrome">http://www.google.com/chrome</a></li>
	<li>Developer: Google</li>
	<li>Download: <a href="http://www.google.com/chrome">Same as the official website</a></li>
</ul>
<h2>How to Turn On GPU Hardware Acceleration</h2>
1. First, update your Chrome to Chrome 7. Then right-click your Google Chrome shortcut (it has to be a shortcut) and select -&gt; Properties

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141835.jpg"><img class="alignnone size-full wp-image-3864" title="2010-10-24_141835" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_141835.jpg" alt="" width="293" height="460" /></a>

2. <strong>Add the following command to the end of the Target field on the Shortcut tab</strong>, then click OK. (Read this part carefully, or you may fail.)

P.S. Be careful when you add the command: <strong>don't delete the existing data in the Target field</strong>. This command goes at the very end of the Target field, and <strong>there must be a space between the command and the existing data</strong>.
<pre>-enable-accelerated-compositing</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152132.jpg"><img class="alignnone size-full wp-image-3875" title="2010-10-24_152132" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152132.jpg" alt="" width="367" height="473" /></a>

3. Below are the FPS values before and after turning on GPU hardware acceleration. The difference is exactly double!!

Before:

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152549.jpg"><img class="alignnone size-large wp-image-3879" title="2010-10-24_152549" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152549-550x241.jpg" alt="" width="550" height="241" /></a>

After:

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152918.jpg"><img class="alignnone size-large wp-image-3880" title="2010-10-24_152918" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-24_152918-550x252.jpg" alt="" width="550" height="252" /></a>
