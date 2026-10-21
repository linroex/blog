---
title: "JavaScript: Manipulating Browser History, Changing URLs, and the Back Button Event (Essential for SPAs)"
date: 2017-01-14T12:59:02
slug: "javascript-manipulate-browser-history"
tags: ["JavaScript", "HTML"]
categories: ["Programming"]
draft: false
---

Nowadays JavaScript is everywhere. Using JS to manipulate web pages, for things like Ajax, page switching, and pop-up windows, is more and more common. There are even JS frameworks such as React JS and Vue JS that help you develop Single Page Applications (SPAs). When you manipulate a web page with JS, the thing you fear most is URL changes and history. For example, if you switch pages with jQuery, the URL doesn't change, because it's a JS operation. And when the user clicks the browser's Back button in the top left corner, they go straight to another page, because JS operations aren't recorded in the history (in fact, they can't be). To solve this series of problems, you can use history.pushState, history.replaceState, and the onpopstate event provided by HTML5.


<!--more-->


If you use a framework like React JS or Vue JS, there are usually companion packages, such as vue-router, that take care of the annoying URL problems of SPAs for you. Behind the scenes, they also work by modifying history with JS. But sometimes you don't have a handy helper library, so you have to build it from scratch. Of course, I'm sure many JS plugins can solve the problems mentioned in this article, but what matters more is understanding the principles behind them, so you can apply them.

So what problems can pushState, replaceState, and onpopstate solve? Here are some I've thought of, but don't forget that their core concept is modifying browser history and the URL. From that core concept you can come up with more uses, rather than being limited to the possibilities I've listed.
<ul>
 	<li>After you manipulate the page with JS, have the URL change along with it, so users can easily copy, share, or save it. But don't forget that when the page loads, you also need to parse the URL contents so the program goes to the right place. Both directions matter: showing the URL, and getting back to the same content through that URL.</li>
 	<li>You might just think the URL is ugly and want to fake a nicer-looking one. But remember: when a user copies this URL and sends it to a friend, can the friend successfully see the content?</li>
 	<li>The page has its own previous and next buttons and dynamically loads content with JS. But if the user clicks the browser's Back button, things break, because everything happens on the same page and JS only changes the content.</li>
</ul>
This API is currently supported stably in Chrome, Firefox, Safari, and others, so you don't need to worry too much about using it, but you may need to test it on mobile browsers. (Ref <a href="https://developer.mozilla.org/zh-TW/docs/Web/Guide/API/DOM/Manipulating_the_browser_history/Manipulating_the_browser_history">MDN</a>)
<table class="compat-table">
<tbody>
<tr>
<th>Feature</th>
<th>Chrome</th>
<th>Firefox</th>
<th>IE</th>
<th>Opera</th>
<th>Safari</th>
</tr>
<tr>
<td>replaceState, pushState</td>
<td>5</td>
<td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2.0)</td>
<td>10</td>
<td>11.50</td>
<td>5.0</td>
</tr>
<tr>
<td>history.state</td>
<td>18</td>
<td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2.0)</td>
<td>10</td>
<td>11.50</td>
<td>6.0</td>
</tr>
</tbody>
</table>
The core principle is very important here. The core concept of this family of APIs is to treat history.state as a stack. You can push a new record onto it with pushState. When the user clicks Back (or Forward), the onpopstate event fires, and the last item on the stack is popped out and handed to you. After you receive the event, you use JS to decide which page to switch to or what to do. Because history.state works as a stack, if you call pushState again inside onpopstate, you may run into strange behavior. The cause is similar to this article: 【<a href="https://coder.tw/?p=7231">Never Remove Array Elements Inside a Loop in Python</a>】. Also, onpopstate has no direction: you can't directly tell whether the user pressed Forward or Back. But that doesn't matter much; just remember that it's a stack.
<h2>pushState</h2>
When the user clicks next, JS dynamically loads content and jumps to a page. This is a good place to use pushState. As the name suggests, it pushes a new state into window.history.
<pre>history.pushState(state, title, url)</pre>
The state parameter can be anything that can be serialized. It is stored in history, and when the user presses the browser's Back button, it is popped out for you. So through this parameter, your future self can know which page "Back" should switch to.

For example, suppose the current URL is http://example.com. After I run the following code:
<pre>history.pushState({step: 1}, "第一步", "/step/1")</pre>
the URL becomes http://exmple.com/step/1 and the page title becomes "Step 1" (Firefox does not seem to implement this parameter). When you press the browser's Back button, you get the {step: 1} object through the onpopstate event.
<h2>replaceState</h2>
The parameters are exactly the same as pushState. The difference is that history.replaceState doesn't push anything onto the stack. Instead, it modifies the current state. In plain terms, it changes the URL. For example, suppose JS opens a dialog, and you want this behavior reflected in the URL, but you don't want it to become a history entry. Then you can use replaceState!
<h2>onpopstate</h2>
This is an event. It fires when the user clicks the browser's Back or Forward button, and the last item on the stack is popped out and handed to you. From that item (that is, the state you pushed in with pushState), you can tell what the previous page did, and then use JS to load that content back.
<pre>window.onpopstate = function(event) {

  console.log(event.state);

}</pre>
<h2>Direction</h2>
If you want to tell whether the user pressed Back or Forward, for example so that the loading animation moves in different directions, this is not available by default. But you can work out the direction with a global variable. Here's an example:
<pre>var current_step = 1;

window.onpopstate = function(event) {
  if(current_step - event.state.step &gt; 0) {
    console.log("上一頁");
  }else{
    console.log("下一頁");
  }
}

function show_step1( ) {
  current_step = 1;
  history.pushState({step: 1}, "第一步", "/step/1");
}

function show_step2( ) {
  current_step = 2;
  history.pushState({step: 2}, "第二步", "/step/2");
}</pre>
<h2>Notes</h2>
<ul>
 	<li>Don't think in terms of "the previous page." The browser doesn't tell you what the previous page is. It tells you what the last pushed state was. You need to interpret that state and load the matching content (elements) yourself. If you do nothing, then nothing will happen even when the user presses Back.</li>
 	<li>When onpopstate fires, the browser automatically updates the URL for you, so you don't need to call replaceState yourself.</li>
 	<li>Never call pushState inside onpopstate unless you are very clear about how the problem occurs and what you are doing.</li>
 	<li>This family of APIs only works within the same page. In other words, if the user's previous page was loaded through the browser (for example, via a hyperlink), then when they press Back, JS receives no notification at all.</li>
 	<li>Because of the browser's BFCache, the scroll position may differ from what you expect.</li>
 	<li>Don't focus only on showing a nice-looking URL. Also think about whether, if this URL is copied and shared, someone else can "use" it to view the content you expect.</li>
</ul>
&nbsp;
