---
title: "macOS Screenshot Shortcuts, File Format, and Save Location Settings"
date: 2017-01-01T10:00:26
slug: "macos-screenshot-shortcut-format-location"
tags: ["macOS", "Screenshots"]
categories: ["Hardware"]
draft: false
---

One of the reasons I like the Mac is that it comes with many useful built-in features, such as screenshots and image editing. Windows has these features too, but they're pretty much useless, so you end up installing a bunch of apps anyway. Today I'll show you that Mac OS already has a very powerful screenshot feature! You can even set where screenshots are saved, their format, and more!


<!--more-->


In Mac OS, you can take screenshots with these two shortcuts, depending on what you need:
<ul>
 	<li>Full screen: Command + Shift + 3</li>
 	<li>Selected area: Command + Shift + 4</li>
</ul>
If you want to capture a specific window directly, you can use the following shortcut (press the selected-area shortcut, then press the spacebar):
<ul>
 	<li>Command + Shift + 4, then press the spacebar once the crosshair appears, and it turns into a camera icon</li>
</ul>
When capturing a window, I recommend not using the selected-area shot. Use window capture instead, because it includes a nice shadow! See the image below.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.55.48.jpg"><img class="alignnone size-full wp-image-7175" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.55.48.jpg" alt="" width="344" height="432" /></a>

But if you find the shadow annoying, you can hold the Option key while taking the window screenshot. That is: Command + Shift + 4 + Space, then Option (Alt) + click the window. This captures the window without the shadow.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午12.09.19.jpg"><img class="alignnone size-full wp-image-7181" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午12.09.19.jpg" alt="" width="668" height="598" /></a>

By default, screenshots are saved to the desktop. If you're like me and don't like a desktop full of files, you can change the default save location by entering the following command in Terminal (remember to change the path at the end):
<pre>defaults write com.apple.screencapture location <b>/users/screenhosts</b></pre>
If you don't want to save the file and would rather have it go straight to the clipboard, like in Windows, hold the Ctrl key while taking the screenshot. Nothing will be saved, and you can paste it directly wherever you need the image.

The default format is PNG. If you want to save as JPEG, you can likewise enter the following command in Terminal:
<pre> defaults write com.apple.screencapture type jpg</pre>
Currently supported file formats are: PNG, JPG, PDF, and TIFF.
