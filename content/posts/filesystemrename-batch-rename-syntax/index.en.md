---
title: "[VB.NET] Renaming Files with rename"
date: 2009-04-23T10:12:00
slug: "filesystemrename-batch-rename-syntax"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

Today I'm going to show you how to rename a file using a method that VB itself provides.

Its syntax is:
<pre lang="vb">Filesystem.rename(a,b)</pre>
a is the input file, that is, the file to be renamed.

b is the output file name.

Please note that both parameters a and b must be given in full form.

Suppose you want to rename the file c:123.txt to 456.txt. Then you enter:
<pre lang="vb">Filesystem.rename("c:123"."c:456.txt")</pre>
Be careful! Both of my parameters include the file extension, and both include the drive letter and folder name.

If the b parameter does not contain the full name, the renamed file will be moved to the program's root directory.

I hope that's all clear!

This syntax works with both 2008 and 2005, but I haven't tried it with VB6.
