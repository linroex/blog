---
title: "An Explanation of the Recent Site Outage"
date: 2011-08-05T23:15:59
slug: "about-recent-site-outage"
tags: ["Blogging"]
categories: ["Blog"]
draft: false
---

I think many of you noticed that my site was unreachable for the whole day yesterday. Let me explain what happened. It was definitely not because I wanted to give up on the blog XD.

The night before last, while I was writing a post, I logged into the wrong host. I have two servers: one for the site and one for writing posts. While I was writing, I accidentally logged into the site server and made some changes there. I didn't realize my mistake until I finished the post... So the server that runs the site got messed up. The Apache configuration file was overwritten, and unluckily I had no backup of it. I had only backed up the site folder and the database, and I never imagined I would do something this stupid XD. So the site went down for a whole day...


<!--more-->


This incident taught me one thing: I need to make full-server backups regularly, even though it's a hassle... The saddest part is that when I logged into the SouusVM control panel yesterday, I found out that my hosting company had very kindly enabled a quick full-server backup feature, and I had never noticed it at all 0.0 Anyway, today, after I got the site fully fixed, I made a full-server backup, so if something goes wrong again, I can restore it quickly～ I may also enable some security measures soon, such as a backup site, because I've realized that server downtime is seriously bad! Google and Yahoo (how lovely of them) also pushed my site's rankings way down. It used to be number one, and traffic dropped by a full 50%. Most of my traffic comes from search engines, so losing rankings hurt a lot... This also reminded everyone of one thing: don't let your site go down carelessly!

Also, thank you to everyone who cares about this blog :) I thought nobody was reading this site XD. But when it went down yesterday, more than ten readers came to ask what had happened～～ I was so touched =)) I don't think a large outage like this will happen again.

Finally, happy Valentine's Day :) I'm going to see a movie tomorrow xdd
