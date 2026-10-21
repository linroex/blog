---
title: "macOS の Terminal でカーソルをすばやく移動する方法"
date: 2016-12-14T01:14:21
slug: "macos-terminal-cursor-movement"
tags: ["macOS"]
categories: ["Hardware"]
draft: false
---

眠気がかなり強いので、今日は簡単な小ネタを紹介します！ vim や Terminal を使っていて、とても長いコマンドにぶつかると、目的の場所まで矢印キーを延々と押し続けなければならず、面倒に感じることはありませんか。今日は、カーソルを指定の位置にすばやく移動させる三つの方法を紹介します。


<!--more-->


<strong>行頭や行末に移動する</strong>には、Ctrl + A で行頭へ、Ctrl + E で行末へ移動できます。これは Windows の操作感とは少し違うので、Mac OS を使い始めたばかりの方は知らないかもしれません。

また、vim を使っているときに<strong>ファイルの一番下に移動する</strong>には、Shift + G を押します。下に<strong>空行を追加する</strong>には、コマンドモードで o キーを押します。空行が挿入されると同時に、挿入モードに入ります。

そして最後は、とっておきの技です！ <strong>マウスでカーソルを操作する</strong>ことを、ずっと試したいと思っていました。長いコマンドを入力するときや vim を使うときに、とても便利なはずです。プラグインが必要だと思っていたのですが、ドキュメントを調べたところ、Option / Alt キーを押しながら移動先をマウスでクリックするだけでよいと分かりました。Terminal の入力カーソルがそこへ飛んでいきます！

ただ、カーソルの位置を切り替えるだけでは物足りません。実は vim にもマウス機能があります。マウスで文字列を選択してから、ショートカットで一度に大量の文字を削除できるのです！ ESC を押してから set mouse=a と入力すると、マウスモードが有効になります。それ以降は、ショートカットなしで直接文字を選択でき、D を押せば削除、Y を押せばコピーできます。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/Untitled.gif"><img class="alignnone wp-image-7121 size-full" src="{{< param imageBase >}}/wp-content/uploads/2016/12/Untitled.gif" width="938" height="578" /></a>

では、この三つの小技で今日の締めくくりとしましょう（バタッ
