---
title: "VB のフォーム表示と終了の構文"
date: 2009-04-17T12:40:00
slug: "vb-call-close-form-syntax"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

<font size="2">&nbsp;VB でフォームを切り替えたい場合は、show() 構文を使えます。<br/>
構文は次のとおりです。<br/>
フォーム名.show()<br/>
「フォーム名」の部分には、切り替えたいフォームの名前を入れます。<br/>
たとえば、form2 というフォームに切り替えたい場合は、<br/>
form2.show() と入力すれば OK です。<br/>
<br/>
また、新しいフォームを開いたあとに古いフォームを閉じたい場合の構文は次のとおりです。<br/>
フォーム名.close()<br/>
自分自身を閉じる場合は me.close()&nbsp;&nbsp;&nbsp;&nbsp; &#39; 自分を閉じるという意味<br/>
この構文は、ほかのフォームを閉じるのにも使えます。<br/>
ただし、閉じるフォームは自分のプログラムに属している必要があります（当たり前ですが）</font>
