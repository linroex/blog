---
title: "「0x000000 メモリを Read できません」エラーの解決方法"
date: 2009-02-07T09:24:00
slug: "fix-0x000000-memory-cannot-read"
tags: ["Windows"]
categories: ["Hardware"]
draft: false
---

最近、ゲームをしているときによく問題が起きます。

プログラムがときどきエラーを表示します。

「0x000000 メモリを Read できません」と表示されるのです。

本で見たところ、メモリの読み取りエラーが発生した位置を示すものだそうです。

でも本には、どう対処すればいいかは書かれていませんでした。

そこでネットで調べてみました。

ネット上には、cmd コマンドを使って DLL ファイルを再登録する方法があるようです。


<!--more-->


ここで紹介します。

まず、コマンドプロンプトを開きます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210801.jpg"><img class="alignnone size-full wp-image-1937" title="2009-09-21_210801" src="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210801.jpg" alt="2009-09-21_210801" width="347" height="175" /></a>

次のコマンドを入力します： for %1 in (%windir%system32*.dll) do regsvr32.exe /s %1

<a href="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210800.jpg"><img class="alignnone size-full wp-image-1935" title="2009-09-21_210800" src="{{< param imageBase >}}/wp-content/uploads/2009/02/2009-09-21_210800.jpg" alt="2009-09-21_210800" width="550" height="374" /></a>

しばらくの間、処理が続きます。

終わったら完了です。

また、パソコンがトロイの木馬やウイルスに感染した後も、DLL ファイルを再登録することをおすすめします。

ウイルスは DLL ファイルに感染することが多いからです。

そしてウイルス対策ソフトは、ウイルスを取り除くためにその DLL ファイルを削除してしまいます。

このときに再登録しないと、パソコンでエラーが起きてしまうかもしれません。
