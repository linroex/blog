---
title: "Keep a Window Always on Top with SetWindowPos"
date: 2009-02-14T15:04:00
slug: "vb-keep-window-on-top"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

First, add a Timer control to the program.

Enable the timer (named timer1).

Set its interval to 100.

Then enter the following code (paste it over the existing code, replacing what is already there).
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
