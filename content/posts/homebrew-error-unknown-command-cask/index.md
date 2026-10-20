---
title: "Homebrew - Error: Unknown command: cask"
date: 2016-12-23T02:11:29
slug: "homebrew-error-unknown-command-cask"
tags: ["Homebrew", "macOS"]
categories: ["Software"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-4.png"]
---

使用 Mac 的開發者想必對 Homebrew 都不陌生，也絕對少不了用 brew-cask 安裝程式的經驗吧，今天在使用 brew cask 安裝程式時，明明就確認 brew cask 有安裝成功，但每次呼叫 brew cask install xxx 時總是冒出錯誤訊息「Error: Unknown command: cask」，後來查了 Issue 才知道這好像是舊版的一個 Bug 目前已經修復了。


<!--more-->


詳細可看： <a href="https://github.com/caskroom/homebrew-cask/issues/23934">Bug report: "Error: Unknown command: cask"</a>

簡單講，如果你執行 brew update 之後持續出現「Error: Unknown command: cask」的話，可以輸入下面這行指令，他會幫你把 Homebrew 更新到最新的狀態，自然就可以解決問題囉！

當然，也要先確認是不是你真的沒安裝 brew-cask（笑）
<pre>cd $(brew --repo); git fetch; git reset --hard origin/master; brew update</pre>
如果要安裝 brew cask 的話可以輸入以下這行指令：
<pre>brew tap caskroom/cask</pre>
