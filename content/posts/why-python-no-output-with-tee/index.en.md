---
title: "Why Python Prints Nothing When Piped to tee"
date: 2018-06-16T01:12:08
slug: "why-python-no-output-with-tee"
tags: ["Python", "Linux"]
categories: ["Programming"]
draft: false
---

Recently I wrote a Slack bot in Python. Being lazy, I just print the log messages directly and save them to a file with the tee command. That way I can see the bot's activity in the console and keep the same information in a file. But when I combined Python's print() with tee, I found that the log file often had no content, or messages that should have appeared showed up much later. After some research, I learned that Python's print function checks where its output is going. If the output goes to a shell, it is written immediately. If it doesn't, the output is stored in a buffer and only written out once the buffer is full. So when you use Python with tee, you run into this buffering problem, and the expected output doesn't show up on the screen or in the file in time.


<!--more-->


When running Python, I originally wrote it like this:
<pre><code>python bot.py | tee log.txt
</code></pre>
Because Python automatically detects where its output is going, when it sees that the output is going to tee instead of a shell, it stores the messages in a buffer. As a result, when I opened log.txt, it was completely blank.

To avoid the Python stdout buffering problem, change it to the following:
<pre><code>python -u bot.py | tee log.txt
</code></pre>
