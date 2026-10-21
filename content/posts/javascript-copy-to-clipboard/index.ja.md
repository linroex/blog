---
title: "JavaScript でクリップボードにテキストをコピーする"
date: 2016-12-10T15:19:09
slug: "javascript-copy-to-clipboard"
tags: ["JavaScript", "jQuery"]
categories: ["Programming"]
draft: false
---

以前は、JavaScript でクリップボードを操作してテキストをコピーしたり貼り付けたりするのはとても面倒でした。NTUST.ME（台湾科技大学の短縮URLサービス）を開発したとき、短縮した URL をみんなが簡単にコピーできるようにしたいと思い、JavaScript のクリップボード API を調べました。すると、新しめのブラウザには execCommand という関数があり、コピーや全選択など、便利なテキスト操作がたくさんできることが分かりました。では、ご紹介しましょう！


<!--more-->


おそらくセキュリティ上の理由から、現在はクリップボードのテキストを読み取る（貼り付ける）ことはできず、データをクリップボードに入れる（コピーする）ことしかできないと思われます。
<h2>ブラウザの互換性</h2>
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
<h2>サンプルコード</h2>
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
<h2>コードの説明</h2>
document.execCommand は、ブラウザが提供するテキスト編集 API です。ここで使ったコピーのほかにも、Textarea の中で太字、斜体、ハイパーリンクなどの書式を作ることもできます。

ここでの方法は、まず Textarea 要素を作成してコピーしたいテキストを入れ、全選択します。次に document.execCommand('copy') を実行してテキストをコピーし、最後に Textarea 要素を削除します。処理がとても速いので、Textarea の存在はほとんど気になりません。注意点として、Textarea を非表示にしてはいけません。非表示にするとテキストがコピーされなくなります！
<h2>参考資料</h2>
<ul>
 	<li><a href="https://developer.mozilla.org/zh-TW/docs/Web/API/Document/execCommand">MDN - Document.execCommand()</a></li>
 	<li><a href="https://github.com/linroex/Short-Url-Extension/blob/master/js/function.js">NTUST.ME Short URL Chrome Extension Source Code</a></li>
</ul>
