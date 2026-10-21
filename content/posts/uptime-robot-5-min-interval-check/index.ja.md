---
title: "Uptime Robot - 最短5分間隔で、サイトが閲覧できるかをチェック"
date: 2011-02-20T13:48:36
slug: "uptime-robot-5-min-interval-check"
tags: ["Monitoring", "Uptime Robot"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_132741.jpg"><img class="size-large wp-image-4782 aligncenter" title="2011-02-20_132741" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_132741-520x381.jpg" alt="" width="520" height="381" /></a></p>
<strong><a href="http://www.uptimerobot.com/">Uptime Robot</a></strong>は、私が個人的におすすめしているアップタイム（稼働率）チェックサービスです。つまり、サーバーが正常に動いているか、訪問者がサイトを閲覧できるかを確認してくれます。Uptime Robot に似たサービスは多くありますが、無料のアップタイムチェックサービスの多くは確認間隔が1時間以上です（つまり、そのサービスがどのくらいの間隔でサイトを確認するか、ということです）。一方、Uptime Robot の<strong>最短間隔は5分</strong>です。サイトに問題が起きると、自動でメールも送ってくれます。Uptime Robot は現在無料ですが、今後有料になるかどうかは分かりません……


<!--more-->


アップタイム（稼働率）とは、1か月のうちサーバーが正常に稼働していた時間のことです。アップタイムが高いほどサーバーは安定しており、サイトも人気を集めやすくなります。たとえば、博物館がオープンして最初の1か月のうち3分の1の時間が修理中で見学できないとしたら、あなたはその後もその博物館に行きたいと思うでしょうか。ですから、サイトのアクセス数を増やしたいなら、アップタイムは重要な要素のひとつなのです。
<h2>Uptime Robot の情報</h2>
サイトURL：<a href="http://www.uptimerobot.com/">http://www.uptimerobot.com/</a>
<h2>Uptime Robot の使い方</h2>
1. <a href="http://www.uptimerobot.com/">Uptime Robot</a> の公式サイトにアクセスし、【Start now】をクリックします。その後、名前（ニックネーム）、メールアドレス、アカウント、パスワードなどの情報を入力し、【Register】をクリックすれば登録完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133550.jpg"><img class="alignnone size-large wp-image-4784" title="2011-02-20_133550" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133550-520x381.jpg" alt="" width="520" height="381" /></a>

2. 下のメッセージが表示されたら、登録が成功しています。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133733.jpg"><img class="alignnone size-full wp-image-4785" title="2011-02-20_133733" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133733.jpg" alt="" width="342" height="330" /></a>

3. 次に、メールを確認して、確認用のリンクをクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133911.jpg"><img class="alignnone size-large wp-image-4786" title="2011-02-20_133911" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_133911-520x381.jpg" alt="" width="520" height="381" /></a>

4. 確認リンクをクリックしたら、【Sign In】をクリックし、メールアドレスとパスワードを入力します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134032.jpg"><img class="alignnone size-large wp-image-4787" title="2011-02-20_134032" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134032-520x381.jpg" alt="" width="520" height="381" /></a>

5. Uptime Robot の管理画面に入ったら、【Add new】ボタンをクリックし、使用したいチェック方式（HTTP、KeyWord、Ping）を選びます。個人的には、HTTP のほうが正確なのでおすすめです。サーバー自体は正常でも、その上で動いている Web サーバーに問題が起きていることがあります。その場合、Ping では意味がないからです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134305.jpg"><img class="alignnone size-large wp-image-4788" title="2011-02-20_134305" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134305-520x381.jpg" alt="" width="520" height="381" /></a>

6. HTTP を選ぶと、【Friendly Name】と【URL】の入力欄が表示されます。URL にはチェックしたいサイトのURLを、Friendly Name にはそのURLにつける名前を入力し、最後に【Add】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134441.jpg"><img class="alignnone size-large wp-image-4789" title="2011-02-20_134441" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134441-520x381.jpg" alt="" width="520" height="381" /></a>

7. その後、サイトに接続できなくなると、メールで知らせてくれます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134759.jpg"><img class="alignnone size-large wp-image-4790" title="2011-02-20_134759" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-20_134759-520x185.jpg" alt="" width="520" height="185" /></a>
<h2>短評</h2>
Uptime Robot をおすすめする理由は、今朝起きたときに、サーバーに接続できないという通知メールが届いていたからです。おかげで、できるだけ早く問題に対処してサイトを復旧させることができました。もしこのサービスがなければ……たぶん誰かに教えてもらうまで、サイトがダウンしていることに気づけなかったでしょう。そうなると、多くの訪問者を失っていたはずです。ですから、みなさんにもぜひアップタイムを監視するサービスを設定してもらいたいと思います。サーバーに問題が起きても、訪問者の離脱を最小限に抑えられるからです。
