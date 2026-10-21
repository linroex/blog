---
title: "Google Cloud Storage に大きなファイルをアップロードするコツ"
date: 2016-12-04T10:00:49
slug: "tips-for-upload-large-file-to-google-cloud-storage"
tags: ["GCP"]
categories: ["Programming"]
draft: false
---

私は定期的にデータのバックアップを取っていて、Google、Facebook、Evernote のデータや写真アルバムなどを Google Cloud Storage に保存しています。ブラウザからアップロードすると速度が遅くて困りますし、回線が切れると 10 GB の大きなファイルを最初から送り直さなければなりません。そこで公式ドキュメントを調べて、大きなファイルを Google Cloud Storage にアップロードするときに役立つコツをいくつか見つけたので、ここで紹介します。

この記事で扱う内容：
<ul>
 	<li>GCP Storage にファイルの MD5 チェックサムを検証させる方法</li>
 	<li>レジューム（再開）機能を有効にして、切断されても続きから送信できるようにする方法</li>
 	<li>並列転送でアップロード速度を限界まで引き出す方法</li>
</ul>

<!--more-->


ただし、10 TB のような非常に大きなデータを送る場合は、ネットワーク転送よりも物理メディアで送るほうが速いことがあります。その場合は Cloud Storage が提供している <a href="https://cloud.google.com/storage/docs/offline-media-import-export">Offline Media Import / Export</a> を使うのがおすすめです。AWS S3 向けのトラックを使ったサービスに近いものですが、もっと控えめな仕組みです。

まず、何をするにしても gsutil をインストールしておきましょう。これは Google Cloud Storage 専用のコマンドラインツールで、便利な機能がたくさん隠れています。ブラウザからのアップロードとは比べものにならない強力なツールです！

インストール方法は、こちらの公式ドキュメントを参照してください：<a href="https://cloud.google.com/sdk/docs/">Install the latest Cloud Tools version</a>

インストールが終わったら、ターミナルで次のコマンドを実行し、インストールと設定が正しく完了しているか確認します：
<pre>gsutil ls gs://{Your Bucket Name}</pre>
<h2>gsutil でアップロードし、レジュームに対応させる</h2>
gsutil で 8MB を超えるファイルをアップロードする場合、追加のパラメータは不要で、初期設定でレジューム機能が有効になります。途中で回線が切れても、同じコマンドをもう一度実行するだけで続きから再開されます。
<pre>gsutil cp -r src_url dest_url</pre>
フォルダをアップロードする場合は -r オプションを付けてください。

例：
<pre>gsutil cp ~/Documents/facebook.zip gs://backup-bucket/2016-10-10

gsutil cp ~/Documents/*.zip gs://backup-bucket/2016-10-10

gsutil cp -r ~/Documents/ gs://backup-bucket/2016-10-10</pre>
また、cp コマンドの 2 つのパス引数を入れ替えると、ダウンロードになります。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午12.55.44.jpg"><img class="alignnone size-full wp-image-6986" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午12.55.44.jpg" alt="%e8%9e%a2%e5%b9%95%e5%bf%ab%e7%85%a7-2016-12-02-%e4%b8%8b%e5%8d%8812-55-44" width="922" height="586" /></a>

参考：<a href="https://cloud.google.com/storage/docs/gsutil/commands/cp">Google Cloud Storage 公式ドキュメント - gsutil cp</a>
<h2>並列化でアップロード速度を最大限に引き出す</h2>
まず、<strong>多数のファイル</strong>をアップロードする場合（1 つの大きなファイルではないことに注意）は、gsutil の後に -m オプションを付けます。gsutil が複数のスレッドでファイルをアップロードするため、小さなファイルが多いときに大きな効果があります。

注意：cp の後ろではなく、gsutil の後ろに付けてください！
<pre>gsutil -m cp Downloads/fb.zip gs://backup/2016-10-10</pre>
一方、大きなファイルを 1 つアップロードする場合は、parallel_composite_upload_threshold を使ってファイルを分割してアップロードできます。たとえば 10 GB のファイルを次のコマンドでアップロードすると、10 個に分割されて送信されます。これもある程度アップロード速度の向上に役立ちます。
<pre>gsutil -o GSUtil:parallel_composite_upload_threshold=1000M cp ~/Downloads/all_accesslog gs://backup/</pre>
<h2>ファイルの整合性の検証</h2>
MD5 を使うと、GCP Storage にアップロードしたファイルが完全かどうかを検証できます。まずローカルでチェックサムを計算し、サーバーがファイルを受け取った後にもう一度チェックサムを計算させます。両者が完全に一致すれば、ファイルは完全です。これにより、バックアップを取ったつもりでいたのに、不安定な回線のせいでファイルの一部が欠けて復元できなくなる、という事態を防げます。

次のコマンドで、ファイルのチェックサム（base64 エンコード）を計算できます。なお、parallel_composite_upload_threshold を使ってアップロードする場合は、CRC32C チェックサムしか使えない点に注意してください。
<pre>gsutil hash ~/Downloads/apache.log</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.17.11.jpg"><img class="alignnone size-full wp-image-6987" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.17.11.jpg" alt="%e8%9e%a2%e5%b9%95%e5%bf%ab%e7%85%a7-2016-12-02-%e4%b8%8b%e5%8d%881-17-11" width="671" height="508" /></a>

チェックサムを計算したら、次のコマンドでヘッダーとして付けてアップロードできます。アップロードが完了すると、GCP Storage が自動的にチェックサムが一致するかを確認します。
<pre>gsutil -h Content-MD5:kClkmpnshA9eVrNlwIv82w== cp fb.zip gs://backup/</pre>
