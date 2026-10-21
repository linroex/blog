---
title: "Handling File Uploads on the Frontend With JS: Preview, Size, Dimensions, and Format"
date: 2017-02-09T13:44:33
slug: "js-file-upload-preview-validation"
tags: ["JavaScript", "HTML"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2017/02/Facebook.png"]
draft: false
---

What I hate most when uploading a file is being told five minutes later that the file is too big or the dimensions are wrong! We usually leave upload validation to the backend, so a file has to be uploaded before we can check whether it meets the requirements. Images in particular also need their aspect ratio checked. If all of this is left entirely to the backend, the user experience can suffer. When I was researching profile picture uploads at NewTalk, I found that all of this can actually be handled on the frontend. With JS and HTML5 APIs, you can check the file's format, size (20MB), and dimensions (100x100). You can even do previews and client-side image cropping and conversion!


<!--more-->


Before we start, please read these important notes:
<ul>
 	<li>File upload validation must never be left to the frontend alone. The backend still has to check; frontend processing only makes the user experience better.</li>
 	<li>Be sure to consider that a few browsers or phones may not support frontend checks.</li>
 	<li>It is not recommended to crop images or convert formats entirely on the frontend. Although this lowers server load and speeds up transfers, browser compatibility has to be considered. A better arrangement is: "if the browser supports it, crop on the frontend; otherwise, handle it on the backend."</li>
</ul>
HTML provides three APIs: <a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/API/FileReader">FileReader</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image">Image</a>. With them you can check the upload's format, dimensions, and size, and provide previews. Browser support for these three APIs is fairly good, although there are slight differences on smartphones. You can check the details through the links above.
<h2>Checking File Size and Format</h2>
After the user uploads a file through the form:input, you can get the File object from the input:file DOM element and check the file size (in bytes) and format. See the example below:

<strong>HTML</strong>
<pre>&lt;input type="file" id="uploader"&gt;</pre>
<strong>JavaScript</strong>
<pre>$("#uploader").change(function(){
    var upploader_dom = $("#uploader")[0];

    # Assume a single file upload, so take the first file directly (index 0)
    console.log(uploader_dom.file[0].size + " KB");

    # The file format is determined by the file extension
    console.log(uploader_dom.file[0].type);
})</pre>
<h2>File Preview</h2>
If you want to preview non-image files or check file dimensions, I recommend reading this part first.

After the file is uploaded (on the change event), use the FileReader object to read the file the user uploaded as a DataURL and set it as the img's src attribute. In this way, you can preview the image without going through the backend server or uploading the file.

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
Besides FileReader.readAsDataURL(), there are also methods such as readAsText() and readAsBinaryString(), so you can also preview non-image files, for example by reading a text file and displaying it in a textarea.
<h2>Checking Image Dimensions</h2>
When uploading avatars, banners, or other images, you need to check the aspect ratio. In fact, the &lt;img&gt; HTML tag lets you get the image's width and height, for example:
<pre>&lt;img src="https://example.com/hi.jpg"&gt;

&lt;script&gt;
    var img_dom = $("img")[0];

    console.log(img_dom.width);
    console.log(img_dom.height);
&lt;/script&gt;</pre>
The object behind the img DOM element is an Image object. If you are interested in learning more about its usage and properties, you can check the <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image">MDN Image API</a>.

By combining the features introduced above with FileReader and File, you can check the aspect ratio of an uploaded image. See the sample code:

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
