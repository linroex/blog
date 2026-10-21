---
title: "ページの onFocus の後に input の onFocus が発火するのを防ぐ方法"
date: 2017-02-16T11:27:59
slug: "how-to-prevent-js-input-onfocus-event-fire-after-page-onfocus"
tags: ["JavaScript", "HTML"]
categories: ["Programming"]
draft: false
---

最近の仕事で、ウェブサイトに Google Analytics のユーザーイベント追跡コードを組み込んでいました。HTML のイベントを使ってコードを input にバインドし、ユーザーが特定の欄やボタンをクリックするたびに Google Analytics へ記録を送信するようにしました。この方法自体には問題ありません。ところが、ユーザーが input 欄をクリックしたあとに別のページ（Chrome のタブ）へ切り替え、再び自分のページに戻ってきた（Page onFocus）とき、input の onFocus イベントが自動的に発火することに気づきました！


<!--more-->


<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/pagefocus16.gif"><img class="alignnone size-large wp-image-7446" src="{{< param imageBase >}}/wp-content/uploads/2017/02/pagefocus16.gif" alt="" width="660" height="474" /></a>

DevTools をクリックしてからページに戻ると、input の onFocus も発火します。しかしクリックしたのは input 欄ではなくページです。ほかのページやほかのアプリに切り替えても、同じ現象が起きます。

実のところ、ページが onFocus になったときに input も自動的に onFocus になる理由は理解できるもので、バグとは言えません。ただ、ここではユーザーの行動を追跡しているので、その観点から見ると、ページの読み込み時にユーザーは input をクリックしていないのに、フォーカスされてしまうのは困ります。そのため、これを防ぐ方法を考える必要がありました。

私の解決策は、Page onFocus のイベントとフラグ変数を組み合わせることです。コードは次のとおりです。

<pre>var flag = false;

$("input:text").focus(function(e){
  if(flag == true) {
    flag = false;
    return false;
  }
  $("body").append("input focus!&lt;br&gt;");
});

window.onfocus = function() {
  $("body").append("page focus!&lt;br&gt;");
  flag = true;
 
  setTimeout(function(){
    flag = false;
  }, 300);
 
}</pre>
ページが onFocus になったら、フラグを true にします。Page onFocus の後に現在の input の onFocus が自動的に発火することはわかっています。input の onFocus でフラグが true かどうかを確認し、true なら直前のイベントが Page onFocus だったことを意味するので、イベントの処理は実行せず、フラグを false に戻します。こうすることで、その後のユーザーの通常のクリックは、きちんとイベントを発火させられます。

Chrome では Page onFocus が input の onFocus より先に発火するかもしれませんが、ほかのブラウザでは実装や順序が異なる可能性があります。このような事態は JavaScript のイベントでは珍しくないので、保険として setTimeout も追加しています。

&nbsp;
