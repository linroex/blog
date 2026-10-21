---
title: "How to Detect IE and Apply the Matching Code? (The If IE Technique)"
date: 2011-02-28T13:54:10
slug: "detect-ie-browser-if-ie-technique"
tags: ["CSS", "IE"]
categories: ["Programming"]
draft: false
---

If you are a web designer, the thing you hate most when designing pages is browser compatibility. Every browser supports CSS and JavaScript differently. Your CSS might look perfectly fine in Chrome, but show different results in Firefox. This happens most often with IE, because IE has the weakest support for CSS and JavaScript. Other browsers might just look a little different, while in IE the effect may not show up at all... So this article shows you how to apply specific code or CSS only to IE, or only to non-IE browsers.


<!--more-->


Some people use JavaScript to detect the browser and apply the matching code. But detecting the browser with JavaScript isn't really the best approach: if the user has disabled JavaScript, the page can end up in a mess. Instead, you can check the browser directly in HTML: whether it is IE, and which IE version. This is called an IE conditional.

<h2>IE Conditionals:</h2>
First, check whether the browser is IE:
<pre lang="html"><!--[if IE]>Content, CSS, and JavaScript to show when the browser is IE<![endif]--></pre>
Second, check the IE version:
<pre lang="html"><!--[if IE 6]>Content, CSS, and JavaScript to show when the browser is IE6<![endif]--></pre>
Third, when the browser version is lower than X:
<pre lang="html"><!--[if lte IE 7]>Content, CSS, and JavaScript to show when the browser is IE7 or lower<![endif]--></pre>
Fourth, when the browser version is higher than X:
<pre lang="html"><!--[if gte IE 7]>Content, CSS, and JavaScript to show when the browser is IE7 or higher<![endif]--></pre>
These four forms are the most common. When you write this HTML, the browser checks whether it meets the condition. If it does, it shows the content inside the tag. If it doesn't, the browser simply skips it.

Note that the syntax above only works for IE. For example, suppose you want content shown only to IE 8 and above. With the syntax above, visitors using Chrome, Firefox, or other browsers won't see that content either. If you want to show content "when the browser is not IE 8, or when using other browsers," use:

<pre lang="html"><!--[if !IE 8]>--><--<![endif]--></pre>

<h2>Conditional Keywords: lte, gte, lt, gt</h2>
You may have noticed the keywords lte, gte, lt, and gt in the conditions above. Here is a quick look at what each one does:
<ul>
	<li>lte: shown when the version is not greater than (less than or equal to)</li>
	<li>lt: shown when the version is less than</li>
	<li>gte: shown when the version is not less than (greater than or equal to)</li>
	<li>gt: shown when the version is greater than</li>
</ul>
