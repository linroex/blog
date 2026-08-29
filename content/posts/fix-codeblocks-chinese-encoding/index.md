---
title: "解決Code::blocks中文亂碼的問題"
date: 2011-09-03T11:03:57
slug: "fix-codeblocks-chinese-encoding"
aliases: ["/posts/%e8%a7%a3%e6%b1%bacodeblocks%e4%b8%ad%e6%96%87%e4%ba%82%e7%a2%bc%e7%9a%84%e5%95%8f%e9%a1%8c/"]
tags: ["C++", "IDE", "Code::Blocks", "編碼"]
categories: ["C++", "IDE"]
---

Code::blocks是我個人喜歡使用的一個C/C++ IDE，但是之前一直有遇到一個問題，就是使用Code::blocks時完全不能使用中文，包含字串不能有中文，連註解也不能有中文，原本想說這是他本身的Bug，後來網友提醒才知道原來是預設編碼的問題！


<!--more-->
在這裡要先感謝網友：ef67891，他幫我解決了中文亂碼的問題！ 其實解決方法很簡單，只要修改Code::blocks存檔時的編碼，將他改成UTF8就可以囉～
<h2>解決教學</h2>
1.開啟Code:;blocks然後點選上方bar的「Settings」->「Editor」

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_105800.jpg"><img class="alignnone size-large wp-image-748" title="2011-09-03_105800" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_105800-540x405.jpg" alt="" width="540" height="405" /></a>

2.在「Use encoding when opening files」那裡，選擇「UTF-8」然後按「OK」即可

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110044.jpg"><img class="alignnone size-large wp-image-749" title="2011-09-03_110044" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110044-525x540.jpg" alt="" width="525" height="540" /></a>

3.可以使用中文囉～～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110253.jpg"><img class="alignnone size-large wp-image-750" title="2011-09-03_110253" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110253-540x405.jpg" alt="" width="540" height="405" /></a>
