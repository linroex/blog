---
title: "Copying Text to the Clipboard with JavaScript"
date: 2016-12-10T15:19:09
slug: "javascript-copy-to-clipboard"
tags: ["JavaScript", "jQuery"]
categories: ["Programming"]
draft: false
---

In the past, using JavaScript to copy and paste text through the clipboard was very cumbersome. While developing NTUST.ME, a short URL service for National Taiwan University of Science and Technology, I wanted to make it easy for people to copy the shortened URLs, so I looked into the clipboard API in JavaScript. I found that newer browsers have an execCommand function that supports many handy text operations, such as copy and select all. Let me introduce it to you!


<!--more-->


I suspect that for security reasons, you currently can't read text from the clipboard (that is, the paste function). You can only put data into the clipboard (copy).
<h2>Browser Compatibility</h2>
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
<h2>Sample Code</h2>
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
<h2>Explanation</h2>
document.execCommand is a text editing API provided by the browser. Besides the copy operation used here, it can also apply bold, italic, hyperlinks, and other formatting inside a Textarea.

The approach here is to create a Textarea element, put the text you want to copy into it, and select all of it. Then run document.execCommand('copy') to copy the text, and finally remove the Textarea element. Because this happens very quickly, you hardly notice the Textarea exists. Note that you must not hide the Textarea, or the text won't be copied!
<h2>References</h2>
<ul>
 	<li><a href="https://developer.mozilla.org/zh-TW/docs/Web/API/Document/execCommand">MDN - Document.execCommand()</a></li>
 	<li><a href="https://github.com/linroex/Short-Url-Extension/blob/master/js/function.js">NTUST.ME Short URL Chrome Extension Source Code</a></li>
</ul>
