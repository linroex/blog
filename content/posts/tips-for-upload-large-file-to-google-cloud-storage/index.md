---
title: "Tips for Upload Large File to Google Cloud Storage"
date: 2016-12-04T10:00:49
slug: "tips-for-upload-large-file-to-google-cloud-storage"
tags: ["Google", "Google Cloud Platform", "GCP Storage"]
categories: []
---

因為我有定期備份資料的習慣，會把 Google、Facebook、Evernote、相簿等等資料都定期備份到 Google Cloud Storage 上面，每次用瀏覽器上傳都會很煩惱上傳速度慢的問題，而且如果網路斷線還要重新傳送那 10 GB 的大檔案，後來研究了官方文件，找到一些關於上傳大檔案到 Google Cloud Storage 時很好用的小技巧分享給大家。

包含：
<ul>
 	<li>如何讓 GCP Storage 幫你驗證檔案的 MD5 Checksum</li>
 	<li>如何啟動續傳功能，斷線沒關係可以繼續傳送</li>
 	<li>如何透過平行化傳輸把上傳速率榨到極限</li>
</ul>

<!--more-->


不過如果你要傳送超級大的資料，例如 10TB 之類的話，用網路傳輸可能還比實體傳輸慢，這時候建議你直接選用 Cloud Storage 提供的 <a href="https://cloud.google.com/storage/docs/offline-media-import-export">Offline Media Import / Export</a> 方案囉，就是一個跟 AWS S3 卡車類似的傢伙，但比較沒有那麼鋪張。

首先，不管你要做任何事情，先把 gsutil 安裝好，這是專屬 Google Cloud Storage 的 Command Line 工具，有很多神奇的小功能隱藏在裡面，是瀏覽器上傳完全無法比擬的神器！

安裝可以參考這篇官方文件的說明：<a href="https://cloud.google.com/sdk/docs/">Install the latest Cloud Tools version</a>

完成安裝後，可以在 Terminal 裡面輸入以下語法確認是否安裝、設定成功：
<pre>gsutil ls gs://{Your Bucket Name}</pre>
<h2>透過 gsutil 上傳檔案並支援續傳</h2>
當你使用 gsutil 上傳超過 8MB 的檔案時，無需任何參數，預設就支援續傳功能囉！ 如果上傳到一半網路斷線，這時候只要重新執行一樣的指令，他就會處理續傳囉。
<pre>gsutil cp -r src_url dest_url</pre>
如果要上傳資料夾，請加上 -r 參數

範例：
<pre>gsutil cp ~/Documents/facebook.zip gs://backup-bucket/2016-10-10

gsutil cp ~/Documents/*.zip gs://backup-bucket/2016-10-10

gsutil cp -r ~/Documents/ gs://backup-bucket/2016-10-10</pre>
此外，如果把 cp 的兩個路徑參數倒過來，就會變成下載哦

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午12.55.44.jpg"><img class="alignnone size-full wp-image-6986" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午12.55.44.jpg" alt="%e8%9e%a2%e5%b9%95%e5%bf%ab%e7%85%a7-2016-12-02-%e4%b8%8b%e5%8d%8812-55-44" width="922" height="586" /></a>

參考 <a href="https://cloud.google.com/storage/docs/gsutil/commands/cp">Google Cloud Storage Offical Docs - gsutil cp</a>
<h2>平行化榨乾上傳速度</h2>
首先，如果你要<strong>上傳很多檔案</strong>，注意不是一個大檔案哦，你可以在 gsutil 後面加上 -m 參數，gsutil 會用多個執行緒來上傳檔案，在多個小檔案的情況下會有很大的幫助

注意，是加在 gsutil 後面，不是 cp 後面哦！
<pre>gsutil -m cp Downloads/fb.zip gs://backup/2016-10-10</pre>
但如果你是一個大檔案要上傳，則可以使用 parallel_composite_upload_threshold 來把檔案切割上傳，例如 10GB 的檔案，使用以下語法上傳，則會分成十個檔案上傳，對於上傳速度在某種程度上也有幫助。
<pre>gsutil -o GSUtil:parallel_composite_upload_threshold=1000M cp ~/Downloads/all_accesslog gs://backup/</pre>
<h2>檔案完整性驗證</h2>
透過 MD5 可以幫你驗證你上傳到 GCP Storage 的檔案是否完整，在本機先計算好 Checksum，並且讓伺服器在收到檔案後也計算一次 Checksum，如果兩相比對一模一樣，代表檔案完整，可以避免你以為有備份，結果因為網路不穩定導致檔案少了一些內容無法還原的慘劇。

可以透過該指令來計算檔案的 Checksum (encode by base64)，注意若是透過 parallel_composite_upload_threshold 上傳檔案，只能使用 CRC32C Checksum。
<pre>gsutil hash ~/Downloads/apache.log</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.17.11.jpg"><img class="alignnone size-full wp-image-6987" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.17.11.jpg" alt="%e8%9e%a2%e5%b9%95%e5%bf%ab%e7%85%a7-2016-12-02-%e4%b8%8b%e5%8d%881-17-11" width="671" height="508" /></a>

計算完成後，在上傳檔案時可以透過如下語法附加你的 Checksum 到 header 一併上傳，待上傳完成後 GCP Storage 就會自動計算 Checksum 是否相符合。
<pre>gsutil -h Content-MD5:kClkmpnshA9eVrNlwIv82w== cp fb.zip gs://backup/</pre>
