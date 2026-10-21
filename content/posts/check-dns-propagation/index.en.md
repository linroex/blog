---
title: "How to Check Whether a Domain's DNS Is Set Up Correctly?"
date: 2011-02-01T18:00:25
slug: "check-dns-propagation"
tags: ["DNS"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163607.jpg"><img class="size-large wp-image-4567 aligncenter" title="2011-01-30_163607" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163607-520x339.jpg" alt="" width="520" height="339" /></a></p>
Anyone who runs a website has probably set up DNS records for a domain many times. You probably also know that after you change DNS, it takes 12 to 24 hours before the change takes effect. That is because ISPs need to clear their DNS caches. A DNS mapping is not applied instantly. It takes some time before it works. So today I want to introduce a command that lets you check whether a given domain points to the correct IP address.


<!--more-->


Step 1: Open cmd (Command Prompt) and type **nslookup**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163753.jpg"><img class="alignnone size-large wp-image-4568" title="2011-01-30_163753" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163753-520x339.jpg" alt="" width="520" height="339" /></a>

Step 2: Once you are in nslookup, just type your domain name and check whether the IP address it returns is correct. There is no need to use Ping for this. (Writing this just gave me an idea, XD)

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163947.jpg"><img class="alignnone size-large wp-image-4569" title="2011-01-30_163947" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_163947-520x339.jpg" alt="" width="520" height="339" /></a>

Step 3: After you finish checking one domain, you can move on to the next one. Just type each domain name directly.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164048.jpg"><img class="alignnone size-large wp-image-4570" title="2011-01-30_164048" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164048-520x339.jpg" alt="" width="520" height="339" /></a>

Step 4: When you are done, type exit to leave.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164117.jpg"><img class="alignnone size-large wp-image-4571" title="2011-01-30_164117" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-30_164117-520x339.jpg" alt="" width="520" height="339" /></a>
