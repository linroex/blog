---
title: "【C++】CMDでコンソールアプリケーションにファイルを渡し、データを返す方法"
date: 2010-12-04T10:00:16
slug: "c-cmd-send-file-to-console-app-2"
tags: ["C++", "Windows"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_232836.jpg"><img class="size-large wp-image-4097 aligncenter" title="2010-11-26_232836" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-26_232836-520x365.jpg" alt="" width="520" height="365" /></a></p>
C++ では、単純に fopen を使ってファイルを読み込む方法のほかにも、別の読み込み方があります。しかも fopen よりずっと簡単に実装できる方法です。それは CMD を使って C++ プログラムにファイルを流し込む方法です。たとえば test.exe というプログラムと x.txt というテキストファイルがあり、test.exe に x.txt のデータを読み込ませて表示させたいとします。CMD を開いて <em><strong>test.exe&lt;x.txt</strong></em> と入力すると、x.txt の内容を読み込んで表示できます。この記事では、このようなファイルの読み込み方を紹介します。この方法を教えてくださった「滄海」さんにも感謝します。


<!--more-->

<h2>ファイルの読み込みと返却：</h2>
言葉で説明するのは難しいので、動画を撮影しました。ぜひご覧ください。

プロジェクトファイルのダウンロード： <a href="http://goo.gl/n8W9G">http://goo.gl/n8W9G</a>
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="480" height="385" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="src" value="http://www.youtube.com/v/jAr1WBhJg1M?fs=1&amp;hl=zh_TW" /><param name="allowfullscreen" value="true" /><embed type="application/x-shockwave-flash" width="480" height="385" src="http://www.youtube.com/v/jAr1WBhJg1M?fs=1&amp;hl=zh_TW" allowscriptaccess="always" allowfullscreen="true"></embed></object>
