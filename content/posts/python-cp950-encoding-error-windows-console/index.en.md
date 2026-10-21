---
title: "Python 3 CP950 Error When Printing to the Windows Command Prompt"
date: 2017-02-21T23:59:09
slug: "python-cp950-encoding-error-windows-console"
tags: ["Python", "Windows"]
categories: ["Programming"]
draft: false
---

Today, while teaching some juniors how to program, I tried to print a line of Chinese text to the Command Prompt with Python, but I got the error "UnicodeEncodeError: 'cp950' codec can't encode character". I tried all kinds of methods without success, and in the end I found the answer by searching online.

When experienced developers see this error, their first instinct is to assume the string contains a special character, so they immediately add the ignore parameter, but that does not help. When I checked, the character that caused the problem was a Japanese character. As everyone knows, Python 3 uses Unicode strings by default, so it should not have trouble printing anything. It's not like we're dealing with the notorious Big5 again...


<!--more-->


After searching online, I learned that the problem was not with Python 3 at all. Strings in a Python program are stored as Unicode. When output goes to a terminal, Python checks the encoding the terminal uses and converts the Unicode string into an encoding the terminal supports. When you run Python on Linux, the conversion is to UTF-8. But when you run Python in the Windows Command Prompt, the conversion is to what is known as CP950 encoding, and the error happens during this conversion. However, if you save the string to a file or do other operations with it, there is no problem.

There are two ways to solve this. You can set the Command Prompt's encoding to UTF-8, or you can encode the string as CP950 before printing it in Python and ignore the error characters. Personally, I recommend setting the Command Prompt's encoding to UTF-8. Although you have to set it again every time you open the Command Prompt, if you make the adjustment on the program side for Windows, the program may run into problems when it is used cross-platform.

Enter the following command in the Command Prompt to set the encoding to UTF-8. You need to enter it again every time you open the Command Prompt:
<pre>chcp 65001</pre>
65001 is the code page number for UTF-8.

If you would rather handle it from the Python side, you can refer to the following example:
<pre>s = "Hello 你好"
print(s.encode("utf8").decode("cp950", "ignore"))</pre>
