---
title: "Homebrew - Error: Unknown command: cask"
date: 2016-12-23T02:11:29
slug: "homebrew-error-unknown-command-cask"
tags: ["Homebrew", "macOS"]
categories: ["Software"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-4.png"]
draft: false
---

If you're a Mac developer, you're surely familiar with Homebrew, and you've probably used brew-cask to install apps. Today, when I tried to install a program with brew cask, I kept getting the error "Error: Unknown command: cask" every time I ran brew cask install xxx, even though I had confirmed that brew cask was installed successfully. After searching the issues, I learned that this seems to be a bug in an older version, which has since been fixed.


<!--more-->


For details, see <a href="https://github.com/caskroom/homebrew-cask/issues/23934">Bug report: "Error: Unknown command: cask"</a>

In short, if you keep seeing "Error: Unknown command: cask" after running brew update, run the following command. It updates Homebrew to the latest state, which should solve the problem!

Of course, first make sure you didn't simply forget to install brew-cask (lol).
<pre>cd $(brew --repo); git fetch; git reset --hard origin/master; brew update</pre>
If you want to install brew cask, run the following command:
<pre>brew tap caskroom/cask</pre>
