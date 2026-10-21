---
title: "GCP Storage で静的サイトを公開してみた - 初めてでも簡単に始められました"
date: 2017-04-10T09:20:02
slug: "static-site-on-gcp-storage"
tags: ["GCP"]
categories: ["Blog"]
draft: false
---

Google Cloud Storage に静的サイトを置きたいけれど、どこから手をつければいいかわからない、という方はいませんか？ 友だちとファイルを共有するたびに Storage にアップロードして「公開」を押すのは面倒ですよね。この数日、仕事の必要があって調べてみました。最初は、ドメインを設定してファイルを共有するだけでいいと思っていました。しかし調べてみると、ほかにも細かいコツがたくさんあることがわかりました。たとえば、アップロードするたびにファイルを公開設定するのは本当に面倒ですが、バケットに設定しておけば、新しくアップロードされたファイルはデフォルトで公開されるようにできます。インデックスや 404 ページのデフォルトのファイル名も設定できます。さらに、解決策がないと思っていた SSL の問題にも、公式ドキュメントに良い解決策が載っていました！


<!--more-->


詳しくは公式ドキュメント <a href="https://cloud.google.com/storage/docs/hosting-static-website">Hosting a Static Website</a> を参照してください。内容はとても充実しています。ここでは簡単に説明し、私の感想も共有します。

gsutil ツールは必ずインストールしておく必要があります。まだインストールしていない方は、こちらからどうぞ：<a href="https://cloud.google.com/sdk/docs/">Install the Google Cloud Tools</a>。

この記事では次の内容を取り上げます。
<ul>
 	<li>Storage で自分のドメインを設定する</li>
 	<li>独自ドメイン + SSL</li>
 	<li>アップロードしたファイルをデフォルトで公開にする
<ul>
 	<li>現在のファイルをすべて公開にする</li>
</ul>
</li>
 	<li>index と 404 のデフォルトのファイル名を設定する</li>
</ul>
<h2>独自ドメイン</h2>
Storage では公開ファイル用の URL が一つ提供されています。たとえば次のようなものです。
<blockquote>https://storage.googleapis.com/s.ntust.me/ncc.png</blockquote>
しかし、Storage にWebサイトをデプロイするなら、この URL は使いたくないと思うでしょう。やはり自分のドメインを紐づけたいですよね！

まず、紐づけたいドメインを Google ウェブマスターツールで所有権を確認し、そのドメインの CNAME を設定します。
<pre>s.ntust.me  CNAME  c.storage.googleapis.com</pre>
次に、バケットを作成します。名前はドメインと同じにする必要があります。これで完了です！

ファイルをアップロードして公開に設定してみてください。公開リンクは依然として Google のデフォルトのものになりますが。
<blockquote>http<span style="color: #ff0000;">s</span>://<span style="color: #ff0000;">storage.googleapis.com/</span>s.ntust.me/ncc.png</blockquote>
少し修正するだけです。https を http に変えて、storage.googleapis.com を取り除けばOKです。自分のドメインにファイルのパスを付けただけの形になります！
<blockquote>http://s.ntust.me/ncc.png</blockquote>
<h2>SSL</h2>
お気づきのとおり、独自ドメインでは SSL が使えません。これはまさに差別待遇ですね！！ ただ、心配はいりません。公式ドキュメントにも解決策があります。Cloudflare などの CDN は SSL 機能を提供しています。ドメインを CDN に紐づけて、CDN から Storage へトラフィックを転送させればよいのです！
<h2>アップロード後に自動で公開する</h2>
Storage にファイルをアップロードするたびに「公開共有」を設定しなければならないのが、いちばん面倒です。ファイルが多かったり、フォルダーがあったりすると、本当に嫌になります。また、同じ名前のファイルを上書きアップロードした場合も、もう一度設定する必要があります。ただ、gsutil を使えばこの問題を処理する方法がたくさんあります！

バケットに新しくアップロードされたファイルをデフォルトで公開にします。これはバケット単位でしか設定できず、既存のファイルには遡って適用されません。
<pre> gsutil defacl set public-read gs://s.ntust.me</pre>
特定のフォルダー（またはバケット）配下のすべてのファイルとディレクトリを公開にします。
<pre>gsutil acl set -r public-read gs://s.ntust.me/iatp</pre>
<h2>index と 404 ページの設定</h2>
Apace や Nginx では、index.html がデフォルトでホームページとして扱われます。たとえば http://s.ntust.me/ と http://s.ntust.me/index.html は同じものになります。しかし Storage では、この動作は個別に設定しないと有効になりません。また、Storage には 404 Not Found ページを設定する機能もあります。これは、Storage にWebページを置いている私のような人のために作られた機能だと感じました！

次のコマンドで、s.ntust.me バケットのデフォルトのホームページを index.html に、404 ページを 404.html に設定します。
<pre class="prettyprint"><span class="pln">gsutil web </span><span class="kwd">set</span> <span class="pun">-</span><span class="pln">m index</span><span class="pun">.</span><span class="pln">html </span><span class="pun">-</span><span class="pln">e </span><span class="lit">404.html</span><span class="pln"> gs</span><span class="pun">:</span><span class="com">//s.ntust.me</span></pre>
&nbsp;
