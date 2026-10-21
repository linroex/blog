---
title: "ウイルスによるエラーの修正"
date: 2009-05-03T10:00:00
slug: "fix-virus-infection"
tags: ["Windows"]
categories: ["Security"]
draft: false
---

ウイルスの中には、レジストリを使ってパソコンに被害を与えるものがあります。基本的に、ここではその一例だけを紹介します。レジストリには他にも、ウイルスが隠れている場所がたくさんあります。<br/>
パソコンに詳しくない方は、他の場所を変更しようとしないでください。軽く済むこともあれば、パソコンが壊れてしまうこともあります。以下の手順に従えば問題ありません。<br/>
「スタート」→「ファイル名を指定して実行」で「regedit」と入力<br/>
&nbsp;HKEY_CLASSES_ROOT&#92;exefile&#92;shell&#92;open&#92;command<br/>
<br/>
HKEY_CLASSES_ROOT&nbsp; -->&nbsp; exefile&nbsp; -->&nbsp; shell -->&nbsp; open -->&nbsp; command<br/>
<br/>
次に「(既定値)」を確認します。「"%1" %*」になっていれば正常です。そうでなければ、感染している可能性があります。<br/>
ダブルクリックして「"%1" %*」に変更してください<br/>
<br/>
また、他の場所にも注意してください！！
