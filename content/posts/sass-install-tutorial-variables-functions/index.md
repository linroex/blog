---
title: "當CSS遇上變數、函式，就變成SASS啦～ SASS安裝教學"
date: 2012-02-07T21:31:00
slug: "sass-install-tutorial-variables-functions"
aliases: ["/posts/%e7%95%b6css%e9%81%87%e4%b8%8a%e8%ae%8a%e6%95%b8%e3%80%81%e5%87%bd%e5%bc%8f%ef%bc%8c%e5%b0%b1%e8%ae%8a%e6%88%90sass%e5%95%a6%ef%bd%9e-sass%e5%ae%89%e8%a3%9d%e6%95%99%e5%ad%b8/"]
tags: ["編譯", "CSS", "Ruby", "SASS"]
categories: ["CSS", "SASS"]
---

同時會寫程式跟CSS的人應該都會有一種想法，就是想要讓CSS裡面可以使用變數、函式這些寫程式才有的東西，因為很多CSS語法其實是重複的，如果可以有變數，有函式，那撰寫CSS的速度就會變快很多，一般來講這夢想是不可能實現的... 不過今天要跟大家介紹一個新的玩具，他叫做SASS，透過SASS，你可以讓CSS變得很不一樣～


<!--more-->


SASS是一個用Ruby撰寫的程式，他最大的特色就是可以讓你在撰寫CSS時使用到變數、函式這兩種東西，SASS的運作原理其實就是透過編譯的方式，你寫完CSS之後，交給SASS去做編譯，之後SASS會產生一個編譯過的CSS檔，透過這種方式，你就可以在你的CSS裡面設定變數，這原理可能很難懂，看不懂就別理他了XD 反正能用就好啦
<h2>SASS資訊</h2>
<ul>
	<li>官方網站：<a href="http://sass-lang.com/">http://sass-lang.com/</a></li>
	<li>文件：<a href="http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html">http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html</a></li>
</ul>
另外有一件需要注意的事情，SASS的語法分成兩種，一種叫做scss，另一種就是sass，sass這個語法的特色就是他不需要大括弧，而是用跟Python一樣的縮排方式取代大括弧的功用，至於scss則是跟一般的CSS語法一樣要有大括弧，這兩種要分清楚，之後我的教學裡面都是介紹scss為主，不要搞錯XD

其實SASS不只是可以使用變數、函式，他還有很多特色，只是我個人很少用到，另外在SASS裡面還可以使用運算元，也就是說可以做加減乘除的運算，詳細的特色介紹可以到：<a href="http://sass-lang.com/tutorial.html">http://sass-lang.com/tutorial.html</a> 這個頁面去看看，還有使用SASS的好處就是Debug，前面有說SASS他是用編譯的，而他在編譯的時候，如果發現你的CSS語法有錯，比如可能少寫分號，他就會顯示錯誤給你，而且會提示在第幾行！！ 不過比較可惜的是，他不會自動糾正語法的錯誤，比如font-size打成font-siae，這種打錯字的情況他是沒有反應的

在CSS裡面使用變數有什麼好處呢？最常見的情況就是在設定背景圖、文字大小這類的時候，可能很多區塊的文字大小都要設定一樣，例如：
<pre lang="css">#top{
	font-size:15px;
	background:red;
}
#main{
	font-size:15px;
}</pre>
像上面這樣的CSS，如果是在SASS裡面，其實可以寫成：
<pre lang="css">$font_s:15px;
#top{
	font-size:$font_s;
	background:red;
}
#main{
	font-size:$font_s;
}</pre>
這就是變數的運用，另外還有函式的部份，我個人比較常見的用法就是在瀏覽器相容性的處理上，像是現在的CSS 3很多功能其實在Firefox、Chrome、IE 9上面都是可以使用的，只是不同瀏覽器的語法不一樣，透過SASS的mixin（也就是函式），可以讓這件事情變得很簡單
<pre lang="css">#box{
	border-radius:5px;
	moz-border-radius:5px;
	webkit-border-radius:5px;
}</pre>
如果使用SASS，語法可以寫成：
<pre lang="css">@mixin border-radius($x){
	border-radius:$x;
	moz-border-radius:$x;
	webkit-border-radius:$x;
}
#box{
	@include border-radius(5px);
}</pre>
可能有人會問，這樣寫起來沒有比較短阿？ 這是因為這裡的範例不夠完整，在實作來講，圓角很常用到，那難道你要每遇到一個DIV需要圓角，就重新打三行語法嘛？ 透過mixin，你只需要打一行就可以擁有完整的border-radius囉～ 這部份還可以用在很多地方，大家自行揣摩吧XD
<h2>SASS安裝教學</h2>
SASS是用Ruby撰寫的程式，所以用SASS之前要先安裝好Ruby跟Gem才行，如果是Windows用戶的話直接用 RubyInstaller就可以了，可以在Ruby官網找到這個安裝檔（<a href="http://www.ruby-lang.org/zh_TW/downloads/">http://www.ruby-lang.org/zh_TW/downloads/</a>）

如果你是Linux用戶的話，請依照下面的教學依序安裝好Ruby、gem以及SASS，這邊我用編譯的方式安裝，這是因為有時後用apt-get安裝會出問題

1.下載Ruby原始碼，然後解壓縮
<ul>
	<li>wget ftp://ftp.ruby-lang.org//pub/ruby/1.9/ruby-1.9.2-p0.tar.gz</li>
	<li>tar -zxvf ruby-1.9.2-p0.tar.gz</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211242.jpg"><img class="aligncenter size-large wp-image-861" title="2012-02-07_211242" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211242-540x466.jpg" alt="" width="540" height="466" /></a>

2.解壓縮之後，進到剛剛解壓縮出來的資料夾，然後做設定
<blockquote>cd ruby-1.9.2-p0

./configure</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211558.jpg"><img class="aligncenter size-large wp-image-862" title="2012-02-07_211558" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211558-540x466.jpg" alt="" width="540" height="466" /></a>

3.編譯並安裝
<blockquote>make &amp;&amp; make install</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211904.jpg"><img class="aligncenter size-large wp-image-863" title="2012-02-07_211904" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211904-540x466.jpg" alt="" width="540" height="466" /></a>

4.等他整個程式編譯完之後，就要來安裝sass囉～ 這邊我們透過gem來安裝SASS，gem是Ruby的一個套件管理系統

首先，先輸入下面的指令幫系統做升級
<blockquote>gem update --system</blockquote>
然後安裝SASS
<blockquote>gem install sass</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_212707.jpg"><img class="aligncenter size-large wp-image-864" title="2012-02-07_212707" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_212707-540x493.jpg" alt="" width="540" height="493" /></a>

到這邊為止，就算是安裝完SASS囉，你可以輸入下面的指令來檢視你安裝的版本
<blockquote>ruby -v

gem -v

sass -v</blockquote>
至於SASS的細部教學，我們等下一篇文章在做介紹～

<a href="https://coder.tw/?p=874">https://coder.tw/?p=874</a>
