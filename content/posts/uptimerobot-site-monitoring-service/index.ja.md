---
title: "UptimeRobot - サイト稼働状況チェックサービス"
date: 2017-01-31T17:26:37
slug: "uptimerobot-site-monitoring-service"
tags: ["Monitoring"]
categories: ["SRE"]
draft: false
---

<a href="https://uptimerobot.com">UptimeRobot</a> は、長く提供されている安定した、機能の充実したサイトの稼働状況チェックサービスです。設定が完了すると、UptimeRobot は定期的にサイトがオンラインかどうかを確認してくれます。これはサイト管理者にとって非常に重要です。たとえば、サーバーを更新した後にサイトが壊れていて、3時間後にようやく気づいたとしたら、その3時間の訪問者はすべて失われてしまいます！ <a href="https://uptimerobot.com">UptimeRobot</a> の無料プランでは、最大50件のモニターを、それぞれ5分ごとに確認できます。チェック方式は HTTP Status、Keyword、Ping、Port の4種類に対応しています。問題が起きたときは、SMS、メール、Slack、WebHook など多くの方法で通知できます。私にとってさらに重要なのは、UptimeRobot の運営が安定していることです。私は2011年から使い続けています。


<!--more-->


サイト：<a href="https://uptimerobot.com/">https://uptimerobot.com/</a>

アカウント登録の手順は省略します。ログイン後にやることは2つあります。まず、通知の受け取り方法を設定します。次に、監視したいサイトと監視方法を設定します。

ログイン後、ページ中央の My Settings から通知方法を設定できます。UptimeRobot は基本的な SMS、メール、WebHook に加え、Slack や Twitter などの多くのサードパーティサービスにも標準で対応しています。複数の通知方法を設定でき、サイトの状態（Up / Down）が変わると、設定したチャンネルで通知されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard.png"><img class="alignnone wp-image-7355 size-large" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard-1024x573.png" width="660" height="369" /></a>

通知方法を設定したら、左側の「Add New Monitor」をクリックして監視対象を設定します。私は個人的に「Keyword」の方式をよく使っています。「HTTPS」の方式は HTTP ステータスしか確認しないため、ステータスが 404 や 301 などに変わったときに通知されます。しかし、データベースエラーやプログラムのエラーなどの場合は、HTTP ステータスが 200 のままでも、ユーザーは期待した内容を見られないことがあります。「Keyword」はページ内に指定したキーワードが存在するかどうかを確認するため、この問題を避けられます。ただし、変化するキーワードは設定しないように注意してください！

監視対象を設定するときは、右側で、その対象に適用する通知チャンネルを選択するのも忘れないでください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard-1.png"><img class="alignnone wp-image-7356 size-large" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Uptime_Robot_-_Dashboard-1-1024x657.png" width="660" height="423" /></a>

&nbsp;
