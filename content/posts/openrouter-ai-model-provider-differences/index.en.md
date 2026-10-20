---
title: "Same AI Model, Suddenly Dumber? Provider Differences on OpenRouter"
date: 2026-10-19T22:20:15+08:00
slug: "openrouter-ai-model-provider-differences"
tags: ["OpenRouter", "OpenCode"]
categories: ["AI"]
summary: ""
draft: true
---

I recently used DeepSeek V4.1 Flash on OpenRouter and ran into a frustrating problem: the same model was sometimes smart and sometimes clearly dumb. When it was dumb, it even got the tool call format wrong, or kept repeating the same step without making progress. The model name never changed, yet it felt like a different model. This made me notice something that is easy to overlook: **besides choosing a model, which provider actually runs the model also affects the experience.**

<!--more-->

OpenRouter lets you use different models through one entry point, and a single model can be served by several providers. Choosing the same model name does not mean the same provider serves every request. Think of it as giving the same recipe to different restaurants. The recipe is the same, but the equipment and methods may differ. Models are the same: some providers lower numeric precision to save resources, which is called "quantization"; some use a different inference engine, the software that runs the model; and each provider has its own settings. In the end, answers and tool use can differ.

OpenRouter has also [documented quality differences for the same model across providers](https://openrouter.ai/blog/announcements/provider-variance-introducing-exacto/), including tool call performance. Since the provider affects the experience, the most direct fix is to lock in the providers that work well for you. The simplest way is the [OpenRouter Privacy settings](https://openrouter.ai/settings/privacy), where you set the providers your account may use, that is, an allowlist. This setting applies to all API requests and the chat room on your account. If you only want to avoid one provider, you can set an ignore list instead. If you call the API yourself, you can also add this to the request:

```json
{
  "provider": {
    "only": ["<provider slug>"]
  }
}
```

Replace `<provider slug>` with the provider identifier that OpenRouter uses, and the request will only go to the providers in the list. Use `only` here; `order` only sets priority, and if you set it alone, the request can still go to another provider after a failure. See the [OpenRouter routing docs](https://openrouter.ai/docs/guides/routing/provider-selection) for details. If, like me, you use models through a tool, you can also set this in the tool. For OpenCode, add the following settings for the OpenRouter model in `opencode.json`:

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

Replace `<OpenRouter model ID>` with the full ID from the model page, and `<provider slug>` with the identifier of the provider you want; replace the angle brackets too. If you already have a config file, merge this section into it. See the [official docs](https://opencode.ai/docs/providers/#openrouter) for this OpenCode setting.

`only` restricts the providers, and `allow_fallbacks: false` turns off fallback. With only one provider listed, you always use that provider. The cost is just as direct: if that provider is temporarily unavailable, the request may fail. Also, the account allowlist and this setting apply at the same time, so the provider you choose must also be allowed on your account.

When I chose models before, I mostly cared whether the model itself was smart enough. This experience showed me that **besides the model name, the provider is worth choosing too.** Especially when you let an AI operate tools and complete tasks step by step, whether it can reliably finish the job makes a big difference.
