---
title: "Generating QR Codes Directly in the Browser With jQuery.qrcode"
date: 2011-04-08T15:42:44
slug: "jquery-qrcode-in-browser"
tags: ["jQuery", "QR Code"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-08_153812.jpg"><img class="size-large wp-image-389 aligncenter" title="2011-04-08_153812" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-08_153812-540x357.jpg" alt="" width="540" height="357" /></a>

There are many ways to draw a QR Code. You can write your own function to draw it, or you can use an API someone else provides. For example, using the Google Chat API to generate a QR Code is the API approach. The jquery.qrcode covered in this post uses a function someone else wrote to generate the code. At first I couldn't tell the difference between jquery.qrcode and the Google Chat API. Later I learned that the Google Chat API sends the data to Google's servers to generate the code, while jquery.qrcode draws it directly in the browser.

<!--more-->

Note that jquery.qrcode is a jQuery plugin, so you must use it together with jQuery, and it only works in the browser.
<ul>
	<li><strong>jquery.qrcode example files: <a href="http://www.box.net/shared/957pg237sj">Box.net</a>｜<a href="http://www.4shared.com/file/yJ2Vh5Ij/jqueryqrcode.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/jquery.qrcode.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfONjZiZDRiOWQtMjkxOS00YTY0LTllMjQtZmRkMzNhODAwMzc2&amp;hl=zh_TW">Google</a></strong></li>
	<li><strong>jquery.qrcode download: <strong><a href="http://www.box.net/shared/r6e2gogniq">Box.net</a>｜<a href="http://www.4shared.com/document/7KQ0ngeB/jqueryqrcodemin.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/jquery.qrcode.min.js">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMDAzZmMyZTYtMDcyOS00NmFjLWJiM2UtZTRjZWQ5ZjE4MWFj&amp;hl=zh_TW">Google</a></strong></strong></li>
</ul>
<h2>Syntax:</h2>
Description: Generates a QR Code for https://coder.tw and displays it inside the element with id qr.

Before using it, include the jQuery library and the jquery.qrcode library.
<pre lang="javascript">$('#qr').qrcode('https://coder.tw/');</pre>
In this example, since we want to generate a code for https://coder.tw, we put https://coder.tw inside .qrcode(). If you want to generate a code containing linroex instead, change it to .qrcode('linroex').
