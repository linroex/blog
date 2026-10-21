---
title: "AirDropper - 誰でもあなたの Dropbox にファイルを送れるようにする"
date: 2010-11-10T09:00:48
slug: "airdropper-receive-files-to-dropbox"
tags: ["Dropbox"]
categories: ["Web Apps"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_163631.jpg"><img class="size-large wp-image-3962 aligncenter" title="2010-11-07_163631" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_163631-520x363.jpg" alt="" width="520" height="363" /></a></p>
<strong>AirDropper</strong> は、Dropbox を誰でもファイルをアップロードできる場所に変えるプラグインです。通常は、Dropbox 内のファイルを他人にダウンロードさせることはできますが、Dropbox アカウントを持たない人からファイルを受け取ることはできません（ファイルを送る側が Dropbox アカウントを持っていれば、共有フォルダーを使う方法もあります）。AirDropper を使えば、この制限を取り払えます。仕組みはシンプルで、認証の手続きを通して <strong>AirDropper</strong> があなたの Dropbox アカウントにアクセスできるようにします。あとは相手に AirDropper へファイルを送ってもらうだけで、自動的にあなたの Dropbox に保存されます。こうして、誰でもアップロードできる状態を間接的に実現するのです。ただし、このプラグインは FTP のような仕組みではないことに注意してください。<strong>誰かにファイルを送ってもらいたいときは、あなたがその人にリンクを送り、相手はそのリンクを使ってファイルをアップロードします。アップロードが終わると、そのリンクは無効になります。</strong>

いくつかの Dropbox プラグインを試した感想ですが、ほとんどは動作が遅く、中にはまったく開けないものもあります。特に上位にあるプラグインほどそうでした。Dropbox からのアクセスが多すぎて、サーバーが耐えられないのではないかと推測しています…… しかし、今日紹介する AirDropper はかなり安定しています。メールの送信が十分に速くないのが唯一の難点です。
<!--more-->

<h2>Dropbox プラグインの詳細</h2>
Dropbox プラグインのページ：<a href="https://www.dropbox.com/apps">https://www.dropbox.com/apps</a>
<h2><strong>AirDropper プラグインの使い方</strong></h2>
1. まず <a href="http://www.airdropper.com/">AirDropper</a> の公式サイトに入り、【START】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_163817.jpg"><img class="alignnone size-large wp-image-3963" title="2010-11-07_163817" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_163817-520x311.jpg" alt="" width="520" height="311" /></a>

2. ここは <a href="http://www.airdropper.com/">AirDropper</a> と Dropbox を連携させて認証を行うページです。【Allow】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_164324.jpg"><img class="alignnone size-large wp-image-3964" title="2010-11-07_164324" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_164324-520x379.jpg" alt="" width="520" height="379" /></a>

3. 必要な情報を入力します

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_165219.jpg"><img class="alignnone size-large wp-image-3965" title="2010-11-07_165219" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_165219-520x311.jpg" alt="" width="520" height="311" /></a>

4. 続いて、友達に一通のメールが届きます。そのメールには、ファイルをアップロードするためのリンクが入っています

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_170307.jpg"><img class="alignnone size-large wp-image-3967" title="2010-11-07_170307" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_170307-520x311.jpg" alt="" width="520" height="311" /></a>

5. 【ADD FILES】ボタンをクリックしてアップロードするファイルを選び、【SEND】をクリックして送信します（ファイルは何個でも追加できます）

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_170633.jpg"><img class="alignnone size-large wp-image-3968" title="2010-11-07_170633" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_170633-520x311.jpg" alt="" width="520" height="311" /></a>

6. すると、あなたの Dropbox の AirDropper フォルダーに、友達が送ってくれたファイルが入っています

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_170820.jpg"><img class="alignnone size-large wp-image-3969" title="2010-11-07_170820" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_170820-520x374.jpg" alt="" width="520" height="374" /></a>
