---
title: "JS 前端處理檔案上傳之預覽、大小、尺寸、格式"
date: 2017-02-09T13:44:33
slug: "js-file-upload-preview-validation"
aliases: ["/posts/js-%e5%89%8d%e7%ab%af%e8%99%95%e7%90%86%e6%aa%94%e6%a1%88%e4%b8%8a%e5%82%b3%e4%b9%8b%e9%a0%90%e8%a6%bd%e3%80%81%e5%a4%a7%e5%b0%8f%e3%80%81%e5%b0%ba%e5%af%b8%e3%80%81%e6%a0%bc%e5%bc%8f/"]
tags: ["JavaScript", "HTML5"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2017/02/Facebook.png"]
---

在上傳檔案時，最討厭的莫過於檔案上傳了 5 分鐘後才跟我說檔案過大或尺寸不正確！  在檔案上傳的驗證我們往往交給後端處理，導致檔案需要上傳後才能確認是否符合規定，特別是圖檔還有長寬比例的問題需要檢查，這些事情如果完全交給後端，就可能導致用戶體驗不佳，之前在新頭殼研究大頭貼上傳時，發現原來完全可以將這些事情交給前端處理，透過 JS 和 HTML5 API 做到檔案上傳的格式、大小(20MB)、尺寸(100x100) 檢查，甚至還可以做到預覽、前端切圖轉檔等等！


<!--more-->


在開始前，請務必閱讀這些重要的注意事項
<ul>
 	<li>上傳檔案驗證這事情，絕對不能只教給前端處理；後端依舊要檢查，只是前端處理可以讓使用者體驗更好。</li>
 	<li>請務必考慮到少數瀏覽器、手機可能不支援前端檢查的可能性。</li>
 	<li>不建議完全交由前端剪裁圖片、轉換格式，雖然可以降低伺服器 Loading 並加快傳輸速度，但瀏覽器相容性需要考慮到，建議是「如果瀏覽器支援，就在前端剪裁，否則後端處理」這樣的合作方式。</li>
</ul>
在 HTML 有提供 <a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader">FileReader</a>、<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image">Image</a> 這三組 API，透過他們可以達到檔案上傳的格式、尺寸、大小檢查以及預覽功能；這三組 API 的瀏覽器支援度都還算不錯，不過在智慧型手機上略有些差異，可點擊上方超連結查詢。
<h2>檔案大小、格式檢查</h2>
當你在 form:input 上傳檔案後，可以從 input:file 的 DOM 上獲得 File 物件，並檢查檔案大小（Byte） 和格式，可參考下方範例：

<strong>HTML</strong>
<pre>&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>$("#uploader").change(function(){
    var upploader_dom = $("#uploader")[0];

    # 假設單檔上傳，所以直接取第零個檔案
    console.log(uploader_dom.file[0].size + " KB");

    # 檔案格式是以副檔名來做判斷
    console.log(uploader_dom.file[0].type);
})</pre>
<h2>檔案預覽</h2>
如果你想做非圖檔預覽或檔案尺寸檢查，建議先閱讀這邊。

在檔案上傳後（change edvent）透過 FileReader 物件將使用者上傳的檔案以 DataURL 格式讀取後設為 img 的 src 屬性，如果一來就可以再不經由後端伺服器、不上傳檔案的情況下預覽圖檔內容。

<strong>HTML</strong>
<pre>&lt;img id="preview_img" alt="empty preview"&gt;
&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>var reader = new FileReader();

reader.onload = function(e) {
    $("#preview_img").attr("src", e.target.result);
}

$("#uploader").change(function() {
    var upload_file = $("#uploader")[0].files[0];
    reader.readAsDataURL(upload_file);
})</pre>
除了 FileReader.readAsDataURL() 外，其實也有readAsText()、readAsBinaryString() 等方法可使用，因此也可以做到非圖檔預覽，例如讀取文字檔後顯示在 Textarea。
<h2>圖檔尺寸檢查</h2>
在上傳大頭貼或橫幅等圖檔時，會需要針對圖檔的長寬比例進行檢查。 其實在 &lt;img&gt; 這個 HTML Tag 可以取得圖檔案寬度、高度，例如：
<pre>&lt;img src="https://example.com/hi.jpg"&gt;

&lt;script&gt;
    var img_dom = $("img")[0];

    console.log(img_dom.width);
    console.log(img_dom.height);
&lt;/script&gt;</pre>
在 img dom 裡面的傢伙就是 Image 物件，如果有興趣知道更多用法、屬性可以到 <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image">MDN Image API</a> 查閱。

透過上面介紹到的特性，和 FileReader、File 結合，就可以檢查上傳圖檔的長寬比例，請參考範例程式碼：

<strong>HTML</strong>
<pre>&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>var reader = new FileReader();
var img = new Image();

reader.onload = function(e) {
    img.src = e.target.result;
}

img.onload = function() {
    console.log(this.width);
    console.log(this.height);
}

$("#uploader").change(function() {
    var upload_file = $("#uploader")[0].files[0];
   reader.readAsDataURL(upload_file);
})</pre>
