---
title: "Facebook Graph API で一部のユーザーの Email 欄を取得できない問題の解決方法"
date: 2016-12-02T12:18:56
slug: "facebook-graph-api-missing-email-fix"
tags: ["Facebook API", "PHP"]
categories: ["Programming"]
draft: false
---

最近、ちょっと面白い小さな問題に出会いました。私たちが開発したコンテスト投票システムで、ごくまれに投票できないユーザーがいたのです。このシステムは Laravel で開発されていて、ユーザーは Facebook でログインして、指定された作品に投票できます（1 日 1 票）。抽選に使うため、取得しているのは最低限の Email と Name だけです。テストの時点では問題なく動いていましたが、公開後、ごく一部のユーザーから、投票後に「whoops looks like something went wrong」というエラーメッセージが表示されるという報告がありました。大部分のユーザーは正常に投票できていました。


<!--more-->


<img class="alignnone size-full wp-image-6977" src="{{< param imageBase >}}/wp-content/uploads/2016/12/123.png" alt="123" width="1011" height="578" />

この問題が起きたとき、ユーザーに使用したブラウザ、Facebook アカウント、メールアドレス、投票した時刻などの情報を提供してもらい、laravel.log でその時刻を調べました。すると、やはり！
<blockquote>[2016-11-22 22:21:27] local.ERROR: exception 'ErrorException' with message 'Undefined index: email' in /var/www/laravel/vendor/facebook/php-sdk-v4/src/Facebook/GraphNodes/Collection.php:201</blockquote>
このエラーメッセージを見て、いくつか考えられる原因が浮かびました。
<ol>
 	<li>そのユーザーの Facebook アカウントが、私たちの Facebook アプリに email 権限を許可していない</li>
 	<li>そのユーザーの Facebook アカウントに Email がない。ただ、それは不合理に思える。Facebook に登録するときは必ず入力が必要なはずでは！？</li>
</ol>
最初の原因を考えて、ユーザーに連絡を取ってみましたが、そのユーザーの Email は公開設定になっていることが分かりました…… ここで事件は藪の中になってしまいました（笑）。

その後、Facebook Graph API の開発ドキュメントを読み直しました。うーん、やはりドキュメントはよく読まなければいけませんね。見落とすと大変なことになります。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/Graph_API_User.png"><img class="alignnone size-full wp-image-6975" src="{{< param imageBase >}}/wp-content/uploads/2016/12/Graph_API_User.png" alt="graph_api_user" width="698" height="140" /></a>

<a href="https://developers.facebook.com/docs/graph-api/reference/user">Facebook Developer Docs - Graph API User</a>

しかし、この時点でもまだ、メールアドレスが「未認証」なのが原因なのかどうかは確信が持てませんでした。過去の経験から、Facebook アカウントは必ずメールアドレスを入力して認証しないと使えないはずだからです。そこで、新しいアカウントを自分で登録してみました。すると、今の Facebook でも登録時には必ず Email の入力が求められ、確認メールも送られてくることが分かりました。ただし、認証には携帯電話番号を選ぶこともでき、その場合は未認証のメールアドレスをそのまま残しておけるのです！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/一般帳號設定.png"><img class="alignnone size-full wp-image-6976" src="{{< param imageBase >}}/wp-content/uploads/2016/12/一般帳號設定.png" alt="%e4%b8%80%e8%88%ac%e5%b8%b3%e8%99%9f%e8%a8%ad%e5%ae%9a" width="813" height="615" /></a>

つまり、Facebook のアカウントには必ず Email が存在しますが、ユーザーが携帯電話の SMS で認証している場合があります。そのため、未認証の状態では、Email が存在していても Graph API 経由でアプリに送られてこないのです。

ここで三つの結論をまとめます。
<ul>
 	<li>プログラムを書くときは、ドキュメントを一字一句読み通すこと。面白い注意書きが必ず書かれていて、これまで何度も確かめてきましたが、外れたことはありません</li>
 	<li>Facebook Graph API で取得できる Email は必ず認証済みのものなので、確認メールを再送する必要はない</li>
 	<li>Facebook Graph API では、ユーザーがメールアドレスを未認証の場合に Email を取得できないことがあるので、プログラムではその場合を必ず処理する必要がある。また、エラーログを見ると、この状況は決して少なくないようです……</li>
</ul>
