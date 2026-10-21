---
title: "Enabling Cross-Origin Resource Sharing (CORS) on Google Cloud Storage"
date: 2016-12-02T13:50:59
slug: "set-cross-origin-resource-sharing-cors-enable-on-google-cloud-storage"
tags: ["GCP", "CORS"]
categories: ["Programming"]
draft: false
---

Recently I've been teaching a club class how to build small games with Phaser. Many of the assets need to be used by students on CodePen, so I needed web storage that supports CORS to host them. As I was brainstorming, I thought of Google Cloud Storage: it's cheap, and you can bind it to your own domain!

By default, Google Cloud Storage doesn't support Cross-Origin Resource Sharing (CORS). But you can enable CORS on a specific bucket with gsutil (the Google Cloud Storage CLI tool)!


<!--more-->

<blockquote>CORS is a way for JavaScript to access resources on different domains. It has the same goal as the older JSONP, but CORS is now the industry standard, and all major browsers support it.</blockquote>
First, install and configure gsutil. You can refer to this official tutorial: <a href="https://cloud.google.com/sdk/docs/">Install the latest Cloud Tools version</a>

You can use the following command to set a specified bucket so that a specified domain, or everyone, can access its resources. Note that if the setting doesn't take effect, try another computer or an incognito window. I set it once and it still didn't work, so I even captured the packets, and the header did show that CORS was enabled. In the end I found out it was Chrome's cache... it's really powerful......

gsutil cors set cors.config.json gs://s.ntustcoding.club

The contents of cors.config.json are as follows:
<pre>[
  {
    "origin": ["http://example.appspot.com"],
    "responseHeader": ["Content-Type"],
    "method": ["GET", "HEAD", "DELETE"],
    "maxAgeSeconds": 3600
  }
]</pre>
The most important part is the origin field. You can set multiple domains that are allowed to access the resources, or set it to * to let everyone access them.

Reference: <a href="https://cloud.google.com/storage/docs/cross-origin">Google Cloud Storage - Cross-Origin Resource Sharing (CORS)</a>
