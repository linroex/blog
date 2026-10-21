---
title: "Google Chrome OS: Google's Cloud Operating System (Installation Tutorial)"
date: 2010-07-11T18:11:31
slug: "google-chrome-os-install-tutorial"
tags: ["Chrome OS"]
categories: ["Hardware"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-19_160846.jpg"><img class="alignnone size-large wp-image-3310" title="2010-06-19_160846" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-19_160846-537x400.jpg" alt="" width="537" height="400" /></a>

<strong>Google Chrome OS</strong> (hereafter Chrome OS) is an operating system from Google that mainly targets the netbook market. Chrome OS is known for its super-fast boot speed, very low power consumption, and very low hardware requirements. Google claims it boots in seven seconds <strong>(according to Google, that seven seconds assumes a solid-state drive)</strong>. It uses Linux as its kernel, and its overall interface looks almost identical to the trendy Chrome browser.


<!--more-->


<strong>Chrome OS</strong> moves most functions onto the web, using so-called cloud technology. So it doesn't demand much hardware performance, which makes it well suited to netbooks with modest hardware. However, Chrome OS has one fatal drawback: it needs an internet connection to be used at all. But that isn't a big problem, since broadband is now very widespread. Chrome OS also can't handle performance-heavy tasks, such as video editing or programming. It's only good for basic document editing and web browsing. But then again, people who buy netbooks probably aren't going to write code on them anyway~

Many people think <strong>Chrome OS</strong> is still at the "only hear the stairs creaking" stage. Actually, <strong>Google released the Chrome OS source code as early as last November</strong>. And at the recent Computex show, if I remember correctly, Acer also planned to release a netbook with <a href="http://goo.gl/B3Tr " target="_blank">Chrome OS</a>. <span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px; font-size: xx-small;">I personally am quite optimistic about Chrome OS. Running Windows on a netbook is a bit too heavy these days, and Chrome OS is exactly what gives netbook users a computing environment without lag.</span>

<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px; font-size: xx-small;"><a href="http://blog.chromium.org/2009/12/whats-difference-between-chromium-os.html" target="_blank">P.S. I forgot to mention something: anything you compile yourself should technically be called Chromium OS rather than Chrome OS. But I can never remember the word "Chromium," so in this article I just call it Chrome OS xD</a></span>

<span style="line-height: normal; -webkit-border-horizontal-spacing: 2px; -webkit-border-vertical-spacing: 2px;">
</span>

<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="560" height="340" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/0QRO3gKj3qw&amp;hl=zh_TW&amp;fs=1&amp;" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="560" height="340" src="http://www.youtube.com/v/0QRO3gKj3qw&amp;hl=zh_TW&amp;fs=1&amp;" allowscriptaccess="always" allowfullscreen="true"></embed></object>
<h2>Key points of Chrome OS</h2>
<ol>
	<li>Suited for netbooks</li>
	<li>Low power consumption</li>
	<li>Low hardware requirements</li>
	<li>Mainly cloud-based; it doesn't work without a network connection</li>
	<li>May require specific hardware (an SSD) in the future</li>
	<li>Claims a seven-second boot (in practice it isn't quite seven seconds, but it's not far off)</li>
</ol>
<h2>Trying out Chrome OS</h2>
Before installing, keep in mind that not every computer will run it successfully. My computer kept failing, for example = =

In this article, the Chrome OS used for the tutorial is not an official release. It was compiled and shared by enthusiastic Google fans. If you think it might have a trojan in it, you don't have to use it. You can download the source code and compile it yourself. Don't ask me where to get the official Chrome OS, because the official project only releases source code for you to compile yourself. It doesn't provide a ready-compiled Chrome OS.

1. First, go to <a href="http://chromeos.hexxeh.net/">http://chromeos.hexxeh.net/</a> to download the unofficial compiled Chrome OS. Click "Download the VMWare image" and the file will download.

P.S. If you don't see "Download the VMWare image," scroll down the page a bit and you'll find it.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_163334.jpg"><img class="alignnone size-large wp-image-3464" title="2010-07-11_163334" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_163334-550x334.jpg" alt="" width="550" height="334" /></a>

2. While the download runs, please wait, and <strong>use this time to download and install</strong> <a href="http://www.virtualbox.org/wiki/Downloads"><strong>VirtualBox</strong></a><strong>, a virtual machine program</strong>, since you need a virtual machine ready before you can try Chrome OS.

3. After the download, open VirtualBox, then click "New" → "Next" in order.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_164155.jpg"><img class="alignnone size-large wp-image-3466" title="2010-07-11_164155" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_164155-550x343.jpg" alt="" width="550" height="343" /></a>

4. For the name, enter Chrome OS, set the operating system type to "Linux," and the version to "Other Linux."

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174239.jpg"><img class="alignnone size-full wp-image-3467" title="2010-07-11_174239" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174239.jpg" alt="" width="549" height="372" /></a>

5. Here you set how much memory to give the virtual machine. Every computer is different 0.0. Basically, give it at least 512 MB~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174404.jpg"><img class="alignnone size-full wp-image-3468" title="2010-07-11_174404" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174404.jpg" alt="" width="549" height="372" /></a>

6. First, extract the Chrome OS file you just downloaded

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174616.jpg"><img class="alignnone size-large wp-image-3469" title="2010-07-11_174616" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_174616-550x321.jpg" alt="" width="550" height="321" /></a>

<!--nextpage-->

7. Go back to the VirtualBox window, select "Use an existing hard disk," then click the folder icon

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175006.jpg"><img class="alignnone size-full wp-image-3470" title="2010-07-11_175006" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175006.jpg" alt="" width="549" height="372" /></a>

8. Click "Add," then select the file you just downloaded

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175242.jpg"><img class="alignnone size-large wp-image-3471" title="2010-07-11_175242" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175242-534x400.jpg" alt="" width="534" height="400" /></a>

9. Select the file you just added, then click "Select"

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175403.jpg"><img class="alignnone size-large wp-image-3472" title="2010-07-11_175403" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175403-512x400.jpg" alt="" width="512" height="400" /></a>

10. Click "Next"

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175440.jpg"><img class="alignnone size-full wp-image-3473" title="2010-07-11_175440" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175440.jpg" alt="" width="549" height="372" /></a>

11. Click "Finish"

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175505.jpg"><img class="alignnone size-full wp-image-3474" title="2010-07-11_175505" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175505.jpg" alt="" width="549" height="372" /></a>

12. That's it, Chrome OS is installed~ From here on, just double-click the Chrome OS icon to open it.

I originally wanted to write about installing Chrome OS from a USB drive, but the file on the official Flow website seemed off 0.0 and kept failing to install = =

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175718.jpg"><img class="alignnone size-large wp-image-3475" title="2010-07-11_175718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175718-536x400.jpg" alt="" width="536" height="400" /></a>

13. While using it, the virtual machine program automatically captures your mouse. If you want to leave the VM and return to your normal computer, press the Ctrl key on the right side of your keyboard~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175901.jpg"><img class="alignnone size-full wp-image-3476" title="2010-07-11_175901" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_175901.jpg" alt="" width="390" height="267" /></a>

14. I don't know why, but when I test it myself, it won't start @@

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_180726.jpg"><img class="alignnone size-large wp-image-3477" title="2010-07-11_180726" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_180726-550x361.jpg" alt="" width="550" height="361" /></a>

<strong>Default Chrome OS login:</strong>

The default username is facepunch, and the default password is facepunch.
<h2>Afterword:</h2>
Personally, if you use a netbook, you might as well replace its built-in operating system with Chrome OS. It has low power consumption and modest hardware requirements, and it's designed entirely for netbook users. There's also a special design in Chrome OS that I haven't mentioned yet: when you want to shut down, you'll find there's no shutdown option. According to Google engineers, shutting down Chrome OS is simple. Just press your laptop's power button~ There's no need to worry about problems, because Chrome OS data is stored on the network, so it won't get corrupted the way it can on a typical operating system. I was also surprised by this design when I first saw it, because the computer education I received taught me never, ever to press the power button directly. Now, with Chrome OS, if a computer-class teacher says you can't press the power button directly, you can just ask them, "What about Chrome OS?" I rarely use Chrome OS myself, since I don't use a netbook at home anymore. But I once saw a senior's netbook running Chrome OS, and it really did look convenient!
