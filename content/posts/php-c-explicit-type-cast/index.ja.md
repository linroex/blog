---
title: "【PHP】【C++】簡潔な明示的型キャストの書き方"
date: 2011-02-15T22:57:49
slug: "php-c-explicit-type-cast"
tags: ["PHP", "C++"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225730.jpg"><img class="size-large wp-image-282 aligncenter" title="2011-02-15_225730" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225730-540x352.jpg" alt="" width="540" height="352" /></a></p>
PHP と C++ には、とても便利な型変換の方法があります。変換用の関数を長々と覚える必要はなく、変換先の型を括弧で囲んで値の前に付けるだけです。ただし、この方法には何か問題があるようです。ただ、その部分は私もよくわかっていません XD


<!--more-->

<h2>簡単な型変換：</h2>
<ul>
	<li>整数に変換：(int)</li>
	<li>単精度数に変換：(double)</li>
	<li>長整数に変換：(long)</li>
</ul>
ほかのものも同じように書けます～ 詳しい使い方は下の例を参照してください。
<h2>C++ の型変換の例：</h2>
サンプルコードのダウンロード：<a href="http://www.box.net/shared/aen71zxc7x"> Box.net</a>｜<a href="http://www.4shared.com/file/HnW13vvw/type_exchange.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/type_exchange.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMTUwMWM1NWItMzBiNS00ODQ5LTlmZDItMzdhMWQ2ZDZmYzZl&amp;hl=zh_TW">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225132.jpg"><img class="alignnone size-large wp-image-280" title="2011-02-15_225132" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225132-540x405.jpg" alt="" width="540" height="405" /></a>

P.S. C++ と PHP の型変換の方法は同じなので、ここでは C++ の例だけを載せています。
<h2>もう一つの短い型変換：static_cast</h2>
前に挙げた (int) や (double) による型変換のほかに、より安全で問題が起きにくそうな方法があります。それが static_cast<> です。ただし、この方法は PHP では使えないようです。

書式：`static_cast<変換後の型>(変換する変数)`

たとえば、int 型の変数 x のデータを float に変換する場合のコードは次のとおりです。

static_cast< int >(x);
<h2>C++ の例：</h2>
サンプルコードのダウンロード：<a href="http://www.box.net/shared/2br2sqqd0h">Box.net</a>｜<a href="http://www.4shared.com/file/htmMYybf/static_cast.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/static_cast.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZDZmYWMyOWUtZjZmZC00YmI3LWIxZDYtZWFkN2Y3ZTcxMTRk&amp;hl=zh_TW">Google</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225556.jpg"><img class="alignnone size-large wp-image-281" title="2011-02-15_225556" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_225556-540x398.jpg" alt="" width="540" height="398" /></a>
