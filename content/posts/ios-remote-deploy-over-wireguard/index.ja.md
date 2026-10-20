---
title: "iPhone が家になくても Xcode から iOS アプリをリモートデプロイする"
date: 2026-10-20T07:59:50+08:00
slug: "ios-remote-deploy-over-wireguard"
tags: ["iOS", "Xcode", "WireGuard"]
categories: ["Programming"]
summary: ""
draft: false
---

AI の時代になり、外出先から AI に家のパソコンを操作させてコードを書くのが当たり前になりました。Web 開発なら簡単で、パソコンを Tailscale や WireGuard につないでおけば、外からでもそのままページを開いてデバッグできます。しかしアプリはそうはいきません。App Store の審査には数日かかり、TestFlight でもスマホにインストールしてテストできるまで 30 分ほどかかります。AI がどれだけ速くコードを書いても、ここで止まってしまいます。

<!--more-->

そこで AI と相談して、外出先で性能の低いノートパソコン、あるいはスマホしか手元になくても、家の Mac を遠隔操作して開発し、修正したらすぐスマホにデプロイしてテスト、さらには直接デバッグまでできる方法を考えました。この記事はその結果です。スマホが VPN 経由でしか家に戻れない状態でも、Xcode でビルド、インストール、アプリの起動ができるようにします。

> **前提**
> - スマホは **Wi-Fi に接続している必要があります**。モバイル通信だけでは不可です。リモートデプロイを受け付けるスマホ側のバックグラウンドサービスは、Wi-Fi 接続時にしか起動しません
> - スマホの WireGuard が家のルーターに接続している
> - ルーターで LAN の IP アドレスとアドレス転送ルールを 1 つ追加できる（以下は MikroTik RouterOS の例）
> - 私のテスト環境は Xcode 27.1、iOS 27 です（`devicectl` が必要）。ここまで新しくなくてもよいかもしれませんが、古いバージョンは試していません

## しくみ
Xcode は、スマホが LAN 内に流す「ここにいるよ」という告知（Bonjour）を聞いてスマホを見つけます。この告知は同じ LAN の中でしか届かず、ルーターや VPN がほかのネットワークに転送することはありません。そのため、スマホが別の場所の Wi-Fi にいると、告知はそのネットワークに留まり、Mac には聞こえず、Xcode はスマホが消えたと判断します。

問題は VPN が接続を遮断していることではありません。接続自体は VPN 経由で通ります。足りないのは「スマホを見つける」ステップです。

解決策：スマホが家にいないときは、Mac 自身が「スマホは `<ブリッジIP>` にいる」（LAN 内の IP）と告知し、ルーターが `<ブリッジIP>` への接続を VPN に転送します。

```
Xcode ──► <ブリッジIP>:49152 ──► ルーター（転送）──► WireGuard ──► スマホ
           ▲ Mac 上のスクリプトが「スマホはここ」と告知
```

部品は 3 つです。ルーターの転送ルール、Mac 上で常駐するスクリプト、そしてスマホが家にいるときに記録したペアリング情報（スクリプトが自動で記録）です。

## ステップ 0：まず家で一度ペアリングする

スマホをケーブルでつなぐか同じ Wi-Fi に接続し、ペアリングして開発者モードを有効にしたら、次を確認します。

```sh
xcrun devicectl list devices   # available (paired) と表示されること
```

リモートデプロイはこのペアリングを借りて行います。ペアリングしていないとブリッジできません。

## ステップ 1：ルーター

LAN 内でまだ割り当てられていない IP を `<ブリッジIP>` として選び、ルーターで次を実行します。

```routeros
/ip address add address=<ブリッジIP>/32 interface=bridge comment=iphone-bridge
/ip firewall nat add chain=dstnat dst-address=<ブリッジIP> action=dst-nat \
    to-addresses=<スマホの WireGuard IP> comment=iphone-bridge
```

- 1 行目でルーターがこの IP を「持つ」ようにし、Mac から見つけられるようにします。
- 2 行目で `<ブリッジIP>` 宛ての接続を、WireGuard 内のスマホの IP に転送します。この IP は、スマホの WireGuard トンネル設定の Addresses 欄で確認できます（例：`10.0.0.2`。`/32` などの接尾辞は含めません）。`<ブリッジIP>` でも、スマホが家で取得する LAN の IP でもありません。

テスト：スマホを Wi-Fi に接続し WireGuard をオンにした状態で、Mac で次を実行します。

