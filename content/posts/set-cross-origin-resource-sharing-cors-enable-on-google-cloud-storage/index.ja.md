---
title: "Google Cloud Storage で CORS を有効にする"
date: 2016-12-02T13:50:59
slug: "set-cross-origin-resource-sharing-cors-enable-on-google-cloud-storage"
tags: ["GCP", "CORS"]
categories: ["Programming"]
draft: false
---

最近、サークルの授業で Phaser を使った小さなゲームの作り方を教えているのですが、受講生が CodePen で使う素材がたくさんあります。そのため、素材を置くのに CORS に対応したストレージが必要になりました。いろいろ考えているうちに、安く、しかも自分のドメインを紐付けられる Google Cloud Storage を思いつきました！

Google Cloud Storage は、初期設定では Cross-Origin Resource Sharing（CORS）に対応していません。ただし、gsutil（Google Cloud Storage の CLI ツール）を使えば、指定したバケットで CORS を有効にできます！


<!--more-->

<blockquote>CORS は、JavaScript が異なるドメインのリソースにアクセスできるようにする仕組みです。かつての JSONP と同じ目的ですが、CORS は現在の業界標準であり、主要なブラウザはすべて対応しています。</blockquote>
まず、gsutil をインストールして設定してください。公式チュートリアル <a href="https://cloud.google.com/sdk/docs/">Install the latest Cloud Tools version</a> を参照できます。

次のコマンドで、指定したバケットに対して、指定したドメインまたは全員がリソースにアクセスできるように設定できます。設定が反映されない場合は、別のパソコンを使うか、シークレットウィンドウで試してください。私は一度設定してもうまくいかず、パケットを取得して確認したところ、ヘッダーには確かに CORS が有効になっていました。最終的に、原因は Chrome のキャッシュだと分かりました……キャッシュは本当に強力ですね……

gsutil cors set cors.config.json gs://s.ntustcoding.club

cors.config.json の内容は次のとおりです：
<pre>[
  {
    "origin": ["http://example.appspot.com"],
    "responseHeader": ["Content-Type"],
    "method": ["GET", "HEAD", "DELETE"],
    "maxAgeSeconds": 3600
  }
]</pre>
最も重要なのは origin フィールドです。リソースへのアクセスを許可するドメインは複数設定できますし、* にすると全員がアクセスできるようになります。

参考：<a href="https://cloud.google.com/storage/docs/cross-origin">Google Cloud Storage - Cross-Origin Resource Sharing (CORS)</a>
