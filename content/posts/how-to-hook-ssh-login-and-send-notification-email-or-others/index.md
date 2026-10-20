---
title: "How to hook SSH Login and send notification (email or others)"
date: 2016-07-30T11:01:44
slug: "how-to-hook-ssh-login-and-send-notification-email-or-others"
tags: ["SSH", "Linux"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2016/07/by-wlodek-428549_1280.jpg"]
---

When you first time login to Google, Facebook, It will send a notification email for you to improve security. I think many IT think "How to make SSH to same thing" right? If any user login ssh can send notify to system manager, It was help for security.


<!--more-->


You have two way can do, write cmd in your .bashrc / .zshrc, or use pam (Pluggable Authentication Modules for Linux) to hook ssh login event, I recommend use pam to do this!

This post is write for Ubuntu / Debian.
<h2>Instruction</h2>
Use any text editor (ex. vim, nano) to open /etc/pam.d/sshd and move cursor to bottom. Type next line into file:
<pre>session optional pam_exec.so seteuid /root/notify.sh</pre>
It mean when you login/logout or do something about ssh session, ssh daemon will call "/root/notify.sh", so you can replace the last parameter with any linux cmd or file.

The second parameter is optional, It mean if notify.sh return fail status code is ok, If you set as required, you can't login when notify.sh return fail... so I recommend don't set required!

And now create /root/notify.sh, put below content into file and set It as executable:
<pre>#! /bin/bash


if [ $PAM_TYPE == 'open_session' ]; then
    subject = "[$(hostname)] User $PAM_USER login from $PAM_RHOST at $(date)"
elif [ $PAM_TYPE == 'close_session' ]; then
    subject = "[$(hostname)] User $PAM_USER logout from $PAM_RHOST at $(date)"
fi

echo subject &gt; mail -s $subject root</pre>
When pam exec notify.sh, It will set some environment variable, like:
<ul>
 	<li>PAM_TYPE: Use this to detect user login or logout</li>
 	<li>PAM_USER: Which user be login</li>
 	<li>PAM_RHOST: Remote user ip</li>
 	<li>PAM_SERVICE</li>
 	<li>PAM_TTY</li>
</ul>
You can use other notify way, ex: slack, telegram...etc to replace last line, currently I use mail to do notify.

I think pam is in sync model, so If you spend so many time to send notification, You login will be slow.

This post refer by:
<ul>
 	<li><a href="http://askubuntu.com/questions/179889/how-do-i-set-up-an-email-alert-when-a-ssh-login-is-successful">How do I set up an email alert when a ssh login is successful?</a></li>
 	<li><a href="http://blog.stalkr.net/2010/11/login-notifications-pamexec-scripting.html">Login notifications, pam_exec scripting</a></li>
</ul>
