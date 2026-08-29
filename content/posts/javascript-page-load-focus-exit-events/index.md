---
title: "JavaScript Page Load、Focus、UnFocus、Exit Event"
date: 2017-01-03T20:43:11
slug: "javascript-page-load-focus-exit-events"
aliases: ["/posts/javascript-page-load%e3%80%81focus%e3%80%81unfocus%e3%80%81exit-event/"]
tags: ["JavaScript"]
categories: []
---

用 JavaScript 記錄使用者何時進入網頁我想大家都會，但你有想過如何判斷使用者「關閉」網頁嗎？ 甚至現在的瀏覽器都是用 Tab 的形式呈現多個網頁，有沒有可能使用者其實是在看別人的網頁，而你的頁面只是掛著呢？ 例如 Youtube 就常遇到這問題，使用者把頁面放著聽歌，但實際上卻是在看 Facebook...。

今天這邊簡單記錄用 JS 頁面的載入、關閉事件，以及進入頁面(focus)、離開頁面(unfocus)事件，透過這些事件，可以記錄使用者的操作狀況供分析，甚至是當使用者跳離網頁時停止播放音樂等行為都可以達成。


<!--more-->

<h2>網頁載入</h2>
進入網頁分成兩種，一種是 ready，另一種是 onload，主要差別在於 onload 是指網頁完全載入完畢，包含圖片、素材等等，而 ready 則是網頁的 DOM 載入完畢就會被觸發，一般來說 ready 會在 onload 之前發生。

註：ready 事件只有 jQuery 才有提供。
<pre>window.onload = function() {
    console.log('load');
}

$(document).ready(function() {
    console.log('ready');
})</pre>
<h2>頁面關閉</h2>
在 Facebook 發表貼文到一半時，如果不小心按到關閉，會跳出一個「你確定要重新載入」的對話框，其實就是用下面的事件達到，透過這事件你可以再使用者關閉頁面時自動儲存內容，或是提示使用者是否確定要離開，不過無法客製對話框的內容，這是為了避免將此事件用於廣告用途。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午8.24.45.jpg"><img class="alignnone size-full wp-image-7186" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午8.24.45.jpg" alt="" width="532" height="278" /></a>
<pre>window.onbeforeunload = function() {
    console.log('123');
    return 'bye';
}</pre>
不管你 return 什麼他都不會顯示出來，但只要你有 return 任何東西，就會出現對話方塊。 如果要取消此功能，可以用這段語法：
<pre>window.onbeforeunload = null</pre>
要注意，頁面關閉的判斷上有技術和策略兩個問題，以技術面來說，目前測試 onbeforeunload 在 iOS 是無法使用的，Android 我沒有試過不確定，至於替代方案？ 我試了很多，但目前還沒找到一個能夠準確判斷是否有關閉網頁行為的；此外，關閉網頁的行為分很多種，包含關閉程式、關閉網頁、當機、點擊連結等等，每個瀏覽器是否會將這些行為判斷為頁面關閉，這點需要再做測試。

以策略面來說，要注意 Mobile 的訪客行為和電腦用戶有落差，想想看你在用手機看網頁時，你真的會去按關閉網頁嗎？ 通常在手機上我們沒有關閉網頁的習慣，而是直接按新增去看其他內容，或是關閉 App，但 Mobile 的關閉其實也不是真正的關閉，而是在背景繼續執行，這邊也需要注意。
<h2>進入頁面</h2>
這邊的進入頁面和 load 不同，而是指使用者從別的 Tab 切換到你的網頁。
<pre>window.onfocus = function() {
    console.log('focus');
}</pre>
<h2>離開頁面</h2>
同樣，這邊並非指關閉頁面，而是使用者點擊其他 Tab，目前的焦點離開你的頁面。
<pre>window.onblur = function() {
    console.log('blur');
};</pre>
