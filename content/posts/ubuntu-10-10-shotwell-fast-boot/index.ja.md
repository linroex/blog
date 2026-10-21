---
title: "Ubuntu 10.10 インストールガイド（新しいインストーラーの画面）"
date: 2010-11-26T22:54:10
slug: "ubuntu-10-10-shotwell-fast-boot"
tags: ["Ubuntu", "Linux"]
categories: ["Hardware"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-13-19-21-56.jpg"><img class="alignnone size-large wp-image-4024" title="2010-11-13-19-21-56" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-13-19-21-56-520x292.jpg" alt="" width="520" height="292" /></a></p>
今回の <strong><a href="http://www.ubuntu-tw.org/">ubuntu 10.10</a></strong> のアップデートでは、新機能はあまり追加されていません。主に、以前の 10.4 版のいくつかの問題を修正し、写真管理ソフトを Shotwell に変更しています。それ以外に機能の追加は見当たりませんでした。また、いつのバージョンからかインストーラーの画面が変わっているようなので、この記事ではインストール方法もあらためて紹介します。特に良いと思ったのは、Ubuntu 10.10 がインストール中に言語パックや必要なプログラムを自動的にダウンロードしてくれることです。インストール後にあらためてダウンロードを待つ必要がありません。ただし、その分インストールには時間がかかるという欠点もあります。
<h2>
<!--more-->
</h2>
Ubuntu 10.10 は新機能が多くないので、記事として書けることは限られています。そこで、<strong>ソフトウェアセンター</strong>と<strong>インストール手順</strong>を紹介したいと思います。

Ubuntu が何か分からない方は、<a href="https://coder.tw/?p=1149">https://coder.tw/?p=1149</a> の記事をご覧ください。

▼▼Ubuntu 10.10 では写真の管理に Shotwell を使用します
<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-13-19-37-54.jpg"><img class="alignnone size-large wp-image-4025" title="2010-11-13-19-37-54" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-13-19-37-54-520x338.jpg" alt="" width="520" height="338" /></a>
<h2>Ubuntu の情報</h2>
<ul>
 	<li>公式サイト：<a href="http://www.ubuntu-tw.org/">http://www.ubuntu-tw.org/</a></li>
 	<li>ダウンロードページ：<a href="http://www.ubuntu.com/desktop/get-ubuntu/download">http://www.ubuntu-tw.org/modules/tinyd0/</a></li>
 	<li>対応ビット数：32 ビットと 64 ビットの両方に対応</li>
</ul>
<h2>Ubuntu のインストール要件</h2>
<ul>
 	<li>2.6GB を超えるハードディスクの空き容量</li>
 	<li>インターネット接続（推奨）</li>
</ul>
<h2>Ubuntu 10.10 のインストール手順</h2>
Ubuntu 10.10 をインストールする前に、BIOS で CD から起動するように設定してください（<a href="https://coder.tw/?p=2290">CD 起動の設定方法</a>）。そのうえでダウンロードページから Ubuntu の ISO ファイルをダウンロードし、CD に書き込みます。

1.まず言語を【中国語（繁体字）】に設定し、【Ubuntu をインストール】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_214613.jpg"><img class="alignnone size-large wp-image-4073" title="2010-11-26_214613" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_214613-520x385.jpg" alt="" width="520" height="385" /></a>

2.パソコンをインターネットに接続し、【インストール中にアップデートをダウンロードする】と【サードパーティのソフトウェアをインストールする】にチェックを入れて、【次へ】をクリックします。インターネットに接続していなくても問題ありませんが、その場合はインストール後の画面が英語になります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_214731.jpg"><img class="alignnone size-large wp-image-4074" title="2010-11-26_214731" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_214731-520x388.jpg" alt="" width="520" height="388" /></a>

3.インストールには【ディスク全体を消去して使用する】を選ぶことをおすすめします。いちばん簡単だからです。デュアルブートにしたい場合は、手動でパーティションを指定してください。手動でのパーティション指定は説明に時間がかかるため、この記事では扱わず、後日の記事で紹介します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215156.jpg"><img class="alignnone size-large wp-image-4075" title="2010-11-26_215156" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215156-520x388.jpg" alt="" width="520" height="388" /></a>

4.インストール先のディスクを選択します。一般の家庭用パソコンはディスクが 1 台だけなので、設定は不要です。2 台ある場合にだけ選択してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215457.jpg"><img class="alignnone size-large wp-image-4076" title="2010-11-26_215457" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215457-520x387.jpg" alt="" width="520" height="387" /></a>

5.設定中ですので、しばらくお待ちください。
<!--nextpage-->
<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215548.jpg"><img class="alignnone size-large wp-image-4077" title="2010-11-26_215548" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215548-520x386.jpg" alt="" width="520" height="386" /></a>

6.ここではシステムのタイムゾーンを設定します。通常は自動的に設定されます。Taipei に設定されていない場合は、手動で選択できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215907.jpg"><img class="alignnone size-large wp-image-4078" title="2010-11-26_215907" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_215907-520x389.jpg" alt="" width="520" height="389" /></a>

7.キーボードのレイアウトを設定します。国によってキーボードの文字配列は異なるため、設定が必要です。台湾では通常 USA を使います。システムが自動的に判別するので、そのまま【次へ】をクリックして問題ありません。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_220054.jpg"><img class="alignnone size-large wp-image-4079" title="2010-11-26_220054" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_220054-520x387.jpg" alt="" width="520" height="387" /></a>

8.コンピューター名を入力します。ニックネームをそのままコンピューター名に使うこともできますが、漢字は入力できません。【あなたの名前】だけを設定すると、コンピューター名は自動的に生成されます。ユーザーのパスワードも設定してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_220338.jpg"><img class="alignnone size-large wp-image-4081" title="2010-11-26_220338" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_220338-520x390.jpg" alt="" width="520" height="390" /></a>

9.インストール中です。パソコンが自動的に処理を進めるため、しばらく時間がかかります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_220507.jpg"><img class="alignnone size-large wp-image-4082" title="2010-11-26_220507" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_220507-520x388.jpg" alt="" width="520" height="388" /></a>

10.インストールが終わったら、【今すぐパソコンを再起動】をクリックすれば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_222732.jpg"><img class="alignnone size-large wp-image-4084" title="2010-11-26_222732" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_222732-520x388.jpg" alt="" width="520" height="388" /></a>

11.インストール完了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_223722.jpg"><img class="alignnone size-large wp-image-4085" title="2010-11-26_223722" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_223722-520x390.jpg" alt="" width="520" height="390" /></a>
