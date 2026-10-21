---
title: "Forcing a Hyperlink to Download a File in HTML"
date: 2017-04-26T09:56:50
slug: "html-force-download-link"
tags: ["HTML"]
categories: ["Programming"]
draft: false
---

Modern browsers are smart. When a hyperlink points to a plain text file, a PDF, or a CSS file, the browser previews it instead of downloading it. But sometimes we want users to download the file directly instead of viewing it in the browser. For example, when I previously went to the jQuery official site to download jquery.js, it opened as a preview, and I had to right-click and choose "Save As." But my goal was clear: I wanted to download the file, not view it!


<!--more-->


Actually, you only need to add the download attribute to the hyperlink to force the file to download. Even if the file is an HTML file, it will be downloaded instead of being viewed in the browser. Use it where it makes sense, in places where a download is clearly the intent. Here is an example:
<pre>&lt;a download href="http://example.tw/example.pdf"&gt;</pre>
