---
title: "Homebrew で「Error: Unknown command: cask」が出るとき"
date: 2016-12-23T02:11:29
slug: "homebrew-error-unknown-command-cask"
tags: ["Homebrew", "macOS"]
categories: ["Software"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-4.png"]
draft: false
---

Mac で開発をしている方なら、Homebrew はおなじみでしょうし、brew-cask でアプリをインストールした経験もきっとあるでしょう。今日、brew cask でプログラムをインストールしようとしたところ、brew cask が正しくインストールされていることは確認済みだったのに、brew cask install xxx を実行するたびに「Error: Unknown command: cask」というエラーが表示されてしまいました。Issue を調べてみると、これは古いバージョンのバグで、現在はすでに修正されているようでした。


<!--more-->


詳しくは <a href="https://github.com/caskroom/homebrew-cask/issues/23934">Bug report: "Error: Unknown command: cask"</a> をご覧ください。

簡単に言うと、brew update の後も「Error: Unknown command: cask」が出続ける場合は、次のコマンドを実行してください。Homebrew が最新の状態に更新されるので、問題が解決するはずです！

もちろん、その前に brew-cask を単に入れ忘れていないかも確認してくださいね（笑）
<pre>cd $(brew --repo); git fetch; git reset --hard origin/master; brew update</pre>
brew cask をインストールする場合は、次のコマンドを入力してください：
<pre>brew tap caskroom/cask</pre>
