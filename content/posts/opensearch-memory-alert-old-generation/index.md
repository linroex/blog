---
title: "OpenSearch Memory Alert 響了又恢復，是記憶體不夠嗎？"
date: 2026-10-19T22:19:33+08:00
slug: "opensearch-memory-alert-old-generation"
tags: ["OpenSearch", "JVM", "Prometheus"]
categories: ["SRE"]
summary: ""
draft: false
---

我負責管理近百個 OpenSearch Cluster，前陣子發現 Heap 的 Alert 響了，但不是每一個 Cluster 都響，只有其中幾個。這個 Alert 的條件是 Heap 使用率超過 75%。響的那幾個，過幾分鐘會自己恢復，然後又響。

一開始我很緊張，擔心是節點出了問題，所以先檢查 Cluster 有沒有異常：

- **Cluster 狀態**：是 Green，沒有 Unassigned Shard
- **寫入正常**：Fluentd 的 Buffer 沒有堆積，也沒有一直在 Retry
- **Pod 沒有被 OOM**：Restart 次數沒有增加，`Last State` 也不是 OOMKilled

三項都正常，我才打開 Heap 的 Metric 看。結果發現 Heap 使用率是一條「一直往上爬、掉下來、再往上爬」的鋸齒，警報響的時候剛好爬到高點，過幾分鐘掉下來就恢復了。

第一反應是把 75% 調高，但不是每個 Cluster 都響，似乎不只是閾值的問題。我更困惑的是：同樣是鋸齒，別的 Cluster 爬到 60% 就掉下來了，這個 Cluster 卻要爬到 80% 才掉。是它的設定跟別人不一樣嗎？還是它特別忙，記憶體給不夠？

要回答這些問題，得先搞懂 JVM 是怎麼回收記憶體的，特別是 Young GC。

<!--more-->

## 先認識 JVM 怎麼回收記憶體

Java 程式會不斷建立新物件，用完的物件不會馬上消失，要等 GC（垃圾回收）來清。所以 Heap 使用量會一直往上爬，直到 GC 回收才掉下來，這就是鋸齒的來源。

JVM 的 GC 建立在一個觀察上：**大部分物件很快就會死掉**。所以 Heap 分成兩個區域：

- **Young 區**：新物件出生的地方，裡面的物件大多很快就死掉
- **Old 區**：撐過幾次回收還活著的物件會被搬到這裡，通常會活很久

OpenSearch 在 JDK 11 以上預設使用的 GC 叫 G1，它的回收主要有兩種：

- **Young GC**：只清 Young 區。程式會短暫停住，但通常只有幾十毫秒，而且因為活著的物件少，幾乎隨時都在發生，頻繁發生沒關係
- **Full GC**：整個 Heap 一起清，程式會卡住好幾秒，嚴重時甚至更久。這段時間 Node 沒辦法回應 Cluster Manager 的健康檢查，如果卡得夠久（預設每次等 10 秒，連續 3 次沒回應），就會被踢出 Cluster，Shard 還得重新分配。這是真正要避免的事

G1 平常也會順手清一小部分 Old 區，但一次不會清乾淨。

## 為什麼每個 Cluster 的鋸齒高度不一樣

Young GC 是在 Young 區被填滿的時候才觸發的，所以鋸齒的頂點大約等於：

```
頂點 ≈ Old 區的用量 + Young 區的大小
```

而 Young 區多大，並不是固定的，是 G1 自己動態決定的。G1 有一個停頓時間目標（預設 200ms），它會預測這個 Cluster 回收一次要花多久，再挑一個回收完不會超過目標的 Young 區大小，預設範圍大約是整個 Heap 的 5% 到 60%。每個 Cluster 的負載不同，挑出來的大小也就不同。

舉個假設的例子：

| | Old 區 | Young 區 | 鋸齒頂點 |
|---|---|---|---|
| Cluster A | 20% | 40% | 60% |
| Cluster B | 20% | 60% | 80% |

兩個 Cluster 的 Old 區一樣，但 G1 替 B 挑的 Young 區比較大，所以 B 要爬到 80% 才會掉下來。B 並沒有比較糟，只是鋸齒比較高。

回答一開始的疑問：

- **設定跟別人不同嗎？** 不一定，Young 區的大小是 G1 自己調的，本來就會不一樣
- **特別忙嗎？** 忙碌會讓 Young 區更快被填滿，GC 更頻繁，鋸齒更密，但不一定更高
- **記憶體給不夠嗎？** 要看的不是鋸齒的高度，而是 GC 之後還剩多少

所以固定的 Heap% 閾值 Alert，本來就無法跨 Cluster 通用。近百個 Cluster 只有幾個會響，是因為只有正常鋸齒的頂點剛好超過 75% 的，才會中。

## 該看 Old 區 GC 後的低點

Young 區的大小會讓鋸齒忽高忽低，那就看不受它影響的部分：**Old 區**。它放的是長壽的物件，例如 Shard 的固定結構、Cluster State、Fielddata 和 Cache，用量不會因為 Young 區的大小而改變。

Old 區用量在 GC 清過之後的低點，最接近「真正還在被使用的記憶體有多少」。它不是精確值（G1 一次只清一部分 Old 區，低點會略高於實際用量），但足以當成跨 Cluster 比較的指標：如果連 Old 區的低點都長期很高，不管是真的用掉很多，還是 G1 來不及清，都代表這個節點快撐不住了。

用 `min_over_time` 取一段時間內 Old 區用量的最低值，再除以 Heap 上限：

```promql
min_over_time(opensearch_jvm_mem_pool_used_bytes{pool="old"}[15m])
  / on(cluster, node) opensearch_jvm_mem_heap_max_bytes
```

時間窗要比 G1 清一輪 Old 區的週期長，15 分鐘只是起始值，要依 Cluster 調整。我把警報起始值設在 0.80，並搭配 `for: 15m`。

## 結論

不要用整個 Heap 的閾值設定 Alert，而是用 Old 區的量。

- **整個 Heap**：鋸齒的頂點只代表 Young 區快被填滿，每個 Cluster 的高度本來就不同，固定的 Heap% 閾值無法跨 Cluster 通用
- **Old 區 GC 後的低點**：不受 Young 區大小影響，才能在不同的 Cluster 上用同一個閾值
