---
title: "[JavaScript] encodeURIComponent: A Function for Encoding URLs"
date: 2009-07-22T14:49:56
slug: "javascript-encodeuricomponent"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

When you use JavaScript to make GET requests, you'll often run into the fact that JavaScript requires the URL to be encoded. For functions that need an encoded URL, you can use encodeURIComponent to encode it.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_144915.jpg"><img class="alignnone size-full wp-image-1666" title="2009-07-22_144915" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_144915.jpg" alt="2009-07-22_144915" width="397" height="134" /></a>


<!--more-->


<span style="color: #ffffff;">.</span>
encodeURIComponent syntax:
<pre lang="javascript">var 儲存用變數=encodeURIComponent("被加密網址")</pre>
<span style="color: #ffffff;">.</span>

<span style="color: #ffffff;">.</span>

Example:
<pre lang="javascript">
Paste the following code into the address bar

javascript:alert(encodeURIComponent(location.href));

</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145001.jpg"><img class="alignnone size-full wp-image-1667" title="2009-07-22_145001" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145001.jpg" alt="2009-07-22_145001" width="550" height="57" /></a>

You can also use decodeURIComponwent to restore a URL that was encoded with encodeURIComponent.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145730.jpg"><img class="alignnone size-full wp-image-1669" title="2009-07-22_145730" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145730.jpg" alt="2009-07-22_145730" width="545" height="58" /></a>

The syntax is the same as encodeURIComponent:
<pre lang="javascript">
var 儲存用變數=encodeURIComponent("被加密網址") 
</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145924.jpg"><img class="alignnone size-full wp-image-1670" title="2009-07-22_145924" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145924.jpg" alt="2009-07-22_145924" width="355" height="134" /></a>
