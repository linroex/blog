---
title: "[PHP] mb_convert_encoding: Some API Returned the Wrong Encoding? Convert It!"
date: 2011-02-04T12:24:55
slug: "php-mb-convert-encoding-big5-utf8-gbk"
tags: ["PHP", "Encoding"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_123628.jpg"><img class="alignnone size-large wp-image-4662" title="2011-02-04_123628" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_123628-520x303.jpg" alt="" width="520" height="303" /></a>

↑↑This is viewed in Chrome with Big5 encoding. The top is before conversion, and the bottom is after conversion.

Yesterday, while playing with the Google Weather API, I found that it has a parameter for setting your language. If you don't set it, the API returns English in UTF-8 encoding. But if you set zh-TW, it returns Chinese, encoded in Big5. So when using this API, I had to re-encode its return value to UTF-8 before I could use it. After all, there aren't many Big5 websites left, so yesterday I went looking for the mb_convert_encoding function to do the encoding conversion for me~


<!--more-->


If you're in a similar situation, where an API returns a string in an encoding you don't want, then you'll need the mb_convert_encoding function to convert it. mb_convert_encoding is actually quite useful. It converts the encoding of a given string, and it's not limited to utf8->big5 or the reverse. It can even convert GBK and many other national encodings. However, <strong>before using it, you must make sure that mbstring is enabled in your PHP</strong>.

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_120304.jpg"><img class="alignnone size-large wp-image-4652" title="2011-02-04_120304" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_120304-520x358.jpg" alt="" width="520" height="358" /></a></strong>

<strong>↑↑Windows users can check C:Windowsphp.ini to see whether php_mbstring.dll is installed properly.</strong>
<h2>mb_convert_encoding Syntax</h2>
mb_convert_encoding(string to convert, target encoding, original encoding)

<strong>File download: <a href="http://www.box.net/shared/btlnjatr1c">Box.net</a> ｜ <a href="http://www.4shared.com/file/fCa0YEFL/mb_convert_encoding.html ">4Shared </a>｜ Xun6</strong>

<strong>Ex.</strong>

Convert a UTF-8 string to Big5:
<pre lang="php">$str='測試';
echo $str;		//Still UTF-8 at this point
$str=mb_convert_encoding($str,'big5','utf8');
echo $str;		//Now it's BIG-5</pre>
