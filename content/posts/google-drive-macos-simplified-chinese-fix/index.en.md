---
title: "Fixing Google Drive on macOS Defaulting to Simplified Chinese"
date: 2017-09-17T13:36:54
slug: "google-drive-macos-simplified-chinese-fix"
tags: ["macOS", "Google"]
categories: ["Hardware"]
draft: false
---

After installing Google Drive on macOS, I suspected it was a bug in the program. Even though my system language is set to Traditional Chinese, Google Drive displayed Simplified Chinese. It looked really unfamiliar, so I researched it and found a fix to share with everyone.

Just open Terminal and enter the following command, then restart Google Drive, and it will switch to Traditional Chinese:
<pre>defaults write com.google.GoogleDrive AppleLanguages '("zh-TW")'</pre>
