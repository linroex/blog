---
title: "Fixing the Unity 3D Error on Startup: Eorror loading page  couldn&#039;t read a file ://file"
date: 2014-01-26T17:53:14
slug: "unity-3d-error-loading-page-fix"
tags: ["Unity", "Game Development"]
categories: ["Programming"]
draft: false
---

Some friends installed Unity without any problems, but when they opened it they ran into the error message "Eorror loading page couldn't read a file ://file". My guess is that this error happens because the user name contains Chinese characters, which causes a problem when Unity tries to load the license key on its first run. The fix is actually easy: just import the license key into Unity manually. You can follow the tutorial below to do it.


<!--more-->


1. First, turn off your internet connection. Don't be confused: this is so that Unity switches to manual activation mode instead of web activation.

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173632.jpg"><img class="aligncenter size-full wp-image-916" alt="2014-01-26_173632" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173632.jpg" width="346" height="768" /></a>

&nbsp;

2. Start Unity. This time you won't see the error message. Instead, you'll see a page like the one below, which is the page for manually managing your license. Click "Manual Activation," and then click "Save License."

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173810.jpg"><img class="aligncenter size-full wp-image-917" alt="2014-01-26_173810" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173810.jpg" width="606" height="359" /></a> <a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173821.jpg"><img class="aligncenter size-medium wp-image-918" alt="2014-01-26_173821" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173821.jpg" width="392" height="229" /></a>

&nbsp;

3. Go to the manual activation page (https://license.unity3d.com/manual) and upload the file you just saved.

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-26-at-5.45.32-PM.jpg"><img class="aligncenter size-full wp-image-919" alt="Screen Shot 2014-01-26 at 5.45.32 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-26-at-5.45.32-PM.jpg" width="877" height="521" /></a>4. Select "Activate the free version of Unity"

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174726.jpg"><img class="aligncenter size-full wp-image-920" alt="2014-01-26_174726" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174726.jpg" width="654" height="615" /></a>

5. Click "Download" to download the license key file.

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174926.jpg"><img class="aligncenter size-full wp-image-921" alt="2014-01-26_174926" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174926.jpg" width="654" height="615" /></a>

6. Turn off your internet connection again, then open the Unity main program. As in step 2, click "Manual Activation," then click "Load License" and select the file you just downloaded.

When you see the screen below, you've succeeded! Next, restart Unity and enjoy it!

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_175005.jpg"><img class="aligncenter size-full wp-image-922" alt="2014-01-26_175005" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_175005.jpg" width="274" height="152" /></a>

&nbsp;
