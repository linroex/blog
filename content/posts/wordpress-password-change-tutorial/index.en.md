---
title: "WordPress Account & Password Change Tutorial"
date: 2009-05-17T12:40:18
slug: "wordpress-password-change-tutorial"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

Last time we finished setting up WP, and the system gave you a set of account credentials. The only problem is that the password is really hard to remember, and the username is adm, which is easy to guess — that's a real security risk for your blog. So now let's show you how to change your username &amp; password.

1. Changing the username

1. Log in to your web host's control panel and click phpMyAdmin.


<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121342.jpg"><img class="alignnone size-full wp-image-1048" title="2009-05-17_121342" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121342.jpg" alt="2009-05-17_121342" width="640" height="310" /></a>

<!--more-->


2. Behind your database there will be a line of text saying "<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;"><strong>&lt;------------ Connect to this database",</strong> click it to enter the database management interface</span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121112.gif"><img class="alignnone size-full wp-image-1049" title="2009-05-17_121112" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121112.gif" alt="2009-05-17_121112" width="549" height="376" /></a></span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">3. Once you're in the database management interface, scroll down the page and find a table called "</span></span>wp_users<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">"<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121715.jpg"><img class="alignnone size-full wp-image-1050" title="2009-05-17_121715" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121715.jpg" alt="2009-05-17_121715" width="640" height="40" /></a></span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">4. After you enter the </span></span>wp_users table you'll see a record called admin (as shown below). Click the pencil icon next to admin to edit it.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122024.jpg"><img class="alignnone size-full wp-image-1051" title="2009-05-17_122024" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122024.jpg" alt="2009-05-17_122024" width="702" height="106" /></a>

5. Change the value of the user_logi field to the username you want, then click "Go".

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122806.jpg"><img class="alignnone size-full wp-image-1053" title="2009-05-17_122806" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122806.jpg" alt="2009-05-17_122806" width="640" height="461" /></a>


<!--more-->
2. Changing the password

Next up, changing your password isn't as much trouble as what we just did — you don't have to go into the database at all. You can just change it from the admin panel, so please log in to the admin panel first.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123050.jpg"><img class="alignnone size-full wp-image-1054" title="2009-05-17_123050" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123050.jpg" alt="2009-05-17_123050" width="640" height="461" /></a><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123141.jpg"><img class="alignnone size-full wp-image-1055" title="2009-05-17_123141" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123141.jpg" alt="2009-05-17_123141" width="460" height="383" /></a>

Once you're in the admin panel, click Users – Your Profile.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_1234411.jpg"><img class="alignnone size-full wp-image-1057" title="2009-05-17_1234411" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_1234411.jpg" alt="2009-05-17_1234411" width="173" height="511" /></a>

Then scroll down to the bottom. There's a New Password field — enter the password you want, then click Update Profile.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123616.jpg"><img class="alignnone size-full wp-image-1058" title="2009-05-17_123616" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123616.jpg" alt="2009-05-17_123616" width="827" height="194" /></a>
