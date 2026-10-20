---
title: "OpenSearch Memory Alert Fires, Then Recovers: Is It Really Out of Memory?"
date: 2026-10-19T22:19:33+08:00
slug: "opensearch-memory-alert-old-generation"
tags: ["OpenSearch", "JVM", "Prometheus"]
categories: ["SRE"]
summary: ""
draft: false
---

I manage close to a hundred OpenSearch clusters. A while ago, the heap alert started firing, but only on a few clusters, not all of them. The alert fires when heap usage goes above 75%. On those few clusters, it would recover by itself a few minutes later, and then fire again.

At first I was worried that a node was in trouble, so I checked the cluster for problems:

- **Cluster status**: Green, no unassigned shards
- **Writes are healthy**: Fluentd's buffer was not piling up and it was not retrying constantly
- **No OOM kills**: the pod restart count did not increase, and `Last State` was not OOMKilled

All three were fine, so I opened the heap metric. Heap usage was a sawtooth: it kept climbing, dropped, then climbed again. The alert fired right when it reached the peak, and recovered a few minutes later when it dropped.

My first thought was to raise the 75% threshold. But since not every cluster fired, it did not look like a threshold problem alone. What confused me more: the other clusters had the same sawtooth, but they dropped at around 60%, while this one climbed to 80% before dropping. Was its configuration different? Was it busier and short on memory?

To answer these questions, I first had to understand how the JVM reclaims memory, especially Young GC.

<!--more-->

## How the JVM reclaims memory

A Java program keeps creating new objects. Objects that are no longer used do not disappear right away; they stay until GC (garbage collection) cleans them up. So heap usage keeps climbing until GC runs and it drops. That is where the sawtooth comes from.

JVM garbage collection is built on one observation: **most objects die young**. So the heap is split into two areas:

- **Young generation**: where new objects are born. Most of them die quickly
- **Old generation**: objects that survive several collections are moved here, and they usually live for a long time

On JDK 11 and later, OpenSearch uses the G1 collector by default. It has two main kinds of collection:

- **Young GC**: cleans only the young generation. The program pauses briefly, usually for tens of milliseconds. Because few objects are still alive, it happens almost all the time, and frequent Young GC is fine
- **Full GC**: cleans the whole heap. The program freezes for several seconds, or longer in bad cases. During that time the node cannot answer the cluster manager's health checks. If the freeze lasts long enough (by default, 10 seconds per check and 3 missed checks in a row), the node is removed from the cluster and its shards must be reallocated. This is what you really want to avoid

G1 also cleans a small part of the old generation as it goes, but it does not clean all of it at once.

## Why each cluster's sawtooth has a different height

Young GC is triggered when the young generation is full, so the peak of the sawtooth is roughly:

```
peak ≈ old generation usage + young generation size
```

The size of the young generation is not fixed. G1 decides it dynamically. G1 has a pause time goal (200 ms by default). It predicts how long a collection will take on this cluster, then picks a young generation size that keeps the pause under the goal. By default this size ranges from about 5% to 60% of the whole heap. Each cluster has a different load, so G1 picks a different size for each one.

A hypothetical example:

| | Old gen | Young gen | Sawtooth peak |
|---|---|---|---|
| Cluster A | 20% | 40% | 60% |
| Cluster B | 20% | 60% | 80% |

Both clusters use the same amount of old generation, but G1 picked a larger young generation for B, so B climbs to 80% before it drops. B is not in worse shape. Its sawtooth is just taller.

Back to the questions from the beginning:

- **Is the configuration different?** Not necessarily. G1 tunes the young generation size itself, so it is expected to differ
- **Is it busier?** A busier cluster fills the young generation faster, so GC runs more often and the sawtooth is denser, but not necessarily taller
- **Is it short on memory?** Do not look at the height of the sawtooth. Look at how much memory remains after GC

So a fixed heap% threshold can never work the same way across clusters. Only a few of the hundred clusters fired because only those whose normal sawtooth peak happened to go above 75% were caught.

## Watch the low point of the old generation after GC

The young generation size makes the sawtooth go up and down, so look at the part it does not affect: **the old generation**. It holds long-lived objects, such as shard structures, the cluster state, fielddata, and caches. Its usage does not change with the young generation size.

The low point of old generation usage after GC is the closest thing to "how much memory is really in use." It is not exact (G1 only cleans part of the old generation at a time, so the low point is a bit higher than real usage), but it is good enough to compare across clusters. If even the old generation low point stays high for a long time, the node is close to its limit, whether it really uses that much or G1 cannot keep up.

Use `min_over_time` to get the lowest old generation usage over a time window, then divide by the heap limit:

```promql
min_over_time(opensearch_jvm_mem_pool_used_bytes{pool="old"}[15m])
  / on(cluster, node) opensearch_jvm_mem_heap_max_bytes
```

The time window must be longer than the time G1 takes to clean the old generation once. 15 minutes is only a starting point; adjust it for each cluster. I set the alert threshold to 0.80 as a starting value, with `for: 15m`.

## Conclusion

Do not alert on the whole heap. Alert on the old generation.

- **Whole heap**: the peak of the sawtooth only means the young generation is almost full. Every cluster peaks at a different height, so a fixed heap% threshold cannot work across clusters
- **Old generation low point after GC**: not affected by the young generation size, so one threshold works across different clusters
