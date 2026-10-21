---
title: "Compiling and Installing a PHP Extension Manually (Linux)"
date: 2012-01-26T16:53:57
slug: "compile-install-php-extension-linux"
tags: ["PHP", "Linux"]
categories: ["SRE"]
draft: false
---

If you want to install an extension for PHP, what should you do? Many people will answer Pecl. That is indeed a very convenient way to install extensions. But what if your server does not have Pecl? And what if, for some reason, you cannot install Pecl? Then you have no choice but to compile and install the extension manually~ This post shows you how to manually compile a PHP extension on Linux.


<!--more-->


Could the situation of "cannot install Pecl" really happen? In my case, I run my sites on a turnkey package, so I ran into this problem. A while ago, I needed to install the PHP driver for MongoDB, but my server had been set up with the LNMP all-in-one package, which does not include Pecl. If I installed Pecl by hand, it would overwrite some of the programs that came with LNMP. That is when you can compile the extension manually~
<h2>How to Compile a PHP Extension Manually</h2>
Step 1: To compile a PHP extension yourself, the first step is of course to get the source code~

I recommend downloading the PHP extension source code from the Pecl website (<a href="http://pecl.php.net/">http://pecl.php.net</a>). Here I will use the MongoDB driver as an example.
<blockquote>wget -c http://pecl.php.net/get/mongo-1.2.7.tgz

tar -zxf mongo-1.2.7.tgz

cd mongo-1.2.7</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163751.jpg"><img class="aligncenter size-large wp-image-826" title="2012-01-26_163751" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163751-540x382.jpg" alt="" width="540" height="382" /></a>

Step 2: Run the phpize program to initialize.
<blockquote>phpize</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163941.jpg"><img class="aligncenter size-large wp-image-827" title="2012-01-26_163941" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_163941-540x382.jpg" alt="" width="540" height="382" /></a>

Step 3: Set the configure options. $PATH should be the location of php-config, which by default is in the bin folder under the PHP root directory.
<blockquote>./configure --with-php-config=$PATH</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164501.jpg"><img class="aligncenter size-large wp-image-828" title="2012-01-26_164501" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164501-540x382.jpg" alt="" width="540" height="382" /></a>

Step 4: Start compiling~ Command:
<blockquote>make &amp;&amp; make install</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164638.jpg"><img class="aligncenter size-large wp-image-829" title="2012-01-26_164638" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164638-540x382.jpg" alt="" width="540" height="382" /></a>

Step 5: When the compilation is complete, the mongo.so file is automatically saved into the PHP extension directory.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164741.jpg"><img class="aligncenter size-large wp-image-830" title="2012-01-26_164741" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_164741-540x382.jpg" alt="" width="540" height="382" /></a>

Step 6: Edit php.ini and add this line:
<blockquote>vi php.ini

extension="mongo.so"</blockquote>
Replace mongo.so with the name of the .so file for the extension you installed.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165033.jpg"><img class="aligncenter size-large wp-image-831" title="2012-01-26_165033" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165033-540x319.jpg" alt="" width="540" height="319" /></a>

Step 7: Finally, restart Apache, then check your phpinfo() file to see whether the installation succeeded~

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165248.jpg"><img class="aligncenter size-large wp-image-832" title="2012-01-26_165248" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-26_165248-529x540.jpg" alt="" width="529" height="540" /></a>

Reference: <a href="http://mattiasgeniar.be/2008/09/14/how-to-compile-and-install-php-extensions-from-source/" target="_blank">http://mattiasgeniar.be/2008/09/14/how-to-compile-and-install-php-extensions-from-source/</a>
