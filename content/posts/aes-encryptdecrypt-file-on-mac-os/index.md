---
title: "AES Encrypt/Decrypt File on Mac OS"
date: 2016-12-28T14:06:30
slug: "aes-encryptdecrypt-file-on-mac-os"
tags: ["Mac OS", "OpenSSL", "AES", "Encrypto"]
categories: []
---

當你要透過 Facebook、Email 傳送機密性較高的資料時，例如 Google API Token、公司年度帳務等資料時，你真的信任這些網路服務嗎？就我來說我是不信任的，因為有太多的可能性，從被駭客攻擊到該公司內控不佳導致員工可以檢視客戶資料，種種的可能性讓我其實不太敢把機密資料放在網際網路上傳送，但現在這時代，不透過 Email、Facebook Messenger 這些網路服務傳送資料幾乎不可能，這時候你可以選擇使用 AES 把檔案加密，並透過你信任的管道把密碼告知對方，例如電話、實體溝通等等，或最起碼透過不同管道傳送密碼來降低被一網打盡的風險。


<!--more-->


其實在 Linux、Mac OS 底下，可以透過 openssl 快速地處理 AES 加解密的需求，通常作業系統都會內建 openssl 可以直接使用，如果對於指令不熟悉也可以到使用 MacPaw 所開發的 <a href="https://itunes.apple.com/us/app/encrypto-encrypt-files-you/id935235287">Encrypto</a> App 來進行 AES 加解密的操作，雖然沒有 Open Source，但它是由 MacPaw 所開發的應該還算能夠信任。
<h2>AES 加密檔案</h2>
<pre>openssl enc -aes-256-cbc -salt -in file.txt -out file.enc</pre>
<h2>AES 解密檔案</h2>
<pre>openssl enc -d -aes-256-cbc -in file.enc -out file.txt</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-28-下午2.05.55.jpg"><img class="alignnone size-large wp-image-7167" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-28-下午2.05.55-1024x522.jpg" alt="" width="660" height="336" /></a>

如果希望加密檔案後用 base64 的方式輸出而非二進位檔，可以加上 -a 參數，反之解密亦同：
<pre>openssl enc -aes-256-cbc -salt <strong><span style="color: #ff0000;">-a</span></strong> -in file.txt -out file.enc

openssl enc -d -aes-256-cbc <strong><span style="color: #ff0000;">-a</span></strong> -in file.enc -out file.txt</pre>
在加密指令輸入完畢後， openssl 會請你輸入密碼兩次（密碼、相同密碼確認）作為檔案加密使用，解密時也會出現密碼輸入區塊。

不熟悉指令的話，在 Mac OS 上個人推薦 <a href="https://itunes.apple.com/us/app/encrypto-encrypt-files-you/id935235287">Encrytpo</a> App ，可以直接去 Mac App Store 下載使用，把檔案拖曳進去即可加密、解密，十分簡易，介面設計也十分漂亮。雖然 Encrypto 也是用 AES 256 進行加密，但看起來它有它的專屬格式，所以使用 Encrypto 加密的話，收到檔案的人也需要使用相同 App 才能解密（也有 Windows App），針對它的格式我尚未詳細研究。

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/aes.gif"><img class="size-full wp-image-7166 aligncenter" src="{{< param imageBase >}}/wp-content/uploads/2016/12/aes.gif" alt="" width="420" height="526" /></a>
