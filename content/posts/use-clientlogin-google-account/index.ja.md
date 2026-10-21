---
title: "ClientLogin で Google アカウントへのアクセス権を取得する"
date: 2011-04-30T20:49:46
slug: "use-clientlogin-google-account"
tags: ["Google API"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-30_200036.jpg"><img class="size-full wp-image-435 aligncenter" title="2011-04-30_200036" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-30_200036.jpg" alt="" width="507" height="453" /></a>

Google は、サービスを利用するためのさまざまな API を提供しています。たとえば、Google Contacts API は、使う前に権限を取得しておく必要があります。この記事で紹介する ClientLogin は、権限を取得する方法の中で個人的に最も簡単だと思うものです。仕組みもシンプルで、http 経由でアカウント名とパスワードを Google に送ると、Google が認証コードを含むデータを返してくれます。その認証コードを使えば、連絡先、カレンダー、ノートブックなど、Google のさまざまなサービスにアクセスできます。


<!--more-->
ClientLogin は、デスクトップアプリやモバイルアプリに向いています。ほかの認証方式と違って認証ページを開く必要がないので、アカウント名とパスワードを入力するログイン画面を自由に設計できます。ただし、この方式には欠点もあります。ユーザーは、フィッシングサイトではないかと疑ってしまうため、パスワードを入力したがらないかもしれません……
<h2>ClientLogin の基礎知識</h2>
<strong>リクエストの形式：</strong>

GET https://www.google.com/accounts/ClientLogin?accountType=A&amp;Email=B&amp;Passwd=C&amp;service=D

上の行は、http プロトコルで GET を送信するという意味です。大文字と小文字は区別されるので注意してください。

<strong>パラメーターの説明：</strong>
<ul>
	<li>accountType<strong>：</strong>権限を取得するアカウントの種類です。HOSTED_OR_GOOGLE を使うのが最も安全です。選択できる値は GOOGLE、HOSTED、HOSTED_OR_GOOGLE です。<strong>
</strong></li>
	<li>Email：権限を取得するアカウントです。@ より後ろの部分も含める必要があります。私の場合の例は linroex@gmail.com です。</li>
	<li>Passwd：ユーザーのパスワードです。</li>
	<li>service：利用するサービスのコードです。たとえば Google カレンダーの権限を取得したい場合は、ここに cl と入力します。各サービスのコードは Google Code で確認できます。</li>
	<li>source：省略可能です。Google がサービスにアクセスした人を記録するためだけに使われます。</li>
</ul>
<strong>例：</strong>
<blockquote>https://www.google.com/accounts/ClientLogin?accountType=GOOGLE&amp;Email=admin@gmail.com&amp;Passwd=123456789&amp;service=cl</blockquote>
<strong>戻り値の説明：</strong>

通常、ClientLogin の戻り値には SID、LSID、Auth の3つの値が含まれるはずです。このうち Auth が認証コードで、Auth を使えば他の Google サービスにアクセスできます。ただし、認証に失敗した場合は、別のコードが返されます。それぞれのコードの意味は、以下で説明します。
<ul>
	<li>BadAuthentication：アカウント名またはパスワードが正しくありません</li>
	<li>NotVerified：このアカウントはまだ認証されていません</li>
	<li>CaptchaRequired：CAPTCHA が不足しています</li>
	<li>Unknown：不明なエラー</li>
	<li>AccountDeleted：このユーザーは削除されています</li>
	<li>AccountDisabled：このユーザーは無効化されています</li>
	<li>ServiceDisabled：指定された Google サービスは存在しません</li>
	<li>ServiceUnavailable：指定されたサービスに接続できません。しばらくしてから再度お試しください</li>
</ul>
<h2>PHP ClientLogin のサンプル</h2>
ダウンロード先：<a href="http://www.box.net/shared/vzo7ymk2qf">Box.net</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/clientlogin.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOMmY4ODE1YjAtMWJhNi00MzUxLTgxYzctYjFjZjUxZGFkNWNl&amp;hl=zh_TW">Google</a>｜<a href="http://www.4shared.com/file/uKV8McbH/clientlogin.html ">4Shared</a>

コード：
<pre lang="php">	$connect=curl_init();		//curl を作成
	$user="linroex@gmail.com";		//アカウントを設定
	$passwd="";		//パスワードを設定
	$service="cl";			//認証するサービスを設定
	curl_setopt($connect,CURLOPT_URL,"https://www.google.com/accounts/ClientLogin?accountType=HOSTED_OR_GOOGLE&amp;Email=$user&amp;Passwd=$passwd&amp;service=$service");
	curl_setopt($connect,CURLOPT_RETURNTRANSFER,true);			//データを文字列として返すよう設定
	curl_setopt($connect, CURLOPT_SSL_VERIFYHOST, true);		//SSL 接続を使用
	curl_setopt($connect, CURLOPT_SSL_VERIFYPEER, false);		//SSL 接続を使用
	$re=curl_exec($connect);		//接続を行い、戻り値を $re に格納
	$re=explode("n",$re);		//データを解析
	echo $re[2];		//Auth を表示
	curl_close($connect);		//curl を閉じる</pre>
