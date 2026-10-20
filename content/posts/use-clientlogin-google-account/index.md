---
title: "Use the ClientLogin 取得存取Google Account帳戶的權限"
date: 2011-04-30T20:49:46
slug: "use-clientlogin-google-account"
aliases: ["/posts/use-the-clientlogin-%e5%8f%96%e5%be%97%e5%ad%98%e5%8f%96google-account%e5%b8%b3%e6%88%b6%e7%9a%84%e6%ac%8a%e9%99%90/"]
tags: ["Google API"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-30_200036.jpg"><img class="size-full wp-image-435 aligncenter" title="2011-04-30_200036" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-30_200036.jpg" alt="" width="507" height="453" /></a>

Google有提供很多的API方便妳去存取他們的服務，例如Google Contacts API就需要先取得權限才能使用，而在這篇文章中要教的ClientLogin是我個人覺得最簡單的一種取得權限方式，它的運作原理很簡單，就是透過http傳送帳號、密碼給Google，然後Google就會送回一串資料，其中就包含了授權碼，透過授權碼妳就可以去存取Google的各項服務（例如聯絡人、日曆、筆記本等等）


<!--more-->
ClientLogin這種方式其實比較適合桌面程式或手機應用程式使用，因為他們不像其他認證方式一樣需要開啟一個授權頁面，所以你可以設計自己的登入介面讓使用者輸入帳號密碼，但這種方式也有一個缺點就是使用者未必會想輸入帳號密碼，因為他們會懷疑妳是釣魚網站...
<h2>ClientLogin基本知識</h2>
<strong>傳送指令格式：</strong>

GET https://www.google.com/accounts/ClientLogin?accountType=A&amp;Email=B&amp;Passwd=C&amp;service=D

以上這行就是說透過http協定傳送GET的意思，請注意大小寫是有差別的

<strong>參數解釋：</strong>
<ul>
	<li>accountType<strong>：</strong>要取得權限的帳戶類型，使用HOSTED_OR_GOOGLE是最保險的方式，可以田的選項有：GOOGLE、HOSTED、HOSTED_OR_GOOGLE<strong>
</strong></li>
	<li>Email：要取得權限的帳號，需包含@後面那一串資料，以我為例：linroex@gmail.com</li>
	<li>Passwd：使用者的密碼</li>
	<li>service：要使用該權限的服務代號，例如我要取得Google日曆的權限，則這裡就輸入cl，各項服務的代碼可以在Google Code上面找到</li>
	<li>source：可填可不填，就只是讓Google可以記錄是誰在存取該項服務</li>
</ul>
<strong>範例：</strong>
<blockquote>https://www.google.com/accounts/ClientLogin?accountType=GOOGLE&amp;Email=admin@gmail.com&amp;Passwd=123456789&amp;service=cl</blockquote>
<strong>傳回值解釋：</strong>

正常來講ClientLogin的傳回值應該會包含SID、LSID、Auth這三項資料，其中的Auth就是授權碼，透過Auth妳可以去存取其他的Google服務，但如果認證失敗的話就會傳回其他代碼，而這些代碼的意義我會在下面做解釋
<ul>
	<li>BadAuthentication：帳號或密碼錯誤</li>
	<li>NotVerified：此帳戶尚未驗證</li>
	<li>CaptchaRequired：缺少驗證碼</li>
	<li>Unknown：未知錯誤</li>
	<li>AccountDeleted：該用戶被刪除</li>
	<li>AccountDisabled：該用戶被禁用</li>
	<li>ServiceDisabled：指定的Google服務不存在</li>
	<li>ServiceUnavailable：指定的服務無法連線，稍後在試</li>
</ul>
<h2>PHP-ClientLogin範例</h2>
下載點：<a href="http://www.box.net/shared/vzo7ymk2qf">Box.net</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/clientlogin.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMmY4ODE1YjAtMWJhNi00MzUxLTgxYzctYjFjZjUxZGFkNWNl&amp;hl=zh_TW">Google</a>｜<a href="http://www.4shared.com/file/uKV8McbH/clientlogin.html ">4Shared</a>

程式碼：
<pre lang="php">	$connect=curl_init();		//建立curl
	$user="linroex@gmail.com";		//設定帳號
	$passwd="";		//設定密碼
	$service="cl";			//設定要認證的服務
	curl_setopt($connect,CURLOPT_URL,"https://www.google.com/accounts/ClientLogin?accountType=HOSTED_OR_GOOGLE&amp;Email=$user&amp;Passwd=$passwd&amp;service=$service");
	curl_setopt($connect,CURLOPT_RETURNTRANSFER,true);			//設定以字串格式傳回資料
	curl_setopt($connect, CURLOPT_SSL_VERIFYHOST, true);		//設定使用SSL連線
	curl_setopt($connect, CURLOPT_SSL_VERIFYPEER, false);		//設定使用SSL連線
	$re=curl_exec($connect);		//進行連線並將回傳值存在$re中
	$re=explode("n",$re);		//將資料解析
	echo $re[2];		//顯示Auth
	curl_close($connect);		//關閉curl</pre>
