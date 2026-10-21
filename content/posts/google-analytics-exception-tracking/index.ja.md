---
title: "Google Analytics の例外トラッキング"
date: 2017-02-19T10:15:29
slug: "google-analytics-exception-tracking"
tags: ["Google Analytics"]
categories: ["Blog"]
draft: false
---

Google Analytics には、隠れた機能として例外トラッキングがあります。Web サイトのフロントエンドやバックエンド（またはアプリ）から例外メッセージを収集し、分析することができます。今回のプロジェクトを例にご説明します。ユーザーがフォームに入力して送信すると、入力された情報に誤りがないかを検証します。もしどこかの項目の入力を忘れていた場合、そのエラーメッセージを GA に送信します。その後、GA でそのエラーメッセージが何回表示されたかを確認します。ある程度は、ユーザーがその項目を入力し忘れるのは、インターフェースの設計が悪いからではないか、と推測することができます。


<!--more-->


参考資料：<a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions">Exception Tracking | Analytics for Web (analytics.js) | Google Developers</a>

以下の説明は主にフロントエンドの JavaScript を対象としています。Web サイトのバックエンドやアプリからデータを送信したい場合は、<a href="https://developers.google.com/analytics/devguides/collection/protocol/v1/">Measurement Protocol</a> をご参照ください。

GA に例外メッセージを送るのはとても簡単で、イベントトラッキングとよく似ています。
<pre>ga('send', 'exception', {
  'exDescription': err_message,
  'exFatal': false
});</pre>
<ul>
 	<li>exDescription パラメータ：GA に送るエラーメッセージです。その内容はよく考えてください。収集の目的によって、やり方も変わってきます。「必須項目が未入力です」のような、意味のないメッセージだけは送らないようにしてください。どの項目なのか誰にも分かりませんから！</li>
 	<li>exFatal パラメータ：そのエラーが致命的かどうかを示します。</li>
</ul>
少し特殊なのは、Google Analytics の標準レポートには「例外」の項目がないことです。受信した例外メッセージを確認するには、「カスタムレポート」を使う必要があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-19-上午10.14.59.jpg"><img class="alignnone size-full wp-image-7474" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-19-上午10.14.59.jpg" alt="" width="950" height="758" /></a>

まとめると、Google Analytics が提供する例外トラッキングは非常に基本的なものです。記録できるのは一つのテキストだけです。しかし、場合によってはそれで十分です。エラー通知やユーザーの記録など、より強力な機能が必要な場合は、<a href="https://rollbar.com/">Rollbar</a> を試してみてもよいでしょう。

&nbsp;
