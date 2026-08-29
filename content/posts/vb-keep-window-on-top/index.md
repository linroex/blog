---
title: "利用SetWindowPos讓視窗永遠置於最上方"
date: 2009-02-14T15:04:00
slug: "vb-keep-window-on-top"
aliases: ["/posts/vb%e7%a8%8b%e5%bc%8f%e7%bd%ae%e9%a0%82/"]
tags: ["VB"]
categories: ["VB.NET"]
---

首先請在程式裡加入timer元件

並啟用timer(名稱timer1)

秒數部分設100

然後輸入以下代碼(直接貼上並蓋掉原本的程式碼)
<pre lang="vb">Option Strict Off

Option Explicit On

Public Class Form1

Inherits System.Windows.Forms.Form

Private Declare Function SetWindowPos Lib "user32" (ByVal hwnd As Integer, ByVal hWndInsertAfter As Integer, ByVal X As Integer, ByVal Y As Integer, ByVal cx As Integer, ByVal cy As Integer, ByVal wFlags As Integer) As Integer

Dim IntR As Object

Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

Me.Top = 0

Me.Left = 0

Me.Width = System.Windows.Forms.Screen.PrimaryScreen.Bounds.Width

Me.Height = System.Windows.Forms.Screen.PrimaryScreen.Bounds.Height

End Sub

Private Sub Timer1_Tick(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Timer1.Tick

IntR = SetWindowPos(Me.Handle.ToInt32, -1, 0, 0, 0, 0, 3)

End Sub

End Class</pre>
