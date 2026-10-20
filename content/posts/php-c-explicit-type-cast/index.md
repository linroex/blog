---
title: "【PHP】【C++】簡潔的強制顯式轉型別語法"
date: 2011-02-15T22:57:49
slug: "php-c-explicit-type-cast"
aliases: ["/posts/%e3%80%90php%e3%80%91%e3%80%90c%e3%80%91%e7%b0%a1%e6%bd%94%e7%9a%84%e5%bc%b7%e5%88%b6%e9%a1%af%e5%bc%8f%e8%bd%89%e5%9e%8b%e5%88%a5%e8%aa%9e%e6%b3%95/"]
tags: ["PHP", "C++"]
categories: ["Programming"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225730.jpg"><img class="size-large wp-image-282 aligncenter" title="2011-02-15_225730" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225730-540x352.jpg" alt="" width="540" height="352" /></a></p>
在PHP跟C++裡面有一種很方便的轉型別方法，你不用去記那一大串的轉型別函式，直接使用一個括弧加上要轉的型別就可以了，不過這方式好像會有一些問題，不過這部份我也不太清楚XD


<!--more-->

<h2>簡易轉型別：</h2>
<ul>
	<li>轉換成整數：(int)</li>
	<li>轉換成單精數：(double)</li>
	<li>轉換成長整數：(long)</li>
</ul>
至於其他的就以此類推～ 詳細用法請參考下面的範例
<h2>C++轉型別範例：</h2>
範例程式碼下載：<a href="http://www.box.net/shared/aen71zxc7x"> Box.net</a>｜<a href="http://www.4shared.com/file/HnW13vvw/type_exchange.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/type_exchange.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMTUwMWM1NWItMzBiNS00ODQ5LTlmZDItMzdhMWQ2ZDZmYzZl&amp;hl=zh_TW">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225132.jpg"><img class="alignnone size-large wp-image-280" title="2011-02-15_225132" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225132-540x405.jpg" alt="" width="540" height="405" /></a>

p.s.c++與php的轉型別方法都是一樣的，所以這裡只寫出C++的範例
<h2>另一種也很短的轉型別：static_cast</h2>
除了前面的那招(int)、(double)轉型別方式以外，還有一種好像比較安全，不容易出問題的轉型別方式，就是使用static_cast<>，不過這方式好像PHP無法使用

格式：static_cast<轉成的型別>(要被轉換的變數)

例如要把x變數(int)的資料轉成float則程式碼為：

static_cast< int >(x);
<h2>C++範例：</h2>
範例程式碼下載： <a href="http://www.box.net/shared/2br2sqqd0h">Box.net</a>｜<a href="http://www.4shared.com/file/htmMYybf/static_cast.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/static_cast.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZDZmYWMyOWUtZjZmZC00YmI3LWIxZDYtZWFkN2Y3ZTcxMTRk&amp;hl=zh_TW">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225556.jpg"><img class="alignnone size-large wp-image-281" title="2011-02-15_225556" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225556-540x398.jpg" alt="" width="540" height="398" /></a>
