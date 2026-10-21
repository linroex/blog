---
title: "[Python] Python Interpreter Installation Tutorial"
date: 2011-02-18T22:01:26
slug: "python-interpreter-install-tutorial"
tags: ["Python", "IDE"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_214318.jpg"><img class="size-full wp-image-274 aligncenter" title="2011-02-15_214318" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_214318.jpg" alt="" width="511" height="297" /></a></p>
Recently I've been playing around with Google Storage, so I dusted off a Python book that had been gathering dust and read through it. Together with the documentation on Google Code, I wrote a small automatic backup program. It's still very simple, so I won't publish it yet. But writing it made me realize that Python is a fairly easy programming language. In terms of ease of learning and rigor, it's about on par with VB. In terms of verbosity, though, Python wins over VB (I mean VB is the wordier one XD). For example, an if statement in VB has to be written as if.....then.......end if, while in Python you just write if....: to get started. Indentation also matters a lot in Python. If the indentation is wrong, the program won't run, because the interpreter uses indentation to decide where selection structures, loops, and so on end. Personally, I'd recommend Python to beginners, since it lets you write very neat code ~


<!--more-->
However, as I mentioned earlier, Python is just as loose as VB, or to be blunt, even looser than VB... It doesn't force you to declare variables or types. VB6 didn't force declarations either, but VB.NET does XD. Even so, plenty of big companies use it to develop software. For example, Google has many programs written in Python, and GAE (Google App Engine) also requires Python or Java for development. So don't think it's weak!! Also, according to TIOBE's statistics, Python has entered the top four most widely used programming languages, beating PHP, and its growth rate is quite high too.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_213901.jpg"><img class="alignnone size-large wp-image-273" title="2011-02-15_213901" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_213901-526x540.jpg" alt="" width="526" height="540" /></a>

By the way, the latest version of Python is Python 3, which some people call Python 3k or Python 3000. However, Python 2.x code is more common online. GAE, for example, is developed with Python 2.x. The differences between Python 3.x and 2.x are quite significant, so before you start learning Python, decide which version you want to learn. Don't try to learn both at once.
<h2>Python Info:</h2>
<ul>
	<li>Official website: <a href="http://www.python.org/">http://www.python.org</a></li>
	<li>Interpreter download page: <a href="http://www.python.org/getit/">http://www.python.org/getit/</a></li>
</ul>
<h2>Python Features:</h2>
<ul>
	<li>Uses indentation to determine where loops and selection structures end</li>
	<li>Can be combined with C, Java, and .NET for development; the most common implementation on the market is CPython</li>
	<li>No need to declare variables or types</li>
	<li>Concise syntax</li>
</ul>
<h2>Installing Python</h2>
Below I'll cover Python 3.0. Installing Python 2.x works in a similar way. Also, if you're installing Python on Linux, don't use yum. From my experience, the Python version that yum installs is very old, something like 2.4....

1. First, go to the Python download page and download the installer. The official site offers interpreters for several operating systems, including Windows, Mac, and Linux. Here I'll only cover installing on Windows.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222223.jpg"><img class="alignnone size-large wp-image-297" title="2011-02-18_222223" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222223-540x396.jpg" alt="" width="540" height="396" /></a>

2. Run the installer

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222536.jpg"><img class="alignnone size-large wp-image-298" title="2011-02-18_222536" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222536-540x399.jpg" alt="" width="540" height="399" /></a>

3. This step asks whether you want to install Python for all users of this computer or only for your own account. If your computer is shared by the whole family and you don't want them to know which programs you use, choose 【Install just for me】→【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222827.jpg"><img class="alignnone size-full wp-image-299" title="2011-02-18_222827" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222827.jpg" alt="" width="499" height="428" /></a>

4. This step sets where Python will be installed. I recommend keeping the default, and make a note of the installation location.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223025.jpg"><img class="alignnone size-full wp-image-300" title="2011-02-18_223025" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223025.jpg" alt="" width="499" height="428" /></a>

5. Just click 【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223359.jpg"><img class="alignnone size-full wp-image-301" title="2011-02-18_223359" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223359.jpg" alt="" width="499" height="428" /></a>

6. Installing, please wait~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223440.jpg"><img class="alignnone size-full wp-image-302" title="2011-02-18_223440" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223440.jpg" alt="" width="499" height="428" /></a>

7. Installation complete~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223521.jpg"><img class="alignnone size-full wp-image-303" title="2011-02-18_223521" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223521.jpg" alt="" width="499" height="428" /></a>

8. Now go to the folder where Python was just installed, the same path you noted in step 4.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224154.jpg"><img class="alignnone size-large wp-image-306" title="2011-02-18_224154" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224154-540x399.jpg" alt="" width="540" height="399" /></a>

9. Run 【python.exe】 and you can start writing code~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224319.jpg"><img class="alignnone size-large wp-image-307" title="2011-02-18_224319" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224319-540x307.jpg" alt="" width="540" height="307" /></a>
