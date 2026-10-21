---
title: "Handling Insufficient Balance for GCP Automatic Payments"
date: 2017-02-07T10:19:02
slug: "google-cloud-platform-overdue-payment"
tags: ["GCP"]
categories: ["SRE"]
draft: false
---

Because the credit card I registered with GCP is a "VISA debit card," the automatic monthly payment can sometimes fail when my bank balance is too low. GCP's current approach is to send an email reminder after a failed charge and retry the charge one day later. If it still fails, GCP asks you to log in to the GCP console and pay manually once you've fixed the problem. I had never had trouble paying through the GCP console before, but this time the flow seems to have changed. Following their link takes you to the billing page, but you can't actually make a payment there. Even when you find the right payment button, using Chrome Canary causes a frontend problem where the payment dialog keeps loading forever. You have to switch to the regular version of Chrome to pay successfully. I'm really curious what the latest and greatest technology behind this payment dialog is...


<!--more-->


After a failed GCP payment, you'll get an email like this one. Following its instructions takes you to the "Payment methods" page, where clicking "Fix" resolves the "insufficient balance" problem.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_39.jpg"><img class="alignnone size-large wp-image-7389" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_39-1024x590.jpg" alt="" width="660" height="380" /></a>

If you use Chrome Canary, though, the dialog just keeps spinning. I let it spin for 10 minutes and it never appeared. The solution is to switch to the regular version of Chrome.

Chrome Canary is the official nightly build of Chrome.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_48.jpg"><img class="alignnone size-full wp-image-7390" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_48.jpg" alt="" width="647" height="610" /></a>

Also, if you log in directly to the GCP billing page, you'll see a notice like this:

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_07.jpg"><img class="alignnone size-full wp-image-7391" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_07.jpg" alt="" width="979" height="693" /></a>

Clicking "Make a Payment" takes you to the billing page, but you can't make a payment on that page!!!

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-07-上午9.47.26.jpg"><img class="alignnone size-large wp-image-7392" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-07-上午9.47.26-1024x599.jpg" alt="" width="660" height="386" /></a>

I have to admit that even Google makes mistakes. Or maybe there's some deeper meaning here that I just don't get T_T All I know is that I spent a huge amount of time trying to figure out a way......
