---
title: "String Split in Elasticsearch Script Field (Painless)"
date: 2016-12-14T01:29:14
slug: "string-split-in-elasticsearch-script-field-painless"
tags: ["Elasticsearch"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-1.png"]
draft: false
---

If you found this article, you have probably been searching for how to use Split in an Elasticsearch (or Kibana) Script Field for a long time! I deliberately included every keyword I could think of, so that engineers who suffer like I did do not waste too much of their lives on this...

To cut to the chase: although Painless claims to support the Java Native API, a few things are not supported, and one of them is split. The story goes that the Elasticsearch developers felt the time complexity of split was too poor, so they cut it out. I did not know this at first, and I tried all kinds of approaches, from doubting whether my syntax was correct to wondering whether some special syntax was needed to import the Java API. Finally, on an Elasticsearch Issue, I found this post: [<a href="https://github.com/elastic/elasticsearch/issues/20952">Painless - Request for native String split function</a>], and my feelings at that moment were......


<!--more-->


This Issue was filed in 2015, and now 2016 is almost over!! Until the official String.split is released, you can use regular expressions, or use String.indexOf() together with String.substring(). Since I needed to analyze the email service providers, I used indexOf() to find the position of @ and then simply cut the string there.

Also, be careful: if you are doing string processing, you should use the keyword field, or a not_analyzed field. Otherwise Elasticsearch will tokenize the value for you. Here is an example that gets the service provider by splitting the Email field:
<pre>def email = doc['msg.email.keyword'].value;
def domain = email.substring(email.indexOf('@'));

return domain;</pre>
