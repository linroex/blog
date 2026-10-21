---
title: "パスカル（巴斯卡）の三角形の公式解！（滄海さんに感謝）"
date: 2011-07-24T08:25:37
slug: "pascal-triangle-formula-solution"
tags: ["Math", "PHP"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/210px-PascalTriangleAnimated2.gif"><img title="210px-PascalTriangleAnimated2" src="{{< param imageBase >}}/wp-content/uploads/2011/07/210px-PascalTriangleAnimated2.gif" alt="" width="210" height="194" /></a>

上の図はウィキペディアから引用したもので、パスカルの三角形を説明するためのものです。

今回取り上げるのは、いわゆるパスカルの三角形です。楊輝三角形、賈憲三角形とも呼ばれています。一番上の行の最初の数字は「1」で、その下の数字は「左上と右上の数字の和」になります。左上または右上に数字がない場合は、0とみなします。たとえば2行目には「1、1」の2つの数字があり、3行目は「1、2、1」になります。この三角形は無限に広がっていきます。


<!--more-->


パスカルのウィキペディア記事：<a href="http://goo.gl/nliGj">http://goo.gl/nliGj</a>

ただ正直に言うと、上の原理は....  実は今回の解き方とはあまり関係がありません。このパスカルの三角形の数字は、実は公式で計算できるからです。これは<a href="http://jeremy.tfeng.org">滄海</a>さんに教えていただきました。そうでなければ、左上と右上の数字を足し合わせるという愚直なプログラムを書くしかないと思っていたかもしれません.....

滄海：<a href="http://jeremy.tfeng.org">http://jeremy.tfeng.org</a>
<h2>パスカルの公式による計算</h2>
以下がパスカルの計算公式です：

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-24_080544.jpg"><img class="alignnone size-large wp-image-601" title="2011-07-24_080544" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-24_080544-540x257.jpg" alt="" width="540" height="257" /></a>

n と m は、それぞれ行と列に対応しています。パスカルの三角形は数字で構成されているので、何行目・何列目かを区別できます。また、数字はすべて0から数えます。つまり、行数＝n、列数＝m です。さらに、n! と m! は階乗のことで、1*2*3....*n（m についても同様）を意味します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/pascal_02.jpg"><img class="alignnone size-full wp-image-602" title="pascal_02" src="{{< param imageBase >}}/wp-content/uploads/2011/07/pascal_02.jpg" alt="" width="500" height="500" /></a>

公式がわかったら.... あとは素直にプログラムを書きましょう XD 公式があれば、これらすべてはとても簡単に書けるのです 0.0

P.S. 読者の HyDroGen さんのご指摘に感謝します。上の図の（5,4）は、15 ではなく 5 が正しいです。
<h2>PHP のコード</h2>
<a href="http://pastie.org/2259899">http://pastie.org/2259899</a>
<pre lang="php"><?php
   for($a=0;$a<=10;$a++){
       for($aa=0;$aa<=$a;$aa++){
           echo pascal($a,$aa);
           echo '  ';
       }
       echo 'n';
   }
?>
<?php
   function pascal($n,$m){
       return factorial($n)/((factorial($m)*factorial($n-$m)));
   }

   function factorial($x){
       $temp=1;
       for($i=1;$i<=$x;$i++){
           $temp*=$i;
       }
       return $temp;
   }
?></pre>
