---
title: "Chinese Pinyin Conversion in Python (Translating Names and Addresses)"
date: 2016-12-09T00:05:43
slug: "python-chinese-to-pinyin-conversion"
tags: ["Python"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-3.png"]
draft: false
---

Today I helped a coworker with a large batch of name and address translation requests from Chinese to English, so I looked into how Python handles Hanyu Pinyin. After all, you can't copy everything one by one into a post office form or a website, right? (lol). The result was surprisingly simple. Address translation can be handled through the Geocoder APIs of various providers, and for pinyin there are third-party libraries you can use. The translation quality is pretty good. It's not perfect, but combined with some "manual intelligence" (工人智慧, a pun on 人工智慧, "artificial intelligence"), the small flaws are good enough. To fix the last small flaws, you would probably need to invest a lot of resources and technology and introduce machine learning methods. (I'm actually interested in trying that out someday, since there are really too few useful tools in the Chinese-speaking world.)


<!--more-->

<h2>Translating Names</h2>
For names, you can use the python-pinyin Python library. It handles characters with multiple pronunciations, and it offers several output formats. Besides Hanyu Pinyin, it can even output Bopomofo (Zhuyin)... But keep in mind that the translation may not match the name on your passport. In my case, my passport uses Wade-Giles romanization, so you need to decide whether the library is suitable for your needs. Today it was fine for sending a package, but for things like applying for transit documents or buying plane tickets, I would not recommend trying it yourself. They also have versions for JavaScript and Go!

However, there are many details to watch out for when translating names, such as putting the family name and given name in the wrong order, or how to translate the Chinese names of Indigenous people. These are all things you need to pay special attention to when translating names.

Github: <a href="https://github.com/mozillazg/python-pinyin">https://github.com/mozillazg/python-pinyin</a>

Example code:
<pre>from pypinyin import pinyin, lazy_pinyin
import pypinyin

# This is the format used by regular passports
print(pinyin("貝殼放大", 0))

print(pinyin("貝殼放大", 1))
print(pinyin("貝殼放大", 2))</pre>
<h2>Translating Addresses</h2>
Address translation is more complicated. Just parsing an address is already a big problem. Although it also uses Hanyu Pinyin, if you translate it the same way you would a name, the package definitely won't be delivered. Not to mention that even if you solve the address parsing problem, users will always enter strange addresses or even typos. For example:
<ul>
 	<li>基隆路2段15號台科大資管系 (Keelung Rd. Sec. 2, No. 15, NTUST Information Management Dept.)</li>
 	<li>基隆路二段15號3樓(男宿林先生) (Keelung Rd. Sec. 2, No. 15, 3rd Floor, Mr. Lin in the men's dorm)</li>
</ul>
For a computer, figuring these out probably really requires AI... But luckily, we have Google, the great one! Companies including Google, Baidu, and Yahoo all offer so-called Geocoder APIs. They can parse the addresses you enter and return information such as latitude/longitude and English addresses. Because it is an HTTP API, it is a bit slow, roughly one record per second, but it is still usable. Also, keep in mind that most of these APIs have usage quotas, and if you go over them, you have to pay a fee.

My own approach is to check the results with my own eyes after translating, since computers can only do so much. In my experience, about 90% are translated correctly. In addition, writing both the Chinese and English addresses on the package is the safest approach, hehe.

<strong>Note: if the address includes a floor number, the Google Geocode API may not translate it.</strong>

<strong>Related Information</strong>
<ul>
 	<li><a href="https://developers.google.com/maps/documentation/geocoding/intro?hl=zh-tw">Google Geocoding API Docs</a></li>
 	<li><a href="http://api.map.baidu.com/lbsapi/webservice-geocoding.htm">Baidu Geocoding API Docs</a></li>
 	<li><a href="http://www.jianshu.com/p/59a7431a552d">怎么样用Python实现地理编码 (How to implement geocoding with Python, Simplified Chinese article)</a></li>
</ul>
There is also a great Python library called geocoder. It organizes the Geocoding APIs of each provider for you, and it supports dozens of them, including Baidu, Google, Mapbox, and Yahoo. Since each provider has different strengths in parsing, for example for addresses in China, you wouldn't use Google to parse them, right? With py-geocoder, you only need to call the function and enter your key, and the information you need will be returned!!

Note: even though translation is slow, don't run it with multiple threads! You may get blocked by the API provider right away...
<ul>
 	<li>GitHub: <a href="https://github.com/DenisCarriere/geocoder/">https://github.com/DenisCarriere/geocoder/</a></li>
 	<li>Docs: <a href="http://geocoder.readthedocs.io/">http://geocoder.readthedocs.io/</a></li>
</ul>
<strong>Example code:</strong>
<pre>import geocoder

addr = geocoder.google("台北市大安區基隆路四段5號6樓")

# English address
print(addr.address)

print(addr.geojson)
print(addr.postal)</pre>
