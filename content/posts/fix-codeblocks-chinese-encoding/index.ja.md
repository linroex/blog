---
title: "Code::Blocks で中国語が文字化けする問題の解決方法"
date: 2011-09-03T11:03:57
slug: "fix-codeblocks-chinese-encoding"
tags: ["IDE", "C++"]
categories: ["Programming"]
draft: false
---

Code::Blocks は私が個人的に気に入って使っている C/C++ の IDE ですが、以前から一つ問題にぶつかっていました。Code::Blocks では中国語がまったく使えず、文字列に中国語を入れられないどころか、コメントにも書けなかったのです。最初は本体のバグだと思っていましたが、ネットユーザーに教えてもらい、実はデフォルトのエンコーディングの問題だと分かりました！


<!--more-->
まずは、ネットユーザーの ef67891 さんに感謝します。この方のおかげで中国語の文字化けを解決できました！解決方法はとても簡単で、Code::Blocks の保存時のエンコーディングを UTF-8 に変えるだけです～
<h2>解決手順</h2>
1. Code::Blocks を開き、上部のバーで「Settings」→「Editor」の順にクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_105800.jpg"><img class="alignnone size-large wp-image-748" title="2011-09-03_105800" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_105800-540x405.jpg" alt="" width="540" height="405" /></a>

2.「Use encoding when opening files」の欄で「UTF-8」を選び、「OK」を押せば完了です

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110044.jpg"><img class="alignnone size-large wp-image-749" title="2011-09-03_110044" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110044-525x540.jpg" alt="" width="525" height="540" /></a>

3. これで中国語が使えるようになりました～～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110253.jpg"><img class="alignnone size-large wp-image-750" title="2011-09-03_110253" src="{{< param imageBase >}}/wp-content/uploads/2011/09/2011-09-03_110253-540x405.jpg" alt="" width="540" height="405" /></a>
