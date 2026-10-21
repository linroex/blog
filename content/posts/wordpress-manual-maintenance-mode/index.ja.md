---
title: "WordPress のメンテナンスモードを手動で有効・無効にするには？"
date: 2011-02-14T09:00:32
slug: "wordpress-manual-maintenance-mode"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204200.jpg"><img class="size-large wp-image-4693 aligncenter" title="2011-02-08_204200" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204200-520x282.jpg" alt="" width="520" height="282" /></a></p>
WordPress 3.0 から、メンテナンスモードという機能が追加されたようです。WordPress の更新中には自動でメンテナンスモードに入り、訪問者にエラーメッセージが見えないようにしてくれます。この機能は、ずっと待ち望んでいたものです。ほかの成熟した CMS にはほぼ例外なくこの機能があるからです。たとえば Xoops ではサイトを一時的に閉じられますし、有名な掲示板ソフトの Discuz! も、掲示板を一時的に閉じたり、特定のユーザーだけが入れるように制限したりできます。ただ、WordPress のメンテナンスモードはまだ十分ではありません。手動で有効にすることはできず、ファイルの更新時にだけ自動で有効になります。そこでこの記事では、メンテナンスモードを手動で有効にする方法を紹介します


<!--more-->
ただ、WordPress のメンテナンスモードは便利ですが、ひとつ問題があります。システム内蔵の自動更新機能を使ったときに更新が失敗すると、ブログがずっとメンテナンスモードのままになってしまうのです。実は今日、WP 3.0.5 を更新したときに問題が起き、メンテナンスモードから抜け出せなくなってしまいました……。その後ネットで調べて、メンテナンスモードを手動で解除する方法を覚えました
<h2>メンテナンスモードの手動での有効化・無効化</h2>
1. 手動でメンテナンスモードを有効にするには、私が作成した PHP ファイルをダウンロードし、ブログのルートディレクトリーにアップロードします

メンテナンスモード有効化ファイル：<a href="http://www.box.net/shared/ezqyjllbk6">Box.net</a> ｜ <a href="http://goo.gl/dnusD">Xun6 </a>｜ <a href="http://www.4shared.com/file/Vdd82EnM/WP_online.html ">4Shared</a>

P.S. ダウンロードしたら、まず解凍してください

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204744.jpg"><img class="alignnone size-large wp-image-4694" title="2011-02-08_204744" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_204744-520x424.jpg" alt="" width="520" height="424" /></a>

2. ブログにアクセスすると、すでにメンテナンス状態になっています～

ダウンロードしたファイルを解凍すると、ソースコードを確認できます

WordPress のシステムは、ルートディレクトリーに .maintenance ファイルがあるかを確認すると、それを読み込んで、メンテナンスモードに入るかどうかを判断します。判断方法は、$upgrading 変数に保存されたタイムスタンプと現在時刻の間隔が 10 分を超えているかどうかをチェックするというものです。10 分を超えるとメンテナンスモードは自動的に解除されますが、私が書いたこの方法では、その時間を超えることは決してありません XDD

3. メンテナンスモードを解除したいときは、サイトのルートディレクトリーに入り、.maintenance ファイルを削除するか名前を変更すれば OK です。私は、ファイル名の後ろに .txt を付けました

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_205157.jpg"><img class="alignnone size-large wp-image-4695" title="2011-02-08_205157" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_205157-520x424.jpg" alt="" width="520" height="424" /></a>
