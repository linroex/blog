---
title: "Trello API Note"
date: 2017-02-22T23:59:29
slug: "trello-api-note"
tags: ["Trello"]
categories: []
---

今天因為在開發公司 Dashboard 的關係，需要寫程式去計算每天的開發點數，讓 Dashboard 能夠呈現每個月的開發點數變化，所以玩了 Trello API，簡單筆記在這裡。 前情提要，我們部門使用 Scrum 的點數方式來評估開發進度，幫每個 Issue 設定一個難度點數，搭配 Trello Scrum 外掛使用。


<!--more-->


Trello API 的功能蠻強大的，可以讓你對 Trello 做各種奇怪的事情，開發文件以 JavaScript 為主，看起來是希望你打造 Browser Extension 類的應用，也有提供 <a href="https://developers.trello.com/clientjs">JS SDK</a> 供使用，不過 API 本身是 HTTP 的，所以其他語言也可以無障礙使用，回傳的資料格式都是 JSON。

API Reference：<a href="https://developers.trello.com/advanced-reference">https://developers.trello.com/advanced-reference</a>

API 使用跟其他網站很類似，如果有 Facebook API 之類的開發經驗，文件一看就能懂了，認證方面支援 OAuth 和 Auth Router（給你網址直接跳轉），不過很有趣的是，你可以自己去它的官網逛一遍，會發現 Auth 的相關資訊實在藏得有夠深...

附上快速導覽路線給大家，記得先登入 Trello，不會自動跳轉：
<ul>
 	<li>取得 App Key：  <a href="https://trello.com/app-key">https://trello.com/app-key</a></li>
 	<li>認證相關文件： <a href="https://developers.trello.com/authorize">https://developers.trello.com/authorize</a></li>
</ul>
此外 Trello 有提供 Sandbox 方便你開發，個人覺得這名字取的不好，其實功能和 Facebook Graph API Explorer 相同，可以讓你直接在上面寫 JS 並取得資料。

我的需求是想拿到每天完成的卡片，並將卡片名稱、使用的點數存進資料庫，卡片名稱像這樣：修漏洞修漏洞嗚嗚嗚 (3.5)，後面的 (3) 代表實際耗用的難度。

授權部分因為懶得去串 OAuth，所以選擇最簡單的方式，用 client.js 取得 expire: never 的 token 後直接用印出來，這邊要注意 client.js 會在認證完成後自動將 token 存進 localStorage，參考如下程式碼：
<pre>&lt;script&gt;
  localStorage.clear();
  Trello.authorize({
    type: 'redirect',
    name: '貝殼放大',
    expiration: 'never',
    success: ()=&gt;console.log(localStorage.trello_token)
  });
&lt;/script&gt;</pre>
P.s. Trello client.js 會需要搭配 jQuery 使用。

取得 access_token 後就可以參考 <a href="https://developers.trello.com/advanced-reference">API Reference</a> 開工啦！

雖然 Trello 的文件算蠻完整了，但還是要提醒一下，以取得卡片來說，預設會是用「建立日期」來排序，不能指定排序的方向或欄位（醜一），而且回傳的資料裡只有「上次修改時間」沒有「建立日期」！！！

P.S. 如果想取得一張卡片的建立日期，可以用 GET /cards/{card_id}/actions?filter=createCard 的方式取得。
