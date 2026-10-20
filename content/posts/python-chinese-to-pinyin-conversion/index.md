---
title: "Python 漢語拼音處理（姓名中翻英、地址中翻英）"
date: 2016-12-09T00:05:43
slug: "python-chinese-to-pinyin-conversion"
aliases: ["/posts/python-%e6%bc%a2%e8%aa%9e%e6%8b%bc%e9%9f%b3%e8%99%95%e7%90%86%ef%bc%88%e5%a7%93%e5%90%8d%e4%b8%ad%e7%bf%bb%e8%8b%b1%e3%80%81%e5%9c%b0%e5%9d%80%e4%b8%ad%e7%bf%bb%e8%8b%b1%ef%bc%89/"]
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
---

今天幫同事處理大量的姓名、地址中翻英需求，研究了 Python 在漢語拼音方面的作法，畢竟你總不能一筆一筆複製到郵局或是網站上吧（笑），結果出乎意料的簡單，地址翻譯的部分透過各家的 Geocoder API 即可處理，漢語拼音則是有第三方的 Library 可以使用，而且翻譯效果還不錯，不能說盡善盡美，但搭配工人智慧足以彌補那小小的缺陷，畢竟如果要解決最後的小缺陷，可能要投入大量的資源、技術，導入機器學習的方法來處理（其實之後會有興趣做看看，畢竟在華文圈裡面好用的工具真的太少了）。


<!--more-->

<h2>姓名中翻英</h2>
首先姓名翻譯的部分，可以使用 python-pinyin 這個 Python Library，包含一字多音的部份都可以處理好，而且還有提供多種形式的輸出，除了漢語拼音外，甚至還有注音...... 但要注意這翻譯出來未必是護照上的名字，以我自己為例，護照是使用威妥瑪拼音，所以要視使用需求來判定是否可以使用，以今天來說是要寄包裹沒有問題，但如果是什麼過境文件申請或買機票建議就不要拿自己嘗試了。他也有推出 JavaScript、Go 的版本哦。

不過要注意姓名翻譯也有很多細節，例如把名和姓的順序倒過來放、原住民的漢名怎麼翻譯等等，這些都是在翻譯姓名時需要特別注意的部分。

Github： <a href="https://github.com/mozillazg/python-pinyin">https://github.com/mozillazg/python-pinyin</a>

範例程式碼：
<pre>from pypinyin import pinyin, lazy_pinyin
import pypinyin

# 一般護照是用這種形式
print(pinyin("貝殼放大", 0))

print(pinyin("貝殼放大", 1))
print(pinyin("貝殼放大", 2))</pre>
<h2>地址中翻英</h2>
地址中翻英的部分就比較複雜了，光是如何解析地址就是個大問題，雖然同樣是用漢語拼音翻譯，但如果直接把他當姓名一樣翻譯過去，快遞肯定送不到，更別說即使解決了地址解析的問題，使用者永遠會輸入奇怪的地址甚至是錯字，例如：
<ul>
 	<li>基隆路2段15號台科大資管系</li>
 	<li>基隆路二段15號3樓(男宿林先生)</li>
</ul>
對電腦來說，要判斷這些東西大概真的要請出人工智慧吧... 不過！ 幸好我們有 Google 大神，其實包括 Google、百度、Yahoo 等公司都有所謂的 Geocoder API，可以解析你輸入的地址，並回傳經緯度、英文地址等資訊給你，雖然因為是 HTTP API 的關係速度稍微慢了點，大約一秒一筆資料，但還算堪用，此外要注意的是這類 API 大多都有使用額度的限制，超過的話需要支付一定費用。

以我自己的作法，翻譯完成後還會用肉眼確認過，畢竟電腦能做的有限，但我的經驗大概 9 成都能正確翻譯，此外在包裹上把中英文地址都寫上去，這樣是最保險的作法了嘿嘿。

<strong>要注意如果有樓層的話， Google Geocode API 可能不會翻譯到哦。</strong>

<strong>相關資訊</strong>
<ul>
 	<li><a href="https://developers.google.com/maps/documentation/geocoding/intro?hl=zh-tw">Google Geocoding API Docs</a></li>
 	<li><a href="http://api.map.baidu.com/lbsapi/webservice-geocoding.htm">百度 Geocoding API Docs</a></li>
 	<li><a href="http://www.jianshu.com/p/59a7431a552d">怎么样用Python实现地理编码</a></li>
</ul>
此外，有個很棒的 Python Library - geocoder，他幫你把各家的 Geocoding API 都整理好了，包含百度、Google、Mapbox、Yahoo 等數十家的都有支援，畢竟各家的解析長處都不同，例如中國的地址，你總不會用 Google 來解析吧。有了 py-geocoder 你只要負責呼叫函式、填入金鑰，就會有需要的資訊傳回來囉！！

注意雖然翻譯速度慢，但可別開多執行緒跑呀！ 你可能馬上就會被 API Provider 封鎖......
<ul>
 	<li>Github： <a href="https://github.com/DenisCarriere/geocoder/">https://github.com/DenisCarriere/geocoder/</a></li>
 	<li>Docs：<a href="http://geocoder.readthedocs.io/">http://geocoder.readthedocs.io/</a></li>
</ul>
<strong>範例程式碼：</strong>
<pre>import geocoder

addr = geocoder.google("台北市大安區基隆路四段5號6樓")

# 英文地址
print(addr.address)

print(addr.geojson)
print(addr.postal)</pre>
