---
title: "帕斯卡（巴斯卡）三角形公式解！（感謝滄海）"
date: 2011-07-24T08:25:37
slug: "pascal-triangle-formula-solution"
aliases: ["/posts/%e5%b8%95%e6%96%af%e5%8d%a1%ef%bc%88%e5%b7%b4%e6%96%af%e5%8d%a1%ef%bc%89%e4%b8%89%e8%a7%92%e5%bd%a2%e5%85%ac%e5%bc%8f%e8%a7%a3%ef%bc%81%ef%bc%88%e6%84%9f%e8%ac%9d%e6%bb%84%e6%b5%b7%ef%bc%89/"]
tags: ["Math", "PHP"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/210px-PascalTriangleAnimated2.gif"><img title="210px-PascalTriangleAnimated2" src="{{< param imageBase >}}/wp-content/uploads/2011/07/210px-PascalTriangleAnimated2.gif" alt="" width="210" height="194" /></a>

上圖引用自維基，用以解釋帕斯卡三角形

今天要講的是所謂的帕斯卡三角形，也有人稱它楊輝三角形、賈憲三角形，他的第一行、第一個字是「1」，在下來的數字等於「左上、右上相加」，如果左上或右上沒有數字則等於0，例如第二行的數字有兩個「1、1」，再來第三行等於「1、2、1」，並且這個三角形可以無限延伸下去


<!--more-->


關於帕斯卡的維基：<a href="http://goo.gl/nliGj">http://goo.gl/nliGj</a>

但是說實話，上面的原理....  其實跟本次解題的方法沒有太大相關性，因為這個帕斯卡三角形其實是可以透過公式來推算數字的，這點還要感謝<a href="http://jeremy.tfeng.org">滄海</a>告訴我，不然我可能會以為只能笨笨的寫程式，然後左上、右上相加.....

滄海：<a href="http://jeremy.tfeng.org">http://jeremy.tfeng.org</a>
<h2>帕斯卡公式計算</h2>
以下是帕斯卡的計算公式：

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-24_080544.jpg"><img class="alignnone size-large wp-image-601" title="2011-07-24_080544" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-24_080544-540x257.jpg" alt="" width="540" height="257" /></a>

關於n、m的部份則是來自行、列，帕斯卡三角形因為是由數字構成的，所以就可以分出所謂的第幾行、第幾列，並且一切數字從0開始，行數=n，列數=m，另外n!跟m!是指「階層運算」，也就是1*2*3....*n、m的意思

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/pascal_02.jpg"><img class="alignnone size-full wp-image-602" title="pascal_02" src="{{< param imageBase >}}/wp-content/uploads/2011/07/pascal_02.jpg" alt="" width="500" height="500" /></a>

公式看懂之後.... 就直接寫程式吧XD 因為有公式的話那這一切其實很好寫0.0

PS.感謝網友HyDroGen指正，上圖的（5,4）應該是5才對，不是15
<h2>PHP程式碼</h2>
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
