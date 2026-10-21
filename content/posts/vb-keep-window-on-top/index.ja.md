---
title: "SetWindowPos でウィンドウを常に最前面に表示する"
date: 2009-02-14T15:04:00
slug: "vb-keep-window-on-top"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

まず、プログラムに Timer コンポーネントを追加します。

タイマー（名前は timer1）を有効にします。

Interval を 100 に設定します。

次に、以下のコードを入力します（そのまま貼り付けて、既存のコードを上書きしてください）。
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
