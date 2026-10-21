---
title: "[Google API] Generating QR Codes with the Google Chart API, with PHP Example Code"
date: 2011-02-24T23:25:20
slug: "google-chart-api-qr-code-php"
tags: ["Google API", "PHP", "QR Code"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_230500.jpg"><img class="size-large wp-image-328 aligncenter" title="2011-02-24_230500" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_230500-540x396.jpg" alt="" width="540" height="396" /></a>

In this post, I'll show you how to make QR codes with the Google Chart API. A QR code is the two-dimensional barcode that's very popular right now. Generating a 2D barcode used to be a hassle, but with the Google Chart API, you can quickly generate a QR code from just a URL. I originally planned to write a post dedicated to the Google Chart API, but I decided to split it up instead~ (I also happened to come across the site <a href="http://www.dotblogs.com.tw/shadow/archive/2011/02/24/21557.aspx" target="_blank">Shadow's Tech Database</a>, which introduces it, and I couldn't resist writing about it~)


<!--more-->

<h2>QR code format with the Google Chart API:</h2>
https://chart.googleapis.com/chart?[parameters]

<strong>Parameters:</strong>
<ul>
	<li>cht=Chart type; just set it to qr</li>
	<li>chs=Barcode size; enter width x height. Note that the separator between width and height is the letter x</li>
	<li>chl=The data to store in the barcode</li>
	<li>choe=Encoding; UTF-8 is recommended</li>
	<li>chld=Error correction level; there are four levels: L, M, Q, and H</li>
</ul>
<strong>Example:</strong>

I want to generate a 120*120 QR code containing the string linroex

<a href="https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=linroex&amp;choe=UTF-8">https://chart.googleapis.com/chart?chs=300x300&amp;cht=qr&amp;chl=linroex&amp;choe=UTF-8</a>
<h2>Example PHP code:</h2>
Download: <a href="http://www.box.net/shared/0ejo0tqyuh" target="_blank"> Box.net</a>｜<a href="http://www.4shared.com/file/3jZerRVS/google_chart_api_qrcode.html " target="_blank">4Shared</a>｜<a href="http://goo.gl/tN0Bl" target="_blank">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMmEwYTEwNDUtOTFlMS00MDRjLTk4MjgtYWFlN2IxNzRjZTFm&amp;hl=zh_TW" target="_blank">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_232301.jpg"><img class="alignnone size-large wp-image-329" title="2011-02-24_232301" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-24_232301-540x364.jpg" alt="" width="540" height="364" /></a>
