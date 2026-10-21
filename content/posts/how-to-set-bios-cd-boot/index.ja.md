---
title: "BIOS で CD から起動する設定方法（OS の再インストールに必須）"
date: 2009-11-29T08:32:53
slug: "how-to-set-bios-cd-boot"
tags: ["BIOS"]
categories: ["Hardware"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_074650.jpg"><img style="border-bottom: 0px; border-left: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px" title="2009-11-29_074650" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_074650_thumb.jpg" border="0" alt="2009-11-29_074650" width="354" height="261" /></a>

PC の再インストールを学ぶうえで最も重要な一歩は、CD から起動する設定です。CD 起動を設定しさえすれば、その後の OS のインストールはそれほど難しくなく、ほとんどは「次へ」をクリックするだけで済みます。そこで今回は、BIOS の起動設定を変更する方法を解説します。

BIOS とは何か：<strong>基本入出力システム</strong>（<strong>BIOS</strong>、<strong>B</strong>asic <strong>I</strong>nput/<strong>O</strong>utput <strong>S</strong>ystem）は、コンピューターのハードウェアに読み込まれている最も基本的なソフトウェアです。BIOS は、ハードウェアとの通信に特化した小さなオペレーティングシステムと考えることができます。通常は、互換性のある CPU 向けのアセンブリ言語で書かれています。（この部分は Wikipedia を参考にしています）


<!--more-->
<span style="color: #ffffff;">.</span>
<h3>基本操作 — BIOS 設定画面を開く</h3>
コンピューターの起動時に、ショートカットキーを使って BIOS の設定画面に入る必要があります（電源ボタンを押した直後に、そのキーを連打してください）。ただし、BIOS のメーカーごとに設定画面に入るキーは異なります。自分のキーの探し方は次のとおりです。コンピューターを起動すると、たくさんの文字が表示されますよね？ そのなかに、下の画像のような文字やそれに似た文字がないか、すぐに探してください。見つかれば、どのキーを押せば BIOS に入れるかがわかります！ 下の画像では、DEL（Delete）キーで入っています。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_075910.jpg"><img title="2009-11-29_075910" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_075910_thumb.jpg" border="0" alt="2009-11-29_075910" width="504" height="371" /></a>

注：一般的にデスクトップ PC では ESC、Delete、F4 のいずれかで入れることが多く、ノートパソコンでは通常 F2 です。

<span style="color: #ffffff;">.</span>
<h3>基本操作 — BIOS の操作方法</h3>
次に BIOS の使い方を説明します。BIOS 内はすべてキーボードで操作する必要があり、マウスは使えません。よく聞いてくださいね。

BIOS の操作方法は、通常メーカーごとに BIOS 画面に表示されていますが、英語で書かれています。そこで、よく使われる操作方法を以下にまとめます。

<strong>1. AMIBIOS の操作方法</strong>

方向キー（↑↓）：項目間で上下に移動します。下の図では、System Time と System Date の間を移動しています。

方向キー（→←）：タブ間を移動します。タブとは、上部にある Main、Power、Boot などの項目のことです。

ESC：BIOS 設定画面を終了します

F10：設定を保存して終了します

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_080559.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_080559" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_080559_thumb.jpg" border="0" alt="2009-11-29_080559" width="504" height="371" /></a>

<strong>2. AwardBIOS の操作方法</strong>

方向キー：上下左右に移動します

ESC：BIOS 設定画面を終了します

F10：設定を保存して終了します

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082247.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082247" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082247_thumb.jpg" border="0" alt="2009-11-29_082247" width="504" height="263" /></a>
<h3><span style="color: #ffffff;">.</span></h3>
<h3>CD 起動の設定を始める</h3>
1. 方向キーを使って Boot タブに移動します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082423.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082423" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082423_thumb.jpg" border="0" alt="2009-11-29_082423" width="504" height="371" /></a>

2. Boot Device Priority で Enter を押して、起動デバイスの設定メニューを開きます。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082558.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082558" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082558_thumb.jpg" border="0" alt="2009-11-29_082558" width="504" height="371" /></a>

3. 1st Boot Device を選んで Enter を押し、方向キーで CDROM を反転表示させてから、もう一度 Enter を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082726.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082726" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082726_thumb.jpg" border="0" alt="2009-11-29_082726" width="504" height="371" /></a>

注：機種によっては、+ キーや F8 キーを押して CDROM の項目を一番上に移動する必要があります。方法は難しくありません。方向キーで CDROM の項目に移動してから、+ キーを押すだけです。

4. 設定したら F10 を押し、インストール用のディスクを挿入すると、自動的にディスクから起動します。

下の図は Windows PE 3.0 の起動メニューです。

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082927.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082927" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082927_thumb.jpg" border="0" alt="2009-11-29_082927" width="504" height="433" /></a>
