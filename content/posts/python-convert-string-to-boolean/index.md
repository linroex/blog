---
title: "Python Convert String to Boolean"
date: 2016-12-08T00:18:21
slug: "python-convert-string-to-boolean"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
---

今天在撰寫 AWS Lambda 時因為從環境變數讀取設定的關係，需要把字串轉成布林來做判斷，一般的想法不外乎 Python 會幫你轉換，或是用 bool("True") 轉換就可以，首先其實 Python 是不會幫你轉換的，這點很重要！ Python 在形態方面其實是不會做自動轉換的，他只會很阿莎力的報錯，不過大家肯定想說用 bool() 轉換就沒問題了吧！？ 事實上，這個地雷害我今天搞了半小時才解決...


<!--more-->


事實上在 Python 裡面，你不管喂什麼給 bool() 他都只會回傳 True，只有 bool(0) 的時候是 False，包括以下這些情況都是回傳 True 哦：
<pre>bool("True")
bool("false")
bool("False")
bool("0")</pre>
是的別懷疑，你不管喂什麼給他，幾乎都只會獲得 True，一不小心把它放進條件裡面就會造成特異現象。

如果你想要把字串轉換成布林的話，建議使用 distutils.util 提供的 strtobool ，這是 Python 內建的模組，功能蠻強大的，可以參考下面的範例
<pre>from distutils.util import strtobool

strtobool("True")
strtobool("Yes")
strtobool("Y")
strtobool("true")</pre>
以上這些都可以正確轉換成 True 哦，根本就是神器阿！！！
