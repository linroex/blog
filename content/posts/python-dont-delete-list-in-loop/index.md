---
title: "千萬不要在迴圈裡面刪除陣列元素"
date: 2017-01-12T20:35:34
slug: "python-dont-delete-list-in-loop"
aliases: ["/posts/python-%e4%b8%8d%e8%a6%81%e5%9c%a8%e8%bf%b4%e5%9c%88%e8%a3%a1%e9%9d%a2%e5%88%aa%e9%99%a4%e9%99%a3%e5%88%97%e5%85%83%e7%b4%a0/"]
tags: ["Python"]
categories: []
---

「踩你千萬遍也不厭倦的愚蠢行為」，我一直以為錯誤的寫法只要遇過一次就會長記性，但今天在公司又踩地雷三小時，始終搞不懂問題在哪裡，最後很認真把程式碼重看過一次後發現... 原來又是一樣的問題。 一句話：「不要擅迴圈裡面刪除任何陣列元素」


<!--more-->


來看看這行語法，想想會有什麼問題發生：
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]

for i, value in enumerate(stus):
  if stus[i]['name'] == "C":
  del stus[i]

print(stus)</pre>
我們要求 name="C" 要被刪掉，但檢視結果卻發現只有一個 C 會被刪除。

想到原因了嗎？ 其實這和 i 有關，當你刪除 stus[i] 的時候，陣列的長度就被改變了，當 i = 3 時，我們把 stus[3] 刪除了，這時因為陣列長度改變，原本的 suts[4] 變成 suts[3] （後往前移），但迴圈的 i 會持續增加，所以迴圈會以為資料已經處理完畢，但實際上卻是後面的資料往前移動了。

相同的原理，會導致許多不可預期的情況發生，所以建議不要在迴圈裡面刪除陣列的元素，如果有這樣的需求，可以嘗試下面的兩種寫法：

可以用 List Comprehension 的情況來處理，或是類似的做法寫一個過濾器
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]

stus = [stu for stu in stus if stu['name'] != "C"]</pre>
<pre>stus = [{"name": "A"}, {"name": "B"}, {"name": "B"}, {"name": "C"}, {"name": "C"}]
new_stu = []

for i, stu in enumerate(stus):
  if stu['name'] != "C":
    new_stu.append(stu)

print(new_stu)</pre>
