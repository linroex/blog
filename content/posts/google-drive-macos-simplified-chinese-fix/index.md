---
title: "Google Drive on macOS 預設簡體中文的解決方法"
date: 2017-09-17T13:36:54
slug: "google-drive-macos-simplified-chinese-fix"
aliases: ["/posts/google-drive-on-macos-%e9%a0%90%e8%a8%ad%e7%b0%a1%e9%ab%94%e4%b8%ad%e6%96%87%e7%9a%84%e8%a7%a3%e6%b1%ba%e6%96%b9%e6%b3%95/"]
tags: ["macOS", "Google"]
categories: ["Hardware"]
---

把 Google Drive 安裝到 macOS 後，猜測可能是程式的 Bug，明明我是正體中文的語系設定，但 Google Drive 卻顯示簡體中文，看著真的很不習慣，研究後找到解法分享給大家。

只要打開 Terminal 輸入以下指令，在將 Google Drive 重開即可變成正體中文：
<pre>defaults write com.google.GoogleDrive AppleLanguages '("zh-TW")'</pre>
