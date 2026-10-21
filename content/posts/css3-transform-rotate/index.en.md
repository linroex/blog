---
title: "[CSS 3] Tilt Images and Web Pages with transform: rotate"
date: 2011-04-23T09:22:08
slug: "css3-transform-rotate"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-23_085636.jpg"><img class="size-large wp-image-422 aligncenter" title="2011-04-23_085636" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-23_085636-540x386.jpg" alt="" width="540" height="386" /></a>

A while ago, the news reported that if you searched for the Chinese word "傾斜" (meaning "tilt") on the mobile version of Google, the results page would lean to the right. This effect isn't hard to make at all. It only takes one line of CSS, because it is one of the CSS 3 standards. For now, IE browsers don't support this CSS 3 tilt syntax (including IE 9). Also, it isn't really one line: each browser has its own syntax, so you have to write several lines. Hopefully this will improve in the future.


<!--more-->

<h2>Introduction:</h2>
The tilt effect we're using today comes from the transform feature in CSS 3. With this property, you can create a simple animation using only CSS. Besides tilting a block, transform can also move, scale, apply perspective, and more. Today, though, we will only cover rotation, which is the tilting part of transform.
<h2>Syntax:</h2>
<pre lang="css">-webkit-transform: rotate(angle);
-moz-transform: rotate(angle);
-o-transform: rotate(angle);
-ms-transform:rotate(angle)</pre>
It's best to add all three lines at once so that "almost" all browsers can display the effect. Of course, for now IE-engine browsers still can't show this feature (IE 9 now supports it).
<ul>
	<li>The -webkit line is for browsers that use the WebKit engine, such as Safari and Chrome.</li>
	<li>The -moz line is for Firefox and other browsers that use the Firefox engine.</li>
	<li>The -o line is for Opera.</li>
	<li>The -ms line is for IE 9.</li>
</ul>
The unit for the angle is deg. For example, to tilt an img by one degree, the syntax is:
<pre lang="css">-webkit-transform: roate(1deg);</pre>
Sample file download: <a href="http://www.box.net/shared/qggenzip7e">Box.net</a> ｜ <a href="http://www.4shared.com/file/YdDnTT8s/css3-transform-rotate.html ">4Shared </a>｜ <a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOM2IzODdlMDAtZjZiYi00NWEwLWE4OTAtOTY2ZjRiMWU4OWM5&amp;hl=zh_TW">Google </a>｜ <a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/css3-transform-rotate.zip">Dropbox</a>
