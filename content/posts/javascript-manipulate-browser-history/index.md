---
title: "JavaScript 操作瀏覽器歷史紀錄、修改網址與上一頁事件（SPA 必備）"
date: 2017-01-14T12:59:02
slug: "javascript-manipulate-browser-history"
aliases: ["/posts/javascript-%e6%93%8d%e4%bd%9c%e7%80%8f%e8%a6%bd%e5%99%a8%e6%ad%b7%e5%8f%b2%e7%b4%80%e9%8c%84%e3%80%81%e4%bf%ae%e6%94%b9%e7%b6%b2%e5%9d%80%e8%88%87%e4%b8%8a%e4%b8%80%e9%a0%81%e4%ba%8b%e4%bb%b6%ef%bc%88/"]
tags: ["JavaScript", "HTML5"]
categories: []
---

在 JavaScript 當道的今日，使用 JS 進行網頁的操作如 Ajax、頁面切換、彈出視窗等等越來越常見，甚至進一步出現了 React JS、Vue JS 等可以幫助你開發 Single Page Application (SPA) 的 JS Framework；在使用 JS 進行網頁操作時最怕的問題莫過於網址的變化與歷史紀錄，例如透過 jQuery 進行頁面切換後，因為是 JS 的行為所以網址不會變化，而且當使用者按下瀏覽器左上角的上一頁時，會直接回到別的頁面，因為在歷史紀錄裡面不會紀錄 JS 的操作（事實上也無法紀錄），要解決這一系列問題，可以透過 HTML5 提供的 history.pushState、history.replaceState 以及 onpopstate 事件來解決。


<!--more-->


如果使用 React JS 或 Vue JS 這類框架，通常會有搭配的套件例如 vue-router 可以幫你處理 SPA 的惱人網址問題，背後原理其實也是透過 JS 修改 history 的方式處理。但有的時候你沒有好用的工具人來幫忙，就只能自己從頭刻起。 當然，我相信一定有很多 JS Plugin 可以解決這篇中所提到的問題，但更重要的是了解背後的原理，才能加以應用。

pushState、replaceState、onpopstate 這組工具可以解決哪些問題呢？ 這邊試列部分我有想到的，但也別忘記他們的核心概念是修改瀏覽器歷史紀錄與網址，藉著這個核心概念可以想到更多用法，而不僅僅是拘泥在我們所看到的可能性。
<ul>
 	<li>透過 JS 對頁面進行操作後，讓網址隨之改變，方便使用者複製分享或儲存；但也別忘記，在頁面 onload 時要記得分析網址內容，讓程式會跑到正確的地方，正所謂一進一出都要兼顧（顯示網址、透過該網址回到相同內容）。</li>
 	<li>單純覺得網址太醜，想要偽造一個好看的網址，但要記得當使用者複製這個網址給朋友時，對方能否順利看到內容？</li>
 	<li>頁面有自己的上一步、下一步按鈕，透過 JS 動態載入內容，但如果使用者點擊瀏覽器上一頁時會出錯，因為自始自終都在同一頁裡面，只是透過 JS 修改內容。</li>
