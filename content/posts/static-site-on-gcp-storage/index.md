---
title: "第一次在 GCP Storage 放置靜態網頁就上手"
date: 2017-04-10T09:20:02
slug: "static-site-on-gcp-storage"
aliases: ["/posts/%e7%ac%ac%e4%b8%80%e6%ac%a1%e5%9c%a8-gcp-storage-%e6%94%be%e7%bd%ae%e9%9d%9c%e6%85%8b%e7%b6%b2%e9%a0%81%e5%b0%b1%e4%b8%8a%e6%89%8b/"]
tags: ["GCP"]
categories: ["Blog"]
---

想要在 Google Cloud Storage 放置靜態網頁卻不知從何下手嗎？每次把檔案放到 Google Cloud Storage 分享給朋友還要按「公開」很麻煩麻？  這幾天因為工作需求研究了下，最開始以為只要設定好 Domain 並將檔案共享就可以了，研究後才知道還有許多小撇步，例如每次上傳檔案都要設定公開實在麻煩，其實可以設定上傳到指定 Bucket 預設都公開，甚至還可以設定 Index、404 頁面的預設檔案名稱，甚至一直以為無解的 SSL 問題，官方也提示了不錯的解法！


<!--more-->


詳細的說明可以參考官方文件 <a href="https://cloud.google.com/storage/docs/hosting-static-website">Hosting a Static Website</a> 內容十分完整，這邊簡單用中文介紹並分享我的心得：

gsutil 工具是一定要裝的，請還沒安裝的客官往這邊走 <a href="https://cloud.google.com/sdk/docs/">Install the Google Cloud Tools</a>。

這篇文章將會介紹到：
<ul>
 	<li>在 Storage 上設定自己的 Domain</li>
 	<li>自訂 Domain + SSL</li>
 	<li>設定檔案上傳後預設 Public
<ul>
 	<li>設定現在的檔案全部 Public</li>
</ul>
</li>
 	<li>設定 Index、404 預設檔案名稱</li>
</ul>
<h2>Custom Domain</h2>
雖然Storage 有提供公開檔案一組網址，例如：
<blockquote>https://storage.googleapis.com/s.ntust.me/ncc.png</blockquote>
但我相信如果今天你想要部署網頁到 Storage 上，肯定不想用這網址，而是希望綁定自己的域名對吧！

首先，將你想綁定的域名丟到 Google Webmaster 認證，接著設定該域名 CNAME：
<pre>s.ntust.me  CNAME  c.storage.googleapis.com</pre>
接著開設一個 Bucket ，名稱需要和域名相同，到這裡就大功告成啦！

趕快上傳檔案並設為公開試試，雖然在公開共用的連結你依舊會拿到 Google 預設的：
<blockquote>http<span style="color: #ff0000;">s</span>://<span style="color: #ff0000;">storage.googleapis.com/</span>s.ntust.me/ncc.png</blockquote>
但其實稍做修改，把 https 改為 http，並把 storage.googleapis.com 拿掉就可以囉！其實就是用自己的 Domain 加上檔案路徑啦！
<blockquote>http://s.ntust.me/ncc.png</blockquote>
<h2>SSL</h2>
你肯定注意到了，自訂域名是無法使用 SSL 的，這簡直就是差別待遇呀！！ 不過沒關係，官方文件裡也提出了解法，像是 Cloudflare 之類的 CDN 都有提供 SSL 功能，只要把 Domain 綁在 CDN 上，並讓 CDN 把流量導引到 Storage 就可以囉！
<h2>檔案上傳後自動公開</h2>
每次上傳檔案到 Storage 最麻煩的就是要設定「公開共用」，檔案一多或是有資料夾就會讓人崩潰，而且如果上傳同名檔案覆蓋後也會需要在設定一次，但其實透過 gsutil 有許多方式可以處理這問題！

設定 Bucket 新上傳的檔案預設公開，只能針對 Bucket 設定，不朔及既往
<pre> gsutil defacl set public-read gs://s.ntust.me</pre>
設定某資料夾（or Bucket）底下所有檔案、目錄為公開
<pre>gsutil acl set -r public-read gs://s.ntust.me/iatp</pre>
<h2>設定 Index、404 Page</h2>
在 Apace、Nginx 上預設會將 index.html 視為首頁，例如 http://s.ntust.me/ 和 http://s.ntust.me/index.html 是相同的，但在 Storage 上這件事情需要特別設定否則無效，此外 Storage 也提供設定 404 Not Found 頁面的功能，這簡直就是為我這種把網頁放在 Storage 的人而設計的功能呀！

透過這行指令，設定在 s.ntust.me Bucket 的預設首頁為 index.html，404 頁面為 404.html
<pre class="prettyprint"><span class="pln">gsutil web </span><span class="kwd">set</span> <span class="pun">-</span><span class="pln">m index</span><span class="pun">.</span><span class="pln">html </span><span class="pun">-</span><span class="pln">e </span><span class="lit">404.html</span><span class="pln"> gs</span><span class="pun">:</span><span class="com">//s.ntust.me</span></pre>
&nbsp;
