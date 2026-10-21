---
title: "Mail Bomb - A Purely Mischievous Email Bomb~"
date: 2010-10-05T22:28:00
slug: "mail-bomb-prank"
tags: ["Email", "Pranks"]
categories: ["Security"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_223404.jpg"><img class="size-large wp-image-3846 aligncenter" title="2010-10-05_223404" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_223404-550x299.jpg" alt="" width="550" height="299" /></a></p>
What is a mail bomb? You've probably never heard this term before... In the past, people were more likely to hear about "instant messenger bombs." These are programs that keep sending messages to an instant messenger contact, until the other person gets disconnected from receiving too many messages in a short time. A Mail Bomb is similar. Translated directly into Chinese, Mail Bomb is called "mailbox bomb." Like instant messenger bombs, it sends lots of messages to someone else. But the difference is that a Mail Bomb is really just a prank... it has no real function, and it can't actually fill up someone's mailbox, because with today's mailbox sizes, that's very hard to do. And don't even think about using my Mail Bomb system to send spam, because this program sends many emails to a single mailbox, not one email to many mailboxes. Now let me show you how to use Mail Bomb~


<!--more-->
URL: <a href="http://linroex.summerhost.info/mail-bomb.php">http://linroex.summerhost.info/mail-bomb.php</a>

The interface is very simple. The program works by sending emails directly through the SMTP server provided by the web hosting account. Since I host this program on a server overseas, sending is quite slow, and emails sometimes get blocked. I recommend downloading the source code and installing it on your own hosting account to run it. Source code download: <a href="http://goo.gl/WyuC">http://goo.gl/WyuC</a>

I wrote this program out of boredom today. The interface is very plain, with just some simple CSS for centering things. For sending mail, I used PHP's built-in mail() function. Maybe I'll switch to sending through Gmail's SMTP when I have time later~

1. Once you're in Mail Bomb, enter the relevant information and click the button to start the bombing. Note that the maximum number of emails you can send is 50. Also, if the recipient's email address is on Yahoo, the emails will get blocked (installing the source code on your own hosting account should fix that). Next, the body of the email will be exactly the same as the subject. In other words, if you enter Test as the subject, the body will also say Test. The most fun and mischievous part of this program is that every email sent through it has the same sender and recipient. For example, if you enter xxx@gmail.com as the recipient, then when xxx receives the email, they'll see that the sender is themselves~

<a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_222612.jpg"><img class="alignnone size-large wp-image-3843" title="2010-10-05_222612" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-05_222612-550x299.jpg" alt="" width="550" height="299" /></a>