</ul>
這組 API 目前在 Chrome、Firefox、Safari 等等都穩定支援，使用上無需太擔心，但手機瀏覽器可能需要再進行測試。 (Ref <a href="https://developer.mozilla.org/zh-TW/docs/Web/Guide/API/DOM/Manipulating_the_browser_history/Manipulating_the_browser_history">MDN</a>)
<table class="compat-table">
<tbody>
<tr>
<th>Feature</th>
<th>Chrome</th>
<th>Firefox</th>
<th>IE</th>
<th>Opera</th>
<th>Safari</th>
</tr>
<tr>
<td>replaceState, pushState</td>
<td>5</td>
<td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2.0)</td>
<td>10</td>
<td>11.50</td>
<td>5.0</td>
</tr>
<tr>
<td>history.state</td>
<td>18</td>
<td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2.0)</td>
<td>10</td>
<td>11.50</td>
<td>6.0</td>
</tr>
</tbody>
</table>
核心原理，這邊十分重要，這系列 API 核心概念是把 history.state 視為 Stack，你可以透過 pushState 把新的紀錄放進去，或是當使用者點擊上一頁（下一頁）時，會觸發 onpopstate 事件，並將Stack 的最後一個項目 pop 出來給你，你接收事件後再用 JS 判斷該切換到哪一頁或做什麼行為。  因為 history.state 是Stack 的緣故，如果你在 onpopstate 裡面又進行 pushState ，就可能會遇到靈異現象，原因和這篇 【<a href="https://coder.tw/?p=7231">Python 千萬不要在迴圈裡面刪除陣列元素</a>】 類似；此外在 onpopstate 裡面是沒有方向性的，你無法直接得知使用者是按下一頁還是上一頁，但也不重要，謹記這是Stack 即可。
<h2>pushState</h2>
當使用者按下一步，JS 動態載入內容並跳頁，這就很適合使用 pushState，顧名思義就是把新的狀態放進 window.history 裡。
<pre>history.pushState(state, title, url)</pre>
state 參數可以是任何能夠被序列化的東西，他會被儲存在 history 裡面，當使用者按咧覽器的「上一頁」時會被 Pop 出來給你，所以透過這個參數可以讓未來的你知道「上一頁」是要切換到哪頁。

舉例來說，現在的網址是 http://example.com，當我執行下面語法後：
<pre>history.pushState({step: 1}, "第一步", "/step/1")</pre>
網址會變成 http://exmple.com/step/1，網頁標題則變成「第一步」（Firefox 似乎未實作此參數），當你按下瀏覽器的上一頁時，你會透過 onpopstate 事件獲得 {step: 1} 這個物件。
<h2>replaceState</h2>
參數和 pushState 完全一樣，差別在於 history.replaceState 不會對Stack 放東西進去，而是修改目前的狀態，通俗話就是改網址啦，舉例來說 JS 開了一個對話框，你希望這個行為被反映到網址上，但又不希望他變成歷史紀錄，那就可以使用 replaceState 啦！
<h2>onpopstate</h2>
這是一個事件，當使用者點擊瀏覽器的上一頁或下一頁按鈕時會觸發該事件，並將Stack 的最後一個項目 pop 出來給你，透過該項目（也就是你透過 pushState 推進去的 state）可以知道上一頁做了什麼，接著再透過 JS 把剛剛的內容載入回來。
<pre>window.onpopstate = function(event) {

  console.log(event.state);

}</pre>
<h2>方向性</h2>
如果你希望判斷使用者是按了上一頁或下一頁按鈕，例如載入動畫的方向不同，預設是無法取得的，但你可以透過全域變數的設定，來計算是往哪個方向移動，請看範例：
<pre>var current_step = 1;

window.onpopstate = function(event) {
  if(current_step - event.state.step &gt; 0) {
    console.log("上一頁");
  }else{
    console.log("下一頁");
  }
}

function show_step1( ) {
  current_step = 1;
  history.pushState({step: 1}, "第一步", "/step/1");
}

function show_step2( ) {
  current_step = 2;
  history.pushState({step: 2}, "第二步", "/step/2");
}</pre>
<h2>注意事項</h2>
<ul>
 	<li>不要用上一頁的方式去思考，瀏覽器並不會告訴你上一頁是什麼，它是告訴你最後一個被推進去的 state 是什麼，你要解讀這個 state 自己去載入相應的內容(元素)，如果你什麼都沒做，那即使使用者按「上一頁」也不會發生任合事情。</li>
 	<li>當 onpopstate 發生時，瀏覽器會自動幫你修改網址，無需自行呼叫 replaceState。</li>
 	<li>千萬不要在 onpopstate 裡面呼叫 pushState，除非你很清楚問題是如何發生的，以及你自己在做什麼。</li>
 	<li>這一系列 API 只在相同頁面才能運作，換言之當使用者的上一頁是透過瀏覽器載入（例如超連結）時，當他按「上一頁」，JS 不會收到任何通知。</li>
 	<li>因為瀏覽器的 BFCache，捲軸位置可能和預期不同。</li>
 	<li>不要光顧著顯示好看的網址，也要思考如果這個網址被複製分享，別的人能否「使用」該網址檢視到預期的內容。</li>
</ul>
&nbsp;
