---
title: "Quickly Building a Multilingual Program with Gettext for PHP"
date: 2011-07-18T22:47:40
slug: "php-gettext-multilanguage-program"
tags: ["PHP", "Gettext"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_224707.jpg"><img class="alignnone size-large wp-image-555" title="2011-07-18_224707" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_224707-540x378.jpg" alt="" width="540" height="378" /></a>

Gettext is a... um, I'm not sure how to describe it. It's something like a specification, but it's also a set of libraries. Anyway, it makes it easy to make your program multilingual~ This article is about using Gettext with PHP to develop multilingual programs and websites.


<!--more-->
GNU Gettext project URL: <a href="http://www.gnu.org/s/gettext/">http://www.gnu.org/s/gettext/</a>

In the past, if you wanted to make a program multilingual, there were basically two approaches. One was to write your own function that reads external language files and replaces the program's internal strings, as Imgburn does. The other was to decompile the main program and modify it. The drawback of the first is that you have to write the language-file reader yourself. The drawback of the second is that decompiling is a bit of a hassle... and there are copyright issues too.

Gettext, the subject of this article, works on a principle similar to the first approach: it reads language files to make a program multilingual. Its advantage is that the functions are already written for you~ And its language file format is very popular, so when someone wants to translate your program, they don't have to study your language file format.

Gettext can be used with many languages, such as C++, Python, Java, and PHP. Many programs support it. For example, the well-known CMS WordPress uses Gettext for multilingual support, although its approach differs from this article: WordPress uses its own functions to read Gettext language files.

P.S. Gettext language files come as .po and .mo files. The .po file is for translators to read, and the .mo file is for the program to read. You can make language files with a program called Poedit. I'll write a tutorial on that later.

Below, I'll briefly show how to use Gettext in PHP.
<h2>Gettext for PHP</h2>
1. First, open your PHP configuration file (php.ini) and enable gettext.

Original: `;extension=php_gettext.dll`, change to: `extension=php_gettext.dll`

P.S. Just remove the semicolon at the beginning.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_223826.jpg"><img class="alignnone size-large wp-image-554" title="2011-07-18_223826" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_223826-540x425.jpg" alt="" width="540" height="425" /></a>

2. On your server, create a folder named gettext_demo. Inside that folder, create a file (index.php) and enter the following:
<script src='http://pastie.org/2231997.js'></script>
Here is a brief explanation of the syntax above:
<ul>
	<li>textdomain() sets your project name. You can set it to anything, but the language file names must later match what you set here.</li>
	<li>bindtextdomain() sets where the language files are stored. With the code above, the language files are stored under the Languages folder.</li>
	<li>putenv and setlocale are the two functions that set the "language to display." For example, if I originally developed the program in Chinese and now want to display English, I set en_US. To display Simplified Chinese, I set zh_CN. Just follow the example for the format.</li>
	<li>gettext() is for the text that needs to be multilingual. The gettext function automatically checks the language file. If the file contains a string matching the argument passed to gettext, it displays the string from the language file. If not, it displays the argument as is. In this example, the function checks whether the language file contains translations for the two strings "測試gettext" and "逐風者." If it does, gettext displays the text from the language file; otherwise it displays "測試gettext" and "逐風者" directly.</li>
	<li>_() is a shorthand for gettext(). It's designed for developers' convenience: an underscore stands in for gettext, so you type a lot less when writing code.</li>
</ul>
3. Next, inside the gettext_demo folder, create a Language folder. Inside Language, create an en_US folder. Finally, inside en_US, create an LC_MESSAGES folder.

The full path looks like this: gettext_demo/Language/en_US/LC_MESSAGES

4. Put the language file in ./gettext_demo/Language/en_US/LC_MESSAGES

You can make the language file with Poedit, or use the simple language file I made that is included in the project files.

This article uses an English language file as the example, so it goes under en_US. But if you later want to make a Simplified Chinese version, change it to zh_CN, so the path becomes: gettext_demo/Language/zh_CN/LC_MESSAGES

Also, the "Language" part depends on your bindtextdomain() setting. For example, with Languages($project_name,'lan');, your language files should go in the lan folder instead of Language. Adjust these yourself as needed.

Finally, here's something I hadn't gotten right before. The language files are named after the name you set in testdomain(). For example, with textdomain('xxx'), the language files must be named xxx.mo and xxx.po. This naming applies to language files of every language! Because of WordPress, I had always assumed the naming was like zh_TW.po and zh_TW.mo... It wasn't until a reader pointed it out that I realized it wasn't so XD

Project file download: <a href="https://docs.google.com/viewer?a=v&amp;pid=explorer&amp;chrome=true&amp;srcid=0B7dzHNV9vYfOZTQ2MWZlYzEtN2RhYS00ZjYwLTllZDEtOTQ5NTNlZDVjMTFi&amp;hl=zh_TW" target="_blank">Google</a>｜<a href="http://www.4shared.com/file/HaCLICB-/gettext_demo.html " target="_blank">4Shared</a>｜<a href="http://www.box.net/shared/uk679f32278822jkak4l" target="_blank">Box.net</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/gettext_demo.zip" target="_blank">Dropbox</a>

P.S. You can install the project files directly on your server to try them out. Remember to enable the PHP setting first, or it won't work.
