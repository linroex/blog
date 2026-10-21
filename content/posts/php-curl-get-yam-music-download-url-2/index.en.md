---
title: "[PHP] Getting the Real Download URLs of Wretch/Yam Music with curl-lib"
date: 2011-01-25T18:31:04
slug: "php-curl-get-yam-music-download-url-2"
tags: ["PHP", "cURL", "Yam"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182313.jpg"><img class="size-large wp-image-4437 aligncenter" title="2011-01-25_182313" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182313-520x356.jpg" alt="" width="520" height="356" /></a></p>
<p style="text-align: center;">The UI I designed is clean^^</p>
This program, <strong>getting the real download URLs of Wretch/Yam music</strong>, was originally going to become a program that automatically generates blog music code. But since many people already run music code generators, one more wouldn't make much of a difference. So instead of building it, I decided to release the code for everyone to look at. Also, if anyone needs to download music from Yam or Wretch, they can download the program, install it on their own server, and run it there.


<!--more-->


The principle behind <strong>getting the real download URLs of Wretch/Yam music</strong> is actually not hard to understand, but it's a bit tricky to write. I'll explain the program in three parts. First, the program uses a cURL library written by a senior developer online named Michael Schrenk. Thanks to his library, I was able to finish this program quickly. The library provides many features, including file downloads, RSS processing, web spiders, and HTML parsing. I'll introduce it properly another time. Today I don't have much time, because I still have to rush an accounting assignment...

The second part is getting Yam's music. Yam put some effort into protecting its music URLs, so you can't find them directly in the source code. But since its Flash Player can play the music, there must be a way to get it from the source. After studying it for a while, I found that you send a GET request to a certain URL, and it returns the real URL of the music. They hid it quite well, unlike Wretch...

The last part is getting the real address of Wretch music. All I can say is that Wretch treats us like idiots: the URL is right there in the source code. Finding that string with PHP used to take a lot of work with explode, but with cURL I got the real URL with a single function call...

I didn't explain everything very clearly above, so just look at my source code to see the details.

The main analysis functionality is written in the getreallink PHP file. The library I use is the aider PHP file (aider.php is not the original curl-lib; it's a simplified version I made). index.php and engine.php make up the UI of this program, to make it easy to use XD

I also wrote this program as an object, so if you're not sure how to use it, you can refer to the index.php and engine.php files.
<ul>
	<li>Source code download: Xun6 ｜ <a href="http://www.4shared.com/file/NS8svxaU/getreallink.html ">4Shared</a> ｜<a href="http://www.box.net/shared/8kt0ptgslb">Box.net</a></li>
	<li>curllib download links: Xun6 ｜ <a href="http://www.4shared.com/file/S04ZtMOD/curllib.html ">4Shared </a>｜<a href="http://www.box.net/shared/7hqe72dse2">Box.net</a></li>
</ul>
<h2>Files included in curllib:</h2>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182758.jpg"><img class="alignnone size-large wp-image-4438" title="2011-01-25_182758" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-25_182758-520x454.jpg" alt="" width="520" height="454" /></a>
