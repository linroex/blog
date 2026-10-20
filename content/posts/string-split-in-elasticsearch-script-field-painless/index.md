---
title: "String Split in Elasticsearch Script Field (Painless)"
date: 2016-12-14T01:29:14
slug: "string-split-in-elasticsearch-script-field-painless"
tags: ["Elasticsearch"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-1.png"]
---

看到這篇文章，相信你一定尋找怎麼在 Elasticsearch （或是 Kibana）的 Script Field 使用 Split 很久了吧！ 這邊我可是特意把所有你會想到的關鍵字都用上了，就是為了讓跟我一樣苦命的工程師不要浪費太多人生在這件事情上...

很快的先講結論，雖然 Painless 號稱支援 Java Native API，但恰恰有幾個不支援，其中一個就是 split，據說是因為 Elasticsearch 開發團隊覺得 split 時間複雜度太差，所以把它割掉了，而我一開始不知道這件事情，嘗試了各種方式，從語法是否正確一路懷疑到是否需要寫什麼特殊的語法來 Import Java API，最後在 Elasticsearch 的 Issue 上看到這篇 【<a href="https://github.com/elastic/elasticsearch/issues/20952">Painless - Request for native String split function</a>】，當下我的心情......


<!--more-->


這個 Issue 從 2015 年提出，到現在 2016 年都快過完啦！！ 在官方推出 String.split 之前，你可以選擇用 Regex 正規表達式來處理，或是 String.indexOf() 加上 String.substring() 來處理，我因為是要分析 Email 的服務提供商，所以用 indexOf() 找到 @ 的位置後直接裁切即可。

此外要注意哦，如果是要做字串相關的處理，你應該取 keyword 欄位，或是 not_analyzed 的欄位，否則 Elasticsearch 會幫你做分詞，可以看以下範例是針對 Email 欄位去拆解，取得 Service provider 的做法：
<pre>def email = doc['msg.email.keyword'].value;
def domain = email.substring(email.indexOf('@'));

return domain;</pre>
