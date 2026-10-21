---
title: "VMware Workstation：仮想マシンの定番。1台のパソコンで2つ以上のOSを同時に動かせます"
date: 2010-07-11T00:07:29
slug: "vmware-workstation-virtual-machine"
tags: ["VMware", "Virtual Machines"]
categories: ["Software"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_211926.jpg"><img class="alignnone size-large wp-image-3434" title="2010-07-10_211926" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_211926-550x192.jpg" alt="" width="550" height="192" /></a>

<a href="http://www.vmware.com/">VMware</a> は、1台のパソコンで同時に2つ以上のオペレーティングシステムを動かせるソフトウェアです。デュアルブートのように起動時にどちらかを選ぶのではなく、本当に複数の OS を同時に起動できます。「そんなにたくさんの OS を一度に動かして、何がしたいの？ 暇なの？」と思う人もいるかもしれません。ゲームの観点から見ると、2つの OS を同時に動かせば、いわゆる「デュアルウィンドウ」の環境が作れます。セキュリティの観点から見ると、仮想マシンはセキュリティ担当者がウイルスを検査するのに役立ちます。また、インターネットからダウンロードしたプログラムが安全かどうか分からないときにも、VMware が役に立ちます。


<!--more-->


仮想マシンの市場は、主に <a href="http://www.vmware.com/">VMware</a>、<a href="http://www.virtualbox.org/">VirtualBox</a>、<a href="http://www.microsoft.com/windows/virtual-pc/">Virtual PC</a> で分け合っています。そのうち有料なのは VMware だけです。それでも VMware は有料なのに、この3つの中ではシェアが最も高いのです。私の考えでは、有料製品のシェアは少なくとも 0.0 のはずですが、Windows は大きな例外ですね……。とはいえ、VMware と Windows は比べられません。VMware は他の2つよりも機能がずっと優れているので、本当にお金を払う価値があります。例えば性能面では <a href="http://www.microsoft.com/windows/virtual-pc/">Virtual PC</a> より何千倍も優れていますし、DirectX も使えます。ほかの2つではできないことです。

ひとつ誤解を解いておきたいと思います。仮想マシンのソフトには OS が最初から入っている、と思っている人が多いのですが、実際には新しい仮想のコンピューターを作ってくれるだけで、OS は自分でインストールしなければなりません。また、古すぎるパソコンでは仮想マシンは動きません。2つの OS を同時に動かすため、パフォーマンスを大きく消費するからです。

<strong>以下では、VMware Workstation の試用版のダウンロード方法と、インストール方法を紹介します。</strong>

<strong> </strong>

<strong> </strong>
<h2>VMware Workstation 試用版のダウンロード</h2>
1.まず VMware の公式サイトにアクセスし、【Support &amp; Downloads】をクリックしてから、Product Downloads の下にある VMware Workstation をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_212800.jpg"><img class="alignnone size-large wp-image-3436" title="2010-07-10_212800" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_212800-550x334.jpg" alt="" width="550" height="334" /></a>

2.ブラウザのスクロールバーを一番下まで下げると、Download ボタンが表示されます。お使いのパソコンが Windows か Linux かに合わせて、対応する Download ボタンを選んでください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_213028.jpg"><img class="alignnone size-large wp-image-3437" title="2010-07-10_213028" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_213028-550x334.jpg" alt="" width="550" height="334" /></a>

3.試用版の VMware をダウンロードするには、まず VMware のアカウントを登録する必要があります。すでにアカウントをお持ちの方は、左側でログインして、5番の手順に進んでください。お持ちでない方は【Register】をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_213426.jpg"><img class="alignnone size-large wp-image-3438" title="2010-07-10_213426" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_213426-550x334.jpg" alt="" width="550" height="334" /></a>

4.必要な情報を入力して、【continue】をクリックします。

下の画像は翻訳です（画像をクリックすると拡大表示されます）。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_2138381.jpg"><img class="alignnone size-large wp-image-3440" title="2010-07-10_213838" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_2138381-319x400.jpg" alt="" width="319" height="400" /></a>

5.使用許諾の画面が表示されます。いつものように、読めなければそのまま Yes を押してしまいましょう: )

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_214541.jpg"><img class="alignnone size-large wp-image-3441" title="2010-07-10_214541" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_214541-550x334.jpg" alt="" width="550" height="334" /></a>

