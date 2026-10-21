---
title: "Fixing HTML Anchor Content Hidden Behind a Menu"
date: 2017-02-20T23:28:39
slug: "fix-html-anchor-hidden-by-menu"
tags: ["HTML", "CSS"]
categories: ["Programming"]
draft: false
---

HTML anchors are very handy. When a page is long, an anchor lets visitors jump quickly to a specific section. This technique shows up in many technical documents and blogs. If you've seen a URL like https://coder.tw/?p=123#section1, that's the HTML anchor feature at work. Although it's convenient, it brings some problems. The most common one: there is a floating menu at the top of the page. When a visitor clicks an anchor link, the browser does scroll to the section, but part of the text ends up hidden behind the menu. I had always been annoyed by this, and today, while reading Facebook's technical documentation, I found their solution, which is pretty good.


<!--more-->


HTML anchors let you set an ID on any HTML tag. Then add #id to the end of the URL, and when visitors use that URL, the page quickly scrolls to the position of that ID.
<pre>&lt;!-- https://example.com/index.html#section2 --&gt;
&lt;h2 id="section2"&gt;&lt;/h2&gt;</pre>
An HTML anchor link automatically scrolls the page to the specified position, but if there is a floating menu, it covers part of the text.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-21-上午1.22.26.jpg"><img class="alignnone size-full wp-image-7481" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-21-上午1.22.26.jpg" alt="" width="1016" height="888" /></a>

The solution is quite clever. When an anchor link is clicked, the browser scrolls so the top edge of the h2 is visible. If you increase the height of the h2 and align the text inside it toward the bottom, it naturally avoids being blocked by the floating menu. Below is an example of doing this with CSS :before:

Example: <a href="{{< param imageBase >}}/wp-content/uploads/2017/02/html_anchor.html">html_anchor</a> | <a href="https://gist.github.com/anonymous/7c2dba7f47bb05718565ece8a7102f46">Gist</a>

The key CSS code:
<pre>body :target:before{
  display: block;
  content: "";
  height: 160px;
  margin: -160px 0 0;
}</pre>
In short, :before adds a 160px-tall block in front of the h2. The :target pseudo-selector, introduced in CSS3 and supported by most browsers today, refers to the target of an HTML anchor link. With these few lines of CSS, your anchor links will no longer fight with the floating menu!
