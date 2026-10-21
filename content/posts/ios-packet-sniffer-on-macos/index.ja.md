---
title: "macOS で iOS のパケットをキャプチャする"
date: 2017-02-02T18:37:10
slug: "ios-packet-sniffer-on-macos"
tags: ["Packet Capture", "iOS", "macOS"]
categories: ["Security"]
draft: false
---

iOS アプリを開発するときや、人に見せられないことをするときには、パケットをキャプチャする必要が出てきます。コンピューターでパケットをキャプチャするなら、まず Wireshark がおすすめです。では、iOS デバイス（iPhone、iPad）でパケットをキャプチャしたい場合はどうすればよいでしょうか？ プロキシを立てて iOS デバイスをそこに接続させる方法や、脱獄して端末内で tcpdump を使う方法もあります。しかし、どちらの方法も面倒すぎます。ここでは、Xcode Command Line Tools に含まれる rvictl コマンドの利用をおすすめします。複雑な設定も脱獄も不要で、1 行のコマンドだけで、コンピューター上の好きなソフトウェアを使ってパケットをキャプチャできます。


<!--more-->


rvictl はコンピューター上に仮想ネットワークインターフェースを作成し、iOS のすべてのトラフィックをケーブル経由でコンピューターのネットワークインターフェースへ送らせます。rvictl は Apple が開発者の利便性のために提供しているコマンドで、使うには Xcode Command Line Tools のインストールが必要です。

使う前に、まずケーブルでスマートフォンとコンピューターを接続してください。その後、Xcode でデバイスの UUID を確認できます。Xcode を開き、上部のメニューバーから「Window」を選び、「Devices」オプションを選択してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.29.30.jpg"><img class="alignnone size-full wp-image-7368" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.29.30.jpg" alt="" width="611" height="298" /></a>

UUID を確認したいデバイスを選択します。「Identifier」欄が UUID なので、その値をコピーしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/Devices.png"><img class="alignnone size-full wp-image-7369" src="{{< param imageBase >}}/wp-content/uploads/2017/02/Devices.png" alt="" width="809" height="619" /></a>

Terminal で次のコマンドを入力して、rvictl サービスを起動します。起動すると、スマートフォンのトラフィックのコピーがコンピューターに送られるようになります。
<pre>rvictl -s &lt;UUID&gt;</pre>
このコマンドは「起動」の操作なので、入力するとそのままコマンドラインに戻ります。その後は Wireshark など別のパケットキャプチャツールを使えます。デフォルトでは rvi0 という仮想ネットワークインターフェースが使われるはずですが、最終的にはコマンドの出力メッセージが基準になります。

使い終わったら、ケーブルを抜く前に、次のコマンドを入力して rvictl サービスを停止するのを忘れないでください。
<pre>rvictl -x &lt;UUID&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.35.37.jpg"><img class="alignnone size-full wp-image-7370" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.35.37.jpg" alt="" width="849" height="607" /></a>
