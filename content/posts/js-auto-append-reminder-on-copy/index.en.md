---
title: "Worried About Visitors Copying Your Articles? Use JS to Automatically Append a Reminder or Disable Copying!"
date: 2017-02-12T23:43:41
slug: "js-auto-append-reminder-on-copy"
tags: ["JavaScript", "SEO"]
categories: ["Blog"]
draft: false
---

Many content sites have a mechanism that automatically appends the original article URL when text is copied, such as Mojing Lyrics and Zhihu. Some sites even ban users from copying text altogether. Achieving these features isn't difficult; it only takes a few lines of simple JavaScript. But first you should think about whether your site really needs such a feature. When a regular visitor copies text and pastes it into Facebook, does that really harm your site? And if you truly want to stop visitors from copying text, these tricks only keep out the honest, not the determined. Are you really protecting your interests, or just making your site harder to use?


<!--more-->


I don't think disabling copying is necessary. People who copy content from a website fall into two groups: malicious people who steal articles, and regular visitors who copy text, perhaps to share it. Existing techniques can't effectively stop the malicious ones. The only way is to present all text as images, but that would wreck your site's SEO and be extremely unfriendly to mobile devices. But when a regular visitor copies text to share, it doesn't reduce your traffic. On the contrary, it helps increase traffic, so it should be encouraged. Disabling copying, however, makes things very inconvenient for users.

Some sites choose to add "All rights reserved, unauthorized reproduction prohibited" at the bottom of the copied text. This is less aggressive than disabling copying, but it still needs careful thought about whether it's necessary. In this day and age, we can't keep the protective mindset of the past. Instead, we should think the other way around: how to get information to more people, and grow through sharing.

I think the most important thing is to consider why you run your website, and then decide whether you need to disable copying. Also, don't forget that no matter how clever the technology is, it only keeps out the honest (the Chinese saying goes, it stops gentlemen but not villains). What I fear most is failing to stop the malicious visitors while making the site hard to use for the well-meaning ones. Try stepping away from the technical side and think about handling this legally, or building a business-side firewall.

Here I recommend the approach Zhihu takes. When a visitor copies text, it adds the following at the top:
<blockquote>Author: Hou Xiangyu
Link: https://www.zhihu.com/question/40502548/answer/86972830
Source: Zhihu
Copyright belongs to the author. Please contact the author to obtain permission before reposting.</blockquote>
But the text isn't added for every copy. It only appears when more than a certain number of characters is copied. If a user copies a single short line for their personal blog, the copyright text would feel off-putting. But if they copy a large chunk and share it on Facebook or a blog, then personally I would happily accept a non-aggressive reminder like this one, and leave it at the bottom of the post or just let it be. Even when users share it on social networks, the traffic can still come back to Zhihu.

Key points:
<ul>
 	<li>Think about whether you need to disable copying or add copyright text.</li>
 	<li>Only show copyright text when a larger amount of text is copied.</li>
 	<li>The automatically added text must include the article URL.</li>
 	<li>The reminder message should not be aggressive.</li>
</ul>
So how do you technically disable copying or add a reminder message? You can work with the oncopy event. It is well supported in most browsers. I tested it with the latest Firefox, Chrome, and Safari, and it works fine.
<h2>Disabling Copying</h2>
Although I don't recommend it, let's first look at how to disable copying. This approach blocks the oncopy event, rather than the foolish way of disabling the right-click menu. Disabling right-click is really frustrating for visitors.
<pre>document.body.oncopy = function(e) {
  return false;
}</pre>
This is the same thing as jQuery's preventDefault().
<h2>Adding a Reminder Message</h2>
Adding a reminder message also involves the oncopy event. The event's parameter e has e.clipboardData.setData(), which lets you change the copied text. You just need to add the reminder text to what the user copied. The problem is that for security reasons, browsers won't let you read the clipboard contents, so you need to use window.getSelection() to get what the user copied (that is, the selected text).
<pre>document.body.oncopy = function(e) {
  var notice_text = "\n部落格：https://coder.tw \n 謝謝分享";
  var origin_text = window.getSelection();

  e.clipboardData.setData("text/plain", origin_text + notice_text);
 
  return false;
}</pre>
Finally, call preventDefault as well. The oncopy event fires before the copy happens. If you don't call preventDefault, then even if you set the clipboard contents, they will be overwritten by the original text.

The first argument of clipboardData.setData is the format.

window.getSelection() itself returns a Selection object, not a String. After all, visitors may copy images, formatted text, and so on. If you want to calculate the length of the copied text, you can convert it to a string with toString first, for example:
<pre>window.getSelection().toString().length</pre>
