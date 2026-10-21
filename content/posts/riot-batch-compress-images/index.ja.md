---
title: "RIOT で PNG・JPEG などの画像を指定サイズまで一括圧縮する"
date: 2010-09-11T10:00:36
slug: "riot-batch-compress-images"
tags: ["Image Compression"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_000328.jpg"><img class="aligncenter size-large wp-image-3642" title="2010-08-05_000328" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_000328-546x400.jpg" alt="" width="546" height="400" /></a>

Web デザイナーの方や、ご自身でブログを運営している方なら、ページの読み込み速度をきっと気にしていると思います。読み込みが遅いとユーザーがイライラしてしまいますからね。また、無名相簿を使っている方なら、画像のサイズも気になるのではないでしょうか。無名相簿には容量の制限があり、もっと容量がほしい場合は VIP 会員になるしかありません。今回紹介する RIOT というプログラムは、上記のような方々の救世主になれるツールです。RIOT では<strong>画像をまとめて圧縮</strong>でき、私が自分で試したところ、圧縮率もかなり高かったです。また、<strong>画像のサイズをまとめて変更</strong>することもでき、ブロガーにとって本当に便利です～
<h2>
<!--more-->
RIOT の情報</h2>
<ul>
	<li>公式サイト：<a href="http://luci.criosweb.ro/riot/">http://luci.criosweb.ro/riot/</a></li>
	<li>ダウンロード先：<a href="http://luci.criosweb.ro/riot/download/">公式 </a>| <a href="http://www.4shared.com/file/g_Nffram/Riot-setup.html ">4Shared </a>| <a href="http://www.box.net/shared/68fq2lxn1k">Box.net</a> | Xun6</li>
	<li>ファイルサイズ：1.05MB（圧縮ファイル）</li>
	<li>MD5 ハッシュ値：ba29d50d98f673968588433e97ac5f96</li>
</ul>
<h2>RIOT のインストール手順：</h2>
1. ダウンロードした RIOT の圧縮ファイルを解凍し、Riot-setup のインストーラーを開きます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235342.jpg"><img class="alignnone size-large wp-image-3635" title="2010-08-04_235342" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235342-533x400.jpg" alt="" width="533" height="400" /></a>

2. 【I Agree】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235503.jpg"><img class="alignnone size-full wp-image-3636" title="2010-08-04_235503" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235503.jpg" alt="" width="503" height="387" /></a>

3. 【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235518.jpg"><img class="alignnone size-full wp-image-3637" title="2010-08-04_235518" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235518.jpg" alt="" width="503" height="387" /></a>

4. 【Next】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235555.jpg"><img class="alignnone size-full wp-image-3638" title="2010-08-04_235555" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235555.jpg" alt="" width="503" height="387" /></a>

5. 【Install】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235723.jpg"><img class="alignnone size-full wp-image-3639" title="2010-08-04_235723" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235723.jpg" alt="" width="503" height="387" /></a>

6. インストール中です。完了したら【Close】をクリックするだけです。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235734.jpg"><img class="alignnone size-full wp-image-3640" title="2010-08-04_235734" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-04_235734.jpg" alt="" width="503" height="387" /></a>
<h2>RIOT の使い方：</h2>
この章では、RIOT を使って画像をまとめて圧縮する方法を説明します。

1. RIOT のメインプログラムを開きます

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_000238.jpg"><img class="alignnone size-full wp-image-3641" title="2010-08-05_000238" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_000238.jpg" alt="" width="406" height="544" /></a>

2. まとめて圧縮したい画像の形式を選び、【Batch】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_001551.jpg"><img class="alignnone size-large wp-image-3646" title="2010-08-05_001551" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_001551-546x400.jpg" alt="" width="546" height="400" /></a>

3. 【Add Images】ボタンをクリックし、圧縮したい画像を選択します（一度にたくさん選べます）

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_000711.jpg"><img class="size-large wp-image-3644 alignnone" title="2010-08-05_000711" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_000711-550x370.jpg" alt="" width="550" height="370" /></a>

4. 【Additional tasks】ボタンをクリックして、実行したい操作を選びます。Resize は画像の縦横のサイズを変更する操作で、Compress to size は画像を指定したサイズ以内に圧縮する操作です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_001300.jpg"><img class="alignnone size-large wp-image-3645" title="2010-08-05_001300" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_001300-550x368.jpg" alt="" width="550" height="368" /></a>

5. W の欄に幅、H の欄に高さを入力します。画像の幅や高さが設定値を超えると、自動的に指定の幅と高さまで縮小されます。また、【Filesize threshold】の欄に圧縮後のサイズを入力すると、すべての画像が自動的にそのサイズまで圧縮されます（単位は KB）。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_001800.jpg"><img class="alignnone size-large wp-image-3647" title="2010-08-05_001800" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_001800-550x368.jpg" alt="" width="550" height="368" /></a>

6. 【Output Folder】で処理後の画像の保存先を設定し、最後に【Start】をクリックすると処理が始まります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_002027.jpg"><img class="alignnone size-large wp-image-3648" title="2010-08-05_002027" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_002027-550x368.jpg" alt="" width="550" height="368" /></a>

圧縮前と圧縮後のファイルサイズの違い：

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_002733.jpg"><img class="alignnone size-large wp-image-3650" title="2010-08-05_002733" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-05_002733-539x400.jpg" alt="" width="539" height="400" /></a>
