---
title: "[Linux] How to Change a User Password (Also for Changing the SSH Password on iOS)"
date: 2011-03-18T15:59:06
slug: "linux-change-user-password"
tags: ["Linux", "SSH"]
categories: ["SRE"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_160128.jpg"><img class="size-large wp-image-4913 aligncenter" title="2011-03-18_160128" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_160128-520x395.jpg" alt="" width="520" height="395" /></a>

On Linux systems, for security reasons, every account must have a password. A user must enter the correct password to log in to the system. This article shows you how to change account passwords when you manage a Linux host or a VPS. The same method also applies to jailbroken iPads and iPhones and other iOS devices. iOS's default password is "alpine," so if you never change it and your iOS device is jailbroken, it could be attacked.
<h2>
<!--more-->
Changing a Linux User's Password:</h2>
1.Connect to your Linux host, then switch to the user whose password you want to change. For example, to change root's password, you must log in as root first.

If you are using an iOS device, to change the password, log in as the root account first. The default password is alpine. Then follow the steps below to change it.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_154627.jpg"><img class="alignnone size-large wp-image-4907" title="2011-03-18_154627" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_154627-520x337.jpg" alt="" width="520" height="337" /></a>

2.Type passwd, then type the new password and press Enter.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155428.jpg"><img class="alignnone size-large wp-image-4908" title="2011-03-18_155428" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155428-520x337.jpg" alt="" width="520" height="337" /></a>

3.Type the password again and press Enter.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155556.jpg"><img class="alignnone size-large wp-image-4909" title="2011-03-18_155556" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155556-520x337.jpg" alt="" width="520" height="337" /></a>

4.When you see the following message, the password has been changed successfully.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155625.jpg"><img class="alignnone size-large wp-image-4910" title="2011-03-18_155625" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155625-520x337.jpg" alt="" width="520" height="337" /></a>
