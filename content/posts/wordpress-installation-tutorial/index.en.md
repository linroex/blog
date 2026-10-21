---
title: "WordPress Installation Tutorial — The World's Most Popular Blogging (Blog) Site-Building Software (This tutorial applies to WP 2.9 and earlier)"
date: 2010-05-31T11:02:53
slug: "wordpress-installation-tutorial"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/wordpress-logo-stacked-rgb.png"><img class="alignnone size-full wp-image-3200" title="wordpress-logo-stacked-rgb" src="{{< param imageBase >}}/wp-content/uploads/2010/05/wordpress-logo-stacked-rgb.png" alt="" width="350" height="217" /></a>

<del datetime="2010-05-29T07:06:50+00:00">You ask me how deep my love is, how much I love you? </del> (just kidding~) You ask me what I think is the best blogging software in the world for building a site? I'll definitely tell you it's WordPress. It's not just because my own blog is built with WordPress that I say this. Back when I was choosing what software to use to build Wind Chaser, I considered using something like Xoops paired with plugins to construct a blog, and I also tried LifeType, the blogging software the school uses, but neither was very good. LifeType's interface in particular was really unbearable, extremely unfriendly, and it had our English teacher dropping by every so often to ask me how to read replies, how to publish a post... On top of that, LifeType's extensibility isn't as good as WordPress's. Anyway, WordPress is just the best ^^ If you don't believe me, try installing it yourself~~


<!--more-->


Note: Before setting up WordPress, I suggest you at least have some understanding of the web. Although WordPress emphasizes simplicity and intuitiveness, you still need a bit of background to get it working well.

Before setting up WordPress, please first prepare a space to host your site. You can buy shared hosting, use free hosting, or set up your own server (not recommended unless you're an expert). Whichever host you use, it must support PHP, MySQL, and Apache. Basically every shared host supports these three services, but you'd better check anyway to avoid being cheated.
<h2>WordPress Features</h2>
<ul>
	<li>Highly extensible, with lots of free plugins</li>
	<li>Lots of free &amp; paid themes</li>
	<li>Installing the WordPress core program, plugins, and themes is very easy</li>
	<li>More freedom than a BSP (Wretch, PIXNET)</li>
</ul>
<h2>WordPress Information</h2>
<ul>
	<li>Official site: <a href="http://wordpress.org/">http://wordpress.org/</a></li>
	<li>Chinese site: <a href="http://tw.wordpress.org/">http://tw.wordpress.org/</a></li>
	<li>Core program + Traditional Chinese language pack download (version 2.9.2): <a href="http://tw.wordpress.org/wordpress-2.9.2-zh_TW.zip">Official</a> |  <a href="http://www.4shared.com/file/mpVUzgmI/wordpress-292-zh_TW.html ">4Shared</a> | <a href="http://www.box.net/shared/xpfi7btf9a">Box.net</a></li>
</ul>
<h2>WordPress Installation Tutorial</h2>
1. First, get a shared host ready, go to its backend, enter your account &amp; password, and press 【Login】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_095949.jpg"><img class="alignnone size-large wp-image-3211" title="2010-05-31_095949" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_095949-500x303.jpg" alt="" width="500" height="303" /></a>

2. Click 【MySQL Databases】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100415.jpg"><img class="alignnone size-large wp-image-3212" title="2010-05-31_100415" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100415-500x303.jpg" alt="" width="500" height="303" /></a>

3. Under 【Create a NEW database::】, enter a database name, then press 【Create database】 to create the new database

<span style="color: #ff0000;"><strong>P.S. Some hosts let you set the database account and password yourself, while others have them preset. It depends on what the host wrote in the email they sent you when you applied for the shared hosting. Mine, for example, was preset</strong></span>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100911.jpg"><img class="alignnone size-large wp-image-3213" title="2010-05-31_100911" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_100911-500x303.jpg" alt="" width="500" height="303" /></a>

4. After creating the database, open your FTP program (if you don't have one installed, you can use the online version, <a href="http://www.net2ftp.com/">net2ftp</a>), then upload the WP files to your web space

<span style="color: #ff0000;"><strong>P.S. After you log in to your shared host via FTP, you may find a folder called htdocs. If that folder exists, upload all the WordPress core files into that folder. If it doesn't exist, just upload them directly to the root directory</strong></span>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_102025.jpg"><img class="alignnone size-large wp-image-3214" title="2010-05-31_102025" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_102025-500x303.jpg" alt="" width="500" height="303" /></a>

5. Once the upload is finished, open your browser (Chrome, IE, Firefox...), enter your site URL, then click 【Create a Configuration File】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104056.jpg"><img class="alignnone size-large wp-image-3217" title="2010-05-31_104056" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104056-500x303.jpg" alt="" width="500" height="303" /></a>

6. Click 【Start】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104240.jpg"><img class="alignnone size-large wp-image-3218" title="2010-05-31_104240" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104240-500x303.jpg" alt="" width="500" height="303" /></a>

7. Enter the relevant database information. The database prefix and host address "basically" don't need to be changed; just keep the default values. After setting it up, press 【Submit】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104706.jpg"><img class="alignnone size-large wp-image-3220" title="2010-05-31_104706" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104706-500x303.jpg" alt="" width="500" height="303" /></a>

If the screen below appears after you press Submit, it means you filled in the database information incorrectly

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104811.jpg"><img class="alignnone size-large wp-image-3221" title="2010-05-31_104811" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_104811-500x303.jpg" alt="" width="500" height="303" /></a>

8. Enter your blog title and your personal email address, then press Install WordPress

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105104.jpg"><img class="alignnone size-large wp-image-3222" title="2010-05-31_105104" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105104-500x303.jpg" alt="" width="500" height="303" /></a>

9. Your login username and password are shown here. The password is randomly generated by the system. Click Log In, and you can change it later in the backend

<strong><span style="color: #ff0000;">P.S. With WordPress 3.0, users can set their own username and password</span></strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105338.jpg"><img class="alignnone size-large wp-image-3223" title="2010-05-31_105338" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105338-500x303.jpg" alt="" width="500" height="303" /></a>

10. Enter the username and the password the system just gave you. Below, I'll show you how to change the password

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105450.jpg"><img class="alignnone size-large wp-image-3224" title="2010-05-31_105450" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105450-500x303.jpg" alt="" width="500" height="303" /></a>

11. Click Users, then Your Profile in order, then enter the password you want in the New Password field of your profile. Once you've set it, press Update Profile

<a href="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105844.jpg"><img class="alignnone size-large wp-image-3225" title="2010-05-31_105844" src="{{< param imageBase >}}/wp-content/uploads/2010/05/2010-05-31_105844-500x303.jpg" alt="" width="500" height="303" /></a>

Done~~ I'll write tutorials on installing WordPress themes and plugins later. If there's anything you don't understand, feel free to leave a comment and ask me
