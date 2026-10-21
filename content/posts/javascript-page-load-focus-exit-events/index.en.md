---
title: "JavaScript Page Load, Focus, UnFocus, and Exit Events"
date: 2017-01-03T20:43:11
slug: "javascript-page-load-focus-exit-events"
tags: ["JavaScript"]
categories: ["Programming"]
draft: false
---

Most people know how to use JavaScript to record when a user enters a web page, but have you ever thought about how to tell when a user has "closed" it? Browsers today show multiple web pages as tabs, so it's possible the user is actually looking at someone else's page while yours just sits there. For example, YouTube often runs into this: a user leaves the page open to listen to music, but in fact they're looking at Facebook...

Today I'll briefly note the JS page load and close events, as well as the focus (entering the page) and unfocus (leaving the page) events. With these events, you can record user behavior for analysis, and even do things like stop playing music when the user leaves the page.


<!--more-->

<h2>Page Load</h2>
There are two ways a page can be "ready": ready and onload. The main difference is that onload means the page has fully loaded, including images and other assets, while ready fires as soon as the page's DOM has loaded. Generally, ready happens before onload.

Note: the ready event is only provided by jQuery.
<pre>window.onload = function() {
    console.log('load');
}

$(document).ready(function() {
    console.log('ready');
})</pre>
<h2>Closing the Page</h2>
If you accidentally press close while writing a post on Facebook, a dialog pops up asking whether you really want to reload. This is achieved with the event below. With this event, you can automatically save the content when the user closes the page, or ask the user to confirm that they really want to leave. However, you can't customize the content of the dialog. This is to prevent the event from being used for advertising.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午8.24.45.jpg"><img class="alignnone size-full wp-image-7186" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-03-下午8.24.45.jpg" alt="" width="532" height="278" /></a>
<pre>window.onbeforeunload = function() {
    console.log('123');
    return 'bye';
}</pre>
No matter what you return, it isn't displayed, but as long as you return anything at all, the dialog will appear. If you want to cancel this behavior, you can use this code:
<pre>window.onbeforeunload = null</pre>
Note that determining page closing involves both technical and strategic issues. On the technical side, in my tests onbeforeunload does not work on iOS. I haven't tried Android, so I'm not sure about it. As for alternatives? I tried many, but I haven't found one that can accurately determine whether the user has closed the page. Also, there are many kinds of closing behavior: quitting the app, closing the page, crashing, clicking a link, and so on. Whether each browser counts these as closing the page needs to be tested.

On the strategic side, mobile visitor behavior differs from desktop users. Think about it: when you're reading a web page on your phone, do you actually close it? Usually on mobile we don't have the habit of closing pages. Instead, we open something else, or close the app. But on mobile, "closing" isn't really closing either. The page keeps running in the background, so keep that in mind.
<h2>Entering the Page</h2>
This is different from load. It refers to the user switching from another tab to your page.
<pre>window.onfocus = function() {
    console.log('focus');
}</pre>
<h2>Leaving the Page</h2>
Similarly, this doesn't mean closing the page. It means the user clicks another tab, so the focus leaves your page.
<pre>window.onblur = function() {
    console.log('blur');
};</pre>
