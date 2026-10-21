---
title: "Possible Causes and Fixes for the \"HTTP Error\" When Uploading Files in WordPress"
date: 2017-01-30T01:37:25
slug: "wordpress-upload-http-error-fix"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

If you use WordPress, you may occasionally run into the "HTTP error" problem when uploading images. Search online and you'll find all sorts of explanations — some say it's a file permission issue, others say you need to add a snippet of code to your theme. In fact, all of these are "possible" causes. The most correct approach is to check the server's error log to determine what the actual cause is. I happened to run into this problem today, so let me put together my solution along with other possible causes!


<!--more-->


There are already plenty of solutions online, so I won't go into the step-by-step operations here. Instead, I'll explain a bit about the reasons behind them, so you can try to judge "what happened" rather than just trying whatever solution you see without knowing what's going on — which often ends up causing even more problems. This is actually a common situation for beginners: they hit a problem, Google an answer, follow it, but have no idea what's happening behind the scenes, and lose many valuable learning opportunities.

The most common cause of this problem is insufficient permissions on wp-content/uploads, which prevents WordPress from uploading files or creating folders for you. The lazy fix is to set it to 777 — readable, writable, and executable by anyone. If you're the only person using the server and you don't care much about security, that's roughly acceptable, but a better approach is to assign the correct file owner and group and set a proper permission number such as 775.

An oversized file can also cause uploads to fail. In theory you should get a dedicated error message rather than "HTTP error", but since quite a few people mention this possibility, I'll include it here. When this happens, adjusting the web server's "upload file size limit" alone won't solve it — the memory limit and POST data size may also be involved. WordPress handles file uploads over HTTP POST, so if you set POST to carry only 10MB of data, it doesn't matter that you set the file upload limit to 50MB. The same goes for the memory limit.

It's also possible that, because PHP temporarily stores uploaded files in the /tmp directory, if that directory doesn't exist or PHP doesn't have enough permission to write to it, upload errors can occur.

There are also some unverified guesses, such as special characters in the file name, insufficient server memory, WordPress bugs, and so on. You can cross-check in various ways to figure out what the problem is — for example, rename the file to something simple like 001.jpg and try uploading it to see if it succeeds, or search Google for complaints about upload errors in the past week to guess whether it might be a bug in the latest WordPress version.

The situation I ran into this time was interesting: I could upload images normally when writing a post the day before yesterday, and I hadn't changed anything in the past few days, so there was no reason uploads should fail. Besides, it's January now and it was also January a few days ago, and image uploads use the same folder, so there was no folder-creation permission issue either. After checking, I confirmed it had nothing to do with permissions. What's more annoying, the Apache error log said absolutely nothing... Then it hit me: the only thing that changed in the past few days was that WordPress auto-updated. I also saw quite a few articles mentioning that the "HTTP error" may be caused by the PHP image library not being supported, and so on. WordPress uses ImageMagick by default to process thumbnails, so if your server doesn't have ImageMagick installed or has an outdated version, image uploads will fail. Sure enough, after upgrading ImageMagick, uploads worked fine again. My guess is that the previous version of WordPress included a security update that made an outdated ImageMagick unusable.

The advice you see online about editing functions.php and adding code is usually aimed at the ImageMagick problem mentioned above. The code below, for example, switches WordPress's default image processing module from ImageMagick to GD. Personally, I think that's treating the symptom rather than the cause; the better solution is to install ImageMagick on the server (or update it)! Unless you're on shared hosting and can't decide what gets installed, I'd recommend installing ImageMagick rather than switching the default to GD.
<pre>add_filter( 'wp_image_editors', 'change_graphic_lib' );
function change_graphic_lib($array) {
  return array( 'WP_Image_Editor_GD', 'WP_Image_Editor_Imagick' );
}</pre>
