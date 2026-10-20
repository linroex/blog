---
title: "手機不在家，也能用 Xcode 遠端佈署 iOS App"
date: 2026-10-20T07:59:50+08:00
slug: "ios-remote-deploy-over-wireguard"
tags: ["iOS", "Xcode", "WireGuard", "RouterOS"]
categories: ["AI"]
summary: ""
draft: false
---

現在是 AI 時代，大家都在外面用 AI 遙控家裡的電腦寫程式。寫 web 很方便，電腦接個 Tailscale 或 WireGuard，人在外面也能直接開網頁 debug。但 App 就不行了：上架要等好幾天，走 TestFlight 也要半小時才能裝到手機上測，AI 寫得再快也卡在這裡。

<!--more-->

所以我跟 AI 討論了一下，怎麼做到人在外面，手上只有一台效能很弱的筆電，甚至只有手機，也能遙控家裡的 Mac 開發，改完馬上佈署到手機上測試，甚至直接 debug。這篇就是討論出來的做法：讓 Xcode 在手機只能透過 VPN 連回來的時候，一樣能 build、安裝、啟動 App。

> **前提**
> - 手機**必須連著 Wi-Fi**，不能只用行動網路：手機上負責接受遠端佈署的背景服務，只有連上 Wi-Fi 才會啟動
> - 手機的 WireGuard 連回家裡的路由器
> - 路由器能新增一個區網 IP（LAN IP）和一條位址轉送規則（下面以 MikroTik RouterOS 為例）
> - 我的測試環境是 Xcode 27.1、iOS 27（需要 `devicectl`）；不一定要這麼新，但較舊的版本我沒試過

## 原理
Xcode 是靠聽手機在區網裡廣播的「我在這裡」（Bonjour）來找到它的。這種廣播只在同一個區網內傳遞，不會被路由器或 VPN 轉到別的網路。所以手機在別處的 Wi-Fi 時，它的廣播只留在那個區網，Mac 聽不到，Xcode 就以為它不見了。

問題不在 VPN 擋住連線，連線本身走 VPN 是通的，缺的是「找到手機」這一步。

解法：手機不在家時，Mac 自己宣告「手機在 `<橋接IP>`」（一個你區網內的 IP），路由器再把送到 `<橋接IP>` 的連線轉進 VPN。

```
Xcode ──► <橋接IP>:49152 ──► 路由器（轉送）──► WireGuard ──► 手機
           ▲ Mac 上的腳本宣告「手機在這裡」
```

三個零件：路由器的轉送規則、Mac 上的常駐腳本，以及手機在家時記下的配對資訊（腳本自動記）。

## 步驟 0：先在家配對一次

手機接線或連同一個 Wi-Fi，配對並開啟開發者模式，確認：

```sh
xcrun devicectl list devices   # 要看到 available (paired)
```

遠端佈署是借用這個配對，沒配對過就無法橋接。

## 步驟 1：路由器

選一個區網內沒被分配出去的 IP 當 `<橋接IP>`，在路由器上執行：

```routeros
/ip address add address=<橋接IP>/32 interface=bridge comment=iphone-bridge
/ip firewall nat add chain=dstnat dst-address=<橋接IP> action=dst-nat \
    to-addresses=<手機的 WireGuard IP> comment=iphone-bridge
```

- 第一行讓路由器「擁有」這個 IP，Mac 才找得到它。
- 第二行把送到 `<橋接IP>` 的連線，轉給手機在 WireGuard 裡的 IP。這個 IP 看手機上 WireGuard 隧道設定的 Addresses 欄位（例如 `10.0.0.2`，不含 `/32` 之類的後綴）。它不是 `<橋接IP>`，也不是手機在家時拿到的區網 IP。

測試：手機連著 Wi-Fi、開著 WireGuard，在 Mac 上執行

```sh
nc -z -G 3 <橋接IP> 49152 && echo OK
```

出現 OK 代表路由器、VPN、手機都通了。不通就先檢查手機的 Wi-Fi 和 WireGuard 有沒有連著。

## 步驟 2：Mac 上的腳本

建立資料夾 `~/.iphone-bridge/`，放兩個檔案。

`config.json`：

```json
{
  "bridge_ip": "<橋接IP>",
  "bridge_host": "bridge.local",
  "phone_host": "<手機名稱>.local",
  "interface": "en0",
  "port": 49152,
  "interval": 30,
  "records": {}
}
```

- `phone_host`：手機在區網的名稱。手機在家時執行 `dns-sd -B _remotepairing._tcp local.` 找到記錄名稱，再用 `dns-sd -L <記錄名稱> _remotepairing._tcp local.`，輸出裡 `reached at` 後面、port 前面的就是。
- `interface`：Mac 連區網的網卡，Wi-Fi 通常是 `en0`。
- `bridge_host`：隨便取。
- `records`：留空，手機在家時腳本會自己填。裡面是配對資訊，請 `chmod 600 config.json`，不要放進 git 或同步資料夾。

`advertise.py`：

- 每 30 秒檢查手機在不在區網。
- 在家：記下手機目前的配對資訊（它的記錄名稱會一直換，所以保留最新 4 筆）。
- 不在家（連續兩次沒看到才算）：用記下的資訊，在 Mac 上宣告「手機在 `<橋接IP>`」。
- 不在家時順便測 `<橋接IP>` 通不通，狀態改變才寫 log。

