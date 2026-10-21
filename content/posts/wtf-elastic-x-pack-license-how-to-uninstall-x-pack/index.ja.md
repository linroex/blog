---
title: "WTF Elastic X-Pack License - X-Pack をアンインストールする方法"
date: 2017-01-16T10:30:47
slug: "wtf-elastic-x-pack-license-how-to-uninstall-x-pack"
tags: ["Elasticsearch", "Kibana"]
categories: ["SRE"]
draft: false
---

検索エンジンからこの記事にたどり着いたのであれば、きっと私と同じく X-Pack に対して山ほどの不満を抱えているのでしょう。最初は、X-Pack は無料で使える便利なプラグインだと思い、Elasticsearch と Kibana にインストールしました。ところが 30 日後、ライセンスの期限が切れたので「ライセンスキーを更新」する必要がある、さもないと Kibana にログインできない、という通知が表示されました。ここまでは、アカウントを登録すれば新しいライセンスキーがもらえるのだろうと思っていました。ところが公式サイトをかなり探しても、ライセンス・料金・購入に関する文言はまったく見つかりませんでした。（後で分かったのですが、実は書いてありました。非常に小さい字で……。お金を稼ぐ気があるのでしょうか。）最終的に、価格プランのページを見つけたのは Google 検索のおかげでした。


<!--more-->


お金を取るつもりなら、料金プランをもっとはっきり書いてください。正直、Elastic は UX を誰も気にしていないのか、それとも戦略なのか、よく分かりません。30 日間使わせてから「実は有料だった」と気づかせるのは、戦略なのでしょうか。X-Pack のドキュメントや公式サイトには、有料であることを示す情報がほとんどありません。何人かの友人に聞いても、みな 30 日たって初めて有料だと知ったそうです。少しだまされたような気分です。お金を払うこと自体は構いません。良いものは支持したいと思っています。<del>（どうせ会社の財布ですし）</del>。ただ、公式サイトに料金の情報がまったく見つからないのはどうなのでしょう。お金を払おうとしているのに、支払いページを Google で探さなければならないのは、どういうつもりなのでしょうか？

ライセンスプラン：<a href="https://www.elastic.co/subscriptions">https://www.elastic.co/subscriptions</a>

金額がいくらかは、聞かないほうがいいです。怖くなるので。サイトには「営業にお問い合わせください」としか書かれていません。このように書かれているときは、だいたい察しがつくでしょう……。さらに悪いことに、部分的に購入することはできません。たとえば Auth だけを買って、ほかの機能は買わない、といったことはできず、Elastic の支払いプランは一種類しかありません。お金がない方はお引き取りください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/FireShot-Capture-4-X-Pack_-Extend-Elasticsearch-with-Sli_-https___www.elastic.co_products_x-pack.png"><img class="alignnone wp-image-7239 size-medium" src="{{< param imageBase >}}/wp-content/uploads/2017/01/FireShot-Capture-4-X-Pack_-Extend-Elasticsearch-with-Sli_-https___www.elastic.co_products_x-pack-103x300.png" width="103" height="300" /></a>

さて、ここまで読んで、きっと皆さんも私と同じく X-Pack を削除することを選ぶと思います。ここで注意してほしいのは、削除するときに Elaskticsearch の X-Pack Plugin だけを削除しないことです。Kibana の X-Pack も削除してくださいね。ブラウザーで「too many redirect」というエラーが出たら、Kibana の X-Pack の削除を忘れている証拠です。
<pre>cd /usr/share/elasticsearch/bin/
./elasticsearch-plugin remove x-pack

cd /usr/share/kibana/bin/
./kibana-plugin remove x-pack</pre>
基本的にはこれで削除は完了です。続けて、【<a href="https://coder.tw/?p=7235">Elasticsearch、Kibana ユーザー認証の設定</a>】の記事も参考になります。この記事では、HTTP Auth を使った基本的なユーザーログイン処理を紹介しています（Lua と組み合わせて、より複雑な処理をすることもできます）。

補足：読者の方からの情報提供に感謝します。基本機能の無料ライセンスキーを申請したい場合は、<a href="https://register.elastic.co/">こちらのページ</a>からどうぞ。
