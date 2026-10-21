---
title: "Trello API Notes"
date: 2017-02-22T23:59:29
slug: "trello-api-note"
tags: ["Trello", "API"]
categories: ["Programming"]
draft: false
---

Today I was building a dashboard for my company, and I needed a program that calculates the daily development points so the dashboard could show how the points change month by month. So I played around with the Trello API, and here are my quick notes. Some background: our department estimates development progress with Scrum points. Each issue gets a difficulty point value, and we use it together with the Trello Scrum plugin.


<!--more-->


The Trello API is quite powerful and lets you do all sorts of unusual things with Trello. The developer documentation focuses on JavaScript, which suggests they expect you to build browser-extension-style apps. There is also a <a href="https://developers.trello.com/clientjs">JS SDK</a> you can use. The API itself is plain HTTP, though, so you can use it from any language without trouble, and responses are returned as JSON.

API Reference: <a href="https://developers.trello.com/advanced-reference">https://developers.trello.com/advanced-reference</a>

Using the API is much like using other websites. If you have experience with APIs like Facebook's, the docs will be easy to follow. For authentication, it supports OAuth and Auth Router (which redirects you to a URL). What's interesting is that if you browse the official site yourself, you'll find the authentication information is hidden remarkably deep...

Here's a quick route through the important pages. Remember to log into Trello first, or you won't be redirected automatically:
<ul>
 	<li>Get your App Key: <a href="https://trello.com/app-key">https://trello.com/app-key</a></li>
 	<li>Authorization docs: <a href="https://developers.trello.com/authorize">https://developers.trello.com/authorize</a></li>
</ul>
Trello also provides a Sandbox for development. Personally, I think the name is poorly chosen. It works the same way as the Facebook Graph API Explorer: you can write JS directly in it and get data back.

What I needed was to fetch the cards completed each day and store each card's name and the points it used in a database. Card names look like this: Fixing bugs, fixing bugs, sob sob sob (3.5). The (3) at the end is the actual difficulty it took.

For authorization, I didn't want to bother implementing OAuth, so I took the simplest route: use client.js to get a token with expire: never and print it out directly. Note that client.js automatically saves the token to localStorage once authentication completes. Here's the code:
<pre>&lt;script&gt;
  localStorage.clear();
  Trello.authorize({
    type: 'redirect',
    name: '貝殼放大',
    expiration: 'never',
    success: ()=&gt;console.log(localStorage.trello_token)
  });
&lt;/script&gt;</pre>
P.S. Trello's client.js needs to be used together with jQuery.

Once you have the access_token, you can start working through the <a href="https://developers.trello.com/advanced-reference">API Reference</a>!

Trello's documentation is fairly thorough, but I should point out one thing. When you fetch cards, the default sort order is by creation date, and you can't specify the sort direction or the field (ugly #1). Also, the returned data includes "last modified time" but not "creation date"!!!

P.S. If you want the creation date of a single card, you can get it with GET /cards/{card_id}/actions?filter=createCard.
