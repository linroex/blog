---
title: "MongoDB: A Document-Oriented NoSQL System, and an Installation Guide for Windows and Linux"
date: 2012-01-24T14:26:45
slug: "mongodb-nosql-install-windows-linux"
tags: ["MongoDB"]
categories: ["Programming"]
draft: false
---

A while ago, thanks to Ben's guidance, I stepped into the NoSQL world, which I had always been interested in but never really tried. The first NoSQL system I came across (and still the only one I know) is MongoDB. I had read many articles about NoSQL and thought it was very different from regular SQL. But after actually using MongoDB, I found the two are quite similar. They differ a bit in principle, and NoSQL performs better. Of course, some things SQL can do, NoSQL can't, so it comes down to the trade-offs and needs of each person. NoSQL itself isn't what this post is about, though. This post introduces MongoDB and shows how to install it on Windows.


<!--more-->


MongoDB is a NoSQL program developed by the 10gen team. It's a document-oriented database system, which means each MongoDB database is stored as a "file" inside a folder. To delete a database, you just delete the file. It supports multiple operating systems, and Windows, Mac, and Linux are all supported. Many programming languages also support MongoDB, such as the well-known PHP, C++, Python, .NET, and Java. For the full list of supported languages, see this page (<a href="http://www.mongodb.org/display/DOCS/Drivers">http://www.mongodb.org/display/DOCS/Drivers</a>).

Another big feature of MongoDB is that its syntax is very similar to JavaScript. You can use a lot of JavaScript syntax in MongoDB commands, and you can even use loops, conditionals, and so on. For example, for(var i=0;i

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142949.jpg"><img class="aligncenter size-large wp-image-798" title="2012-01-24_142949" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142949-540x352.jpg" alt="" width="540" height="352" /></a>

You can also use various JavaScript objects directly in mongod, such as Date.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_143306.jpg"><img class="aligncenter size-large wp-image-799" title="2012-01-24_143306" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_143306-540x352.jpg" alt="" width="540" height="352" /></a>
<h2>MongoDB Info</h2>
<ul>
	<li>Official website: <a href="http://www.mongodb.org/">http://www.mongodb.org/</a></li>
	<li>Download page: <a href="http://www.mongodb.org/downloads">http://www.mongodb.org/downloads</a></li>
	<li>Documentation: <a href="http://www.mongodb.org/display/DOCS/Home">http://www.mongodb.org/display/DOCS/Home</a></li>
	<li>SQL & MongoDB mapping chart: <a href="http://www.mongodb.org/display/DOCS/SQL+to+Mongo+Mapping+Chart">http://www.mongodb.org/display/DOCS/SQL+to+Mongo+Mapping+Chart</a></li>
</ul>
<h2>MongoDB Features</h2>
<ul>
	<li>Document-oriented NoSQL</li>
	<li>Integrates JavaScript</li>
	<li>High performance</li>
	<li>Simple, easy-to-understand syntax</li>
</ul>
<h2>Install MongoDB on Windows and Linux</h2>
1. First, go to the MongoDB download page and download the main program you need. Note that 32-bit and 64-bit are different builds. After downloading, extract it. Inside there's a bin folder. Move the files in that bin folder to C:WINDOWS.

If you're installing on Linux, move the files in bin to /usr/bin instead.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140448.jpg"><img class="aligncenter size-large wp-image-790" title="2012-01-24_140448" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140448-540x468.jpg" alt="" width="540" height="468" /></a>

2. Create a folder called data in the system root directory (C:), then create a folder called db inside data. This folder is where MongoDB stores its databases.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140812.jpg"><img class="aligncenter size-large wp-image-791" title="2012-01-24_140812" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140812-540x468.jpg" alt="" width="540" height="468" /></a>

Linux:
<blockquote>sudo mkdir -p /data/db

sudo chown `id -u` /data/db</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142443.jpg"><img class="aligncenter size-large wp-image-794" title="2012-01-24_142443" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142443-540x355.jpg" alt="" width="540" height="355" /></a>

3. At this point the installation is complete. Open CMD and type mongod. This starts the MongoDB server. You can add many different parameters after it to meet different needs.

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140924.jpg"><img class="aligncenter size-large wp-image-792" title="2012-01-24_140924" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_140924-540x352.jpg" alt="" width="540" height="352" /></a>

4. Then open another CMD window and type mongo. This starts the MongoDB shell, where you can operate MongoDB directly. By default it connects to the mongod server on the local machine. To connect to a mongod on another computer, type [mongo ip/dbname]. For example, to connect to the test database at 200.0.0.15, type: mongo 200.0.0.15/test. If the port of the mongod server has been changed, you can type [mongo ip:port/dbname].

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_141350.jpg"><img class="aligncenter size-large wp-image-793" title="2012-01-24_141350" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_141350-540x352.jpg" alt="" width="540" height="352" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142542.jpg"><img class="aligncenter size-large wp-image-795" title="2012-01-24_142542" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-24_142542-540x352.jpg" alt="" width="540" height="352" /></a>

5. Finally, you can set bin/mongod to start automatically when the computer boots. However, if you do this, be sure to pay attention to the security settings.
