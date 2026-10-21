---
title: "【Firefox 4】Firefox から直接 SSH 接続できるアドオン――FireSSH"
date: 2011-04-08T08:00:40
slug: "firefox-extension-firessh-ssh"
tags: ["Firefox", "SSH"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003704.jpg"><img class="size-large wp-image-4992 aligncenter" style="border: 1px solid black;" title="2011-04-05_003704" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003704-520x254.jpg" alt="" width="520" height="254" /></a></p>
VPS を使っていたり、Linux をいじっていたりするなら、SSH はおなじみでしょう。SSH はすべての Linux ユーザーが身につけるべきものだと言えます。SSH はリモートコントロールのようなもので、ただしグラフィックではなくテキストによるリモートコントロールです。普段 SSH 接続をするときは、PuTTY を使うのが一般的です。iOS デバイス（iPhone、iPad など）では iSSH を使っています。では、ブラウザーではどうでしょうか？ FireSSH という拡張機能を使えば、ウェブを見ながらそのまま SSH 接続でき、別のソフトを開く必要がありません～
<h2>
<!--more-->
FireSSH のインストール手順</h2>
P.S. FireSSH は現在 Firefox 4.0 でしか動作しません。

1. Firefox を開き、アドオンのページに移動します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003919.jpg"><img class="alignnone size-large wp-image-4993" title="2011-04-05_003919" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_003919-520x412.jpg" alt="" width="520" height="412" /></a>

2.【FireSSH】と検索して【インストール】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004100.jpg"><img class="alignnone size-large wp-image-4994" title="2011-04-05_004100" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004100-520x412.jpg" alt="" width="520" height="412" /></a>

3. インストール中……

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004118.jpg"><img class="alignnone size-large wp-image-4995" title="2011-04-05_004118" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004118-520x412.jpg" alt="" width="520" height="412" /></a>

4. インストール後は Firefox を再起動しないと有効になりません

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004150.jpg"><img class="alignnone size-large wp-image-4996" title="2011-04-05_004150" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004150-520x412.jpg" alt="" width="520" height="412" /></a>
<h2>FireSSH の使い方</h2>
1. アドレスバーに ssh:address:port と入力するだけです。

ssh:address:port の意味は以下のとおりです：
<ul>
	<li>address は SSH 接続先の IP アドレスまたはホスト名です</li>
	<li>port は SSH が使用するポートです。デフォルトは 22 で、変更していなければポートを指定しなくても構いません</li>
</ul>
たとえば、ローカルマシンに SSH 接続する場合で、私の SSH が 66 番ポートを使っているなら、次のように入力します：

ssh:localhost:66

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004924.jpg"><img class="alignnone size-large wp-image-4997" title="2011-04-05_004924" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_004924-520x424.jpg" alt="" width="520" height="424" /></a>

2. アカウントとパスワードの入力を求められます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005030.jpg"><img class="alignnone size-full wp-image-4998" title="2011-04-05_005030" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005030.jpg" alt="" width="275" height="190" /></a>

3. 接続中

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005039.jpg"><img class="alignnone size-large wp-image-4999" title="2011-04-05_005039" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005039-520x427.jpg" alt="" width="520" height="427" /></a>

4. 接続成功～ コマンドの入力も正常に動作します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005136.jpg"><img class="alignnone size-large wp-image-5000" title="2011-04-05_005136" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-05_005136-520x427.jpg" alt="" width="520" height="427" /></a>

&nbsp;
