---
title: "【C++】STL 組み込みの sort() 関数で並べ替えを行う！"
date: 2011-08-25T10:30:09
slug: "c-stl-sort-function"
tags: ["C++"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-25_102642.jpg"><img class="alignnone size-large wp-image-724" title="2011-08-25_102642" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-25_102642-540x352.jpg" alt="" width="540" height="352" /></a>

並べ替えは、プログラミングを学ぶ人なら誰もが身につけるべき基本です。多くのデータ処理がこれに依存しているからです。多くのプログラミング言語では並べ替えの関数が組み込まれていて、開発者が手軽に使えるようになっています。しかし、C++ にも組み込みの並べ替え関数があることは、あまり知られていないのではないでしょうか！


<!--more-->


C++ の組み込み並べ替え関数は「algorithm」ヘッダーに含まれています。標準規格の一部なので、プラットフォームを問わず使えます。また、この関数は戻り値がありません。渡したデータをそのまま並べ替えて、元の変数に結果が残ります。

使う前に、algorithm ヘッダーを読み込んでおいてください。

<strong>sort 関数の書式：</strong>

sort(array_begin,array_end);

array_begin は並べ替えを始める位置、array_end は並べ替えの終わりの位置です。この説明だけではわかりにくいですよね。例として、要素数 8 の配列全体を並べ替えたい場合を考えます。
<pre lang="cpp">int x[8]={1,3,5,2,4,6,9,0};</pre>
上の行で配列 x を宣言しています。次に：
<pre lang="cpp">sort(x,x+8);</pre>
上の行は、もっとも簡単な並べ替えの書き方です。配列 x の先頭から末尾までを並べ替える、という意味です。このとき x の中身は {0,1,2,3,4,5,6,9} になります。

では、x の先頭 4 つだけを並べ替えたい場合はどうでしょうか。
<pre lang="cpp">sort(x,x+4);</pre>
並べ替え前：x={1,3,5,2,4,6,9,0}、並べ替え後：x={1,2,3,5,4,6,9,0}

この並べ替えが影響するのは 1〜4 番目だけで、5〜8 番目は変わらない点に注意してください。

sort() は、既定では昇順（小さい順）に並べ替えます。降順（大きい順）にしたい場合はどうすればよいでしょうか。これも簡単で、reverse で配列を反転させればよいのです。

reverse の書式は sort と似ていて、こちらも戻り値はありません。

<strong>reverse の書式：</strong>

reverse(array_begin,array_end);

引数については改めて説明しません。さっそく例を見ていきましょう：
<pre lang="cpp">int x[8]={1,3,5,2,4,6,9,0};
sort(x,x+8);</pre>
このとき x={0,1,2,3,4,5,6,9} で、これは昇順です。次に reverse で降順に変えます：
<pre lang="cpp">reverse(x,x+8);</pre>
このとき x={9,6,5,4,3,2,1,0} になります。

ここまでの例はすべて、x と x+8 で始点と終点を直接指定しています。しかし実際にプログラムを書くときは、配列の長さがあらかじめわからないことがよくあります。そのような場合はどうすればよいのでしょうか。ここまでの書き方はわかりやすさを優先したため、厳密には正しくありません。以下が本当に良い書き方です！

<strong>正しい書き方のヒント：sizeof で配列の長さを計算する</strong>

例：
<pre lang="cpp">int x[8]={1,3,5,2,4,6,9,0};
int x_end=sizeof(x)/sizeof(int);
sort(x,x+x_end);</pre>
上のコードでは sizeof を使って配列の長さを取得しています。この方法はよく使われるので、ぜひ覚えておいてください！ sizeof() は変数が占めるメモリのバイト数を返します。その値を要素の型のサイズで割ると、配列の長さが得られます。

<strong>完全なサンプルコード：</strong>
<script type="text/javascript" src="http://pastie.org/2425741.js"></script>
完全なサンプルのダウンロード：<a href="http://www.box.net/shared/2ooq6suo53s2k8jbtp5j" target="_blank">Box.net</a>｜<a href="http://www.4shared.com/file/XMfZrnFj/cpp_stl_sort.html" target="_blank">4Shared</a>｜<a href="https://docs.google.com/viewer?a=v&amp;pid=explorer&amp;chrome=true&amp;srcid=0B7dzHNV9vYfOYjJhY2MyNjEtOWZkZS00YzUzLTkyMjUtYjhlOWYzZjFlYmQ3&amp;hl=zh_TW" target="_blank">Google</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/cpp_stl_sort.zip">Dropbox</a>

&nbsp;
