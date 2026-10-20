---
title: "iOS Packet Sniffer on macOS"
date: 2017-02-02T18:37:10
slug: "ios-packet-sniffer-on-macos"
tags: ["Packet Capture", "iOS", "macOS"]
categories: ["Security"]
---

在開發 iOS App 或做些見不得人的事情時，會需要攔截封包，在電腦上攔截封包首推 Wireshark ，但如果想在你的 iOS Device (iPhone、iPad) 上攔截封包呢？ 你可以架設 Proxy 讓 iOS Device 連上去，或是 JB 後在裝置內使用 tcpdump，但這兩個方式都太麻煩，這裡推薦使用 Xcode Command Line Tools 內的 rvictl 指令來處理，不用複雜的設定或 JB，只要一行指令，就可以在電腦上用任意軟體攔截封包。


<!--more-->


rvictl 會在電腦建立一張虛擬網卡，並讓 iOS 把所有的流量都透過傳輸線傳送到電腦上的網卡，rvictl 是 Apple 為了方便開發者所提供的指令，需要安裝 Xcode Command Line Tools 後才能使用。

使用前，需要先用傳輸線將手機和電腦連結起來，接著可以透過 Xcode 查詢裝置的 UUID，開啟 Xcode 後在最上排導覽列 「Windows」 裡面的「Devices」選項

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.29.30.jpg"><img class="alignnone size-full wp-image-7368" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.29.30.jpg" alt="" width="611" height="298" /></a>

選擇你要查詢 UUID 的裝置，其中的「Identifier」欄位就是 UUID，將其值複製下來

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/Devices.png"><img class="alignnone size-full wp-image-7369" src="{{< param imageBase >}}/wp-content/uploads/2017/02/Devices.png" alt="" width="809" height="619" /></a>

在 Terminal 輸入以下指令啟動 rvictl Service，啟動後手機的流量就會複製一份到電腦上
<pre>rvictl -s &lt;UUID&gt;</pre>
該指令進行的是「啟動」動作，所以輸入完不會停留在指令內。 接著就可以用 Wireshark 或其他封包攔截工具開工囉，預設應該是 rvi0 這張虛擬網卡，但一切還是以指令的回傳訊息回主。

使用完畢後，在拔掉傳輸線前，也別忘記輸入以下指令來關閉 rvictl Service。
<pre>rvictl -x &lt;UUID&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.35.37.jpg"><img class="alignnone size-full wp-image-7370" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-下午6.35.37.jpg" alt="" width="849" height="607" /></a>
