---
title: "PHP の実行時間の上限を変更し、長時間の処理が途中で止められないようにする"
date: 2011-08-09T15:04:03
slug: "php-max-execution-time-limit"
tags: ["PHP"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_150333.jpg"><img class="alignnone size-large wp-image-678" title="2011-08-09_150333" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_150333-540x423.jpg" alt="" width="540" height="423" /></a>

PHP にはデフォルトで 30 秒の実行上限があります。プログラムの実行が 30 秒を超えると、「<strong>Fatal error</strong>: Maximum execution time of 30 seconds exceeded」というエラーメッセージが表示されます。これは、無限ループなどのおかしなコードがあった場合に、システム全体が止まってしまうのを防ぐための仕組みです。ただ、プログラムによっては 30 秒を超えて実行する必要がある場合もあります。たとえば、PHP で非常に大きなファイルを処理する場合です。データベースのバックアップファイルは数百 MB になることもあり、処理に時間がかかって 30 秒を超えてしまうことがあります。以前作った Plurk BOT やクローラーのプログラムも、簡単に 30 秒を超えていました。ここでは、この時間の上限を調整する二つの方法を紹介します。


<!--more-->

<h2>方法一：php.ini を変更する</h2>
php.ini を変更すると、実行時間の上限を引き上げられます。この方法の特徴は「グローバル」な変更であることです。一度設定を変更すると、今後の「すべての PHP スクリプト」がこの時間の上限を使うようになります。これには良い面も悪い面もあります。良い面は便利なことです。悪い面は、コードに誤りがあっても気づきにくく、システムが止まってしまう可能性があることです。

php.ini（/etc/php.ini）を開き、「max_execution_time」を検索します。

デフォルトは 30 です。30 を希望する時間の上限（秒単位）に変更してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_145234.jpg"><img class="alignnone size-large wp-image-677" title="2011-08-09_145234" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_145234-540x321.jpg" alt="" width="540" height="321" /></a>
<h2>方法二：set_time_limit</h2>
共有ホスティングを使っていて php.ini を編集できない場合や、すべてのプログラムに上限がないのが嫌な場合があります。そのようなときは set_time_limit 関数を使えます。コードに直接書き込むことができ、実行時間の上限を「ソフトに」設定できます。また、この変更はグローバルではありません。

なお、set_time_limit は PHP のセーフモード（Safe mode）では効果がありません。
<pre lang="php">set_time_limit(制限時間)</pre>
制限時間の単位は秒です。上限を設けないようにするには 0 を指定します。
<pre lang="php">set_time_limit(0)</pre>
上のように書くと上限がなくなります。

この関数は、コードの一番上に書くことをおすすめします。

set_time_limit の公式ドキュメント：<a href="http://php.net/manual/en/function.set-time-limit.php">http://php.net/manual/en/function.set-time-limit.php</a>
