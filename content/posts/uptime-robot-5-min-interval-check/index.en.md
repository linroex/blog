---
title: "Uptime Robot - Checking Whether Your Site Is Reachable at 5-Minute Intervals"
date: 2011-02-20T13:48:36
slug: "uptime-robot-5-min-interval-check"
tags: ["Monitoring", "Uptime Robot"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_132741.jpg"><img class="size-large wp-image-4782 aligncenter" title="2011-02-20_132741" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_132741-520x381.jpg" alt="" width="520" height="381" /></a></p>
<strong><a href="http://www.uptimerobot.com/">Uptime Robot</a></strong> is an uptime monitoring service that I personally recommend. It checks whether your server is running and whether visitors can actually reach your website. Many services are similar to Uptime Robot, but most free uptime monitoring services only check every hour or less (in other words, how often the service checks your site). Uptime Robot's <strong>shortest interval is 5 minutes</strong>, and if it detects a problem with your site, it automatically sends you an email. Uptime Robot is free for now, but I'm not sure whether it will charge later...


<!--more-->


Uptime is the amount of time each month that a server is running normally. The higher the uptime, the more stable the server, and the more your website can build an audience. Think of a museum that spends a third of its first month after opening under repairs, so visitors can't come in for that time. Would you still want to visit that museum later? So if you want your website to get a lot of traffic, uptime is a key factor.
<h2>Uptime Robot Information</h2>
Website: <a href="http://www.uptimerobot.com/">http://www.uptimerobot.com/</a>
<h2>How to Use Uptime Robot</h2>
1. Go to the official <a href="http://www.uptimerobot.com/">Uptime Robot</a> website, click [Start now], enter your name (or nickname), email, username, password, and other details, then click [Register] to finish signing up.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133550.jpg"><img class="alignnone size-large wp-image-4784" title="2011-02-20_133550" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133550-520x381.jpg" alt="" width="520" height="381" /></a>

2. When the message below appears, it means your registration was successful.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133733.jpg"><img class="alignnone size-full wp-image-4785" title="2011-02-20_133733" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133733.jpg" alt="" width="342" height="330" /></a>

3. Next, check your email and click the confirmation link.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133911.jpg"><img class="alignnone size-large wp-image-4786" title="2011-02-20_133911" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133911-520x381.jpg" alt="" width="520" height="381" /></a>

4. After clicking the confirmation link, click [Sign In], then enter your email and password.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134032.jpg"><img class="alignnone size-large wp-image-4787" title="2011-02-20_134032" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134032-520x381.jpg" alt="" width="520" height="381" /></a>

5. Once you're in the Uptime Robot dashboard, click the [Add new] button, then choose the check type you want to use: HTTP, KeyWord, or Ping. I personally recommend HTTP because it's more accurate. Sometimes the server itself is fine but the web server running on it has a problem, and in that case Ping is useless.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134305.jpg"><img class="alignnone size-large wp-image-4788" title="2011-02-20_134305" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134305-520x381.jpg" alt="" width="520" height="381" /></a>

6. After selecting HTTP, you'll see [Friendly Name] and [URL] fields to fill in. Enter the URL of the site you want to check in the URL field, and enter a name for that URL in the Friendly Name field. When you're done, click [Add].

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134441.jpg"><img class="alignnone size-large wp-image-4789" title="2011-02-20_134441" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134441-520x381.jpg" alt="" width="520" height="381" /></a>

7. If the website becomes unreachable later, Uptime Robot will send you an email to let you know.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134759.jpg"><img class="alignnone size-large wp-image-4790" title="2011-02-20_134759" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134759-520x185.jpg" alt="" width="520" height="185" /></a>
<h2>Short Review</h2>
The reason I recommend Uptime Robot is that I woke up this morning to a notification email saying my server could not be reached. Thanks to it, I was able to fix the problem and bring the site back up as quickly as possible. Without it... I probably wouldn't have known the site was down until someone told me, and by then I would have lost a lot of visitors. So I strongly recommend that everyone set up an uptime monitoring service, so that visitor losses caused by server problems can be kept to a minimum.
