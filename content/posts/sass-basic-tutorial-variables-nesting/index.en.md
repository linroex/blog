---
title: "SASS Basics: Variables, Mixins, Extend, and Nesting"
date: 2012-02-07T23:14:55
slug: "sass-basic-tutorial-variables-nesting"
tags: ["SASS", "CSS"]
categories: ["Programming"]
draft: false
---

In the previous article, <a href="https://coder.tw/?p=859" target="_blank">"When CSS Meets Variables and Functions, It Becomes SASS: SASS Installation Tutorial"</a>, I showed how to install SASS. In this article I'll show you how to use SASS. It covers four of SASS's main features: variables, mixins, extend, and nesting.


<!--more-->


Before I introduce the four features, I'll first explain how to compile SASS. SASS offers two ways to compile: manual compiling and watch compiling (--watch). Manual compiling means running a command to compile after you've finished writing your CSS. Watch compiling means pointing SASS at a folder, and whenever a *.scss file in that folder changes (added, overwritten, and so on), it compiles automatically. Personally I recommend watch compiling, since it's more convenient XD, so I'll only cover watch compiling here... ㄎ
<h2>SASS Compilation</h2>
Create a scss folder and a css folder.
<blockquote>mkdir scss css</blockquote>
Then create a file named "style.scss" inside the scss folder. Note that even though the program is called SASS, the file extension is scss.
<blockquote>cd scss

touch style.scss</blockquote>
Enter the example code below into style.scss:
<pre lang="css">$text:15px;
body{
	font-size:$text;
}</pre>
Then go back up one level, and you're ready to compile.
<blockquote>cd ..

sass --watch scss:css</blockquote>
The command sass --watch scss:css means: watch the scss folder and save the compiled output to the css folder. It keeps watching the scss folder until you stop the program.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_221457.jpg"><img class="aligncenter size-large wp-image-876" title="2012-02-07_221457" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_221457-540x493.jpg" alt="" width="540" height="493" /></a>
<h2>Variables</h2>
A variable has to be declared before you use it. Declare its existence and give it a value, and then you can use it directly in your CSS.

Also note that in SASS, variable names must start with $.
<pre lang="css">$text:15px;

body{
	font-size:$text;
}
#top{
	width:$text;
}</pre>
The code above declares a variable $text that holds 15px. Then font-size uses the $text variable directly.

Compiled result:
<pre lang="css">body{
	font-size:15px;
}
#top{
	width:15px;
}</pre>
The value of $text is substituted wherever it's used.

That's how variables work. You can also combine them with operators to do addition, subtraction, multiplication, and division, for example:
<pre lang="css">$width:500px;

#content{
	width:$width;
	height:$width*2;
	font-size:$width/10;
}</pre>
Compiled result:
<pre lang="css">#content{
	width:500px;
	height:1000px;
	font-size:50px;
}</pre>
<h2>Mixins (Functions)</h2>
SASS supports functions, and you can pass values into them. This is a great feature that saves you from writing a lot of repetitive CSS.

First declare the function, then call it. See the example below:
<pre lang="css">@mixin border-radius($angle){
	border-radius:$angle;
	-webkit-border-radius:$angle;
	-moz-border-radius:$angle;
}</pre>
The code above declares a function named border-radius. @mixin is the keyword for declaring a function, border-radius is the function name, and $angle is the parameter passed in. To pass multiple parameters, separate them with commas. The three lines below are the function's content. <strong>Note that it's best to put function declarations at the top of your CSS.</strong>

To use the border-radius function, you need @include. The syntax is:

@include mixin_name(args);
<ul>
	<li>Replace mixin_name with the function name</li>
	<li>args are the related parameters</li>
</ul>
<pre lang="css">#box{
	@include border-radius(10px);
}</pre>
The compiled result becomes:
<pre lang="css">#box{
	border-radius:10px;
	-moz-border-radius:10px;
	-webkit-border-radius:10px;
}</pre>
A mixin isn't limited to CSS properties (such as font-size, border, text-align, and so on). You can also put a complete block of CSS inside it, for example:
<pre lang="css">@mixin border-radius($angle){
	#box{
		border-radius:10px;
		-moz-border-radius:10px;
		-webkit-border-radius:10px;
	}
}

@include border-radius(10px);</pre>
The compiled result is:
<pre lang="css">#box {
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px; }</pre>
Note that the entire box{} block was carried over. This is what I meant when I said you can pass in a whole CSS block, not just properties.
<h2>Extend</h2>
Inheritance in SASS is quite similar to inheritance in object-oriented programming. It lets you inherit the properties of a CSS rule you specify, for example:
<pre lang="css">.ext{
	font-size:10px;
	width:400px;
}
body{
	@extend .ext;
	height:600px;
}</pre>
Compiled:
<pre lang="css">.ext, body {
  font-size: 10px;
  width: 400px; }

body {
  height: 600px; }</pre>
body "inherits" the settings of .ext. This is a bit like a mixin, but not quite the same. A mixin can take values and can use an entire block of CSS as the function's content, but extend can't do that. Extend can only fetch the properties of a specified element and apply them to itself. In the example above, it takes the properties of .ext and applies them to body.

The syntax is roughly: "@extend name"

name is the name of the element you want to inherit from.
<h2>Nesting</h2>
Nesting makes your CSS easier to read, although you'll need some time to get used to it.

Example (taken from the SASS website):
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
Compiled:
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
If you look closely, you'll see that it directly inherits the parent element. For example, the td.ln{} inside table.hl{} in the source becomes table.hl td.ln{} after compiling. Note that after compiling it's table.hl td.ln, with a space, not table.hl,td.ln with a comma. The two are very different.

table.hl td.ln means td.ln inside table.hl, while table.hl,td.ln means that both table.hl and td.ln get the properties. These are different, so be careful!!

Also,
<pre lang="css">li {
  font: {
    family: serif;
    weight: bold;
    size: 1.2em;
  }
}</pre>
This part becomes
<pre lang="css">li {
  font-family: serif;
  font-weight: bold;
  font-size: 1.2em;
}</pre>
In other words, family, weight, and size under font mean font-family, font-weight, and font-size. Put differently:
<pre lang="css">body{
	text:{
		align:center;
		indent:10px;
		transform:none;
	}
}</pre>
becomes:
<pre lang="css">body {
  text-align: center;
  text-indent: 10px;
  text-transform: none; }</pre>
That's roughly what it means. If you haven't learned programming, you'll have to work this part out for yourself!
