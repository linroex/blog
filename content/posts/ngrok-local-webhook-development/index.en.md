---
title: "Ngrok - The Tool That Lets You Develop Webhooks Locally Without a Deployed Environment"
date: 2017-01-09T23:36:47
slug: "ngrok-local-webhook-development"
tags: ["Ngrok"]
categories: ["Programming"]
draft: false
---

<a href="https://ngrok.com">Ngrok</a> is an essential tool for backend developers. Whenever I develop a website on localhost, webhooks, API callbacks, and OAuth are a real headache. Take my earlier experience developing a Mandrill Webhook to receive email open and send events as an example. Because you have to set the URL in the Mandrill admin panel before you can test, you have to upload the program to a server after writing it to see the results. That has a big impact on development speed. <a href="https://ngrok.com">Ngrok</a> was born to solve exactly this problem!


<!--more-->


After you run <a href="https://ngrok.com">Ngrok</a> on your computer, you get a randomly generated URL. Give this URL to a webhook or to anything else that needs a remote URL (such as a Facebook Messenger bot). When someone sends a request to that URL, Ngrok forwards those requests to your computer. The principle is simple but practical! Ngrok's free plan has some limits, for example, a maximum of 40 connections per minute, and only one ngrok process per computer at a time. For detailed limits and pricing plans, see <a href="https://ngrok.com/product#pricing">here</a>. From my own experience, the free plan is already quite sufficient. Apart from a few rare cases, I have almost never run into problems. Paying is also reasonable, since the traffic has to go through ngrok's servers to be forwarded, and that traffic isn't cheap either.

The core idea of <a href="https://ngrok.com">Ngrok</a> is a forwarding server. It can forward outside requests to a port you specify. Following this idea, you can do many things, for example:
<ul>
 	<li>Developing webhooks locally, such as for a Facebook Messenger bot</li>
 	<li>Demos at the end of a hackathon: you save the time of setting up a server, and you can hand the product to everyone to play with</li>
 	<li>Mobile device testing: previously you had to deploy to a server before testing on a real phone, but with Ngrok you can skip that step and test directly</li>
</ul>
<h2>Ngrok Info</h2>
<ul>
 	<li>Official: <a href="https://ngrok.com">https://ngrok.com</a></li>
 	<li>Download: <a href="https://ngrok.com/download">https://ngrok.com/download</a></li>
</ul>
<h2>Usage</h2>
It works on Mac and Linux. Installation is very simple and doesn't require compiling. Just download it and use it right away, or move it to a path such as /usr/local/bin for easier use later.

To use it, enter the command in Terminal. The most basic command is:
<pre>ngrok http 8080</pre>
This sends traffic from the outside to localhost on port 8080, and it needs to use the http protocol. After running it, you'll see this screen:

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-09-下午11.20.48.jpg"><img class="alignnone size-full wp-image-7212" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-09-下午11.20.48.jpg" alt="" width="777" height="589" /></a>

The URL you give to the outside world is the Forwarding URL. If you need SSL, choose the one that starts with https (the second one). Both URLs point to the same target. The only difference is whether SSL encryption is used.

Press Ctrl + C to exit and stop forwarding.

Some features require free registration, such as HTTP Auth. Go to the official Ngrok website and click Login in the top-right corner to register. You can sign up with GitHub or Google. After logging in, you'll see a screen like this, and you just follow the commands there.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/ngrok_-_secure_introspectable_tunnels_to_localhost.png"><img class="alignnone size-full wp-image-7213" src="{{< param imageBase >}}/wp-content/uploads/2017/01/ngrok_-_secure_introspectable_tunnels_to_localhost.png" alt="" width="732" height="736" /></a>

Don't forget to run the command below so that ngrok knows you've registered! Replace the token with your own.
<pre>ngrok authtoken {token}</pre>
Once you've registered, you can use member-only features, such as HTTP Auth:
<pre>ngrok http -auth "user:passwd" 80</pre>
In addition, sometimes you need to direct traffic to a specific local domain. Even though it's your own machine, by modifying /etc/hosts you can give your local machine a fake domain. For example, coder.tw is my blog, but for development convenience my localhost has a fake domain, coder.dev, that points to this machine. The server is also set to listen on coder.dev (Powder is one such case). In this situation, you can use this syntax:
<pre>ngrok http -host-header=myapp.dev mayapp.dev:80</pre>
&nbsp;
