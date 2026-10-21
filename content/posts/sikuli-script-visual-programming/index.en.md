---
title: "Sikuli Script - An Innovative, Easy-to-Write Programming Language"
date: 2010-02-05T11:28:04
slug: "sikuli-script-visual-programming"
tags: ["Sikuli"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/02/set-ip.png"><img class="size-large wp-image-2616 aligncenter" title="set-ip" src="{{< param imageBase >}}/wp-content/uploads/2010/02/set-ip-399x400.png" alt="" width="399" height="400" /></a></p>
So what is <strong><a href="http://sikuli.org/">SIKULI</a></strong>? I think anyone who has used game cheats (helper programs for online games) knows the famous Chinese macro tool AnJian Jingling, which automates keyboard and mouse actions. <strong>Sikuli Script</strong> is quite similar to that kind of tool (but it is not a cheat). Sikuli Script makes it very easy to build a program. Most programming languages today use purely text-based code, but Sikuli Script is different: its code is made of images. The author of <strong>Sikuli Script</strong> is a true genius to have come up with such a creative idea. Still, that may not make much sense to you yet (what do you mean, writing programs with images....?). So let's build a <strong>Sikuli Script</strong> program together!


<!--more-->


Right now, <strong>Sikuli Script</strong> is mainly used for writing scripts, such as automatically logging into games or instant messengers (IM). Since <strong>Sikuli Script</strong> has only been around for a short time, its features are not fully developed yet. However, it already supports basic features such as if statements and loops, so you can still write a fairly complete program. <span style="color: #ff0000;"><strong>Also, if you're interested in studying Sikuli Script further, you can look into <a href="http://www.python.org/">Python</a>, the programming language,</strong></span> because according to the official site, Sikuli Script is developed in Python. The way loops and conditional statements work in <a href="http://www.python.org/">Python</a> is almost exactly the same as in <strong>Sikuli Script</strong>.
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="425" height="344" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/FxDOlhysFcM&amp;hl=zh_TW&amp;fs=1&amp;" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="425" height="344" src="http://www.youtube.com/v/FxDOlhysFcM&amp;hl=zh_TW&amp;fs=1&amp;" allowscriptaccess="always" allowfullscreen="true"></embed></object>
<h2></h2>
<div style="width: 100%;">
<div style="display: block; float: right; margin: 0px; padding: 4px 0px 0px 0px;"><a style="font-size: 11px; margin: 0px; font-family: verdana; text-decoration: none; padding: 0px;" title="Create your fan badge" href="http://www.facebook.com/facebook-widgets/fanbadges.php" target="_TOP"><span style="color: #ffffff;">Create your fan badge</span></a></div>
</div>
<!-- Facebook Fan Badge END -->
<h2>Sikuli Script Information:</h2>
<ul>
	<li>Official website: <a href="http://sikuli.org/">http://sikuli.org/</a></li>
	<li>Author's blog: <a href="http://blog.vgod.tw/">http://blog.vgod.tw/</a></li>
	<li>Download links: <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-win-20100201.exe">Windows version</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-osx-10.5-20100201.zip">Mac 10.5 version</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-osx-10.6-20100201.zip">Mac 10.6 version</a> | <a href="http://launchpad.net/sikuli/trunk/0.9.8/+download/Sikuli-IDE-linux-20100201.zip">Linux version</a></li>
	<li>Tutorial: <a href="http://goo.gl/PV6D">http://goo.gl/PV6D</a></li>
	<li>Requirements: It can be used on any operating system, but the computer needs <a href="http://www.java.com/getjava">JRE 6+</a> installed. In addition, this programming language currently only supports x86 CPUs.</li>
	<li>Personal download links (Windows version): Xun6 | <a href="http://www.4shared.com/file/225758699/56cc4834/Sikuli-IDE-win-20100201.html">4Shared</a> | <a href="http://www.box.net/shared/s2m59klvxm">Box.net</a></li>
	<li>Virus scan report: <a href="http://www.virustotal.com/analisis/c212eaa8228269471391a0efb7000cca43856cf932cc7d1a796332ec3cf2b27a-1265271782">VirusTotal</a></li>
	<li>MD5: 9b8cd09164195cdafb295f3a06953095</li>
</ul>
<span style="font-size: x-large;"><span><strong>
</strong></span></span><strong>SIKULI Installation:</strong>

P.S. All examples in this article use Windows XP.

1. First, download the installer from the official <a href="http://sikuli.csail.mit.edu/">SIKULI</a> website. Then make sure your computer has JRE installed, and open the SIKULI installer.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101215.png"><img class="alignnone size-large wp-image-2617" title="2010-02-05_101215" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101215-500x375.png" alt="" width="500" height="375" /></a>

2. Click [Next]

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101559.png"><img class="alignnone size-large wp-image-2618" title="2010-02-05_101559" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101559-500x400.png" alt="" width="500" height="400" /></a>

3. Set the installation location for SIKULI, then click [Next]

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101653.png"><img class="alignnone size-large wp-image-2619" title="2010-02-05_101653" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101653-500x400.png" alt="" width="500" height="400" /></a>

The program will ask you to confirm that you really want to install into the folder you set. Click [OK].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101743.png"><img class="alignnone size-full wp-image-2620" title="2010-02-05_101743" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101743.png" alt="" width="268" height="122" /></a>

4. Click [Next]

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101959.png"><img class="alignnone size-large wp-image-2621" title="2010-02-05_101959" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_101959-500x400.png" alt="" width="500" height="400" /></a>

5. Installation starts. When both the top and bottom progress bars are complete, click [Next]

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102112.png"><img class="alignnone size-large wp-image-2622" title="2010-02-05_102112" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102112-500x400.png" alt="" width="500" height="400" /></a>

6. Click [Next] directly

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102152.png"><img class="alignnone size-large wp-image-2623" title="2010-02-05_102152" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102152-500x400.png" alt="" width="500" height="400" /></a>

7. Done

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102219.png"><img class="alignnone size-large wp-image-2624" title="2010-02-05_102219" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_102219-500x400.png" alt="" width="500" height="400" /></a>
<!--nextpage-->
<h2>Writing a Simple Little Program with SIKULI</h2>
Next, we'll use SIKULI to write a small program that automatically logs into an instant messenger. Just follow the steps.

1. Open the main Sikuli program, then click [File] → [New] to create a new project.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104351.png"><img class="alignnone size-full wp-image-2630" title="2010-02-05_104351" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104351.png" alt="" width="478" height="518" /></a>

2. Open the instant messenger's main program, but don't log in yet (and don't minimize it)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104210.png"><img class="alignnone size-full wp-image-2629" title="2010-02-05_104210" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_104210.png" alt="" width="251" height="511" /></a>

3. In the code area, type click() and place the cursor between the parentheses ()

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110524.png"><img class="alignnone size-large wp-image-2631" title="2010-02-05_110524" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110524-447x400.png" alt="" width="447" height="400" /></a>

4. Click the camera button in the upper-left corner of the SIKULI program

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_103320.png"><img class="alignnone size-large wp-image-2626" title="2010-02-05_103320" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_103320-500x370.png" alt="" width="500" height="370" /></a>

5. Drag the mouse to draw a box around the account input field of the instant messenger

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110856.png"><img class="alignnone size-large wp-image-2632" title="2010-02-05_110856" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_110856-500x375.png" alt="" width="500" height="375" /></a>

6. You'll automatically return to the code editor. On a new line, type type("你的帳號t你的密碼")

For example: type("linroext12345689")

This step makes the program enter your account, then automatically start a new line and enter your password.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111737.png"><img class="alignnone size-large wp-image-2636" title="2010-02-05_111737" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111737-447x400.png" alt="" width="447" height="400" /></a>

7. Again, start a new line and type click(), keeping the cursor inside the parentheses, then click the camera button

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111420.png"><img class="alignnone size-large wp-image-2634" title="2010-02-05_111420" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111420-447x400.png" alt="" width="447" height="400" /></a>

8. Again, drag the mouse to draw a box around the login button

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111557.png"><img class="alignnone size-large wp-image-2635" title="2010-02-05_111557" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_111557-500x375.png" alt="" width="500" height="375" /></a>

9. That should just about do it. Check that your code matches mine. If it does, open the instant messenger program first, then click the green triangle button to start running

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_1119571.png"><img class="alignnone size-full wp-image-2638" title="2010-02-05_111957" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_1119571.png" alt="" width="622" height="672" /></a>

10. After you finish writing, you can save your program. However, in my testing, it can't currently be saved as an exe file, only as a project file. When you want to use it, open the Sikuli main program and run it. I hope it can be saved as an exe file in the future.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_112436.png"><img class="alignnone size-full wp-image-2639" title="2010-02-05_112436" src="{{< param imageBase >}}/wp-content/uploads/2010/02/2010-02-05_112436.png" alt="" width="597" height="534" /></a>
<h2>Notes on Using Sikuli:</h2>
<ol>
	<li>Sikuli is case-sensitive. For example, openapp and openApp are different.</li>
</ol>
Summary: Now that you've gone through the tutorial above, you should have a basic understanding of <strong><a href="http://sikuli.org/">Sikuli Script</a></strong>. If you're a programmer, you're probably feeling pretty conflicted right now! With a programming language this simple, how will programmers make a living?! Actually, it's fine. Writing a good program has little to do with the language you use (machine language excepted.....). What matters most is logic. SIKULI isn't really meant to let a total beginner write programs. Its real purpose is to make code more readable. One more thing: the author of SIKULI is Taiwanese, so this programming language is truly a source of pride for Taiwan~
