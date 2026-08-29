---
title: "【VB.Net】取得資料夾中特定格式檔案路徑並存入ArrayList(稍微修改一下就可以用到其他.NET語言)"
date: 2010-11-07T15:45:56
slug: "vb-net-get-folder-file-paths-arraylist-2"
aliases: ["/posts/%e3%80%90vb-net%e3%80%91%e5%8f%96%e5%be%97%e8%b3%87%e6%96%99%e5%a4%be%e4%b8%ad%e7%89%b9%e5%ae%9a%e6%a0%bc%e5%bc%8f%e6%aa%94%e6%a1%88%e8%b7%af%e5%be%91%e4%b8%a6%e5%ad%98%e5%85%a5arraylist%e7%a8%8d-2/"]
tags: ["VB", ".NET", "ArrayList", "My"]
categories: ["VB.NET"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_154306.jpg"><img class="size-large wp-image-3957 aligncenter" title="2010-11-07_154306" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_154306-520x311.jpg" alt="" width="520" height="311" /></a></p>
上次在寫新版Desktop Locker的娛樂功能時,因為要自動取得Resources資料夾中的所有音樂檔,就研究出了下面這段程式碼,可以讓你將取得資料夾中特定格式檔案路徑並存入ArrayList中,例如你要取得music中的所有mp3格式就可以用我的這個程式碼來達到功能


<!--more-->

<h2>取得資料夾中特定格式檔案路徑並存入ArrayList</h2>
<strong>介面:</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_151536.jpg"><img class="alignnone size-full wp-image-3950" title="2010-11-07_151536" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_151536.jpg" alt="" width="307" height="387" /></a>

<strong>程式碼:</strong>
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
<h2>程式碼解說：</h2>
利用My.Computer.FileSystem.GetFiles搭配*.*的格式來搜尋指定資料夾中的所有檔案,另外FileIO.SearchOption.SearchTopLevelOnly這個參數是指只搜尋一層資料夾,不用搜尋指定資料夾中的第二第三層資料夾,搜尋到符合*.*的檔案之後將他的路徑存入file這個ArrayList,最後寫一個迴圈將file中的資料輸出到ListBox1裡面

<strong> 專案檔載點：Xun6 | <a href="http://www.4shared.com/file/f9VObDik/ArrayList.html ">4Shared </a>| <a href="http://www.box.net/shared/r66otb3puc">Box.net</a></strong>
