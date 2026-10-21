---
title: "Shared Links Not Showing Up as Expected on Facebook? Here's How to Optimize Your Site for Facebook!"
date: 2017-02-18T20:39:46
slug: "facebook-share-function-optimization"
tags: ["Facebook", "SEO"]
categories: ["Blog"]
draft: false
---

For every webmaster, Facebook has become just as important a traffic source as Google. In the past, we did a lot of SEO work for search engines, but did you know that Facebook has also published a document, "<a href="https://developers.facebook.com/docs/sharing/best-practices">Best Practices for Sharing Websites and Mobile Apps</a>," that explains how to adjust your web pages so they are displayed in the best way when users share them on Facebook? In this article, I'll share what I tried on my personal blog.


<!--more-->


When we post a URL on a Facebook wall, the post automatically shows a title, a description, and text. If you don't do anything, Facebook will pick an image from the page to display, or it may show only text with no image:

Best case: an image that matches the content, along with the title and description text

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.54.06.jpg"><img class="alignnone size-full wp-image-7456" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.54.06.jpg" alt="" width="520" height="685" /></a>

If you haven't optimized for Facebook, it may only show the title and description, or the text may even be wrong or irrelevant.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.57.03.jpg"><img class="alignnone size-full wp-image-7457" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.57.03.jpg" alt="" width="521" height="281" /></a>

Comparing the two examples above, it's obvious which one is more likely to attract Facebook users to read it. Everyone knows that a suitable image and an attractive text and title make your post stand out. It's a real shame if a page doesn't display correctly when shared on Facebook simply because it wasn't optimized.

Next, I'll share how my personal blog, *Coder's Journal*, handles this. If you're a social media editor who doesn't understand the technical side, you can read this and discuss it with an engineer.

WordPress has a featured image feature that lets you set one image for each post, and my whole setup relies on it. If a post has a featured image, that image is used when sharing to Facebook. If not, the first image in the post is used. If neither exists, the featured image of the post's category is used for sharing. The description text uses the first 100 characters of the post.
<h2>Basic Information</h2>
When we share an article to Facebook, Facebook's crawler visits the page and pulls out information such as the title, description, and cover image. We can set Open Graph Meta Tags so that Facebook can crawl the page correctly. If we don't, the crawler decides on its own, using its algorithm.

Modify this code and add it inside the HTML head.
<pre>&lt;meta property="og:title" content="碼人日誌文章標題"&gt;
&lt;meta property="og:image" content="https://example.com/hello.jpg"&gt;
&lt;meta property="og:description" content="這是一段簡介文字"&gt;</pre>
If you have multiple images you'd like to show and let users choose from, you can set several og:image tags, for example:
<pre>&lt;meta property="og:image" content="https://example.com/hello1.jpg"&gt;
&lt;meta property="og:image" content="https://example.com/hello2.jpg"&gt;
&lt;meta property="og:image" content="https://example.com/hello3.jpg"&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/5__林熙哲_🔊.png"><img class="alignnone size-full wp-image-7460" src="{{< param imageBase >}}/wp-content/uploads/2017/02/5__林熙哲_🔊.png" alt="" width="524" height="507" /></a>

Besides these three Open Graph Meta Tags, you can also add others as needed: <a href="https://developers.facebook.com/docs/sharing/opengraph/object-properties#standard">Open Graph standard object properties</a>

In addition, I recommend creating an app on Facebook for Developers and filling in its app_id. This lets you see more detailed information in Facebook's analytics tools, such as the number of shares for each post.
<pre>&lt;meta property="fb:app_id" content="" /&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.16.06.jpg"><img class="alignnone size-large wp-image-7459" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.16.06-1024x779.jpg" alt="" width="660" height="502" /></a>
<h2>Cover Image</h2>
For the best display, the og:image cover image should be at least 1200×630 in resolution, and try to keep an aspect ratio of 1.91:1. This keeps part of your carefully prepared image from being cut off.

If the ratio isn't adjusted properly, you end up with an embarrassing result like this:

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午9.30.11.jpg"><img class="alignnone size-full wp-image-7471" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午9.30.11.jpg" alt="" width="484" height="389" /></a>

There are also some restrictions:
<ul>
 	<li>The image file size cannot exceed 8MB</li>
 	<li>The image resolution cannot be lower than 200×200</li>
</ul>
If you look closely, you'll see that Facebook displays the cover image of a shared link in two ways. One shows a large image above the title. We usually recommend this layout because it grabs attention. The other places the image to the left of the title.

If the image is smaller than 600×315, it will be displayed in the layout with the image on the left.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.25.57.jpg"><img class="alignnone size-full wp-image-7461" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.25.57.jpg" alt="" width="518" height="355" /></a>

By now you're probably eager to set og:image, only to find that sharing on Facebook still shows no image, right? That's because the first time you share a link, Facebook doesn't download the cover image to its servers that quickly. The cover image usually takes effect the second time you share the link. My personal habit is to paste the link into the post box without posting it, then refresh the page and paste it again. That usually displays correctly. Or you can add these two Open Graph Meta Tags to solve the problem, so that the first share already displays correctly.

Setting og:image:width and og:image:height lets Facebook learn the image's width and height directly, without having to download the image and calculate them. That way, the image displays correctly on the first share.
<pre>&lt;meta property="og:image:width" content="1024"&gt;
&lt;meta property="og:image:height" content="600"&gt;</pre>
Facebook also supports Open Graph Meta Tags generated dynamically with JS. If you use JS to change the content of og:image, Facebook can read it correctly. Taking advantage of this, I wrote a purely front-end program that sets og:image:width. The reason is that if I added these from the back end, I'd have to store both the width and height of every image in the database. I'm a bit lazy and didn't want to change the back-end code, so...
<pre>window.onload = function() {
  var img_src = document.head.querySelectorAll("[property='og:image']")[0].content;
  var img = new Image();
  img.src = img_src;

  img.onload = function() {
    var og_width_meta = document.createElement("meta");
    var og_height_meta = document.createElement("meta");

    og_width_meta.setAttribute("property", "og:image:width");
    og_width_meta.setAttribute("content", img.width);

    og_height_meta.setAttribute("property", "og:image:height"); 
    og_height_meta.setAttribute("content", img.height);

    document.getElementsByTagName("head")[0].appendChild(og_width_meta);
    document.getElementsByTagName("head")[0].appendChild(og_height_meta);
  }
}</pre>
If you change an image, Facebook's cache means the change won't take effect right away. In that case, you can use Facebook's <a href="https://developers.facebook.com/tools/debug/sharing/batch/">bulk invalidation tool</a> to clear the cache.
<h2>Error Checking</h2>
If you've made all the settings but they still don't take effect, you can use Facebook's <a href="https://developers.facebook.com/tools/debug/sharing/">Sharing Debugger</a> to check for configuration errors.

Error checking tool: <a href="https://developers.facebook.com/tools/debug/sharing/">https://developers.facebook.com/tools/debug/sharing/</a>

If the URL is being shared to Facebook for the first time, you'll see a message like this. Click "Fetch New Information" to proceed.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.38.26.jpg"><img class="alignnone size-full wp-image-7462" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.38.26.jpg" alt="" width="1010" height="590" /></a>
