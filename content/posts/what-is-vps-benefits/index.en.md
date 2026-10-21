---
title: "[VPS] What Is a VPS? What Are the Benefits of Using One?"
date: 2011-02-05T09:00:59
slug: "what-is-vps-benefits"
tags: ["VPS"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_140229.jpg"><img class="size-large wp-image-4535 aligncenter" title="2011-01-30_140229" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_140229-520x391.jpg" alt="" width="520" height="391" /></a></p>
If you've been reading this site's "About" page, or following me on Plurk and Facebook, you'll know this site recently switched to a VPS~ In fact, it's been about three weeks since the switch. On the day I switched, I meant to write a post introducing VPS, but midterms were coming up and I didn't have time. After midterms, I went back to classes at Beishang, and I kept putting it off until now, when I finally have time to write this. 0.0


<!--more-->

<h2>What Is a VPS?</h2>
I've rambled on for a whole paragraph, but I imagine many readers still don't follow what I'm talking about. Maybe lots of people don't know what a VPS is, so let me explain it first. A VPS is a service similar to shared hosting. In form, it's closer to the cloud hosting that has become popular lately. With ordinary shared hosting, the host splits one computer into dozens or even hundreds of accounts, and then we customers share its hardware resources. That's why, if you look at a shared hosting plan's specs, they usually only say <strong>how much storage and bandwidth is yours personally</strong>, and not how much memory or CPU is yours personally. The reason is that shared hosting hardware is shared among all users. If another site on the same machine is resource-hungry, the resources available to your site go down accordingly. Also, shared hosting is meant purely for building websites, so <strong>your permissions only let you access the SQL, FTP, Apache, and Mail services that they have installed on their servers</strong>. Some shared hosts give you scheduled-task permissions, but letting you install your own programs and manage the whole system is something shared hosting can never offer.

A VPS is different, though. Some people may have played with virtual machines, such as VMware or VirtualBox. A VPS is really just an application of virtual machine technology. The VPS host splits one physical machine into several virtual machines. <strong>Your hardware resources are all dedicated to you</strong>, so they won't shrink just because someone else is using too much. <strong>You also have high privileges. It's always root access, so you can install any program you want</strong>. If your skills are good enough, you can even write your own programs and upload them. On shared hosting, the host may block certain PHP functions or make other configuration choices, but that doesn't happen on a VPS, because you decide every setting yourself! Also, VPS services today come in two types, <a href="http://zh.wikipedia.org/zh-tw/OpenVZ">OpenVZ</a> and <a href="http://zh.wikipedia.org/zh-tw/Xen">Xen</a>. The difference lies in the virtualization technology they use. If you want the details, check the two web pages below. The technology is troublesome to explain, so I'll just explain them in practical terms.

P.S. Some shared hosts boast about how fast their data center network is and how good their hardware is. Those claims aren't really clear. Even if the host's machines are good and the network is fast, once a few hundred users split them up, each user gets very little.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_130118.jpg"><img title="2011-01-30_130118" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_130118-520x252.jpg" alt="" width="520" height="252" /></a>
<h2>Are There Two Technologies for VPS?</h2>
<strong>VPS plans that use OpenVZ virtualization are usually cheaper than VPS plans that use Xen</strong>, and there's a reason for that. OpenVZ allows overselling. That means that even if your computer can only run 10 virtual machines, it lets the host go a bit over, say to 12 or 13. In other words: <strong>OpenVZ's virtualization isn't complete, so other people's VPSes can affect yours to some degree</strong>. Xen is different. Its virtualization is very complete. If your hardware can run 10 virtual machines at most, it can only run 10, and the host can't sneak in extras. So it's naturally more expensive. But from what I've seen, although OpenVZ can affect others to some degree, the effect is very small. So unless you have special preferences or requirements, I recommend buying an <a href="http://zh.wikipedia.org/zh-tw/OpenVZ">OpenVZ</a> VPS.
<h3>About Xen and OpenVZ:</h3>
<ul>
	<li><a href="http://zh.wikipedia.org/zh-tw/Xen">Wikipedia: Xen</a></li>
	<li><a href="http://zh.wikipedia.org/zh-tw/OpenVZ">Wikipedia: OpenVZ</a></li>
</ul>
↓↓<a href="http://www.pumo.com.tw/www/products/cloud-host/what.jsp">Pumo</a> itself admits that shared hosting has to share resources with other users, so this isn't just me saying it XDD

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_130803.jpg"><img class="alignnone size-large wp-image-4528" title="2011-01-30_130803" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_130803-517x500.jpg" alt="" width="517" height="500" /></a>
<h2>Semi-Managed vs. Unmanaged</h2>
If you've looked at VPS price lists and spec sheets, you'll have noticed an option that shared hosting doesn't have: semi-managed mode. Some VPS plans use semi-managed mode, and others use unmanaged mode. To put it simply, unmanaged VPSes are very cheap. The VPS I use now costs 3800 a year, while an unmanaged one is only about 1700... The reason is that with an unmanaged VPS, once they've sold it to you, they stop looking after you. If your server runs into trouble, they won't respond even if you email them, unless it's a hardware problem. Semi-managed mode, on the other hand, means they'll help with some things, like changing your IP, moving data centers, or reinstalling. In semi-managed mode, if you email the host, they'll take care of it. There's also a fully managed mode, but its price is terrifying. It's for people who know nothing about Linux, because they can't manage a server themselves. I know a little Linux myself, but I wouldn't say I know it all, so I bought a semi-managed plan xD
<h2>What Can You Do with a VPS?</h2>
The most common use of a VPS is hosting websites. But as I mentioned earlier, a VPS is an independent virtual machine, and you can have full privileges over it and install any program you want. That means you can use a VPS as a relay station for BBS and Usenet posts, as a proxy, or, if you're in mainland China behind the Great Firewall, you can set up a VPN on a US VPS. Some VPSes also let you run BitTorrent (BT). And some people run private game servers, which can also be hosted on a VPS.
<h2>Summary: The Advantages of Using a VPS</h2>
I introduced VPS above, but I wrote a lot. If you're lazy, just read this summary~

When comparing a VPS with ordinary shared hosting:

<strong>1. VPS network speeds are generally higher than shared hosting</strong>

This is obvious. For example, with the same network speed: would you get the most bandwidth if only one computer in your home was online, or if 10 computers in your home were online? Obviously when there's only one. VPS works the same way. Still, I know some people won't be satisfied without numbers... Take my own case. I used to use Pumo's shared hosting, which cost 4000 a year. Pumo's data center is in Taiwan, so in theory its network speed should have been very fast, and I thought so too. Then I bought a US VPS. It costs about 3800 a year, yet its network speed is several times faster than Pumo's. And that's not just my feeling. Google's statistics show it!

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_132627.jpg"><img class="alignnone size-large wp-image-4529" title="2011-01-30_132627" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_132627-520x150.jpg" alt="" width="520" height="150" /></a>

<strong>2. You can take full control of everything on the server</strong>

The thing that really gets on my nerves about shared hosting is this: the host might block certain PHP functions for security reasons. Or say you already have a PHP host, but you want to practice JSP. Then you have to go buy a separate JSP host. This doesn't happen on a VPS. Even if you originally installed PHP and now want to play with JSP, you just install JSP on your VPS. Is your PHP limited to uploading 20M files? No problem, just change it to 50M yourself.

<strong>3. You can practice using Linux</strong>

On shared hosting, you can choose the operating system you want to install. Some hosts have many operating systems built in for you to pick from, and some let you upload your own ISO file to install. But VPSes are generally used for hosting websites, I suppose... so most people install Linux. Also, as I said earlier, you get the highest privileges. In other words, if you're really interested in server administration, buy a VPS and practice Linux~ Of course, you can also set up a virtual machine at home XDD, but if you're going to host a website anyway, buying a VPS lets you practice Linux at the same time.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_133418.jpg"><img class="alignnone size-large wp-image-4530" title="2011-01-30_133418" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_133418-520x285.jpg" alt="" width="520" height="285" /></a>

<strong>4. System crashes happen thousands of times less often than on shared hosting</strong>

The reason I jumped to a VPS in the first place was this damn problem: Pumo's crash rate was way too high. It made me wonder whether their uptime was even 98%. I think the crash rate was so high because they stuffed too many users onto one machine. Land and operating costs in Taiwan are high, so the host might say it's unavoidable... But whether it's unavoidable has nothing to do with me. Every outage was resolved within 10 to 20 minutes, the support staff's attitude was acceptable, and whenever I emailed them they fixed the server right away. But if I didn't send an email, well... I had to wait for their admins to notice it themselves = = Even a 5-minute outage was more than I could stand, especially since every outage happened right when I was writing a post, so I had to retype my article....

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_133916.jpg"><img class="alignnone size-large wp-image-4531" title="2011-01-30_133916" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_133916-520x124.jpg" alt="" width="520" height="124" /></a>

<strong>5. Cheaper than shared hosting...</strong>

Here I compare the price of a US VPS with Taiwanese shared hosting. A plan that costs 4000 in Taiwan can be matched in the US for about 3800, and you can even get better specs. You can pay monthly, every six months, or yearly. I currently rent a US VPS for about 3800 a year, but I split it with a friend, so each of us pays 1900 a year. That's roughly the price of an ordinary US shared hosting plan. And with us sharing it, the system performance still hasn't hit my safety threshold (the threshold I set myself is memory usage within 250MB, and it's currently hovering around 200MB). I estimate this VPS can still host 2 to 3 more websites with the same traffic as mine (I currently get about 400 visitor IPs a day).

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_134547.jpg"><img class="alignnone size-large wp-image-4532" title="2011-01-30_134547" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_134547-520x352.jpg" alt="" width="520" height="352" /></a>

↑↑ Overseas VPS price list

↓↓ Domestic shared hosting price list

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_134652.jpg"><img class="alignnone size-large wp-image-4533" title="2011-01-30_134652" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_134652-520x176.jpg" alt="" width="520" height="176" /></a>
<h2>Disadvantages of Using a VPS</h2>
After all that, it might seem like a VPS beats shared hosting in every way. So why do most people who host websites choose shared hosting over a VPS? The reason is this: shared hosting's service is good. If something goes wrong with your site, you email them and they'll fix it properly. Any program you need that's already installed on the host, you can use right away. A VPS isn't like that... you need a certain amount of Linux skill, because once you buy a VPS, you have to install every service you need yourself, like the web server and FTP server, and you have to set up DNS yourself too. These things alone put off many people who aren't good with computers, and they'd rather pay more for shared hosting. But these days the barrier to entry for VPS has dropped a lot. Take semi-managed mode: when I set mine up, I used LNMP to install the web server, FTP, database, and so on all at once. It wasn't as much trouble as it used to be, but it still took me quite a bit of time. Also, with semi-managed VPS plans now, if you email the host about a problem, they'll help you out pretty well. So it's no longer something only experts can touch. If you're worried that you'll buy a VPS and not know how to use it, that's fine too. VPS, like shared hosting, can be refunded within a set period.

P.S. But a VPS still isn't something for people who don't understand computers, or who only know a little.
