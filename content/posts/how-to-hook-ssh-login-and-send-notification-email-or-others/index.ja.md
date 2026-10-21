---
title: "SSH ログインをフックして通知（メールなど）を送る方法"
date: 2016-07-30T11:01:44
slug: "how-to-hook-ssh-login-and-send-notification-email-or-others"
tags: ["SSH", "Linux"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2016/07/by-wlodek-428549_1280.jpg"]
draft: false
---

Google や Facebook にログインすると、セキュリティ向上のために通知メールが届きます。IT の人なら、「SSH でも同じことができないか」と考えたことがあるのではないでしょうか。どのユーザーが SSH でログインしても、システム管理者へ通知が送られれば、セキュリティに役立ちます。


<!--more-->


方法は 2 つあります。.bashrc や .zshrc にコマンドを書くか、PAM（Pluggable Authentication Modules for Linux）を使って SSH ログインのイベントにフックするかです。私は PAM を使うことをおすすめします。

この記事は Ubuntu / Debian 向けに書いています。
<h2>手順</h2>
vim や nano など任意のテキストエディタで /etc/pam.d/sshd を開き、カーソルを末尾に移動します。次の行をファイルに入力してください：
<pre>session optional pam_exec.so seteuid /root/notify.sh</pre>
これは、ログイン、ログアウト、その他 SSH セッションに関する操作が行われるたびに、SSH デーモンが "/root/notify.sh" を呼び出すという意味です。最後のパラメーターは、任意の Linux コマンドやファイルに置き換えられます。

2 番目のフィールドである "optional" は、notify.sh が失敗のステータスコードを返してもログインを続行させる、という意味です。"required" に設定すると、notify.sh が失敗したときにログインできなくなるため、"required" は使わないことをおすすめします！

次に /root/notify.sh を作成し、以下の内容をファイルに書き込んで、実行可能にしてください：
<pre>#! /bin/bash


if [ $PAM_TYPE == 'open_session' ]; then
    subject = "[$(hostname)] User $PAM_USER login from $PAM_RHOST at $(date)"
elif [ $PAM_TYPE == 'close_session' ]; then
    subject = "[$(hostname)] User $PAM_USER logout from $PAM_RHOST at $(date)"
fi

echo subject &gt; mail -s $subject root</pre>
PAM が notify.sh を実行するとき、いくつかの環境変数が設定されます。たとえば次のようなものです：
<ul>
 <li>PAM_TYPE：ユーザーがログインしたのかログアウトしたのかを判断するのに使います</li>
 <li>PAM_USER：ログインしたユーザー</li>
 <li>PAM_RHOST：リモートユーザーの IP アドレス</li>
 <li>PAM_SERVICE</li>
 <li>PAM_TTY</li>
</ul>
最後の行を置き換えれば、Slack や Telegram など、ほかの通知方法も使えます。私は現在、通知にメールを使っています。

PAM は同期的に動作すると考えられるので、通知の送信に長い時間がかかると、ログインも遅くなってしまいます。

この記事の参考資料：
<ul>
 <li><a href="http://askubuntu.com/questions/179889/how-do-i-set-up-an-email-alert-when-a-ssh-login-is-successful">How do I set up an email alert when a ssh login is successful?</a></li>
 <li><a href="http://blog.stalkr.net/2010/11/login-notifications-pamexec-scripting.html">Login notifications, pam_exec scripting</a></li>
</ul>
