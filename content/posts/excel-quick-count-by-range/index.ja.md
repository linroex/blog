---
title: "Excel で異なる区間の件数をすばやく計算する方法"
date: 2017-08-03T02:42:37
slug: "excel-quick-count-by-range"
tags: ["Excel"]
categories: ["Software"]
draft: false
---

データ分析をするときは、データをいくつかの区間に分けて傾向を観察することがよくあります。例えば、生徒を 80〜100 点、60〜80 点、不合格に分けて、それぞれのグループの人数を数えて分析する場合です。そんなときに役立つのが、Excel（Google スプレッドシート）の FREQUENCY 関数です！


<!--more-->


FREQUENCY 関数を知らなかった頃は、SQL の文に IF をたくさん書いて、似たような区間計算を実現していました。SQL は強力ですが、身の回りのツールを組み合わせることのほうが大切です！ SQL で処理するほうが楽なこともあれば、Excel で処理するほうが楽なこともあります。例えばこの「区間ごとの人数計算」は、Excel のほうが便利な好例です！
<pre>FREQUENCY(data_array, bins_array)</pre>
FREQUENCY 関数は 2 つの引数を取ります。この例では、data_array が生徒の成績の列（成績の列だけで十分です）、bins_array が区間の基準となる列です。FREQUENCY の戻り値も配列なので、関数を各列にコピーする必要はなく、自動的に埋めてくれます！

E2 セルに次の数式を入力するだけで、E3、E4、E5、E6 にも自動的にデータが入ります。とても便利ですよね！ 「基準」の列のデータとも自動的に対応させてくれます。下の図を例にすると、E2 には 100 以上の人数、E3 には 100〜80 の人数、E4 には 80〜60 の人数が入ります。そして E6 はもちろん、0 未満の人数です！
<pre><span class=" default-formula-text-color" dir="auto">=</span><span class=" default-formula-text-color" dir="auto">FREQUENCY</span><span class=" default-formula-text-color match-paren" dir="auto">(</span><span dir="auto">B2:B7</span><span class=" default-formula-text-color" dir="auto">,</span> <span dir="auto">D2:D5</span><span class=" match-paren default-formula-text-color" dir="auto">)</span></pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2017/08/螢幕快照-2017-08-03-上午2.39.12.jpg"><img class="alignnone size-full wp-image-7653" src="{{< param imageBase >}}/wp-content/uploads/2017/08/螢幕快照-2017-08-03-上午2.39.12.jpg" alt="" width="554" height="218" /></a>

FREQUENCY 関数がエラーを返す場合は、結果が出力される位置に他のデータがないか確認してください。関数は配列を返して、N 行を自動的に埋めます。そのため、その位置に別のデータがあるとエラーになります。
