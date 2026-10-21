---
title: "Making Python Module Installation Easier: easy_install Tutorial and Egg File Installation Guide"
date: 2011-05-01T16:50:04
slug: "python-easy-install-tutorial"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827.jpg"><img class="aligncenter" title="2011-05-01_170827" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827-540x352.jpg" alt="" width="540" height="352" /></a>

As everyone knows, one of Python's key features is its high extensibility. You can install third-party modules to get the functionality you want. For example, if you want to write code in Chinese, you can install the zhpy module. Installing these modules is not especially hard, but it is tedious. Some only need you to click Next a few times, while others require changing system settings. Here I want to introduce a program called "easy_install", which makes installing modules for Python much simpler. It works similarly to yum on Linux, and with it you only need one command to install a module~ easy_install can also install packages in the so-called egg format.
<h2>
<!--more-->
Introduction to easy_install</h2>
<ul>
	<li>Python must be installed on your computer first</li>
	<li>Download: <a href="http://www.box.net/shared/fibb0r0dia">Box.net</a>｜<a href="http://www.4shared.com/file/zkrsEBgV/ez_setup.html ">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/ez_setup.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOZjYwYzY0ZWItOTVmNS00MGE4LThiMWItYzE3ZTVlMWNmNDUz&amp;hl=zh_TW">Google</a></li>
</ul>
<h2>easy_install Installation Guide</h2>
1. Move the file you just downloaded to the Python root directory (for example, C:Python27).

2. Open cmd and enter the following commands:
<ul>
	<li>cd c:Python27</li>
	<li>python ez_setup.py setuptools</li>
</ul>
P.S.  Change c:Python27 to your own Python path.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170026.jpg"><img class="alignnone size-large wp-image-457" title="2011-05-01_170026" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170026-540x352.jpg" alt="" width="540" height="352" /></a>

3. When you see the message in the red box, easy_install has been installed successfully.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170047.jpg"><img class="alignnone size-large wp-image-458" title="2011-05-01_170047" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170047-540x352.jpg" alt="" width="540" height="352" /></a>

4. After installation, add the Scripts folder in your Python folder to the PATH environment variable. Here is my example:

C:Python27Scripts  ->Add this path to the PATH environment variable

Each person's path may be different.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170507.jpg"><img class="alignnone size-full wp-image-459" title="2011-05-01_170507" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170507.jpg" alt="" width="416" height="457" /></a>
<h2>How to Quickly Install a Module?</h2>
1. Open CMD and enter the command:

easy_install module_name

That's it, and the module is installed. If you want to install a module in egg format, it's also simple: replace the module name with the location of the module's installation file. For example, if I saved the installation file in c:download and the file name is 123.egg, the command is:

<strong>eazy_install c:download123.egg</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170735.jpg"><img class="alignnone size-large wp-image-460" title="2011-05-01_170735" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170735-540x352.jpg" alt="" width="540" height="352" /></a>

2. If you see a screen similar to mine, the installation was successful.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827.jpg"><img class="alignnone size-large wp-image-461" title="2011-05-01_170827" src="{{< param imageBase >}}/wp-content/uploads/2011/05/2011-05-01_170827-540x352.jpg" alt="" width="540" height="352" /></a>
