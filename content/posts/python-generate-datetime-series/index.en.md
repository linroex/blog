---
title: "Generating a Datetime Series in Python"
date: 2017-07-30T02:30:16
slug: "python-generate-datetime-series"
tags: ["Python", "Pandas"]
categories: ["Programming"]
draft: false
---

In Excel, you can generate a series of consecutive dates with a simple drag. In Python, you can do something similar with the datetime and timedelta modules. Whether you want intervals of one hour, one day, or one month, you can do it.


<!--more-->


It's actually quite simple. Sometimes your brain just gets stuck and you don't think of doing it this way. By using timedelta together with a loop, you can generate a series of datetime strings and store them in an array. The following example generates an array of times at 5-second intervals:
<pre>import datetime

dt = datetime.datetime(2010, 12, 1,)
end = datetime.datetime(2010, 12, 30)
step = datetime.timedelta(days=1)

result = []

while dt &lt; end:
  result.append(dt.strftime('%Y-%m-%d %H:%M:%S'))
  dt += step

print(result)</pre>
Of course, you can also rewrite it with a list comprehension to speed things up, or use a generator depending on the situation.
<pre>import datetime as dt

print([dt.date(2017,1,1)+dt.timedelta(days=i) for i in range(30)])</pre>
But if we're talking about the most convenient option, it's the <strong>date_range function provided by Pandas</strong>. It wraps the generator for creating a time series into a function for you. It performs well and saves space. Unlike generating values with a loop, which can take a while when the range is large, let's look at an example:
<pre># Generate 100 items in daily units, starting from 2017/1/1

import pandas as pd

result = pd.date_range('2017/1/1 10:00:00', periods=100, freq='D')

print(result.tolist())
print(result[0:5].to_pydatetime())

for dt in result:
  print(dt.to_pydatetime())</pre>
For freq, you can use values other than D. For example, H is hour and M is month. Or refer to the table below:
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
