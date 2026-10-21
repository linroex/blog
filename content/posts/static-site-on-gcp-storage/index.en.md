---
title: "Hosting a Static Website on GCP Storage - Getting Started on My First Try"
date: 2017-04-10T09:20:02
slug: "static-site-on-gcp-storage"
tags: ["GCP"]
categories: ["Blog"]
draft: false
---

Want to host a static website on Google Cloud Storage but don't know where to start? Every time I upload files to Google Cloud Storage to share with friends, I have to click "Public," which is a hassle, right? I looked into this for a few days because of a work requirement. At first I thought I just needed to set up the domain and share the files, but after researching, I found there are many little tricks. For example, having to make every uploaded file public is really annoying, but you can set a bucket so that new uploads are public by default. You can even set the default file names for the index and 404 pages. And even the SSL problem that I thought had no solution: the official docs offer a good workaround!


<!--more-->


For the full details, you can refer to the official documentation, <a href="https://cloud.google.com/storage/docs/hosting-static-website">Hosting a Static Website</a>, which is very complete. Here I'll give a brief introduction and share my own takeaways:

The gsutil tool is a must-install. If you haven't installed it yet, head over here: <a href="https://cloud.google.com/sdk/docs/">Install the Google Cloud Tools</a>.

This post will cover:
<ul>
 	<li>Setting up your own domain on Storage</li>
 	<li>Custom domain + SSL</li>
 	<li>Setting uploaded files to Public by default
<ul>
 	<li>Setting all current files to Public</li>
</ul>
</li>
 	<li>Setting the default file names for index and 404 pages</li>
</ul>
<h2>Custom Domain</h2>
Storage provides a URL for publicly shared files, for example:
<blockquote>https://storage.googleapis.com/s.ntust.me/ncc.png</blockquote>
But I'm sure that if you want to deploy a website to Storage, you don't want to use that URL. You'd rather bind your own domain, right!

First, verify the domain you want to bind with Google Webmaster, then set the CNAME for that domain:
<pre>s.ntust.me  CNAME  c.storage.googleapis.com</pre>
Next, create a bucket. Its name must match the domain. And that's it, we're done!

Try uploading a file and setting it to public. Even though the public link you get will still use Google's default:
<blockquote>http<span style="color: #ff0000;">s</span>://<span style="color: #ff0000;">storage.googleapis.com/</span>s.ntust.me/ncc.png</blockquote>
you can make a small change: switch https to http and remove storage.googleapis.com. That's just your own domain plus the file path!
<blockquote>http://s.ntust.me/ncc.png</blockquote>
<h2>SSL</h2>
You've probably noticed that a custom domain can't use SSL. What unequal treatment! But don't worry, the official documentation also offers a solution. CDNs such as Cloudflare provide SSL. Just bind your domain to the CDN and have the CDN route traffic to Storage!
<h2>Automatically Public After Upload</h2>
The most annoying part of uploading files to Storage is having to set "Public sharing" every time. When there are many files or folders, it's enough to drive you crazy. And if you upload a file with the same name and overwrite it, you have to set it again. But there are many ways to handle this with gsutil!

Set new files uploaded to a bucket to public by default. This can only be set at the bucket level, and it does not apply retroactively:
<pre> gsutil defacl set public-read gs://s.ntust.me</pre>
Set all files and directories under a certain folder (or the bucket) to public:
<pre>gsutil acl set -r public-read gs://s.ntust.me/iatp</pre>
<h2>Setting the Index and 404 Page</h2>
On Apace and Nginx, index.html is treated as the homepage by default. For example, http://s.ntust.me/ and http://s.ntust.me/index.html are the same. But on Storage, this has to be set up specifically, or it won't work. Storage also offers a feature to set a 404 Not Found page. It's practically designed for people like me who put web pages on Storage!

With this command, set the default homepage of the s.ntust.me bucket to index.html, and the 404 page to 404.html:
<pre class="prettyprint"><span class="pln">gsutil web </span><span class="kwd">set</span> <span class="pun">-</span><span class="pln">m index</span><span class="pun">.</span><span class="pln">html </span><span class="pun">-</span><span class="pln">e </span><span class="lit">404.html</span><span class="pln"> gs</span><span class="pun">:</span><span class="com">//s.ntust.me</span></pre>
&nbsp;
