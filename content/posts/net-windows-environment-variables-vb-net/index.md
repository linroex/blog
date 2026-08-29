---
title: "在.NET程式裡面要如何取用Windows的環境變數(系統變數) - 以VB.Net作範例"
date: 2011-02-11T09:55:35
slug: "net-windows-environment-variables-vb-net"
aliases: ["/posts/%e5%9c%a8-net%e7%a8%8b%e5%bc%8f%e8%a3%a1%e9%9d%a2%e8%a6%81%e5%a6%82%e4%bd%95%e5%8f%96%e7%94%a8windows%e7%9a%84%e7%92%b0%e5%a2%83%e8%ae%8a%e6%95%b8%e7%b3%bb%e7%b5%b1%e8%ae%8a%e6%95%b8-%e4%bb%a5vb-n/"]
tags: ["Windows", "VB", ".NET", "環境變數"]
categories: []
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_144258.jpg"><img class="alignnone size-full wp-image-165" title="2010-11-07_144258" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_144258.jpg" alt="" width="394" height="406" /></a></p>
有寫過CMD的人都知道環境變數這個東西,他可以讓你很方便的獲得一些每一台電腦都不一樣的訊息,例如使用者名稱,每一台電腦都不相同,這時候就可以使用環境變數來取得,只不過在cmd裡要取用環境變數很簡單,只要用%環境變數名稱%的方式就能取用,但是在.NET程式中沒有這麼簡單,需要使用到Environ函式
<h2>
<!--more-->
在.NET中取用環境變數</h2>
在.NET中要取用系統變數需要使用Environ函式,此函式用法簡單,格式如下：
<pre lang="vb">Environ("環境變數名稱")</pre>
P.S.注意環境變數部分要把它當一個字串,而不是變數,所以要用雙引號框住

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_150250.jpg"><img class="alignnone size-large wp-image-167" title="2010-11-07_150250" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_150250-540x303.jpg" alt="" width="540" height="303" /></a>
<h3>範例:(主控台應用程式)</h3>
<pre lang="vb">Module Module1

    Sub Main()
        Console.WriteLine("CPU核心數:" &amp; Environ("NUMBER_OF_PROCESSORS"))
        Console.ReadLine()
    End Sub

End Module</pre>
<h2>常見的系統變數名稱</h2>
以下列舉出一些常見到的系統變數名稱,可以方便你取得一些每台電腦都不同的資訊,例如CPU核心數,使用者名稱等
<table border="0" cellspacing="0" cellpadding="0" width="683">
<tbody>
<tr>
<td width="188">SystemRoot</td>
<td width="191">作業系統根目錄位置</td>
<td width="304">C:WINDOWS</td>
</tr>
<tr>
<td width="188">ComSpec</td>
<td width="191">CMD所在位置</td>
<td width="304">C:WINDOWSsystem32cmd.exe</td>
</tr>
<tr>
<td width="188">NUMBER_OF_PROCESSORS</td>
<td width="191">CPU核心數</td>
<td width="304">4</td>
</tr>
<tr>
<td width="188">TEMP</td>
<td width="191">系統暫存料夾的位置</td>
<td width="304">C:WINDOWSTEMP</td>
</tr>
<tr>
<td width="188">HOMEDRIVE</td>
<td width="191">當前系統所在分割區</td>
<td width="304">C:</td>
</tr>
<tr>
<td width="188">HOMEPATH</td>
<td width="191">列出當前使用者的資料夾位置</td>
<td width="304">useradministrator</td>
</tr>
<tr>
<td width="188">OS</td>
<td width="191">當前使用之作業系統的名稱</td>
<td width="304">Windows NT</td>
</tr>
<tr>
<td width="188">ProgramFiles</td>
<td width="191">ProgramFiles資料夾的位置</td>
<td width="304">C:ProgramFiles</td>
</tr>
<tr>
<td width="188">USERNAME</td>
<td width="191">當前使用者名稱</td>
<td width="304">Administrator</td>
</tr>
<tr>
<td width="188">COMPUTERNAME</td>
<td width="191">取得電腦名稱</td>
<td width="304">LINROEX-PC</td>
</tr>
</tbody>
</table>
