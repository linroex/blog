---
title: "ウェブサイトで CORS が正しく設定されているかをテストする方法"
date: 2017-01-04T11:58:44
slug: "test-cors-enabled-on-website"
tags: ["CORS", "cURL"]
categories: ["Programming"]
draft: false
---

Cross-Origin Resource Sharing（以下 CORS）を設定すると、JavaScript はブラウザの同一オリジンポリシーを回避して、別のドメインのリソース（API）にアクセスできるようになります。ただ、CORS を設定するたびに、サーバーが本当に正しく設定されたかどうかを判断するのに頭を悩ませます。ブラウザが CORS の結果をキャッシュすることがあり、そのためサーバーの設定に問題がなくても、ページを何度再読み込みしても失敗し続けることがあるからです。ここでは cURL を使って header を直接確認し、CORS が有効になっているかどうかを調べる方法をご紹介します！


<!--more-->


cURL でブラウザの動作をまねて、サーバーにリソースを要求します。CORS は実際には、レスポンスの header に Access-Control-Allow-Origin を追加する仕組みで、ブラウザはそれを見て後続の処理を行います。そのため、header に Access-Control-Allow-Origin があるかどうかを確認するだけで、設定が正しいかどうかがわかります。これは最も基本的な方法です。この方法で確認して Access-Control-Allow-Origin が見つからなければ、間違いなくサーバーの設定ミスです！
<pre>curl --verbose -XPOST "https://coder.tw"</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-05-上午12.58.19.jpg"><img class="alignnone size-full wp-image-7189" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-05-上午12.58.19.jpg" alt="" width="945" height="664" /></a>

とても簡単です。-verbose オプションを付けるだけで、cURL が詳細な過程を表示してくれます。レスポンスに「&lt; Access-Control-Allow-Origin」が含まれていれば、CORS の設定は成功しています。もちろん、設定したドメインが正しいかどうかも確認する必要があります。
