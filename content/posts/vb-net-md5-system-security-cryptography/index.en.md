---
title: "How to Compute an MD5 Hash in VB.NET (System.Security.Cryptography)"
date: 2011-07-26T12:17:23
slug: "vb-net-md5-system-security-cryptography"
tags: ["VB", ".NET", "MD5"]
categories: ["Programming"]
draft: false
---

Recently I was writing a password generator and needed to compute an MD5 hash. In PHP I can just call md5() to get an MD5 hash, but I had never actually tried MD5 in VB. I was worried that .NET might not have any MD5 support, in which case I would have to write it myself.... Orz. Luckily, when I checked MSDN, it turned out to be there. The process was a bit of a hassle, but fortunately MSDN provides a getMD5hash function, so I simply reused it.


<!--more-->
The following function is taken from MSDN; I'm mentioning that up front.

P.S. To use this function, you need to import System, System.Text, and System.Security.Cryptography.
<pre lang="vb">Imports System
Imports System.Security.Cryptography
Imports System.Text</pre>
If you use another .NET language, you can also check MSDN; they have ready-made functions there (in the examples section).  <a href="http://msdn.microsoft.com/zh-tw/library/system.security.cryptography.md5.aspx">http://msdn.microsoft.com/zh-tw/library/system.security.cryptography.md5.aspx</a>
<pre lang="vb">Function getMd5Hash(ByVal input As String) As String    'MD5 hash function, taken from MSDN
	' Create an MD5 object
	Dim md5Hasher As MD5 = MD5.Create()

	' Convert input to an MD5 hash and return it as Bytes. ComputeHash only accepts a Bytes-type argument, so the input must first be converted to Bytes.
	Dim data As Byte() = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input))

	' Create a StringBuilder object
	Dim sBuilder As New StringBuilder()

	' Convert the Bytes to a String, storing them in hexadecimal
	Dim i As Integer
	For i = 0 To data.Length - 1
		sBuilder.Append(data(i).ToString("x2"))
	Next i

	'Return
	Return sBuilder.ToString()

End Function</pre>
