---
title: "WordPress Plugin & Theme Installation Tutorial (For WP 2.9 and Below)"
date: 2010-06-01T13:36:01
slug: "wordpress-plugin-theme-install-tutorial"
tags: ["WordPress", "WordPress Plugins"]
categories: ["Blog"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_112430.jpg"><img class="size-large wp-image-3230 aligncenter" title="2010-06-01_112430" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_112430-500x303.jpg" alt="" width="350" height="212" /></a></p>
Someone asked me the other day what WordPress can do. That's actually a hard question to answer, because WordPress is extremely extensible — you can use plugins to add all sorts of features to your blog, and you can even make your blog not look like a blog at all ^^ WordPress also lets users install themes to dress up their blog nicely. If your skills are good enough, you can design your own theme too, but that's not what this article covers. This article is mainly about how to install plugins and themes.
<h2>
<!--more-->
</h2>
<h2>1. Plugin Installation - Quick Install from the Dashboard</h2>
P.S. With this method you don't need to download the main program yourself; you can install the plugin directly.

Installing from the dashboard is the method I use most, because it's convenient. You don't have to go download the plugin's main program, and you don't need any FTP program — you just open the WordPress dashboard and you can install plugins.

1. Go to the WordPress dashboard, click [Plugins] → [Add New] in order, then type the name of the plugin you want to install into the search box and click [Search Plugins].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114355.jpg"><img class="alignnone size-large wp-image-3232" title="2010-06-01_114355" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114355-500x303.jpg" alt="" width="500" height="303" /></a>

2. The system lists the plugins it found. Usually the one at the top is the plugin you want to install. Take a quick look at the plugin's description to check that it's the one you want, then click [Install Now] next to the plugin you want to install.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114827.jpg"><img class="alignnone size-large wp-image-3233" title="2010-06-01_114827" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114827-500x303.jpg" alt="" width="500" height="303" /></a>

3. After you click install, the system shows you more detailed information about this plugin. Just skim it and click [Install Now].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115026.jpg"><img class="alignnone size-large wp-image-3234" title="2010-06-01_115026" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115026-500x303.jpg" alt="" width="500" height="303" /></a>

4. Enter your FTP account, password, and FTP location, then click [Continue]. (For connection type, just choose FTP — unless you really care about information security, in which case choose SSL, though SSL also requires server-side support.)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115239.jpg"><img class="alignnone size-large wp-image-3235" title="2010-06-01_115239" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115239-500x303.jpg" alt="" width="500" height="303" /></a>

5. After the plugin is installed, if you see "Plugin installed successfully." that means it worked. If not, it failed. Usually if the installation fails you can try a second time, but if the second attempt also fails, install it via FTP instead.

▼▼Click [Activate Plugin]

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_121302.jpg"><img class="alignnone size-large wp-image-3240" title="2010-06-01_121302" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_121302-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>2. Plugin Installation - FTP Method</h2>
Installing from the dashboard is fast and convenient, but some shared hosts restrict you from using the dashboard install method. That's when the traditional FTP installation comes in handy.

1. Here I'll use <a href="http://filezilla-project.org/">FileZilla</a> for the tutorial. First, open your FTP client and log in to your FTP site.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115741.jpg"><img class="alignnone size-large wp-image-3236" title="2010-06-01_115741" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115741-500x303.jpg" alt="" width="500" height="303" /></a>

2. Navigate in order to the WordPress directory → wp-content folder → plugins folder.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120004.jpg"><img class="alignnone size-large wp-image-3237" title="2010-06-01_120004" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120004-500x303.jpg" alt="" width="500" height="303" /></a>

3. Upload your plugin's main program to the plugins folder.

<strong>Note: The plugin main program you download from the official site is a compressed archive. Extract it first, then upload it. Note that you should upload a single folder, not a bunch of separate folders (files).</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120320.jpg"><img class="alignnone size-large wp-image-3238" title="2010-06-01_120320" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120320-500x303.jpg" alt="" width="500" height="303" /></a>

4. After uploading, go to the dashboard, click [Plugins] → [Installed Plugins] in order, then click [Activate] on the plugin you just uploaded.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120849.jpg"><img class="alignnone size-large wp-image-3239" title="2010-06-01_120849" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120849-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>3. Theme Installation - Dashboard Method</h2>
It has the same advantages as installing plugins from the dashboard: fast and convenient. But it has one drawback — you can only install themes listed on the official WordPress website.

1. Log in to the WordPress dashboard, go to Appearance → Add New Theme, then type the name of the theme you want to install into the search box and click search.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_130725.jpg"><img class="alignnone size-large wp-image-3242" title="2010-06-01_130725" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_130725-499x398.jpg" alt="" width="499" height="398" /></a>

2. The system lists the themes it found. Choose the one you want to install and click [Install] → [Install Now], or you can click [Preview] to see what the theme looks like first.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131620.jpg"><img class="alignnone size-large wp-image-3243" title="2010-06-01_131620" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131620-500x303.jpg" alt="" width="500" height="303" /></a>

3. Enter your FTP site details and click [Continue].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131809.jpg"><img class="alignnone size-large wp-image-3244" title="2010-06-01_131809" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131809-500x303.jpg" alt="" width="500" height="303" /></a>

4. After the theme is installed, just click [Activate].

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132419.jpg"><img class="alignnone size-large wp-image-3245" title="2010-06-01_132419" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132419-499x398.jpg" alt="" width="499" height="398" /></a>
<h2>4. Theme Installation - FTP Method</h2>
Sometimes you'll see some really beautiful WordPress themes online, but they aren't listed on the official website. In that case you can upload the theme to your site via FTP and then install it.

1. Open your FTP client, log in to your FTP site, then navigate to the WordPress directory → wp-content folder → themes folder.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132733.jpg"><img class="alignnone size-large wp-image-3246" title="2010-06-01_132733" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132733-500x303.jpg" alt="" width="500" height="303" /></a>

2. Upload your theme to the themes folder.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132951.jpg"><img class="alignnone size-large wp-image-3247" title="2010-06-01_132951" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132951-500x303.jpg" alt="" width="500" height="303" /></a>

The one below is an example of what NOT to do ▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133031.jpg"><img class="alignnone size-large wp-image-3248" title="2010-06-01_133031" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133031-456x400.jpg" alt="" width="456" height="400" /></a>

3. After uploading, go to [Dashboard] → [Appearance] → [Themes] in order, then click [Activate] on the theme you just uploaded.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133250.jpg"><img class="alignnone size-large wp-image-3249" title="2010-06-01_133250" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133250-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>Common Unofficial Theme Sites</h2>
<ul>
	<li><a href="http://www.smashingmagazine.com/" target="_blank">Smashing Magazine</a> (English)</li>
	<li><a href="http://www.simplethemes.net/" target="_blank">Simple Themes</a> (English)</li>
	<li><a href="http://www.skinpress.com/">SkinPress</a> (English)</li>
</ul>
<strong>Addendum: I just came across a great <a href="http://www.boxcn.net/shared/rsk3lfcr37">WordPress plugin development tutorial</a>. Anyone who wants to study it should take a look.</strong>
