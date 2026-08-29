---
title: "W3C驗證 - 了解你網站的CSS是否符合標準"
date: 2009-09-06T13:36:56
slug: "w3c-css-validation"
aliases: ["/posts/w3c%e9%a9%97%e8%ad%89-%e4%ba%86%e8%a7%a3%e4%bd%a0%e7%b6%b2%e7%ab%99%e7%9a%84css%e6%98%af%e5%90%a6%e7%ac%a6%e5%90%88%e6%a8%99%e6%ba%96/"]
tags: ["CSS", "SEO", "W3C"]
categories: ["CSS"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-000.jpg"><img class="alignnone size-full wp-image-1873" title="2009-09-06 000" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-000.jpg" alt="2009-09-06 000" width="405" height="84" /></a>
<h2>關於W3C:</h2>
W3C是一個致力於網頁標準化的組織,W3C這個組織負責制定各種網業相關的東西,例如標準的CSS4以及XHTML都是由W3C制定的,為甚麼要制定這些呢?其實原因很簡單,不知道大家有沒有想過網頁是要在不同瀏覽器上顯示的,如果每間瀏覽器所要使用的語法都不同那網頁設計師啟不是很累?但是要讓所有的瀏覽器廠商都再一起至定一個標準又也些問題,我想最主要是因為大家都在競爭吧,就因為這樣而出現了W3C這個組織,由公正的第三方來制定,而各家瀏覽器廠商(如IE.Opera.Firefox)則必須要遵守這些基本的語法,當然如果各家瀏覽器要自己增加一些語法也不是不行,話說回來也不是所有瀏覽器都遵守W3C的規範,像IE這種大牌的就不遵守,所以很多網頁設計師都對IE又愛又恨(愛是因為很多人都用IE,恨是因為IE很不守規則) 講到這裡我想大家都對W3C這個組織有一定了解了吧,以下我要敎各位如何檢查網頁是否符合標準


<!--more-->

<h2>CSS標準:</h2>
檢驗網站是否符合標準有甚麼好處呢?以下列出一個表給各位大家就會知道嚕~
<ol>
	<li>減少顯示上的錯誤</li>
	<li>瀏覽速度加快</li>
	<li>拿到一張可愛的貼紙XD</li>
</ol>
其中最重要的要屬第一項了,拿到一張貼紙到沒甚麼！話說要怎麼檢驗網站的ｃｓｓ是否符合標準呢？這部份Ｗ３Ｃ就有幫我們想好了～～～

網站網址：　<a href="http://jigsaw.w3.org/css-validator/">http://jigsaw.w3.org/css-validator/</a>
<h2>直接檢查網頁</h2>
這個方法是我認為最快的,你只要把網址丟給他就行了,不向其他方法要上傳CSS檔,建議初學網頁設計的人用這個方法,另外在本文中我也只會講這種檢查方法,其他種方法大家自己可以去試看看,不懂的話留言問我

1.請先連線到<a href="http://jigsaw.w3.org/css-validator/">css-validator</a>的網站,然後在Address那欄輸入要檢查網站的網址

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-002.jpg"><img class="alignnone size-full wp-image-1875" title="2009-09-06 002" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-002.jpg" alt="2009-09-06 002" width="550" height="214" /></a>

2.點一下More Options,然後再Profile那裡選擇你所要檢驗的CSS版本,像本站是CSS level 3

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-003.jpg"><img class="alignnone size-full wp-image-1876" title="2009-09-06 003" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-003.jpg" alt="2009-09-06 003" width="550" height="263" /></a>

3.全部都設定完以後按一下Check他就會開始檢查開網頁中的CSS檔是否符合標準

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-004.jpg"><img class="alignnone size-full wp-image-1877" title="2009-09-06 004" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-004.jpg" alt="2009-09-06 004" width="550" height="303" /></a>

稍微等他一下會出現一個新頁面,在這個頁面中他會告訴你明顯的錯誤以及可能的錯誤(Warnings),由於網頁是英文的我就附上一份翻譯吧~~

Sorry! We found the following errors (4) - 括號內就是錯誤的數量

Warnings (107) - 這項是指可能的錯誤,我也不知道怎麼解釋,不過直接翻中文就叫做警告

主要的翻譯大概就是這樣了

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-005.jpg"><img class="alignnone size-full wp-image-1878" title="2009-09-06 005" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-005.jpg" alt="2009-09-06 005" width="600" height="377" /></a>

↑↑↑看不懂報告的話可以參考Google翻譯器的結果

另外你的網站如果合格的話他也會告訴你,不過我可能沒辦法捷到合格的圖@@ 因為我自己的網站就沒合格了,但我想合格的話你至少不會出現跟我一樣的畫面XD

如果你的錯誤很多也沒太傷心啦！！

畢竟連Google這種網站都有一個錯誤,而奇摩的網站則有3項錯誤,只要你的錯誤別太多就好了,當然完全沒錯誤是最好的,因為可以拿到一張貼紙^^

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-008.jpg"><img class="alignnone size-full wp-image-1880" title="2009-09-06 008" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-008.jpg" alt="2009-09-06 008" width="550" height="161" /></a>
