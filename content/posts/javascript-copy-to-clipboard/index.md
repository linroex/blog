---
title: "使用 JavaScript 操作剪貼簿複製文字"
date: 2016-12-10T15:19:09
slug: "javascript-copy-to-clipboard"
aliases: ["/posts/%e4%bd%bf%e7%94%a8-javascript-%e6%93%8d%e4%bd%9c%e5%89%aa%e8%b2%bc%e7%b0%bf%e8%a4%87%e8%a3%bd%e6%96%87%e5%ad%97/"]
tags: ["JavaScript", "jQuery"]
categories: ["Programming"]
---

在過去想要用 JavaScript 操作剪貼簿進行複製、貼上的動作十分麻煩，之前在開發 NTUST.ME 臺科短網址時，為了方便大家複製縮短後的網址，特別研究了 JavaScript 對剪貼簿操作的 API，發現在較新版的瀏覽器，其實有一個 execCommand 可以進行許多方便的文字操作，例如複製、全選等等，以下就讓我來介紹一下吧！


<!--more-->


猜測因為安全因素，目前不能從剪貼簿存取文字，也就是貼上功能，只能把資料塞進剪貼簿（複製）。
<h2>瀏覽器相容性</h2>
<table class="compat-table">
<tbody>
<tr>
<th>Feature</th>
<th>Chrome</th>
<th>Edge</th>
<th>Firefox (Gecko)</th>
<th>Internet Explorer</th>
<th>Opera</th>
<th>Safari</th>
</tr>
<tr>
<td><code>copy</code>/<code>cut</code></td>
<td>43</td>
<td><span title="Compatibility unknown; please update this.">?</span></td>
<td><a title="Released on 2015-09-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/41">41</a> (41)</td>
<td>9</td>
<td>29</td>
<td>10</td>
</tr>
</tbody>
</table>
<h2>範例程式碼</h2>
<div class="highlight">
<pre>// Native JS Version
function copy(s) {
  var clip_area = document.createElement('textarea');
  clip_area.textContent = s;

  document.body.appendChild(clip_area);
  clip_area.select();
    
  document.execCommand('copy');
  clip_area.remove();
}</pre>
</div>
<div class="highlight">
<pre>//jQuery Version
function copy(s) {
  $('body').append('&lt;textarea id="clip_area"&gt;&lt;/textarea&gt;');
    
  var clip_area = $('#clip_area');
    
  clip_area.text(s);
  clip_area.select();

  document.execCommand('copy');
    
  clip_area.remove();
}
</pre>
</div>
<h2>程式碼說明</h2>
document.execCommand 是由瀏覽器提供的文字編輯 API，除了這邊所使用的複製外，也可以在 Textarea 裡面製造粗體、斜體、超連結等文字。

這邊的作法，先建立一個 Textarea 元素，把你要複製的文字填進去後全選，然後執行 document.execCommand('copy') 來複製文字，最後把 Textarea 元素移除，因為速度很快所以幾乎感覺不到 Textarea 的存在。 注意不能把 Textarea 隱藏起來，否則會無法複製文字！
<h2>參考資料</h2>
<ul>
 	<li><a href="https://developer.mozilla.org/zh-TW/docs/Web/API/Document/execCommand">MDN - Document.execCommand()</a></li>
 	<li><a href="https://github.com/linroex/Short-Url-Extension/blob/master/js/function.js">NTUST.ME Short URL Chrome Extension Source Code</a></li>
</ul>
