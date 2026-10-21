---
title: "【VB.Net】フォルダ内の特定形式のファイルパスを取得して ArrayList に格納する（少し修正すれば他の .NET 言語でも使えます）"
date: 2010-11-07T15:45:56
slug: "vb-net-get-folder-file-paths-arraylist-2"
tags: ["VB", ".NET"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_154306.jpg"><img class="size-large wp-image-3957 aligncenter" title="2010-11-07_154306" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_154306-520x311.jpg" alt="" width="520" height="311" /></a></p>
前回、新バージョンの Desktop Locker のエンターテインメント機能を作っていたときに、Resources フォルダ内の音楽ファイルをすべて自動で取得する必要がありました。そこで以下のコードを考えました。フォルダ内の特定の形式のファイルパスを取得して ArrayList に格納するものです。たとえば music フォルダ内のすべての mp3 ファイルを取得したい場合に、このコードを使えます。


<!--more-->
<h2>フォルダ内の特定形式のファイルパスを取得して ArrayList に格納する</h2>
<strong>画面：</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_151536.jpg"><img class="alignnone size-full wp-image-3950" title="2010-11-07_151536" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_151536.jpg" alt="" width="307" height="387" /></a>

<strong>コード：</strong>
<pre lang="vb">Public Class Form1
    Dim file As New ArrayList

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        For Each filetmp As String In My.Computer.FileSystem.GetFiles(TextBox1.Text, FileIO.SearchOption.SearchTopLevelOnly, "*." &amp; TextBox2.Text)

            file.Add(filetmp)

        Next

        For y = 0 To file.Count - 1
            ListBox1.Items.Add(file(y))
        Next

    End Sub
End Class</pre>
<h2>コードの説明：</h2>
My.Computer.FileSystem.GetFiles を *.* の形式と組み合わせて使い、指定したフォルダ内のすべてのファイルを検索します。FileIO.SearchOption.SearchTopLevelOnly パラメーターは、フォルダの最上位階層だけを検索するという意味です。つまり、サブフォルダの 2 階層目や 3 階層目は検索しません。*.* に一致したファイルは、そのパスを file の ArrayList に追加します。最後に、ループで file のデータを ListBox1 に出力します。

<strong> プロジェクトファイルのダウンロード：Xun6 ｜<a href="http://www.4shared.com/file/f9VObDik/ArrayList.html ">4Shared </a>｜<a href="http://www.box.net/shared/r66otb3puc">Box.net</a></strong>
