---
title: "[C++] Sending a File to a Console Application via CMD and Returning Data"
date: 2010-12-04T10:00:16
slug: "c-cmd-send-file-to-console-app-2"
tags: ["C++", "Windows"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_232836.jpg"><img class="size-large wp-image-4097 aligncenter" title="2010-11-26_232836" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_232836-520x365.jpg" alt="" width="520" height="365" /></a></p>
Actually, in C++ there's another way to read files besides simply using fopen, and it's much easier to implement than fopen: feeding the file to your C++ program through CMD. For example, say you have a program called test.exe and a text file called x.txt, and you want test.exe to read the data in x.txt and display it. You open CMD and type <em><strong>test.exe&lt;x.txt</strong></em>, and it reads and displays the contents of x.txt. This article teaches you this way of reading files. Thanks also to a reader named Canghai, who taught me this technique.


<!--more-->

<h2>Reading and Returning Files:</h2>
This is simple, but hard to describe in words, so I recorded a video for you to watch.

Project file download: <a href="http://goo.gl/n8W9G">http://goo.gl/n8W9G</a>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="480" height="385" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/jAr1WBhJg1M?fs=1&amp;hl=zh_TW" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="480" height="385" src="http://www.youtube.com/v/jAr1WBhJg1M?fs=1&amp;hl=zh_TW" allowscriptaccess="always" allowfullscreen="true"></embed></object>
