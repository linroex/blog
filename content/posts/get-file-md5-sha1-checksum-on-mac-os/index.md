---
title: "Get File MD5, SHA1 Checksum on Mac OS"
date: 2016-12-11T10:00:03
slug: "get-file-md5-sha1-checksum-on-mac-os"
tags: ["macOS", "MD5"]
categories: ["Hardware"]
---

之前在 Windows 習慣做任何事情都要另外安裝程式，檢視圖片要另外裝、瀏覽 PDF 要另外裝，計算檔案 MD5、SHA1 也要另外裝程式，但實際上在 Mac OS X 不用這麼麻煩！ 如果你要計算檔案的 MD5 或 SHA1 Checksum，其實就有內建的小工具可以使用囉！


<!--more-->


通常 Checksum 的使用是為了讓你可以確保檔案的完整性，試想這樣的場景： 你從蘋果官網下載了一個檔案，但其實你的網路已經被駭客盯上了，駭客把這個檔案默默換成另一個有加料的，於是你電腦就中鏢了...

有了 Checksum 可以在某些方面避免這問題，通常檔案的提供者會先計算好 Checksum 並提供在網站上，當你下載完檔案後，重新計算一次並比較，如果你計算的 Checksum 和網站上的一樣，代表檔案沒有被修改過，因為只要檔案有任何 1Bit 的變化都會導致 MD5 Hash 的值有變化，當然，如果連網站都被攻破的話...

至於怎麼計算？ 當然不是自己算囉！ 交給電腦就好啦！
<h2>計算 MD5 Checksum</h2>
<pre>openssl md5 file_path</pre>
<h2>計算 SHA1 Checksum</h2>
<pre>openssl sha1 file_path</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.37.25.jpg"><img class="alignnone size-full wp-image-6989" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.37.25.jpg" alt="%e8%9e%a2%e5%b9%95%e5%bf%ab%e7%85%a7-2016-12-02-%e4%b8%8b%e5%8d%881-37-25" width="734" height="402" /></a>

參考：<a href="https://support.apple.com/zh-tw/HT201259">Mac OS X：如何驗證 SHA-1 摘要</a>
