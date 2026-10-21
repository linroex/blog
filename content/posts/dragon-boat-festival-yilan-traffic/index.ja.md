---
title: "端午の連休、渋滞にさよなら――宜蘭編"
date: 2016-06-10T14:29:03
slug: "dragon-boat-festival-yilan-traffic"
tags: ["Yilan", "BigQuery"]
categories: ["Travel"]
images: ["%%IMG%%/wp-content/uploads/2016/06/IMG_2865.jpg"]
draft: false
---

久しぶりの更新になりましたが、ようやく新しい記事を投稿します！ 2016 年の端午節の連休、台北の友人の多くはきっと宜蘭を最初の行き先に選ぶのではないでしょうか。車でもバスでも、国道 5 号の雪山トンネルを通れば、<strong>うまくいけば</strong>約 40 分で宜蘭に着きます。もちろん、こうした連休にそう順調にいかないことは、みなさんご存じですよね……。今日は雪山トンネルの渋滞パターンを分析して、混雑を避けて宜蘭にスムーズに着けるようにしたいと思います！ 以下に簡単な技術的な説明と分析の過程をまとめますので、技術の話が苦手な方は結論だけ読んでください！ なお、私は今日宜蘭にいて、この記事は実は金車の「伯朗咖啡城堡（ブラウンカフェ城）」で書いています。


<!--more-->

<h2>結論</h2>
文章は要点から書くのが大切ですので、まずは結論からお伝えします！

渋滞を避ける一番の方法は、連休を避けることです。以下の分析からわかるように、宜蘭へ向かう道路は本当に少ないのです。今回のような 4 日間の連休は必要ありません。ふつうの週末でも雪山トンネルは完全に詰まってしまいますし、トンネルを抜けられたとしても、市街地の渋滞や駐車場不足も心配しなければなりません。

週末や連休なら、電車が間違いなく一番の選択肢です。私は今日、普悠瑪号で宜蘭まで直行しました（切符は前日に買いました）。かかった時間は 1 時間ほどで、バスとほぼ同じですが、渋滞は一切ありません！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2840.jpg"><img class="alignnone size-large wp-image-6895" src="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2840-1024x768.jpg" alt="IMG_2840" width="660" height="495" /></a>

電車の本数が少ないと感じるなら、バスも良い選択肢です。少なくとも渋滞に巻き込まれても、運転するのは自分ではないので、座ってそのまま寝てしまえば済みます。ただしバスの場合は、午前中の利用はおすすめしません（笑）。午後や深夜が最適です。多くの人は早く出発すれば渋滞を避けられると考えますが、以下の分析からわかるように、交通量のピークは実は午前 10 時と正午で、午後になると少しずつ減っていきます。

また、宜蘭に着いたら車は借りないでください。借りるならバイクにしましょう。そうしないと、一日中駐車場探しに悩まされることになります。これは今朝バイクで走り回ってみた率直な感想です。駐車場の入口に車がすべて詰まっているのを見て、車を借りなくてよかったと心から思いました。へへへ。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2848.jpg"><img class="alignnone size-large wp-image-6896" src="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2848-1024x768.jpg" alt="IMG_2848" width="660" height="495" /></a>
<h3>技術的な説明</h3>
結論の説明は以上です。ここからは技術的な部分になります。以下のレポートは、交通部高速公路局が提供している<a href="http://tisvcloud.freeway.gov.tw/history/TDCS/">高速道路の ETC データ</a>をもとに分析したものです。技術に詳しい方は、この説明を参考にして、ほかの区間の交通量データを自分で分析してみてください。

まず使用したのは、M03A の交通量統計データです。このデータセットには、2014 年 1 月 1 日から現在まで、各 ETC 検知ポイントを 5 分ごとに通過した交通量と、通過した車種の情報が含まれています。高速道路の渋滞を分析するには最適なデータです。
<ul>
 	<li>元データのダウンロード：<a href="http://tisvcloud.freeway.gov.tw/history/TDCS/">http://tisvcloud.freeway.gov.tw/history/TDCS/</a></li>
 	<li>データセットの説明：<a href="https://ntust.me/2vdn5">https://ntust.me/2vdn5</a></li>
 	<li>データ整理のプログラム：<a href="https://ntust.me/gpv6t">https://ntust.me/gpv6t</a></li>
</ul>
このデータはかなり大きく、M03A だけで約 11GB あります。ただ、形式は許容範囲内です。当初は MySQL に直接入れて分析するつもりでしたが、クエリがあまりにも遅かったため、最終的には Google BigQuery で処理しました。このサービスは非常におすすめです。使い方がとても簡単で、料金も安く、SQL で直接クエリを実行できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/Google_BigQuery.png"><img class="alignnone size-large wp-image-6887" src="{{< param imageBase >}}/wp-content/uploads/2016/06/Google_BigQuery-1024x483.png" alt="Google_BigQuery" width="660" height="311" /></a>

