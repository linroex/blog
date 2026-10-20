---
title: "Python 3 在 Windows 命令提示字元輸出時遇到 CP950 錯誤"
date: 2017-02-21T23:59:09
slug: "python-cp950-encoding-error-windows-console"
aliases: ["/posts/python-3-%e5%9c%a8-windows-%e5%91%bd%e4%bb%a4%e6%8f%90%e7%a4%ba%e5%ad%97%e5%85%83%e8%bc%b8%e5%87%ba%e6%99%82%e9%81%87%e5%88%b0-cp950-%e9%8c%af%e8%aa%a4/"]
tags: ["Python", "Windows"]
categories: ["Programming"]
---

今天在教學弟妹寫程式時，用 Python 印出一段中文字到命令提示字元，卻遇到「UnicodeEncodeError: 'cp950' codec can't encode character」這個錯誤，嘗試了各種方法都無法解決，最後爬了文章才搞懂是怎麼回事。

看到這段錯誤，有經驗的開發者直覺就會認定是字串裡面有特殊字元，立馬給它加上 ignore 參數卻沒有效果，我遇到的情況檢查後發現是一個日文字，但眾所皆知 Python 3 預設使用 Unicode 字串，不應該會有無法輸出的問題才對，又不是萬惡的 Big5...


<!--more-->


後來爬了文章才知道，原來問題根本不是出在 Python 3 身上，Python 程式內的字串都是以 Unicode 方式儲存，當輸出到 Terminal 上面時，Python 會檢查終端機使用的編碼，並將 Unicode 字串轉成 Terminal 支援的編碼，當我們在 Linux 下執行時會轉換成 UTF8，但如果是在 Windows 的命令提示字元下執行 Python，則會轉成所謂的 CP950 編碼，在這個轉換的過程中發生錯誤，但如果今天你直接將字串存成檔案或做其他操作，是不會有問題的。

解決方法有兩種，你可以將命令提示字元的編碼設為 UTF8，或是在 Python 輸出之前先將字串編碼成 CP950 並忽略錯誤字元，個人建議將命令提示字元的編碼設為 UTF8，雖然每次開啟命令提示字元都要重設一次，但如果從程式端為 Windows 做調整，這支程式要跨平台使用時反而可能出問題。

在命令提示字元輸入這段指令，即可將編碼設為 UTF8，但每次開啟命令提示字元都要再輸入一次：
<pre>chcp 65001</pre>
65001 是 UTF8 的編號。

如果你希望從 Python 下手，則可以參考以下範例：
<pre>s = "Hello 你好"
print(s.encode("utf8").decode("cp950", "ignore"))</pre>
