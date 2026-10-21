---
title: "WP-Polls - WordPress 専用の投票プラグイン"
date: 2009-10-18T10:18:00
slug: "wp-polls-wordpress-polls"
tags: ["WordPress", "WordPress Plugins"]
categories: ["Blog"]
draft: false
---

<p style="text-align: left;">今日は、サイト管理人の聽風が皆さんに WP-Polls というプラグインをご紹介します。WP-Polls を使うと、ブログに Ajax の投票機能を追加できます。しかも WP-Polls は完全無料で、制限もありません。さらに、速度が遅くなることもありません。WP-Polls のデザインが地味すぎないか心配かもしれませんが、それも問題ありません。WP-Polls のデザイン（配色）は自分で設定できるからです。</p>
<img class="size-full wp-image-2053   aligncenter" title="2009-10-18 09 40 33" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-09-40-33.jpg" alt="2009-10-18 09 40 33" width="300" height="222" />


<!--more-->

<h2>WP-Polls 情報：</h2>
プラグイン名：WP-Polls

公式サイト：  <a href="http://lesterchan.net/portfolio/programming/php/#wp-polls">http://lesterchan.net/portfolio/programming/php/#wp-polls</a>

ダウンロード先：  <a href="http://downloads.wordpress.org/plugin/wp-polls.2.50.zip">http://downloads.wordpress.org/plugin/wp-polls.2.50.zip</a>

.
<h2>一. WP-Polls のインストール手順：</h2>
1.まず管理画面にログインし、「プラグイン」→「新規追加」を選んで、検索欄に wp-polls と入力すれば OK です。ここでは詳しく説明しきれていません。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-17-20-26-15.jpg"><img class="alignnone size-medium wp-image-2047" title="2009-10-17 20 26 15" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-17-20-26-15-300x216.jpg" alt="2009-10-17 20 26 15" width="300" height="216" /></a>

..
<h2><span style="font-size: x-large; color: #000000;">二. 投票の追加</span></h2>
1.WP-Polls をインストールしたら、管理画面にログインし、Polls → Add Poll を選ぶと、投票を追加する画面に進めます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-09-40-29.jpg"><img class="alignnone size-full wp-image-2049" title="2009-10-18 09 30 46" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-09-40-29.jpg" alt="2009-10-18 09 30 46" width="208" height="438" /></a>

2.Add Polls の画面に入ったら、「Question」欄に投票のタイトル（質問）を入力し、「Poll Answers」欄に回答を入力します。初期状態では回答は 2 つまでしか入力できません。足りない場合は「Add Answer」を押して選択肢を増やすこともできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-09-39-45.jpg"><img class="alignnone size-full wp-image-2051" title="2009-10-18 09 39 45" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-09-39-45.jpg" alt="2009-10-18 09 39 45" width="458" height="150" /></a>

3.次に、ユーザーが 2 つ以上の回答を選べるかどうか（Allows Users To Select More Than One Answer?）を設定できます。許可する場合は、Maximum Number Of Selected Answers Allowed?（選択できる回答の最大数）で、投票できる回答の上限数を指定します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-000.jpg"><img class="alignnone size-full wp-image-2054" title="2009-10-18 000" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-000.jpg" alt="2009-10-18 000" width="458" height="148" /></a>

4.続いて Poll Start/End Date を設定します。これは投票の開始日時と終了日時を設定する項目です。基本的には初期値のままで問題ありません。最後に「Add Poll」を押せば投票が追加されます。
<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-001.jpg"><img class="alignnone size-full wp-image-2055" title="2009-10-18 001" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-001.jpg" alt="2009-10-18 001" width="470" height="130" /></a>
<h2>.</h2>
<h2>三. 投票を記事またはサイドバーに表示する</h2>
前の段落で、みなさん投票の追加はできたと思います。ただ、追加しただけでは終わりではありません。投票は表示させないと意味がないので、この段落では WP-Polls の投票を記事に載せる方法を説明します。

1.管理画面に入り、「Polls」→「Manage Polls」の順にクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-002.jpg"><img class="alignnone size-full wp-image-2056" title="2009-10-18 002" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-002.jpg" alt="2009-10-18 002" width="172" height="226" /></a>

2.先ほど追加した投票の番号を確認します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-003.jpg"><img style="border: black 1px solid;" title="2009-10-18 003" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-003.jpg" alt="2009-10-18 003" width="614" height="443" /></a>

2.番号を確認したら、新規投稿の画面に進み、【ビジュアルエディター】に切り替えます。エディターの右上に投票のアイコンがあるので、それをクリックし、番号を入力して「確定」を押せば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-004.jpg"><img title="2009-10-18 004" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-004.jpg" alt="2009-10-18 004" width="477" height="300" /></a>

3.こうして……完了です。あとは記事を書いて「公開」を押せば OK です XD

また、WP-Polls の投票をサイドバーに表示するのも難しくありません。まず「外観」→「ウィジェット」に進みます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-005.jpg"><img class="alignnone size-full wp-image-2059" title="2009-10-18 005" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-005.jpg" alt="2009-10-18 005" width="174" height="158" /></a>

次に、Polls のウィジェットをドラッグして入れます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-006.jpg"><img class="alignnone size-full wp-image-2060" title="2009-10-18 006" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-006.jpg" alt="2009-10-18 006" width="552" height="385" /></a>

続いて title 欄にタイトルを設定し、「Poll To Display:」で表示したい投票名を選んで、「保存」を押せば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-007.jpg"><img class="alignnone size-full wp-image-2061" title="2009-10-18 007" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-007.jpg" alt="2009-10-18 007" width="304" height="316" /></a>

.
<h2>四. 投票を削除する</h2>
1.管理画面に入り、「Polls」→「Manage Polls」の順にクリックします。

<img title="2009-10-18 002" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-002.jpg" alt="2009-10-18 002" width="172" height="226" />

2.削除したい投票の右側にある「Delete」をクリックすれば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-22.jpg"><img class="alignnone size-full wp-image-2064" title="2009-10-18  22" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-22.jpg" alt="2009-10-18  22" width="584" height="139" /></a>
<h2>四. WP-Polls のデザインを設定する</h2>
前にも書いたように、WP-Polls の大きな特長のひとつは、デザインを自分で設定できることです。この章でついにそれを紹介します。WP-Polls のデザインを変更する方法は、本体のプログラムを直接書き換えるなど、いくつかあります。ただ、それは面倒すぎるので、ここでは WP-Polls に組み込まれている方法を紹介します。

1.管理画面に入り、「Polls」→「Polls Options」の順にクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-10-47-48.jpg"><img class="alignnone size-full wp-image-2065" title="2009-10-18 10 47 48" src="{{< param imageBase >}}/wp-content/uploads/2009/10/2009-10-18-10-47-48.jpg" alt="2009-10-18 10 47 48" width="172" height="313" /></a>

2.「Poll Bar Style」で色に関する設定を行います。色は 16 進数で指定する必要があるので注意してください。
