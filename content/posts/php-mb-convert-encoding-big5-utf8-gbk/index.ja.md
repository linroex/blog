---
title: "【PHP】mb_convert_encoding - API の戻り値の文字コードが期待と違う？ 変換しよう"
date: 2011-02-04T12:24:55
slug: "php-mb-convert-encoding-big5-utf8-gbk"
tags: ["PHP", "Encoding"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_123628.jpg"><img class="alignnone size-large wp-image-4662" title="2011-02-04_123628" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_123628-520x303.jpg" alt="" width="520" height="303" /></a>

↑↑これは Chrome で Big5 として表示したものです。上が変換前、下が変換後です。

昨日、Google Weather API で遊んでいたところ、言語を設定するパラメータがあることに気づきました。そのパラメータを設定しないと、API は英語で、UTF-8 エンコーディングの値を返します。しかし zh-TW を設定すると、中国語の値が返ってきますが、そのエンコーディングは Big5 です。そのため、この API を使うときは、戻り値を UTF-8 に変換し直してからでないと使えませんでした。今では Big5 のウェブサイトもかなり少なくなっています。そこで昨日、エンコーディングを変換してくれる mb_convert_encoding 関数を探しました～


<!--more-->


もし私と似たような状況で、ある API の戻り値のエンコーディングが希望と違う場合は、mb_convert_encoding 関数を使ってエンコーディングを変換する必要があります。mb_convert_encoding は実はとても便利な関数です。指定した文字列のエンコーディングを変換でき、utf8->big5 に限らず、その逆の変換もできます。GBK やほかのさまざまな国のエンコーディングにも対応しています。ただし、<strong>使う前に、PHP の mbstring が有効になっていることを必ず確認してください</strong>。

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_120304.jpg"><img class="alignnone size-large wp-image-4652" title="2011-02-04_120304" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_120304-520x358.jpg" alt="" width="520" height="358" /></a></strong>

<strong>↑↑Windows ユーザーは C:Windowsphp.ini で php_mbstring.dll が正しくインストールされているか確認できます。</strong>
<h2>mb_convert_encoding の書式</h2>
mb_convert_encoding(変換する文字列, 変換先のエンコーディング, 元のエンコーディング)

<strong>ファイルのダウンロード：<a href="http://www.box.net/shared/btlnjatr1c">Box.net</a> ｜ <a href="http://www.4shared.com/file/fCa0YEFL/mb_convert_encoding.html ">4Shared </a>｜ Xun6</strong>

<strong>例：</strong>

UTF-8 の文字列を Big5 に変換する場合：
<pre lang="php">$str='測試';
echo $str;		//この時点ではまだ UTF-8
$str=mb_convert_encoding($str,'big5','utf8');
echo $str;		//この時点では BIG-5</pre>
