---
title: "如何寫程式對Yahoo! Messenger進行存取(修改狀態、登入、登出等)(以VB作範例)"
date: 2010-11-07T14:39:23
slug: "program-yahoo-messenger-status-login-logout-2"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%af%ab%e7%a8%8b%e5%bc%8f%e5%b0%8dyahoo-messenger%e9%80%b2%e8%a1%8c%e5%ad%98%e5%8f%96%e4%bf%ae%e6%94%b9%e7%8b%80%e6%85%8b%e3%80%81%e7%99%bb%e5%85%a5%e3%80%81%e7%99%bb%e5%87%ba-2/"]
tags: ["VB", "Instant Messaging"]
categories: ["Programming"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_153926.jpg"><img class="size-large wp-image-3955 aligncenter" title="2010-11-07_153926" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_153926-520x292.jpg" alt="" width="520" height="292" /></a></p>
好像是在前天時班上幾個同學開始很無聊的亂傳所謂的改即時通狀態的惡作劇程式,就激發了我的靈感去設計了一個進階版的即時通狀態惡作劇程式,其實要寫成是來修改及時通的狀態並不難,因為Yahoo本身就有提供COM元件讓你很方便的去對即時通進行設定,這個COM就叫YahooMessengerLib,目前我所知他可以對即時通進行以下工作：修改狀態、取得現在狀態、登入或登出即時通,以下就讓站長教大家如何去使用YahooMessengerLib這個COM元件吧~


<!--more-->


以下我們以VB.net進行教學,其實不只是VB.NET可以用YahooMessengerLib元件,其他語言也可以用(例如VB6.VC++)
<h2>一.如何將YahooMessengerLib加入到你的專案中</h2>
1.建立一個新的【Windows Form應用程式】專案,然後依序點選【專案】→【加入參考】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_132848.jpg"><img class="alignnone size-large wp-image-3935" title="2010-11-07_132848" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_132848-520x311.jpg" alt="" width="520" height="311" /></a>

2.選擇【COM】頁籤,然後選擇Yahoo! Messenger TypeLib在按【確定】就成功把Yahoo! Messenger TypeLib加入到自己的專案中了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133120.jpg"><img class="alignnone size-full wp-image-3936" title="2010-11-07_133120" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133120.jpg" alt="" width="517" height="395" /></a>

P.S.VS各系列的做法也相同
<h2>二.用YahooMessengerLib來存取及時通</h2>
成功把Yahoo! Messenger TypeLib加入到自己的專案中之後,當然是要寫程式碼來控制他

1.進入程式碼輸入的視窗中,然後在最上方加入下面的程式碼來引用Yahoo! Messenger TypeLib
<pre lang="vb">Imports YahooMessengerLib</pre>
2.接者在Public Class 表單名稱的底下加入以下程式碼以建立Messenger2物件
<pre lang="vb">Dim message As New Messenger2</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133945.jpg"><img class="alignnone size-large wp-image-3937" title="2010-11-07_133945" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133945-520x311.jpg" alt="" width="520" height="311" /></a>

3.再來請在表單上面加入一個Button物件,並且在Button物件底下寫入一下程式碼
<pre lang="vb">message.Me.Status.SetCustomStatus("你想打得狀態", 0, DBNull.Value, DBNull.Value)</pre>
如果是VB6的話這裡的程式碼應該是:
<pre lang="vb">message.Me.Status.SetCustomStatus("你想打得狀態", 0, Null, Null)</pre>
上面的程式碼是可以讓你修改及時通狀態的,其中message是來自於第二步的宣告,另外SetCustomStatus的第二個參數是設定目前有空或忙碌中,0=目前有空,1=忙碌中,除了可以設定狀態之後來可以做很多花樣,下面是我目前所知道的一些用法
<pre lang="vb">message.Login()                     '如果你有儲存即時通的帳號密碼,就可以直接用此方法登入及時
message.Logout()                    '登出及時
message.LoginUser("帳號", "密碼")    '登入指定帳號密碼
message.Me.status.message()         '取得當前即時通設定的狀態</pre>
P.S.在執行此程式時如果沒有啟動即時通主程式就會導致錯誤,因此建議先檢查即時通主程式是否有啟動或是先啟動主程式在執行其他程式碼
<h2>範例程式</h2>
專案檔載點：Xun6 | <a href="http://www.4shared.com/file/wDcAd3KQ/YahooMessengerLib_2.html ">4Shared</a>| <a href="http://www.box.net/shared/bvns7ylrj5">Box.net</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_143238.jpg"><img class="alignnone size-full wp-image-3938" title="2010-11-07_143238" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_143238.jpg" alt="" width="379" height="423" /></a>
<pre lang="vb">Imports YahooMessengerLib

Public Class Form1
    Dim message As New Messenger2

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Try
            Label4.Text = message.Me.status.message()         '取得當前即時通設定的狀態
        Catch er As System.NullReferenceException   '當即時通沒有開啟時的錯誤訊息
            MsgBox("即時通沒有開啟或登入")
        End Try
    End Sub

    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click
        message.Login()                     '如果你有儲存即時通的帳號密碼,就可以直接用此方法登入及時
    End Sub

    Private Sub Button3_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button3.Click
        message.Logout()                    '登出及時
    End Sub

    Private Sub Button4_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button4.Click
        message.LoginUser(TextBox1.Text, TextBox2.Text)   '登入指定帳號密碼
    End Sub

    Private Sub Button5_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button5.Click
        Try
            message.Me.Status.SetCustomStatus(TextBox3.Text, 0, DBNull.Value, DBNull.Value)     '設定即時通狀態
        Catch er As System.NullReferenceException       '當即時通沒有開啟時的錯誤訊息
            MsgBox("即時通沒有開啟或登入")
        End Try

    End Sub

End Class</pre>
另外在一開始我有提到我寫了一個進階版的惡作劇程式,其實就只是多了可以遠端控制別人狀態的設計,我在我的虛擬主機上面放了一個TXT檔案,然後讓程式去讀取txt檔裡的資料並顯示到狀態上面,另外寫了一個php的程式來修改txt檔的內容,關於這套程式的原始碼請到以下位置下載

<a href="http://www.4shared.com/file/Kctof7bR/_online.html ">4Shared </a>|<a href="http://www.box.net/shared/5hkhibk1yc"> Box.net</a> | Xun6
