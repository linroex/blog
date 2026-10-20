---
title: "My Kindle Ebook Manage Workflow"
date: 2019-05-18T00:56:28
slug: "my-kindle-ebook-manage-workflow"
tags: ["Kindle", "E-books", "Calibre"]
categories: ["Hardware"]
images: ["%%IMG%%/wp-content/uploads/2019/05/nemichandra-hombannavar-131171-unsplash.jpg"]
---

<p>相信每個 Kindle 使用者都會有自己習慣的電子書管理流程，從買書、書籍管理、傳送到 Kindle 閱讀器到備份，久而久之會發展出一套習慣的流程，最初我跟大多數人一樣，都是用 Calibre 管理電子書檔案，但隨著第二臺 Kindle 閱讀器的加入，我開始發現只靠 Calibre 來管理電子書再透過 USB 傳送檔案到閱讀器有許多不方便的地方，像是:</p>
<!--more-->



<ul><li>電子書的閱讀進度、筆記等等無法同步，多臺 Kindle 時很不方便，另外 Kindle 換掉買新的時候，舊的閱讀記錄和筆記也無法備份出來。</li><li>有多臺電腦時，常常會混亂上次用哪臺電腦處理電子書，搞得 Kindle 裡面一堆重複的書。</li><li>換新的 Kindle 閱讀器時，又要重新把書歸類到不同的 Collection</li></ul>
<p>再加上最近 Kindle 終於推出「已讀、未讀」的書籍篩選功能，可以只列出未讀的書籍，但同樣地，這個已讀和未讀的狀態也是不能備份、不能同步的，這讓我下定決心要找出辦法來解決無法備份、無法同步以及筆電和桌電的電子書檔案管理問題。</p>
<p>Kindle 的用戶應該都知道「Personal Document E-mail」這功能，只要把 MOBI、TXT、PDF 格式的檔案寄到 Amazon 指定的專屬 Email ，接著在 Kindle 上打開 Wifi 就可以自動下載檔案，而透過 Email 傳送進 Kindle 的檔案「視同在 Amazon 購買的電子書」，也就是說，這些書籍的閱讀進度、筆記、已讀狀態都可以自動備份並在不同機器上同步，甚至在手機 App 也可以很方便的查看你做的筆記，換新閱讀器時也可以輕鬆的下載所有書籍就像 iCloud 備份還原那樣。</p>
<p>而我的最新推薦流程，就是用 IFTTT 搭配 Personal Document E-mail ，當 Dropbox 資料夾出現檔案時，自動將檔案寄到 Amazon 指定的信箱，因為是透過 Email 傳送進 Kindle 閱讀器，可以解決筆記同步與備份等等問題，也因為是透過 Dropbox 管理，所以不用擔心「搞不清楚電子書檔案是放在筆電還是桌電」的問題，反正 Dropbox 會自動幫我從筆電同步到桌電，至於 Calibre，我讓它退居第二線專心負責轉檔，而 Calibre 裡面則不會放任何電子書，它的書櫃清單一片空百。</p>
<p>這樣做的好處：</p>
<ul><li>Dropbox 會負責同步書籍，不用煩惱電子書檔案到底是放筆電還是桌電的 Calibre。</li><li>自己的電子書（不是從 Amazon 購買的）也能享有閱讀進度、筆記、已讀狀態同步的功能。</li><li>當 Kindle 閱讀器壞掉換新閱讀器時，不用難過以前做的筆記消失。</li></ul>
<p>接下來就讓我們實際操作吧！</p>
<p>首先，我們要到 Amazon 網頁的「Your devices and content」進行設定並取得專屬 Kindle Email Address。</p>
<p></p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.26.10.png" alt="" class="wp-image-7704"/></figure>
<p>進到「Preferences 」裡面將以下項目設為啟用：</p>
<ul><li>Device Synchronization (Whispersync Settings)</li><li>Personal Document Settings - Personal Document Archiving </li></ul>
<p>接著將你的電子信箱地址加入到「Approved Personal Document E-mail List」</p>
<p>你可以在 Device Tab 看到你所註冊的每臺閱讀器所對應的專屬 Email Address，只要將符合格式要求的電子書檔案寄到這個信箱，對應的 Kindle 閱讀器就會在連上 WiFi 時自動下載電子書。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.34.30.png" alt="" class="wp-image-7705"/></figure>
<p>接著到 <a href="https://ifttt.com/discover">IFTTT</a> 註冊帳號，並點擊「My Applets」-> 「New Applet」新建一個程式。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.41.25.png" alt="" class="wp-image-7706"/></figure>
<blockquote class="wp-block-quote"><p>IFTTT 是個有趣（我不知道該怎麼形容）的服務，它可以讓你用很簡單的方式寫個程式解決你的問題，IFTTT 把所有服務分成 Trigger 和 Action 兩塊，例如我們可以把「Dropbox 收到檔案」設為 Trigger，並設定對應的 Action，可能是寄出一封電子郵件，也可能是發一則 Facebook 動態等等，IFTTT 內建了 Dropbox、Facebook、Twitter、Google 等多項服務，讓你一行程式都不用寫就可以建立自己的自動化程式。</p></blockquote>
<p>按一下「this」並搜尋「Dropbox」，接著選擇「New file in your folder」</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.40.44.png" alt="" class="wp-image-7707"/></figure>
<p>接著 IFTTT 會問你「是否要指定一個資料夾」，當指定資料夾有新增檔案時才會觸發後續動作，我自己是建立了一個名為「Kindle」的資料夾，將所有檔案都放到這個資料夾。</p>
<p>最後，按下 Create Trigger 即可完成第一步的設定。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.40.50.png" alt="" class="wp-image-7708"/></figure>
<p>接下來會回到最開始的「if ... then ... 」頁面，請幫我點選 then 後面的「that」，這代表「當Dropbox 指定資料夾有檔案上傳時」要做的事情。</p>
<p>請幫我搜尋「Gmail」並點選，第一次使用，IFTTT 會要求和 Gmail 做連結，接著幫我選擇「Send an email」</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.47.01.png" alt="" class="wp-image-7709"/></figure>
<p>接下來在「To Address」的欄位輸入你的 Kindle 專屬 Email Address ，其他設定例如信件標題等等就看你喜好設定，而「Attachment URL」的部分維持預設值「FileUrl」即可。</p>
<p>完成設定後，按下「Create Action」！</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.48.15.png" alt="" class="wp-image-7710"/></figure>
<p>最後，你可以幫你剛剛完成的自動化小程式取個名字，預設會類似「If New file in your folder <em>kindle</em>, then Send an email from <em>admin@gmail.com</em>」這樣。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.52.08.png" alt="" class="wp-image-7711"/></figure>
<p>好的，整個設定到這就算完成囉，接下來用 Calibre 把電子書轉檔成 mobi 格式後，大膽的拉進你指定的 Dropbox 資料夾，把 Kindle 閱讀器的 WiFi 打開，等檔案上傳完，你會很驚奇的發現閱讀器也同步開始下載了，一切就跟魔術一樣的神奇，而同樣地做法，也可以搭配 Google Drive 或其他你習慣的網路硬碟哦！</p>
