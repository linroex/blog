---
title: "Python Join with Lambda - 更客製化的 Join"
date: 2016-12-13T16:05:52
slug: "python-join-with-lambda"
aliases: ["/posts/python-join-with-lambda-%e6%9b%b4%e5%ae%a2%e8%a3%bd%e5%8c%96%e7%9a%84-join/"]
tags: ["Python"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
---

寫程式的人對 split()、join() 兩個東西肯定不陌生，在 Python 裡面我們可以透過 String.join(list) 把 List 合併成字串，例如 ",".join(["A", "B", "C"]) 會回傳 "A,B,C" 字串，或是反過來透過 "A,B,C".split(",") 來拆成 List，但你一定有過這樣的需求卻無法解決吧：
<ul>
 	<li>把字串合併但首字大寫</li>
 	<li>List 裡面存的是數字，但 join 需要是字串才可以處理</li>
</ul>
這些問題可以透過 List Comprehension 解決，例如型態處理的部份可以像這樣撰寫語法：
<pre>nums = [1,2,3,4,5]
nums_str = [str(num) for num in nums]
print(",".join(nums_str))</pre>
但除了 List Comprehension 以外還有其他解法嗎？ 你肯定也想過像 sort 那樣傳送 lambda function 給 join 吧！


<!--more-->


事實上 join() 本身是不支援 Lambda 的，但其實我們可以透過 Functional Programing 的 reduce 異曲同工達到一樣的效果！ 請看範例程式碼吧！ 以下的範例程式碼將會把小寫的英文姓名存在 List 裡面，串接再一起後要全部變大寫；當然這不是一個好範例，但可以想像例如英文姓名首字大寫時，有了它就會很方便（我就是這樣用的）
<pre>from functools import reduce

name_list = ["lin", "xi", "zhe"]
name = reduce(lambda s1, s2 : s1.upper() + " " + s2.upper(), name_list)
print(name)</pre>
reduce 會把 List 的內容一前一後兩個一組丟給 lambda ，所以你只要把這一前一後兩個參數串再一起，其實就是 join 在做的事情，當然你也可以做些更有趣的事情，例如只有首字大寫：
<pre>name_list = ["lin", "xi", "zhe"]

name = reduce(lambda s1, s2 : s1[0].upper() + s1[1:] + " " + s2[0].upper() + s2[1:], name_list)</pre>
參考資料： <a href="http://stackoverflow.com/questions/27436748/python-reduce-list-of-strings-string">StackOverflow - Python: reduce (list of strings) -&gt; string</a>
