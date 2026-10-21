---
title: "PHP Probe: Checking How Stable Your Hosting Space Is"
date: 2009-06-14T14:53:09
slug: "php-probe-check-hosting-performance"
tags: ["PHP"]
categories: ["SRE"]
draft: false
---

I imagine many people building a website start out on free web hosting.
You're probably also curious whether your host is stable, and how fast it is.
Today I came across an article on a free site where someone used a PHP probe to check their hosting, so here it is for everyone to try~~~~

First, download the <a href="http://goo.gl/X2XX ">PHP probe</a>

<!--more-->


After downloading it, upload it to the root directory of your hosting space.
P.S. If your space has a folder called htdocs, upload it into that folder.
<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_143714.jpg"><img class="alignnone size-full wp-image-1352" title="2009-06-14_143714" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_143714.jpg" alt="2009-06-14_143714" width="640" height="461" /></a>
After uploading, open the following URL in your browser:
http://你的網址/phpinfo1.php

Then you'll see what you're supposed to see~~~

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_144519.jpg"><img class="alignnone size-full wp-image-1354" title="2009-06-14_144519" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-14_144519.jpg" alt="2009-06-14_144519" width="700" height="209" /></a>
I didn't expect free hosting to be this fast XD

Original author of this program: unknown...........
