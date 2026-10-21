---
title: "Visual Studio Code：貼り付けたコードのインデントを自動で整える"
date: 2017-02-15T09:25:59
slug: "vscode-auto-indent-on-paste"
tags: ["Visual Studio Code"]
categories: ["Programming"]
draft: false
---

Sublime Text から <a href="https://github.com/Microsoft/vscode/">Visual Studio Code</a>（以下、VS Code）に乗り換えた開発者なら、きっと「Paste and Indent」の機能が懐かしいのではないでしょうか！ コードを書いていると、コードのコピー＆ペーストは避けられませんが、貼り付けたあとにインデントが崩れることがよくあり、手作業で整え直す必要があります。Sublime Text には、貼り付けたコードを現在のファイルのインデントに自動で合わせてくれる、いわゆる Paste and Indent 機能があります。VS Code にも似た機能はありますが、仕組みが少し異なり、設定ファイルで有効にする必要があります。


<!--more-->


Sublime Text と違い、<a href="https://github.com/Microsoft/vscode/">VS Code</a> では「Paste and Indent」はショートカットキーではなく、「貼り付け」の操作に直接組み込まれています。設定ファイルで editor.formatOnPaste を true に設定するだけで、それ以降は貼り付けるたびに自動でインデントされるようになります。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-15-上午9.17.14.jpg"><img class="alignnone size-large wp-image-7441" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-15-上午9.17.14-1024x801.jpg" alt="" width="660" height="516" /></a>
<pre>"editor.formatOnPaste": true</pre>
ただし、Sublime Text と少し違うのは、VS Code の「formatOnPaste」は実際にはプログラミング言語に紐づいている点です。つまり、貼り付けたコードを既存のインデントに合わせる本当の意味での「貼り付け時の整列」ではありません。例えば、VS Code はデフォルトでは erb 形式（Rails Template File）をサポートしていないため、私は Rails プラグインを別途インストールしました。しかし、そのプラグインは formatOnPaste に対応していません。そのため、ファイル形式が erb のときは、貼り付けたコードが自動でインデントされません。また、ファイル形式がデフォルトの PlainText の場合も、formatOnPaste は効かないことがあります。

より正確に言うと、VS Code の formatOnPaste は、貼り付けたコードを周囲のインデントに合わせるというより、コードを整形するツールに近いものです。Coding Style で定められたルールに従って、コードをフォーマットします。
