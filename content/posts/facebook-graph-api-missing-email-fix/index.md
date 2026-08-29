---
title: "Facebook Graph API 部分用戶無法取得 Email 欄位的解決方法"
date: 2016-12-02T12:18:56
slug: "facebook-graph-api-missing-email-fix"
aliases: ["/posts/facebook-graph-api-%e9%83%a8%e5%88%86%e7%94%a8%e6%88%b6%e7%84%a1%e6%b3%95%e5%8f%96%e5%be%97-email-%e6%ac%84%e4%bd%8d%e7%9a%84%e8%a7%a3%e6%b1%ba%e6%96%b9%e6%b3%95/"]
tags: ["PHP", "Facebook", "facebook-graph-api"]
categories: []
---

最近遇到一個很有趣的小問題，我們開發的一個競賽投票系統遇到零星使用者無法投票的問題，該系統以 Laravel 開發，讓使用者可以透過 Facebook 登入後，投票給指定的作品，每日一票，只取得最基本的 Email、Name 資料以供抽獎用，在測試時一切安好沒問題，可是上線後卻有零星的使用者抱怨投票完顯示錯誤訊息「whoops looks like something went wrong」而大部分使用者是可以正常投票的。


<!--more-->


<img class="alignnone size-full wp-image-6977" src="{{< param imageBase >}}/wp-content/uploads/2016/12/123.png" alt="123" width="1011" height="578" />

遇到這問題時，我們請使用者提供他所使用的瀏覽器、Facebook 帳號、信箱、投票時間等資訊，到 laravel.log 裡面一查這時間，果然！
<blockquote>[2016-11-22 22:21:27] local.ERROR: exception 'ErrorException' with message 'Undefined index: email' in /var/www/laravel/vendor/facebook/php-sdk-v4/src/Facebook/GraphNodes/Collection.php:201</blockquote>
看到這錯誤訊息後我們有了幾個想法：
<ol>
 	<li>該用戶臉書帳號不開放 email 權限給我們的 Facebook App</li>
 	<li>該用戶臉書帳號沒有 email，但想想又不合理，註冊臉書時不是一定要填寫嗎！？</li>
</ol>
我們朝著第一個原因去和使用者聯繫，結果卻發現該用戶的 Email 是設為公開的... 至此案件陷入羅生門（誤

後來我重新看了 Facebook Graph API 的開發文件，恩，很好，果然文件要詳細看，漏看是會爆炸的

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/Graph_API_User.png"><img class="alignnone size-full wp-image-6975" src="{{< param imageBase >}}/wp-content/uploads/2016/12/Graph_API_User.png" alt="graph_api_user" width="698" height="140" /></a>

<a href="https://developers.facebook.com/docs/graph-api/reference/user">Facebook Developer Docs - Graph API User</a>

但到這邊我還不太確定是不是因為「信箱未驗證」所以無法取得信箱，因為就過去的經驗，註冊 Facebook 帳號一定要填寫信箱並驗證，否則根本無法使用，於是我就自己重新註冊了一個新帳號，結果發現現在的 Facebook 帳號註冊，一定要填寫 Email 沒錯，也會寄驗證信沒錯，但你可以選擇用手機號碼進行驗證，然後把未驗證的信箱放者！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/一般帳號設定.png"><img class="alignnone size-full wp-image-6976" src="{{< param imageBase >}}/wp-content/uploads/2016/12/一般帳號設定.png" alt="%e4%b8%80%e8%88%ac%e5%b8%b3%e8%99%9f%e8%a8%ad%e5%ae%9a" width="813" height="615" /></a>

換句話說，每個 Facebook 帳號都一定會有 Email 沒錯，但使用者可能是用手機簡訊認證，所以這個 Email 在未驗證的情況下，即使存在，也不會透過 Graph API 傳送給 App。

這邊做三個結論：
<ul>
 	<li>寫程式時，文件一定要一個字一個字好好讀完，總是會有些好玩的備註寫在裡面，屢試不爽</li>
 	<li>Facebook Graph API 取得的 Email 一定都是驗證過的，所以無需重新寄一次驗證信</li>
 	<li>Facebook Graph API 有可能因為使用者未驗證信箱的關係導致無法取得 Email，程式開發上面需要做好判斷，此外就錯誤記錄來看該情況還真不算少數...</li>
</ul>
