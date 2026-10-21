---
title: "[VB] Replacing Text with the Replace Function"
date: 2009-04-17T12:19:00
slug: "vb-replace-function"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

If you want to replace part of a string with something else in VB, you can use the Replace function.

The syntax is as follows:
<pre lang="vb">StringName.replace(A,B)

</pre>
StringName is the name of the variable where your text is stored.

For example, say you store 123456 in S1.

Then you enter S1.replace(A,B)
<!--more-->


A and B are its two parameters.

A is the text to be replaced.

B is what it gets replaced with: XXXXX.

For example, say I store WERTSDFG in S1,

and I want to replace WERT with 123. The syntax is:

S1.replace(WERT,123)

That's it.
<pre lang="vb">--------------- Example program ----------

dim s1 = wertsdfg

console.writeline(s1)

console.writeline(s1.replace(wert,123))

console.readline()

</pre>