```sh
nc -z -G 3 <ブリッジIP> 49152 && echo OK
```

OK と表示されれば、ルーター、VPN、スマホがすべてつながっています。つながらない場合は、まずスマホの Wi-Fi と WireGuard が接続されているか確認してください。

## ステップ 2：Mac 上のスクリプト

フォルダ `~/.iphone-bridge/` を作り、2 つのファイルを置きます。

`config.json`：

```json
{
  "bridge_ip": "<ブリッジIP>",
  "bridge_host": "bridge.local",
  "phone_host": "<スマホの名前>.local",
  "interface": "en0",
  "port": 49152,
  "interval": 30,
  "records": {}
}
```

- `phone_host`：LAN 上でのスマホの名前。スマホが家にいるときに `dns-sd -B _remotepairing._tcp local.` でレコード名を見つけ、`dns-sd -L <レコード名> _remotepairing._tcp local.` を実行します。出力の `reached at` の後ろ、ポートの前の部分がそれです。
- `interface`：Mac が LAN に接続しているネットワークインターフェース。Wi-Fi なら通常 `en0` です。
- `bridge_host`：好きな名前で構いません。
- `records`：空のままにします。スマホが家にいるときにスクリプトが自動で埋めます。中身はペアリング情報なので、`chmod 600 config.json` を実行し、git や同期フォルダには入れないでください。

`advertise.py`：

- 30 秒ごとにスマホが LAN にいるかを確認します。
- 家にいるとき：スマホの現在のペアリング情報を記録します（レコード名は変わり続けるので、最新の 4 件を残します）。
- 家にいないとき（2 回連続で見えなかった場合のみ）：記録した情報を使い、Mac 上で「スマホは `<ブリッジIP>` にいる」と告知します。
- 家にいない間は `<ブリッジIP>` に到達できるかも確認し、状態が変わったときだけログを書きます。

```python
#!/usr/bin/env python3
"""スマホが LAN にいるときはペアリングレコードを記録し、いないときは Mac 上でまだいるふりをして、ルーターのブリッジ IP を指す。"""
import json
import os
import re
import signal
import socket
import subprocess
import sys
import time

CFG = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config.json")
SVC = "_remotepairing._tcp"
KEEP = 4  # 保持・告知するレコードの最大数（スマホのレコード名は変わり続ける）


def log(*a):
    print(time.strftime("%F %T"), *a, flush=True)


def dns_sd(args, secs):
    """dns-sd は自分では終了しない：数秒動かして出力を集める。"""
    p = subprocess.Popen(["dns-sd", *args], stdout=subprocess.PIPE,
                         stderr=subprocess.DEVNULL, text=True)
    time.sleep(secs)
    p.terminate()
    return p.communicate()[0]


def reachable(ip, port):
    try:
        socket.create_connection((ip, port), timeout=2).close()
        return True
    except OSError:
        return False


def phone_home(c):
    """スマホの名前が LAN の IP に解決でき、ペアリングのポートに実際に接続できる（キャッシュされたレコードは信用できない）。"""
    host = c["phone_host"].rstrip(".").lower() + "."
    for line in dns_sd(["-G", "v4", c["phone_host"]], 2).splitlines():
        f = line.split()  # 時刻 Add フラグ インターフェース ホスト IP TTL
        if (len(f) >= 6 and f[1] == "Add" and f[4].lower() == host
                and f[5] != c["bridge_ip"] and reachable(f[5], c["port"])):
            return True
    return False


def collect(c):
    """スマホの現在の実レコードを config にマージし、最新の KEEP 件だけ残す。"""
    host = c["phone_host"].rstrip(".") + "."
    names = set(re.findall(rf"\sAdd\s.*{SVC}\.\s+(\S+)", dns_sd(["-B", SVC, "local."], 3)))
    records = dict(c["records"])
    for n in sorted(names):
        out = dns_sd(["-L", n, SVC, "local."], 2)
        m = re.search(r"reached at .*\n\s*(identifier=.*)", out)
        if f"reached at {host}" in out and m:  # LAN 内のほかの Apple デバイスを除外
            txt = m.group(1).split()
            ident = txt[0].split("=", 1)[1]
            records.pop(ident, None)
            records[ident] = txt
    records = dict(list(records.items())[-KEEP:])
    if list(records.items()) != list(c["records"].items()):
        c["records"] = records
        with open(CFG, "w") as f:
            json.dump(c, f, indent=2)


def advertise(c):
    return [subprocess.Popen(
        ["dns-sd", "-i", c["interface"], "-P", "bridge-" + ident[:8], SVC, "local.",
         str(c["port"]), c["bridge_host"], c["bridge_ip"], *txt],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for ident, txt in c["records"].items()]


def withdraw(procs):
    for p in procs:
        p.terminate()
    for p in procs:
        p.wait()


def main():
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))  # finally で偽のレコードを取り下げるため
    procs, misses, route_ok = [], 0, None
    try:
        while True:
            c = json.load(open(CFG))
            if phone_home(c):
                misses, route_ok = 0, None
                if procs:
                    withdraw(procs)
                    procs = []
                    log("phone is home, adverts withdrawn")
                collect(c)
            else:
                misses += 1  # 2 回連続で見えなかったときだけ不在と判断し、誤判定を避ける
                if misses >= 2 and c["records"] and not (procs and all(p.poll() is None for p in procs)):
                    withdraw(procs)
                    procs = advertise(c)
                    log("phone is away, adverts up ->", c["bridge_ip"])
                if procs:
                    ok = reachable(c["bridge_ip"], c["port"])
                    if ok != route_ok:  # 状態が変わったときだけ記録
                        log("bridge IP reachable (phone answers via VPN)" if ok else "bridge IP unreachable: check the router rules and the phone's WireGuard")
                        route_ok = ok
            time.sleep(c["interval"])
    finally:
        withdraw(procs)


if __name__ == "__main__":
    main()
```

