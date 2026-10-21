---
title: "BigQuery Federated Google Sheets Table Access Denied Error"
date: 2017-09-14T21:45:47
slug: "bigquery-federate-google-sheet-table-occur-access-denied-error"
tags: ["BigQuery", "Google"]
categories: ["Programming"]
draft: false
---

BigQuery lets you link a table to a Google Sheet stored in Google Drive, so the table updates right away whenever the Google Sheet changes. When you use this kind of federated table, some people run into an Access Denied error. Queries in the WebUI work fine, but when you query the table with the bq command line tool, you get the following error message:
<blockquote>Access Denied: BigQuery
BigQuery: No OAuth token with Google Drive scope was found</blockquote>

<!--more-->


The first time I ran into this, I looked for answers. Many people said it happens because you don't have Google Drive permission, so the bq command fails. Logging in with the following command is supposed to fix it:
<pre>gcloud auth login --enable-gdrive-access</pre>
If only it were that simple. I tried this command at the time, but it still failed. I was busy, so I filed it under "bug" and let it go. Recently I couldn't stand it anymore. This feature should be very common, and there's no reason it should have been broken for so long! I spent a lot of time researching and trying things, and I tried every kind of permission setting, but all of them failed. Then, finally, an idea hit me...

"Could it be that the old config files were never cleared out?"

Yes, that's exactly what it was. Follow along with me: delete the ~/.config/gcloud folder, run the gcloud auth login command again, and then query the federated table with the bq command. You'll see that it works (tears)
<pre>rm ~/.config/gcloud
gcloud auth login --enable-gdrive-access</pre>
