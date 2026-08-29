---
title: "Generate Large File on Linux/macOS"
date: 2017-01-27T23:59:59
slug: "generate-large-file-on-linuxmacos"
tags: ["Linux"]
categories: []
---

有時候為了測試網路速度、硬碟讀寫，或是程式的運作效能等等，我們會需要產生指定大小的檔案作為測試之用，這時大家肯定腦海都浮現出 dd 這傢伙對吧！ 但使用 dd 產生檔案時，是否覺得很慢呢？ 此外你知道除了 dd 之外，還有 truncate、fallocate 這兩個傢伙可以使用嗎？ 這邊會簡單說明如果要產生大檔案，你有哪些方法可以使用、如何使用，以及他們之間的差異。要特別注意，這邊產生的檔案其內容都是無意義的。


<!--more-->


提到產生大檔案，最常聽見的是 dd 這個指令，dd 的原意是從硬碟的一個地方把資料複製到另一個地方，和 cp 很類似，但 dd 從更底層的磁區開始做起，所以不會遺漏任何資訊，而我們也可以將 dd 加以利用，透過 dd 複製某個 1MB 的內容 1024 次，如此不就可以產生一個 1GB 的檔案了！

if 就是 input file 的意思，換句話說 of 則是 output file，在 Linux 裡面有個神奇的檔案 /dev/urandom，他可以產生隨機的資料，而下面這行指令可以將 1M 為單位的 /dev/urandom 重複 1024 次並寫入 1G.img 這個檔案。
<pre>dd if=/dev/urandom of=1G.img bs=1M count=1024</pre>
但這樣的做法太慢，我們可以將 if 改為 /dev/zero 來加快速度，這是因為 random 需要系統去產生，但如果直接寫入 0 的話會快上一些。
<pre>dd if=/dev/zero of=1G.img bs=1M count=1024</pre>
即使換成 /dev/zero 你會發現速度還是不夠快，特別是你想產生的檔案越大速度就越慢，原因很好懂，dd 是實際從硬碟的磁區複製內容出來，所以 dd 的執行速度取決於硬碟 IO，眾所皆知硬碟 IO 是很慢的... 如果我們要解決這問題，讓假檔案的產生速度不受檔案大小影響，可以透過稀鬆檔案的方式來解決，簡單說 dd /dev/zero 的做法我們會實際產生一個含有內容的檔案，但其實我們也可以產生一個檔案，而他「宣稱」有 10G 的檔案大小。

要做到這件事情，其實 dd 跟 truncate 都可以做到：
<pre>dd if=/dev/zero of=1Gfile bs=1 count=0 seek=1G

truncate -s 1G 1Gfile</pre>
我們透過 ls -lh 會發現檔案有 1G 沒錯，嘗試將他下載下來也確實會下載到 1G 的檔案，但如果用 du 去檢查它實際的硬碟用量，你會發現它根本就是空的！也因此，其實你可以產生比硬碟還大的檔案，例如 100G 的硬碟容量，但你可以產生 10TB 的檔案。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-28-上午2.32.24.jpg"><img class="alignnone size-full wp-image-7308" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-28-上午2.32.24.jpg" alt="" width="841" height="654" /></a>

如果你希望產生的速度又快，而且有真正的「佔用」硬碟空間，那你可以選擇使用 fallocate，它會真的去跟硬碟要走指定的空間，但事實上不會真的使用這些硬碟空間，而 fallocate 也是我們推薦使用的解法。
<pre>fallocate -l 10G 10G.img</pre>
如果你使用 macOS 的話，你可以選擇用 dd 或是 mkfile，在 macOS 不支援 truncate 和 fallocate。
<pre>mkfile -n 1g 1G.img</pre>
附上速度比較給大家參考

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-28-上午2.39.58.jpg"><img class="alignnone size-full wp-image-7309" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-28-上午2.39.58.jpg" alt="" width="841" height="654" /></a>

提醒：雖然 truncate、fallocate 產生的檔案其實沒有內容，但這對於磁碟讀寫速度、網路下載速度的測試並沒有影響，我也在思考稀鬆檔案和實際有內容的檔案會在什麼地方有差別，也歡迎大家提供這方面資訊給我！！
