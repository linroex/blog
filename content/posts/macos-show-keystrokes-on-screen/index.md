---
title: "Mac OS - 如何將鍵盤的按鍵顯示在螢幕以便錄影、直播"
date: 2016-12-24T01:11:49
slug: "macos-show-keystrokes-on-screen"
aliases: ["/posts/mac-os-%e5%a6%82%e4%bd%95%e5%b0%87%e9%8d%b5%e7%9b%a4%e7%9a%84%e6%8c%89%e9%8d%b5%e9%a1%af%e7%a4%ba%e5%9c%a8%e8%9e%a2%e5%b9%95%e4%bb%a5%e4%be%bf%e9%8c%84%e5%bd%b1%e3%80%81%e7%9b%b4%e6%92%ad/"]
tags: ["Mac OS", "KeyCastr", "直播"]
categories: []
---

線上課程當紅，不少朋友都會將自己的課程錄製成影片在網路上分享，每當錄製這類「電腦教學影片」時，總會煩惱要如何將你按下的快捷鍵錄製起來，有時候習慣了直接按 Ctrl + C 複製一段文字，結果讀者在檢視影片時卻搞不懂你做了什麼，有些錄影軟體本身支援把鍵盤的按鍵也一併錄製下來，作法是在你按下按鍵時，建造一個虛擬鍵盤在攝影機裡面，但事實上除了錄影軟體本身支援外，也有軟體可以直接將你所按的按鍵顯示在螢幕上哦！除了用在直撥、線上課程外，用在實體課程演講也十分方便！


<!--more-->


<a href="https://github.com/keycastr/keycastr">KeyCastr</a> 是一套 Open Source 的軟體，僅限 Mac OS 使用，直到三個月前都還有開發的紀錄，我個人測試在 macOS Sierra 也可以正常使用；<a href="https://github.com/keycastr/keycastr">KeyCastr</a> 的功能很強大，可以將你在鍵盤上按的每個按鍵無論是文字按鍵或是命令按鍵（Shift、Command、Optional...etc）都可以顯示在螢幕上，顯示的位置可調整，也可以設定只顯示命令按鍵，細部設定很多，包含暫留螢幕時間、顏色、大小等等都可以調整。不過他在處理中文時蠻有趣的，會把你按下的每個注音都顯示出來，要說這是錯誤的嗎... 好像也沒有錯（笑）但就是不太符合需求，如果有熟悉 Objective-C 的朋友也可以幫它送個 Pull Request 囉。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.58.21.jpg"><img class="alignnone size-large wp-image-7140" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.58.21-1024x712.jpg" alt="" width="660" height="459" /></a>

要注意 KeyCastr 本身也是一個程式，所以當你切換到不同桌面時，是看不到他的，他只會在你啟動它的那個桌面顯示虛擬鍵盤哦！
<h2>KeyCastr 資訊</h2>
<ul>
 	<li>Github： <a href="https://github.com/keycastr/keycastr">https://github.com/keycastr/keycastr</a></li>
 	<li>下載頁： <a href="https://github.com/keycastr/keycastr/releases">https://github.com/keycastr/keycastr/releases</a></li>
</ul>
你可以透過 brew-cask 來安裝 <a href="https://github.com/keycastr/keycastr">KeyCastr</a>，或是直接到他的網站上下載編譯好的檔案，請下載 keycastr.app.zip 的最新版檔案。

安裝完成後 Launchpad 就會看到KeyCastr 的蹤影囉，不過在啟動前要先讓他擁有足夠的權限，否則就會看到這樣的錯誤訊息：

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.46.33.jpg"><img class="alignnone size-full wp-image-7137" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.46.33.jpg" alt="" width="422" height="268" /></a>

請點擊系統偏好設定 =&gt; 安全性與隱私 =&gt; 輔助使用，並把 KeyCastr 加入裡面。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/mac-1.gif"><img class="alignnone size-full wp-image-7138" src="{{< param imageBase >}}/wp-content/uploads/2016/12/mac-1.gif" alt="" width="664" height="538" /></a>

設定完成後就可以把 KeyCastr 打開囉，打開後可以先到右上角進行設定，這邊簡單介紹幾種設定方式：

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.53.44.jpg"><img class="alignnone size-full wp-image-7139" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.53.44.jpg" alt="" width="383" height="449" /></a>

從最上面講起，KeyCastr 有兩種呈現方式，分別截圖給大家看看，左邊就是 Default，右邊則是Svelte 模式。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.59.31.jpg"><img class="alignnone size-full wp-image-7141" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午12.59.31.jpg" alt="" width="232" height="320" /></a> <a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.00.34.jpg"><img class="alignnone size-full wp-image-7142" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.00.34.jpg" alt="" width="212" height="110" /></a>

先來介紹 Default 模式和它的設定們，在預設模式下，不打字時他是不會出現的，預設顯示所有文字（但可以設定成只顯示命令按鈕），打字後會出現黑底框框，過一段時間後會自動消失，如果按快捷鍵也會一併顯示，個人認為這樣較 Svelte 好閱讀，在 Default 模式下你可以設定文字大小、黑底框框顯示的時間長度等等，也可以設定文字、背景的顏色。

雖然 Default 模式下預設黑底框出現在左下角，但其實你可以用滑鼠去拖曳到你覺得合適的位置哦！

至於 Svelte 模式，不管你有沒有按下按鍵，他都會顯示在螢幕上，像工具欄一樣浮在那，和 Default 模式相反，它預設是不顯示字元按鍵（A-Z、0-9 等等），但可以透過設定來開啟他，此外他不像 Default 模式那樣會變成很多列，這是一個不錯的優點，可以避免打字打太多時出現下面這種場景......

把我的螢幕還來呀！！！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.10.43.jpg"><img class="alignnone size-large wp-image-7143" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-24-上午1.10.43-1024x576.jpg" alt="" width="660" height="371" /></a>
