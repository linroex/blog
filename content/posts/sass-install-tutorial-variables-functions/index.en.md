---
title: "When CSS Meets Variables and Functions, It Becomes SASS: SASS Installation Tutorial"
date: 2012-02-07T21:31:00
slug: "sass-install-tutorial-variables-functions"
tags: ["SASS", "CSS"]
categories: ["Programming"]
draft: false
---

Anyone who writes both programs and CSS has probably wished that CSS could have variables and functions, the things programming languages have. Many CSS rules are repetitive, and if CSS had variables and functions, writing it would be a lot faster. Generally, that kind of dream seems impossible... But today I'll introduce a new toy called SASS. With SASS, CSS can become something very different~


<!--more-->


SASS is a program written in Ruby. Its biggest feature is that it lets you use variables and functions when writing CSS. SASS works by compiling: after you've written your CSS, you hand it to SASS to compile, and SASS generates a compiled CSS file. This way, you can set variables in your CSS. The principle may be hard to follow, so if you don't get it, don't worry about it XD. As long as it works, that's good enough!
<h2>SASS Information</h2>
<ul>
	<li>Official website: <a href="http://sass-lang.com/">http://sass-lang.com/</a></li>
	<li>Documentation: <a href="http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html">http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html</a></li>
</ul>
One more thing to note: SASS has two syntaxes, scss and sass. The sass syntax doesn't use curly braces. Instead, it uses indentation, like Python, in place of braces. The scss syntax uses curly braces, just like regular CSS. Be sure to keep them apart. My tutorials focus on scss, so don't mix them up XD

SASS can do much more than variables and functions, but I personally don't use many of its other features. SASS also supports operators, so you can do addition, subtraction, multiplication, and division. For a full overview of its features, check out <a href="http://sass-lang.com/tutorial.html">http://sass-lang.com/tutorial.html</a>. Another benefit of SASS is debugging. As I mentioned, SASS compiles your code, and if it finds a CSS error, such as a missing semicolon, it shows you the error and tells you which line it's on!! Unfortunately, it won't fix syntax errors automatically. For example, if you misspell font-size as font-siae, SASS won't react.

What's the benefit of using variables in CSS? The most common case is setting things like background images or font sizes. Many sections may need the same font size, for example:
<pre lang="css">#top{
	font-size:15px;
	background:red;
}
#main{
	font-size:15px;
}</pre>
With SASS, CSS like the above can be written as:
<pre lang="css">$font_s:15px;
#top{
	font-size:$font_s;
	background:red;
}
#main{
	font-size:$font_s;
}</pre>
That's how variables work. As for functions, the way I use them most is for handling browser compatibility. Many CSS3 features already work in Firefox, Chrome, and IE 9, but each browser uses different syntax. With SASS mixins (which are functions), this becomes very simple:
<pre lang="css">#box{
	border-radius:5px;
	moz-border-radius:5px;
	webkit-border-radius:5px;
}</pre>
With SASS, the syntax can be written as:
<pre lang="css">@mixin border-radius($x){
	border-radius:$x;
	moz-border-radius:$x;
	webkit-border-radius:$x;
}
#box{
	@include border-radius(5px);
}</pre>
You might wonder whether this is any shorter. That's because the example here isn't complete. In practice, rounded corners come up all the time. Would you really type three lines every time a DIV needs rounded corners? With a mixin, you type one line and get the full border-radius. This can be used in many other places too. Try it out yourselves XD
<h2>SASS Installation Tutorial</h2>
SASS is written in Ruby, so you need to install Ruby and Gem before you can use SASS. If you're on Windows, you can simply use RubyInstaller. You can find the installer on the Ruby official website (<a href="http://www.ruby-lang.org/zh_TW/downloads/">http://www.ruby-lang.org/zh_TW/downloads/</a>).

If you're on Linux, follow the steps below to install Ruby, gem, and SASS in order. Here I install by compiling from source, because installing with apt-get sometimes causes problems.

1. Download the Ruby source code and extract it
<ul>
	<li>wget ftp://ftp.ruby-lang.org//pub/ruby/1.9/ruby-1.9.2-p0.tar.gz</li>
	<li>tar -zxvf ruby-1.9.2-p0.tar.gz</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211242.jpg"><img class="aligncenter size-large wp-image-861" title="2012-02-07_211242" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211242-540x466.jpg" alt="" width="540" height="466" /></a>

2. After extracting, go into the extracted folder and configure it
<blockquote>cd ruby-1.9.2-p0

./configure</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211558.jpg"><img class="aligncenter size-large wp-image-862" title="2012-02-07_211558" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211558-540x466.jpg" alt="" width="540" height="466" /></a>

3. Compile and install
<blockquote>make &amp;&amp; make install</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211904.jpg"><img class="aligncenter size-large wp-image-863" title="2012-02-07_211904" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_211904-540x466.jpg" alt="" width="540" height="466" /></a>

4. Once the entire program has compiled, it's time to install sass. Here we install SASS through gem, the package management system for Ruby.

First, run the following command to upgrade the system:
<blockquote>gem update --system</blockquote>
Then install SASS:
<blockquote>gem install sass</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_212707.jpg"><img class="aligncenter size-large wp-image-864" title="2012-02-07_212707" src="{{< param imageBase >}}/wp-content/uploads/2012/02/2012-02-07_212707-540x493.jpg" alt="" width="540" height="493" /></a>

That completes the SASS installation. You can run the following commands to check the versions you've installed:
<blockquote>ruby -v

gem -v

sass -v</blockquote>
We'll cover detailed SASS usage in the next article~

<a href="https://coder.tw/?p=874">https://coder.tw/?p=874</a>
