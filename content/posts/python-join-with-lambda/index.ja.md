---
title: "Python Join with Lambda - よりカスタマイズできる Join"
date: 2016-12-13T16:05:52
slug: "python-join-with-lambda"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

プログラムを書く方なら、split() と join() はきっとおなじみでしょう。Python では String.join(list) を使って List を文字列に結合できます。たとえば ",".join(["A", "B", "C"]) は "A,B,C" という文字列を返します。逆に "A,B,C".split(",") を使えば List に分割できます。ただ、次のような、解決したくてもできなかった経験はありませんか？
<ul>
 	<li>文字列を結合するときに、各単語の先頭文字を大文字にしたい</li>
 	<li>List に数値が入っているが、join で扱うには文字列にする必要がある</li>
</ul>
これらの問題は List Comprehension で解決できます。たとえば型変換の部分は、次のように書けます。
<pre>nums = [1,2,3,4,5]
nums_str = [str(num) for num in nums]
print(",".join(nums_str))</pre>
では List Comprehension 以外に解決策はあるでしょうか？ きっと、sort のように lambda 関数を join に渡せないかと考えたこともあるはずです！


<!--more-->


実は join() 自体は lambda に対応していませんが、Functional Programing の reduce を使えば同じ効果を得られます！ 早速、サンプルコードを見てみましょう！ 次の例では、小文字の英語の姓名を List に格納して連結し、最後にすべて大文字にします。もちろん、これは良い例とは言えませんが、英語の姓名の先頭文字だけを大文字にしたい場合などにとても便利だと想像できると思います（私はまさにこのように使っています）。
<pre>from functools import reduce

name_list = ["lin", "xi", "zhe"]
name = reduce(lambda s1, s2 : s1.upper() + " " + s2.upper(), name_list)
print(name)</pre>
reduce は List の要素を前後 2 つずつ組にして lambda に渡します。つまり、この前後 2 つの引数をつなげるだけでよく、それは実は join がしていることと同じです。もちろん、もっと面白いこともできます。たとえば先頭文字だけを大文字にする場合は次のとおりです。
<pre>name_list = ["lin", "xi", "zhe"]

name = reduce(lambda s1, s2 : s1[0].upper() + s1[1:] + " " + s2[0].upper() + s2[1:], name_list)</pre>
参考資料： <a href="http://stackoverflow.com/questions/27436748/python-reduce-list-of-strings-string">StackOverflow - Python: reduce (list of strings) -&gt; string</a>
