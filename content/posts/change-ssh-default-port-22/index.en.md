---
title: "How to Change the Default SSH Port 22 to Another Port?"
date: 2011-04-16T10:56:20
slug: "change-ssh-default-port-22"
tags: ["SSH", "VPS"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105528.jpg"><img class="size-large wp-image-5027 aligncenter" title="2011-04-16_105528" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105528-520x437.jpg" alt="" width="520" height="437" /></a>▲▲With SSH, you can do a lot of work on a remote host</p>
SSH comes built into almost every Linux system. It makes it easy to connect to and manage your host. Once you are connected over SSH, you can do a lot of work on your server. But that also makes SSH a likely target for attacks. The default SSH port is 22, so if someone guesses your password, your server is in serious danger. That is why this post covers a second layer of protection: changing the default port. With that in place, an attacker needs to know not only your password, but also which port you are using.


<!--more-->
Step 1: Log in to your host and go to the **/etc/ssh** folder.

Command: cd /etc/ssh

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104321.jpg"><img class="alignnone size-large wp-image-5021" title="2011-04-16_104321" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104321-520x437.jpg" alt="" width="520" height="437" /></a>

Step 2: Open the sshd_config configuration file.

Command: vi sshd_config

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104506.jpg"><img class="alignnone size-large wp-image-5022" title="2011-04-16_104506" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104506-520x437.jpg" alt="" width="520" height="437" /></a>

Step 3: Near the top of the file, there should be a line that reads **Port 22**. Change 22 to the port you want to use. Keep in mind that ports such as 80, 20, 21, and 25 may already be used by other services, so you need to choose a port that no other service is using.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104619.jpg"><img class="alignnone size-large wp-image-5023" title="2011-04-16_104619" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104619-520x437.jpg" alt="" width="520" height="437" /></a>

After you change the port, remember to remove the # at the beginning of that line. Otherwise, the SSH program will not read the setting.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104949.jpg"><img class="alignnone size-large wp-image-5024" title="2011-04-16_104949" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104949-520x437.jpg" alt="" width="520" height="437" /></a>

Step 4: Save the sshd_config file, then restart the sshd service.

Command: service sshd restart

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105127.jpg"><img class="alignnone size-large wp-image-5025" title="2011-04-16_105127" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105127-520x437.jpg" alt="" width="520" height="437" /></a>

Step 5: From now on, you can no longer connect over SSH on the default port 22. Connect using the port you just set instead.

&nbsp;
