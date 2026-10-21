---
title: "[PHP] [C++] A Concise Syntax for Explicit Type Casting"
date: 2011-02-15T22:57:49
slug: "php-c-explicit-type-cast"
tags: ["PHP", "C++"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225730.jpg"><img class="size-large wp-image-282 aligncenter" title="2011-02-15_225730" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225730-540x352.jpg" alt="" width="540" height="352" /></a></p>
PHP and C++ have a very convenient way to cast types. You don't have to memorize a long list of conversion functions. You just put the target type in parentheses in front of the value. However, this approach seems to have some problems, though I'm not really sure what they are XD


<!--more-->

<h2>Simple type casts:</h2>
<ul>
	<li>Convert to integer: (int)</li>
	<li>Convert to single-precision: (double)</li>
	<li>Convert to long integer: (long)</li>
</ul>
The others work the same way~ See the examples below for details.
<h2>C++ type cast example:</h2>
Sample code download: <a href="http://www.box.net/shared/aen71zxc7x"> Box.net</a>｜<a href="http://www.4shared.com/file/HnW13vvw/type_exchange.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/type_exchange.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMTUwMWM1NWItMzBiNS00ODQ5LTlmZDItMzdhMWQ2ZDZmYzZl&amp;hl=zh_TW">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225132.jpg"><img class="alignnone size-large wp-image-280" title="2011-02-15_225132" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225132-540x405.jpg" alt="" width="540" height="405" /></a>

P.S. The type-casting syntax is the same in C++ and PHP, so only C++ examples are shown here.
<h2>Another short cast: static_cast</h2>
Besides the (int) and (double) casts above, there is another casting method that seems safer and less prone to problems: static_cast<>. However, this method doesn't seem to work in PHP.

Format: `static_cast<target type>(variable to be converted)`

For example, to convert the data in the int variable x to float, the code is:

static_cast< int >(x);
<h2>C++ example:</h2>
Sample code download: <a href="http://www.box.net/shared/2br2sqqd0h">Box.net</a>｜<a href="http://www.4shared.com/file/htmMYybf/static_cast.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/static_cast.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZDZmYWMyOWUtZjZmZC00YmI3LWIxZDYtZWFkN2Y3ZTcxMTRk&amp;hl=zh_TW">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225556.jpg"><img class="alignnone size-large wp-image-281" title="2011-02-15_225556" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225556-540x398.jpg" alt="" width="540" height="398" /></a>
