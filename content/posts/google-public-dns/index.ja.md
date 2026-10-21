---
title: "Googleに守ってもらう、ネットの安全対策 - Google Public DNS"
date: 2010-01-02T17:27:13
slug: "google-public-dns"
tags: ["Google", "DNS"]
categories: ["Web Apps"]
draft: false
---

<strong>Google Public DNS</strong>は、Googleが最近公開したサービスで、Googleが提供する無料のDNSを使ってネットに接続できます。Google Public DNSを使うメリットは、ネットをより安全に利用できることです。<span style="color: #0000ff;">また、接続速度も向上する可能性があります</span>。ちなみに、<a href="http://www.opendns.com/">openDNS</a>も DNSサービスを提供しており、なかなか良いものなので、ぜひ参考にしてみてください。さらに、<strong>Google Public DNS</strong>は、Google が提供するサービスの中でも、Webサイトにアクセスしなくても利用できる数少ないサービスの一つです（パソコンに直接設定するだけで使えます）。


<!--more-->


ただ、DNSが何かをよく知らない方も多いと思います。そこでまず、設定方法を紹介する前に、DNSの役割を説明しておきます。DNSはDomain Name Systemの略で、主な役割はWebサイトのアドレスをIPアドレスに変換することです。たとえば、私のブログ（https://coder.tw）を見たいとき、アドレスを直接入力しますよね。すると、DNSがそのアドレスをIPアドレスに変換して、接続を行います。私の説明はわかりにくいかもしれないので、このテーマについてはAvant Courierの記事も参考にしてください。従来、DNSの仕事は各ISP（インターネットサービスプロバイダー）が担当していました。ただ、ISPが悪意のあるサイトを必ず除外してくれるとは限りません。しかし<strong>Google Public DNS</strong>を使えば、アクセスするURLに問題がないかどうかを自動でチェックしてくれます。
<blockquote>以下は http://avantcourier.digili.net/?p=1055 からの引用です

たとえるなら、現実世界の建物にはすべてGPSの位置（北緯・東経何度など）があります。しかし、その数値は覚えにくいので、普段は「○○通り○○号○階」のような住所体系を使います。もちろん、このたとえは完全に正確ではありません。住所体系はGPSの数値を直接指すものではなく、両者は位置の示し方そのものが異なります。ここでは、人間のコミュニケーションや記憶のうえでの違いという点だけを比べています。</blockquote>
<h3>Google Public DNSのアドレス</h3>
<ol>
	<li>8.8.8.8</li>
	<li>8.8.4.4</li>
</ol>
<h3>Google Public DNSの使い方</h3>
Google Public DNSの使い方は、ほかの多くのGoogleサービスとは異なります。専用のWebページにアクセスする必要はなく、パソコン上で直接設定するだけです。ここではWindows Vistaを使って手順を解説します。ほかのOSを使っている方は、Googleが提供している<a href="http://code.google.com/intl/zh-TW/speed/public-dns/docs/using.html">簡単な手順</a>を参考にしてください。

1. 左下の【スタート】→【接続先】をクリック
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_170929.jpg"><img class="alignnone size-large wp-image-2420" title="2010-01-02_170929" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_170929-350x400.jpg" alt="" width="350" height="400" /></a>
2. 【ネットワークと共有センター（マイ ネットワーク）】を選択
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_171651.jpg"><img class="alignnone size-large wp-image-2422" title="2010-01-02_171651" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_171651-500x384.jpg" alt="" width="500" height="384" /></a>
3. 【ネットワーク接続の管理】をクリックし、【ローカル エリア接続】を右クリックして【プロパティ】を選択します（XPを使っている場合は、マイ ネットワークに入ってから、ローカル エリア接続を右クリックして【プロパティ】を選択します）
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172013.jpg"><img class="alignnone size-large wp-image-2423" title="2010-01-02_172013" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172013-500x383.jpg" alt="" width="500" height="383" /></a>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172029.jpg"><img class="alignnone size-large wp-image-2424" title="2010-01-02_172029" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172029-500x375.jpg" alt="" width="500" height="375" /></a>
4. 【IPv4】→【プロパティ】をクリック
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172318.jpg"><img class="alignnone size-large wp-image-2425" title="2010-01-02_172318" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172318-342x400.jpg" alt="" width="342" height="400" /></a>
5. 【次のDNSサーバーのアドレスを使う】を選択し、8.8.8.8 と 8.8.4.4 を入力してから【OK】をクリック
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172531.jpg"><img class="alignnone size-large wp-image-2426" title="2010-01-02_172531" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-02_172531-386x400.jpg" alt="" width="386" height="400" /></a>
6. 設定が終わったら再接続してください。設定が有効になります。
