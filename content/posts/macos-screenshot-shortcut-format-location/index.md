---
title: "Mac OS 螢幕截圖快捷鍵、格式與儲存位置設定"
date: 2017-01-01T10:00:26
slug: "macos-screenshot-shortcut-format-location"
aliases: ["/posts/mac-os-%e8%9e%a2%e5%b9%95%e6%88%aa%e5%9c%96%e5%bf%ab%e6%8d%b7%e9%8d%b5%e3%80%81%e6%a0%bc%e5%bc%8f%e8%88%87%e5%84%b2%e5%ad%98%e4%bd%8d%e7%bd%ae%e8%a8%ad%e5%ae%9a/"]
tags: ["macOS", "Screenshots"]
categories: ["Hardware"]
---

我喜歡使用 Mac 的其中一個原因，就是它本身內建了許多好用的功能，例如螢幕截圖、圖片編輯等等，雖然 Windows 也有內建這些功能，但實在是雞肋的很，最後還是需要去安裝一堆應用程式；今天這邊要告訴你，其實 Mac OS 已經內建很強大的螢幕截圖功能囉！ 甚至可以設定截圖後的儲存位置、格式等等！


<!--more-->


在 Mac OS 裡面螢幕截圖可以依需求使用以下兩組快捷鍵：
<ul>
 	<li>全螢幕： Command + Shift + 3</li>
 	<li>指定範圍： Command + Shift + 4</li>
</ul>
如果想要直接截圖某個視窗的話，可以用下面的快捷鍵（按下指定範圍後再按空白鍵）
<ul>
 	<li>Command + Shift + 4 出現十字後按下空白鍵，就會變成相機</li>
</ul>
建議如果要截圖視窗，別用指定範圍，而是用視窗截圖，原因是使用「視窗截圖」會有漂亮的陰影哦！ 如下圖

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.55.48.jpg"><img class="alignnone size-full wp-image-7175" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.55.48.jpg" alt="" width="344" height="432" /></a>

但如果覺得那個陰影很煩，你也可以在視窗截圖的同時按住 option 鍵，也就是：Command + Shift + 4 + Space 接著 option (Alt) + 滑鼠點擊視窗，這樣就可以截圖視窗但沒有陰影。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午12.09.19.jpg"><img class="alignnone size-full wp-image-7181" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午12.09.19.jpg" alt="" width="668" height="598" /></a>

預設照片會存在桌面上，如果你跟我一樣不喜歡桌面滿滿的檔案，可以在終端機輸入以下指令，即可修改預設儲存的位置：（最後面的路徑記得修改哦）
<pre>defaults write com.apple.screencapture location <b>/users/screenhosts</b></pre>
如果不希望儲存檔案，而是直接放在剪貼簿，就像 Windows 那樣的話，可以在截圖時按住 Ctrl 鍵，如此一來就不會存檔，可以直接到使用圖片的地方貼上。

預設格式是 PNG，如果你想要用 JPEG 的方式儲存，同樣可以在終端機輸入以下指令：
<pre> defaults write com.apple.screencapture type jpg</pre>
目前支援的檔案格式有： PNG、JPG、PDF、TIFF。
