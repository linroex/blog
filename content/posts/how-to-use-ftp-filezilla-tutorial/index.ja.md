---
title: "FTP の使い方：FileZilla 接続チュートリアル"
date: 2010-08-30T22:04:23
slug: "how-to-use-ftp-filezilla-tutorial"
tags: ["FTP", "FileZilla"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213528.jpg"><img class="size-large wp-image-3729 aligncenter" title="2010-08-30_213528" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213528-480x400.jpg" alt="" width="480" height="400" /></a></p>
今日はもうみんな新学期が始まったのでしょうか。私は実は先週から学校が始まっていました。この数日を過ごしてみて、高職での生活はなかなか良いと感じています。ただ、教官は少し厳しく、先生は少しくどいところがあります。でも、先生がくどいのはまだ良いことだと思います。少なくとも、ちゃんと面倒を見てくれる先生に当たったということですから。中学の先生からは、高校に入ったら誰も管理してくれなくなり、良くも悪くも自分次第だと聞いていました。ところが今見ている限り、先生方はとても責任感が強く、むしろ少し責任感が強すぎるくらいです 0.0 授業のことはこのくらいにしておきましょう。教官が来て、ネットで先生の悪口を書いたと言われても困りますから？ まあいいでしょう~ この記事を書いた主な理由は、今日、資料処理科15組の「計算機概論」の授業があったからです。先生からは、今後の宿題は FTP で提出しなければならず、一部の補助資料も FTP でダウンロードする必要があると言われました。そこで、<a href="http://filezilla-project.org/">FileZilla</a> を使った接続方法をみなさんに紹介するためにこの記事を書きました。

まず、このプログラム <a href="http://filezilla-project.org/">FileZilla</a> について簡単に紹介します。<a href="http://filezilla-project.org/">FileZilla</a> は FTP 接続用のプログラムで、FTP サーバーに簡単に接続し、ファイルのアップロードやダウンロードができます。サイトマネージャー機能も内蔵しており、FTP サーバーのアドレス、アカウント、パスワードを覚えておいてくれます。


<!--more-->


<h2>FileZilla の情報</h2>
<ul>
	<li>公式サイト：<a href="http://filezilla-project.org/">http://filezilla-project.org/</a></li>
	<li>ダウンロード先：<a href="https://www.ohloh.net/p/filezilla/download?filename=FileZilla_3.3.4.1_win32.zip">公式のダウンロード先</a> | <a href="http://www.box.net/shared/u8h8j2ahkm">Box.net</a> | Xun6 | <a href="http://www.4shared.com/file/wg5jeVUR/FileZilla_3341_win32.html ">4Shared</a></li>
	<li>ファイルサイズ：6MB</li>
</ul>
<h2>FileZilla の使い方</h2>
1. まず<a href="https://www.ohloh.net/projects/filezilla/download?filename=FileZilla_3.3.4.1_win32.zip">こちら</a>から FileZilla 本体をダウンロードし（上記のいずれかのダウンロード先でも可）、解凍してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213926.jpg"><img class="alignnone size-large wp-image-3730" title="2010-08-30_213926" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213926-515x400.jpg" alt="" width="515" height="400" /></a>

2. 解凍したフォルダを開き、filezilla.exe を起動します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214156.jpg"><img class="alignnone size-large wp-image-3731" title="2010-08-30_214156" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214156-515x400.jpg" alt="" width="515" height="400" /></a>

3. ホストの欄に FTP サーバーのアドレスを入力します。接続先の FTP にログインが必要な場合は、ユーザー名とパスワードの欄にアカウントを入力してから、クイック接続をクリックします。私たちの学校の FTP はアカウントが不要なので、サーバーのアドレスを入力してクイック接続をクリックするだけで、ゲストとして自動的にログインされます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214548.jpg"><img class="alignnone size-large wp-image-3732" title="2010-08-30_214548" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214548-484x400.jpg" alt="" width="484" height="400" /></a>

4. まずはアップロードの方法です。左側で、アップロードしたいファイルを選択し、そのファイル（またはフォルダ）を右クリックして「アップロード」を選びます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215228.jpg"><img class="alignnone size-large wp-image-3733" title="2010-08-30_215228" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215228-550x334.jpg" alt="" width="550" height="334" /></a>

5. 次に、FTP からファイルをダウンロードする方法です。手順は簡単で、先ほどの操作を逆にするだけです。先ほどは左側からアップロードしましたが、今度は右側で右クリックして「ダウンロード」を選びます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215525.jpg"><img class="alignnone size-large wp-image-3734" title="2010-08-30_215525" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215525-550x334.jpg" alt="" width="550" height="334" /></a>

6. 基本的な使い方は以上です。また、一度ログインすると、FileZilla が FTP サーバーの情報を自動で記録してくれるので、次回からはすばやく接続できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215907.jpg"><img class="alignnone size-large wp-image-3735" title="2010-08-30_215907" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215907-550x334.jpg" alt="" width="550" height="334" /></a>

7. 一度に多くのファイルをダウンロードする場合は、プログラム下部の転送キューのペインで進捗を確認できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_220153.jpg"><img class="alignnone size-large wp-image-3736" title="2010-08-30_220153" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_220153-484x400.jpg" alt="" width="484" height="400" /></a>

補足：注意が必要なのは、学校のパソコンでは、インスタントメッセンジャーや MSN、そのほかアカウントとパスワードの入力を必要とする機能は使わないことをおすすめします。もともと、学校のパソコンには復元用のカードが入っているだろうから、ウイルスの心配はいらないと思っていました。しかしその後、学科主任から、ハードディスクの1台は私たちがデータを保存するためのものだと聞きました……つまり、そこにもウイルスを仕込まれるおそれがあるということです。そのため、この学校のパソコンではインスタントメッセンジャーを使う気にはとてもなれません。（今日、インスタントメッセンジャーにログインした後で学科主任からこの話を聞き、私は本当に取り乱してしまいました……）
