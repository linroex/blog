---
title: "WTF Elastic X-Pack License - How to uninstall X-Pack"
date: 2017-01-16T10:30:47
slug: "wtf-elastic-x-pack-license-how-to-uninstall-x-pack"
tags: ["Elasticsearch", "Kibana"]
categories: ["SRE"]
draft: false
---

If you found this article through a search engine, you probably feel the same resentment toward X-Pack that I do. At first I thought X-Pack was a free, handy plugin, so I installed it on both Elasticsearch and Kibana. Then 30 days later a message appeared saying the license had expired and I needed to "renew the license key," otherwise I couldn't log into Kibana. Up to that point I still assumed I just needed to register an account to get a new license key. But after browsing the official site for a long time, I couldn't find any text about licensing, pricing, or purchasing (later I found out it does exist — in tiny print... do you people even want to make money?). In the end I only found the pricing page through a Google search.


<!--more-->


If you want to make money, please at least write the pricing page clearly. I honestly can't tell whether nobody at Elastic is in charge of UX or whether this is a deliberate strategy: let you use it for 30 days before you discover "oh, it costs money." There is almost no information about payment in the X-Pack docs or on the official site. I asked a few friends and they also only found out after 30 days that it costs money. It feels a bit like being tricked. And paying isn't even the issue — we're all willing to support good things <del>(it's the company's wallet anyway)</del> — but you can't find any payment information on the official site at all! I want to spend money and I still have to use Google to find the payment page? What kind of joke is that?

Subscription plans: <a href="https://www.elastic.co/subscriptions">https://www.elastic.co/subscriptions</a>

As for how much it costs? Don't ask, you'll be scared. The site only says: "contact sales." Usually when you see that sentence, you know what it means... What's worse, you can't buy features separately — for example, buying only Auth without the other features. Elastic only offers one payment plan. No money, please leave.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/FireShot-Capture-4-X-Pack_-Extend-Elasticsearch-with-Sli_-https___www.elastic.co_products_x-pack.png"><img class="alignnone wp-image-7239 size-medium" src="{{< param imageBase >}}/wp-content/uploads/2017/01/FireShot-Capture-4-X-Pack_-Extend-Elasticsearch-with-Sli_-https___www.elastic.co_products_x-pack-103x300.png" width="103" height="300" /></a>

Alright, having read this far, I believe everyone has chosen to remove X-Pack just like I did. A reminder: when removing it, don't just remove the X-Pack plugin from Elasticsearch — Kibana's X-Pack has to be removed too. If you see a "too many redirects" error in the browser, that means you forgot to remove Kibana's X-Pack.
<pre>cd /usr/share/elasticsearch/bin/
./elasticsearch-plugin remove x-pack

cd /usr/share/kibana/bin/
./kibana-plugin remove x-pack</pre>
Basically, once you've removed it like this, everything is fine. Next you can refer to [<a href="https://coder.tw/?p=7235">Elasticsearch and Kibana user authentication setup</a>] to handle basic user login with HTTP Auth (or pair it with Lua for something more complex).

Update: thanks to a reader's tip — if you want to apply for a free key for the basic features, go to <a href="https://register.elastic.co/">this page</a>.
