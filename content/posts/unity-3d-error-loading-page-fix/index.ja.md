---
title: "Unity 3D 起動時の「Eorror loading page  couldn&#039;t read a file ://file」エラーの解決方法"
date: 2014-01-26T17:53:14
slug: "unity-3d-error-loading-page-fix"
tags: ["Unity", "Game Development"]
categories: ["Programming"]
draft: false
---

Unity のインストールは問題なく済んだのに、起動すると「Eorror loading page couldn't read a file ://file」というエラーメッセージが出る人がいます。私の推測では、このエラーはユーザー名に中国語の文字が含まれていることが原因で、Unity が初回起動時にライセンスキーを読み込むときに問題が起きているのだと思います。この問題は実はとても簡単に解決できます。ライセンスキーを手動で Unity に読み込ませればいいのです。下の手順に沿って操作してみてください。


<!--more-->


1. まずネットワーク接続をオフにしてください。戸惑わないでくださいね。これは、Unity が Web 認証ではなく、手動認証モードに切り替わるようにするためです。

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173632.jpg"><img class="aligncenter size-full wp-image-916" alt="2014-01-26_173632" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173632.jpg" width="346" height="768" /></a>

&nbsp;

2. Unity を起動してください。今回はエラーメッセージは表示されず、下の画像のようなページが出てきます。これはライセンスを手動で管理するためのページです。「Manual Activation」をクリックしてから、「Save License」をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173810.jpg"><img class="aligncenter size-full wp-image-917" alt="2014-01-26_173810" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173810.jpg" width="606" height="359" /></a> <a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173821.jpg"><img class="aligncenter size-medium wp-image-918" alt="2014-01-26_173821" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_173821.jpg" width="392" height="229" /></a>

&nbsp;

3. 手動認証のページ（https://license.unity3d.com/manual）にアクセスし、先ほど保存したファイルをアップロードしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-26-at-5.45.32-PM.jpg"><img class="aligncenter size-full wp-image-919" alt="Screen Shot 2014-01-26 at 5.45.32 PM" src="{{< param imageBase >}}/wp-content/uploads/2014/01/Screen-Shot-2014-01-26-at-5.45.32-PM.jpg" width="877" height="521" /></a>4. 「Activate the free version of Unity」を選択

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174726.jpg"><img class="aligncenter size-full wp-image-920" alt="2014-01-26_174726" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174726.jpg" width="654" height="615" /></a>

5. 「Download」をクリックして、ライセンスキーのファイルをダウンロードします。

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174926.jpg"><img class="aligncenter size-full wp-image-921" alt="2014-01-26_174926" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_174926.jpg" width="654" height="615" /></a>

6. もう一度ネットワーク接続をオフにしてから、Unity のメインプログラムを開きます。手順2と同じく「Manual Activation」をクリックし、次に「Load License」をクリックして、先ほどダウンロードしたファイルを選択してください。

下の画面が表示されたら成功です！ あとは Unity を再起動して、存分にお楽しみください！

<a href="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_175005.jpg"><img class="aligncenter size-full wp-image-922" alt="2014-01-26_175005" src="{{< param imageBase >}}/wp-content/uploads/2014/01/2014-01-26_175005.jpg" width="274" height="152" /></a>

&nbsp;
