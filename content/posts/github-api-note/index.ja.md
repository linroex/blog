---
title: "GitHub API メモ"
date: 2017-02-23T23:59:42
slug: "github-api-note"
tags: ["GitHub", "API"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/02/github.png"]
draft: false
---

ここ数日、ダッシュボードを開発する必要があり、Trello と GitHub の API に触れる機会がありました。そのときの情報を整理したので、GitHub API を使う必要がある方は、ぜひこの記事を読んでみてください。GitHub も RESTful HTTP API の形式を採用しており、開発はとても簡単です。HTTP API の連携経験がある人なら、特にすぐに使いこなせるでしょう。私が見てきた中でも、GitHub API はトップクラスに API フレンドリーだと思います。ドキュメントがわかりやすいだけでなく、API も豊富なパラメータを用意しています。さらに将来は GraphQL API も提供される予定で、とても楽しみです！


<!--more-->

<ul>
 	<li>GitHub Developer： <a href="https://developer.github.com/">https://developer.github.com/</a></li>
 	<li>GitHub API Reference： <a href="https://developer.github.com/v3/">https://developer.github.com/v3/</a></li>
</ul>
GraphQL API に興味がある場合は、<a href="https://developer.github.com/early-access/">Early Access Program</a> から申請できます。

初めて HTTP API を試す場合は、<a href="https://developer.github.com/guides/">Quick Started</a> を読んでください。

各プログラミング言語には、公式・非公式の SDK が用意されています。<a href="https://developer.github.com/libraries/">GitHub API Libraries</a> を参照してください。もちろん、HTTP API を直接呼び出しても問題ありません。

GitHub API でできることも多くあります。Commit、Pull Request、Issue、User、Repo のいずれも操作でき、パラメータも非常に細かく指定できます。たとえば私は「最新でマージされた PR を 5 件取得する」必要がありましたが、GitHub が提供しているソートのフィールド（updated_at、created_at など）とソート方向（ASC、DESC）のパラメータのおかげで、簡単に解決できました。

開発ドキュメントの上部（下の画像を参照）には多くの情報がありますが、この設計は見落とされやすいことがあります。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/GitHub_API_v3___GitHub_Developer_Guide.png"><img class="alignnone size-large wp-image-7506" src="{{< param imageBase >}}/wp-content/uploads/2017/02/GitHub_API_v3___GitHub_Developer_Guide-1024x640.png" alt="" width="660" height="413" /></a>

GitHub は API のほかに <a href="https://developer.github.com/webhooks/">Webhook</a> も提供しています。API タブには Webhook API がありますが、上部には Webhook タブもあります。実はこの 2 つは別物です。Webhook API は Webhook の作成、照会、削除を行うためのものです。Webhook 自体の書き方については、上部の Webhook タブを確認する必要があります。Webhook を設定したい場合は、リポジトリの Settings ページから直接設定するか、Webhook API を使って作成できます。
<ul>
 	<li><a href="https://developer.github.com/webhooks/">GitHub Webhook Docs</a>（Webhook API ではない）</li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-24-上午1.23.26.jpg"><img class="alignnone size-full wp-image-7505" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-24-上午1.23.26.jpg" alt="" width="1013" height="782" /></a>

開発を始める前に、<a href="https://developer.github.com/v3/">Overview</a> を最後まで読むことをおすすめします。役立つ情報がたくさん含まれています。自分で RESTful API を開発する場合にも、GitHub API の Overview を読んで、重要または興味深い部分を抜き出して紹介します。
<ul>
 	<li>API Root Endpoint： <a href="https://api.github.com">https://api.github.com</a></li>
</ul>
Overview には <a href="https://developer.github.com/v3/#rate-limiting">Rate Limit</a> についても書かれています。多くの開発者が見落としがちな点ですが、非常に重要です。奇妙なバグが Rate Limit に関係していることもあります。最近は、AWS や Google API に限らず、どのサードパーティのサービスを使う前にも「制限」の部分を確認する習慣をつけています。呼び出しすぎてデータを失ったり、ブロックされたりしないためです。興味深いことに、GitHub は HTTP ヘッダーに Rate Limit の情報を含めています。上限、残りの利用量、リセットまでの時間が含まれているため、プログラムの中で判断に使えます。

返されるデータのうち、時刻に関する項目はすべて GMT+0 です。適切なタイムゾーンに変換することを忘れないでください。たとえば、コミット数の時系列の変化をグラフにしたかったのですが、タイムゾーンの誤りのせいで、描画された 1 日ごとのコミット数が想定と異なっていました。
<ul>
 	<li><a href="https://developer.github.com/v3/#rate-limiting">GitHub API Overview - Rate Limit</a></li>
</ul>
また、GitHub API は CORS と JSONP に対応しています。

認証については、OAuth は必ず対応する必要がありますが、用途に応じて GitHub はほかの方法も提供しているので、OAuth を避け続けることもできます（冗談です）。
<ul>
 	<li>ユーザーとやり取りして、ユーザーの GitHub データにアクセスする必要がある場合：素直に OAuth を使いましょう。ドキュメントは <a href="https://developer.github.com/v3/oauth/">GitHub API OAuth</a> を参照してください。</li>
 	<li>バックエンドで動作し、対話のない処理、たとえば会社のプロジェクトをこっそり自動バックアップする小さなプログラムの場合：Personal Access Token を使えます。有効期限がなく、プライベートリポジトリや組織のリポジトリにもアクセスできます。GitHub の Settings からユーザーが操作するだけで取得でき、プログラムに直接入れれば動作します。詳しくは <a href="https://developer.github.com/v3/auth/#basic-authentication">Github API Basic Authentication</a> を参照してください。</li>
</ul>
<pre>curl -u username:token https://api.github.com/user</pre>
もちろん、キーを使わずにアカウントとパスワードで認証することもできます。ただ、開発者としてそれを本当にやる勇気がありますか？ 少なくとも Personal Access Token を使うことをおすすめします。万一トークンが漏洩しても、取り消せば解決しますし、Personal Access Token では権限の管理もできます。

Personal Access Token で認証すれば、二要素認証の問題も解決できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/Personal_Access_Tokens.png"><img class="alignnone size-large wp-image-7507" src="{{< param imageBase >}}/wp-content/uploads/2017/02/Personal_Access_Tokens-1024x776.png" alt="" width="660" height="500" /></a>

Personal Access Token の権限を管理できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/New_personal_access_token.png"><img class="alignnone size-large wp-image-7508" src="{{< param imageBase >}}/wp-content/uploads/2017/02/New_personal_access_token-1024x734.png" alt="" width="660" height="473" /></a>

最後に、ドキュメントには返されるデータ件数の制限方法が特に書かれていません。実はその機能は、ページネーションという別の名前で提供されています。per_page パラメータを使えば、件数を制限するのと同じ効果が得られます。
<ul>
 	<li>per_page： N 件ごとに 1 ページに分割</li>
 	<li>page： M ページ目を取得</li>
</ul>
<pre>https://api.github.com/repo/linroex/hello/commits?per_page=10&amp;page=1</pre>
GitHub は、まさにエンジニアに寄り添うサービスの会社だと言わざるを得ません。API がフレンドリーなだけでなく、ドキュメントも詳細で読みやすく、全体の設計の流れも良いです。Auth すら見つからなかった Trello API や、一覧にはある機能なのに使えなかった Facebook Graph API とは大違いです。GitHub、大好き！
