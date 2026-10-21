---
title: "[VB.Net] Get File Paths of a Specific Format in a Folder and Store Them in an ArrayList (Easily Adapted to Other .NET Languages)"
date: 2010-11-07T15:45:56
slug: "vb-net-get-folder-file-paths-arraylist-2"
tags: ["VB", ".NET"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_154306.jpg"><img class="size-large wp-image-3957 aligncenter" title="2010-11-07_154306" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_154306-520x311.jpg" alt="" width="520" height="311" /></a></p>
Last time, while I was working on the entertainment feature of the new version of Desktop Locker, I needed to automatically get all the music files in its Resources folder. That led me to work out the code below, which collects the file paths of a specific format in a folder into an ArrayList. For example, if you want all the mp3 files in a music folder, you can use this code to do it.


<!--more-->
<h2>Get file paths of a specific format in a folder and store them in an ArrayList</h2>
<strong>Interface:</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_151536.jpg"><img class="alignnone size-full wp-image-3950" title="2010-11-07_151536" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_151536.jpg" alt="" width="307" height="387" /></a>

<strong>Code:</strong>
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
<h2>Code explanation:</h2>
My.Computer.FileSystem.GetFiles is used with the *.* pattern to search the specified folder for all files. The FileIO.SearchOption.SearchTopLevelOnly parameter means that only the top level of the folder is searched, so the second and third levels of subfolders are not searched. Each file that matches *.* has its path added to the file ArrayList. Finally, a loop outputs the data in file to ListBox1.

<strong> Project file download: Xun6 | <a href="http://www.4shared.com/file/f9VObDik/ArrayList.html ">4Shared </a>| <a href="http://www.box.net/shared/r66otb3puc">Box.net</a></strong>
