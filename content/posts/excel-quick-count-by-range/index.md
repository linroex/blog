---
title: "如何用 Excel 快速計算不同級距的數量"
date: 2017-08-03T02:42:37
slug: "excel-quick-count-by-range"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e7%94%a8-excel-%e5%bf%ab%e9%80%9f%e8%a8%88%e7%ae%97%e4%b8%8d%e5%90%8c%e7%b4%9a%e8%b7%9d%e7%9a%84%e6%95%b8%e9%87%8f/"]
tags: ["Excel"]
categories: ["Software"]
---

在做數據分析時，總不免會將數據區分成不同級聚以便觀察，例如將學生分類成 80-100 分、60-80 分或不及格的，並計算在不同群內的學生人數以便進行分析，這時候 Excel（ Google Sheets ） 的 FREQUENCY 函式就能幫上大忙啦！


<!--more-->


最開始不知道 FREQUENCY 函式時，我還傻傻的在 SQL 語法裡面寫滿 IF 來做到類似的不同級距計算功能，雖然 SQL 很強大，但將身邊的工具互相搭配更重要！ 有的事情在 SQL 處理方便，有的則可以到 Excel 上處理，例如這個「各級距人數計算」就是在 Excel 上會比較方便的最佳案例！
<pre>FREQUENCY(data_array, bins_array)</pre>
FREQUENCY 函式接受兩個參數，以此例來說 data_array 是學生的成績欄位（只需要成績那欄即可），而 bins_array 則是級距標準欄位，FREQUENCY 的回傳也是 Array，這意味著你不需要將函式複製到各欄位，它會自動填滿哦！

只要在 E2 欄位填入如下語法，他就會自動把 E3、E4、E5、E6 都補上資料哦，很方便吧！ 他會自動配對「標準」欄位的資料，以下圖為例 E2 的內容是 100 以上的個數、E3 則是 100 ~ 80 的個數、E4 則是 80 ~ 60 的個數，至於 E6 當然就是小於 0 的數量啦！
<pre><span class=" default-formula-text-color" dir="auto">=</span><span class=" default-formula-text-color" dir="auto">FREQUENCY</span><span class=" default-formula-text-color match-paren" dir="auto">(</span><span dir="auto">B2:B7</span><span class=" default-formula-text-color" dir="auto">,</span> <span dir="auto">D2:D5</span><span class=" match-paren default-formula-text-color" dir="auto">)</span></pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/08/螢幕快照-2017-08-03-上午2.39.12.jpg"><img class="alignnone size-full wp-image-7653" src="{{< param imageBase >}}/wp-content/uploads/2017/08/螢幕快照-2017-08-03-上午2.39.12.jpg" alt="" width="554" height="218" /></a>

如果 FREQUENCY 函式回傳錯誤，可以檢查是否在他「放資料的位置上」有其他資料，因為它會回傳一個陣列，並自動填滿 N 列，如果位置上有其他資料就會導致錯誤。
