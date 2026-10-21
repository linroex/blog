---
title: "Python で日時の連続系列を生成する"
date: 2017-07-30T02:30:16
slug: "python-generate-datetime-series"
tags: ["Python", "Pandas"]
categories: ["Programming"]
draft: false
---

Excel では、ドラッグするだけで連続した日付を簡単に生成できます。Python でも、datetime と timedelta という二つのモジュールを使えば、同じようなことができます。1時間おき、1日おき、1か月おきなど、どの間隔でも可能です。


<!--more-->


実はとても簡単です。ただ、頭が固まってしまって、こういう方法を思いつかないこともあります。timedelta をループと組み合わせると、一連の日時文字列を生成して配列に保存できます。以下の例では、5秒間隔の時刻の配列を生成しています：
<pre>import datetime

dt = datetime.datetime(2010, 12, 1,)
end = datetime.datetime(2010, 12, 30)
step = datetime.timedelta(days=1)

result = []

while dt &lt; end:
  result.append(dt.strftime('%Y-%m-%d %H:%M:%S'))
  dt += step

print(result)</pre>
もちろん、リスト内包表記で書き直して処理を速くすることもできますし、場合によってはジェネレーターを使うこともできます。
<pre>import datetime as dt

print([dt.date(2017,1,1)+dt.timedelta(days=i) for i in range(30)])</pre>
ただ、最も便利な方法といえば、<strong>Pandas が提供する date_range 関数</strong>です。時系列を生成するジェネレーターを関数としてまとめてくれるので、パフォーマンスが良く、メモリも節約できます。ループで生成すると、範囲が大きいときに時間がかかってしまいますが、それと違って効率的です。では、例を見てみましょう：
<pre># 2017/1/1 から、日単位で 100 件の項目を生成

import pandas as pd

result = pd.date_range('2017/1/1 10:00:00', periods=100, freq='D')

print(result.tolist())
print(result[0:5].to_pydatetime())

for dt in result:
  print(dt.to_pydatetime())</pre>
freq には D 以外の値も指定できます。例えば、H は時間、M は月を表します。その他は下の表を参照してください：
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
<td>営業日頻度</td>
</tr>
<tr class="row-odd">
<td>C</td>
<td>カスタム営業日頻度（実験的）</td>
</tr>
<tr class="row-even">
<td>D</td>
<td>カレンダー日頻度</td>
</tr>
<tr class="row-odd">
<td>W</td>
<td>週次頻度</td>
</tr>
<tr class="row-even">
<td>M</td>
<td>月末頻度</td>
</tr>
<tr class="row-odd">
<td>SM</td>
<td>半月末頻度（15日と月末）</td>
</tr>
<tr class="row-even">
<td>BM</td>
<td>営業月末頻度</td>
</tr>
<tr class="row-odd">
<td>CBM</td>
<td>カスタム営業月末頻度</td>
</tr>
<tr class="row-even">
<td>MS</td>
<td>月初頻度</td>
</tr>
<tr class="row-odd">
<td>SMS</td>
<td>半月初頻度（1日と15日）</td>
</tr>
<tr class="row-even">
<td>BMS</td>
<td>営業月初頻度</td>
</tr>
<tr class="row-odd">
<td>CBMS</td>
<td>カスタム営業月初頻度</td>
</tr>
<tr class="row-even">
<td>Q</td>
<td>四半期末頻度</td>
</tr>
<tr class="row-odd">
<td>BQ</td>
<td>営業四半期末頻度</td>
</tr>
<tr class="row-even">
<td>QS</td>
<td>四半期初頻度</td>
</tr>
<tr class="row-odd">
<td>BQS</td>
<td>営業四半期初頻度</td>
</tr>
<tr class="row-even">
<td>A</td>
<td>年末頻度</td>
</tr>
<tr class="row-odd">
<td>BA</td>
<td>営業年末頻度</td>
</tr>
<tr class="row-even">
<td>AS</td>
<td>年初頻度</td>
</tr>
<tr class="row-odd">
<td>BAS</td>
<td>営業年初頻度</td>
</tr>
<tr class="row-even">
<td>BH</td>
<td>営業時間頻度</td>
</tr>
<tr class="row-odd">
<td>H</td>
<td>時間頻度</td>
</tr>
<tr class="row-even">
<td>T, min</td>
<td>分頻度</td>
</tr>
<tr class="row-odd">
<td>S</td>
<td>秒頻度</td>
</tr>
<tr class="row-even">
<td>L, ms</td>
<td>ミリ秒</td>
</tr>
<tr class="row-odd">
<td>U, us</td>
<td>マイクロ秒</td>
</tr>
<tr class="row-even">
<td>N</td>
<td>ナノ秒</td>
</tr>
</tbody>
</table>
</div>
