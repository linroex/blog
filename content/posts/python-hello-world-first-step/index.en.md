---
title: "[Python] The First Step into the Python World: HelloWorld (Printing Text and Writing Comments)"
date: 2011-02-20T09:00:54
slug: "python-hello-world-first-step"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056.jpg"><img class="size-large wp-image-315 aligncenter" title="2011-02-18_231056" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056-540x393.jpg" alt="" width="540" height="393" /></a></p>
Almost every programming language book starts with a first practice program, which is Hello World. Hello World means making the program print "HelloWorld". In this article, we will show you how to write your first Python program and briefly explain some basic Python usage.


<!--more-->
1. Create a file named [helloworld.py]. Be sure the file extension is .py.

The .py extension is the file extension for Python source code, similar to .cpp for C++ and .java for Java.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224908.jpg"><img class="alignnone size-large wp-image-310" title="2011-02-18_224908" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224908-540x502.jpg" alt="" width="540" height="502" /></a>

2. Right-click the file you just created and select [Edit with IDLE].

IDLE is an IDE tool provided officially by Python. Personally, I think it's pretty handy~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225006.jpg"><img class="alignnone size-large wp-image-311" title="2011-02-18_225006" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225006-540x467.jpg" alt="" width="540" height="467" /></a>

3. Enter the following code:
<pre lang="python">#C:Python31python.exe
# -*- coding:utf-8 -*-</pre>
Briefly, the first line sets the location of the interpreter, and the second line sets the code encoding to UTF-8. Including the second line helps avoid many errors.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225412.jpg"><img class="alignnone size-full wp-image-312" title="2011-02-18_225412" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225412.jpg" alt="" width="508" height="323" /></a>

4. Next, enter the following code:
<pre lang="python">print("HelloWorld")

text="HelloWorld_Text"
print(text)</pre>
In this code, print is the function used for output.

The first line outputs HelloWorld.

The third line outputs the contents of the text variable, which is HelloWorld_Text.

5. Next, let's learn how to write comments in Python.

In Python, a single-line comment starts with #.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230809.jpg"><img class="alignnone size-full wp-image-313" title="2011-02-18_230809" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230809.jpg" alt="" width="526" height="402" /></a>

A multi-line comment is written with three consecutive single quotes.

For example:
<pre lang="python">'''
This is a practice program for learning Python
'''</pre>
The above is a multi-line comment. Text enclosed by three consecutive single quotes is automatically skipped and not executed.

6. Finally, once you've written the code, you'll want to run it, right? If you follow this tutorial and write Python in IDLE, just press the F5 shortcut key to start running it~ After you press F5, a dialog may pop up asking whether you want to save. Just click Save.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230949.jpg"><img class="alignnone size-full wp-image-314" title="2011-02-18_230949" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230949.jpg" alt="" width="526" height="402" /></a>

7. Successfully run~ The expected result appears.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056.jpg"><img title="2011-02-18_231056" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056-540x393.jpg" alt="" width="540" height="393" /></a>
