---
draft: true
title: 出門在外也想用本機 MCP？用 FastMCP 把 stdio 轉成 HTTP（以 Bear 為例）
date: 2026-10-25T22:29:09+08:00
slug: fastmcp-stdio-to-http-mcp
tags:
  - MCP
  - FastMCP
  - Bear
  - Python
categories:
  - Programming
summary: Bear 這類只有 stdio 的本機 MCP，出門用手機或網頁版 Claude、ChatGPT 就用不了？用 FastMCP 轉成
  HTTP，手機和網頁版也能用。
---

我平常筆記用 Bear，待辦用 Things，兩個在 Mac 上都有 MCP 可以接，在 Claude Desktop 裡叫 AI 幫我查筆記、整理待辦用得很順，但只要人在外面，拿手機或用網頁版 Claude、ChatGPT，這些工具就全部消失了，研究後才發現問題出在 MCP 的「連線方式」，這篇就來講為什麼會這樣，以及怎麼用 FastMCP 把只能在本機用的 MCP 轉成到處都能用的版本。

<!--more-->

## 為什麼網頁版叫不動你電腦裡的 MCP？

先用一個比喻：MCP 就像住在你電腦裡的管家，專門幫 AI 去 Bear、Things 拿東西，管家只住在你家，只有在你家裡的人叫得動他。

桌面版的 Claude 也裝在你的電腦上，等於跟管家住在同一個屋簷下，直接當面交代就好，所以叫得動。

網頁版和手機就比較容易讓人誤會，畫面明明在你眼前，瀏覽器也是開在你自己的電腦或手機上，看起來好像也在你家，但其實瀏覽器只是一扇窗戶，你從窗戶看到的是畫面，真正在思考、在做事的是廠商機房裡的電腦，當 AI 需要用工具時，是機房那邊的電腦出門去找管家，不是你的瀏覽器去找，而你家的管家沒有手機，機房當然聯絡不到他。

（圖 1：誰在找管家 —— 左邊是你家的 Mac 和 Bear 管家，管家身上沒有手機；右邊是廠商機房的 AI；中間是你的瀏覽器，只是一扇窗戶；機房伸向管家的箭頭被打叉）

## 兩種 MCP 的差別

MCP 其實有兩種連線方式：

- **本機型**（技術上叫 stdio）：管家住在你家，只有同一台電腦上的 App 叫得動他
- **網路型**（技術上叫 HTTP）：管家有一支手機，手機號碼就是一個網址，任何地方的服務都能打給他

| | 本機型（stdio） | 網路型（HTTP） |
|---|---|---|
| 住哪 | 你的電腦裡 | 一個網址後面 |
| 誰叫得動 | 同一台電腦上的 App | 任何連得到網址的服務 |
| 網頁版、手機 | 不行 | 可以 |

（圖 2：兩種管家 —— 左格本機型，電腦框裡有 App 和管家，沒有對外連線；右格網路型，管家手上多一支手機，標示「網址」，外面的機房有箭頭連進來）

## 該選哪一種？

**想讓 MCP 到處都能用：無腦選網路型就對了**，網頁版、手機、別台電腦都可以直接用。

**在意隱私：選本機型**，管家沒有手機，外人就聯絡不到他，只有碰得到那台電腦的人才能用。

**共用帳號：不適合網路型**，網路型的 MCP 是掛在帳號上的，只要共用這個帳號的人都能用，而且管家也分不出是誰在叫他，這種情況比較適合用本機型搭配桌面版（例如 Claude Desktop），設定存在每個人自己的電腦上，互不影響。

簡單記：到處用選網路型、重隱私選本機型、共用帳號也選本機型。

## 為什麼需要「轉接」

問題是很多 MCP 其實只有本機型，就算是 App 官方自己做的也一樣，像 Bear 2.8 推出的 bearcli、Xcode 26.3 內建的 `xcrun mcpbridge`、1Password 桌面版內建的 MCP 都是走 stdio，Obsidian 雖然沒有官方的 MCP，但社群做的版本也多半預設是 stdio。

會設計成只有本機型，其實很合理，這些 App 的資料本來就在你的電腦上，本機型不用開網路、不用設密碼，也只有你自己的電腦叫得動，對 App 開發者來說最簡單也最安全，要不要給管家一支手機，就交給使用者自己決定。

所以如果想在網頁版用，就得自己給管家一支手機，這支手機就是這篇要裝的 FastMCP：外面打進來的電話由它接起來，轉告管家，管家做完事，再透過它回話。

