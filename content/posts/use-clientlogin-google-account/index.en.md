---
title: "Using ClientLogin to Get Access to a Google Account"
date: 2011-04-30T20:49:46
slug: "use-clientlogin-google-account"
tags: ["Google API"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-30_200036.jpg"><img class="size-full wp-image-435 aligncenter" title="2011-04-30_200036" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-30_200036.jpg" alt="" width="507" height="453" /></a>

Google offers many APIs that make it easy for you to access its services. For example, the Google Contacts API requires you to get permission before you can use it. In this post, I'll cover ClientLogin, which I personally think is the simplest way to get permission. It works in a simple way: you send your account name and password to Google over http, and Google sends back a string of data that includes an authorization token. With that token, you can access Google's various services (such as Contacts, Calendar, Notebook, and so on).


<!--more-->
ClientLogin is actually better suited to desktop or mobile apps. Unlike other authentication methods, it doesn't require opening an authorization page, so you can design your own login screen for users to enter their account name and password. But this approach has a drawback: users may not want to type in their password, because they might suspect you of being a phishing site...
<h2>ClientLogin Basics</h2>
<strong>Request format:</strong>

GET https://www.google.com/accounts/ClientLogin?accountType=A&amp;Email=B&amp;Passwd=C&amp;service=D

The line above means sending a GET request over http. Note that letter case matters.

<strong>Parameters:</strong>
<ul>
	<li>accountType<strong>:</strong> The type of account to get permission for. HOSTED_OR_GOOGLE is the safest option. The available options are GOOGLE, HOSTED, and HOSTED_OR_GOOGLE.<strong>
</strong></li>
	<li>Email: The account to get permission for. It must include the part after the @. For example, in my case: linroex@gmail.com</li>
	<li>Passwd: The user's password</li>
	<li>service: The code for the service you want to use. For example, if I want permission for Google Calendar, I enter cl here. You can find the codes for each service on Google Code.</li>
	<li>source: Optional. It just lets Google record who is accessing the service.</li>
</ul>
<strong>Example:</strong>
<blockquote>https://www.google.com/accounts/ClientLogin?accountType=GOOGLE&amp;Email=admin@gmail.com&amp;Passwd=123456789&amp;service=cl</blockquote>
<strong>Return values:</strong>

Normally, the ClientLogin response should include three values: SID, LSID, and Auth. Auth is the authorization token, and with it you can access other Google services. If authentication fails, it returns other codes instead. I'll explain what those codes mean below.
<ul>
	<li>BadAuthentication: Wrong account name or password</li>
	<li>NotVerified: This account has not been verified yet</li>
	<li>CaptchaRequired: The CAPTCHA is missing</li>
	<li>Unknown: Unknown error</li>
	<li>AccountDeleted: The account has been deleted</li>
	<li>AccountDisabled: The account has been disabled</li>
	<li>ServiceDisabled: The specified Google service does not exist</li>
	<li>ServiceUnavailable: The specified service cannot be reached right now. Try again later.</li>
</ul>
<h2>PHP ClientLogin Example</h2>
Download links: <a href="http://www.box.net/shared/vzo7ymk2qf">Box.net</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/clientlogin.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMmY4ODE1YjAtMWJhNi00MzUxLTgxYzctYjFjZjUxZGFkNWNl&amp;hl=zh_TW">Google</a>｜<a href="http://www.4shared.com/file/uKV8McbH/clientlogin.html ">4Shared</a>

Code:
<pre lang="php">	$connect=curl_init();		//create curl
	$user="linroex@gmail.com";		//set the account
	$passwd="";		//set the password
	$service="cl";			//set the service to authenticate
	curl_setopt($connect,CURLOPT_URL,"https://www.google.com/accounts/ClientLogin?accountType=HOSTED_OR_GOOGLE&amp;Email=$user&amp;Passwd=$passwd&amp;service=$service");
	curl_setopt($connect,CURLOPT_RETURNTRANSFER,true);			//return the data as a string
	curl_setopt($connect, CURLOPT_SSL_VERIFYHOST, true);		//use an SSL connection
	curl_setopt($connect, CURLOPT_SSL_VERIFYPEER, false);		//use an SSL connection
	$re=curl_exec($connect);		//connect and store the return value in $re
	$re=explode("n",$re);		//parse the data
	echo $re[2];		//display Auth
	curl_close($connect);		//close curl</pre>
