---
title: "How to use Python GroupBy Data (List+Dict)"
date: 2016-12-07T01:13:27
slug: "how-to-use-python-groupby-data-listdict"
tags: ["Python"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
---

用 Python 處理資料時，對資料的某個 Key 進行 GroupBy 是很常見的需求，例如分析 Email Log 時，想知道某個標題的發送統計數，或是列出每個標題的 Email Provider 前五名之類，就會需要對標題進行 GroupBy 的動作，在資料庫裡這是十分簡單的事情，但如果你不想丟資料庫的話呢？

除了 Pandas 這套超強的資料處理函式庫可以幫你之外，其實 Python 本身也有 GroupBy 可以使用哦！


<!--more-->


在 itertools module 裡面有 groupby 這個 method，你可以丟一個 Collection 類別的東西進去並指定 key 之後，他會把同一個 key 的資料整理成一個類似 List 的東西（但其實不是 List 哦），之後看你是要計算數量（相同標題 Email 發送數量），還是分別列出這些相同 Key 的資料（TOP 5 Email Provider By Subject）都可以。

不過在做 GroupBy 之前要先對資料進行排序，以你要處理的 Key 來排序。詳細做法就看下面的程式碼吧！（Python 3） 這邊有透過 lambda 來取得要當 Key 的欄位。
<pre><span style="font-family: Courier;">from itertools import groupby</span>

<span style="font-family: Courier;">dicts = [</span>
<span style="font-family: Courier;"> {'name': 'A', 'age': 16},</span>
<span style="font-family: Courier;"> {'name': 'B', 'age': 18},</span>
<span style="font-family: Courier;"> {'name': 'C', 'age': 17},</span>
<span style="font-family: Courier;"> {'name': 'D', 'age': 16},</span>
<span style="font-family: Courier;"> {'name': 'E', 'age': 17}</span>
<span style="font-family: Courier;">]</span>

<span style="font-family: Courier;">dicts.sort(key=lambda d : d['age'])</span>

<span style="font-family: Courier;"># Group By Age Field</span>
<span style="font-family: Courier;">for key, groups in groupby(dicts, lambda d : d['age']):</span>
<span style="font-family: Courier;"> # print(list(groups))</span>
<span style="font-family: Courier;"> # print(len(list(groups)))</span>
<span style="font-family: Courier;"> print(key)</span>

<span style="font-family: Courier;"> for item in groups:</span>
<span style="font-family: Courier;">   print(item)</span>
<span style="font-family: Courier;"> print('-----')</span></pre>
<div></div>
