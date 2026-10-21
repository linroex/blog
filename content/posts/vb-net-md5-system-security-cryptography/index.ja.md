---
title: "VB.NET で MD5 ハッシュを計算する方法（System.Security.Cryptography）"
date: 2011-07-26T12:17:23
slug: "vb-net-md5-system-security-cryptography"
tags: ["VB", ".NET", "MD5"]
categories: ["Programming"]
draft: false
---

最近パスワード生成ツールを作っていて、MD5 の計算が必要になりました。PHP では md5() を呼ぶだけで MD5 ハッシュが得られますが、VB では実際に MD5 を使ったことがありませんでした。.NET に MD5 の機能がなければ自分で実装しなければならないのではと心配でしたが……Orz。MSDN で調べたところ、ちゃんと用意されていました。少し手間取りましたが、MSDN に getMD5hash という関数があったので、そのまま使わせてもらうことにしました。


<!--more-->
以下の関数は MSDN から引用したものであることを、先に明記しておきます。

P.S. この関数を使うには、System、System.Text、System.Security.Cryptography を読み込む必要があります。
<pre lang="vb">Imports System
Imports System.Security.Cryptography
Imports System.Text</pre>
ほかの .NET 言語を使っている場合も、MSDN を見てみてください。サンプルのところに既成の関数が用意されています。  <a href="http://msdn.microsoft.com/zh-tw/library/system.security.cryptography.md5.aspx">http://msdn.microsoft.com/zh-tw/library/system.security.cryptography.md5.aspx</a>
<pre lang="vb">Function getMd5Hash(ByVal input As String) As String    'MD5 ハッシュ計算の関数（MSDN から引用）
	' MD5 オブジェクトを作成する
	Dim md5Hasher As MD5 = MD5.Create()

	' input を MD5 に変換し、Bytes として返す。ComputeHash は Bytes 型の引数しか受け付けないため、先に Bytes 型へ変換しておく
	Dim data As Byte() = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input))

	' StringBuilder オブジェクトを作成する
	Dim sBuilder As New StringBuilder()

	' Bytes を String に変換し、16 進数で格納する
	Dim i As Integer
	For i = 0 To data.Length - 1
		sBuilder.Append(data(i).ToString("x2"))
	Next i

	'返す
	Return sBuilder.ToString()

End Function</pre>
