---
title: "[VB] Replace 関数で文字列を置換する"
date: 2009-04-17T12:19:00
slug: "vb-replace-function"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

VB で文字列の一部を別の内容に置き換えたい場合は、Replace 関数を使えます。

構文は次のとおりです。
<pre lang="vb">文字列名.replace(A,B)

</pre>
「文字列名」の部分には、文字列を格納している変数の名前を書きます。

たとえば、S1 に 123456 を格納しておきます。

その場合は S1.replace(A,B) と入力します。
<!--more-->


A と B は、この関数の 2 つの引数です。

A は置き換えられる文字列です。

B は置き換え後の文字列（XXXXX）です。

例えば、S1 に WERTSDFG を格納しておき、その中の WERT を 123 に置き換えたいとします。その場合の構文は次のとおりです。

S1.replace(WERT,123)

これで完了です。
<pre lang="vb">--------------- サンプルプログラム ----------

dim s1 = wertsdfg

console.writeline(s1)

console.writeline(s1.replace(wert,123))

console.readline()

</pre>
