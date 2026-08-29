---
title: "HTML 強制超連結下載檔案"
date: 2017-04-26T09:56:50
slug: "html-force-download-link"
aliases: ["/posts/html-%e5%bc%b7%e5%88%b6%e8%b6%85%e9%80%a3%e7%b5%90%e4%b8%8b%e8%bc%89%e6%aa%94%e6%a1%88/"]
tags: ["HTML"]
categories: []
---

現在的瀏覽器都很聰明，當網頁超連結的內容是純文字檔、PDF、CSS File 時，瀏覽器會很聰明的在瀏覽器預覽而不是下載，但有時候我們希望使用者直接下載而不是在瀏覽器檢視，例如之前到 jQuery 的官網下載 jquery.js 時，都會變成預覽，需要按右鍵另存新檔，但其實我的目的很明確是要下載檔案而不是檢視呀！


<!--more-->


其實只需要在超連結內加上 download 屬性，就可以讓超連結強制下載檔案，即使今是 HTML 檔，都會強制下載而非在瀏覽器內檢視，可以視需要在合適的、明確需要下載的地方做這處理；參考範例：
<pre>&lt;a download href="http://example.tw/example.pdf"&gt;</pre>
