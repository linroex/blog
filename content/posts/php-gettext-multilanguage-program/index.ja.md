---
title: "Gettext for PHP で多言語対応のプログラムをすばやく作る"
date: 2011-07-18T22:47:40
slug: "php-gettext-multilanguage-program"
tags: ["PHP", "Gettext"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_224707.jpg"><img class="alignnone size-large wp-image-555" title="2011-07-18_224707" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_224707-540x378.jpg" alt="" width="540" height="378" /></a>

Gettext は GNU が公開している……うーん、どう説明すればよいのか迷いますが、規格のようなものであり、ライブラリの集まりでもあります。とにかく、プログラムを多言語対応にするのがとても簡単になります～ この記事では、Gettext を PHP で使い、多言語対応のプログラムやウェブサイトを開発する方法を説明します。


<!--more-->
GNU Gettext プロジェクトの URL：<a href="http://www.gnu.org/s/gettext/">http://www.gnu.org/s/gettext/</a>

以前、プログラムを多言語対応にするには、主に次の方法がありました。一つ目は、外部の言語ファイルを読み込んでプログラム内部の文字列を置き換える関数を自分で書く方法で、Imgburn などがこの方式です。二つ目は、本体のプログラムを逆コンパイルして書き換える方法です。一つ目の欠点は、言語ファイルを読み込む関数を自分で書かなければならないことです。二つ目の欠点は、逆コンパイルがやや面倒で、著作権の問題もあることです。

ここで紹介する Gettext は、一つ目の方法に近い原理で、言語ファイルを読み込んで多言語対応を行います。しかし、利点は関数がすでに用意されていることです～ さらに、言語ファイルの形式が広く使われているため、翻訳者があなたのプログラムを翻訳したいと思ったときに、言語ファイルの形式を個別に調べる必要がありません。

Gettext は、C++、Python、Java、PHP など、多くの言語で使えます。また、多くのプログラムがサポートしています。たとえば、有名な CMS である WordPress も Gettext を使って多言語対応を実現しています。ただし、その方法はこの記事とは少し違います。WordPress は独自の関数で Gettext の言語ファイルを読み込んでいるのです。

P.S. Gettext の言語ファイルは .po と .mo のファイルです。.po は翻訳者が読むためのもので、.mo はプログラムが読むためのものです。言語ファイルの作成には Poedit というソフトが使えます。これについては後日、チュートリアルを書く予定です。

ここからは、PHP で Gettext を使う簡単な方法を紹介します。
<h2>Gettext for PHP</h2>
1. まず、PHP の設定ファイル（php.ini）を開き、gettext を有効にします。

変更前：【;extension=php_gettext.dll】→ 変更後：【extension=php_gettext.dll】

P.S. 先頭のセミコロンを削除するだけです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_223826.jpg"><img class="alignnone size-large wp-image-554" title="2011-07-18_223826" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_223826-540x425.jpg" alt="" width="540" height="425" /></a>

2. サーバーに gettext_demo という名前のフォルダを作成します。そのフォルダの中にファイル（index.php）を作成し、次の内容を入力します。
<script src='http://pastie.org/2231997.js'></script>
上のコードの簡単な説明です。
<ul>
	<li>textdomain() はプロジェクト名を設定します。名前は自由に決めてかまいませんが、後で作る言語ファイルの名前はここで設定した名前と一致させる必要があります。</li>
	<li>bindtextdomain() は言語ファイルの保存場所を設定します。上のコードでは、言語ファイルは Languages フォルダの下に保存されることになります。</li>
	<li>putenv と setlocale の二つの関数は「表示する言語」を設定します。たとえば、もともと中国語でプログラムを開発していて、今回英語で表示したい場合は en_US を設定します。簡体字中国語で表示したい場合は zh_CN を設定します。形式は例のとおりにしてください。</li>
	<li>gettext() は多言語対応したいテキストに使います。gettext 関数は言語ファイルを自動的に確認します。言語ファイルに gettext の引数と同じ文字列があれば、言語ファイルの文字列を表示します。なければ、gettext の引数をそのまま表示します。この例では、関数が言語ファイルに「測試gettext」と「逐風者」という二つの文字列の対応する訳があるかどうかを確認します。対応する訳があれば gettext 関数は言語ファイルの文字列を表示し、なければ「測試gettext」と「逐風者」をそのまま表示します。</li>
	<li>_() は gettext() の略記です。開発者の便宜を考えて作られたもので、アンダースコアで gettext を表せるため、コードを書くときの入力がかなり減ります。</li>
</ul>
3. 次に、gettext_demo フォルダの下に Language フォルダを作成し、その下に en_US フォルダを作成します。最後に、en_US の下に LC_MESSAGES フォルダを作成します。

全体のパスは次のようになります：gettext_demo/Language/en_US/LC_MESSAGES

4. 言語ファイルを ./gettext_demo/Language/en_US/LC_MESSAGES の下に置きます。

言語ファイルは Poedit で作成するか、プロジェクトファイルの中にある、私が作成した簡単な言語ファイルを使ってください。

この記事では英語の言語ファイルを例にしているので、en_US の下に置いています。将来、簡体字中国語版を作る場合は zh_CN に変更します。その場合、パスは gettext_demo/Language/zh_CN/LC_MESSAGES になります。

また、「Language」の部分は bindtextdomain() の設定によって決まります。たとえば Languages($project_name,'lan'); と設定した場合、言語ファイルは Language ではなく lan フォルダに置く必要があります。これらは各自で調整してください。

最後に、以前ずっと正しく処理できていなかった点があります。言語ファイルの命名規則は、testdomain() で設定した名前を使うというものです。たとえば textdomain('xxx') と設定した場合、言語ファイルは xxx.mo と xxx.po という名前にしなければなりません。しかも、どの言語の言語ファイルも同じ命名規則です！ 以前は WordPress の影響で、zh_TW.po や zh_TW.mo のような名前だと思い込んでいました……読者の方に指摘されて、やっと違うことに気づきました XD

プロジェクトファイルのダウンロード：<a href="https://docs.google.com/viewer?a=v&amp;pid=explorer&amp;chrome=true&amp;srcid=0B7dzHNV9vYfOZTQ2MWZlYzEtN2RhYS00ZjYwLTllZDEtOTQ5NTNlZDVjMTFi&amp;hl=zh_TW" target="_blank">Google</a>｜<a href="http://www.4shared.com/file/HaCLICB-/gettext_demo.html " target="_blank">4Shared</a>｜<a href="http://www.box.net/shared/uk679f32278822jkak4l" target="_blank">Box.net</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/gettext_demo.zip" target="_blank">Dropbox</a>

P.S. プロジェクトファイルはそのままサーバーにインストールして試せます。PHP の設定を有効にするのを忘れないでください。そうしないと動作しません。
