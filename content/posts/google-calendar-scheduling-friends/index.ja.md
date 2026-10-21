---
title: "Google カレンダーを使えば、友人やお客さまとの日程調整が簡単に！"
date: 2017-04-07T11:30:39
slug: "google-calendar-scheduling-friends"
tags: ["Google"]
categories: ["Web Apps"]
draft: false
---

日程を決めるのも一つの技術です！ メールで何度もやり取りして会議の時間を決めるたびに、自分のカレンダーをそのまま相手に送って、相手が空いている時間を選べたらいいのにと思っていました。シンプルで楽ですよね！ 強力な Google なら、こうした機能があるはずだと考え続けていました。案の定、調べてみると、Google カレンダーでは、カレンダーを URL の形で誰とでも共有できることが分かりました。しかも、すべての予定は「予定あり」と匿名化されるため、相手にはその時間帯に予定があることしか見えず、予定の内容・時間・参加者などの詳しい情報は分かりません。


<!--more-->


初期設定では、このカレンダーの URL は単一のカレンダーにしか使えません。私と同じように、学校・仕事・サークルの予定を複数のカレンダーに分けている場合でも、ご安心ください。URL のパラメータを少しいじるだけで、複数のカレンダーのデータを統合できます！ 同じ原理を応用すれば、複数の友人のカレンダーを統合して一緒に見ることもできます。ひと目見るだけで、いつ食事の約束ができるかが分かります。もちろん、そのためには、あなたと友人がカレンダーを使う習慣を持っていることが前提になります。

まず、Google カレンダーにログインし、右上の「設定」を選択します。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-07_下午11_58_38.jpg"><img class="alignnone size-full wp-image-7588" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-07_下午11_58_38.jpg" alt="" width="694" height="623" /></a>

カレンダーの設定に入ったら、「カレンダー」を選択し、共有したいカレンダーの最後にある「共有：設定を編集」をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22.jpg"><img class="alignnone size-full wp-image-7589" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22.jpg" alt="" width="871" height="859" /></a>

「このカレンダーを公開する」と「自分の空き／予定あり情報のみを共有する」の両方にチェックを入れて保存してください。こうすることで、他の人があなたの予定の内容を見られなくなります。複数のカレンダーをまとめて表示したい場合は、それぞれのカレンダーでこの設定を有効にするのを忘れないでください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_03_31.jpg"><img class="alignnone size-full wp-image-7590" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_03_31.jpg" alt="" width="735" height="664" /></a>

その後「カレンダー」のページに戻るので、共有したいカレンダーの名前をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22-1.jpg"><img class="alignnone size-full wp-image-7591" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_02_22-1.jpg" alt="" width="871" height="859" /></a>

カレンダーの詳細情報に進んだら、下へスクロールして「カレンダーの URL」を見つけてください。「HTML」ボタンを右クリックして、リンクのアドレスをコピーすれば完了です！ あとは、この URL を友人に共有すれば、あなたがいつ予定があるのかを直接見てもらえます。

後ほどカレンダー ID も使うので、覚えておいてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_07_26.jpg"><img class="alignnone size-large wp-image-7592" src="{{< param imageBase >}}/wp-content/uploads/2017/04/螢幕快照_2017-04-08_上午12_07_26-916x1024.jpg" alt="" width="660" height="738" /></a>

カレンダーが一つだけなら、これで完了です、おめでとうございます！ しかし、私のように三刀流（カレンダーを三つ使い分けている）の場合は、先ほどコピーした URL をメモ帳などに貼り付けてみてください。たとえば次のようになります。
<pre>https://calendar.google.com/calendar/embed?src=linroex%40gmail.com&amp;ctz=Asia/Taipei</pre>
中に src パラメータがあることが分かると思います。この src パラメータこそ、先ほどの「カレンダー ID」そのものです。実は、src パラメータは複数指定することができます。たとえば、これは私の公開している予定あり表示のカレンダーですが、複数の src パラメータが含まれています。これが、複数のカレンダーを同時に表示する方法です！
<pre>https://calendar.google.com/calendar/b/1/embed?src=5568b8r12gsksk53jvnuttuifo@group.calendar.google.com&amp;src=g8596g4q67n4g5q9in12d6j0h0@group.calendar.google.com&amp;src=38i6i61131mt5tbdu8gp0tu71s@group.calendar.google.com&amp;ctz=Asia/Taipei</pre>
src パラメータ以外にも、次のパラメータを使えます。
<ul>
 	<li>title：公開カレンダーの左上に表示されるタイトルを設定します</li>
 	<li>wkst：1 週間の始まりを何曜日にするかを設定します（日曜日＝1）。2 に設定することをおすすめします</li>
 	<li>mode：デフォルトの表示モードを設定します（WEEK、AGENDA、MONTH）</li>
</ul>
私は 10 個近いカレンダーを持っているので、正直なところ、なぜこんなに細かく分けてしまったのかと嘆きたくなることもあります。とはいえ、大丈夫です。面倒くさがりの私は、すでにカレンダー ID をすばやく取得する方法を見つけています！ Google カレンダーのホームページに戻り、右クリックしてページのソースを表示し、いずれか一つのカレンダー ID で検索してください。すると、JSON によく似た大きなかたまりが見つかります。それをコピーして JSON フォーマッターに貼り付ければ、あとは皆さんなら自分で何とかできるはずです！
