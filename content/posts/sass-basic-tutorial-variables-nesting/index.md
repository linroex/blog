---
title: "SASS基本使用教學：變數、函式、繼承、巢狀撰寫"
date: 2012-02-07T23:14:55
slug: "sass-basic-tutorial-variables-nesting"
aliases: ["/posts/sass%e5%9f%ba%e6%9c%ac%e4%bd%bf%e7%94%a8%e6%95%99%e5%ad%b8%ef%bc%9a%e8%ae%8a%e6%95%b8%e3%80%81%e5%87%bd%e5%bc%8f%e3%80%81%e7%b9%bc%e6%89%bf%e3%80%81%e5%b7%a2%e7%8b%80%e6%92%b0%e5%af%ab/"]
tags: ["SASS", "CSS"]
categories: ["Programming"]
---

在前一篇文章<a href="https://coder.tw/?p=859" target="_blank">《當CSS遇上變數、函式，就變成SASS啦～ SASS安裝教學》</a>有教到要如何安裝SASS，而在這篇文章中，則是要教大家如何使用SASS ，這篇文章會提到SASS裡面的四個特色：變數（Variables）、函式（Mixin）、繼承（extend）、巢狀撰寫（Nesting）


<!--more-->


不過在介紹四大特色之前，要先教大家如何編譯SASS，SASS提供兩種編譯方式，一種是手動編譯，一種是監視編譯(--watch)，手動編譯就是當你撰寫好CSS時下指令去做編譯，監視編譯則是你指令一個目錄，當此目錄裡面的*.scss檔案有改變時（新增、覆寫等等），就會自動去做編譯的動作，我個人推薦用監視的方式做編譯，這樣子做事情比較方便XD，所以這邊就只講監視編譯的方式...ㄎ
<h2>SASS編譯</h2>
建立一個scss資料夾還有一個css資料夾
<blockquote>mkdir scss css</blockquote>
然後在scss資料夾裡面建立一個檔案：「style.scss」，注意雖然這程式叫做SASS，但是他的附檔名是scss
<blockquote>cd scss

touch style.scss</blockquote>
style.scss的內容，請輸入下面的範例程式碼：
<pre lang="css">$text:15px;
body{
	font-size:$text;
}</pre>
然後回到上一層資料夾，就可以開始做編譯囉～
<blockquote>cd ..

sass --watch scss:css</blockquote>
sass --watch scss:css這句語法的意思就是監視scss這個資料夾，然後編譯的結果存到css這個資料夾的意思～ 他會一直監視scss這個資料夾，直到你把程式終止掉

<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_221457.jpg"><img class="aligncenter size-large wp-image-876" title="2012-02-07_221457" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_221457-540x493.jpg" alt="" width="540" height="493" /></a>
<h2>變數Variables</h2>
變數要使用前，要先宣告這個變數的存在，並且指定他的值，之後就可以在CSS裡面直接使用變數

另外要注意在SASS裡面，變數的命名第一個字一定要是$開頭
<pre lang="css">$text:15px;

body{
	font-size:$text;
}
#top{
	width:$text;
}</pre>
上面這段語法的意思就是宣告一個$text變數，裡面儲存15px這個值，之後font-size就直接使用$text這個變數

編譯的結果：
<pre lang="css">body{
	font-size:15px;
}
#top{
	width:15px;
}</pre>
$text的值會被帶入剛剛設定的地方

這就是變數的運用，另外還可以搭配運算子去做加減乘除的變化，例如：
<pre lang="css">$width:500px;

#content{
	width:$width;
	height:$width*2;
	font-size:$width/10;
}</pre>
編譯後的結果：
<pre lang="css">#content{
	width:500px;
	height:1000px;
	font-size:50px;
}</pre>
<h2>函式Mixin</h2>
SASS裡面可以使用函式，而且可以傳入值，這是一個很棒的設計，可以讓你省掉很多重複的CSS的撰寫

