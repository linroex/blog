---
title: "bash: warning: setlocale: LC_ALL: cannot change locale の対処法"
date: 2017-02-22T10:01:41
slug: "bash-warning-setlocale-lc_all-cannot-change-locale"
tags: ["Linux", "SSH"]
categories: ["SRE"]
draft: false
---

SSH でリモートサーバーにログインしたとき、「-bash: warning: setlocale: LC_ALL: cannot change locale」というエラーが表示されていませんか？ これは、SSH でリモートホストに接続すると、ローカルの LC_* 変数（ロケール）が自動的にリモートホストへ送信されるために起こります。サーバーが指定したロケールに対応していない場合、「-bash: warning: setlocale: LC_ALL: cannot change locale」というエラーになります！


<!--more-->


このエラーを解消する方法はいくつかあります。もっとも直接的な方法は、リモートサーバーに不足しているロケールを追加することです。ここでは zh_TW.UTF-8 を例にします。追加すべきロケールは、エラーメッセージの末尾を見ればわかります。
<pre>sudo locale-gen zh_tw.UTF-8

sudo update-locale</pre>
すべてのマシンにロケールを追加するのは面倒なので、SSH の LC_* 変数の自動送信をオフにして、リモートサーバーに既定のロケールを使わせることもできます。普段の操作が英語だけなら、大きな問題にはならないでしょう。

たとえば Mac では、/etc/ssh/ssh_config の中の SendEnv LANG LC_* をコメントアウトします。完了したら、次のようになります。
<pre>Host *
#   SendEnv LANG LC_*</pre>
