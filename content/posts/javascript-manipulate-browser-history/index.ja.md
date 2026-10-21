---
title: "JavaScript でブラウザの履歴を操作し、URL を変更して、戻るボタンのイベントを扱う（SPA に必須）"
date: 2017-01-14T12:59:02
slug: "javascript-manipulate-browser-history"
tags: ["JavaScript", "HTML"]
categories: ["Programming"]
draft: false
---

今や JavaScript はどこにでもあります。Ajax、ページの切り替え、ポップアップウィンドウなど、JS でウェブページを操作することはますます一般的になっています。React JS や Vue JS など、Single Page Application（SPA）の開発を支援する JS フレームワークまで登場しています。JS でウェブページを操作するときに一番怖いのは、URL の変化と履歴です。たとえば jQuery でページを切り替えても、JS の操作なので URL は変わりません。さらにユーザーがブラウザ左上の「戻る」ボタンを押すと、履歴に JS の操作が記録されていない（実際には記録できない）ため、まったく別のページに戻ってしまいます。この一連の問題を解決するには、HTML5 が提供する history.pushState、history.replaceState、そして onpopstate イベントを使えます。


<!--more-->


React JS や Vue JS のようなフレームワークを使っている場合、たとえば vue-router のような対応パッケージがあり、SPA の厄介な URL の問題を処理してくれることがよくあります。その裏側も、JS で history を変更する仕組みで動いています。ただ、頼れるツールがないときは、ゼロから作るしかありません。もちろん、この記事で挙げた問題を解決できる JS プラグインは多くあるはずです。しかし、もっと大切なのはその背後にある原理を理解して、応用できるようにすることです。

では、pushState、replaceState、onpopstate でどんな問題を解決できるのでしょうか？ 私が思いついたものをいくつか挙げてみます。ただし、これらの中心となる考え方は、ブラウザの履歴と URL を変更することだということを忘れないでください。その中心の考え方から、さらに多くの使い道を思いつくことができます。私が挙げた可能性だけにとらわれる必要はありません。
<ul>
 	<li>JS でページを操作したら、それに合わせて URL も変わるようにすれば、ユーザーがコピーしたり共有したり保存したりしやすくなります。ただし、ページの読み込み時には URL の内容を解析して、プログラムが正しい場所に移動するようにすることも忘れないでください。URL を表示することと、その URL から同じ内容へ戻れることの両方が大切です。</li>
 	<li>単に URL が見た目に良くないので、きれいな URL を偽装したいと思うかもしれません。ただし、ユーザーがこの URL をコピーして友人に送ったとき、相手は内容を正しく見られるかどうかを考えておいてください。</li>
 	<li>ページ独自の「前へ」「次へ」ボタンがあり、JS で動的にコンテンツを読み込んでいるとします。しかし、ユーザーがブラウザの「戻る」ボタンを押すと不具合が起きます。ずっと同じページの中にいて、JS でコンテンツを変えているだけだからです。</li>
</ul>
この API は現在、Chrome、Firefox、Safari などで安定してサポートされているので、使用上それほど心配する必要はありません。ただし、モバイルブラウザではテストが必要かもしれません。（参考 <a href="https://developer.mozilla.org/zh-TW/docs/Web/Guide/API/DOM/Manipulating_the_browser_history/Manipulating_the_browser_history">MDN</a>）
<table class="compat-table">
<tbody>
<tr>
<th>Feature</th>
<th>Chrome</th>
<th>Firefox</th>
<th>IE</th>
<th>Opera</th>
<th>Safari</th>
</tr>
<tr>
<td>replaceState, pushState</td>
<td>5</td>
<td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2.0)</td>
<td>10</td>
<td>11.50</td>
<td>5.0</td>
</tr>
<tr>
<td>history.state</td>
<td>18</td>
<td><a title="Released on 2011-03-22." href="https://developer.mozilla.org/en-US/Firefox/Releases/4">4.0</a> (2.0)</td>
<td>10</td>
<td>11.50</td>
<td>6.0</td>
</tr>
</tbody>
</table>
ここで最も重要な原理は、この一連の API の中心的な考え方が history.state をスタックとして扱うことだという点です。pushState で新しい履歴を積むことができます。また、ユーザーが「戻る」（「進む」）をクリックすると onpopstate イベントが発生し、スタックの最後の項目が取り出されて渡されます。イベントを受け取ったら、JS で切り替え先のページや行う処理を判断します。history.state はスタックなので、onpopstate の中でさらに pushState を呼ぶと、不可解な現象が起きることがあります。原因は、こちらの記事 【<a href="https://coder.tw/?p=7231">Python でループの中の配列要素を削除してはいけない理由</a>】 と似ています。また、onpopstate には方向性がなく、ユーザーが「進む」を押したのか「戻る」を押したのかを直接知ることはできません。ただ、それはあまり重要ではありません。スタックであることだけを覚えておけば十分です。
<h2>pushState</h2>
ユーザーが「次へ」を押したときに、JS でコンテンツを動的に読み込んでページを切り替える場合には、pushState がよく合います。名前のとおり、新しい状態を window.history に積み上げるものです。
<pre>history.pushState(state, title, url)</pre>
state パラメーターには、シリアライズできるものなら何でも指定できます。それは history に保存され、ユーザーがブラウザの「戻る」を押すと取り出されて渡されます。そのため、このパラメーターによって、将来の自分が「戻る」でどのページへ切り替えればよいかを知ることができます。

