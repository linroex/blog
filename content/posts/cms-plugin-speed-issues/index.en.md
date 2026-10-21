---
title: "[CMS] Why Do Plugins Slow Down Page Loads and Hurt Server Performance?"
date: 2011-04-17T09:00:37
slug: "cms-plugin-speed-issues"
tags: ["WordPress", "WordPress Plugins"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_183400.jpg"><img class="size-full wp-image-5031 aligncenter" title="2011-04-16_183400" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_183400.jpg" alt="" width="300" height="300" /></a>

Anyone who builds a site with a CMS (such as WordPress, Drupal, or Joomla) has probably heard the saying: use fewer plugins and your site will load much faster. For example, if I want a Lightbox effect on my site, I can manually add the jQuery code, or I can just install a plugin. Both methods achieve the same result, but they can make a noticeable difference in how fast the site loads.


<!--more-->

<h2>Why Does Using Plugins Make a Site Slower?</h2>
Why would using plugins slow a site down? Why would the same feature slow the site more as a plugin than if I added it by hand? Is this some kind of mechanism that punishes lazy people?! Actually, none of those. The reason plugins slow a site down is simple. Most CMS plugins are written with a hook mechanism. In other words, the CMS itself provides a set of APIs for developers to use. You can think of them as events in object-oriented programming: when something happens in the CMS, some action may need to run. For example:

When a post is published, if I want the post's URL sent to my email, I need to use the API for publishing a new post and specify a function that sends an email when a post is published. In other words, when the "new post published" event happens, "send an email."

Almost all CMS plugins are designed this way. When something happens, the plugin does not do the work directly. Instead, the system manages it centrally. That makes plugins less efficient, because they go through an extra step in the CMS, rather than running directly like manually written code.

Here is one example. Many people like to use <strong><a href="http://www.google.com/analytics/">Google Analytics</a></strong>, but they do not want to edit the theme files by hand to add the analytics code. So they install a plugin to add the analytics code for them quickly. This approach quietly slows the site down because of the CMS management layer. If you add the code to the theme files by hand, the impact is not very large.
<h2>How Can You Make a Site Faster?</h2>
There are many ways to speed up a site. Common ones include enabling Gzip, using a better host, and compressing images, and so on. But since this post is about plugins, I will focus on them.
<ol>
	<li>Avoid plugins for anything you can do without one, such as Google Analytics, Lightbox effects, and tweet buttons.</li>
	<li>Remove any plugins you are not using. Even inactive plugins affect site speed.</li>
</ol>
I already explained the reason for the first point: plugins are managed by the CMS, so the extra step slows the site down. But what about the second point? Why would my plugins affect the site if they are not even active? In short, the CMS scans your site to see which plugins are installed, then checks whether each one is active. Each CMS handles this check differently, so the impact varies too. For WordPress, my impression is that the impact is very large. A while ago, my site still had nearly ten inactive plugins that I had not removed. Then I saw someone say they affect performance, so I deleted them all. A week later, I was surprised to see that my site's loading speed in <strong><a href="http://www.google.com.tw/webmasters/">Google Webmaster Tools</a></strong> had suddenly improved by 10 seconds. My guess is that WordPress checks the plugin directory on each visit to see which plugins are present, then determines which ones are active and does the related work for those. So a pile of inactive plugins slows the site down.

Diagram ▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_183340.jpg"><img class="alignnone size-full wp-image-5030" title="2011-04-16_183340" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_183340.jpg" alt="" width="396" height="389" /></a>

&nbsp;