（圖 3：轉接架構 —— 由左到右：網頁版 AI（機房）→ 網路 → 手機（FastMCP）→ 管家（Bear MCP）→ Bear；手機、管家、Bear 三者框起來標示「你的 Mac」；機房到手機的箭頭標「網路型」，手機到管家的箭頭標「本機型」）

當然，如果你只在桌面版用，那就不需要轉，直接用本機型就好。

## 實作：用 FastMCP 轉接 bearcli

市面上有一些專門做轉接的工具，不過我本來就在用 Python，[FastMCP](https://gofastmcp.com/) 本身就有內建 proxy 功能，不用多裝一個獨立的工具，寫幾行 Python 就能搞定。

### 準備環境

Bear 2.8 之後，bearcli 就直接包在 App 裡面，路徑是：

<pre><code>/Applications/Bear.app/Contents/MacOS/bearcli</code></pre>

可以先在 Terminal 跑一下確認 MCP server 能啟動（會停在那邊等輸入，按 Ctrl+C 離開就好）：

<pre><code>/Applications/Bear.app/Contents/MacOS/bearcli mcp-server</code></pre>

接著用 uv 建一個小專案，裝 FastMCP：

<pre><code>uv init bear-http
cd bear-http
uv add "fastmcp>=3,<4"</code></pre>

uv 會產生 `uv.lock`，把實際安裝的版本鎖住，之後在別台機器重建環境也會是同一個版本。

### 轉接程式

新增 `proxy.py`：

<pre><code>from fastmcp.server import create_proxy

config = {
    "mcpServers": {
        "bear": {
            "command": "/Applications/Bear.app/Contents/MacOS/bearcli",
            "args": ["mcp-server"],
        }
    }
}

proxy = create_proxy(config, name="bear-http")

if __name__ == "__main__":
    proxy.run(transport="http", host="127.0.0.1", port=8000)</code></pre>

逐行說明一下：

- `config` 的格式和 Claude Desktop 的 `claude_desktop_config.json` 一樣，`command` 是要啟動的程式，`args` 是參數，等於告訴 FastMCP「管家是誰、怎麼叫醒他」
- `create_proxy()` 會建立一個 MCP server，它自己沒有任何工具，收到請求時就去啟動 bearcli 並把請求轉過去，再把結果傳回來
- `proxy.run(transport="http", ...)` 就是把手機開機，用網路型的方式對外提供服務，網址會是 `http://127.0.0.1:8000/mcp`

啟動：

<pre><code>uv run proxy.py</code></pre>

如果你用的是 FastMCP 2.x，函式名稱不一樣，要改成 `from fastmcp import FastMCP` 再用 `FastMCP.as_proxy(config, name="bear-http")`，其他寫法都差不多，以你安裝的版本文件為準。

### 測試

另外開一個 Terminal，用 FastMCP 自己的 client 寫個小腳本 `check.py`，看看工具有沒有出現：

<pre><code>import asyncio
from fastmcp import Client

async def main():
    async with Client("http://127.0.0.1:8000/mcp") as client:
        tools = await client.list_tools()
        for tool in tools:
            print(tool.name)

asyncio.run(main())</code></pre>

<pre><code>uv run check.py</code></pre>

有印出 Bear 的工具名稱（列出、搜尋、讀取筆記之類），就代表轉接成功了。

### 幾個小細節

- **先只讓自己的電腦打得進來**：程式裡的 `127.0.0.1` 意思是「這台電腦自己」，也就是手機只接這台電腦打來的電話，外面的人打不進來，很適合先測試，網路上很多範例會寫成 `0.0.0.0`，那代表同一個網路裡（例如同一個 Wi-Fi）的任何人都能打進來，測試階段先不要這樣做
- **套到其他 MCP**：Things 或其他本機型 MCP 也是一樣的做法，只要換掉 `command` 和 `args`，也可以在 `mcpServers` 裡同時放好幾個，用同一個網址一起提供

## 結語與提醒

轉接是為了讓 MCP 到處都能用，但不是每個情境都該轉，要到處用就選網路型，在意隱私或共用帳號就選本機型，兩者之間只要給管家一支手機就能互通。

最後提醒兩件事，這篇沒有展開，但真的要出門用之前一定要處理：

1. **Mac 要保持開機、不睡眠、有網路**：手機和管家都在你的 Mac 上，Mac 睡著了，電話就沒人接
2. **網址要公開，而且一定要加認證**：網頁版的 AI 是從廠商的機房打過來的，上面那種只接這台電腦來電的設定，或是只有家裡 Wi-Fi 才連得到的網址，機房都打不進來，所以最後一定得給它一個公開的網址，但手機號碼一公開就得加密碼，不然等於把你的筆記開放給全世界讀寫

認證和公開網址的部署方式，之後有機會再另外寫一篇。
