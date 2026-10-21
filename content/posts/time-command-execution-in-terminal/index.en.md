---
title: "How to Measure a Command's Execution Time in Terminal?"
date: 2017-01-27T23:58:26
slug: "time-command-execution-in-terminal"
tags: ["Linux"]
categories: ["SRE"]
draft: false
---

Have you ever wanted to measure how long the commands you run in Terminal take? Recently, because of a work requirement, I put together a file-sorting tool out of various commands. Performance requirements were strict and it had to finish within a specified time, so I looked into the handy time command, which can measure how long a command takes to run.


<!--more-->


The most intuitive way to measure execution time is to subtract the time before execution from the time after the program finishes. But that approach is somewhat troublesome. On Linux and macOS, you can simply put time in front of any command whose execution time you want to measure, and you will learn how much CPU the command used and how long it ran. For example, say I want to know how long curl takes:
<pre>time curl -XGET "https://coder.tw"</pre>
At the very bottom, you will see this line of text: curl -XGET "https://coder.tw" 0.01s user 0.02s system 2% cpu 1.325 total

This means curl took a total of 1.325 seconds to run, and used 2% CPU time.
