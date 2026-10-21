---
title: "QRコードとは？ PsQrEditでQRコードを作る手順"
date: 2010-12-10T15:52:31
slug: "what-is-qr-code-psqredit-tutorial"
tags: ["QR Code"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/qrcode.png"><img class="aligncenter" title="{{< param imageBase >}}/wp-content/uploads/2010/11/qrcode.png" src="{{< param imageBase >}}/wp-content/uploads/2010/11/qrcode.png" alt="" width="135" height="135" /></a></p>
QR コードは二次元バーコードの一種です。世の中のバーコードは、一次元と二次元の2種類に分けられます。普段の買い物でレジで読み取られるのは一次元バーコードです。毎年6月に所得税の申告書に印刷されている四角いバーコードは二次元バーコードです。QR コードは二次元バーコードの一種で、その主な機能は、データを画像の形で保存することです。機械がスキャンすると、バーコードの中のデータを読み取れます。少し抽象的なので、もっと身近な例で言うと、私が自己紹介の文章を書いたとします。その文章を二次元バーコードにして、ほかの人にスキャンしてもらうことができます。また、QR コードがよく見られる場所は新聞です。例えば、蘋果日報（Apple Daily）の動くニュースでは、スマートフォンで QR コードを撮影するだけで、URL が表示されます。さらに、QR コードをよく見かけるもう一つの場所は、台湾高速鉄道（高鐵）のきっぷです。コンビニで高鐵のきっぷを買ったことがあれば、その上に四角いバーコードが印刷されているのを見たことがあるでしょう。そのバーコードが QR コードです。改札機でスキャンするだけで通れます〜 XD


<!--more-->


QR コードは日本人によって発明されました。正方形であることに加え、四隅のうち右下を除く3か所に正方形の枠があります。これは、スキャナー（またはカメラ）が向きを判断するためのものです。QR コードは当初、自動車製造工場で使われることを想定していましたが、今ではさまざまな用途に使われています。高速鉄道の切符の購入、動くニュース、Android Market からのダウンロードなどにも QR コードが使われています。Google の goo.gl の短縮 URL サービスでも QR コードを作成できるため、URL をそのまま QR コードに変換することもできます。日本では特に QR コードが普及していて、雑誌や名刺にも QR コードが載っていることが多く、出入国管理でもスタンプの代わりに QR コードが使われています。

実際には、QR コードのようにデータを保存する機能は、ほぼすべてのバーコードで実現できます。では、なぜみんな QR コードを使うのでしょうか？ それは、二次元バーコードは保存できるデータ量が多く、千字以上にもなることがあるからです。さらに、QR コードはスキャンの成功率が高いという特徴もあります。一般的な一次元バーコードは、スキャンできないことがあり、店員が手作業でバーコードの番号を入力しなければならない場合もありますが、QR コードならそうした心配がほとんどありません。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_000926.jpg"><img class="alignnone size-large wp-image-4102" title="2010-11-27_000926" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_000926-520x483.jpg" alt="" width="520" height="483" /></a>

&nbsp;
<h2>PsQrEdit で QR コードを作成・読み取る</h2>
ここでは、QR コードを作成できるソフトウェアを紹介します。その名前は PsQrEdit です。ほとんどの QR コード作成ソフトはスマートフォン向けです。需要の多くがスマートフォンユーザーにあるからです。しかし、PsQrEdit は違います。パソコンに直接インストールして、データをバーコードに変換したり、デコードしたりすることもできます。とても便利なソフトウェアです。

1.まず、以下のリンクから PsQrEdit の本体をダウンロードしてください。

Xun6 | <a href="http://www.box.net/shared/6bn1f0vbbd">Box.net</a>

2.先ほどダウンロードした本体を解凍し、PsQrEdit を起動します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_181624.jpg"><img class="alignnone size-large wp-image-4113" title="2010-11-27_181624" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_181624-520x390.jpg" alt="" width="520" height="390" /></a>

3.【ファイル】→【新規バーコード】が使えるか確認してください。使える場合は、新規バーコードをクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_182838.jpg"><img class="alignnone size-large wp-image-4116" title="2010-11-27_182838" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_182838-290x500.jpg" alt="" width="290" height="500" /></a>

4.プログラムの下部で情報を入力できます。QR コードにしたいデータを入力してください。標準のカテゴリは、個人データ、電子メール、サイト情報の3つです。作りたいバーコードがこの3つに当てはまらない場合は、テキストを選んでください。注意点は、個人データ、電子メール、サイト情報、テキストのうち、1つのバーコードに使えるのは1種類だけということです。1つのバーコードに4種類すべての情報を含めることはできません。そのため、今「個人データ」を設定しているときに「テキスト」のタブを押すと、元のバーコードが消えてしまいます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_182240.jpg"><img class="alignnone size-large wp-image-4114" title="2010-11-27_182240" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_182240-290x500.jpg" alt="" width="290" height="500" /></a>

5.次に、バーコードの性質を設定します。例えば【誤り訂正能力】では、H（30%）に設定することをおすすめします。また、【マトリクスサイズ】はバーコードの線の数に影響します。マトリクスサイズを大きくするほど、バーコードの中の白い部分が見えにくくなります。【出力倍率】はバーコードのサイズを設定するものです。設定が終わったら、【ファイル】→【保存】をクリックすれば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_182637.jpg"><img class="alignnone size-large wp-image-4115" title="2010-11-27_182637" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_182637-322x500.jpg" alt="" width="322" height="500" /></a>

6.バーコードの情報を読み取るのは簡単です。【ファイル】→【バーコードを開く】を選ぶだけで、バーコードの情報を読み取れます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_183013.jpg"><img class="alignnone size-large wp-image-4117" title="2010-11-27_183013" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-27_183013-290x500.jpg" alt="" width="290" height="500" /></a>
