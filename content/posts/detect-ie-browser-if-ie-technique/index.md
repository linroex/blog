---
title: "如何判斷瀏覽器是IE並套用相應的程式碼？ (If IE技巧)"
date: 2011-02-28T13:54:10
slug: "detect-ie-browser-if-ie-technique"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%88%a4%e6%96%b7%e7%80%8f%e8%a6%bd%e5%99%a8%e6%98%afie%e4%b8%a6%e5%a5%97%e7%94%a8%e7%9b%b8%e6%87%89%e7%9a%84%e7%a8%8b%e5%bc%8f%e7%a2%bc%ef%bc%9f-if-ie%e6%8a%80%e5%b7%a7/"]
tags: ["CSS", "IE", "IE判斷式"]
categories: ["CSS"]
---

如果你是一個網頁設計師，那當你在設計網頁時最討厭的一件事一定是：瀏覽器相容性，每一種瀏覽器對於CSS、JavaScript的支援都不一樣，往往你的CSS語法用Cgrome瀏覽器看的時候很正常，可是換成Firefox卻會有不同效果出現，而這種情況又以IE最常發生，因為IE對於CSS、JavaScript的支援度最差，別的瀏覽器可能是效果不同，IE卻有可能是沒有效果… 所以這篇文章就是要教大家如何去針對IE瀏覽器或非IE瀏覽器套用特定的程式碼、CSS語法


<!--more-->


有些人會使用Javascript來判斷瀏覽器，並且套用相對應瀏覽器的程式碼，但事實上使用Javascrip判斷不是最好的作法，如果使用者停用Javascrip的話那網頁就可能變得一團亂，其實可以直接用HTML語法來判斷使用者的瀏覽器：是不是IE、還有IE的版本，那就叫做IE判斷式
<h2>IE判斷式：</h2>
一.檢查是否為IE：
<pre lang="html"><!--[if IE]>當瀏覽器是IE時要顯示的資料、CSS、JavaScript<![endif]--></pre>
二.檢查IE的版本：
<pre lang="html"><!--[if IE 6]>當瀏覽器是IE6時要顯示的資料、CSS、JavaScript<![endif]--></pre>
三.當瀏覽器版本低於X時：
<pre lang="html"><!--[if lte IE 7]>當瀏覽器是IE7及以下的版本時要顯示的資料、CSS、JavaScript<![endif]--></pre>
四.當瀏覽器的版本高於X時：
<pre lang="html"><!--[if gte IE 7]>當瀏覽器是IE7及以上的版本時要顯示的資料、CSS、JavaScript<![endif]--></pre>
以上四種是最常見的用法，當你寫入這樣的HTML時，瀏覽器會去判斷他自己是否符合條件，如果符合條件就會顯示出標籤內的資料，不符合條件的話就會直接跳過他

需要注意的是以上的寫法「必須要是IE才行」，也就是說你可能設定IE 8以上才會顯示，但是用上面的寫法，當訪客使用Chrome、Firefox等瀏覽器時.... 也不會顯示你要顯示的內容，如果你要做到「當瀏覽器不是IE 8及使用其他瀏覽器時要顯示...」的話：

<pre lang="html"><!--[if !IE 8]>--><--<![endif]--></pre>



<h2>條件式說明：lte、gte、lt、gt</h2>
在剛剛的條件是裡面你應該有注意到lte、gte、lt、gt這些關鍵字吧～ 下面會簡單介紹lte、gte、lt、gt這些字的用處
<ul>
	<li>lte：當版本不大於(小於等於)時顯示</li>
	<li>lt：當版本小於時顯示</li>
	<li>gte：當版本不小於(大於等於)時顯示</li>
	<li>gt：當版本大於時顯示</li>
</ul>
