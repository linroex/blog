---
title: "WordPress 2.8 の紹介"
date: 2009-06-13T17:16:13
slug: "wordpress-2-8-introduction"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

ついに WordPress を 2.7 から 2.8 にアップデートしました！ 今回の WordPress 2.8 は、パフォーマンスの改善に重点が置かれていて、機能はそれほど増えていないそうです。ただ、古いバージョンのバグを 700 件以上も修正したとのことで、かなりの数ですよね。また、今回の 2.8 にもいくつか新機能はあります（ただ、先ほど書いたとおり、多くはありません）。管理画面の見た目だけを見ると、「……バージョン番号を変えただけ？」と思ってしまうかもしれません = = 実際、今回のアップデートでは管理画面は 2.7 のままで、目立った変化はありません。大まかには以上です。それでは、WordPress 2.8 の主な新機能をいくつか見ていきましょう

WordPress 2.8 の情報

公式サイト <a href="http://wordpress.org/">http://wordpress.org/</a>

本体プログラム <a href="http://wordpress.org/latest.zip">http://wordpress.org/latest.zip</a>

中国語化ファイル <a href="http://wordpress.kirin-lin.idv.tw/news/wordpress28zhtw">http://wordpress.kirin-lin.idv.tw/news/wordpress28zhtw</a>


<!--more-->


1. 列数の設定

WordPress 2.8 では、ワイドスクリーンのユーザーが使いやすいように、管理画面で列数を変更できる設定が追加されました。「顯示選項」（表示オプション）をクリックすると表示されます！

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_164445.jpg"><img class="alignnone size-full wp-image-1304" title="2009-06-13_164445" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_164445.jpg" alt="2009-06-13_164445" width="639" height="125" /></a>

2. シンタックスハイライト表示機能

これは WordPress の中で私が最も面白いと思った機能です。内蔵のプラグインやテーマのエディターに、シンタックスハイライトを適用できます。ただ、IE6、Opera、Firefox などのブラウザーには対応していないようです。さらに、PHP 関数を検索する機能も追加されています。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_165529.jpg"><img class="alignnone size-full wp-image-1306" title="2009-06-13_165529" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_165529.jpg" alt="2009-06-13_165529" width="229" height="113" /></a>

P.S. お使いのブラウザーがシンタックスハイライトに対応していない場合、WordPress がそのファイルの編集をさせてくれないことがあります。その場合は「顯示選項」（表示オプション）の「關閉高量語法」（シンタックスハイライトをオフ）を選べば、問題は起きなくなります

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_165600.jpg"><img class="alignnone size-full wp-image-1305" title="2009-06-13_165600" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_165600.jpg" alt="2009-06-13_165600" width="640" height="59" /></a>

3. テーマ検索機能の強化

WordPress 2.7 でも、テーマの自動インストールと検索機能があったのを覚えていますか？ WordPress 2.8 では検索機能が強化され、「過濾」（フィルター）ができるようになりました。たとえば、列によるフィルターなどです

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_170054.jpg"><img class="alignnone size-full wp-image-1307" title="2009-06-13_170054" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_170054.jpg" alt="2009-06-13_170054" width="640" height="418" /></a>

4. 投稿編集画面で1ページあたりの表示件数を設定可能に

私がずっと待ち望んでいた機能です。無名などの台湾のブログサービス（BSP）では、1ページあたりの表示件数を設定できますが、WordPress 2.7 以前のバージョンでは設定できませんでした。自分で修正しようかとも思いましたが、WordPress に触れてまだ日が浅いため、試すのはやめておきました XD（投稿編集画面だけでなく、ほかの画面でも調整できます）

<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_170511.jpg"><img class="alignnone size-full wp-image-1308" title="2009-06-13_170511" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_170511.jpg" alt="2009-06-13_170511" width="640" height="100" /></a>

5. テーマを直接適用できるように

WordPress 2.7 では、プラグインを適用する前に必ずプレビューする必要がありました。回線が遅い人にとっては、それだけで時間がかかってしまいます。そこで、速度を重視する WordPress 2.8 では、今回から直接適用できる機能が追加され、ユーザーにとって便利になりました
<a href="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_171331.jpg"><img class="alignnone size-full wp-image-1309" title="2009-06-13_171331" src="{{< param imageBase >}}/wp-content/uploads/2009/06/2009-06-13_171331.jpg" alt="2009-06-13_171331" width="639" height="258" /></a>

まとめ：今回の WordPress 2.8 のアップデートで追加された機能は、おおよそ以上です。詳しく知りたい方は、<a href="http://codex.wordpress.org/Version_2.8">公式ドキュメント</a>をご覧ください。アップデートには WordPress に内蔵の自動アップデートを使えます。ただし、アップデート前にはデータベースとプログラムのバックアップを忘れずに取ってください。また、競合を避けるため、プラグインとテーマはすべて無効にしておきましょう。内蔵のアップデート機能が使えない場合は、<a href="http://sofree.cc/wordpress-2-8/">[教學]如何升級到WordPress2.8？</a>（中国語の記事）を参考にしてアップデートしてください。さらに、WordPress 2.8 では投稿編集画面からビジュアル編集機能がなくなったと感じる方もいるかもしれません。現在、私も解決策を探しています。プラグインの競合が原因だという人もいれば、別のブラウザーで試してみるよう言う人もいます。新しい発見があれば、ぜひ管理人（私）にも教えてください。それでは、また～！