データセットは多くのファイルに分かれているため、データを整理するための Python スクリプトを書きました。整理したデータは gsutil を使って Google Cloud Storage にアップロードし、その後 BigQuery で Cloud Storage から直接データを読み込んでテーブルを作成しました。次に SQL で必要なデータを取り出し、Google スプレッドシートに移してさらに加工し、最後に Plotly でグラフを描きました。

以下の分析では、05F0055S と 05F0055N の 2 つの監視ポイントのデータを使います。この 2 つは台北から宜蘭へ向かう途中、雪山トンネルの入口にある監視ポイントで、それぞれ南下と北上を表しています。期間は 2014 年 1 月 1 日から 2016 年 5 月 1 日までです。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖.png"><img class="alignnone wp-image-6886 size-full" src="{{< param imageBase >}}/wp-content/uploads/2016/06/交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖.png" alt="交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖" width="821" height="584" /></a>

<!--nextpage-->
<h3>渋滞の判定基準</h3>
高速道路の ETC データがあれば、1 時間ごと、1 日ごと、1 週間ごとの交通量を簡単に把握できます。ただ、ひとつ疑問があります。「どれくらいの交通量になると渋滞するのか？」です。交通量だけでは単なる数字の羅列にすぎません。ここでは低基準、平均基準、高基準の 3 つの目安を使って、渋滞しているかどうかを判定しました。結果は以下のとおりです。

<strong>南下（日単位）</strong>
<ul>
 	<li>低基準：25,100 台</li>
 	<li>平均基準：28,213 台</li>
 	<li>高基準：34,209 台</li>
</ul>
<strong>北上（日単位）</strong>
<ul>
 	<li><strong>低基準：</strong>25,667 台</li>
 	<li>平均基準：28,542 台</li>
 	<li>高基準：33,950 台</li>
</ul>
さらに、2015 年の端午節に雪山トンネルで発生した渋滞の<a href="http://www.nownews.com/n/2015/06/21/1724384">ニュース</a>（ここで Google がとても役立ちます）と合わせると、2015 年 5 月 20 日には北上方向の雪山トンネルが大渋滞していたことがわかります。データによると、当日の北上交通量は約 35,807 台で、北上方向は日単位の交通量が高基準に達すると実際に渋滞することが裏づけられました。もちろん、日単位の統計ではまだ精度が十分ではありません。本来は時間単位で見る必要がありますが、ここでは紙面を節約するために省略します（笑）。
<h3>全体的な傾向の分析</h3>
ここでは日を単位とし、先ほどの低基準、平均基準、高基準の分析と組み合わせて、Google スプレッドシートの条件付き書式ツールを活用しました。すると、連休の週末はどこも、往復とも交通量がほぼ高基準付近に集中していることがわかります。

下の図は宜蘭から台北方向の交通量です。完全なデータは<a href="https://docs.google.com/spreadsheets/d/1dgLT3a01_adWdbgKrf7LLdKetkUMvn7eZra-_yTg5Ew/edit?usp=sharing">こちらのリンク</a>から確認できます。

日曜と月曜に交通量が急増し、土曜は比較的少ないことがわかります。平日の交通量はほぼ低基準を下回っています。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表.png"><img class="alignnone size-full wp-image-6889" src="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表.png" alt="雪隧北上南下資料_-_Google_試算表" width="496" height="509" /></a>

下の図は台北から宜蘭方向の交通量です。北上とは逆に、ホットスポットは主に土曜と日曜に集中しています。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表-1.png"><img class="alignnone size-full wp-image-6890" src="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表-1.png" alt="雪隧北上南下資料_-_Google_試算表" width="502" height="502" /></a>

この 2 つの図から、多くの人は土曜に宜蘭へ遊びに行き、日曜か月曜に仕事のために台北へ戻ってくるのだろうと推測できます。

さらに詳しいグラフデータも添付します。このデータは月曜から金曜までを対象に、1 時間ごとの交通量を示したものです。Plotly で描画しており、クリックやマウスでの範囲選択で詳細を確認できます。

<strong>南下</strong>

<iframe src="https://plot.ly/~KarlLin/6.embed?share_key=gx70Z1ajvor5iCysGlCvFD" width="900" height="800" frameborder="0" scrolling="no"></iframe>

<strong>北上</strong>

<iframe src="https://plot.ly/~KarlLin/7.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>
<h3>1 日単位の分析</h3>
ここでは日を範囲とし、時間を間隔にして、車やバスで実際に移動する場合にどの時間に出発するのがよいかを示しています。もちろん、元のデータを直接使って自分で分析することもできます。月曜から日曜までで状況はかなり違うかもしれませんから。

<strong>南下</strong>

<iframe src="https://plot.ly/~KarlLin/9.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>

<strong>北上</strong>

<iframe src="https://plot.ly/~KarlLin/11.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>

ここまでの分析の方向性以外にも、試せることはたくさんあります。たとえば 3 日間や 4 日間の連休での交通量の変化、さらには天候の影響を取り入れることもできます。また、監視ポイントによって違う傾向が見られるかもしれません。興味のある方は、ぜひキーボードを叩いて分析を始めてください！ 次の機会があれば、詳しい技術解説も書けたらと思います。
<h3></h3>
