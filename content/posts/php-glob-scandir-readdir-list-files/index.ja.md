---
title: "【PHP】glob、scandir、readdir でフォルダ内のファイル一覧を取得する"
date: 2011-08-17T17:27:32
slug: "php-glob-scandir-readdir-list-files"
tags: ["PHP"]
categories: ["Programming"]
draft: false
---

PHP のプログラムで、指定したフォルダ内のファイル一覧を取得したい場面があります。たとえば、オンラインハードディスクのプログラムを作っていたときには、この機能が必要でした。ここでは、この機能を実現できる三つの関数を紹介します。使い方は少しずつ異なります。三つの関数とは、glob、scandir、readdir です。


<!--more-->


<strong>P.S. ご指摘くださった読者の蒼時弦さん、白目捷さんに感謝します :)</strong>
<h2>一、glob</h2>
個人的には glob をおすすめします。「ワイルドカード文字」を含む文字列を引数に使って、ファイル一覧を取得できます。たとえば ./temp の中に txt ファイルが 5 つ、jpg ファイルが 10 個あるとします。ここで jpg ファイルの一覧だけがほしい場合は、glob('./temp/*.jpg'); と書きます。すると、jpg ファイルの一覧を含む配列が返ります。すべてのファイルを取得したい場合の構文は、glob(./temp/*.*); です。

書式：glob($pattern);

$pattern は……そうですね、フォルダのパスとして理解していただいて問題ありません。前述のとおり、ワイルドカードも使えます。

例：
<pre lang="php">glob('./temp/*.txt');     //拡張子が txt のファイルだけを取得します
glob('./temp/*.jpg');     //拡張子が jpg のファイルだけを取得します</pre>
また、glob の第二引数では配列の並び順を指定できます。詳しくは公式サイトをご覧ください：<a href="http://php.net/manual/en/function.glob.php">http://php.net/manual/en/function.glob.php</a>
<h2>二、scandir</h2>
scandir も便利な関数です。戻り値も配列で、戻り値の最初の要素は「.」（現在のフォルダ）、二番目の要素は「..」（一つ上のフォルダ）です。ただし、glob のようにファイル形式を指定することはできません。scandir の書式は次のとおりです。
<pre lang="php">scandir($dir_address);</pre>
例：
<pre lang="php">scandir('./temp');
/*
./temp の下にあるすべてのデータを取得します。jpg が 10 個、txt が 5 個含まれます
*/</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172659.jpg"><img class="alignnone size-large wp-image-692" title="2011-08-17_172659" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172659-540x267.jpg" alt="" width="540" height="267" /></a>
<h2>三、readdir</h2>
readdir は、一時期は本当に必要なのかと疑ってしまったほど使いにくい関数です。使い方が面倒で、機能も glob ほど強力ではありません。使うには、まずフォルダを開き（opendir）、そのハンドルを readdir に渡す必要があります。使い終わったら closedir も呼ばなければなりません。この手間に加えて、戻り値は String で、呼び出すたびに一件ずつ読み込みます。つまり、最初の呼び出しでは最初のファイルのデータが、二回目の呼び出しでは二件目のデータが得られます。動作は mysql_fetch_row と同じです。戻り値の形式は scandir と同じく、最初が「.」、二番目が「..」です。

公式ドキュメント：<a href="http://php.net/manual/en/function.readdir.php">http://php.net/manual/en/function.readdir.php</a>

例：
<pre lang="php">$handle=opendir('C:UserslinroexDropboxmusic');
while(false!==($file=readdir($handle))){
	echo $file . '</ br>';
}

closedir($handle);</pre>
<p lang="php"><a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172425.jpg"><img title="2011-08-17_172425" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-17_172425-540x321.jpg" alt="" width="540" height="321" /></a></p>
