---
title: "[Ubuntu] ADSL (PPPoE) Internet Setup Guide - pppoeconf"
date: 2010-12-15T08:00:40
slug: "ubuntu-adsl-pppoe-pppoeconf"
tags: ["Ubuntu", "Networking"]
categories: ["Hardware"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231404.jpg"><img class="size-full wp-image-4199 aligncenter" title="2010-12-13_231404" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231404.jpg" alt="" width="402" height="330" /></a></p>
Nowadays almost every household uses PPPoE to connect to the internet. If you signed up for ADSL, or if you need a modem to get online, you have to set up PPPoE before Ubuntu can connect. If I remember correctly, setting up PPPoE used to be a real hassle in older versions of Ubuntu. But after I came back to Ubuntu 10.04 recently, I found that the newer Ubuntu already includes a command called pppoeconf that lets you set up PPPoE quickly.

Addendum: I've heard that pppoeconf is still slow and there are faster ways to do it, orz... But compared with the version I used before, pppoeconf is actually pretty fast XD


<!--more-->
1. After you log in to Ubuntu, open the Terminal and enter the following command:

sudo pppoeconf

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-001.png"><img class="alignnone size-large wp-image-4185" title="2010-12-13-001" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-001-520x323.png" alt="" width="520" height="323" /></a>

2. Next, enter the system password you set when you installed Ubuntu. The screen will not show what you type, so after entering the password, just press Enter. Don't worry about whether anything shows up on the screen.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-002.png"><img class="alignnone size-large wp-image-4186" title="2010-12-13-002" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-002-520x345.png" alt="" width="520" height="345" /></a>

3. Next, a window appears about Ethernet devices and so on. It is only checking whether your network card and local network were detected, so just click Yes. (If no devices are found at all, your network card may not be supported by Ubuntu... in that case, click No...)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-003.png"><img class="alignnone size-large wp-image-4187" title="2010-12-13-003" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-003-520x345.png" alt="" width="520" height="345" /></a>

4. If you see this window, just click Yes. It appears because I had already set up PPPoE before.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-004.png"><img class="alignnone size-large wp-image-4188" title="2010-12-13-004" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-004-520x345.png" alt="" width="520" height="345" /></a>

5. Click Yes here as well.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-005.png"><img class="alignnone size-large wp-image-4189" title="2010-12-13-005" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-005-520x345.png" alt="" width="520" height="345" /></a>

6. This is for the account name you use when going online. Clear the existing text, type your account name, and then press Enter.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_225943.jpg"><img class="alignnone size-large wp-image-4190" title="2010-12-13_225943" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_225943-520x369.jpg" alt="" width="520" height="369" /></a>

7. This is for the password you use when going online. Clear the existing text, type your password, and then press Enter.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230012.jpg"><img class="alignnone size-large wp-image-4191" title="2010-12-13_230012" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230012-520x368.jpg" alt="" width="520" height="368" /></a>

8. This is about the DNS server. Just click Yes.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230526.jpg"><img class="alignnone size-large wp-image-4192" title="2010-12-13_230526" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230526-520x368.jpg" alt="" width="520" height="368" /></a>

9. Click Yes here too, and you're good to go~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230832.jpg"><img class="alignnone size-large wp-image-4193" title="2010-12-13_230832" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230832-520x366.jpg" alt="" width="520" height="366" /></a>

10. Click Yes here as well. This way, the connection is made automatically every time you start the computer, so you don't have to connect manually anymore.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231003.jpg"><img class="alignnone size-large wp-image-4194" title="2010-12-13_231003" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231003-520x368.jpg" alt="" width="520" height="368" /></a>

11. This asks whether you want to activate the connection right away. There's no reason to say no, right? XD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231057.jpg"><img class="alignnone size-large wp-image-4195" title="2010-12-13_231057" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231057-520x368.jpg" alt="" width="520" height="368" /></a>

12. Setup complete~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231134.jpg"><img class="alignnone size-large wp-image-4196" title="2010-12-13_231134" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231134-520x367.jpg" alt="" width="520" height="367" /></a>
