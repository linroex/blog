---
title: "How to Manually Install Python on Linux Without Breaking yum"
date: 2011-08-19T08:00:45
slug: "linux-install-python-manually-keep-yum"
tags: ["Linux", "Python"]
categories: ["SRE"]
draft: false
---

I previously wrote a program that automatically backs up important data on Linux and uploads it to Google Storage. It was written in Python 2.7, but the Python built into Linux is 2.4, and even if you upgrade with yum, the newest version it gives you is 2.4. So if you want a newer version of Python, you have to compile it yourself. Below, I'll use Python 3.2 as the example.


<!--more-->


Also, if your Linux has yum installed, you'll run into a problem after installing the new Python: yum stops working. You can fix it by following the steps below. This happens because yum uses Python 2.4, so of course it breaks once you install a newer Python～

1. First, go to the page below and download the Python source code.

<a href="http://www.python.org/download/releases/">http://www.python.org/download/releases/</a>

Make sure you download the file with the .tgz extension. That is the source code.

wget -c http://www.python.org/ftp/python/3.2.1/Python-3.2.1.tgz

Next, extract the file you just downloaded.

tar -zxvf Python-3.2.1.tgz

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_174820.jpg"><img class="alignnone size-large wp-image-697" title="2011-08-17_174820" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_174820-540x341.jpg" alt="" width="540" height="341" /></a>

2. Go into the folder you just extracted.

cd Python-3.2.1

Then run the following command to set some installation options and check the build environment.

./configure --prefix=/usr

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175427.jpg"><img class="alignnone size-large wp-image-699" title="2011-08-17_175427" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175427-540x341.jpg" alt="" width="540" height="341" /></a>

Normally it prints a lot of output. If it finishes after only a few lines, and the last three lines aren't "Creating ....", your computer is probably missing some required programs, usually make and gcc. Install those first before you start installing Python.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175804.jpg"><img class="alignnone size-large wp-image-700" title="2011-08-17_175804" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175804-540x340.jpg" alt="" width="540" height="340" /></a>

3. Run: make

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175923.jpg"><img class="alignnone size-large wp-image-701" title="2011-08-17_175923" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_175923-540x342.jpg" alt="" width="540" height="342" /></a>

&nbsp;

Compiling...

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180042.jpg"><img class="alignnone size-large wp-image-703" title="2011-08-17_180042" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180042-540x340.jpg" alt="" width="540" height="340" /></a>

4. When the previous command finishes, run: make install. This starts the actual installation.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180152.jpg"><img class="alignnone size-large wp-image-704" title="2011-08-17_180152" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_180152-540x341.jpg" alt="" width="540" height="341" /></a>

&nbsp;

5. If your Linux has yum installed, you may run into some problems. First, run which yum to find out where it is, then open it with vi.

You may see this message:
<blockquote>There was a problem importing one of the Python modules
required to run yum. The error leading to this problem was:
No module named yum
Please install a package which provides this module, or
verify that the module is installed correctly.
It's possible that the above module doesn't match the
current version of Python, which is:</blockquote>
However, some people won't run into this problem. You can run yum to check whether it works. If yum is working fine, leave it alone.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181409.jpg"><img class="alignnone size-large wp-image-705" title="2011-08-17_181409" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181409-540x405.jpg" alt="" width="540" height="405" /></a>

6. Change the first line from "#!/usr/bin/python" to "#!/usr/bin/python2.4" and it will work again.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181714.jpg"><img class="alignnone size-large wp-image-706" title="2011-08-17_181714" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_181714-540x410.jpg" alt="" width="540" height="410" /></a>

I only noticed at the very end that the background of the screenshots is different... XD