```python
#!/usr/bin/env python3
"""手機在區網時記下它的配對記錄；不在時，在 Mac 上假裝它還在，指向路由器的橋接 IP。"""
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
KEEP = 4  # 最多保留、廣播幾筆（手機的記錄名稱會一直換）


def log(*a):
    print(time.strftime("%F %T"), *a, flush=True)


def dns_sd(args, secs):
    """dns-sd 不會自己結束：跑幾秒，收輸出。"""
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
    """手機名稱解得出區網 IP，而且配對 port 真的連得上（快取的記錄不可信）。"""
    host = c["phone_host"].rstrip(".").lower() + "."
    for line in dns_sd(["-G", "v4", c["phone_host"]], 2).splitlines():
        f = line.split()  # 時間 Add flags 介面 主機 IP TTL
        if (len(f) >= 6 and f[1] == "Add" and f[4].lower() == host
                and f[5] != c["bridge_ip"] and reachable(f[5], c["port"])):
            return True
    return False


def collect(c):
    """把手機目前的真實記錄併進 config，只留最新 KEEP 筆。"""
    host = c["phone_host"].rstrip(".") + "."
    names = set(re.findall(rf"\sAdd\s.*{SVC}\.\s+(\S+)", dns_sd(["-B", SVC, "local."], 3)))
    records = dict(c["records"])
    for n in sorted(names):
        out = dns_sd(["-L", n, SVC, "local."], 2)
        m = re.search(r"reached at .*\n\s*(identifier=.*)", out)
        if f"reached at {host}" in out and m:  # 排除區網裡別的 Apple 裝置
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
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))  # 讓 finally 撤掉假記錄
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
                misses += 1  # 連續兩次沒看到才算不在，避免偶發誤判
                if misses >= 2 and c["records"] and not (procs and all(p.poll() is None for p in procs)):
                    withdraw(procs)
                    procs = advertise(c)
                    log("phone is away, adverts up ->", c["bridge_ip"])
                if procs:
                    ok = reachable(c["bridge_ip"], c["port"])
                    if ok != route_ok:  # 只在狀態改變時記一筆
                        log("bridge IP reachable (phone answers via VPN)" if ok else "bridge IP unreachable: check the router rules and the phone's WireGuard")
                        route_ok = ok
            time.sleep(c["interval"])
    finally:
        withdraw(procs)


if __name__ == "__main__":
    main()
```

## 步驟 3：讓它常駐

`~/Library/LaunchAgents/com.example.iphone-bridge.plist`（把「你的帳號」換掉）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key><string>com.example.iphone-bridge</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>/Users/你的帳號/.iphone-bridge/advertise.py</string>
    </array>
    <key>RunAtLoad</key><true/>
    <key>KeepAlive</key><true/>
    <key>ThrottleInterval</key><integer>30</integer>
    <key>StandardOutPath</key><string>/Users/你的帳號/.iphone-bridge/advertise.log</string>
    <key>StandardErrorPath</key><string>/Users/你的帳號/.iphone-bridge/advertise.log</string>
</dict>
</plist>
```

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.example.iphone-bridge.plist
```

launchd 載入後就不會再讀 plist。如果之後改了它，要先卸載再重新載入才會生效：

```sh
launchctl bootout gui/$(id -u)/com.example.iphone-bridge
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.example.iphone-bridge.plist
```

## 步驟 4：驗證與佈署

1. 手機先在家連著 Wi-Fi，等 1～2 分鐘，確認 `config.json` 的 `records` 被填進東西。
2. 手機移到別處，連上 Wi-Fi、開著 WireGuard。約一分鐘後，`advertise.log` 會出現：

   ```
   phone is away, adverts up -> <橋接IP>
   bridge IP reachable (phone answers via VPN)
   ```

3. 確認真的連得到手機：執行下面的指令，它會向手機詢問目前的鎖定狀態，連不到就會報錯；成功會印出 `Current device lock state:` 和 `passcodeRequired`、`unlockedSinceBoot` 等幾行。不要用 `devicectl list devices` 當證據，它可能顯示快取的狀態，連不上也看得到 available：

   ```sh
   UDID=<你的裝置 UDID>
   xcrun devicectl device info lockState --device $UDID
   ```

4. 佈署：

   ```sh
   xcodebuild -project MyApp.xcodeproj -scheme MyApp -configuration Debug \
     -destination "id=$UDID" -derivedDataPath /tmp/dd \
     -allowProvisioningUpdates build
   
   xcrun devicectl device install app --device $UDID \
     /tmp/dd/Build/Products/Debug-iphoneos/MyApp.app
   
   xcrun devicectl device process launch --device $UDID com.example.myapp
   ```

安裝是覆蓋更新，App 裡的資料會保留。

## 限制

- 要先在家配對過；這個方法只是讓既有的配對在 VPN 下找得到手機。
- 手機要一直連著 Wi-Fi 和 WireGuard，任何一個斷了就連不上。
- 用 Tailscale 代替 WireGuard 應該也行，我沒試過。
