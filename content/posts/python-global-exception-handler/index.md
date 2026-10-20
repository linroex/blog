---
title: "Python Global Exception Handler"
date: 2017-01-02T15:00:12
slug: "python-global-exception-handler"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
---

一般來說例外處理不會是全域性質的，因為當我們將例外處理套用到全域時，我們很難確認問題發生在哪裡並處理，但少數情況下我們會需要撰寫出這樣的程式碼，以這次為例，我用 Python 撰寫程式去處理 webhook，但因為伺服器那邊送來的資訊太多樣化，我需要在將任何例外發生的時候，能夠把當環境資料印出來，方便事後除錯，這種時候就確實該使用 Global Exception Hook 的技巧。


<!--more-->


以例外處理的立場來說，全域的例外處理通常不是好事，在使用這邊所教授的技巧前，請務必了解自己在做什麼。

直接看程式碼吧！
<pre>import sys
 
def debug_exception_handle(exctype, value, traceback):
    print event
    print 'errorrrrrr'
    sys.__excepthook__(exctype, value, traceback)

sys.excepthook = debug_exception_handle</pre>
簡單說明一下，Python 有提供例外的 Hook 機制，透過 sys.excepthook 可以將指定的函式掛勾到例外的處理上，藉此達到「當例外發生時印出環境資訊」的需求，此外因為這是掛鉤的形式，所以你需要執行 sys.__excepthook 來讓原本的例外可以繼續上浮。
