---
title: "AI 模型沒換，怎麼突然變笨了？聊聊 OpenRouter 的供應商差異"
date: 2026-10-19T22:20:15+08:00
slug: "openrouter-ai-model-provider-differences"
tags: ["AI", "OpenRouter", "OpenCode"]
categories: ["AI"]
summary: ""
draft: false
---

最近在 OpenRouter 使用 DeepSeek V4.1 Flash，遇到一個蠻困擾的狀況：同一個模型，有時很聰明，有時卻笨得很明顯。笨的時候，連工具呼叫（tool call）的格式都會出錯，或是一直重複做同一件事，繞了半天還是沒有進展。模型名稱明明沒換，使用起來卻像換了一個人。這讓我注意到一個平常很容易忽略的地方：**除了選模型，實際上是哪一家供應商在跑這個模型，也會影響使用體驗。**

<!--more-->

OpenRouter 可以讓我們透過同一個入口使用不同模型，而同一個模型底下，又可能有好幾家供應商。每次選到同一個模型名稱，不代表每次都是同一家在提供服務。可以把它想成同一份食譜交給不同店家。食譜一樣，設備和做法卻可能不同。模型也是如此：有的會調整數值精度來節省資源，也就是「量化」；有的使用不同的推論引擎，也就是讓模型運作的軟體，再加上各家的設定，最後的回答和工具使用表現就可能有差異。

OpenRouter 自己也[記錄過同一模型在不同供應商之間的品質差異](https://openrouter.ai/blog/announcements/provider-variance-introducing-exacto/)，包括工具呼叫的表現。既然供應商會影響使用體驗，最直接的做法，就是把自己用起來穩定的供應商固定下來。最簡單的方式，是直接到 [OpenRouter 的 Privacy 設定](https://openrouter.ai/settings/privacy)，設定帳號允許使用的供應商，也就是白名單。這個設定會套用到整個帳號的 API 請求和聊天室；如果只是想避開某一家，也可以設定排除名單。如果自己串接 API，也能在請求裡加入這段：

```json
{
  "provider": {
    "only": ["<provider slug>"]
  }
}
```

把 `<provider slug>` 換成 OpenRouter 使用的供應商識別名稱，請求就只會交給清單內的供應商。這裡要用的是 `only`；`order` 只是優先順序，單獨設定它，仍可能在失敗後改走其他家。詳細選項可以看 [OpenRouter 的路由文件](https://openrouter.ai/docs/guides/routing/provider-selection)。如果你跟我一樣是透過工具使用模型，也可以在工具裡設定。以 OpenCode 為例，在 `opencode.json` 裡，針對 OpenRouter 的模型加入以下設定：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "openrouter": {
      "models": {
        "<OpenRouter model ID>": {
          "options": {
            "provider": {
              "only": ["<provider slug>"],
              "allow_fallbacks": false
            }
          }
        }
      }
    }
  }
}
```

將 `<OpenRouter model ID>` 換成模型頁上的完整 ID，`<provider slug>` 換成要使用的供應商識別名稱；尖括號也要一起替換。如果原本已有設定檔，把這段合併進去即可。OpenCode 的這層設定方式可以參考[官方文件](https://opencode.ai/docs/providers/#openrouter)。

`only` 負責限制供應商，`allow_fallbacks: false` 則關閉備援切換。只填一家時，就是固定使用那一家。代價也很直接：那家暫時無法服務，請求就可能失敗。另外，帳號白名單和這裡的設定會同時生效，指定的供應商也必須在帳號允許的範圍內。

以前選模型，我比較在意的是模型本身夠不夠聰明。這次的經驗讓我發現，**模型名稱之外，供應商也值得一起選。** 尤其是要讓 AI 自己操作工具、連續完成任務時，能不能穩定把事情做完，真的差很多。
