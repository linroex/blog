---
title: "macOS: How to Show Keystrokes on Screen for Recording and Live Streaming"
date: 2016-12-24T01:11:49
slug: "macos-show-keystrokes-on-screen"
tags: ["macOS", "Live Streaming"]
categories: ["Hardware"]
draft: false
---

Online courses are very popular now, and many people record their courses as videos to share online. Whenever I record this kind of "computer tutorial video," I always wonder how to show the keys you press. Sometimes you're used to pressing Ctrl + C to copy a piece of text, but viewers can't tell what you did when they watch the video. Some recording software can capture keystrokes too, by building a virtual keyboard into the recording whenever you press a key. But besides recording software itself, there are also apps that can display the keys you press directly on screen! Besides live streaming and online courses, it's also very handy for in-person lectures and talks!


<!--more-->


<a href="https://github.com/keycastr/keycastr">KeyCastr</a> is open-source software that only runs on Mac OS. Its development history was still active up until three months ago, and in my own testing it also works fine on macOS Sierra. <a href="https://github.com/keycastr/keycastr">KeyCastr</a> is very powerful. It can display every key you press on the keyboard on screen, whether it's a text key or a command key (Shift, Command, Optional, etc.). You can adjust the display position, or set it to show only command keys. There are many detailed settings, including how long keys stay on screen, colors, size, and more. It handles Chinese input in an interesting way, though: it shows every Zhuyin (bopomofo) symbol you type. Is that wrong?... Well, it's not really wrong (lol), but it just doesn't fit my needs. If anyone familiar with Objective-C wants to send a Pull Request, go for it!

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.58.21.jpg"><img class="alignnone size-large wp-image-7140" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.58.21-1024x712.jpg" alt="" width="660" height="459" /></a>

Note that KeyCastr is itself an app, so when you switch to a different desktop (Space), you won't see it. It only shows the virtual keyboard on the desktop where you launched it!
<h2>KeyCastr Info</h2>
<ul>
 	<li>GitHub: <a href="https://github.com/keycastr/keycastr">https://github.com/keycastr/keycastr</a></li>
 	<li>Download page: <a href="https://github.com/keycastr/keycastr/releases">https://github.com/keycastr/keycastr/releases</a></li>
</ul>
You can install <a href="https://github.com/keycastr/keycastr">KeyCastr</a> with brew-cask, or download the prebuilt files directly from its website. Please download the latest keycastr.app.zip file.

After installing, you'll see KeyCastr in Launchpad. However, before you launch it, you need to give it enough permissions. Otherwise, you'll see this error message:

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.46.33.jpg"><img class="alignnone size-full wp-image-7137" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.46.33.jpg" alt="" width="422" height="268" /></a>

Click System Preferences =&gt; Security &amp; Privacy =&gt; Accessibility, and add KeyCastr to the list.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/mac-1.gif"><img class="alignnone size-full wp-image-7138" src="{{< param imageBase >}}/wp-content/uploads/2016/12/mac-1.gif" alt="" width="664" height="538" /></a>

Once that's done, you can open KeyCastr. After opening it, go to the upper right corner to adjust the settings. Here are a few of the main options:

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.53.44.jpg"><img class="alignnone size-full wp-image-7139" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.53.44.jpg" alt="" width="383" height="449" /></a>

Starting from the top, KeyCastr has two display modes. Here are screenshots of each: the left one is Default, and the right one is Svelte mode.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.59.31.jpg"><img class="alignnone size-full wp-image-7141" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.59.31.jpg" alt="" width="232" height="320" /></a> <a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.00.34.jpg"><img class="alignnone size-full wp-image-7142" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.00.34.jpg" alt="" width="212" height="110" /></a>

Let's start with Default mode and its settings. In Default mode, nothing appears when you're not typing. It shows all text by default (but you can set it to show only command keys). When you type, a black box appears, and it disappears automatically after a while. If you press a shortcut, it's shown as well. Personally, I find this easier to read than Svelte. In Default mode, you can set the text size, how long the black box stays visible, and so on. You can also set the colors of the text and the background.

In Default mode, the black box appears in the lower left corner by default, but you can drag it with your mouse to any position you like!

As for Svelte mode, it's always displayed on screen whether or not you're pressing a key, floating there like a toolbar. Unlike Default mode, it doesn't show character keys (A-Z, 0-9, etc.) by default, but you can turn them on in the settings. Also, unlike Default mode, it doesn't spread out into many rows, which is a nice advantage. This avoids the situation below, which happens when you type too much......

Give me back my screen!!!

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.10.43.jpg"><img class="alignnone size-large wp-image-7143" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.10.43-1024x576.jpg" alt="" width="660" height="371" /></a>
