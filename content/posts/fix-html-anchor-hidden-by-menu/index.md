---
title: "解決 HTML Anchor 內文被選單遮住的問題"
date: 2017-02-20T23:28:39
slug: "fix-html-anchor-hidden-by-menu"
aliases: ["/posts/%e8%a7%a3%e6%b1%ba-html-anchor-%e5%85%a7%e6%96%87%e8%a2%ab%e9%81%b8%e5%96%ae%e9%81%ae%e4%bd%8f%e7%9a%84%e5%95%8f%e9%a1%8c/"]
tags: ["HTML", "CSS"]
categories: ["Programming"]
---

HTML 的 Anchor 錨點功能十分方便，當網頁過長時可以透過 Anchor 讓訪客快速的移到指定段落，這樣的手法在許多技術文件、部落格都有出現，如果你看到類似 https://coder.tw/?p=123#section1 的網址就是應用 HTML Anchor 的特性，這樣的特性雖然方便卻也帶來一些問題，最常見因為網頁最上方有浮動選單，當訪客點擊 Anchor 連結進到網頁後，雖然瀏覽器有自動捲到指定章節，但卻有部分文字被選單遮住，我始終很煩惱這問題，今天恰好在閱讀 Facebook 技術文件時發現他們的解法蠻不錯的。


<!--more-->


HTML Anchor 可以讓你在任意 HTML 標籤裡面設定 ID，之後將網址最後面加上 #id，當訪客使用此網址時，會快速捲動到 ID 設定的位置。
<pre>&lt;!-- https://example.com/index.html#section2 --&gt;
&lt;h2 id="section2"&gt;&lt;/h2&gt;</pre>
HTML Anchor Link 會自動將網頁捲動到指定的位置，但如果有浮動選單就會遮住部分文字。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-21-上午1.22.26.jpg"><img class="alignnone size-full wp-image-7481" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-21-上午1.22.26.jpg" alt="" width="1016" height="888" /></a>

解決方法很有趣，當 Anchor 連結點進來時，瀏覽器會自動捲到 h2 的上緣，如果用將 h2 的高度增加，並讓 h2 裡面的文字靠下對齊，自然可以避開浮動選單的阻擋，以下示範用 CSS :before 的方式做到這件事情：

範例：<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/html_anchor.html">html_anchor</a> ｜ <a href="https://gist.github.com/anonymous/7c2dba7f47bb05718565ece8a7102f46">Gist</a>

其中最關鍵的 CSS 程式碼：
<pre>body :target:before{
  display: block;
  content: "";
  height: 160px;
  margin: -160px 0 0;
}</pre>
簡單來說，透過 :before 在 h2 的前面加上一個高度 160px 的區塊，比較特別的是 :target 這個虛擬選擇器代表 HTML Anchor 連結的目標，是在 CSS3 出現的，大部分瀏覽器都已支援，透過這幾行 CSS 就可以讓你的 Anchor Link 不再跟浮動選單打架囉！
