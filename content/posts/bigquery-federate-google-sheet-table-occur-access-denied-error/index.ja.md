---
title: "BigQuery の Google スプレッドシート連携テーブルで Access Denied エラーが出る"
date: 2017-09-14T21:45:47
slug: "bigquery-federate-google-sheet-table-occur-access-denied-error"
tags: ["BigQuery", "Google"]
categories: ["Programming"]
draft: false
---

BigQuery では、テーブルを Google Drive 上の Google スプレッドシートにリンクさせることができ、スプレッドシートを変更するとテーブルもすぐに追随します。この連携テーブル（Federated Table）を使うと、Access Denied の問題に遭遇することがあります。WebUI でのクエリは問題ないのに、bq コマンドラインツールでクエリすると、次のエラーメッセージが表示されます。
<blockquote>Access Denied: BigQuery
BigQuery: No OAuth token with Google Drive scope was found</blockquote>

<!--more-->


以前このエラーに遭遇したとき、いろいろ調べてみました。多くの人が「Google Drive の権限がないため bq コマンドが失敗する」と書いていて、次のコマンドでログインすれば解決するとのことでした。
<pre>gcloud auth login --enable-gdrive-access</pre>
事がこれほど簡単なら良かったのですが、当時このコマンドを試しても依然として失敗しました。忙しさのあまり「バグ」として放置していましたが、最近とうとう我慢できなくなりました。この機能はよく使われるはずですし、こんなに長く壊れたままなのは納得がいきません！ 多くの時間を費やして調べたり試したりし、あらゆる権限設定を試しましたが、どれも失敗しました。そしてついに、ひらめきました……

「古い設定ファイルが消えていなかったのではないか」

そうなんです。一緒に ~/.config/gcloud フォルダを削除して、gcloud auth login コマンドをもう一度実行してください。そのあと bq コマンドで連携テーブルをクエリすると、成功するはずです（涙）
<pre>rm ~/.config/gcloud
gcloud auth login --enable-gdrive-access</pre>
