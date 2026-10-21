---
title: "macOS で AES を使ってファイルを暗号化・復号する"
date: 2016-12-28T14:06:30
slug: "aes-encryptdecrypt-file-on-mac-os"
tags: ["AES", "macOS"]
categories: ["Security"]
draft: false
---

Facebook やメールで機密性の高いデータを送るとき、たとえば Google API のトークンや会社の年度決算などを送るとき、あなたは本当にそのネットサービスを信頼していますか？ 私は信頼していません。ハッキングから、会社の内部統制が甘く社員が顧客データを閲覧できてしまうことまで、可能性はたくさんあるからです。そのため、機密データをインターネット上で送ることには抵抗があります。しかし今の時代、メールや Facebook Messenger などのサービスを使わずにデータを送るのはほぼ不可能です。そこで、AES でファイルを暗号化し、電話や対面など信頼できる方法で相手にパスワードを伝えるのがおすすめです。少なくとも、ファイルとは別の経路でパスワードを送れば、すべてが一度に漏れるリスクを下げられます。


<!--more-->


Linux や Mac OS では、openssl を使えば AES の暗号化・復号を素早く行えます。通常、OS には openssl が標準で入っているので、そのまま使えます。コマンドに慣れていない場合は、MacPaw が開発した <a href="https://itunes.apple.com/us/app/encrypto-encrypt-files-you/id935235287">Encrypto</a> アプリを使い、GUI で AES の暗号化・復号を行うこともできます。オープンソースではありませんが、MacPaw が開発しているので、ある程度は信頼できると思います。
<h2>AES でファイルを暗号化</h2>
<pre>openssl enc -aes-256-cbc -salt -in file.txt -out file.enc</pre>
<h2>AES でファイルを復号</h2>
<pre>openssl enc -d -aes-256-cbc -in file.enc -out file.txt</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-28-下午2.05.55.jpg"><img class="alignnone size-large wp-image-7167" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-28-下午2.05.55-1024x522.jpg" alt="" width="660" height="336" /></a>

暗号化したファイルをバイナリではなく base64 で出力したい場合は、-a オプションを追加します。復号のときも同じです。
<pre>openssl enc -aes-256-cbc -salt <strong><span style="color: #ff0000;">-a</span></strong> -in file.txt -out file.enc

openssl enc -d -aes-256-cbc <strong><span style="color: #ff0000;">-a</span></strong> -in file.enc -out file.txt</pre>
暗号化コマンドを入力すると、openssl からパスワードの入力を二回求められます（パスワードと、確認のためのもう一度の入力）。これがファイルの暗号化に使われます。復号のときにもパスワードの入力欄が表示されます。

コマンドに慣れていない場合は、Mac OS では個人的に <a href="https://itunes.apple.com/us/app/encrypto-encrypt-files-you/id935235287">Encrypto</a> アプリをおすすめします。Mac App Store から直接ダウンロードでき、ファイルをドラッグするだけで暗号化・復号ができてとても簡単です。インターフェースのデザインも美しいです。Encrypto も AES 256 を使っていますが、独自の形式を持っているようです。そのため、Encrypto で暗号化したファイルは、受け取る側も同じアプリがないと復号できません（Windows 版もあります）。その形式についてはまだ詳しく調べていません。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/aes.gif"><img class="size-full wp-image-7166 aligncenter" src="{{< param imageBase >}}/wp-content/uploads/2016/12/aes.gif" alt="" width="420" height="526" /></a>
