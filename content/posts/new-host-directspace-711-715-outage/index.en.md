---
title: "The Blog Is Moving to a New Host, DirectSpace, and I May Not Be Able to Write Posts from 7/11 to 7/15"
date: 2011-07-08T17:03:03
slug: "new-host-directspace-711-715-outage"
tags: ["Blogging", "Hosting"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_165402.jpg"><img class="size-full wp-image-5324 aligncenter" title="2011-07-08_165402" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_165402.jpg" alt="" width="244" height="61" /></a>

Let me recall: about half a year ago, I couldn't put up with the stability and performance of the shared hosting service Bumeng, so I switched to renting a semi-managed VPS from a company called PhotonVPS. Since it was my first time trying a VPS, I was worried I would regret it, so at the time I only paid for half a year. Then yesterday (7/7), the six-month VPS contract expired, so I moved the site to another VPS provider, called DirectSpace.


<!--more-->


To be honest, I used PhotonVPS for half a year and found their service fairly good. Many people online advise against this company, saying it has too many users from the mainland and its hosts are unstable. But I haven't run into any major problems in these six months. As far as I remember, the host went down only once, and it was fixed in under half an hour. I also never lost any data, which would have been a big deal. So why did I switch to DirectSpace? The reason is price. PhotonVPS is "semi-managed," which means part of the rent you pay goes toward their services. DirectSpace is "unmanaged," which means the provider's network staff only handle hardware problems, and you have to solve software problems yourself. The price difference between the two is quite large. After six months on PhotonVPS, I felt my own skills were good enough, so I happily rented an unmanaged VPS~

By the way, how big is the price difference between unmanaged and semi-managed? Comparing PhotonVPS and DirectSpace: my semi-managed VPS costs about NT$1800 for six months (RAM: 512MB), while the unmanaged VPS is also about NT$1800 for six months (RAM: 1.5GB). Looking only at the price, there doesn't seem to be a difference. But note that the memory is three times larger for the same price. If we compare using only 512MB of RAM, DirectSpace can be as cheap as NT$1000 for six months.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170023.jpg"><img class="alignnone size-large wp-image-5325" title="2011-07-08_170023" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170023-520x342.jpg" alt="" width="520" height="342" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170239.jpg"><img class="alignnone size-large wp-image-5326" title="2011-07-08_170239" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-08_170239-520x343.jpg" alt="" width="520" height="343" /></a>

Now a quick plug: if anyone is looking to switch VPS providers, I recommend DirectSpace. They're unmanaged, and their data center in Portland (on the West Coast) is cheap and fast. I'm currently using the Portland data center. It's cheaper not because there's a problem, but because Portland is DirectSpace's own data center, so the prices are much lower. Also, DirectSpace has no Chinese-speaking customer service! So when you open a support ticket (tk), don't write in Chinese, or they won't understand you...

Referral link: http://directspace.net/eportal/aff.php?aff=706

You may also have noticed that the site has become very fast recently. I think one reason is the new host. The other reason may be that this time I also changed the server software. I set up the server with what's called LNAMP: Apache handles the backend processing and nginx handles the frontend processing. I've heard from other users that this makes websites much faster. The downside is that it uses a lot of memory, since two processes run at once. Currently it uses about 320MB of memory on average. LNAMP's memory usage is also less stable than the previous LNMP setup. With LNMP, memory usage usually stayed in a fixed range of about 220MB to 240MB, but LNAMP fluctuates quite a lot, anywhere from 250MB to 350MB.

Also, I'm going to an event next week, and I'll be outside almost the whole week. Even when I get home in the evenings, I'll be busy working on a competition. So I won't be able to publish posts next week (7/11 to 7/15). Sorry for the inconvenience, dear readers.
