---
title: "W3C Validation: Checking Whether Your Site's CSS Meets the Standards"
date: 2009-09-06T13:36:56
slug: "w3c-css-validation"
tags: ["CSS", "HTML"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-000.jpg"><img class="alignnone size-full wp-image-1873" title="2009-09-06 000" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-000.jpg" alt="2009-09-06 000" width="405" height="84" /></a>
<h2>About the W3C:</h2>
The W3C is an organization dedicated to standardizing the web. It is responsible for drafting all kinds of web-related specifications. For example, the CSS4 standard and XHTML were both created by the W3C. Why create these standards? The reason is simple. Web pages are displayed in different browsers. If every browser used different syntax, web designers would have a hard time. But getting all browser vendors to agree on one standard is difficult. I think the main reason is that they're all competing with each other. That's why the W3C was created: an impartial third party drafts the standards, and each browser vendor (such as IE, Opera, and Firefox) must follow these basic rules. Of course, browsers can add their own syntax if they want. Still, not every browser follows the W3C specifications. Big names like IE don't, which is why many web designers have a love-hate relationship with IE (love, because so many people use it; hate, because it doesn't play by the rules). Now that you have a basic understanding of the W3C, let me show you how to check whether a web page meets the standards.


<!--more-->


<h2>CSS Standards:</h2>
What are the benefits of checking whether your site meets the standards? Here's a list, and you'll see~
<ol>
	<li>Fewer display errors</li>
	<li>Faster browsing</li>
	<li>A cute sticker XD</li>
</ol>
The most important one is the first item. Getting a sticker is no big deal! So how do you check whether your site's CSS meets the standards? The W3C has already figured that out for us~~~

Website: <a href="http://jigsaw.w3.org/css-validator/">http://jigsaw.w3.org/css-validator/</a>
<h2>Checking a Page Directly</h2>
I think this method is the fastest. You just give it the URL, and there's no need to upload CSS files as other methods require. I recommend this method for people just starting out in web design. This article will only cover this checking method. Feel free to try the other methods on your own. If you don't understand something, leave a comment and ask me.

1.First, go to the <a href="http://jigsaw.w3.org/css-validator/">css-validator</a> website, then enter the URL of the site you want to check in the Address field.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-002.jpg"><img class="alignnone size-full wp-image-1875" title="2009-09-06 002" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-002.jpg" alt="2009-09-06 002" width="550" height="214" /></a>

2.Click More Options, then choose the CSS version you want to check under Profile. For example, this site uses CSS level 3.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-003.jpg"><img class="alignnone size-full wp-image-1876" title="2009-09-06 003" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-003.jpg" alt="2009-09-06 003" width="550" height="263" /></a>

3.Once everything is set, click Check. It will start checking whether the CSS files on the page meet the standards.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-004.jpg"><img class="alignnone size-full wp-image-1877" title="2009-09-06 004" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-004.jpg" alt="2009-09-06 004" width="550" height="303" /></a>

Wait a moment, and a new page will appear. On this page, it will tell you the obvious errors and possible errors (Warnings). Since the page is in English, I'll include a translation~~

Sorry! We found the following errors (4): the number in parentheses is the number of errors

Warnings (107): this refers to possible errors. I'm not really sure how to explain it, but in plain terms, it just means "warning."

That's roughly the main translation.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-005.jpg"><img class="alignnone size-full wp-image-1878" title="2009-09-06 005" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-005.jpg" alt="2009-09-06 005" width="600" height="377" /></a>

↑↑↑If you can't understand the report, you can refer to Google Translate's output.

If your site passes, it will also tell you. Unfortunately, I couldn't get a screenshot of a passing result @@ Because my own site didn't pass. But I think if yours passes, at least you won't end up with the same screen as mine XD

Don't be too sad if you have a lot of errors!!

After all, even Google's site has one error, and Yahoo's site has three. As long as you don't have too many errors, you're fine. Of course, zero errors is best, because then you get a sticker^^

<a href="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-008.jpg"><img class="alignnone size-full wp-image-1880" title="2009-09-06 008" src="{{< param imageBase >}}/wp-content/uploads/2009/09/2009-09-06-008.jpg" alt="2009-09-06 008" width="550" height="161" /></a>
