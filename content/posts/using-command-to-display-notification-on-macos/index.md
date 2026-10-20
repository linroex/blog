---
title: "Using Command to Display Notification on macOS"
date: 2017-01-19T01:32:57
slug: "using-command-to-display-notification-on-macos"
tags: ["macOS"]
categories: ["Hardware"]
---

在 macOS 有個很方便的通知中心，你可以寫程式傳送訊息到通知中心，就會像 iOS 那樣顯示在螢幕上，但其實如果你是要傳送訊息的話，可以直接在 Terminal 一個指令搞定哦！ 不用從頭去學 Objective-C 或 Swift 也可以使用 macOS 的通知功能； 像每次在等測試執行時，總會想善用時間讀讀文件，這時就可以用 Notification 來通知自己測試是否執行完成，不用擔心看文件看得太開心忘記測試還在執行，當測試完成你也會及時收到通知，一刻都不浪費！ 當然也不只測試可以這樣用，因為這個 Notification 是以指令的方式存在，所以只要是在 Terminal 執行的程式都可以做到一樣的功能哦！


<!--more-->


這是個 Apple Script 的指令，可以讓你顯示通知在 macOS 內，只要在 Terminal 輸入以下指令：
<pre>osascript -e 'display notification "Hello" with title "Title" '</pre>
因為是 Apple Script 的指令，所以需要用 osascript 來執行。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-19-上午1.27.29.jpg"><img class="alignnone size-full wp-image-7268" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-19-上午1.27.29.jpg" alt="" width="794" height="333" /></a>

以 brew 舉例，我希望 homebrew 更新完之後通知我：
<pre>brew update;osascript -e 'display notification "done" with title "Title"'</pre>
當然，如果每次都要打這麼一大串很麻煩，所以你也可以將它設成 alias 或是其他做法，讓他更方便使用，例如將以下語法加入到 ~/.bashrc ( 或 .zshrc ) 的最底下：
<pre>alias notify = "osascript -e 'display notification \"done\" with title \"Title\" ' "</pre>
重開 Terminal 之後，同樣以 brew update 舉例：
<pre>brew update; notify</pre>
但要注意，如果是透過 ssh 操作，這招可就沒效啦！
