---
title: "【Python】踏入Python世界的第一步：HelloWorld(輸出文字與註解的寫法)"
date: 2011-02-20T09:00:54
slug: "python-hello-world-first-step"
aliases: ["/posts/%e3%80%90python%e3%80%91%e8%b8%8f%e5%85%a5python%e4%b8%96%e7%95%8c%e7%9a%84%e7%ac%ac%e4%b8%80%e6%ad%a5%ef%bc%9ahelloworld%e8%bc%b8%e5%87%ba%e6%96%87%e5%ad%97%e8%88%87%e8%a8%bb%e8%a7%a3%e7%9a%84/"]
tags: ["IDLE", "Python"]
categories: ["Python"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056.jpg"><img class="size-large wp-image-315 aligncenter" title="2011-02-18_231056" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056-540x393.jpg" alt="" width="540" height="393" /></a></p>
幾乎所有教程式語言的書籍，他的第一個練習程式都是HelloWorld，所謂的HelloWorld就是要讓程式輸出「HelloWorld」，而在這篇文章裡面我們會教大家寫出第一個Python的程式，並且簡單講解Python的一些用法


<!--more-->
1.建立一個【helloworld.py】的檔案，注意附檔名必須要是.py

所謂的py就是專屬於Python原始碼的一種附檔名，就類似C++的.cpp還有Java的.java

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224908.jpg"><img class="alignnone size-large wp-image-310" title="2011-02-18_224908" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224908-540x502.jpg" alt="" width="540" height="502" /></a>

2.對剛剛建立的檔案按右鍵，選擇【Edit with IDLE】

IDLE是Python官方提供的一個IDE工具，個人認為還蠻好用的～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225006.jpg"><img class="alignnone size-large wp-image-311" title="2011-02-18_225006" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225006-540x467.jpg" alt="" width="540" height="467" /></a>

3.輸入以下程式碼：
<pre lang="python">#C:Python31python.exe
# -*- coding:utf-8 -*-</pre>
簡單解釋這兩行的功能，第一行是設定直譯器所在的位置，第二行是設定程式碼使用utf-8的編碼，有第二行的設定可以避免掉很多錯誤的發生

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225412.jpg"><img class="alignnone size-full wp-image-312" title="2011-02-18_225412" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_225412.jpg" alt="" width="508" height="323" /></a>

4.然後輸入下面的程式碼：
<pre lang="python">print("HelloWorld")

text="HelloWorld_Text"
print(text)</pre>
這段程式碼裡面的print就是輸出的函式

第一行是輸出HelloWorld的意思

第三行則是輸出text變數的內容，而text變數的內容是HelloWorld_Text

5.再來就是要教大家Python裡的註解要怎麼寫

在Python裡面單行註解是使用#來開頭就是單行註解

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230809.jpg"><img class="alignnone size-full wp-image-313" title="2011-02-18_230809" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230809.jpg" alt="" width="526" height="402" /></a>

而多行註解則是連續三個單引號

例如：
<pre lang="python">'''
這是一個學習Python的練習程式
'''</pre>
上面這就是多行註解，被連續三個單引號框著的文字就會自動跳過不執行

6.最後程式碼寫一寫總要來執行吧～ 如果你按照本文的教學，使用IDLE來寫Python的話，按一下快捷鍵F5就會開始執行了～ 按下F5之後他可能會跳出一個對話方塊問你是否要儲存，就按Save就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230949.jpg"><img class="alignnone size-full wp-image-314" title="2011-02-18_230949" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_230949.jpg" alt="" width="526" height="402" /></a>

7.成功執行～ 出現預期中的結果

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056.jpg"><img title="2011-02-18_231056" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_231056-540x393.jpg" alt="" width="540" height="393" /></a>
