---
title: "GCP の自動引き落としで残高不足になったときの対処"
date: 2017-02-07T10:19:02
slug: "google-cloud-platform-overdue-payment"
tags: ["GCP"]
categories: ["SRE"]
draft: false
---

GCP に登録しているクレジットカードは「VISA デビットカード」タイプのため、毎月の自動引き落としの際に銀行の残高が足りず、失敗することがあります。GCP の現在の対応は、引き落としに失敗するとメールで知らせ、1 日後に再度引き落としを試みるというものです。それでも失敗した場合は、問題を解決したうえで GCP の管理画面にログインして自分で支払うよう求められます。これまで管理画面からの支払いで問題が起きたことはなかったのですが、今回は導線が変わったようです。メールのリンクをたどると請求ページに移動しますが、そのページでは支払いができません。正しい支払いボタンを見つけても、Chrome Canary を使うと支払いダイアログが延々と読み込み中のままになるフロントエンドの問題が起きます。支払いを完了するには、通常版の Chrome に切り替える必要がありました。この支払いダイアログにどんな最新の技術が使われているのか、本当に気になります……


<!--more-->


GCP で引き落としに失敗すると、次のようなメールが届きます。メールの指示に従って「お支払い方法」ページを開き、「修正」をクリックすると「残高不足」の問題を解決できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_39.jpg"><img class="alignnone size-large wp-image-7389" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_39-1024x590.jpg" alt="" width="660" height="380" /></a>

ただし Chrome Canary を使うと、ダイアログがくるくると回り続けます。10 分ほど待ちましたが、表示されませんでした。解決方法は、通常版の Chrome ブラウザに切り替えることです。

Chrome Canary は Chrome の公式ナイトリービルドです。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_48.jpg"><img class="alignnone size-full wp-image-7390" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_48.jpg" alt="" width="647" height="610" /></a>

また、GCP の請求ページに直接ログインすると、次のような表示が出ます。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_07.jpg"><img class="alignnone size-full wp-image-7391" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照_2017-02-07_上午9_47_07.jpg" alt="" width="979" height="693" /></a>

「Make a Payment」をクリックすると請求ページに移動しますが、そのページでは支払いができないのです！！！

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-07-上午9.47.26.jpg"><img class="alignnone size-large wp-image-7392" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-07-上午9.47.26-1024x599.jpg" alt="" width="660" height="386" /></a>

Google でさえ間違えることがあるのだ、と言わざるをえません。あるいは何か深い意図があるのかもしれませんが、私にはわかりませんでした T_T 私にわかっているのは、この問題の解決にずいぶん時間を費やしたということだけです……
