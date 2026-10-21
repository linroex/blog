---
title: "Never Delete Items from a List Inside a Loop"
date: 2017-01-12T20:35:34
slug: "python-dont-delete-list-in-loop"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

"The foolish mistake I never get tired of stepping on, no matter how many times." I always thought that once you make a mistake, you will remember it for good. But today I lost three hours to a bug at work. I could not figure out where the problem was. Finally, I carefully reread the code and realized... it was the same problem again. In one sentence: "Never delete any array element inside a loop."


<!--more-->


Take a look at this code and think about what could go wrong:
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]

for i, value in enumerate(stus):
  if stus[i]['name'] == "C":
  del stus[i]

print(stus)</pre>
We want every item with name="C" to be removed, but the result shows that only one C is removed.

Did you figure out why? It has to do with `i`. When you delete `stus[i]`, the length of the array changes. When `i = 3`, we delete `stus[3]`. Because the length has changed, the original `suts[4]` becomes `suts[3]` (it shifts forward). But the loop's `i` keeps increasing, so the loop assumes all the data has been processed. In reality, the data behind it has moved forward.

The same principle can lead to all kinds of unexpected results, so I recommend not deleting array elements inside a loop. If you need to do this, you can try one of the following two approaches:

You can handle it with a list comprehension, or write a similar filter:
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]

stus = [stu for stu in stus if stu['name'] != "C"]</pre>
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]
new_stu = []

for i, stu in enumerate(stus):
  if stu['name'] != "C":
    new_stu.append(stu)

print(new_stu)</pre>
