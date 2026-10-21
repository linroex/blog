---
title: "GitHub API Note"
date: 2017-02-23T23:59:42
slug: "github-api-note"
tags: ["GitHub", "API"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/02/github.png"]
draft: false
---

Over the past few days, while developing a dashboard, I came into contact with the Trello and GitHub APIs, and I organized some of the information. If you also need to use the GitHub API, you may want to read this post. GitHub also uses the RESTful HTTP API style, so it is very simple to develop with, and it is especially easy to pick up if you have experience integrating HTTP APIs. In my opinion, the GitHub API is one of the most API-friendly I have seen. Not only is the documentation easy to understand, but the API also offers a very complete set of parameters to choose from. There is even a GraphQL API planned for the future, which is really exciting!


<!--more-->

<ul>
 	<li>GitHub Developer： <a href="https://developer.github.com/">https://developer.github.com/</a></li>
 	<li>GitHub API Reference： <a href="https://developer.github.com/v3/">https://developer.github.com/v3/</a></li>
</ul>
If you are interested in the GraphQL API, you can apply through the <a href="https://developer.github.com/early-access/">Early Access Program</a>.

If this is your first time trying an HTTP API, you can read the <a href="https://developer.github.com/guides/">Quick Started</a> guide.

Official and unofficial SDKs are available for various programming languages. See <a href="https://developer.github.com/libraries/">GitHub API Libraries</a>, or you can call the HTTP API directly, which works just as well.

The GitHub API can do quite a lot. It supports operations on Commits, Pull Requests, Issues, Users, and Repos, and the parameters are very detailed. For example, I needed to get the "latest 5 merged PRs." Thanks to the sort fields GitHub provides (updated_at, created_at, etc.) and the sort direction parameter (ASC, DESC), I could solve it easily.

There is quite a lot of information at the top of the developer documentation (see the image below), but this design is sometimes overlooked.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/GitHub_API_v3___GitHub_Developer_Guide.png"><img class="alignnone size-large wp-image-7506" src="{{< param imageBase >}}/wp-content/uploads/2017/02/GitHub_API_v3___GitHub_Developer_Guide-1024x640.png" alt="" width="660" height="413" /></a>

In addition to the API, GitHub also provides <a href="https://developer.github.com/webhooks/">Webhooks</a>. On the API tab you will see the Webhook API, but there is also a Webhook tab at the top. They are actually different. The Webhook API helps you create, query, and delete webhooks. As for how to write the webhook itself, you need to look at the Webhook tab at the top. If you want to bind a webhook, you can go directly to the Settings page of the repo, or use the Webhook API to create one.
<ul>
 	<li><a href="https://developer.github.com/webhooks/">GitHub Webhook Docs</a> (Not Webhook API)</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-24-上午1.23.26.jpg"><img class="alignnone size-full wp-image-7505" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-24-上午1.23.26.jpg" alt="" width="1013" height="782" /></a>

Before you start developing, I recommend reading the whole <a href="https://developer.github.com/v3/">Overview</a>. It contains a lot of useful information. If you are developing your own RESTful API, you can also read GitHub's API Overview and pick out the important or interesting parts to share:
<ul>
 	<li>API Root Endpoint： <a href="https://api.github.com">https://api.github.com</a></li>
</ul>
The Overview mentions the <a href="https://developer.github.com/v3/#rate-limiting">Rate Limit</a>. It is a detail many developers overlook, but it is very important. Sometimes strange bugs are related to the rate limit. Recently I have been getting into the habit of checking the "limits" section of any third-party service before using it, even AWS or Google APIs, so that I don't call them too eagerly, lose data, or get blocked. Interestingly, GitHub includes rate limit information in the HTTP headers, including the limit, the remaining quota, and how long until it resets, so your program can make decisions based on it.

Any time-related field in the returned data is GMT+0, so remember to convert it to the appropriate time zone. For example, I wanted to plot the change in the number of commits over time, but because of a time zone error, the number of commits I plotted for each day did not match what I expected.
<ul>
 	<li><a href="https://developer.github.com/v3/#rate-limiting">GitHub API Overview - Rate Limit</a></li>
</ul>
In addition, the GitHub API supports CORS and JSONP.

For authorization, OAuth is a must, but for different needs GitHub also provides other methods, so you can keep dodging OAuth (just kidding).
<ul>
 	<li>If you are interacting with users and need to access their GitHub data, play it safe and use OAuth. See the <a href="https://developer.github.com/v3/oauth/">GitHub API OAuth</a> docs.</li>
 	<li>For backend, non-interactive tasks, such as a small program that quietly backs up company projects, you can use a Personal Access Token. It does not expire, it can access private repos and organization repos, and you only need to get it from GitHub Settings. Put it directly into your program and it will work. For details, see <a href="https://developer.github.com/v3/auth/#basic-authentication">GitHub API Basic Authentication</a>.</li>
</ul>
<pre>curl -u username:token https://api.github.com/user</pre>
Of course, you can also authorize with a username and password instead of a key, but as a developer, would you dare? I recommend using a Personal Access Token at the very least. If a token ever leaks, you can simply revoke it, and Personal Access Tokens also let you control permissions.

If you use a Personal Access Token for authorization, it also solves the problem of two-factor authentication.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/Personal_Access_Tokens.png"><img class="alignnone size-large wp-image-7507" src="{{< param imageBase >}}/wp-content/uploads/2017/02/Personal_Access_Tokens-1024x776.png" alt="" width="660" height="500" /></a>

You can control the permissions of a Personal Access Token.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/New_personal_access_token.png"><img class="alignnone size-large wp-image-7508" src="{{< param imageBase >}}/wp-content/uploads/2017/02/New_personal_access_token-1024x734.png" alt="" width="660" height="473" /></a>

Finally, the documentation does not specifically explain how to limit the number of returned records. In fact, it just presents it under a different name, pagination. With the per_page parameter, you can achieve the same effect as limiting the number of records.
<ul>
 	<li>per_page： Splits results into a page every N records</li>
 	<li>page： Gets page M</li>
</ul>
<pre>https://api.github.com/repo/linroex/hello/commits?per_page=10&amp;page=1</pre>
I have to say, GitHub really lives up to its reputation as a company of service-minded engineers. Not only is the API friendly, the documentation is also detailed and easy to read, and the overall design flow is good too. It is unlike the Trello API, where I couldn't even find the Auth section, or the Facebook Graph API, where features were listed but could not be used. GitHub, I love you!
