---
title: "macOS の Google ドライブが簡体字中国語で表示される問題の解決方法"
date: 2017-09-17T13:36:54
slug: "google-drive-macos-simplified-chinese-fix"
tags: ["macOS", "Google"]
categories: ["Hardware"]
draft: false
---

macOS に Google ドライブをインストールしたところ、プログラムのバグではないかと思いました。私のシステムの言語は繁体字中国語に設定されているのに、Google ドライブは簡体字中国語で表示されたのです。見慣れないので落ち着かず、調べて解決方法がわかったので共有します。

ターミナルを開いて以下のコマンドを入力し、Google ドライブを再起動すると、繁体字中国語に切り替わります：
<pre>defaults write com.google.GoogleDrive AppleLanguages '("zh-TW")'</pre>
