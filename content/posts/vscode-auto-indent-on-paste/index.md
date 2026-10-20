---
title: "Visual Studio Code - 貼上程式碼後自動整理縮排"
date: 2017-02-15T09:25:59
slug: "vscode-auto-indent-on-paste"
aliases: ["/posts/visual-studio-code-%e8%b2%bc%e4%b8%8a%e7%a8%8b%e5%bc%8f%e7%a2%bc%e5%be%8c%e8%87%aa%e5%8b%95%e7%ac%a6%e5%90%88%e7%b8%ae%e6%8e%92/"]
tags: ["Visual Studio Code"]
categories: ["Programming"]
---

從 Sublime Text 切換到 <a href="https://github.com/Microsoft/vscode/">Visual Studio Code</a> ( 以下簡稱 VS Code ) 的開發者想必都很懷念「Paste and Indent」的功能吧！ 寫程式時不可免的需要複製貼上程式碼，貼上後縮排往往會亂掉，必須要手動在整理一次，而在 Sublime Text 有提供所謂的 Paste and Indent 功能可以讓你貼上的程式碼自動符合當前檔案的縮排方式，而 VS Code 也有類似功能，但原理不太一樣且需要到設定檔上開啟。


<!--more-->


和 Sublime Text 不同，在 <a href="https://github.com/Microsoft/vscode/">VS Code</a> 裡面「Paste and Indent」不是快捷鍵，而是直接掛鉤在「貼上」上面，只要到設定檔裡面將 editor.formatOnPaste 設為 true，之後你的每次貼上都會自動縮排。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-15-上午9.17.14.jpg"><img class="alignnone size-large wp-image-7441" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-15-上午9.17.14-1024x801.jpg" alt="" width="660" height="516" /></a>
<pre>"editor.formatOnPaste": true</pre>
不過和 Sublime Text 略有不同的是 VS Code 的 「formatOnPaste」其實是綁定程式語言，而不是真正的「符合縮排貼上」，舉例來說 VS Code 預設不支援 erb 格式（Rails Template File）所以我另外安裝了 Rails Plugin，但這個外掛卻沒有支援 formatOnPaste，所以當我的檔案格式是 erb 時，貼上的程式碼不會自動縮排；又或者檔案格式是預設的 PlainText，則 formatOnPaste 也可能無效。

更嚴格說來，VS Code 的 formatOnPaste 比較像是程式碼美化工具，不是讓你貼上的程式碼符合縮排，而是用 Coding Style 規定的方式把程式碼格式化。
