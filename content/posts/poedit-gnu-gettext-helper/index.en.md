---
title: "Poedit: A Handy Helper for Multilingual (GNU Gettext) Work"
date: 2011-07-21T20:00:50
slug: "poedit-gnu-gettext-helper"
tags: ["Gettext"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195920.jpg"><img class="alignnone size-large wp-image-577" title="2011-07-21_195920" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195920-540x461.jpg" alt="" width="540" height="461" /></a>

Today I want to introduce a very handy tool for making multilingual software: Poedit. I think many people have come across the term "Chinese localization" online, right? In short, Poedit is a program that helps you with localization work. In Taiwan this kind of work is called "Chinese localization," but in other countries it could be called "English localization" or "Japanese localization," so the general term for all of these is "multilingualization"~


<!--more-->
Poedit can't multilingualize every program. It's a tool specifically for the Gettext project. Gettext is a multilingual framework under GNU, and Poedit files use the .po and .mo extensions. So if you see a program online whose language files also use .po or .mo, that means you can use Poedit to localize it into Chinese.

Usually, software developers publish the PO files so that others can help localize the software. But some software only publishes its source code, and then you have to analyze the source and create the PO file yourself before you can start the multilingual work. This is less common, and it's usually PHP programs that are handled this way. Analyzing the code and creating a PO file sounds hard? Don't worry~ Poedit doesn't only help you edit PO files; it can also help you create them~

The best-known program I know of that uses Gettext for its languages is WordPress. Its plugins and themes all use it for multilingual support, so many people assume Poedit is a tool made just for WordPress (I thought so too, xD). That's not the case, though. Poedit can be used with many other programs. For example, sometimes I enter foreign web design contests. The big problem is that my English is poor, but the pages have to be in English.... So I build the page in Chinese first, then use Gettext to find someone to do the translation for me : )

P.S. Poedit can open files in two formats, PO and POT, for multilingual work.
<h2>Poedit Info</h2>
<ul>
	<li>Official website: <a href="http://www.poedit.net/">http://www.poedit.net/</a></li>
	<li>Download page: <a href="http://www.box.net/shared/jsbcze4r5cox4n3mo4oj">Box.net</a>｜<a href="http://www.4shared.com/file/8yU-GCU9/poedit-146-setup.html ">4Shared</a>｜<a href="http://goo.gl/ryC2J">Google</a>｜<a href="http://www.poedit.net/download.php#win32">Official download</a></li>
	<li>Operating systems: Windows, Linux, Mac</li>
</ul>
<h2>Poedit Installation Guide</h2>
1.First, download the installer from the official website, run it, and keep clicking Next to finish the installation~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195404.jpg"><img class="alignnone size-full wp-image-572" title="2011-07-21_195404" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195404.jpg" alt="" width="503" height="388" /></a>

2.When you get to the license agreement, remember to select "I accept....."

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195618.jpg"><img class="alignnone size-full wp-image-573" title="2011-07-21_195618" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195618.jpg" alt="" width="503" height="388" /></a>

3.Installing~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195657.jpg"><img class="alignnone size-full wp-image-574" title="2011-07-21_195657" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195657.jpg" alt="" width="503" height="388" /></a>

4.Installation complete

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195734.jpg"><img class="alignnone size-full wp-image-575" title="2011-07-21_195734" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-21_195734.jpg" alt="" width="503" height="388" /></a>
<h2>Poedit Tutorial: Opening PO and POT Files Directly</h2>
In this section, I'll show you how to analyze the source files to extract the strings that need translating and create a PO file. If the project you're translating provides a POT file, you can follow this article and open the PO file directly to start translating. Finally, export the file as an mo file and you're done!

1.Open Poedit, then click **File** → **Open** in the top-left corner.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002330.jpg"><img class="alignnone size-large wp-image-584" title="2011-07-22_002330" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002330-540x461.jpg" alt="" width="540" height="461" /></a>

If your source file is a POT file, choose **File** → **Create Catalog from POT File**.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002410.jpg"><img class="alignnone size-large wp-image-585" title="2011-07-22_002410" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002410-540x461.jpg" alt="" width="540" height="461" /></a>

2.If you chose **Create Catalog from POT File** just now, it will ask you to fill in some settings. The fields inside the red box are required. After filling them in, click OK, and it will ask you to save the PO file.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002633.jpg"><img class="alignnone size-full wp-image-586" title="2011-07-22_002633" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002633.jpg" alt="" width="357" height="340" /></a>

3.Now you can start translating~ Select the string you want to translate, then enter the translation. I also recommend saving right after translating a short section (Ctrl+S).

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002948.jpg"><img class="alignnone size-large wp-image-587" title="2011-07-22_002948" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_002948-540x461.jpg" alt="" width="540" height="461" /></a>

4.When you press Ctrl+S or choose **File** → **Save**, Poedit automatically generates the mo file, so you don't need to export it separately.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003214.jpg"><img class="alignnone size-large wp-image-588" title="2011-07-22_003214" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003214-540x514.jpg" alt="" width="540" height="514" /></a>
<h2>Poedit Tutorial: Creating a PO File</h2>
Sometimes you're a developer who needs to put together a PO file for other team members to use for multilingual work. Or you're a translator, and the program you want to translate has only code and no PO file. In either case, you can follow the tutorial here to create a PO file.

1.Open Poedit, then click **File** → **New Catalog** in that order.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003916.jpg"><img class="alignnone size-large wp-image-589" title="2011-07-22_003916" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_003916-540x461.jpg" alt="" width="540" height="461" /></a>

2.Fill in some information. In the project information section, you must set "Project name and version," "Charset," and "Source code charset."
<ul>
	<li>Project name and version: set it yourself</li>
	<li>Charset: utf-8</li>
	<li>Source code charset: utf-8</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_004455.jpg"><img class="alignnone size-full wp-image-590" title="2011-07-22_004455" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_004455.jpg" alt="" width="357" height="340" /></a>

3.Next, go to the "Paths" tab and enter the location of the files you want to multilingualize in the "Base path" field. Note this: if your program folder has a single-level structure, you only need to set the base path. But if there are other folders under the base path you set, you need to add those paths below it.

For example: my program is in the C:Appservwwwtest folder, and it contains three folders: config, core, and js. Then:
<ul>
	<li>Base path: C:Appservwwwtest</li>
	<li>Under it, set:</li>
	<li>config</li>
	<li>core</li>
	<li>js</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005207.jpg"><img class="alignnone size-full wp-image-591" title="2011-07-22_005207" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005207.jpg" alt="" width="357" height="340" /></a>

4.Finally, go to the "Keywords" tab. Here you set which keywords the tool should handle. Usually we set the following (the second and third are underscores):
<ul>
	<li>Gettext</li>
	<li>_</li>
	<li>__</li>
	<li>gettext_noop</li>
	<li>_e</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005511.jpg"><img class="alignnone size-full wp-image-592" title="2011-07-22_005511" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-22_005511.jpg" alt="" width="357" height="340" /></a>

5.Once everything is set, click OK. It will ask where to save the PO file. After saving, you can start translating right away.
<h2>Video Tutorial</h2>
<h2><iframe src="http://www.youtube.com/embed/W5BkxT2dVo4" frameborder="0" width="480" height="390"></iframe></h2>
