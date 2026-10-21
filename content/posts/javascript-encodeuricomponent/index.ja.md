---
title: "【JavaScript】encodeURIComponent――URL をエンコードする関数"
date: 2009-07-22T14:49:56
slug: "javascript-encodeuricomponent"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

JavaScript で GET リクエストなどを行うときには、JavaScript が URL のエンコードを要求してくることによく直面します。URL のエンコードが必要な関数では、encodeURIComponent を使って URL をエンコードできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_144915.jpg"><img class="alignnone size-full wp-image-1666" title="2009-07-22_144915" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_144915.jpg" alt="2009-07-22_144915" width="397" height="134" /></a>


<!--more-->


<span style="color: #ffffff;">.</span>
encodeURIComponent の構文：
<pre lang="javascript">var 儲存用變數=encodeURIComponent("被加密網址")</pre>
<span style="color: #ffffff;">.</span>

<span style="color: #ffffff;">.</span>

例：
<pre lang="javascript">
次のコードをアドレスバーに貼り付けてください

javascript:alert(encodeURIComponent(location.href));

</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145001.jpg"><img class="alignnone size-full wp-image-1667" title="2009-07-22_145001" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145001.jpg" alt="2009-07-22_145001" width="550" height="57" /></a>

また、decodeURIComponwent を使うと、encodeURIComponent でエンコードされた URL を元に戻すことができます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145730.jpg"><img class="alignnone size-full wp-image-1669" title="2009-07-22_145730" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145730.jpg" alt="2009-07-22_145730" width="545" height="58" /></a>

構文は encodeURIComponent と同じです：
<pre lang="javascript">
var 儲存用變數=encodeURIComponent("被加密網址") 
</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145924.jpg"><img class="alignnone size-full wp-image-1670" title="2009-07-22_145924" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-22_145924.jpg" alt="2009-07-22_145924" width="355" height="134" /></a>
