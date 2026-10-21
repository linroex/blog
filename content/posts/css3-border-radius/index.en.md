---
title: "[CSS 3] Give Your Website Rounded Corners with Pure CSS!"
date: 2011-04-16T11:32:53
slug: "css3-border-radius"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_111212.jpg"><img class="size-large wp-image-395 aligncenter" title="2011-04-16_111212" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_111212-540x314.jpg" alt="" width="540" height="314" /></a>

Back in the CSS 2 days, giving images or div elements rounded corners was quite a hassle. The simple option was to use a function that someone had already written in jQuery. If you preferred to do it yourself, you had to design rounded-corner images and overlay them on each other. In short, it was very complicated. But in CSS 3 you no longer need such cumbersome tricks. You can just set it directly in your CSS!


<!--more-->
<strong>Note: This feature requires a browser that supports CSS 3, such as IE 9, Firefox 4, Chrome, Safari, and other modern browsers.</strong>
<h2>Syntax:</h2>
<pre lang="css">border-radius:radius;  //This applies the rounded corners to all four corners: top-left, bottom-left, top-right, and bottom-right</pre>
You can use various units for the radius value, such as px or cm.
<h2>Example:</h2>
Create a div with id=ex, and set its style as follows:
<pre lang="css">#ex{
	width:200px;		//Set the width of the box
	eight:200px;		//Set the height of the box
	margin:0px auto;	//Center the box horizontally; this has nothing to do with the rounded corners
	border:1px solid #000;	//Set a border so the rounded corners are easy to see
	border-radius: 10pt;	//Apply a 10pt rounded corner
}</pre>
I saw online that you could round just one specific corner (top-left, bottom-left, top-right, or bottom-right), but when I actually tested it, none of them seemed to work. Also, many articles say you need to add the -moz- or -webkit- prefixes to get rounded corners in Firefox, Chrome, and Safari. But in my testing, the latest browsers no longer need the prefixes, because border-radius is now part of the CSS 3 standard. The prefixes (-moz-, -webkit-) are not really necessary anymore, unless you really care about backward compatibility xD

Example HTML download: <a href="http://www.box.net/shared/edbsgcivsz">Box.net</a>｜<a href="http://www.4shared.com/file/Vv9V4HRv/border-radius.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/border-radius.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMDRjZDNlZjUtYjViNi00YWU1LWI4M2EtNGNiZWJhNGM2NDMz&amp;hl=zh_TW">Google</a>