首先要先宣告函式的存在，然後再去引用函式，請參考下面的範例：
<pre lang="css">@mixin border-radius($angle){
	border-radius:$angle;
	-webkit-border-radius:$angle;
	-moz-border-radius:$angle;
}</pre>
上面的語法就是宣告一個函式叫做border-radius，@mixin是宣告函式的前置詞，border-radius則是函式名稱，後面的$angle則是傳入的參數，如果你要傳入多個參數可以用逗號分開，然後下面那三行就是內容，<strong>注意函式的宣告建議放在CSS的最上面</strong>

要使用border-radius這個函式，必須要使用@include，語法是：

@include mixin_name(args);
<ul>
	<li>mixin_name的部份改成函式名稱</li>
	<li>args則是相關的參數</li>
</ul>
<pre lang="css">#box{
	@include border-radius(10px);
}</pre>
編譯後的結果，會變成：
<pre lang="css">#box{
	border-radius:10px;
	-moz-border-radius:10px;
	-webkit-border-radius:10px;
}</pre>
另外Mixin不只是可以填CSS的屬性（也就是font-size、border、text-align..... 這些）進去，也可以填一段完整的CSS語法進去，例如：
<pre lang="css">@mixin border-radius($angle){
	#box{
		border-radius:10px;
		-moz-border-radius:10px;
		-webkit-border-radius:10px;
	}
}

@include border-radius(10px);</pre>
編譯後的結果會變成
<pre lang="css">#box {
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px; }</pre>
注意，整個box{}都被帶進去了，這就是我說的可以帶入整個CSS語法而不單只是屬性
<h2>繼承Extend</h2>
SASS裡面的繼承其實就跟物件導向裡面說的繼承很像，他可以繼承你指定的css語法的屬性，例如：
<pre lang="css">.ext{
	font-size:10px;
	width:400px;
}
body{
	@extend .ext;
	height:600px;
}</pre>
編譯後：
<pre lang="css">.ext, body {
  font-size: 10px;
  width: 400px; }

body {
  height: 600px; }</pre>
body會「繼承」.ext的屬性設定，這跟Mixin有點像但是不太一樣，Mixin可以傳值進去，而且可以用整段CSS當做函式的內容，但是繼承不行，繼承只能去取得指定元素的屬性，然後套用到自己身上，例如上面的範例就是取得.ext的屬性，然後套用到body上面

語法大致上是：「@extend name」

name的部份就是你要繼承的元素的名稱
<h2>巢狀撰寫Nesting</h2>
巢狀撰寫可以讓你的CSS易讀性更高，不過要熟悉這種寫法就是了

範例：（取用自SASS官網）
<pre lang="css">table.hl {
  margin: 2em 0;
  td.ln {
    text-align: right;
  }
}

li {
  font: {
    family: serif;
    weight: bold;
    size: 1.2em;
  }
}</pre>
編譯後：
<pre lang="css">table.hl {
  margin: 2em 0;
}
table.hl td.ln {
  text-align: right;
}

li {
  font-family: serif;
  font-weight: bold;
  font-size: 1.2em;
}</pre>
仔細去觀察，你會發現他直接繼承了上一層的元素，例如編譯前的table.hl{}這段，裡面有一個td.ln{}，編譯後變成table.hl td.ln{}，這就是所謂繼承了上一個元素，要注意編譯後是變成table.hl td.ln，而不是變成table.hl,td.ln，中間是空白而不是逗號，這兩種有很大的差別

table.hl td.ln的意思是說table.hl裡面的td.ln的意思，但是table.hl,td.ln則是說table.hl跟td.ln這兩個元素都要套用屬性，兩個是不同的要注意！！

還有
<pre lang="css">li {
  font: {
    family: serif;
    weight: bold;
    size: 1.2em;
  }
}</pre>
這部份則會變成
<pre lang="css">li {
  font-family: serif;
  font-weight: bold;
  font-size: 1.2em;
}</pre>
也就是說font底下的family、weight、size的意思，換句話說：
<pre lang="css">body{
	text:{
		align:center;
		indent:10px;
		transform:none;
	}
}</pre>
會變成：
<pre lang="css">body {
  text-align: center;
  text-indent: 10px;
  text-transform: none; }</pre>
大概就是這個意思了，如果你沒學過寫程式，這部份可能要自己去領悟一下！
