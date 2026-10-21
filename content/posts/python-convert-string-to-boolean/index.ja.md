---
title: "Python で文字列を真偽値（bool）に変換する"
date: 2016-12-08T00:18:21
slug: "python-convert-string-to-boolean"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

今日、AWS Lambda を書いていたところ、環境変数から読み込んだ設定を条件判定に使うために、文字列を真偽値に変換する必要がありました。ふつうに考えると、Python が自動で変換してくれるか、`bool("True")` で変換できると思いますよね。しかし、まず大事なことですが、Python は型の自動変換を行いません。エラーは潔く出すだけです。では `bool()` を使えば問題ないと思いますよね？ ところが、これが地雷でした……。今日は30分もこの地雷に時間を取られてしまいました……


<!--more-->


実は Python では、`bool()` に何を渡しても `True` が返ってきます。例外は `bool(0)` で、こちらは `False` です。以下のような場合も `True` が返ります：
<pre>bool("True")
bool("false")
bool("False")
bool("0")</pre>
はい、本当です。何を渡しても、ほとんどの場合 `True` しか返ってきません。うっかり条件式に入れてしまうと、思わぬ挙動を引き起こします。

文字列を真偽値に変換したい場合は、Python に標準で組み込まれている `distutils.util` が提供する `strtobool` を使うのがおすすめです。なかなか強力なモジュールです。以下の例を参考にしてください：
<pre>from distutils.util import strtobool

strtobool("True")
strtobool("Yes")
strtobool("Y")
strtobool("true")</pre>
これらはすべて正しく `True` に変換されます。まさに神ツールです！！！
