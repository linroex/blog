---
title: "How to Prevent JS Input onFocus Event Fire After Page onFocus"
date: 2017-02-16T11:27:59
slug: "how-to-prevent-js-input-onfocus-event-fire-after-page-onfocus"
tags: ["JavaScript", "HTML"]
categories: []
---

最近的工作是在網站中置入 Google Analytics 的使用者事件追蹤程式碼，我透過 HTML Event 的做法將程式碼掛在 Input 上面，只要使用者點擊特定的欄位、按鈕就會發送一筆記錄到 Google Analytics，這樣的做法沒有什麼問題，但我發現當使用者點擊 Input 欄位後如果切換到其他網頁（Chrome Tabs），當使用者在切換回我的頁面（Page onFocus）時，Input onFocus 事件卻被自動觸發了！


<!--more-->


<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/pagefocus16.gif"><img class="alignnone size-large wp-image-7446" src="{{< param imageBase >}}/wp-content/uploads/2017/02/pagefocus16.gif" alt="" width="660" height="474" /></a>

當我點擊 DevTools 在點回網頁，會發現 Input onFocus 也被觸發了，但我點擊的是頁面而非 Input 欄位。如果點擊其他頁面、切換程式也會有相同效果。

事實上當頁面 onFocus 時，原本的 Input 欄位自動 onFocus 也不難理解，並不能說是一個 Bug，但在這裡因為要追蹤使用者的行為，以這角度來說，當頁面載入時使用者並沒有點擊 Input 欄位，所以我必須想辦法避免這件事情。

我的解法是使用 Page onFocus 事件搭配一個開關變數，詳情請看程式碼：
<pre>var flag = false;

$("input:text").focus(function(e){
  if(flag == true) {
    flag = false;
    return false;
  }
  $("body").append("input focus!&lt;br&gt;");
});

window.onfocus = function() {
  $("body").append("page focus!&lt;br&gt;");
  flag = true;
 
  setTimeout(function(){
    flag = false;
  }, 300);
 
}</pre>
當頁面 onFocus ，我將開關設為 True，我們知道 Page onFocus 後會自動觸發 Current Input onFocus 事件，在 Input onFocus 檢查開關是否為 True，如果是，代表上一個是 Page onFocus，就不執行事件內容，並把開關調整回 False 避免之後的正常使用者點擊也無法觸發事件。

也許在 Chrome 是先觸發 Page onFocus 後觸發 Input onFocus ，但其他瀏覽器可能做法上、順序上有差異，這種慘劇在 JavaScript 的事件屢見不鮮，所以我額外加上 setTimeout 來做備援。

&nbsp;
