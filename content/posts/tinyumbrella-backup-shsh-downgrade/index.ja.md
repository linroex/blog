---
title: "TinyUmbrella で iPad・iPhone の SHSH をバックアップし、ダウングレードできるようにする"
date: 2011-07-26T16:09:12
slug: "tinyumbrella-backup-shsh-downgrade"
tags: ["iOS", "Jailbreak"]
categories: ["Hardware"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_155602.jpg"><img class="alignnone size-large wp-image-5491" title="2011-07-26_155602" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_155602-520x363.jpg" alt="" width="520" height="363" /></a>

iPad や iPhone（以下 iOS デバイス）をダウングレードしようとすると、何度やっても失敗してしまうことがあります。これは、新しい iOS デバイスには、デバイスのダウングレードを阻止する保護機能が組み込まれているためです。この仕組みは、ユーザーが脱獄（JB）するのを防ぐために設計されています。新しい iOS がリリースされると、うっかり更新ボタンを押してしまう人もいます…… 通常、最新の iOS は脱獄できないので、更新してしまったユーザーは、脱獄するためにダウングレードするしかありません。ここで大きな問題が起きます。ダウングレードできないのです…… 今回紹介する TinyUmbrella は、ダウングレードを成功させてくれるソフトです。SHSH と呼ばれるものをバックアップしてくれます。SHSH をバックアップしておけば、ダウングレードも成功します〜


<h2>
<!--more-->
TinyUmbrella の紹介</h2>
<ul>
	<li>公式サイト：<a href="http://thefirmwareumbrella.blogspot.com/">http://thefirmwareumbrella.blogspot.com/</a></li>
	<li>ダウンロード先：<a href="http://cache.firmwareumbrella.com/downloads/tinyumbrella-5.10.14.exe">公式ダウンロード</a>｜Box.net｜4Shared</li>
	<li><strong>利用条件：JRE（Java Runtime）のインストールが必要</strong></li>
	<li>バージョン：5.00.06</li>
</ul>
P.S. 使用する前に、パソコンに JRE をインストールしておいてください。インストールされていないと TinyUmbrella は使えません。また、当サイトの配布版は 5.00.06 です。ダウンロード後に問題が起きた場合は、公式サイトから最新版をダウンロードしてください。
<h2>TinyUmbrella の使い方</h2>
1. まず TinyUmbrella をダウンロードし、iOS デバイスをパソコンに接続してから、TinyUmbrella を起動します。いくつかメッセージが表示されますが、無視して「確定」（OK）ボタンを押せば大丈夫です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_155323.jpg"><img class="alignnone size-large wp-image-5490" title="2011-07-26_155323" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_155323-520x158.jpg" alt="" width="520" height="158" /></a>

2. 左側には、現在パソコンに接続されている iOS デバイスが一覧表示されます。SHSH をバックアップしたいデバイスを選択し、「Save SHSH」を押します。

P.S. 実は Connected Devices と Recent Devices に大きな違いはありません。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_155937.jpg"><img class="alignnone size-large wp-image-5492" title="2011-07-26_155937" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_155937-520x363.jpg" alt="" width="520" height="363" /></a>

3. 初期設定では、shsh ファイルは「C:Usersあなたのユーザー名.shsh」に保存されます。たとえば、私のパソコンのユーザー名は linroex なので、私の shsh は C:Userslinroex.shsh に保存されています。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_160216.jpg"><img class="alignnone size-large wp-image-5493" title="2011-07-26_160216" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_160216-520x393.jpg" alt="" width="520" height="393" /></a>

4. shsh の保存先を別のフォルダにしたい場合は、左側の「show All SHSHs」を押し、「Advanced」を選択します。「Save SHSH Directory」という項目があり、そこで保存先を設定できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_160540.jpg"><img class="alignnone size-large wp-image-5494" title="2011-07-26_160540" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-26_160540-520x363.jpg" alt="" width="520" height="363" /></a>

&nbsp;
