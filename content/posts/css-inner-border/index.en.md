---
title: "CSS Inner Border: Drawing a Border Inside the Box"
date: 2017-04-26T09:54:28
slug: "css-inner-border"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

While designing my <a href="http://me.coder.tw">personal landing page</a>, I wanted to create an inner border effect, and I learned a clever technique for it. When it comes to a CSS inner border, your first instinct is probably to use padding or margin to make the box bigger. But that doesn't work: when you enlarge the box, the border moves along with it, so you can't create an inner border style this way.


<!--more-->


The solution I found online is to first draw the border in place, then use box-shadow to paint a "shadow" outside the box in the same color as the box's background. Because this shadow has no offset, it creates the visual illusion of an inner border!

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照-2017-04-26-上午10.10.30.jpg"><img class="alignnone size-full wp-image-7634" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照-2017-04-26-上午10.10.30.jpg" alt="" width="747" height="405" /></a>

Using the image above as an example, box-shadow paints a 5px white shadow outside the box. Since there is no offset, the shadow looks like part of the box itself. Here is the CSS for reference:
<pre>.box {
  background: white;
  border: red 1px solid;
  box-shadow: 0 0 0 5px white;
}</pre>
