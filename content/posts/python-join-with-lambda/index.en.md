---
title: "Python Join with Lambda - A More Customizable Join"
date: 2016-12-13T16:05:52
slug: "python-join-with-lambda"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

If you write code, you're surely familiar with split() and join(). In Python, you can use String.join(list) to merge a List into a string. For example, ",".join(["A", "B", "C"]) returns the string "A,B,C". Going the other way, "A,B,C".split(",") splits it into a List. But have you ever run into needs like these that you couldn't solve?
<ul>
 	<li>Joining strings while capitalizing the first letter of each one</li>
 	<li>The List holds numbers, but join needs strings to work with them</li>
</ul>
These problems can be solved with List Comprehension. For example, the type conversion part can be written like this:
<pre>nums = [1,2,3,4,5]
nums_str = [str(num) for num in nums]
print(",".join(nums_str))</pre>
But are there other solutions besides List Comprehension? I bet you've also thought about passing a lambda function to join, the way you can with sort!


<!--more-->


In fact, join() itself doesn't support lambda, but we can get the same effect with reduce from Functional Programing! Here's the example code. The example below stores lowercase English names in a List, joins them together, and then makes everything uppercase. Of course, this isn't a great example, but you can imagine how handy it is when, for instance, you want to capitalize the first letter of English names (that's exactly how I use it).
<pre>from functools import reduce

name_list = ["lin", "xi", "zhe"]
name = reduce(lambda s1, s2 : s1.upper() + " " + s2.upper(), name_list)
print(name)</pre>
reduce passes the List's items to the lambda two at a time, one after another, so all you have to do is combine those two arguments. That's essentially what join does. Of course, you can also do more interesting things, such as capitalizing only the first letter:
<pre>name_list = ["lin", "xi", "zhe"]

name = reduce(lambda s1, s2 : s1[0].upper() + s1[1:] + " " + s2[0].upper() + s2[1:], name_list)</pre>
References: <a href="http://stackoverflow.com/questions/27436748/python-reduce-list-of-strings-string">StackOverflow - Python: reduce (list of strings) -&gt; string</a>
