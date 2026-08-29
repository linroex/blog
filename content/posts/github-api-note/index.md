---
title: "GitHub API Note"
date: 2017-02-23T23:59:42
slug: "github-api-note"
tags: ["API", "Github", "RESTFul API", "OAuth"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2017/02/github.png"]
---

這幾天因為開發 Dashboard 的關係，接觸了 Trello 和 GitHub 的 API，把一些資訊整理起來，如果你也有GitHub API 的使用需求，可以來讀讀這篇文章。GitHub 也是採用 RESTful HTTP API 的形式，開發起來十分簡單，對於有 HTTP API 串接經驗的人更是好上手；GitHub API 算是我看過數一數二的 API Friendly，文件十分好理解不說，API 也提供很完整的參數供選擇，甚至未來還會提供 GraphQL API，真是令人期待！


<!--more-->

<ul>
 	<li>GitHub Developer： <a href="https://developer.github.com/">https://developer.github.com/</a></li>
 	<li>GitHub API Reference： <a href="https://developer.github.com/v3/">https://developer.github.com/v3/</a></li>
</ul>
如果對 GraphQL API 有興趣，可以到 <a href="https://developer.github.com/early-access/">Early Access Program</a> 申請。

如果是第一次嘗試 HTTP API，可以閱讀 <a href="https://developer.github.com/guides/">Quick Started</a>。

各程式語言都有一些官方、非官方的 SDK 可以使用，可參考 <a href="https://developer.github.com/libraries/">GitHub API Libraries</a>，或是直接串 HTTP API 也無不可。

GitHub API 能夠做的事情也不少，包含 Commit、Pull Request、Issue、User、Repo 都可以操作，而且參數給的很細，像我需要取得「最新 Merged 的前 5 筆 PR」，得益於GitHub 提供排序欄位（updated_at、created_at...etc）、排序方向（ASC、DESC）參數，讓我可以輕鬆解決問題。

在開發文件的上排（參考下圖）其實有蠻多資訊，不過這設計有時不會被注意到。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/GitHub_API_v3___GitHub_Developer_Guide.png"><img class="alignnone size-large wp-image-7506" src="{{< param imageBase >}}/wp-content/uploads/2017/02/GitHub_API_v3___GitHub_Developer_Guide-1024x640.png" alt="" width="660" height="413" /></a>

GitHub 除了 API 也有提供 <a href="https://developer.github.com/webhooks/">Webhook</a>， 在 API Tab 裡面會看到 Webhook API ，但在上排也有 Webhook Tab，其實他們是不同的，Webhook API 可以幫助你新增、查詢、刪除 Webhook，至於 Webhook 本身該怎麼寫則是要看上排的 Webhook Tab。如果你要綁定 Webhook，可以直接到 Repo 的 Setting 頁面，或是使用 Webhook API 來建立 Webhook。
<ul>
 	<li><a href="https://developer.github.com/webhooks/">GitHub Webhook Docs</a> (Not Webhook API)</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-24-上午1.23.26.jpg"><img class="alignnone size-full wp-image-7505" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-24-上午1.23.26.jpg" alt="" width="1013" height="782" /></a>

在開發前，建議把 <a href="https://developer.github.com/v3/">Overview</a> 讀完，裡面有許多實用的資訊，如果你有要開發自己的 RESTful API 也可以讀讀 Github API 的 Overview，擷取其中重要或有趣的幾段來分享：
<ul>
 	<li>API Root Endpoint： <a href="https://api.github.com">https://api.github.com</a></li>
</ul>
在 Overview 裡面有提到 <a href="https://developer.github.com/v3/#rate-limiting">Rate Limit</a> ，這是許多開發者都會忽略的細節卻十分重要，有時一些莫名其妙的 Bug 往往跟 Rate Limit 有關，最近慢慢養成習慣，在使用任何第三方的服務，即使是 AWS、Google API，都要先看看「限制」的部分，避免呼叫得太開心卻掉資料或是被封鎖；有趣的是 GitHub 會在 HTTP Header 裡面放置 Rate Limit 相關資訊，包含上限、剩餘用量、距離重設還有多久，如此一來就可以在程式裡做判斷。

回傳的資料，任何和時間有關的欄位，都是 GMT+0，記得換算成合適的時區，例如我希望繪製時間序列的 Commits 數量變化，但因為時區錯誤，導致繪製出來每一天的 Commit 數量和預期不同。
<ul>
 	<li><a href="https://developer.github.com/v3/#rate-limiting">GitHub API Overview - Rate Limit</a></li>
</ul>
此外 GitHub API 有支援 CORS 和 JSONP。

授權部分 ，OAuth 是一定要支援的，但因應不同需求，GitHub 還提供了其他方式給你使用，讓你可以繼續逃避 OAuth（誤）
<ul>
 	<li>和使用者互動，會需要存取使用者 GitHub 資料：乖乖使用 OAuth，文件可參考 <a href="https://developer.github.com/v3/oauth/">GitHub API OAuth</a>。</li>
 	<li>在後端運作的，無互動的，例如默默自動備份公司專案的小程式：可以使用 Personal Access Token，可永久使用沒有有效期限，可以存取 Private Repo、組織 Repo，只需要由使用者到 Github Setting 操作就可以取得，直接放入程式就可以運作。詳細請參考 <a href="https://developer.github.com/v3/auth/#basic-authentication">Github API Basic Authentication</a>。</li>
</ul>
<pre>curl -u username:token https://api.github.com/user</pre>
當然，也可以不使用金鑰，直接用帳號、密碼做授權，但身為開發者，你敢嗎？ 建議最起碼用 Personal Access Token，如果真的 Token 外洩只要撤銷就可以解決，而且 Personal Access Token 還可以做權限管控。

如果使用 Personal Access Token 做授權，也可以解決雙因素驗證的問題。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/Personal_Access_Tokens.png"><img class="alignnone size-large wp-image-7507" src="{{< param imageBase >}}/wp-content/uploads/2017/02/Personal_Access_Tokens-1024x776.png" alt="" width="660" height="500" /></a>

可以對 Personal Access Token 做權限控管

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/New_personal_access_token.png"><img class="alignnone size-large wp-image-7508" src="{{< param imageBase >}}/wp-content/uploads/2017/02/New_personal_access_token-1024x734.png" alt="" width="660" height="473" /></a>

最後，在文件裡沒有特別提到該如何限制回傳資料數，其實他只是換了個名字用 Pagenation 呈現，透過 per_page 這個參數就可做到跟限制資料筆數同樣的效果。
<ul>
 	<li>per_page： 每 N 筆分一頁</li>
 	<li>page： 取得第 M 頁</li>
</ul>
<pre>https://api.github.com/repo/linroex/hello/commits?per_page=10&amp;page=1</pre>
不得不說 GitHub 真不愧是一間服務工程師的公司，API 友善不說，連文件都這麼詳細好閱讀，動向設計也不錯，不像之前讀 Trello API 連 Auth 都找不到，或是 Facebook Graph API 明明有列出來的功能卻不能用，GitHub I Love You！
