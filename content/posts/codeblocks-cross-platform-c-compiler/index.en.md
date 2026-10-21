---
title: "Code::Blocks 10.05 - A C/C++ Compiler That Rivals Dev C++, Cross-Platform (Ubuntu, Windows, Mac)"
date: 2011-02-11T10:42:29
slug: "codeblocks-cross-platform-c-compiler"
tags: ["C++", "IDE"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182355.jpg"><img class="alignnone size-full wp-image-191" title="2010-10-28_182355" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182355.jpg" alt="" width="440" height="217" /></a></p>
I'm sure you know the Dev C++ compiler. Many schools use it as the platform for teaching C. For example, the computer classes at Taiwan's top high schools seem to use it. But here I want to introduce not Dev C++, but <strong><a href="http://www.codeblocks.org/">Code::Blocks</a></strong>. Code::Blocks and Dev C++ are both compilers for C (both C and C++). However, if you have been following Dev C++, you may have noticed that it has not been updated in a long time. <strong><a href="http://www.codeblocks.org/">Code::Blocks</a></strong> is free and open source, just like Dev C++, but it also supports multiple operating systems, including Windows and Linux. So if you want to write C programs on Ubuntu, you can try this software.

This tutorial is for Windows only.


<!--more-->


I tested Code::Blocks myself, and I think it works quite well. It has everything Dev C++ has. One thing that disappointed me, though, is that Code::Blocks does not have a Traditional Chinese language option, which raises the barrier to using it. Most programmers are good at English (I am the exception, XD), but it is still more comfortable to use software in your own language. Another feature is that you can choose which compiler to use to build your code. You do not have to use its built-in compiler. For example, if you are writing code in Code::Blocks but want to compile it with VC++, you can set that up directly in the program.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182239.jpg"><img class="alignnone size-large wp-image-192" title="2010-10-28_182239" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182239-540x405.jpg" alt="" width="540" height="405" /></a>

<strong>Code::Blocks Info</strong>
<ul>
	<li>Official website: <a href="http://www.codeblocks.org/">http://www.codeblocks.org/</a></li>
	<li>Supported languages: English...</li>
	<li>Download page: <a href="http://www.codeblocks.org/downloads/26">http://www.codeblocks.org/downloads/26</a></li>
	<li><a href="http://www.codeblocks.org/downloads/26"></a>Supported operating systems: Linux, Windows (2000 to 7), Mac</li>
</ul>
<h2>Code::Blocks Features</h2>
<ul>
	<li>Supports three operating systems</li>
	<li>Supports plugins</li>
	<li>Still being updated (unlike Dev C++)</li>
</ul>
<h2>Code::Blocks Installation Guide</h2>
<span style="color: #ff0000;">This article covers Windows only.</span>

Step 1: Go to the <a href="http://www.codeblocks.org/downloads/26">official Code::Blocks website</a> and download the main program, then run the installer.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182821.jpg"><img class="alignnone size-large wp-image-193" title="2010-10-28_182821" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_182821-540x293.jpg" alt="" width="540" height="293" /></a>

Step 2: Click **Next**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183608.jpg"><img class="alignnone size-full wp-image-194" title="2010-10-28_183608" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183608.jpg" alt="" width="503" height="393" /></a>

Step 3: Click **I Agree**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183650.jpg"><img class="alignnone size-full wp-image-195" title="2010-10-28_183650" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183650.jpg" alt="" width="503" height="393" /></a>

Step 4: Click **Next**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183701.jpg"><img class="alignnone size-full wp-image-196" title="2010-10-28_183701" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183701.jpg" alt="" width="503" height="393" /></a>

Step 5: Click **Install** to start the installation.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183837.jpg"><img class="alignnone size-full wp-image-197" title="2010-10-28_183837" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_183837.jpg" alt="" width="503" height="393" /></a>
<h2>Code::Blocks Tutorial: Creating a New Console Project</h2>
In this tutorial, I will only cover the basics that beginners use most often, which is the console application. Code::Blocks can do much more than I can cover here. Besides Console, its built-in project templates include Code::Blocks Plugins, DirectX, ARM Project, and many more. If you are comfortable with the basics, feel free to explore the others on your own.

Step 1: Open Code::Blocks and click **File** → **New** → **Project**, in that order.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184650.jpg"><img class="alignnone size-large wp-image-198" title="2010-10-28_184650" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184650-492x540.jpg" alt="" width="492" height="540" /></a>

Step 2: On the left, select **Projects**, then select **Console Application** and click **Go**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184857.jpg"><img class="alignnone size-large wp-image-199" title="2010-10-28_184857" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184857-540x404.jpg" alt="" width="540" height="404" /></a>

Step 3: Here you choose whether to develop in C or C++. After you make your choice, click **Next**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184939.jpg"><img class="alignnone size-large wp-image-200" title="2010-10-28_184939" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_184939-540x438.jpg" alt="" width="540" height="438" /></a>

Step 4: Set the project's name and where it is stored.

"Project Title" is the name of the project.

"Folder to create project in" is where the project will be saved.

You do not need to change the two options below these.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185209.jpg"><img class="alignnone size-large wp-image-201" title="2010-10-28_185209" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185209-540x438.jpg" alt="" width="540" height="438" /></a>

Step 5: Set the build options. It is best to keep the default values. When you are done, click **Finish**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185529.jpg"><img class="alignnone size-large wp-image-202" title="2010-10-28_185529" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185529-540x438.jpg" alt="" width="540" height="438" /></a>

Step 6: After you click Finish, you might wonder why nothing appears. Do not worry. You can open the project you just created from the Projects panel on the left side of the main window. Then press **F9** on your keyboard to build the program.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185848.jpg"><img class="alignnone size-large wp-image-203" title="2010-10-28_185848" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-10-28_185848-540x405.jpg" alt="" width="540" height="405" /></a>
