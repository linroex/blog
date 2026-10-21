---
title: "Solving Pascal's Triangle with a Formula! (Thanks to Cang Hai)"
date: 2011-07-24T08:25:37
slug: "pascal-triangle-formula-solution"
tags: ["Math", "PHP"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/210px-PascalTriangleAnimated2.gif"><img title="210px-PascalTriangleAnimated2" src="{{< param imageBase >}}/wp-content/uploads/2011/07/210px-PascalTriangleAnimated2.gif" alt="" width="210" height="194" /></a>

The image above is from Wikipedia and is used to explain Pascal's triangle.

Today's topic is the so-called Pascal's triangle. Some people also call it Yang Hui's triangle or Jia Xian's triangle. The first row's first entry is "1". Each number below equals the sum of the number to its upper left and the number to its upper right. If there is no number to the upper left or upper right, it counts as 0. For example, the second row has two numbers, "1, 1". The third row is "1, 2, 1". And this triangle can extend infinitely.


<!--more-->


Wikipedia article on Pascal: <a href="http://goo.gl/nliGj">http://goo.gl/nliGj</a>

To be honest, though, the principle above.... isn't really related to the method used to solve this problem. That's because the numbers in Pascal's triangle can actually be calculated with a formula. I have to thank <a href="http://jeremy.tfeng.org">Cang Hai</a> for pointing this out. Otherwise, I might have thought I could only dumbly write a program that adds the upper left and upper right numbers.....

Cang Hai: <a href="http://jeremy.tfeng.org">http://jeremy.tfeng.org</a>
<h2>Calculating with Pascal's Formula</h2>
Here is Pascal's calculation formula:

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-24_080544.jpg"><img class="alignnone size-large wp-image-601" title="2011-07-24_080544" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-24_080544-540x257.jpg" alt="" width="540" height="257" /></a>

As for n and m, they come from the row and column. Because Pascal's triangle is made of numbers, you can identify which row and which column each number is in. All numbers start counting from 0, so row number = n and column number = m. Also, n! and m! refer to factorials, which means 1*2*3....*n (and likewise for m).

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/pascal_02.jpg"><img class="alignnone size-full wp-image-602" title="pascal_02" src="{{< param imageBase >}}/wp-content/uploads/2011/07/pascal_02.jpg" alt="" width="500" height="500" /></a>

Once you understand the formula.... just go ahead and write the program XD Because with a formula, all of this is actually very easy to write 0.0

P.S. Thanks to reader HyDroGen for the correction. The (5,4) in the image above should be 5, not 15.
<h2>PHP Code</h2>
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
