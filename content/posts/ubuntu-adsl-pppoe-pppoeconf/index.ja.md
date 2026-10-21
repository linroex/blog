---
title: "【Ubuntu】ADSL（PPPoE）でのインターネット接続設定 - pppoeconf"
date: 2010-12-15T08:00:40
slug: "ubuntu-adsl-pppoe-pppoeconf"
tags: ["Ubuntu", "Networking"]
categories: ["Hardware"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231404.jpg"><img class="size-full wp-image-4199 aligncenter" title="2010-12-13_231404" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231404.jpg" alt="" width="402" height="330" /></a></p>
今どきはほとんどの家庭で PPPoE という接続方式が使われています。ADSL を申し込んだ場合や、モデムを経由しないとインターネットに接続できない場合は、Ubuntu で接続する前に PPPoE の設定が必要です。記憶違いでなければ、以前のバージョンの Ubuntu では PPPoE の設定はとても面倒でした。ところが最近 Ubuntu 10.04 に戻ってみると、新しい Ubuntu には pppoeconf というコマンドが最初から入っていて、PPPoE をすばやく設定できることがわかりました。

補足：pppoeconf よりもさらに速い方法があると聞きました。orz……　ただ、以前使っていたバージョンと比べると、pppoeconf はかなり速いと思います XD


<!--more-->
1. Ubuntu にログインしたら、ターミナルを開いて次のコマンドを入力します。

sudo pppoeconf

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-001.png"><img class="alignnone size-large wp-image-4185" title="2010-12-13-001" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-001-520x323.png" alt="" width="520" height="323" /></a>

2. 次に、Ubuntu をインストールしたときに設定したシステムパスワードを入力します。入力中は画面に文字が表示されないので、パスワードを入力したらそのまま Enter を押してください。画面に何か表示されるかどうかは気にしなくて大丈夫です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-002.png"><img class="alignnone size-large wp-image-4186" title="2010-12-13-002" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-002-520x345.png" alt="" width="520" height="345" /></a>

3. 次に、イーサネットデバイスなどに関するウィンドウが表示されます。これはネットワークカードとローカルネットワークが検出されているかを確認しているだけなので、「はい」をクリックすれば大丈夫です。（もしデバイスがまったく検出されなかった場合は、お使いのネットワークカードが Ubuntu に対応していないのかもしれません……。そのときは「いいえ」を選んでください……）

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-003.png"><img class="alignnone size-large wp-image-4187" title="2010-12-13-003" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-003-520x345.png" alt="" width="520" height="345" /></a>

4. このウィンドウが表示されたら、そのまま「はい」をクリックしてください。このウィンドウが出るのは、私が以前に PPPoE を設定していたためです。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-004.png"><img class="alignnone size-large wp-image-4188" title="2010-12-13-004" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-004-520x345.png" alt="" width="520" height="345" /></a>

5. ここも「はい」をクリックすれば大丈夫です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-005.png"><img class="alignnone size-large wp-image-4189" title="2010-12-13-005" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-005-520x345.png" alt="" width="520" height="345" /></a>

6. ここはインターネットに接続するときに使うアカウント名の入力欄です。元の文字を消去してから入力し、入力したらそのまま Enter を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_225943.jpg"><img class="alignnone size-large wp-image-4190" title="2010-12-13_225943" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_225943-520x369.jpg" alt="" width="520" height="369" /></a>

7. ここはインターネットに接続するときのパスワードを入力する欄です。元の文字を消去してから入力し、入力したらそのまま Enter を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230012.jpg"><img class="alignnone size-large wp-image-4191" title="2010-12-13_230012" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230012-520x368.jpg" alt="" width="520" height="368" /></a>

8. ここは DNS サーバーに関する確認です。そのまま「はい」をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230526.jpg"><img class="alignnone size-large wp-image-4192" title="2010-12-13_230526" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230526-520x368.jpg" alt="" width="520" height="368" /></a>

9. ここも「はい」をクリックすれば完了です～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230832.jpg"><img class="alignnone size-large wp-image-4193" title="2010-12-13_230832" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230832-520x366.jpg" alt="" width="520" height="366" /></a>

10. ここも「はい」をクリックしてください。こうしておくと、次回以降はパソコンを起動するたびに自動で接続されるので、手動で接続し直す必要がなくなります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231003.jpg"><img class="alignnone size-large wp-image-4194" title="2010-12-13_231003" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231003-520x368.jpg" alt="" width="520" height="368" /></a>

11. この接続をすぐに有効にするかどうかを尋ねる画面です。断る理由もないので、「はい」でいいと思います XD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231057.jpg"><img class="alignnone size-large wp-image-4195" title="2010-12-13_231057" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231057-520x368.jpg" alt="" width="520" height="368" /></a>

12. 設定完了です～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231134.jpg"><img class="alignnone size-large wp-image-4196" title="2010-12-13_231134" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231134-520x367.jpg" alt="" width="520" height="367" /></a>
