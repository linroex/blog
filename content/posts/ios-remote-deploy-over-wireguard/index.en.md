---
title: "Deploy an iOS App from Xcode Even When Your iPhone Is Away from Home"
date: 2026-10-20T07:59:50+08:00
slug: "ios-remote-deploy-over-wireguard"
tags: ["iOS", "Xcode", "WireGuard"]
categories: ["Programming"]
summary: ""
draft: false
---

In the age of AI, many of us control our home computers remotely and let AI write code while we are out. Web development is easy: connect the computer to Tailscale or WireGuard, and you can open the page and debug from anywhere. Apps are different. App Store review takes days, and even TestFlight takes about half an hour before you can install a build on your phone. No matter how fast AI writes code, you get stuck here.

<!--more-->

So I worked with AI on a way to develop on my Mac at home while I am out, with only a weak laptop or even just my phone, and deploy to the phone right after each change to test it, or even debug it directly. This post is the result: a setup that lets Xcode build, install, and launch an app on an iPhone that can only reach home through a VPN.

> **Requirements**
> - The phone **must be on Wi-Fi**, not only cellular: the background service on the phone that accepts remote deployments only starts when it is on Wi-Fi
> - The phone's WireGuard connects back to your home router
> - The router can add a LAN IP and an address forwarding rule (the example below uses MikroTik RouterOS)
> - I tested with Xcode 27.1 and iOS 27 (`devicectl` is required). Older versions may work, but I have not tried them

## How it works
Xcode finds the phone by listening for its "I'm here" broadcasts (Bonjour) on the local network. These broadcasts only travel within the same LAN; routers and VPNs do not forward them to other networks. So when the phone is on Wi-Fi somewhere else, its broadcasts stay on that network, the Mac never hears them, and Xcode thinks the phone is gone.

The VPN is not blocking the connection. The connection itself works over the VPN. What is missing is the "find the phone" step.

The fix: when the phone is away, the Mac announces "the phone is at `<bridge IP>`" (an IP on your LAN), and the router forwards connections to `<bridge IP>` into the VPN.

```
Xcode ──► <bridge IP>:49152 ──► router (forward) ──► WireGuard ──► phone
           ▲ a script on the Mac announces "the phone is here"
```

Three parts: a forwarding rule on the router, a background script on the Mac, and the pairing records captured while the phone is at home (the script records them automatically).

## Step 0: Pair once at home

Connect the phone with a cable or put it on the same Wi-Fi, pair it, turn on Developer Mode, and check:

```sh
xcrun devicectl list devices   # should show available (paired)
```

Remote deployment reuses this pairing. Without it, the bridge cannot work.

## Step 1: Router

Pick an unassigned IP on your LAN as `<bridge IP>` and run on the router:

```routeros
/ip address add address=<bridge IP>/32 interface=bridge comment=iphone-bridge
/ip firewall nat add chain=dstnat dst-address=<bridge IP> action=dst-nat \
    to-addresses=<phone's WireGuard IP> comment=iphone-bridge
```

- The first line makes the router "own" this IP, so the Mac can reach it.
- The second line forwards connections for `<bridge IP>` to the phone's IP inside WireGuard. You can find this IP in the Addresses field of the WireGuard tunnel settings on the phone (for example `10.0.0.2`, without a suffix such as `/32`). It is not `<bridge IP>`, and it is not the LAN IP the phone gets at home.

Test: with the phone on Wi-Fi and WireGuard on, run this on the Mac:

```sh
nc -z -G 3 <bridge IP> 49152 && echo OK
```

If you see OK, the router, VPN, and phone are all connected. If not, first check that the phone's Wi-Fi and WireGuard are connected.

## Step 2: Script on the Mac

Create the folder `~/.iphone-bridge/` with two files.

`config.json`:

```json
{
  "bridge_ip": "<bridge IP>",
  "bridge_host": "bridge.local",
  "phone_host": "<phone name>.local",
  "interface": "en0",
  "port": 49152,
  "interval": 30,
  "records": {}
}
```

- `phone_host`: the phone's name on the LAN. While the phone is at home, run `dns-sd -B _remotepairing._tcp local.` to find the record name, then run `dns-sd -L <record name> _remotepairing._tcp local.`. The host name is the part after `reached at` and before the port.
- `interface`: the network interface the Mac uses for the LAN. Wi-Fi is usually `en0`.
- `bridge_host`: any name you like.
- `records`: leave empty. The script fills it in while the phone is at home. It contains pairing information, so run `chmod 600 config.json` and keep it out of git and synced folders.

`advertise.py`:

- Checks every 30 seconds whether the phone is on the LAN.
- At home: saves the phone's current pairing records (the record names keep changing, so it keeps the latest 4).
- Away (only after missing it twice in a row): uses the saved records to announce on the Mac that "the phone is at `<bridge IP>`".
- While away, it also checks whether `<bridge IP>` is reachable, and only logs when the state changes.

