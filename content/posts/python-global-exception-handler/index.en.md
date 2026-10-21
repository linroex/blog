---
title: "Python Global Exception Handler"
date: 2017-01-02T15:00:12
slug: "python-global-exception-handler"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

Normally, exception handling should not be global, because when you apply exception handling globally, it becomes hard to pinpoint where the problem occurred and handle it. But in rare cases, you do need to write code like this. For example, this time I wrote a Python program to process webhooks. The information the server sends is very varied, so whenever an exception occurs, I needed to print out the environment data so I could debug it afterward. This is exactly when you should use the Global Exception Hook technique.


<!--more-->


From the standpoint of exception handling, global exception handling is usually not a good idea. Before using the technique taught here, make sure you understand what you are doing.

Let's look at the code directly!
<pre>import sys
 
def debug_exception_handle(exctype, value, traceback):
    print event
    print 'errorrrrrr'
    sys.__excepthook__(exctype, value, traceback)

sys.excepthook = debug_exception_handle</pre>
To briefly explain: Python provides an exception hook mechanism. With `sys.excepthook`, you can attach a function to exception handling, which achieves the goal of "printing environment information when an exception occurs." Also, because this is a hook, you need to call `sys.__excepthook` so that the original exception can continue to propagate upward.
