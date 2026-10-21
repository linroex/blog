---
title: "Visual Studio 2010 - Developing with .NET Famework 4, Better Parallel Computing, and Automated UI Testing"
date: 2010-12-13T17:56:39
slug: "visual-studio-2010-net-framework-4-2"
tags: ["Visual Studio", ".NET"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_224908.jpg"><img class="size-large wp-image-4164 aligncenter" title="2010-12-10_224908" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_224908-520x314.jpg" alt="" width="520" height="314" /></a></p>
I never used Visual Studio 2010, which came out in May 2010, until a few days ago. When I was installing Visual Studio on Windows 7, the installation disc I had was 32-bit and wouldn't install, so I downloaded Visual Studio 2010 Express instead. I originally thought Visual Studio 2010 wasn't much different from Visual Studio 2008, but after installing it I found out I was wrong. The executables it compiles are noticeably faster. That's because all of the controls in Visual Studio 2010 are built with .NET Famework 4, so they run faster. Visual Studio 2010 also upgrades (adds) many things, such as heterogeneous platform development management, DataTips, and parallel computing.


<!--more-->


Of all the new features in Visual Studio 2010, my favorites are the parallel computing library and DataTips. In the past, writing parallel programs was very troublesome and took a lot of time. In Visual Studio 2010, you can use the built-in library directly to build parallel features. The improved DataTips also let me easily check the value of each variable while debugging. I've also heard that this version of VS is especially strong for team development. I haven't studied that, though, so I don't really know what software life cycles or process control are. I only roughly know the benefits of code version control, because I often wrote buggy code and then spent ages hunting down the problems.

Also, since .NET Famework 4 isn't very widespread yet, VS2010 includes Multi-Targeting Support, which lets you build an application against a different version of the .NET Famework. That way, you don't have to worry about your program not opening on computers that don't have .NET Famework 4.
<h2>Visual Studio 2010 information:</h2>
<ul>
	<li>Official website: <a href="http://www.microsoft.com/visualstudio/zh-tw">http://www.microsoft.com/visualstudio/zh-tw</a></li>
	<li>Poster downloads: <a href="http://msdownload.longsun.net/visualstudio/NET_Framework_4_Poster.pdf">.NET Famework 4 poster</a> | <a href="http://msdownload.longsun.net/visualstudio/Visual_Studio_2010_Shortcuts.zip">VS2010 shortcut poster</a></li>
	<li>Main program (Express) download: <a href="http://www.microsoft.com/express/Downloads/">http://www.microsoft.com/express/Downloads/</a></li>
	<li>Official documentation: <a href="http://goo.gl/70KoB">http://goo.gl/70KoB</a></li>
</ul>
I recommend downloading the web installer.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184023.jpg"><img class="alignnone size-large wp-image-4142" title="2010-12-10_184023" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184023-520x315.jpg" alt="" width="520" height="315" /></a>
<h2>Visual Studio 2010 features:</h2>
<ol>
	<li>Enhanced debugging (DataTips)</li>
	<li>Heterogeneous platform development management (Team Explorer Everywhere)</li>
	<li>Built-in parallel computing library</li>
	<li>Complete software life cycle and process control (I don't really understand this either; I only roughly know it's used for team development)</li>
	<li>Code version control</li>
	<li>Automated UI testing</li>
	<li>Multi-Targeting Support</li>
</ol>
Setting which .NET Famework version to compile against ▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_225321.jpg"><img class="alignnone size-large wp-image-4165" title="2010-12-10_225321" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-10_225321-520x420.jpg" alt="" width="520" height="420" /></a>
<h2>Installing Visual Studio 2010</h2>
Here I'll write the tutorial using the Visual Basic 2010 web installer. The web installers for other languages install in pretty much the same way.

1. First, open the installer you just downloaded.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_183854.jpg"><img class="alignnone size-large wp-image-4143" title="2010-12-10_183854" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_183854-520x356.jpg" alt="" width="520" height="356" /></a>

2. The installer loads the components it needs for installation.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184139.jpg"><img class="alignnone size-full wp-image-4144" title="2010-12-10_184139" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184139.jpg" alt="" width="292" height="123" /></a>

3. Click Next.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184234.jpg"><img class="alignnone size-full wp-image-4145" title="2010-12-10_184234" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184234.jpg" alt="" width="516" height="465" /></a>

4. Select I have read and accept the license terms, then click Next.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184333.jpg"><img class="alignnone size-full wp-image-4146" title="2010-12-10_184333" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184333.jpg" alt="" width="506" height="454" /></a>

5. Choose which programs to install besides the compiler itself. If you're writing database programs, choose Microsoft SQL Server. As for Silverlight, just let it install. You'll likely need it sooner or later, and the Silverlight files are small, so it won't take long.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184408.jpg"><img class="alignnone size-full wp-image-4147" title="2010-12-10_184408" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184408.jpg" alt="" width="506" height="454" /></a>

6. This step asks where to install. Usually you keep the default and click Next. This screen also shows the programs that will be installed so you can confirm them. Once you're OK with the list, click Install.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184618.jpg"><img class="alignnone size-full wp-image-4148" title="2010-12-10_184618" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184618.jpg" alt="" width="506" height="454" /></a>

7. At this step you can step away. The system automatically handles all the downloading and installing. It takes quite a while, though..... If your connection is slow, you may as well go to sleep first xD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184727.jpg"><img class="alignnone size-full wp-image-4149" title="2010-12-10_184727" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-12-10_184727.jpg" alt="" width="506" height="454" /></a>
