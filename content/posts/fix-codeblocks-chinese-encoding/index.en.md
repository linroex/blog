---
title: "Fixing Chinese Garbled Text in Code::Blocks"
date: 2011-09-03T11:03:57
slug: "fix-codeblocks-chinese-encoding"
tags: ["IDE", "C++"]
categories: ["Programming"]
draft: false
---

Code::Blocks is a C/C++ IDE that I personally like to use, but I kept running into one problem: with Code::Blocks, I couldn't use Chinese at all. Strings couldn't contain Chinese, and even comments couldn't. I originally thought it was a bug in the program itself, but a fellow user reminded me that it was actually a default encoding issue!


<!--more-->
First, I want to thank the netizen ef67891, who helped me solve the Chinese garbled text problem! The fix is actually very simple: just change the encoding Code::Blocks uses when saving files to UTF-8, and you're all set~
<h2>Fix Tutorial</h2>
1. Open Code::Blocks, then click "Settings" -> "Editor" on the top bar

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_105800.jpg"><img class="alignnone size-large wp-image-748" title="2011-09-03_105800" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_105800-540x405.jpg" alt="" width="540" height="405" /></a>

2. Under "Use encoding when opening files", select "UTF-8", then click "OK" and you're done

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110044.jpg"><img class="alignnone size-large wp-image-749" title="2011-09-03_110044" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110044-525x540.jpg" alt="" width="525" height="540" /></a>

3. You can use Chinese now~~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110253.jpg"><img class="alignnone size-large wp-image-750" title="2011-09-03_110253" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110253-540x405.jpg" alt="" width="540" height="405" /></a>