たとえば、現在の URL が http://example.com だとします。次のコードを実行すると：
<pre>history.pushState({step: 1}, "第一步", "/step/1")</pre>
URL は http://exmple.com/step/1 になり、ページのタイトルは「Step 1」になります（Firefox ではこのパラメーターが実装されていないようです）。ブラウザの「戻る」を押すと、onpopstate イベントで {step: 1} というオブジェクトを受け取ります。
<h2>replaceState</h2>
パラメーターは pushState とまったく同じです。違いは、history.replaceState はスタックに何も積まず、現在の状態を変更するという点です。平たく言えば、URL を変えることです。たとえば、JS でダイアログを開いたときに、その動作を URL に反映させたいけれど、履歴には残したくないとします。そのような場合は replaceState を使えばよいのです！
<h2>onpopstate</h2>
これはイベントです。ユーザーがブラウザの「戻る」または「進む」ボタンをクリックすると発生し、スタックの最後の項目が取り出されて渡されます。その項目（つまり pushState で積んだ state）から、前のページで何をしていたかが分かるので、JS でその内容を読み込み直します。
<pre>window.onpopstate = function(event) {

  console.log(event.state);

}</pre>
<h2>方向性</h2>
ユーザーが「戻る」を押したのか「進む」を押したのかを判断したい場合、たとえばローディングアニメーションの向きを変えたいときは、デフォルトでは取得できません。ただし、グローバル変数を設定することで、どちらの方向に移動したかを計算できます。例を見てみましょう：
<pre>var current_step = 1;

window.onpopstate = function(event) {
  if(current_step - event.state.step &gt; 0) {
    console.log("上一頁");
  }else{
    console.log("下一頁");
  }
}

function show_step1( ) {
  current_step = 1;
  history.pushState({step: 1}, "第一步", "/step/1");
}

function show_step2( ) {
  current_step = 2;
  history.pushState({step: 2}, "第二步", "/step/2");
}</pre>
<h2>注意事項</h2>
<ul>
 	<li>「前のページ」という観点で考えないでください。ブラウザは前のページが何かを教えてくれるわけではありません。最後に push された state が何だったかを教えてくれるのです。その state を解釈して、対応するコンテンツ（要素）を自分で読み込む必要があります。何もしなければ、ユーザーが「戻る」を押しても何も起こりません。</li>
 	<li>onpopstate が発生すると、ブラウザが自動的に URL を変更してくれるので、replaceState を自分で呼ぶ必要はありません。</li>
 	<li>問題がどのように発生するのか、そして自分が何をしているのかを十分に理解していない限り、onpopstate の中で pushState を呼んではいけません。</li>
 	<li>この一連の API は同じページの中でしか動作しません。言い換えると、ユーザーの前のページがブラウザによって読み込まれたもの（たとえばハイパーリンク経由）だった場合、ユーザーが「戻る」を押しても、JS には何の通知も届きません。</li>
 	<li>ブラウザの BFCache のため、スクロール位置が期待と異なる場合があります。</li>
 	<li>見た目の良い URL を表示することだけに気を取られないでください。この URL がコピーされて共有されたとき、ほかの人がその URL で期待どおりの内容を見られるかどうかも考えてください。</li>
</ul>
&nbsp;
