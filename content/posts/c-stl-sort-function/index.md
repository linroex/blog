---
title: "【C++】使用STL內建的sort()函式做到排序功能！"
date: 2011-08-25T10:30:09
slug: "c-stl-sort-function"
aliases: ["/posts/%e3%80%90c%e3%80%91%e4%bd%bf%e7%94%a8stl%e5%85%a7%e5%bb%ba%e7%9a%84sort%e5%87%bd%e5%bc%8f%e5%81%9a%e5%88%b0%e6%8e%92%e5%ba%8f%e5%8a%9f%e8%83%bd%ef%bc%81/"]
tags: ["C++", "reverse", "Sort", "STL"]
categories: ["C++"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-25_102642.jpg"><img class="alignnone size-large wp-image-724" title="2011-08-25_102642" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-25_102642-540x352.jpg" alt="" width="540" height="352" /></a>

排序這門課是所有學程式的人都必修的東西，因為很多資料的處理都需要用到他，很多程式語言也都把排序的函式放到程式語言的內部，讓開發者可以很方便的使用，但我想應該很少人知道，其實C++也有內建排序函式吧！


<!--more-->


C++內建的排序函式存放在「algorithm」這個標頭檔裡面，他是屬於標準的一部分，所以可以跨平台使用～ 另外這個函式是沒有回傳值的，他會直接把你傳入的資料排序好，然後就放在原本的變數裡面

使用前請先載入algorithm這個標頭檔

<strong>sort函式格式：</strong>

sort(array_begin,array_end);

array_begin的部份就是開始排序的地方，array_end就是排序的結尾，這樣解釋很難理解吧～ 舉例來講，現在你要把整個陣列做排序，陣列長度是8
<pre lang="cpp">int x[8]={1,3,5,2,4,6,9,0};</pre>
上面是宣告x這個陣列，再來：
<pre lang="cpp">sort(x,x+8);</pre>
上面是一個比較簡易的排序寫法，意思就是從x陣列的第一個位置到最後一個位置去進行排序，這時候x陣列內容={0,1,2,3,4,5,6,9}

那如果只想針對x陣列的前四項進行排序呢？
<pre lang="cpp">sort(x,x+4);</pre>
排序前：x={1,3,5,2,4,6,9,0}，排序後：x={1,2,3,5,4,6,9,0}

請注意這次排序只有1～4項有做排序，後面5～8項是沒有變動的

另外sort()預設都是升冪排序，如果要做成降冪呢？ 其實這也很簡單，透過reverse把陣列反轉就可以了

reverse的格式跟sort很類似，他也是沒有回傳值的

<strong>reverse格式：</strong>

reverse(array_begin,array_end);

參數部分不做解釋了，直接進入範例：
<pre lang="cpp">int x[8]={1,3,5,2,4,6,9,0};
sort(x,x+8);</pre>
此時x={0,1,2,3,4,5,6,9}，這是升冪，再來透過reverse把它變成降冪：
<pre lang="cpp">reverse(x,x+8);</pre>
這時候x={9,6,5,4,3,2,1,0}

另外上面的寫法都是直接用x,x+8來指定起始值、終止值，但是實際寫程式時你無法確定陣列的長度，這時候要怎麼辦呢？上面因為要寫的比較易懂，所以寫法不是很正確，下面這才是真正好的寫法哦～～

<strong>正確寫法提示：透過sizeof計算陣列長度</strong>

範例：
<pre lang="cpp">int x[8]={1,3,5,2,4,6,9,0};
int x_end=sizeof(x)/sizeof(int);
sort(x,x+x_end);</pre>
上面的寫法利用sizeof取得陣列長度，這招很常見，一定要學起來！ sizeof()這個函式可以取得變數佔用的記憶體量，把取得的值/變數型別就可以得到陣列長度了～

<strong>完整範例程式碼：</strong>
<script type="text/javascript" src="http://pastie.org/2425741.js"></script>
完整範例下載：<a href="http://www.box.net/shared/2ooq6suo53s2k8jbtp5j" target="_blank">Box.net</a>｜<a href="http://www.4shared.com/file/XMfZrnFj/cpp_stl_sort.html" target="_blank">4Shared</a>｜<a href="https://docs.google.com/viewer?a=v&amp;pid=explorer&amp;chrome=true&amp;srcid=0B7dzHNV9vYfOYjJhY2MyNjEtOWZkZS00YzUzLTkyMjUtYjhlOWYzZjFlYmQ3&amp;hl=zh_TW" target="_blank">Google</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/cpp_stl_sort.zip">Dropbox</a>

&nbsp;
