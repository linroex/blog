---
title: "パソコンがフリーズしたときの緊急対処法"
date: 2009-07-08T18:55:40
slug: "pc-crash-emergency-handling"
tags: ["Windows"]
categories: ["Hardware"]
draft: false
---

パソコンがフリーズしてしまいました。どうしよう？ まさかまた再起動しなければならないのでしょうか………

ここでは、再起動せずにフリーズを解除する方法をご紹介します。

前提として、キーボードが使えて、マウスが動くことが必要です XD

P.S. キーボードの Num Lock キーを押して、キーボードが使えるかどうか確認できます。

フリーズを解除するには、まずタスクマネージャー（Ctrl+Alt+Delete）を開いてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_184816.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-07-08_184816" src="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_184816_thumb.jpg" border="0" alt="2009-07-08_184816" width="408" height="429" /></a>


<!--more-->


タスクマネージャーを開いたら、「プロセス」（處理程序）タブに切り替えます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_184911.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-07-08_184911" src="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_184911_thumb.jpg" border="0" alt="2009-07-08_184911" width="408" height="429" /></a>

下の一覧から explorer.exe を探して、「タスクの終了」（結束處理程序）をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_185049.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-07-08_185049" src="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_185049_thumb.jpg" border="0" alt="2009-07-08_185049" width="408" height="429" /></a>

デスクトップが消えて、壁紙だけが残ります。ですが、慌てないでください。次の手順を行えば、パソコンは元どおりになります。

次に「アプリケーション」（應用程式）タブに切り替え、「新しいタスク」（新工作）をクリックして、explorer.exe と入力してから【OK】（確定）を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_185213.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-07-08_185213" src="{{< param imageBase >}}/wp-content/uploads/2009/07/1678428fac89_10868/20090708_185213_thumb.jpg" border="0" alt="2009-07-08_185213" width="411" height="433" /></a>

この方法の仕組みは実はシンプルです。explorer というプロセスは Windows のデスクトップを管理しています。パソコンがフリーズするとき、原因がこのプロセスにある可能性が高いのです。そこでいったん閉じてから再び開けば、ほとんどのフリーズは解決できます。