## ステップ 3：常駐させる

`~/Library/LaunchAgents/com.example.iphone-bridge.plist`（「あなたのユーザー名」を置き換えてください）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key><string>com.example.iphone-bridge</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>/Users/あなたのユーザー名/.iphone-bridge/advertise.py</string>
    </array>
    <key>RunAtLoad</key><true/>
    <key>KeepAlive</key><true/>
    <key>ThrottleInterval</key><integer>30</integer>
    <key>StandardOutPath</key><string>/Users/あなたのユーザー名/.iphone-bridge/advertise.log</string>
    <key>StandardErrorPath</key><string>/Users/あなたのユーザー名/.iphone-bridge/advertise.log</string>
</dict>
</plist>
```

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.example.iphone-bridge.plist
```

launchd は一度読み込むと plist を読み直しません。後で変更した場合は、いったんアンロードしてから再読み込みすると反映されます。

```sh
launchctl bootout gui/$(id -u)/com.example.iphone-bridge
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.example.iphone-bridge.plist
```

## ステップ 4：確認とデプロイ

1. まずスマホを家で Wi-Fi に接続したまま 1～2 分待ち、`config.json` の `records` に内容が入ったことを確認します。
2. スマホを別の場所に移し、Wi-Fi に接続して WireGuard をオンにします。1 分ほどで `advertise.log` に次のように表示されます。

   ```
   phone is away, adverts up -> <ブリッジIP>
   bridge IP reachable (phone answers via VPN)
   ```

3. 本当にスマホにつながるか確認します。次のコマンドはスマホに現在のロック状態を問い合わせ、つながらなければエラーになります。成功すると `Current device lock state:` と `passcodeRequired`、`unlockedSinceBoot` などの行が表示されます。`devicectl list devices` は証拠に使わないでください。キャッシュされた状態を表示することがあり、つながらなくても available と表示されることがあります。

   ```sh
   UDID=<あなたのデバイスの UDID>
   xcrun devicectl device info lockState --device $UDID
   ```

4. デプロイ：

   ```sh
   xcodebuild -project MyApp.xcodeproj -scheme MyApp -configuration Debug \
     -destination "id=$UDID" -derivedDataPath /tmp/dd \
     -allowProvisioningUpdates build
   
   xcrun devicectl device install app --device $UDID \
     /tmp/dd/Build/Products/Debug-iphoneos/MyApp.app
   
   xcrun devicectl device process launch --device $UDID com.example.myapp
   ```

インストールは上書き更新なので、アプリ内のデータは保持されます。

## 制限

- 先に家でペアリングしておく必要があります。この方法は、既存のペアリングで VPN 越しにスマホを見つけられるようにするだけです。
- スマホは Wi-Fi と WireGuard の両方に接続し続ける必要があり、どちらかが切れると接続できません。
- WireGuard の代わりに Tailscale を使っても動くはずですが、試していません。
