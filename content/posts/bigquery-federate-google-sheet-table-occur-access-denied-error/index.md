---
title: "BigQuery Federate Google Sheet Table Occur Access Denied Error"
date: 2017-09-14T21:45:47
slug: "bigquery-federate-google-sheet-table-occur-access-denied-error"
tags: ["BigQuery", "Google"]
categories: ["Programming"]
---

BigQuery 可以讓你把資料表和 Google Drive 的 Google Sheet 連結在一起，當 Google Sheet 有修改時資料表會立刻跟著修改，在使用這種 Federate Table 時有些人可能會遇到 Access Denied 的問題，當你在 WebUI 上查詢時沒有問題，但如果用 Command Lin Tool 的 bq 來查詢，會出現以下錯誤訊息：
<blockquote>Access Denied: BigQuery
BigQuery: No OAuth token with Google Drive scope was found</blockquote>

<!--more-->


之前遇到時有查過資料，許多人都說這是因為沒有拿到 Google Drive 的權限，所以在 bq cmd 會查詢失敗，只要用下面的指令登入就可以解決：
<pre>gcloud auth login --enable-gdrive-access</pre>
事情如果這麼簡單就好了，當時試過這指令但依舊失敗，後來因為忙碌就將他歸類為 Bug，直到最近實在無法忍受，況且這功能應該很常用，沒理由壞這麼久阿！！！ 花了不少時間研究、嘗試，試了各種權限設定都失敗，直到最後我靈機一動...

「該不會是舊的設定檔沒清掉吧」

對，就是這麼回事，請跟著我一起把 ~/.config/gcloud 這個資料夾刪掉，並重新執行一次 gcloud auth login 指令，接著用 bq 指令去查詢 Federate Table，你會發現，成功了（淚
<pre>rm ~/.config/gcloud
gcloud auth login --enable-gdrive-access</pre>
