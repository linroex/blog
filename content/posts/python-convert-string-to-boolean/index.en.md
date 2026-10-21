---
title: "Converting a String to a Boolean in Python"
date: 2016-12-08T00:18:21
slug: "python-convert-string-to-boolean"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

Today, while writing an AWS Lambda function, I needed to read a setting from an environment variable and convert it from a string to a boolean so I could use it in a condition. The obvious guesses are that Python will convert it automatically, or that `bool("True")` will do the job. But first of all, Python does not do automatic type conversion. This is important! It simply raises an error without any fuss. But surely you'd expect `bool()` to solve it, right?! In fact, this landmine cost me half an hour today...


<!--more-->


In Python, no matter what you pass to `bool()`, it returns `True`. The only exception is `bool(0)`, which returns `False`. The following cases also return `True`:
<pre>bool("True")
bool("false")
bool("False")
bool("0")</pre>
Yes, really. No matter what you pass in, you will almost always get `True`. If you accidentally put this into a condition, you will get strange behavior.

If you want to convert a string to a boolean, I recommend `strtobool` from `distutils.util`. It is a built-in Python module and quite powerful. See the examples below:
<pre>from distutils.util import strtobool

strtobool("True")
strtobool("Yes")
strtobool("Y")
strtobool("true")</pre>
All of these convert to `True` correctly. It's a real lifesaver!!!
