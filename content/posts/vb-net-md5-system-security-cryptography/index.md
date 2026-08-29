---
title: "如何在VB.Net裡面計算MD5碼？ （System.Security.Cryptography）"
date: 2011-07-26T12:17:23
slug: "vb-net-md5-system-security-cryptography"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%9c%a8vb-net%e8%a3%a1%e9%9d%a2%e8%a8%88%e7%ae%97md5%e7%a2%bc%ef%bc%9f-%ef%bc%88system-security-cryptography%ef%bc%89/"]
tags: ["VB", ".NET", "MD5"]
categories: []
---

最近因為寫了一個密碼產生器，剛好需要用到md5運算，平常在PHP時都是直接用md5()就可以取得MD5碼了，可是VB我沒有實際嘗試去用過MD5碼，原本還在擔心.NET裡面會不會沒有MD5的資源，這樣子就必須要自己來寫....Orz，幸好去查了一下MSDN的結果是有的～ 只是過程稍微負責了點，不過也幸好MSDN有提供一個getMD5hash的function，所以我就直接引用啦


<!--more-->
以下這段函式是引用自MSDN的，在這裡先聲明囉

P.S.使用此函式，需要載入system、system.text、System.Security.Cryptography
<pre lang="vb">Imports System
Imports System.Security.Cryptography
Imports System.Text</pre>
另外你如果是使用其他語言（.Net）的話，也可以到MSDN上找看看，都有寫好現成的函式了（在範例那裏）  <a href="http://msdn.microsoft.com/zh-tw/library/system.security.cryptography.md5.aspx">http://msdn.microsoft.com/zh-tw/library/system.security.cryptography.md5.aspx</a>
<pre lang="vb">Function getMd5Hash(ByVal input As String) As String    'MD5計算Function,取自MSDN
	' 建立一個MD5物件
	Dim md5Hasher As MD5 = MD5.Create()

	' 將input轉換成MD5，並且以Bytes傳回，由於ComputeHash只接受Bytes型別參數，所以要先轉型別為Bytes
	Dim data As Byte() = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input))

	' 建立一個StringBuilder物件
	Dim sBuilder As New StringBuilder()

	' 將Bytes轉型別為String，並且以16進位存放
	Dim i As Integer
	For i = 0 To data.Length - 1
		sBuilder.Append(data(i).ToString("x2"))
	Next i

	'傳回
	Return sBuilder.ToString()

End Function</pre>
