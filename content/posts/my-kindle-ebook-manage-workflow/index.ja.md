---
title: "私の Kindle 電子書籍管理ワークフロー"
date: 2019-05-18T00:56:28
slug: "my-kindle-ebook-manage-workflow"
tags: ["Kindle", "E-books", "Calibre"]
categories: ["Hardware"]
images: ["%%IMG%%/wp-content/uploads/2019/05/nemichandra-hombannavar-131171-unsplash.jpg"]
draft: false
---

<p>Kindle を使っている人なら、それぞれ電子書籍の管理の流れを持っているのではないでしょうか。本を買う、ライブラリを整理する、Kindle に送る、バックアップを取る、といった作業を繰り返すうちに、自分なりの流れができあがっていきます。最初は私も多くの人と同じように Calibre で電子書籍ファイルを管理していました。しかし 2 台目の Kindle を手に入れてから、Calibre だけで管理して USB でリーダーに転送する方法には、次のような不便な点があると感じるようになりました。</p>
<!--more-->



<ul><li>読書の進捗やメモなどが同期されず、Kindle が複数台あるととても不便です。また Kindle を買い替えるとき、古い読書記録やメモをバックアップできません。</li><li>パソコンが複数台あると、前回どのパソコンで電子書籍を処理したのか混乱しやすく、Kindle の中に同じ本が何冊も入ってしまいます。</li><li>新しい Kindle リーダーに替えるたびに、本を Collection に分類し直す必要があります。</li></ul>
<p>さらに最近、Kindle にようやく「既読・未読」で本を絞り込む機能が追加されました。未読の本だけを一覧できるのですが、既読・未読の状態もバックアップや同期ができません。そこで、バックアップと同期の問題、そしてノートパソコンとデスクトップパソコンの間で電子書籍ファイルを管理する問題を解決する方法を探そうと決心しました。</p>
<p>Kindle を使っている方なら「Personal Document E-mail」という機能をご存じでしょう。MOBI、TXT、PDF 形式のファイルを Amazon が指定する専用のメールアドレスに送り、Kindle で Wi-Fi をオンにすると、ファイルが自動的にダウンロードされます。さらに、メールで送ったファイルは「Amazon で購入した電子書籍と同じ扱い」になります。つまり、読書の進捗、メモ、既読状態を自動でバックアップし、別の端末とも同期できます。スマートフォンのアプリでもメモを手軽に確認でき、新しいリーダーに替えたときも、iCloud のバックアップから復元するように、すべての本を簡単にダウンロードできます。</p>
<p>私が今おすすめしている方法は、IFTTT と Personal Document E-mail を組み合わせるものです。Dropbox のフォルダーにファイルが追加されると、自動的に Amazon の指定メールアドレスへ送信されます。ファイルはメールで Kindle に届くため、メモの同期やバックアップの問題を解決できます。また、Dropbox で管理するので、電子書籍ファイルがノートパソコンとデスクトップのどちらにあるのかを気にする必要もありません。Dropbox がノートパソコンからデスクトップへ自動で同期してくれるからです。Calibre については、ファイル変換を専門に担当する役割に退いてもらいました。Calibre には電子書籍を一切入れておらず、ライブラリの一覧は空っぽです。</p>
<p>この方法の利点は次のとおりです。</p>
<ul><li>書籍の同期は Dropbox が担当するので、電子書籍ファイルがノートパソコンとデスクトップのどちらにあるかを気にする必要がありません。</li><li>自分で用意した電子書籍（Amazon で購入したものではないもの）でも、読書の進捗、メモ、既読状態の同期を利用できます。</li><li>Kindle が故障して新しいリーダーに買い替えても、以前取ったメモが消えてしまう心配がありません。</li></ul>
<p>それでは実際に設定していきましょう！</p>
<p>まず、Amazon のウェブサイトで「Your devices and content」にアクセスし、設定を行って専用の Kindle メールアドレスを取得します。</p>
<p></p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.26.10.png" alt="" class="wp-image-7704"/></figure>
<p>「Preferences」を開き、次の項目を有効にします。</p>
<ul><li>Device Synchronization (Whispersync Settings)</li><li>Personal Document Settings - Personal Document Archiving </li></ul>
<p>続いて、ご自身のメールアドレスを「Approved Personal Document E-mail List」に追加します。</p>
<p>Device タブでは、登録した各リーダーに対応する専用のメールアドレスを確認できます。形式に合った電子書籍ファイルをこのアドレスに送っておくと、対応する Kindle が Wi-Fi に接続したときに自動的にダウンロードされます。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.34.30.png" alt="" class="wp-image-7705"/></figure>
<p>次に <a href="https://ifttt.com/discover">IFTTT</a> でアカウントを登録し、「My Applets」→「New Applet」をクリックして新しいプログラムを作成します。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.41.25.png" alt="" class="wp-image-7706"/></figure>
<blockquote class="wp-block-quote"><p>IFTTT は、とても面白い（うまく言い表せないのですが）サービスです。少しの手間で、問題を解決する簡単なプログラムを書くことができます。IFTTT はすべてのサービスを Trigger と Action の 2 つに分けています。たとえば「Dropbox にファイルが届いたとき」を Trigger に設定し、それに対応する Action として、メールを送る、Facebook に投稿するなどを設定できます。IFTTT には Dropbox、Facebook、Twitter、Google などのサービスが組み込まれており、1 行もコードを書かずに自分だけの自動化を作ることができます。</p></blockquote>
<p>「this」をクリックして「Dropbox」を検索し、「New file in your folder」を選択します。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.40.44.png" alt="" class="wp-image-7707"/></figure>
<p>次に IFTTT から「フォルダーを指定しますか？」と聞かれます。指定したフォルダーにファイルが追加されたときにだけ、後続のアクションが実行されます。私は「Kindle」という名前のフォルダーを作成し、すべてのファイルをこのフォルダーに入れています。</p>
<p>最後に「Create Trigger」を押せば、最初のステップの設定は完了です。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.40.50.png" alt="" class="wp-image-7708"/></figure>
<p>次は、最初の「if ... then ...」の画面に戻ります。「then」の後ろにある「that」をクリックしてください。これは「Dropbox の指定フォルダーにファイルがアップロードされたとき」に行う処理を指定することを意味します。</p>
<p>「Gmail」を検索して選択してください。初めて使う場合、IFTTT から Gmail との連携を求められるので、連携を済ませます。その後、「Send an email」を選択します。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.47.01.png" alt="" class="wp-image-7709"/></figure>
<p>次に「To Address」の欄に、Kindle 専用のメールアドレスを入力します。メールの件名などその他の設定は好みに合わせて構いません。「Attachment URL」は初期値の「FileUrl」のままで大丈夫です。</p>
<p>設定が終わったら「Create Action」を押してください！</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.48.15.png" alt="" class="wp-image-7710"/></figure>
<p>最後に、作成した自動化の小さなプログラムに名前を付けられます。初期設定では「If New file in your folder <em>kindle</em>, then Send an email from <em>admin@gmail.com</em>」のような名前になります。</p>
<figure class="wp-block-image"><img src="{{< param imageBase >}}/wp-content/uploads/2019/05/螢幕快照-2019-05-18-上午12.52.08.png" alt="" class="wp-image-7711"/></figure>
<p>これで設定はすべて完了です！ 次は Calibre で電子書籍を MOBI 形式に変換してから、指定した Dropbox フォルダーに思い切ってドラッグしてください。Kindle リーダーの Wi-Fi をオンにして、ファイルのアップロードが終わると、リーダーも同時にダウンロードを始めてくれるので、きっと驚かれるはずです。まるで魔法のようです！ 同じ方法は Google Drive など、普段お使いのほかのオンラインストレージとも組み合わせられますよ！</p>
