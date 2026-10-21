---
title: "How to Hook SSH Login and Send Notifications (Email or Others)"
date: 2016-07-30T11:01:44
slug: "how-to-hook-ssh-login-and-send-notification-email-or-others"
tags: ["SSH", "Linux"]
categories: ["SRE"]
images: ["%%IMG%%/wp-content/uploads/2016/07/by-wlodek-428549_1280.jpg"]
draft: false
---

When you first log in to Google or Facebook, they send you a notification email to improve security. I think many IT people wonder, "How can I do the same thing for SSH?" If every SSH login sends a notification to the system manager, that helps security.


<!--more-->


You have two options: write a command in your .bashrc or .zshrc, or use PAM (Pluggable Authentication Modules for Linux) to hook into the SSH login event. I recommend PAM.

This post is written for Ubuntu / Debian.
<h2>Instructions</h2>
Use any text editor (e.g., vim or nano) to open /etc/pam.d/sshd and move the cursor to the bottom. Type the following line into the file:
<pre>session optional pam_exec.so seteuid /root/notify.sh</pre>
This means that whenever you log in, log out, or do anything else with an SSH session, the SSH daemon will call "/root/notify.sh". You can replace the last parameter with any Linux command or file.

The second field, "optional", means that if notify.sh returns a failure status code, the login still goes through. If you set it to "required", you can't log in when notify.sh fails, so I recommend not using "required"!

Now create /root/notify.sh, put the content below into the file, and make it executable:
<pre>#! /bin/bash


if [ $PAM_TYPE == 'open_session' ]; then
    subject = "[$(hostname)] User $PAM_USER login from $PAM_RHOST at $(date)"
elif [ $PAM_TYPE == 'close_session' ]; then
    subject = "[$(hostname)] User $PAM_USER logout from $PAM_RHOST at $(date)"
fi

echo subject &gt; mail -s $subject root</pre>
When PAM runs notify.sh, it sets some environment variables, such as:
<ul>
 <li>PAM_TYPE: Use this to detect whether the user is logging in or out</li>
 <li>PAM_USER: The user who is logging in</li>
 <li>PAM_RHOST: The remote user's IP address</li>
 <li>PAM_SERVICE</li>
 <li>PAM_TTY</li>
</ul>
You can use other notification methods, such as Slack or Telegram, by replacing the last line. Currently I use email for notifications.

I believe PAM runs synchronously, so if sending the notification takes a long time, your login will be slow.

This post refers to:
<ul>
 <li><a href="http://askubuntu.com/questions/179889/how-do-i-set-up-an-email-alert-when-a-ssh-login-is-successful">How do I set up an email alert when a ssh login is successful?</a></li>
 <li><a href="http://blog.stalkr.net/2010/11/login-notifications-pamexec-scripting.html">Login notifications, pam_exec scripting</a></li>
</ul>
