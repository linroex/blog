---
title: "macOS でコマンドを使って通知を表示する"
date: 2017-01-19T01:32:57
slug: "using-command-to-display-notification-on-macos"
tags: ["macOS"]
categories: ["Hardware"]
draft: false
---

macOS には便利な通知センターがあります。プログラムからメッセージを通知センターに送ると、iOS と同じように画面に表示されます。ただ、メッセージを送るだけなら、Terminal で1つのコマンドを実行するだけで済みます！ macOS の通知機能を使うのに、Objective-C や Swift を一から学ぶ必要はありません。たとえば、テストの実行を待っているあいだに、ドキュメントを読んで時間を有効に使いたいことがあるでしょう。そのような場合は、Notification を使ってテストが終わったことを知らせられます。ドキュメントを読むのに夢中になって、テストがまだ実行中であることを忘れてしまう心配もありません。テストが終わればすぐに通知が届くので、一瞬も無駄にしません！ もちろん、テストだけでなく他の用途にも使えます。この Notification はコマンドの形で提供されているので、Terminal で実行されるプログラムなら何でも同じことができます！


<!--more-->


これは macOS 内に通知を表示する AppleScript のコマンドです。Terminal に次のコマンドを入力するだけです：
<pre>osascript -e 'display notification "Hello" with title "Title" '</pre>
AppleScript のコマンドなので、osascript で実行する必要があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-19-上午1.27.29.jpg"><img class="alignnone size-full wp-image-7268" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-19-上午1.27.29.jpg" alt="" width="794" height="333" /></a>

brew を例にすると、Homebrew のアップデートが終わったら通知してほしい場合は、次のようにします：
<pre>brew update;osascript -e 'display notification "done" with title "Title"'</pre>
もちろん、毎回この長いコマンドを入力するのは面倒なので、alias に設定するなど、使いやすくする方法もあります。たとえば、~/.bashrc（または .zshrc）の一番下に次の行を追加します：
<pre>alias notify = "osascript -e 'display notification \"done\" with title \"Title\" ' "</pre>
Terminal を開き直したら、同じく brew update を例にすると：
<pre>brew update; notify</pre>
ただし、ssh で操作している場合は、この方法は使えないので注意してください！
