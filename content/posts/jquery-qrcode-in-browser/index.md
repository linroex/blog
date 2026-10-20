---
title: "透過jQuery.qrcode直接在瀏覽器產生QR Code"
date: 2011-04-08T15:42:44
slug: "jquery-qrcode-in-browser"
aliases: ["/posts/%e9%80%8f%e9%81%8ejquery-qrcode%e7%9b%b4%e6%8e%a5%e5%9c%a8%e7%80%8f%e8%a6%bd%e5%99%a8%e7%94%a2%e7%94%9fqr-code/"]
tags: ["jQuery", "QR Code"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-08_153812.jpg"><img class="size-large wp-image-389 aligncenter" title="2011-04-08_153812" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-08_153812-540x357.jpg" alt="" width="540" height="357" /></a>

要繪製QR-Code有很多種方法，可以自己寫函式去繪製，也可以使用別人提供的API來繪製，例如使用Google Chat API來產生QR Code就是用API的方法，而在這篇文章要講的jquery.qrcode則是使用別人撰寫好的函式來產生條碼，原本我搞不清楚jquery.qrcode與Google Chat API的差別，後來才知道Google Chat API是將資料送到Google的伺服器上產生，而jquery.qrcode則是直接由瀏覽器來進行匯製

<!--more-->

需要注意的是jquery.qrcode是屬於jQuery的一個外掛，因此使用時必須要搭配jQuery來使用，並且只能用在瀏覽器上面
<ul>
	<li><strong>jquery.qrcode範例檔案：<a href="http://www.box.net/shared/957pg237sj">Box.net</a>｜<a href="http://www.4shared.com/file/yJ2Vh5Ij/jqueryqrcode.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/jquery.qrcode.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfONjZiZDRiOWQtMjkxOS00YTY0LTllMjQtZmRkMzNhODAwMzc2&amp;hl=zh_TW">Google</a></strong></li>
	<li><strong>jquery.qrcode下載：<strong><a href="http://www.box.net/shared/r6e2gogniq">Box.net</a>｜<a href="http://www.4shared.com/document/7KQ0ngeB/jqueryqrcodemin.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/jquery.qrcode.min.js">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMDAzZmMyZTYtMDcyOS00NmFjLWJiM2UtZTRjZWQ5ZjE4MWFj&amp;hl=zh_TW">Google</a></strong></strong></li>
</ul>
<h2>語法:</h2>
說明:產生https://coder.tw的QR Code並顯示在id為qr的中

使用前請先引入jquery函式庫以及jquery.qrcode函式庫
<pre lang="javascript">$('#qr').qrcode('https://coder.tw/');</pre>
以此例來講,因為要產生https://coder.tw的條碼,所以.qrcode裡面要放https://coder.tw，如果是要產生內含linroex的條碼,則是改成.qrcode('linroex')