6.やっと……ダウンロードのリンクが表示されました^^ 個人で少し遊んでみたいだけなら、2つ目のダウンロード先で十分です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_214833.jpg"><img class="alignnone size-large wp-image-3442" title="2010-07-10_214833" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_214833-550x334.jpg" alt="" width="550" height="334" /></a>

7.しばらく待ちましょう..... 一番小さいファイルでも300MB以上あるので....... ダウンロードが終わったら、次の手順に進めます。
<h2>VMware Workstation のインストール手順</h2>
1.VMware のインストーラーをダブルクリックして、実行をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_230604.jpg"><img class="alignnone size-large wp-image-3444" title="2010-07-10_230604" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_230604-534x400.jpg" alt="" width="534" height="400" /></a>

<!--nextpage-->

2.読み込み中です。少々お待ちください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_230718.jpg"><img class="alignnone size-full wp-image-3445" title="2010-07-10_230718" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_230718.jpg" alt="" width="503" height="380" /></a>

3.Next をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232147.jpg"><img class="alignnone size-full wp-image-3448" title="2010-07-10_232147" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232147.jpg" alt="" width="503" height="380" /></a>

4.Typical をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232250.jpg"><img class="alignnone size-full wp-image-3449" title="2010-07-10_232250" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232250.jpg" alt="" width="503" height="380" /></a>

5.インストール先を変更したい場合を除き、Next をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232348.jpg"><img class="alignnone size-full wp-image-3450" title="2010-07-10_232348" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232348.jpg" alt="" width="503" height="380" /></a>

6.Next をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232726.jpg"><img class="alignnone size-full wp-image-3451" title="2010-07-10_232726" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232726.jpg" alt="" width="503" height="380" /></a>

7.Next をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232953.jpg"><img class="alignnone size-full wp-image-3452" title="2010-07-10_232953" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_232953.jpg" alt="" width="503" height="380" /></a>

8.相変わらず Next を押し続けます....

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_233126.jpg"><img class="alignnone size-full wp-image-3453" title="2010-07-10_233126" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_233126.jpg" alt="" width="503" height="380" /></a>

9.ようやく Next ではなくなりました〜 Continue を押しましょう〜

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_233403.jpg"><img class="alignnone size-full wp-image-3454" title="2010-07-10_233403" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_233403.jpg" alt="" width="503" height="380" /></a>

10.インストール中

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_233510.jpg"><img class="alignnone size-full wp-image-3455" title="2010-07-10_233510" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_233510.jpg" alt="" width="503" height="380" /></a>

11.キーの入力を求められます.... 記憶が正しければ、試用版のキーは申し込み時に入力したメールアドレスに届くはずです。ただ、私はメールアドレスを適当に入力してしまった（0.0）ので、よく分かりません....

12.パソコンを再起動しましょう〜

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_235217.jpg"><img class="alignnone size-full wp-image-3456" title="2010-07-10_235217" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_235217.jpg" alt="" width="503" height="380" /></a>

13.再起動したら VMware のメインプログラムを開き、Yes, I accept を選んでから OK をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_235417.jpg"><img class="alignnone size-full wp-image-3458" title="2010-07-10_235417" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-10_235417.jpg" alt="" width="503" height="384" /></a>

インストール完了です^_^ 現時点での VMware の欠点は、中国語（繁体字）のインターフェースがないことです.... ただ、インターネットで繁体字中国語化のパッチを探せば見つかりますよ〜

<a href="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_000233.jpg"><img class="alignnone size-large wp-image-3461" title="2010-07-11_000233" src="{{< param imageBase >}}/wp-content/uploads/2010/07/2010-07-11_000233-550x320.jpg" alt="" width="550" height="320" /></a>
