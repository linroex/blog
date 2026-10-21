---
title: "Get File MD5, SHA1 Checksum on Mac OS"
date: 2016-12-11T10:00:03
slug: "get-file-md5-sha1-checksum-on-mac-os"
tags: ["macOS", "MD5"]
categories: ["Hardware"]
draft: false
---

On Windows, I was used to installing a separate program for everything: one to view images, one to browse PDFs, and another to calculate a file's MD5 or SHA1. On Mac OS X, you don't have to go through all that trouble! If you want to calculate the MD5 or SHA1 checksum of a file, there is a built-in tool for it.


<!--more-->


Checksums are usually used to make sure a file is intact. Picture this scenario: you download a file from Apple's official website, but your network has already been targeted by a hacker, who quietly swaps the file for a tampered version, and now your computer is infected...

Checksums can help prevent this problem in some cases. Usually, the file provider calculates the checksum in advance and publishes it on their website. After you download the file, you calculate the checksum again and compare the two. If the checksum you calculated matches the one on the website, the file has not been modified, because even a single bit change alters the MD5 hash. Of course, if the website itself has been compromised...

As for how to calculate it? Of course you don't do it by hand! Just let the computer handle it!
<h2>Calculate MD5 Checksum</h2>
<pre>openssl md5 file_path</pre>
<h2>Calculate SHA1 Checksum</h2>
<pre>openssl sha1 file_path</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.37.25.jpg"><img class="alignnone size-full wp-image-6989" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.37.25.jpg" alt="%e8%9e%a2%e5%b9%95%e5%bf%ab%e7%85%a7-2016-12-02-%e4%b8%8b%e5%8d%881-37-25" width="734" height="402" /></a>

Reference: <a href="https://support.apple.com/zh-tw/HT201259">Mac OS X: How to verify a SHA-1 digest</a>
