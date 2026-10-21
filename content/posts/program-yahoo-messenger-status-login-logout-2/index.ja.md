---
title: "Yahoo! Messenger をプログラムから操作する方法（ステータス変更・ログイン・ログアウトなど）（VB の例）"
date: 2010-11-07T14:39:23
slug: "program-yahoo-messenger-status-login-logout-2"
tags: ["VB", "Instant Messaging"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_153926.jpg"><img class="size-large wp-image-3955 aligncenter" title="2010-11-07_153926" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_153926-520x292.jpg" alt="" width="520" height="292" /></a></p>
一昨日、クラスの友達が面白半分に、Yahoo! Messenger のステータスを変えるいたずらプログラムを送り合い始めました。それがきっかけで、このステータスいたずらプログラムの発展版を作ってみようというひらめきを得ました。Yahoo! Messenger のステータスを変更するプログラムを作るのは、実はそれほど難しくありません。Yahoo が Messenger を簡単に設定できる COM コンポーネントを提供しているからです。この COM は YahooMessengerLib と呼ばれ、私の知る限り、Yahoo! Messenger に対して次の操作ができます：ステータスの変更、現在のステータスの取得、Yahoo! Messenger へのログインまたはログアウト。それでは、YahooMessengerLib という COM コンポーネントの使い方を紹介しましょう～


<!--more-->


以下では VB.NET を使って解説しますが、YahooMessengerLib コンポーネントは VB.NET だけでなく、ほかの言語からも利用できます（例：VB6、VC++）。
<h2>一．YahooMessengerLib をプロジェクトに追加する</h2>
1.【Windows Form アプリケーション】のプロジェクトを新規作成し、【プロジェクト】→【参照の追加】の順にクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_132848.jpg"><img class="alignnone size-large wp-image-3935" title="2010-11-07_132848" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_132848-520x311.jpg" alt="" width="520" height="311" /></a>

2.【COM】タブを選択し、Yahoo! Messenger TypeLib を選んで【OK】をクリックすると、Yahoo! Messenger TypeLib がプロジェクトに追加されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133120.jpg"><img class="alignnone size-full wp-image-3936" title="2010-11-07_133120" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133120.jpg" alt="" width="517" height="395" /></a>

P.S. Visual Studio の各バージョンでも手順は同じです。
<h2>二．YahooMessengerLib で Yahoo! Messenger にアクセスする</h2>
Yahoo! Messenger TypeLib をプロジェクトに追加できたら、次はもちろん、それを制御するコードを書きます。

1. コードエディターを開き、一番上に次のコードを追加して、Yahoo! Messenger TypeLib を参照します：
<pre lang="vb">Imports YahooMessengerLib</pre>
2. 次に、Public Class フォーム名 の下に次のコードを追加して、Messenger2 オブジェクトを作成します：
<pre lang="vb">Dim message As New Messenger2</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133945.jpg"><img class="alignnone size-large wp-image-3937" title="2010-11-07_133945" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_133945-520x311.jpg" alt="" width="520" height="311" /></a>

3. 次に、フォームに Button を1つ追加し、Button の下に次のコードを書きます：
<pre lang="vb">message.Me.Status.SetCustomStatus("你想打得狀態", 0, DBNull.Value, DBNull.Value)</pre>
VB6 の場合、ここのコードは次のようになります：
<pre lang="vb">message.Me.Status.SetCustomStatus("你想打得狀態", 0, Null, Null)</pre>
上のコードで Yahoo! Messenger のステータスを変更できます。message は手順2で宣言したオブジェクトです。SetCustomStatus の2番目の引数は、空き中か取り込み中かを設定するもので、0 が空き中、1 が取り込み中です。ステータスの設定以外にも、さまざまな使い方があります。以下は、私が現在知っている使い方の一部です：
<pre lang="vb">message.Login()                     'Yahoo! Messenger のアカウントとパスワードを保存している場合は、このメソッドで直接ログインできます
message.Logout()                    'Yahoo! Messenger からログアウトします
message.LoginUser("帳號", "密碼")    '指定したアカウントとパスワードでログインします
message.Me.status.message()         '現在 Yahoo! Messenger に設定されているステータスを取得します</pre>
P.S. このプログラムを実行したときに Yahoo! Messenger のメインプログラムが起動していないと、エラーになります。そのため、先に Yahoo! Messenger が起動しているかを確認するか、メインプログラムを先に起動してから他のコードを実行することをおすすめします。
<h2>サンプルコード</h2>
プロジェクトファイルのダウンロード：Xun6 | <a href="http://www.4shared.com/file/wDcAd3KQ/YahooMessengerLib_2.html ">4Shared</a>| <a href="http://www.box.net/shared/bvns7ylrj5">Box.net</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_143238.jpg"><img class="alignnone size-full wp-image-3938" title="2010-11-07_143238" src="{{< param imageBase >}}/wp-content/uploads/2010/11/2010-11-07_143238.jpg" alt="" width="379" height="423" /></a>
<pre lang="vb">Imports YahooMessengerLib

Public Class Form1
    Dim message As New Messenger2

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Try
            Label4.Text = message.Me.status.message()         'Yahoo! Messenger に設定されているステータスを取得
        Catch er As System.NullReferenceException   'Yahoo! Messenger が開いていないときのエラーメッセージ
            MsgBox("即時通沒有開啟或登入")
        End Try
    End Sub

    Private Sub Button2_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button2.Click
        message.Login()                     'Yahoo! Messenger のアカウントとパスワードを保存している場合は、このメソッドで直接ログインできます
    End Sub

    Private Sub Button3_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button3.Click
        message.Logout()                    'Yahoo! Messenger からログアウトします
    End Sub

    Private Sub Button4_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button4.Click
        message.LoginUser(TextBox1.Text, TextBox2.Text)   '指定したアカウントとパスワードでログインします
    End Sub

    Private Sub Button5_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button5.Click
        Try
            message.Me.Status.SetCustomStatus(TextBox3.Text, 0, DBNull.Value, DBNull.Value)     'Yahoo! Messenger のステータスを設定
        Catch er As System.NullReferenceException       'Yahoo! Messenger が開いていないときのエラーメッセージ
            MsgBox("即時通沒有開啟或登入")
        End Try

    End Sub

End Class</pre>
先ほど、いたずらプログラムの発展版も作ったとお伝えしました。その違いは、他人のステータスを遠隔操作できる仕組みを加えたことだけです。仮想ホストに TXT ファイルを置き、プログラムがその TXT ファイルの内容を読み込んでステータスとして表示するようにしています。さらに、TXT ファイルの内容を書き換える PHP プログラムも書きました。このプログラムのソースコードは、以下からダウンロードできます：

<a href="http://www.4shared.com/file/Kctof7bR/_online.html ">4Shared </a>|<a href="http://www.box.net/shared/5hkhibk1yc"> Box.net</a> | Xun6
