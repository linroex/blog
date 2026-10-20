---
title: "【PHP】mb_convert_encoding - 遇到某些API的回傳值編碼不是自己要的？ 來轉碼吧"
date: 2011-02-04T12:24:55
slug: "php-mb-convert-encoding-big5-utf8-gbk"
aliases: ["/posts/%e3%80%90php%e3%80%91mb_convert_encoding-big5%e3%80%81utf8%e3%80%81gbk%e7%ad%89%e5%a4%9a%e7%a8%ae%e7%b7%a8%e7%a2%bc%e6%96%b9%e5%bc%8f%e4%ba%92%e8%bd%89/"]
tags: ["PHP", "Encoding"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_123628.jpg"><img class="alignnone size-large wp-image-4662" title="2011-02-04_123628" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_123628-520x303.jpg" alt="" width="520" height="303" /></a>

↑↑這是在Chrome下用Big5檢視,上面是轉碼前,下面是轉碼後

昨天在玩Google Weather API時他有一個參數是設定你的語言的,那個參數如果不設定則API傳回值是英文的,然後是UTF-8編碼,但如果設定zh-TW則回傳值是中文的,但是是使用Big-5編碼,因此在使用這組API時我必須要把它的傳回值重新編碼成UTF-8才能使用,畢竟現在Big-5的網站已經蠻少了,所以我昨天就去找了mb_convert_encoding這個函式來幫我轉編碼~


<!--more-->


如果你跟我遇到了類似的事情,某API傳回值的編碼不是你要的,那麼你就會需要使用到mb_convert_encoding這個函式,來將他編碼轉換,mb_convert_encoding這函式其實蠻好用的,他可以將指定字串進行編碼轉換,而且不限制是utf8->big5或是反過來,甚至GBK還有各種其他國家的編碼都可以轉換,但是<strong>使用前必須要先確定你的PHP的mbstring是開啟的</strong>

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_120304.jpg"><img class="alignnone size-large wp-image-4652" title="2011-02-04_120304" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_120304-520x358.jpg" alt="" width="520" height="358" /></a></strong>

<strong>↑↑Windows用戶可以到C:Windowsphp.ini檢查php_mbstring.dll是否有安裝好</strong>
<h2>mb_convert_encoding格式</h2>
mb_convert_encoding(要編碼的字串,目標編碼格式,原本的編碼格式)

<strong>檔案載點：<a href="http://www.box.net/shared/btlnjatr1c">Box.net</a> ｜ <a href="http://www.4shared.com/file/fCa0YEFL/mb_convert_encoding.html ">4Shared </a>｜ Xun6</strong>

<strong>Ex.</strong>

把utf-8的字串轉換成big-5
<pre lang="php">$str='測試';
echo $str;		//此時是UTF-8
$str=mb_convert_encoding($str,'big5','utf8');
echo $str;		//此時是BIG-5</pre>
