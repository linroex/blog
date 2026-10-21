---
title: "Python でグローバル例外ハンドラーを設定する"
date: 2017-01-02T15:00:12
slug: "python-global-exception-handler"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

通常、例外処理はグローバルに行うべきものではありません。例外処理をグローバルに適用すると、問題がどこで起きたのかを特定して対処するのが難しくなるからです。ただ、ごくまれにこのようなコードを書かなければならない場合があります。今回の例では、Python で webhook を処理するプログラムを書いていたのですが、サーバーから送られてくる情報が多種多様なため、例外が発生したときに環境データを出力して、後からデバッグできるようにする必要がありました。こういうときこそ、Global Exception Hook のテクニックを使うべきです。


<!--more-->


例外処理の観点から言えば、グローバルな例外処理は基本的に良いこととは言えません。ここで紹介するテクニックを使う前に、自分が何をしようとしているのかをよく理解しておいてください。

早速コードを見てみましょう！
<pre>import sys
 
def debug_exception_handle(exctype, value, traceback):
    print event
    print 'errorrrrrr'
    sys.__excepthook__(exctype, value, traceback)

sys.excepthook = debug_exception_handle</pre>
簡単に説明すると、Python には例外のフック機構が用意されています。`sys.excepthook` を使うと、指定した関数を例外処理に割り込ませることができ、「例外が発生したときに環境情報を出力する」という目的を達成できます。また、これはフックという形式なので、元の例外が上位に伝わり続けるように `sys.__excepthook` を実行する必要があります。
