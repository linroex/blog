---
title: "Rails Capybara の Feature テストで踏んだ地雷の記録"
date: 2017-01-16T20:32:53
slug: "rails-feature-testing-diary"
tags: ["Rails", "Testing"]
categories: ["Programming"]
draft: false
---

今日を一言で表すなら、「Capybara を初めて学んで、いきなり地雷を踏んだ日」です。テストを 2 つ書くだけで 6 時間以上かかり、途中でさまざまな地雷に出くわしました。この散々な一日を記録しておかないと、今夜は怒りで眠れそうにありません。先に断っておくと、テストを書くのは今回が初めてなので、一部の理解が間違っていたり古かったりするかもしれません。コメントで教えていただければ、すぐに修正します。これは技術記事ではなく、愚痴（怒）の記録です。


<!--more-->


最初に遭遇した問題は、Firefox のバージョンと Selenium webdriver が合わないことでした。同僚によると、Selenium webdriver は最新版の Firefox をサポートしていないそうです。そのため、私と同じように Selenium で Capybara を実行したい場合は、Firefox ESR 版を使ってください。

Firefox ESR：<a href="https://www.mozilla.org/en-US/firefox/organizations/faq/">https://www.mozilla.org/en-US/firefox/organizations/faq/</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-16-下午8.18.30.jpg"><img class="alignnone size-full wp-image-7263" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-16-下午8.18.30.jpg" alt="" width="732" height="429" /></a>

インストールしたら、Capybara が webkit ではなく Firefox を使うように、Firefox ESR の場所を設定することも忘れないでください。パスは次のようになると思うかもしれません。
<pre>/Applications/Firefox\ ESR.app</pre>
最初は私もそう考えていました。しかし、後になってテストが真っ赤になり、エラーメッセージを見るかぎり JavaScript のエラーのようでした。3 時間以上かけて Git のコミットを一つずつさかのぼり、ようやくエラーが入ったコミットを見つけました。それでも、コードを 1 行ずつ 3 回チェックしても問題が見つからず……。エラーになったコードは、だいたい次のようなものでした。
<pre>function hi(name="") {
  console.log(name)
}</pre>
このコードを長いこと見返しました。Chrome と Firefox でテストしても成功していましたし、そもそも Firefox ESR で実行されるはずではなかったのでしょうか？ 私が Firefox ESR を開いても、エラーは 1 つもありませんでした。Capybara はいったい何をしているんだ！！！！！

最後に、頼りになる同僚がもう一言教えてくれました。Capybara が使っている webkit は非常に古いバージョンで、デフォルト値の書き方に対応していない、と。

なるほど、なるほど……。そこで注意喚起しておきます。Capybara が原因不明のエラーを出し続けるときは、JS の関数でデフォルト値を使っていないか確認してみてください。QQ
<pre>function hi(name) {
  console.log(name)
}</pre>
でも、それでもおかしいですよね。Capybara は Firefox ESR を使うはずではなかったのか？ なぜ最後に webkit が使われていたのか？ 皆さん、Capybara でブラウザを設定するときは、フルパスを指定する必要があります。たとえば Mac なら次のようになります。
<pre>/Applications/Firefox\ ESR.app/Contents/MacOS/firefox</pre>
やっと解決したと喜んだのも束の間、Firefox に切り替えるとまた真っ赤になりました。ただ、少なくともエラーメッセージは変わりました。今回の問題は、Chrome が新しい仕様をいち早くサポートしすぎていることでした。注意していただきたいのは、JS の累乗演算を、多くの人が次のように書くだろうということです。
<pre>console.log(10**3);</pre>
最新版の Chrome ではこれで完璧に動きますが、Firefox ではエラーになります。安全な書き方は次のとおりです。
<pre>console.log(Math.pow(10, 3));</pre>
** は比較的新しくサポートされた書き方で、現時点では Chrome だけが対応しているようです（泣）。このことからも、テストがとても重要だとわかります。テストをしなければ、これほど多くの問題には気づかなかったでしょう。正直なところ、過去のすべてのブラウザを人の手でテストするのは現実的ではありません。

以上で書き終わりました。これから夕食に行ってきます。
