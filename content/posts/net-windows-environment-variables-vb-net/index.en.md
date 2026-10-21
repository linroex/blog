---
title: "How to Read Windows Environment Variables (System Variables) in a .NET Program - VB.NET Example"
date: 2011-02-11T09:55:35
slug: "net-windows-environment-variables-vb-net"
tags: ["VB", ".NET", "Windows"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_144258.jpg"><img class="alignnone size-full wp-image-165" title="2010-11-07_144258" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_144258.jpg" alt="" width="394" height="406" /></a></p>
Anyone who has written CMD knows about environment variables. They let you easily get information that differs from one computer to another, such as the user name. In CMD, using an environment variable is simple: you just write it in the %environment variable name% format. In a .NET program, though, it isn't that simple. You need to use the Environ function.
<h2>
<!--more-->
Reading Environment Variables in .NET</h2>
In .NET, you read system variables with the Environ function. The function is simple to use, and its format is as follows:
<pre lang="vb">Environ("環境變數名稱")</pre>
P.S. Note that the environment variable name should be treated as a string, not a variable, so wrap it in double quotes.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_150250.jpg"><img class="alignnone size-large wp-image-167" title="2010-11-07_150250" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2010-11-07_150250-540x303.jpg" alt="" width="540" height="303" /></a>
<h3>Example (console application):</h3>
<pre lang="vb">Module Module1

    Sub Main()
        Console.WriteLine("CPU核心數:" &amp; Environ("NUMBER_OF_PROCESSORS"))
        Console.ReadLine()
    End Sub

End Module</pre>
<h2>Common Windows Environment Variable Names</h2>
Below are some common environment variable names. They're handy for getting information that differs from one computer to another, such as the number of CPU cores or the user name.
<table border="0" cellspacing="0" cellpadding="0" width="683">
<tbody>
<tr>
<td width="188">SystemRoot</td>
<td width="191">Location of the operating system root directory</td>
<td width="304">C:WINDOWS</td>
</tr>
<tr>
<td width="188">ComSpec</td>
<td width="191">Location of CMD</td>
<td width="304">C:WINDOWSsystem32cmd.exe</td>
</tr>
<tr>
<td width="188">NUMBER_OF_PROCESSORS</td>
<td width="191">Number of CPU cores</td>
<td width="304">4</td>
</tr>
<tr>
<td width="188">TEMP</td>
<td width="191">Location of the system temp folder</td>
<td width="304">C:WINDOWSTEMP</td>
</tr>
<tr>
<td width="188">HOMEDRIVE</td>
<td width="191">Drive where the current system is located</td>
<td width="304">C:</td>
</tr>
<tr>
<td width="188">HOMEPATH</td>
<td width="191">Shows the folder location of the current user</td>
<td width="304">useradministrator</td>
</tr>
<tr>
<td width="188">OS</td>
<td width="191">Name of the operating system in use</td>
<td width="304">Windows NT</td>
</tr>
<tr>
<td width="188">ProgramFiles</td>
<td width="191">Location of the ProgramFiles folder</td>
<td width="304">C:ProgramFiles</td>
</tr>
<tr>
<td width="188">USERNAME</td>
<td width="191">Current user name</td>
<td width="304">Administrator</td>
</tr>
<tr>
<td width="188">COMPUTERNAME</td>
<td width="191">Get the computer name</td>
<td width="304">LINROEX-PC</td>
</tr>
</tbody>
</table>
