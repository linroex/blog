---
title: "Mac OS 在 Terminal 快速移動游標位置"
date: 2016-12-14T01:14:21
slug: "macos-terminal-cursor-movement"
aliases: ["/posts/mac-os-%e5%9c%a8-terminal-%e5%bf%ab%e9%80%9f%e7%a7%bb%e5%8b%95%e6%b8%b8%e6%a8%99%e4%bd%8d%e7%bd%ae/"]
tags: ["macOS"]
categories: ["Hardware"]
---

因為睡意深沉，今天就選一個簡單的小東西來分享吧！ 每次在操作 vim、terminal 時，遇到那種超長的一行指令（文字）都覺得很麻煩，要按方向鍵按到天荒地老才能移動到你要的位置，今天來分享三種方式，可以讓你快速的移動游標到指定位置。


<!--more-->


如果想<strong>移動到行首或是行尾</strong>的話，可以使用鍵盤的 Ctrl + A 移動到開頭處，或是用 Ctrl + E 移動到結尾處，這和 Windows 的習慣不太一樣，初次使用 Mac OS 的朋友可能會不太清楚。

此外如果是在使用 vim 時，想要<strong>移動到文件最底下</strong>可以按 shift + G；如果想往下<strong>加入一行空行</strong>（row），則可以在命令模式按 o 鍵，會插入空行並同時進入插入模式。

最後當然是大決啦！一直想要<strong>用滑鼠來控制游標</strong>位置，再輸入超長指令或是使用 vim 時肯定會很方便，本來以為是需要安裝外掛才能達到的功能，結果爬了文件發現，原來只要按住 optional / alt 按鍵，再用滑鼠點擊你要切過去的位置， Terminal 的輸入游標就會飛過去囉！

光是切換游標位置肯定不夠滿足，其實 vim 本身有提供滑鼠功能，你可以用滑鼠選擇一段文字，按下快捷鍵後刪除一堆文字！ 按下 ESC 後輸入 set mouse=a 即可啟用滑鼠模式，之後無需任何快捷鍵直接選擇文字，在按下 D 就可以刪除囉，或是按下 Y 可以複製。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/Untitled.gif"><img class="alignnone wp-image-7121 size-full" src="{{< param imageBase >}}/wp-content/uploads/2016/12/Untitled.gif" width="938" height="578" /></a>

就讓我用這三個小技巧來幫今天畫下句點吧（倒地
