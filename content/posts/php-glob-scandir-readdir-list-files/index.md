---
title: "【PHP】透過glob、scandir、readdir取得資料夾內的檔案列表"
date: 2011-08-17T17:27:32
slug: "php-glob-scandir-readdir-list-files"
aliases: ["/posts/%e3%80%90php%e3%80%91%e9%80%8f%e9%81%8eglob%e3%80%81scandir%e3%80%81readdir%e5%8f%96%e5%be%97%e8%b3%87%e6%96%99%e5%a4%be%e5%85%a7%e7%9a%84%e6%aa%94%e6%a1%88%e5%88%97%e8%a1%a8/"]
tags: ["PHP", "dir", "glob", "檔案列表", "資料夾"]
categories: ["PHP"]
---

有時候會需要寫PHP程式去取得指定資料夾內的檔案列表，例如在做網路硬碟程式時舊需要這種功能，這裡要跟大家介紹三個函式都可以做到這種功能，只是使用上不太一樣，這三個函式分別是glob、scandir、readdir


<!--more-->


<strong>P.S.感謝網友蒼時弦也、白目捷的指正:)</strong>
<h2>一、glob</h2>
我個人比較推薦glob，他可以使用含有「萬用字元」的字串當做參數，取得檔案列表，例如./temp裡面有五個txt檔案、十個jpg檔，現在我只要取得jpg的檔案列表，那就寫成：glob('./temp/*.jpg');，然後就會回傳Array，裡面就是jpg的檔案列表，如果要取得所有檔案，則語法為：glob(./temp/*.*);

格式：glob($pattern);

$pattern算是一個.... 你可以把它直接理解成資料夾路徑，然後可以使用萬用字元的意思，就像上面解釋的一樣

範例：
<pre lang="php">glob('./temp/*.txt');     //只會取得txt附檔名的檔案
glob('./temp/*.jpg');     //只會取得jpg附檔名的檔案</pre>
另外glob的第二個參數可以指定陣列的排序方法，相關介紹可以到官網查詢：<a href="http://php.net/manual/en/function.glob.php">http://php.net/manual/en/function.glob.php</a>
<h2>二、scandir</h2>
scandir也算是蠻好用的一個函式，他的回傳值也一樣是Array，回傳值的第一項是「.」，就是目前資料夾的意思，第二項是「..」也就是上一個資料夾，但是他沒辦法像glob那樣指定到檔案格式，scandir的格式是：
<pre lang="php">scandir($dir_address);</pre>
範例：
<pre lang="php">scandir('./temp');
/*
會取得所有./temp下的資料，包括10個jpg以及5個txt
*/</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172659.jpg"><img class="alignnone size-large wp-image-692" title="2011-08-17_172659" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172659-540x267.jpg" alt="" width="540" height="267" /></a>
<h2>三、readdir</h2>
readdir這個函式讓我一度有錯覺懷疑他根本沒有出現的必要，他的使用很麻煩，功能又不像glob那麼強大，要使用他必須要先開啟資料夾（opendir），然後把檔案代碼傳到readdir才可以使用，用完之後還要closedir，除了這點比較麻煩以外，他的回傳值是String，執行一次讀取一次，也就是他執行時會取得第一項檔案的資料，在執行第二次會取得第二筆資料，運作上跟mysql_fetch_row一樣，除此之外他的回傳值格式跟scandir一樣，第一個是「.」，第二個是「..」

官方文件：<a href="http://php.net/manual/en/function.readdir.php">http://php.net/manual/en/function.readdir.php</a>

範例：
<pre lang="php">$handle=opendir('C:UserslinroexDropboxmusic');
while(false!==($file=readdir($handle))){
	echo $file . '</ br>';
}

closedir($handle);</pre>
<p lang="php"><a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172425.jpg"><img title="2011-08-17_172425" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172425-540x321.jpg" alt="" width="540" height="321" /></a></p>
