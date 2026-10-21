---
title: "隠しファイルが開けない問題の解決方法"
date: 2009-05-03T05:38:00
slug: "fix-hidden-files-cannot-open-registry"
tags: ["Windows"]
categories: ["Hardware"]
draft: false
---

USB メモリのウイルスに感染すると、隠しファイルが表示されなくなることがあります。<br/>
この記事では、ほとんどのケースで隠しファイルが表示されない問題を解決する方法を紹介します。<br/>
<br/>
まず「スタート」→「ファイル名を指定して実行」→「regedit」と入力→<br/>
「HKEY_CURRENT_USER&#92;SOFTWARE&#92;Microsoft&#92;Windows&#92;CurrentVersion&#92;Explorer&#92;Advanced&#92;Folder&#92;Hidden&#92;SHOWALL」<br/>
初心者の方が迷わないように、まずは一階層ずつ展開して見せます。<br/>
HKEY_CURRENT_USER&nbsp; &rarr;&nbsp; SOFTWARE&nbsp; &rarr;&nbsp; Microsoft&nbsp; &rarr;&nbsp; Windows&nbsp; &rarr;&nbsp; CurrentVersion&nbsp; &rarr;&nbsp; Explorer&nbsp; &rarr;&nbsp; Advanced&nbsp; &rarr;&nbsp; Folder&nbsp; &rarr;<br/>
Hidden&nbsp; &rarr;&nbsp; SHOWALL<br/>
<br/>
展開したら、右側にある「CheckedValue」が見えますか？それをダブルクリックし、基数は 16 進数を選んで、値のボックスに 1 を入力します。<br/>
<br/>
次に、パソコンを再起動するか、「タスク マネージャー」→「プロセス」タブ→「explorer.exe」を終了します。この時点でデスクトップとタスクバーが消えます。<br/>
<br/>
そして「アプリケーション」タブの空白部分を右クリック→「新しいタスク（実行）」→「explorer.exe」と入力すれば完了です。
