---
title: "分享到臉書的網址總是不如預期的呈現嗎？ 來看看該如何幫網站做好 Facebook 優化吧！"
date: 2017-02-18T20:39:46
slug: "facebook-share-function-optimization"
aliases: ["/posts/%e8%87%89%e6%9b%b8%e5%88%86%e4%ba%ab%e5%8a%9f%e8%83%bd%e5%84%aa%e5%8c%96/"]
tags: ["Facebook"]
categories: []
---

相信對每位站長而言，Facebook 都已成為和 Google 同樣重要的流量來源，過去我們為了搜尋引擎做了許多 SEO 優化，但你知道嗎？ 其實 Facebook 也有推出一份《<a href="https://developers.facebook.com/docs/sharing/best-practices">網站與行動應用程式的分享最佳作法</a>》闡述該如何調整網頁，讓你的網頁被使用者分享到 Facebook 時可以用最佳的方式呈現，在這篇文章中會分享我在個人部落格所做的嘗試。


<!--more-->


當我們把網址張貼到臉書塗鴉牆時，該動態會自動呈現標題、簡介和文字，如果你沒有做任何的處理，Facebook就會自行挑選在該網頁中出現的一張圖片作為呈現之用，或甚至是只呈現文字而無圖片：

最佳情況：有和內文相符的圖片，以及標題和簡介文字

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.54.06.jpg"><img class="alignnone size-full wp-image-7456" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.54.06.jpg" alt="" width="520" height="685" /></a>

如果沒為 Facebook 做優化，就可能只顯示標題和簡介，甚至連文字部分都有錯誤或是無關緊要

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.57.03.jpg"><img class="alignnone size-full wp-image-7457" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午7.57.03.jpg" alt="" width="521" height="281" /></a>

上面兩則相較之下，何者較能吸引 Facebook 用戶閱讀想必不言而喻，眾所皆知合適的圖片以及吸引人的文字、標題，能夠讓你張貼的動態更引人眼球，如果因為沒做好優化導致網頁分享到 Facebook 後無法正確呈現實在可惜。

接下來會分享我的部落格『碼人日誌』在這方面的做法，如果你是粉專小編不了解技術面做法，可以閱讀後和工程師做討論。

WordPress 有特色圖片的功能，可以幫每篇文章設定一張圖片，我的整個架構即是相依在此之上，如果該文章有設定特色圖片，則以所設定的特色圖片作為 Facebook 分享之用，若無，則取文章第一張圖作為 Facebook 分享用，若兩者皆無，則使用文章分類的特色圖片供分享。 簡介文字則是用文章的前 100 字做呈現。
<h2>基本資訊</h2>
當我們分享文章到 Facebook 時，Facebook 的爬蟲會來檢索網頁內容並取出標題、簡介、封面圖等資訊，我們可以設定 Open Graph Meta Tag 來讓 Facebook 正確檢索，如果沒有設定的話爬蟲就會依他的演算法自行決定。

將這段程式碼修改後加在 HTML 的 head 內即可。
<pre>&lt;meta property="og:title" content="碼人日誌文章標題"&gt;
&lt;meta property="og:image" content="https://example.com/hello.jpg"&gt;
&lt;meta property="og:description" content="這是一段簡介文字"&gt;</pre>
如果你有多張圖片希望呈現，讓使用者能夠自行選擇的話，可以設定多個 og:image 例如：
<pre>&lt;meta property="og:image" content="https://example.com/hello1.jpg"&gt;
&lt;meta property="og:image" content="https://example.com/hello2.jpg"&gt;
&lt;meta property="og:image" content="https://example.com/hello3.jpg"&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/5__林熙哲_🔊.png"><img class="alignnone size-full wp-image-7460" src="{{< param imageBase >}}/wp-content/uploads/2017/02/5__林熙哲_🔊.png" alt="" width="524" height="507" /></a>

除了這三個 Open Graph Meta Tag 外，也可以視需求添加：<a href="https://developers.facebook.com/docs/sharing/opengraph/object-properties#standard">開放社交關係圖中繼標籤</a>

