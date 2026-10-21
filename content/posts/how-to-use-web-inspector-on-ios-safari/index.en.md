---
title: "How to Use Web Inspector on iOS Safari"
date: 2017-02-03T11:58:14
slug: "how-to-use-web-inspector-on-ios-safari"
tags: ["iOS", "Safari"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/02/螢幕快照-2017-02-04-上午12.53.17.jpg"]
draft: false
---

When doing front-end development on a computer, browsers provide handy developer tools that let us check error messages, storage contents, step through JS, and more. But how can we open these powerful developer tools when testing a web page on a mobile device? After all, you cannot fit them on a tiny screen! This article shares how, for iOS devices, you can connect to a Mac and use Mac Safari's developer tools to remotely control the web page running in iOS Safari, which makes testing on iOS much easier.


<!--more-->


When it comes to front-end testing on mobile devices, besides testing on real devices, you can also use the Device Toolbar in the browser. But that usually only simulates screen resolution and User-Agent. If you want to test syntax compatibility, you have to use a simulator or a real device. Do not think mobile testing is unimportant. Many HTML5 and CSS3 features you take for granted may be unsupported or behave differently on mobile devices. Even if the documentation says iOS Safari supports something, that does not necessarily mean it really does. So I recommend testing it yourself to be safe.

To connect iOS Safari with Mac Safari, you first need a cable, of course. You also need to turn on Web Inspector in iOS Safari. Go to iOS Settings =&gt; Safari =&gt; Advanced and enable "Web Inspector."

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/IMG_6640.png"><img class="alignnone wp-image-7373 size-full" src="{{< param imageBase >}}/wp-content/uploads/2017/02/IMG_6640-e1486140119554.png" width="400" height="711" /></a>

After enabling it, open the web page you want to test in iOS Safari. Next, we need to turn on the developer features in Mac Safari. Unlike Chrome and Firefox, Mac Safari hides its developer features by default. You need to enable them in Preferences =&gt; Advanced.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_44_26.jpg"><img class="alignnone size-full wp-image-7374" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_44_26.jpg" alt="" width="776" height="632" /></a>

Once you check the "Develop" menu, "Develop" appears in the Mac Safari menu bar. Click "Develop," and you will see your iOS device's name and the web pages open on it. Select the page you want to test, and the developer tools will appear!

Mac Safari's developer tools actually remotely control iOS, so you can check how the iOS web page is running directly on your computer. If you want to see error messages, you can also output them directly.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_48_59.jpg"><img class="alignnone size-large wp-image-7375" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-04_上午12_48_59-1024x553.jpg" alt="" width="660" height="356" /></a>

If the expected URL does not appear to click on, check the following:
<ul>
 	<li>Are the phone and computer connected to each other?</li>
 	<li>Is the phone screen unlocked?</li>
 	<li>Is iOS Safari open?</li>
 	<li>This feature only works with iOS Safari. (However, iOS Chrome uses the same JS engine as Safari, so testing in Safari is enough.)</li>
</ul>
