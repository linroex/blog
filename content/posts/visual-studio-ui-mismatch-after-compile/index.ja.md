---
title: "Visual Studioでデザインした画面と、コンパイル後の画面が違うのはなぜ？"
date: 2011-08-10T17:46:36
slug: "visual-studio-ui-mismatch-after-compile"
tags: ["Visual Studio"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-02_200036.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="2011-08-02_200036" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-02_200036_thumb.jpg" alt="2011-08-02_200036" width="520" height="319" border="0" /></a>

これは、私が最近プログラムを書いているときに遭遇した問題です。もしあなたも Visual Studio で開発していて、同じような問題、つまり「VS 上でのインターフェースデザイン」と「実行したときの結果」が一致しない問題に出会っているのであれば、私の解決方法をご覧ください。少し単純ですが、とても効果的ですXD


<!--more-->

<h2>問題の内容：</h2>
Visual Studio でプログラムを開発し、コンパイルしてから実行したところ、実行結果が Visual Studio 上で配置したインターフェースとまったく違っていました。

しかし、私のコードには、インターフェースに影響するようなものは何もありませんでした。
<h2>解決方法：</h2>
この問題は、Form の Language プロパティを変更したときに起こることがあります。ソリューションエクスプローラーを開き、「Form1.zh-Hant.resx」のようなローカライズファイルがあるかどうかを確認してください。そのファイルを削除してから、もう一度リビルドしてください。理論上は、これで解決するはずです。

次の操作をしたかもしれません：

1.Form の Language を繁体字中国語に設定する

2.コントロールを少し動かす

3.Form の Language を既定値に戻す

4.もう一度コントロールを動かしてからコンパイルすると、結果が違ってきます XD

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-10_173326.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="2011-08-10_173326" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-10_173326_thumb.jpg" alt="2011-08-10_173326" width="381" height="480" border="0" /></a>
<h2>原因：</h2>
最初は、とても不思議なバグだと思っていました。その後、Bill さんが仕組みを教えてくれて、ようやくバグではないのだと分かりました。

整理してみます...

先ほどの、問題が起きた手順は次のとおりです：

1.Form の Language を繁体字中国語に設定する

2.コントロールを少し動かす

3.Form の Language を既定値に戻す

4.もう一度コントロールを動かしてからコンパイルすると、結果が違ってきます XD

2番目の操作の時点で、ローカライズファイル Form1.zh-Hant.resx が生成されます。

この時点では、まだすべて正常です。

しかし、3番目の手順で Language を既定値に戻すと、Visual Studio のデザイナーは元のコードのレイアウトを表示します。一方、コンパイル時には「Form1.zh-Hant.resx」も一緒にビルドされてしまいます。私のパソコンはたまたま繁体字中国語に設定されていたため、ここで問題が起きました。プログラムは実行時に OS の言語を確認し、対応するローカライズファイルを適用します。ところが、そのファイルにはコントロールの位置も含まれているため、<strong>実行時にはローカライズファイルのコントロール位置が使われ、デザイン時には元のコードの位置が使われるので、デザインと実行結果がずれてしまいます。</strong>
