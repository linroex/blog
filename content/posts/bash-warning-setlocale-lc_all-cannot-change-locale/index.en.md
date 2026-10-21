---
title: "bash: warning: setlocale: LC_ALL: cannot change locale"
date: 2017-02-22T10:01:41
slug: "bash-warning-setlocale-lc_all-cannot-change-locale"
tags: ["Linux", "SSH"]
categories: ["SRE"]
draft: false
---

Seeing the error "-bash: warning: setlocale: LC_ALL: cannot change locale" when you log in to a remote server over SSH? You run into it because when SSH connects to a remote host, it automatically sends a copy of your local LC_* variables (the locale) to the remote host. If the server doesn't support the locale you specified, you'll get the error "-bash: warning: setlocale: LC_ALL: cannot change locale"!


<!--more-->


There are a few ways to fix this error. The most direct fix is to add the missing locale to the remote server. Here I'll use zh_TW.UTF-8 as an example. For the locale you need to add, check the end of the error message:
<pre>sudo locale-gen zh_tw.UTF-8

sudo update-locale</pre>
Adding the locale to every machine is a hassle. You can also turn off SSH's automatic sending of LC_* variables, so the remote server uses its own default locale. If you only work in English, this won't cause much trouble.

On a Mac, for example, comment out SendEnv LANG LC_* in /etc/ssh/ssh_config. Once that's done:
<pre>Host *
#   SendEnv LANG LC_*</pre>
