---
title: ".NET プログラムから Windows の環境変数（システム変数）を取得する方法 - VB.NET の例"
date: 2011-02-11T09:55:35
slug: "net-windows-environment-variables-vb-net"
tags: ["VB", ".NET", "Windows"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_144258.jpg"><img class="alignnone size-full wp-image-165" title="2010-11-07_144258" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_144258.jpg" alt="" width="394" height="406" /></a></p>
CMD を使ったことがある人なら、環境変数というものを知っているでしょう。環境変数を使うと、ユーザー名のように、コンピューターごとに異なる情報を手軽に取得できます。CMD で環境変数を使うのはとても簡単で、%環境変数名% という形式で書くだけです。しかし .NET プログラムでは、それほど簡単ではありません。Environ 関数を使う必要があります。
<h2>
<!--more-->
.NET で環境変数を取得する</h2>
.NET でシステム変数を取得するには Environ 関数を使います。関数の使い方は簡単で、書式は次のとおりです。
<pre lang="vb">Environ("環境變數名稱")</pre>
P.S. 環境変数の部分は変数ではなく文字列として扱う必要があるので、ダブルクォーテーションで囲んでください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_150250.jpg"><img class="alignnone size-large wp-image-167" title="2010-11-07_150250" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_150250-540x303.jpg" alt="" width="540" height="303" /></a>
<h3>例：（コンソールアプリケーション）</h3>
<pre lang="vb">Module Module1

    Sub Main()
        Console.WriteLine("CPU核心數:" &amp; Environ("NUMBER_OF_PROCESSORS"))
        Console.ReadLine()
    End Sub

End Module</pre>
<h2>よく使われるシステム変数名</h2>
以下は、よく使われるシステム変数名の一覧です。CPU のコア数やユーザー名など、コンピューターごとに異なる情報を簡単に取得できます。
<table border="0" cellspacing="0" cellpadding="0" width="683">
<tbody>
<tr>
<td width="188">SystemRoot</td>
<td width="191">オペレーティングシステムのルートディレクトリの場所</td>
<td width="304">C:WINDOWS</td>
</tr>
<tr>
<td width="188">ComSpec</td>
<td width="191">CMD の場所</td>
<td width="304">C:WINDOWSsystem32cmd.exe</td>
</tr>
<tr>
<td width="188">NUMBER_OF_PROCESSORS</td>
<td width="191">CPU のコア数</td>
<td width="304">4</td>
</tr>
<tr>
<td width="188">TEMP</td>
<td width="191">システムの一時フォルダーの場所</td>
<td width="304">C:WINDOWSTEMP</td>
</tr>
<tr>
<td width="188">HOMEDRIVE</td>
<td width="191">現在のシステムがあるパーティション</td>
<td width="304">C:</td>
</tr>
<tr>
<td width="188">HOMEPATH</td>
<td width="191">現在のユーザーのフォルダーの場所</td>
<td width="304">useradministrator</td>
</tr>
<tr>
<td width="188">OS</td>
<td width="191">使用中のオペレーティングシステムの名前</td>
<td width="304">Windows NT</td>
</tr>
<tr>
<td width="188">ProgramFiles</td>
<td width="191">ProgramFiles フォルダーの場所</td>
<td width="304">C:ProgramFiles</td>
</tr>
<tr>
<td width="188">USERNAME</td>
<td width="191">現在のユーザー名</td>
<td width="304">Administrator</td>
</tr>
<tr>
<td width="188">COMPUTERNAME</td>
<td width="191">コンピューター名の取得</td>
<td width="304">LINROEX-PC</td>
</tr>
</tbody>
</table>
