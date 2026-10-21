---
title: "Manually Backing Up and Restoring a Database with phpMyAdmin"
date: 2011-02-11T11:11:08
slug: "phpmyadmin-manual-backup-restore"
tags: ["PHPMyAdmin", "MySQL", "Backup"]
categories: ["SRE"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110444.jpg"><img class="alignnone size-full wp-image-220" title="2011-02-11_110444" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110444.jpg" alt="" width="478" height="378" /></a>

In this post, I'll show you how to back up and restore a database by hand. If you know a bit about building websites, you know you should back up your database regularly, because almost all of a website's data is stored in the database. But how many people actually back up their databases? Most people learn to build websites from so-called "ten-minute website" books, and those usually don't go into any depth, so plenty of people don't know how to back up a database. So here I'm going to show everyone how to back up a database by hand (a MySQL database).

<span style="color: #ffffff;">.
<!--more-->

</span>
<h2>Backing Up the Database</h2>
1.First, go into your MySQL database and click "Export"

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110641.jpg"><img class="alignnone size-large wp-image-221" title="2011-02-11_110641" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110641-540x447.jpg" alt="" width="540" height="447" /></a>

2.Click "Select all" under the export options, then set the export format to SQL

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110750.jpg"><img class="alignnone size-large wp-image-222" title="2011-02-11_110750" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110750-540x447.jpg" alt="" width="540" height="447" /></a>

3.Check the "Save as file" option, then click "Go". As for compression, I recommend not using it, since not every host supports compressed files

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110917.jpg"><img class="alignnone size-large wp-image-223" title="2011-02-11_110917" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-11_110917-540x447.jpg" alt="" width="540" height="447" /></a>

That's about it for backing up.

Next, I'll show you how to restore, since a backup is pointless if you can't restore it.

<span style="color: #ffffff;">
</span>
<h2>Restoring the Database</h2>
1.Same as before, go into the phpMyAdmin dashboard, but this time click "Import" instead of "Export"

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195158.jpg"><img class="alignnone size-full wp-image-224" title="2009-07-14_195158" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195158.jpg" alt="" width="500" height="340" /></a>

2.Click the Browse button below "File to import", select the location where you saved the backup file, then click "Go"

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195353.jpg"><img class="alignnone size-full wp-image-225" title="2009-07-14_195353" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2009-07-14_195353.jpg" alt="" width="500" height="312" /></a>

Restoring takes a while, depending on how big the backup file is. When I moved my site, a 10 MB backup took about 5 minutes. Don't mistake it for a freeze and force-shut down your computer ^^

If you compressed the file when you backed it up, the restore will be faster.

In addition, I recommend the quick SQL restore method from Shachi: <a href="http://shachi.tw/cpanel-quickly-upload-sql/">http://shachi.tw/cpanel-quickly-upload-sql/</a>
