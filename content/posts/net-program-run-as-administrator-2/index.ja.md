---
title: "プログラムに管理者権限は必要？ .NET プログラムを既定で管理者として実行させる方法～"
date: 2011-02-16T00:03:57
slug: "net-program-run-as-administrator-2"
tags: [".NET", "Windows"]
categories: ["Programming"]
draft: false
---

Visual Studio でプログラムを開発していると、システムフォルダーにアクセスしたり、一部の高レベル WinAPI を使ったりするために、管理者権限が必要になることがあります。Windows XP では管理者権限を使っても特に問題ありませんが、Windows 7 や Vista で動かす場合は、そのプログラムに管理者権限を与えなければなりません。そうしないと、プログラムが途中で問題を起こしてしまいます。一般的には、ユーザーに実行時に右クリックして「管理者として実行」を選んでもらう方法がありますが、ユーザー自身が設定しなければならず、少し不格好です。実は、プログラムが既定で管理者として実行されるようにする別の方法があり、ユーザーが設定をする必要はありません。


<!--more-->
<strong>ここでは Visual Basic 2010 を使って説明します</strong>
<h2>プログラムを既定で管理者として実行させる</h2>
1.プロジェクトファイルを開き、上部のツールバーで【プロジェクト】→【XXX のプロパティ】を選択します

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211333.jpg"><img class="alignnone size-large wp-image-4704" title="2011-02-08_211333" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211333-520x277.jpg" alt="" width="520" height="277" /></a>

2.【Windows の設定を表示】をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211421.jpg"><img class="alignnone size-large wp-image-4705" title="2011-02-08_211421" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211421-520x322.jpg" alt="" width="520" height="322" /></a>

3.【requestedExecutionLevel level="asInvoker"】を見つけて、次のように変更します：

【requestedExecutionLevel  level="requireAdministrator"】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211659.jpg"><img class="alignnone size-large wp-image-4706" title="2011-02-08_211659" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211659-520x322.jpg" alt="" width="520" height="322" /></a>

nimo1993 さんにこの方法を教えていただきました XDD
