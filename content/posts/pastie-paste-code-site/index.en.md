---
title: "Pastie: A Site for Posting Code That Can Be Embedded in External Websites!"
date: 2011-06-12T02:13:32
slug: "pastie-paste-code-site"
tags: ["Pastie"]
categories: ["Web Apps"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_015959.jpg"><img class="size-large wp-image-540 aligncenter" title="2011-06-12_015959" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_015959-540x443.jpg" alt="" width="540" height="443" /></a>

Sometimes you may want to share some code with a friend and ask them to help you debug it. In that case, sending the file directly is the best way. But what if they can't receive files? That's when <strong><a href="http://pastie.org/">Pastie</a></strong> comes in handy. You paste your code into Pastie, and the site gives you a URL. Just send that URL to the other person, and they can see your code. There are a lot of sites like Pastie these days, but Pastie's biggest feature is that it can be embedded in external websites~


<!--more-->
<strong>Website: <a href="http://pastie.org/">http://pastie.org</a> </strong>
<h2>Tutorial</h2>
1.Go to the <a href="http://pastie.org/">Pastie</a> website and paste your code there.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020325.jpg"><img class="alignnone size-large wp-image-541" title="2011-06-12_020325" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020325-540x443.jpg" alt="" width="540" height="443" /></a>

2.Set the format of the pasted content (the programming language).

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020512.jpg"><img class="alignnone size-large wp-image-542" title="2011-06-12_020512" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020512-540x443.jpg" alt="" width="540" height="443" /></a>

3.Once that's set, click the Paste button and you're done~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020631.jpg"><img class="alignnone size-large wp-image-543" title="2011-06-12_020631" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020631-540x443.jpg" alt="" width="540" height="443" /></a>

4.You can send the URL directly to the other person. Or, if you want to paste the code onto your own website, copy the snippet on the right and paste it into your site.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020830.jpg"><img class="alignnone size-large wp-image-544" title="2011-06-12_020830" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_020830-540x443.jpg" alt="" width="540" height="443" /></a>
<h2>How It Works</h2>
If you want to embed the code in your website, you first need to copy a snippet of JavaScript and paste it onto your site. The principle is actually simple. It just uses one JavaScript method, document.write, to output content to the screen. That's how your code gets displayed this way.

▼▼The content of the js block is a bunch of document.write calls

<a href="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_021235.jpg"><img class="alignnone size-large wp-image-545" title="2011-06-12_021235" src="{{< param imageBase >}}/wp-content/uploads/2011/06/2011-06-12_021235-540x338.jpg" alt="" width="540" height="338" /></a>
