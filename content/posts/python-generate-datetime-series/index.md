---
title: "Python Generate Datetime Series"
date: 2017-07-30T02:30:16
slug: "python-generate-datetime-series"
tags: ["Python", "Pandas"]
categories: []
---

在 Excel 很簡單的拖曳就可以產生連續的日期們，而在 Python 你可以利用 datetime 和 timedelta 兩個模組做到類似的事情，不管是要間隔一小時、間格一天、間隔一個月都可以做到。


<!--more-->


其實蠻簡單的，只是有時腦袋卡住沒想過可以這樣作，用 timedelta 搭配迴圈就可以產生一系列的時間字串並存到陣列，以下範例是每 5 秒間隔的時間陣列：
<pre>import datetime

dt = datetime.datetime(2010, 12, 1,)
end = datetime.datetime(2010, 12, 30)
step = datetime.timedelta(days=1)

result = []

while dt &lt; end:
  result.append(dt.strftime('%Y-%m-%d %H:%M:%S'))
  dt += step

print(result)</pre>
當然也可以用 List Comprehension 的方式改寫來加快速度，或是視時機用 Generator 來處理。
<pre>import datetime as dt

print([dt.date(2017,1,1)+dt.timedelta(days=i) for i in range(30)])</pre>
不過真要說最方便的，莫過於 <strong>Pandas 提供的 date_range 函式</strong>，替你將產生時間序列的產生器寫成函式，效能好又節省空間，不像用迴圈產生時如果範圍很大的話會需要等上一段時間，讓我們來看看範例吧：
<pre># 從 2017/1/1 開始產生以天為單位產生 100 個項目

import pandas as pd

result = pd.date_range('2017/1/1 10:00:00', periods=100, freq='D')

print(result.tolist())
print(result[0:5].to_pydatetime())

for dt in result:
  print(dt.to_pydatetime())</pre>
freq 的部分除了 D 也可以換成其他參數，例如 H 是小時、M 是月份，或參考下表：
<div id="offset-aliases" class="section">
<table>
<thead valign="bottom">
<tr class="row-odd">
<th class="head">Alias</th>
<th class="head">Description</th>
</tr>
</thead>
<tbody valign="top">
<tr class="row-even">
<td>B</td>
<td>business day frequency</td>
</tr>
<tr class="row-odd">
<td>C</td>
<td>custom business day frequency (experimental)</td>
</tr>
<tr class="row-even">
<td>D</td>
<td>calendar day frequency</td>
</tr>
<tr class="row-odd">
<td>W</td>
<td>weekly frequency</td>
</tr>
<tr class="row-even">
<td>M</td>
<td>month end frequency</td>
</tr>
<tr class="row-odd">
<td>SM</td>
<td>semi-month end frequency (15th and end of month)</td>
</tr>
<tr class="row-even">
<td>BM</td>
<td>business month end frequency</td>
</tr>
<tr class="row-odd">
<td>CBM</td>
<td>custom business month end frequency</td>
</tr>
<tr class="row-even">
<td>MS</td>
<td>month start frequency</td>
</tr>
<tr class="row-odd">
<td>SMS</td>
<td>semi-month start frequency (1st and 15th)</td>
</tr>
<tr class="row-even">
<td>BMS</td>
<td>business month start frequency</td>
</tr>
<tr class="row-odd">
<td>CBMS</td>
<td>custom business month start frequency</td>
</tr>
<tr class="row-even">
<td>Q</td>
<td>quarter end frequency</td>
</tr>
<tr class="row-odd">
<td>BQ</td>
<td>business quarter endfrequency</td>
</tr>
<tr class="row-even">
<td>QS</td>
<td>quarter start frequency</td>
</tr>
<tr class="row-odd">
<td>BQS</td>
<td>business quarter start frequency</td>
</tr>
<tr class="row-even">
<td>A</td>
<td>year end frequency</td>
</tr>
<tr class="row-odd">
<td>BA</td>
<td>business year end frequency</td>
</tr>
<tr class="row-even">
<td>AS</td>
<td>year start frequency</td>
</tr>
<tr class="row-odd">
<td>BAS</td>
<td>business year start frequency</td>
</tr>
<tr class="row-even">
<td>BH</td>
<td>business hour frequency</td>
</tr>
<tr class="row-odd">
<td>H</td>
<td>hourly frequency</td>
</tr>
<tr class="row-even">
<td>T, min</td>
<td>minutely frequency</td>
</tr>
<tr class="row-odd">
<td>S</td>
<td>secondly frequency</td>
</tr>
<tr class="row-even">
<td>L, ms</td>
<td>milliseconds</td>
</tr>
<tr class="row-odd">
<td>U, us</td>
<td>microseconds</td>
</tr>
<tr class="row-even">
<td>N</td>
<td>nanoseconds</td>
</tr>
</tbody>
</table>
</div>
