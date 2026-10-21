---
title: "How to Access Yahoo! Messenger from Code (Change Status, Log In/Out, etc.) (VB Example)"
date: 2010-11-07T14:39:23
slug: "program-yahoo-messenger-status-login-logout-2"
tags: ["VB", "Instant Messaging"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_153926.jpg"><img class="size-large wp-image-3955 aligncenter" title="2010-11-07_153926" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_153926-520x292.jpg" alt="" width="520" height="292" /></a></p>
The day before yesterday, a few classmates got bored and started passing around prank programs that change Yahoo! Messenger statuses. That gave me the inspiration to design an advanced version of this status prank program. Writing a program that changes the status in Yahoo! Messenger is actually not hard, because Yahoo itself provides a COM component that makes it easy to configure the messenger. This COM component is called YahooMessengerLib. As far as I know, it can do the following: change the status, get the current status, and log in or out of Yahoo! Messenger. So let me show you how to use the YahooMessengerLib COM component~


<!--more-->


In this tutorial we will use VB.NET. However, the YahooMessengerLib component is not limited to VB.NET; other languages can use it too (for example, VB6 and VC++).
<h2>1. How to Add YahooMessengerLib to Your Project</h2>
1. Create a new [Windows Form Application] project, then click [Project] → [Add Reference], in that order.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_132848.jpg"><img class="alignnone size-large wp-image-3935" title="2010-11-07_132848" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_132848-520x311.jpg" alt="" width="520" height="311" /></a>

2. Select the [COM] tab, choose Yahoo! Messenger TypeLib, and click [OK]. Yahoo! Messenger TypeLib is now added to your project.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133120.jpg"><img class="alignnone size-full wp-image-3936" title="2010-11-07_133120" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133120.jpg" alt="" width="517" height="395" /></a>

P.S. The steps are the same for all versions of Visual Studio.
<h2>2. Accessing Yahoo! Messenger with YahooMessengerLib</h2>
After Yahoo! Messenger TypeLib has been added to your project, the next step is, of course, to write code to control it.

1. Open the code editor and add the following code at the top to reference Yahoo! Messenger TypeLib:
<pre lang="vb">Imports YahooMessengerLib</pre>
2. Next, under Public Class FormName, add the following code to create a Messenger2 object:
<pre lang="vb">Dim message As New Messenger2</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133945.jpg"><img class="alignnone size-large wp-image-3937" title="2010-11-07_133945" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133945-520x311.jpg" alt="" width="520" height="311" /></a>

3. Next, add a Button to the form, and write the following code under the Button:
<pre lang="vb">message.Me.Status.SetCustomStatus("你想打得狀態", 0, DBNull.Value, DBNull.Value)</pre>
If you are using VB6, the code here should be:
<pre lang="vb">message.Me.Status.SetCustomStatus("你想打得狀態", 0, Null, Null)</pre>
The code above lets you change your Yahoo! Messenger status. message is the object declared in step 2. The second parameter of SetCustomStatus sets whether you are available or busy: 0 means available, and 1 means busy. Besides setting the status, you can do many other things. Below are some of the uses I know of so far:
<pre lang="vb">message.Login()                     'If you have saved your Yahoo! Messenger account and password, you can log in directly with this method
message.Logout()                    'Log out of Yahoo! Messenger
message.LoginUser("帳號", "密碼")    'Log in with the specified account and password
message.Me.status.message()         'Get the status currently set in Yahoo! Messenger</pre>
P.S. If the Yahoo! Messenger main program is not running when you run this program, an error will occur. So it is recommended to check whether Yahoo! Messenger is running first, or to start the main program before running the other code.
<h2>Sample Code</h2>
Project file download: Xun6 | <a href="http://www.4shared.com/file/wDcAd3KQ/YahooMessengerLib_2.html ">4Shared</a>| <a href="http://www.box.net/shared/bvns7ylrj5">Box.net</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_143238.jpg"><img class="alignnone size-full wp-image-3938" title="2010-11-07_143238" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_143238.jpg" alt="" width="379" height="423" /></a>
<pre lang="vb">Imports YahooMessengerLib

Public Class Form1
    Dim message As New Messenger2

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Try
            Label4.Text = message.Me.status.message()         'Get the status currently set in Yahoo! Messenger
        Catch er As System.NullReferenceException   'Error message when Yahoo! Messenger is not open
            MsgBox("即時通沒有開啟或登入")
        End Try
    End Sub

    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click
        message.Login()                     'If you have saved your Yahoo! Messenger account and password, you can log in directly with this method
    End Sub

    Private Sub Button3_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button3.Click
        message.Logout()                    'Log out of Yahoo! Messenger
    End Sub

    Private Sub Button4_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button4.Click
        message.LoginUser(TextBox1.Text, TextBox2.Text)   'Log in with the specified account and password
    End Sub

    Private Sub Button5_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button5.Click
        Try
            message.Me.Status.SetCustomStatus(TextBox3.Text, 0, DBNull.Value, DBNull.Value)     'Set the Yahoo! Messenger status
        Catch er As System.NullReferenceException       'Error message when Yahoo! Messenger is not open
            MsgBox("即時通沒有開啟或登入")
        End Try

    End Sub

End Class</pre>
Earlier I mentioned that I also wrote an advanced version of the prank program. The only difference is that it adds the ability to remotely control other people's statuses. I put a TXT file on my virtual host, and the program reads the data in that TXT file and displays it as the status. I also wrote a PHP program to modify the contents of the TXT file. The source code for this program can be downloaded from the locations below:

<a href="http://www.4shared.com/file/Kctof7bR/_online.html ">4Shared </a>|<a href="http://www.box.net/shared/5hkhibk1yc"> Box.net</a> | Xun6
