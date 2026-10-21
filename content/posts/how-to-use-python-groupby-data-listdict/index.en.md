---
title: "How to Use Python GroupBy on Data (List+Dict)"
date: 2016-12-07T01:13:27
slug: "how-to-use-python-groupby-data-listdict"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

When working with data in Python, grouping by a certain key is a very common need. For example, when analyzing email logs, you might want to know how many emails were sent for each subject, or list the top five email providers for each subject. In a database, this is very simple. But what if you do not want to send the data to a database?

Besides Pandas, the powerful data processing library that can help with this, Python itself also has GroupBy built in!


<!--more-->


The itertools module has a method called groupby. You pass in a collection and specify a key, and it organizes items with the same key into something list-like (though it is not actually a list). Then you can either count them (the number of emails sent with the same subject), or list the data for each shared key separately (the top five email providers by subject).

Before you group, you need to sort the data by the key you want to group on. See the code below for the details (Python 3). Here, a lambda is used to get the field to use as the key.
<pre><span style="font-family: Courier;">from itertools import groupby</span>

<span style="font-family: Courier;">dicts = [</span>
<span style="font-family: Courier;"> {'name': 'A', 'age': 16},</span>
<span style="font-family: Courier;"> {'name': 'B', 'age': 18},</span>
<span style="font-family: Courier;"> {'name': 'C', 'age': 17},</span>
<span style="font-family: Courier;"> {'name': 'D', 'age': 16},</span>
<span style="font-family: Courier;"> {'name': 'E', 'age': 17}</span>
<span style="font-family: Courier;">]</span>

<span style="font-family: Courier;">dicts.sort(key=lambda d : d['age'])</span>

<span style="font-family: Courier;"># Group By Age Field</span>
<span style="font-family: Courier;">for key, groups in groupby(dicts, lambda d : d['age']):</span>
<span style="font-family: Courier;"> # print(list(groups))</span>
<span style="font-family: Courier;"> # print(len(list(groups)))</span>
<span style="font-family: Courier;"> print(key)</span>

<span style="font-family: Courier;"> for item in groups:</span>
<span style="font-family: Courier;">   print(item)</span>
<span style="font-family: Courier;"> print('-----')</span></pre>
<div></div>
