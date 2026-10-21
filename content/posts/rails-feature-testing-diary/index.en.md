---
title: "Rails Capybara Feature Testing: A Diary of Pitfalls"
date: 2017-01-16T20:32:53
slug: "rails-feature-testing-diary"
tags: ["Rails", "Testing"]
categories: ["Programming"]
draft: false
---

If I had to describe today in one line, it would be "I learned Capybara for the first time and immediately stepped on a landmine." I spent a full six hours (or more) writing two simple tests, and ran into all sorts of funny landmines along the way. If I didn't write a post about this disastrous day, I'd be too angry to sleep tonight. To be clear up front: this is my first time writing tests, so some of my understanding may be wrong or out of date. Please leave a comment and I'll fix it right away. This isn't a technical article. It's a rant (angry!).


<!--more-->


The first problem was a mismatch between the Firefox version and Selenium webdriver. According to a coworker, Selenium webdriver doesn't support the very latest Firefox, so if you want to use Selenium to run Capybara like I did, please use the Firefox ESR version.

Firefox ESR: <a href="https://www.mozilla.org/en-US/firefox/organizations/faq/">https://www.mozilla.org/en-US/firefox/organizations/faq/</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-16-下午8.18.30.jpg"><img class="alignnone size-full wp-image-7263" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-16-下午8.18.30.jpg" alt="" width="732" height="429" /></a>

After installing it, don't forget to set the location of Firefox ESR so that Capybara picks up Firefox instead of testing with webkit. You might think the path is simply:
<pre>/Applications/Firefox\ ESR.app</pre>
That's what I thought at first too, until I found all my tests failing in red. The error messages suggested a JavaScript error. I spent over three hours going back through the Git commits one by one until I finally found the commit that introduced the error. Even then, I checked the code line by line three times and still couldn't see the problem... The buggy code looked roughly like this:
<pre>function hi(name="") {
  console.log(name)
}</pre>
I stared at this code for a long time. It passed when I tested it in Chrome and Firefox, and wasn't it supposed to run in Firefox ESR anyway? I opened Firefox ESR myself and there wasn't a single error. What on earth was Capybara doing!!!!!

In the end, my all-knowing coworker said one more thing: the webkit that Capybara uses is a very old version, and it doesn't support the default value syntax.

Great, yeah, great... So, a reminder: if Capybara keeps throwing errors for no apparent reason, check whether your JS function uses default values. QQ
<pre>function hi(name) {
  console.log(name)
}</pre>
But even so, that doesn't add up. Shouldn't Capybara be using Firefox ESR? Why was it using webkit in the end? Folks, when you configure the browser for Capybara, you need to provide the full path. On a Mac, for example, it should be:
<pre>/Applications/Firefox\ ESR.app/Contents/MacOS/firefox</pre>
I was happy, thinking I'd finally got it working (?). But when I switched to Firefox, it was all red again. At least the error message had changed. This time the problem was that Chrome is too eager and supports new specs first. Note that for JS exponentiation, most people would probably write this:
<pre>console.log(10**3);</pre>
That works perfectly in the latest Chrome, but in Firefox it throws an error. The safer way to write it is:
<pre>console.log(Math.pow(10, 3));</pre>
The ** syntax is the most recently supported, and so far it seems only Chrome supports it (tears). This also shows how important testing really is. Without tests, I would never have found so many problems. Honestly, manually testing every browser from the past isn't really feasible.

OK, that's it for writing. Now I'm off to dinner.