```python
#!/usr/bin/env python3
"""Save the phone's pairing records while it is on the LAN; when it is away, pretend on the Mac that it is still here, pointing to the router's bridge IP."""
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
KEEP = 4  # max records to keep and advertise (the phone's record names keep changing)


def log(*a):
    print(time.strftime("%F %T"), *a, flush=True)


def dns_sd(args, secs):
    """dns-sd never exits on its own: run it for a few seconds and collect the output."""
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
    """The phone name resolves to a LAN IP and the pairing port really connects (cached records cannot be trusted)."""
    host = c["phone_host"].rstrip(".").lower() + "."
    for line in dns_sd(["-G", "v4", c["phone_host"]], 2).splitlines():
        f = line.split()  # time Add flags interface host IP TTL
        if (len(f) >= 6 and f[1] == "Add" and f[4].lower() == host
                and f[5] != c["bridge_ip"] and reachable(f[5], c["port"])):
            return True
    return False


def collect(c):
    """Merge the phone's current real records into config, keeping only the latest KEEP."""
    host = c["phone_host"].rstrip(".") + "."
    names = set(re.findall(rf"\sAdd\s.*{SVC}\.\s+(\S+)", dns_sd(["-B", SVC, "local."], 3)))
    records = dict(c["records"])
    for n in sorted(names):
        out = dns_sd(["-L", n, SVC, "local."], 2)
        m = re.search(r"reached at .*\n\s*(identifier=.*)", out)
        if f"reached at {host}" in out and m:  # skip other Apple devices on the LAN
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
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(0))  # let finally withdraw the fake records
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
                misses += 1  # only count as away after two misses in a row, to avoid false alarms
                if misses >= 2 and c["records"] and not (procs and all(p.poll() is None for p in procs)):
                    withdraw(procs)
                    procs = advertise(c)
                    log("phone is away, adverts up ->", c["bridge_ip"])
                if procs:
                    ok = reachable(c["bridge_ip"], c["port"])
                    if ok != route_ok:  # only log when the state changes
                        log("bridge IP reachable (phone answers via VPN)" if ok else "bridge IP unreachable: check the router rules and the phone's WireGuard")
                        route_ok = ok
            time.sleep(c["interval"])
    finally:
        withdraw(procs)


if __name__ == "__main__":
    main()
```

## Step 3: Keep it running

`~/Library/LaunchAgents/com.example.iphone-bridge.plist` (replace `your-user`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key><string>com.example.iphone-bridge</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>/Users/your-user/.iphone-bridge/advertise.py</string>
    </array>
    <key>RunAtLoad</key><true/>
    <key>KeepAlive</key><true/>
    <key>ThrottleInterval</key><integer>30</integer>
    <key>StandardOutPath</key><string>/Users/your-user/.iphone-bridge/advertise.log</string>
    <key>StandardErrorPath</key><string>/Users/your-user/.iphone-bridge/advertise.log</string>
</dict>
</plist>
```

```sh
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.example.iphone-bridge.plist
```

Once loaded, launchd does not read the plist again. If you change it later, unload and reload it for the change to take effect:

```sh
launchctl bootout gui/$(id -u)/com.example.iphone-bridge
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.example.iphone-bridge.plist
```

## Step 4: Verify and deploy

1. Keep the phone at home on Wi-Fi for 1 to 2 minutes, and check that `records` in `config.json` has been filled in.
2. Take the phone somewhere else, connect to Wi-Fi, and turn on WireGuard. After about a minute, `advertise.log` shows:

   ```
   phone is away, adverts up -> <bridge IP>
   bridge IP reachable (phone answers via VPN)
   ```

3. Confirm you can really reach the phone. The command below asks the phone for its current lock state and fails if it cannot connect. On success it prints `Current device lock state:` followed by lines such as `passcodeRequired` and `unlockedSinceBoot`. Do not use `devicectl list devices` as proof; it may show a cached state and list the phone as available even when it cannot connect:

   ```sh
   UDID=<your device UDID>
   xcrun devicectl device info lockState --device $UDID
   ```

4. Deploy:

   ```sh
   xcodebuild -project MyApp.xcodeproj -scheme MyApp -configuration Debug \
     -destination "id=$UDID" -derivedDataPath /tmp/dd \
     -allowProvisioningUpdates build
   
   xcrun devicectl device install app --device $UDID \
     /tmp/dd/Build/Products/Debug-iphoneos/MyApp.app
   
   xcrun devicectl device process launch --device $UDID com.example.myapp
   ```

Installing updates the existing app, so the app's data is kept.

## Limitations

- You must pair at home first. This method only lets an existing pairing find the phone over the VPN.
- The phone must stay connected to both Wi-Fi and WireGuard. If either drops, the connection fails.
- Tailscale should work instead of WireGuard, but I have not tried it.
