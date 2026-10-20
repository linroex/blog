---
title: "bash: warning: setlocale: LC_ALL: cannot change locale"
date: 2017-02-22T10:01:41
slug: "bash-warning-setlocale-lc_all-cannot-change-locale"
tags: ["Linux", "SSH"]
categories: ["SRE"]
---

用 SSH 登入遠端伺服器時，看到「-bash: warning: setlocale: LC_ALL: cannot change locale」的錯誤訊息嗎？ 會遇到它是因為 SSH 連線上遠端主機時，會自動將本機的 LC_* 變數（locale）傳送一份到遠端主機，如果伺服器上不支援你指定的語系，就會出現「-bash: warning: setlocale: LC_ALL: cannot change locale」錯誤啦！


<!--more-->


要解決這個錯誤，有幾種做法，最治標的做法是幫遠端伺服器補上缺少的語系，這邊以 zh_TW.UTF-8 舉例，至於你需要補上的語系，可以看錯誤訊息的最後面：
<pre>sudo locale-gen zh_tw.UTF-8

sudo update-locale</pre>
幫每台機器都補上語系很麻煩，你也可以將 SSH 的自動傳送 LC_* 功能關掉，讓遠端伺服器用它預設的語系，如果你的操作都是英文，其實不會有太大問題。

以 Mac 為例，在 /etc/ssh/ssh_config 裡面，把 SendEnv LANG LC_* 註解掉即可，完成後：
<pre>Host *
#   SendEnv LANG LC_*</pre>