此外，建議到 Facebook for Developers 開設一個 App 並將 app_id 填入，這可以讓你在 Facebook 的分析工具看到更多詳細資訊，例如每篇文章的分享數。
<pre>&lt;meta property="fb:app_id" content="" /&gt;</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.16.06.jpg"><img class="alignnone size-large wp-image-7459" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.16.06-1024x779.jpg" alt="" width="660" height="502" /></a>
<h2>封面圖</h2>
建議封面圖 og:image 的解析度至少大於 1200*630 來獲得最佳呈現效果，並盡力維持 1.91:1 的寬高比例來獲得最佳的呈現效果，避免精心準備的圖片有部分被遮住。

如果沒有調整好比例，就會像下面這樣鬧笑話

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午9.30.11.jpg"><img class="alignnone size-full wp-image-7471" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午9.30.11.jpg" alt="" width="484" height="389" /></a>

此外有些限制：
<ul>
 	<li>圖檔大小不能超過 8MB</li>
 	<li>圖檔解析度不能低於 200*200</li>
</ul>
仔細注意會發現 Facebook 針對分享連結的封面圖有兩種呈現方式，一種是呈現在標題上方以大圖呈現，通常我們建議這種呈現方式來吸引注意力，另一種則是將圖片置放在標題左方。

如果圖片尺寸小於 600*315 就會以這種版型顯示。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.25.57.jpg"><img class="alignnone size-full wp-image-7461" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.25.57.jpg" alt="" width="518" height="355" /></a>

讀到這裡想必你已經迫不及待設定 og:image 卻發現分享到臉書依舊沒有圖片對吧！ 這是因為在你第一次分享時，臉書不會那麼快就把封面圖下載到臉書伺服器，通常等你第二次分享該連結時封面圖才會生效，我個人習慣會先把連結貼上到發文位置但不發文，接著重新整理網頁後再貼一次，通常這時候就可以順利呈現了，或是加上這兩行 Open Graph Meta Tag 來解決該問題，讓你第一次分享就可以順利呈現。

透過 og:image:width 和 og:image:height 的設定，讓臉書可以直接得知圖片的寬高，而不需要將圖檔下載後計算，即可在第一次分享時正確呈現圖片。
<pre>&lt;meta property="og:image:width" content="1024"&gt;
&lt;meta property="og:image:height" content="600"&gt;</pre>
此外 Facebook 亦支援 JS 動態產生的 Open Graph Meta Tag，如果你有用 JS 去改變 og:image 的內容，Facebook 是可以正確吃到它的，應用此屬性我做了一段純前端設定 og:image:width 的程式，這是因為如果從後端加入，不免需要將圖片寬高皆存入資料庫，個人有點懶惰不想改那後端程式碼所以就...
<pre>window.onload = function() {
  var img_src = document.head.querySelectorAll("[property='og:image']")[0].content;
  var img = new Image();
  img.src = img_src;

  img.onload = function() {
    var og_width_meta = document.createElement("meta");
    var og_height_meta = document.createElement("meta");

    og_width_meta.setAttribute("property", "og:image:width");
    og_width_meta.setAttribute("content", img.width);

    og_height_meta.setAttribute("property", "og:image:height"); 
    og_height_meta.setAttribute("content", img.height);

    document.getElementsByTagName("head")[0].appendChild(og_width_meta);
    document.getElementsByTagName("head")[0].appendChild(og_height_meta);
  }
}</pre>
如果有修改圖片，因為 Facebook 有快取的關係，不會那麼快就生效，這時候可以透過 Facebook 提供的<a href="https://developers.facebook.com/tools/debug/sharing/batch/">批次失效工具</a>來讓快取失效。
<h2>錯誤檢查</h2>
如果都做了設定，卻始終沒有生效，可以用臉書提供的<a href="https://developers.facebook.com/tools/debug/sharing/">錯誤檢查工具</a>來檢查是否有設定上的錯誤。

錯誤檢查工具：<a href="https://developers.facebook.com/tools/debug/sharing/">https://developers.facebook.com/tools/debug/sharing/</a>

如果該網址是第一次被分享到 Facebook，會出現像這樣的訊息，點擊「擷取新資訊」即可

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.38.26.jpg"><img class="alignnone size-full wp-image-7462" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-18-下午8.38.26.jpg" alt="" width="1010" height="590" /></a>
