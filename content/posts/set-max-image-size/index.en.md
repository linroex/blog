---
title: "[CSS] Setting the Maximum Width and Height of Images"
date: 2009-05-15T21:00:17
slug: "set-max-image-size"
tags: ["CSS"]
categories: ["Programming"]
draft: false
---

You can use a CSS rule to set the maximum width and height of an image.


<pre lang="css">Maximum width:

tag-name img{

max-width:width-value

}

Maximum height:

tag-name img{

max-height:height-value

}
</pre>

Also, the height (width) value can be expressed as a percentage.

These rules help keep your blog's images from overflowing their area.

However, this rule doesn't work in IE6.

I'm still researching how to make it work in IE too.

It probably requires JavaScript.
