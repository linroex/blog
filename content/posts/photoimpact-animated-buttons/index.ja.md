---
title: "PhotoImpactで動的ボタンを作る"
date: 2009-07-05T10:16:27
slug: "photoimpact-animated-buttons"
tags: ["PhotoImpact"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-04_200250.jpg"><img class="alignnone size-full wp-image-1531" title="2009-07-04_200250" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-04_200250.jpg" alt="2009-07-04_200250" width="500" height="452" /></a>

写真の編集ソフトとして、PhotoImpact をご存じの方も多いと思います。実はこのソフトには、動的ボタンを作る隠し機能があります。ウェブサイトに置く、マウスを乗せると背景が変わるあのボタンです。個人的にはとても便利だと思います。ただし、ほかに方法をご存じなら、そちらを使うことをおすすめします。生成されるコードがとても長く、Firefox で表示すると表示がおかしくなるからです。とはいえ、動的ボタンの作り方がわからない人にとっては、かなり便利です XD

では、どうやって作るのか。下をご覧ください~~~~~~~


<!--more-->


1. PhotoImpact のメインプログラムを開き、上のツールバーで「ネットワーク」、「コンポーネントデザイナー」の順にクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_0949421.jpg"><img class="alignnone size-full wp-image-1539" title="2009-07-05_0949421" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_0949421.jpg" alt="2009-07-05_0949421" width="500" height="365" /></a>

2. コンポーネントデザイナーの左側で「Rollover ボタン」をクリックし、好みのボタンのスタイルを選んで「次へ」を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_095707.jpg"><img class="alignnone size-full wp-image-1540" title="2009-07-05_095707" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_095707.jpg" alt="2009-07-05_095707" width="531" height="422" /></a>

3. まず「正常」を設定して、マウスがボタンの上にないときに表示される内容を指定します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100011.jpg"><img class="alignnone size-full wp-image-1541" title="2009-07-05_100011" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100011.jpg" alt="2009-07-05_100011" width="531" height="422" /></a>

4. 次に、MouseOver（マウスがボタンの上に乗ったとき）と MouseDown（マウスでボタンを押したとき）の設定をします。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100226.jpg"><img class="alignnone size-full wp-image-1542" title="2009-07-05_100226" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100226.jpg" alt="2009-07-05_100226" width="531" height="422" /></a>

5. すべて設定したら「エクスポート」をクリックし、「HTML へ」を選びます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100721.jpg"><img class="alignnone size-full wp-image-1543" title="2009-07-05_100721" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100721.jpg" alt="2009-07-05_100721" width="500" height="416" /></a>

6. 保存先を指定して保存します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100931.jpg"><img class="alignnone size-full wp-image-1544" title="2009-07-05_100931" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_100931.jpg" alt="2009-07-05_100931" width="461" height="253" /></a>

7. 下の画面が表示されたら、そのまま「OK」を押せば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_101250.jpg"><img class="alignnone size-full wp-image-1545" title="2009-07-05_101250" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_101250.jpg" alt="2009-07-05_101250" width="500" height="472" /></a>

では、先ほど保存した場所に移動し、拡張子が .htm のファイルを開いて結果を見てみましょう。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_101519.jpg"><img class="alignnone size-full wp-image-1546" title="2009-07-05_101519" src="{{< param imageBase >}}/wp-content/uploads/2009/07/2009-07-05_101519.jpg" alt="2009-07-05_101519" width="500" height="360" /></a>
<br/>
<br/>
↑↑↑ Firefox で表示すると、余分なコードが一段増えてしまいます。
動画：
<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/RGeb-UKTHtw&hl=zh_TW&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/RGeb-UKTHtw&hl=zh_TW&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>
