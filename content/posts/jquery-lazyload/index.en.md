---
title: "【jQuery】Lazyload - Delayed Image Loading"
date: 2011-04-27T19:15:30
slug: "jquery-lazyload"
tags: ["jQuery", "JavaScript"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-27_191427.jpg"><img class="size-large wp-image-429 aligncenter" title="2011-04-27_191427" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-27_191427-540x481.jpg" alt="" width="540" height="481" /></a>

Photography websites often have a lot of images. When visitors browse these sites, it takes quite a while to load because so many photos have to be loaded. This has a big impact on the website's host traffic, and it also increases the CPU time on the visitor's side a lot. Here I want to introduce Lazyload, a jQuery plugin that delays image loading. In other words, when you enter a website, it doesn't load all the images at once. It only loads some of them, and as you scroll the browser, it loads "the images in the section you are looking at," so the page loads faster.

<!--more-->

<h2>Lazyload Information:</h2>
<ul>
	<li>Requires jQuery</li>
	<li>The browser needs JavaScript enabled</li>
	<li>Example files: <a href="http://www.box.net/shared/auskrk0640">Box.net</a>｜<a href="http://www.4shared.com/file/UkViYDhu/lazyload_demo.html">4Shared</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMTM2NjUyMjUtMzU2Ny00Yzk1LWEyMjgtMDUxNjRmNjA5MjQ5&amp;hl=zh_TW">Google </a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/lazyload_demo.zip">Dropbox</a></li>
</ul>
<strong>If you want to download lazyload.js, please download the example file. lazyload.js is included in it～</strong>
<h2>Common Syntax:</h2>
1. Load the lazyload function:
<pre lang="javascript">$("img").lazyload();</pre>
2. Set the lazy-loading delay
<pre lang="javascript">$("img").lazyload({ threshold : 200 });
//Change 200 to your own delay value (in milliseconds)</pre>
3. Set a background image to show before the image loads
<pre lang="javascript">$("img").lazyload({ placeholder : "圖片路徑" });</pre>
To use multiple parameters at once, separate them with commas. For example, to use both lazy loading and a background image:
<pre lang="javascript">$("img").lazyload({ placeholder : "img/grey.gif",threshold:200 });</pre>
