---
title: "[Firefox 4] FireSSH: An Add-on for Making SSH Connections Directly from Firefox"
date: 2011-04-08T08:00:40
slug: "firefox-extension-firessh-ssh"
tags: ["Firefox", "SSH"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003704.jpg"><img class="size-large wp-image-4992 aligncenter" style="border: 1px solid black;" title="2011-04-05_003704" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003704-520x254.jpg" alt="" width="520" height="254" /></a></p>
If you use a VPS or play with Linux, you're probably no stranger to SSH. It's something every Linux user has to learn. SSH is like remote control, except it's text-based instead of graphical. Normally I use PuTTY for SSH connections. On iOS devices (iPhone, iPad, and so on), I use iSSH. But what about in a browser? With the FireSSH add-on, you can make SSH connections right while you browse, without opening another program~
<h2>
<!--more-->
FireSSH Installation Tutorial</h2>
P.S. FireSSH currently only works on Firefox 4.0.

1. Open Firefox, then go to the add-ons page

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003919.jpg"><img class="alignnone size-large wp-image-4993" title="2011-04-05_003919" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003919-520x412.jpg" alt="" width="520" height="412" /></a>

2. Search for 【FireSSH】 and click 【Install】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004100.jpg"><img class="alignnone size-large wp-image-4994" title="2011-04-05_004100" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004100-520x412.jpg" alt="" width="520" height="412" /></a>

3. Installing....

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004118.jpg"><img class="alignnone size-large wp-image-4995" title="2011-04-05_004118" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004118-520x412.jpg" alt="" width="520" height="412" /></a>

4. You need to restart Firefox after installing for it to take effect

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004150.jpg"><img class="alignnone size-large wp-image-4996" title="2011-04-05_004150" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004150-520x412.jpg" alt="" width="520" height="412" /></a>
<h2>FireSSH Usage Tutorial</h2>
1. Just type ssh:address:port in the address bar.

Here is what ssh:address:port means:
<ul>
	<li>address is the destination IP address or hostname for the SSH connection</li>
	<li>port is the port your SSH uses. The default is 22, so unless you have changed it, you don't need to specify a port</li>
</ul>
For example, if I want to connect to my own machine via SSH, and my SSH uses port 66, I would enter:

ssh:localhost:66

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004924.jpg"><img class="alignnone size-large wp-image-4997" title="2011-04-05_004924" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004924-520x424.jpg" alt="" width="520" height="424" /></a>

2. It will ask you for your username and password

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005030.jpg"><img class="alignnone size-full wp-image-4998" title="2011-04-05_005030" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005030.jpg" alt="" width="275" height="190" /></a>

3. Connecting

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005039.jpg"><img class="alignnone size-large wp-image-4999" title="2011-04-05_005039" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005039-520x427.jpg" alt="" width="520" height="427" /></a>

4. Connected successfully~ Commands work normally too

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005136.jpg"><img class="alignnone size-large wp-image-5000" title="2011-04-05_005136" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005136-520x427.jpg" alt="" width="520" height="427" /></a>

&nbsp;
