---
title: "ノートパソコンを無線LANのアクセスポイントにする方法"
date: 2010-04-03T10:21:01
slug: "turn-laptop-into-wifi-hotspot"
tags: ["Windows", "Wi-Fi"]
categories: ["Hardware"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_164010.png"><img class="aligncenter size-medium wp-image-2890" title="2010-03-28_164010" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_164010-300x283.png" alt="" width="300" height="283" /></a>

少し前に私が iPod Touch を買ったのを覚えていますか？iPod Touch は薄くて軽いことが求められているため、無線 LAN にしか対応しておらず、一般的な有線 LAN（ADSL など）には接続できません。そこで、自宅の ADSL を無線の電波に変換する方法をずっと探していました。最初は無線ルーターを買うつもりでしたが、価格が少し高かったので見送りました。そこで自分で調べてみると、Vista（XP や Windows 7 でも可能）では無線 LAN アダプターを使って、ADSL の接続をそのまま無線の電波に変換できることが分かりました。有効距離は 30 フィートもあります。無線インターネットが必要な私のような人間にとって、本当に便利です。


<!--more-->


要するに、この方法は無線 LAN アダプターを使って無線のローカルネットワークを構築し、その中に接続した人とブロードバンド回線を共有するものです。接続する人が増えるほど速度は遅くなります。また、共有できるのはブロードバンドだけではありません。3G 回線も共有できます。

XP 向けの解説：<a href="http://blog.xuite.net/pccompass/travel/12341636">http://blog.xuite.net/pccompass/travel/12341636</a>

<a href="http://blog.xuite.net/pccompass/travel/12341636"></a>Windows 7 向けの解説：<a href="http://www.techbang.com.tw/posts/2080">http://www.techbang.com.tw/posts/2080</a>
<h2>ノートパソコンを基地局にする手順</h2>
1.【スタート】→【接続先】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122441.png"><img class="size-medium wp-image-2880 alignnone" title="2010-03-28_122441" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122441-239x300.png" alt="" width="239" height="300" /></a>

2.【接続またはネットワークのセットアップ】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122919.png"><img class="alignnone size-large wp-image-2881" title="2010-03-28_122919" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122919-500x384.png" alt="" width="500" height="384" /></a>

3.【ワイヤレスのアドホック（コンピューター同士）ネットワークのセットアップ】をダブルクリックします。iPod Touch や HTC などの携帯機器でも、この方法でインターネットを共有できるのは面白いところです。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122950.png"><img class="alignnone size-large wp-image-2882" title="2010-03-28_122950" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_122950-500x384.png" alt="" width="500" height="384" /></a>

4.【次へ】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123009.png"><img class="alignnone size-large wp-image-2883" title="2010-03-28_123009" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123009-500x384.png" alt="" width="500" height="384" /></a>

5.ネットワーク名には、このワイヤレスネットワークの名前（好きな名前）を入力します。セキュリティの種類では、暗号化するかどうかを設定します。電波を傍受されたり、他人に勝手に使われたりするのが心配な場合は、暗号化を設定することをおすすめします（WEP でも WPA2 でも構いません）。私個人は面倒で暗号化を設定しませんでした。iPod Touch で重要なものは使っていなかったからです。暗号化を設定した場合は、下の「セキュリティキー」を必ず入力してください。分かりにくい表現ですが、「セキュリティキー」とは、ネットワークに接続するときのパスワードのことです。最後に【このネットワークを保存する】にチェックを入れて【次へ】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123048.png"><img class="alignnone size-large wp-image-2884" title="2010-03-28_123048" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123048-500x384.png" alt="" width="500" height="384" /></a>

<!--nextpage-->

6.設定しています。ワイヤレスのスイッチがオンになっていないと成功しないので、確認してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123130.png"><img class="alignnone size-large wp-image-2885" title="2010-03-28_123130" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123130-500x384.png" alt="" width="500" height="384" /></a>

7.設定が完了したら、【ネットワーク接続の共有を有効にする】をクリックして、インターネット接続の共有を開始します。

<strong>
</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123147.png"><img class="alignnone size-large wp-image-2886" title="2010-03-28_123147" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123147-500x384.png" alt="" width="500" height="384" /></a>

P.S. この項目が見つからない場合は、共有したいネットワーク接続（ADSL など）を右クリックして、「プロパティ」→「共有」を開きます。【このコンピューターのインターネット接続を介した接続をほかのネットワークユーザーに許可する】にチェックを入れ、その下の【ほかのネットワークユーザーに、共有インターネット接続の制御または無効化を許可する】もチェックすれば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/04/2010-05-08_233154.jpg"><img class="alignnone size-large wp-image-3107" title="2010-05-08_233154" src="{{< param imageBase >}}/wp-content/uploads/2010/04/2010-05-08_233154-355x400.jpg" alt="" width="355" height="400" /></a>

8.【利用可能な接続】で、使用するネットワーク（ADSL または 3G 回線）を選択します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123230.png"><img class="alignnone size-large wp-image-2887" title="2010-03-28_123230" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123230-500x384.png" alt="" width="500" height="384" /></a>

9.設定中です。少しお待ちください ^^

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123240.png"><img class="alignnone size-large wp-image-2888" title="2010-03-28_123240" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123240-500x384.png" alt="" width="500" height="384" /></a>

10.設定が完了したら、1 番目の手順と同じように【接続先】を開き、追加したワイヤレスネットワークをダブルクリックすれば完了です。その後パソコンを起動するたびに、この最後の手順でネットワークを開く必要があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123338.png"><img class="alignnone size-large wp-image-2889" title="2010-03-28_123338" src="{{< param imageBase >}}/wp-content/uploads/2010/03/2010-03-28_123338-500x384.png" alt="" width="500" height="384" /></a>
