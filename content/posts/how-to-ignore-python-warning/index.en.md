---
title: "How to Ignore Python Warnings"
date: 2023-03-12T13:25:45
slug: "how-to-ignore-python-warning"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<p>While writing Python, I sometimes run into warnings that either can't be solved or don't matter much. For example, while using OpenPyxl, it kept showing me: <code> warn("Workbook contains no default style, apply openpyxl's default")</code>. This warning tells me that OpenPyxl will automatically apply its default style to the file I load. And how do you fix it? You open the Excel file in Office and save it again. In my case this warning doesn't matter much, because my program uses only the contents of the Excel file, and the style has no effect on it.</p>
<p>When I see a warning, my habit is still to check and think about what's causing it. If I confirm it doesn't affect me, I'll ignore it in the code, rather than relying on the developer's memory that "this warning doesn't matter." It's not simply out of sight, out of mind. It's about building the good habit of "dealing with every warning I see."</p>
<!--more-->



<p>But how do you ignore warnings correctly? The common approach is to ignore "all warnings" outright. For example, the following patterns all do that. I don't recommend this approach, because it's just "out of sight, out of mind." Even if they're only warnings, that doesn't mean they're unimportant.</p>
<p><strong>Do not use the following</strong></p>
<pre class="wp-block-code"><code>import warnings

warnings.filterwarnings("ignore")

warnings.simplefilter("ignore")

warnings.filterwarnings("ignore", category=DeprecationWarning)</code></pre>
<p>Python's warnings library lets you control whether warnings are shown. The patterns above are basically global, or ignore a whole category. I'm not a big fan of this kind of ignoring, because the granularity is too coarse, and you might accidentally ignore important warnings too.</p>
<p>What I recommend is to filter based on the text of the warning, for example:</p>
<pre class="wp-block-code"><code>import warning

warning.filterwarnings("ignore", message="Workbook contains no default style")</code></pre>
<p>The code above ignores warnings whose message starts with "Workbook contains". Alternatively, you can use the following approach, which handles only the warnings inside the with block:</p>
<pre class="wp-block-code"><code>import warnings

with warnings.catch_warnings(record=True):
	warnings.simplefilter("always")
	myexcelfile = pd.read_excel(easy_payfile, engine="openpyxl")</code></pre>
