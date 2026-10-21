---
title: "VB でキーボード操作をシミュレートする"
date: 2008-11-26T10:12:00
slug: "vb-keyboard-simulation"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

キーボードは、コンピューターを使ううえで今も非常に重要な入力デバイスです。マウスが主流の今日でも、多くのプログラムはキーボードなしでは操作できません。しかし、繰り返しの多い面倒なキー操作は人を疲れさせるため、キー入力をプログラムに代わりに行わせるという発想が生まれました。これにより多くの手間を省けます。按鍵精靈（キーボードマクロツール）がまさにそのようなソフトウェアです。では、VB を使って按鍵精靈に似た機能のプログラムを書くにはどうすればよいのでしょうか。まずは、Windows がキーボードイベントに反応する仕組みを理解しましょう。


<!--more-->


ユーザーがキーを押すと、キーボード内のチップがその動作を検出し、信号をコンピューターに送ります。では、どのキーが押されたかをどのように区別するのでしょうか。キーボードのすべてのキーには、キーボードスキャンコードと呼ばれるコードが割り当てられています。キーを押すと、そのキーのスキャンコードがシステムに送られます。スキャンコードはハードウェアに依存するため、同じキーでもキーボードによって異なる場合があります。キーボードコントローラーはこのスキャンコードをコンピューターに送り、それがキーボードドライバーに渡されます。キーボードドライバーは必要な処理を行い、スキャンコードを仮想キーコードに変換します。では仮想キーコードとは何でしょうか。スキャンコードはハードウェアに依存して汎用性がないため、すべてのキーに統一されたコードを与えるために仮想キーコードという概念が導入されました。どのキーボードでも、同じキーの仮想キーコードは常に同じなので、プログラムはそれを認識できます。簡単に言えば、仮想キーコードとは VK_A、VK_B のような、よく目にする定数のことです。たとえば A キーの仮想キーコードは 65 で、16 進数では &H41 です。仮想キーコードは 16 進数で書くことが多い点に注意してください。キーボードドライバーがスキャンコードを仮想キーコードに変換すると、そのキー操作のスキャンコードや仮想キーコードなどの情報が、オペレーティングシステムに渡されます。オペレーティングシステムはこの情報をメッセージにまとめ、キーボードメッセージをメッセージキューに挿入します。最後に、特に問題がなければ、そのキーボードメッセージは現在アクティブなウィンドウに届けられます。そのウィンドウのアプリケーションがメッセージを受け取ると、どのキーが押されたかが分かり、ユーザーへの応答を決めることができます。この流れは次のように要約できます。

ユーザーがキーを押す ----- キーボードドライバーがイベントをオペレーティングシステムに渡す ----- オペレーティングシステムがキーボードイベントをメッセージキューに挿入する ----- キーボードメッセージが現在アクティブなウィンドウに送られる

この流れが分かれば、その途中のどの段階でもキー操作をシミュレートするプログラムを作れます。VB にはキー操作をシミュレートする方法がいくつかあります。ここではその代表的なものをいくつか紹介します。

1. ローカルレベルのシミュレーション

上の流れからわかるように、キーボードイベントは最終的にアクティブなウィンドウに送られ、それによって対象プログラムが反応します。したがって、最も直接的なシミュレーション方法は、キーボードメッセージを偽造して対象プログラムに直接送ることです。はは、これは実はとても簡単です。Windows には、対象プログラムにメッセージを直接送るための API 関数がいくつかあります。よく使われるのは SendMessage と PostMessage です。違いは、PostMessage はメッセージを対象プログラムに渡すだけで、その後のことは気にしないのに対し、SendMessage はメッセージを送った後、対象プログラムが何かを返すのを待つという点です。ここで注意してほしいのは、キーボードメッセージのシミュレーションには必ず PostMessage を使うことです。SendMessage を使うのは誤りです。キーボードメッセージのシミュレートには戻り値が必要ないため、戻り値を待つと対象プログラムが反応しなくなるおそれがあります。くれぐれも気をつけてください！ PostMessage の VB での宣言は次のとおりです。

Declare Function PostMessage Lib "user32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long

パラメーター hwnd は、メッセージを送りたい対象プログラム内のコントロールのハンドルです。パラメーター wMsg はメッセージの種類で、どのようなメッセージを送るかを指定します。最後に、wParam と lParam は、メッセージに付加されるデータで、その具体的な内容はメッセージによって決まります。

キー操作をシミュレートするかどうかは wMsg で決まります。よく使われるキーボードメッセージは次のとおりです。

WM_KEYDOWN：通常のキーが押されたことを表す

WM_KEYUP：通常のキーが離されたことを表す

WM_SYSKEYDOWN：Alt キーなどのシステムキーが押されたことを表す

WM_SYSKEYUP：Alt キーなどのシステムキーが離されたことを表す

上のいずれかのキーボードメッセージを送ると決めたら、wParam と lParam の決め方を見ていきましょう。キーボードメッセージでは、wParam の意味は比較的単純で、送りたいキーイベントの仮想キーコードを表します。たとえば、対象プログラムで A キーを押したようにシミュレートしたい場合は、wParam に VK_A を設定します。一方、lParam は複数の情報を含むため、やや複雑です。通常は 0 に設定しても構いませんが、シミュレーションをより本物に近づけたいなら、設定することをおすすめします。では lParam を詳しく見ていきましょう。lParam は long 型のパラメーターで、メモリ上では 4 バイトを占めます。2 進数では 00000000 00000000 00000000 00000000 で、合計 32 ビットです。右から数えて、一番右のビットを第 0 ビット、一番左のビットを第 31 ビットとします（0 ではなく 1 から数えないよう注意してください。数えるのは 0 からです）。0〜15 ビットはキーの繰り返し回数などの拡張情報を表します。16〜23 ビットはキーのスキャンコードです。24〜31 ビットは、キーが押されたか離されたかを表します。多くの場合 16 進数で書くので、&H00 00 00 00 となります。0〜15 ビットは一般に &H0001 です。キーが押された場合、24〜31 ビットは &H00、離された場合は &HC0 になります。では 16〜23 ビットのスキャンコードはどのように求めるのでしょうか。それには API 関数 MapVirtualKey を使います。この関数は、仮想キーコードをスキャンコードに変換したり、スキャンコードを仮想キーコードに変換したり、仮想キーコードを対応する文字の ASCII コードに変換したりできます。その VB での宣言は次のとおりです。

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

wCode は変換するコードです。wMapType は何からどこへ変換するかを指定します。仮想キーコードをスキャンコードに変換する場合は wMapType を 0 に、スキャンコードを仮想キーコードに変換する場合は 1 に、仮想キーコードを ASCII コードに変換する場合は 2 に設定します。ここまで分かれば、キーボードイベントの lParam パラメーターを組み立てられます。次は lParam を組み立てる関数です。

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

Function MakeKeyLparam(ByVal VirtualKey As Long, ByVal flag As Long) As Long

'パラメーター VirtualKey はキーの仮想キーコードです。flag はキーが押されたか離されたかを示し、WM_KEYDOWN と WM_KEYUP の定数で表します

Dim s As String

Dim Firstbyte As String 'lParam の 24〜31 ビット

If flag = WM_KEYDOWN Then 'キーが押された場合

Firstbyte = "00"

Else

Firstbyte = "C0" 'キーが離された場合

End If

Dim Scancode As Long

'キーのスキャンコードを取得

Scancode = MapVirtualKey(VirtualKey, 0)

Dim Secondbyte As String 'lParam の 16〜23 ビット、つまり仮想キーのスキャンコード

Secondbyte = Right("00" &amp; Hex(Scancode), 2)

s = Firstbyte &amp; Secondbyte &amp; "0001" '0001 は lParam の 0〜15 ビット、つまり連続入力回数などの拡張情報

MakeKeyLparam = Val("&amp;H" &amp; s)

End Function

この関数は、たとえば A キーを押す場合は lParam=MakeKeyLparam(VK_A,WM_KEYDOWN) のように呼び出します。とても簡単ですよね。注意すべき点として、メッセージを送るときに lParam を設定しても、システムはメッセージを届ける時点の状況に応じてこのパラメーターを設定し直すことがあります。そのため、対象プログラムが受け取るメッセージの lParam の値は、送ったものと異なる場合があります。面倒なら、0 に設定してしまっても構いません。ほとんどのプログラムでは影響ありませんから、ははは。

では、ここまでの準備ができたので、対象プログラムにキーボードメッセージを送ることができます。まず、メッセージを受け取るべき対象プログラム内のコントロールのハンドルを取得します。たとえば対象のコントロールハンドルが 12345 だとすると、その対象に A キーを押して離す操作をシミュレートするには、次のようにします（簡単にするため、lParam はここでは組み立てず、0 を渡します）。

PostMessage 12345，WM_KEYDOWN，VK_A，0&amp; 'A キーを押す

PostMessage 12345，WM_UP，VK_A，0&amp; 'A キーを離す

さて、これで 1 回のキー入力は完了です。すぐにメモ帳を開いて試してみたくなりますよね。まず FindWindowEx などの API 関数でメモ帳のコントロールハンドルを見つけ、それにキーボードメッセージを送ると、メモ帳に自動で文字が現れることを期待します。しかし、すぐに落胆することになります。あれ、まったく反応がない？ 感情を弄ばないでくださいよ~~~~~~~~~~55555555555555 いえいえ、続きを読んでください。

一般に、対象プログラムには複数のコントロールがあり、すべてのコントロールがキーボードメッセージに反応するわけではありません。キーボードメッセージを受け付けるコントロールに送って初めて、期待どおりの反応が得られます。メモ帳の場合、編集エリアは edit クラスのコントロールで、キーボードイベントに反応するのはそのコントロールだけです。メモ帳のメインフォームにメッセージを送っても意味がありません。では、メモ帳の編集ボックスのコントロールハンドルを探し、たとえば 54321 だとして、次のコードを書いてみましょう。

PostMessage 54321，WM_KEYDOWN，VK_F1，0&amp; 'F1 キーを押す

PostMessage 54321，WM_UP，VK_F1，0&amp; 'F1 キーを離す

いかがでしょうか。メモ帳の「ヘルプ」が開きましたか？ これは、対象プログラムが送ったメッセージを受け取ったことを示しています。なかなかいい感じですね〜〜〜〜〜〜〜〜

ただ、すぐに新しい問題が出てきます。メモ帳に自動で文字を入力するために A キーを押したようにシミュレートしたいのに、まったく反応がないのです！ いったいどうしたのでしょうか。

実は、対象プログラムに文字を送るには、WM_KEYDOWN と WM_KEYUP の 2 つのイベントだけでは不十分で、もう 1 つのイベント WM_CHAR が必要です。このメッセージは文字を表し、プログラムは入力された文字を受け取るためにこれを利用します。一般に、A、B、C などのキーだけが WM_CHAR メッセージを生成し、矢印キーやファンクションキーなど他のキーには、このメッセージはありません。WM_CHAR メッセージは通常、WM_KEYDOWN メッセージの後に発生します。WM_CHAR メッセージの lParam の意味は他のキーボードメッセージと同じですが、wParam は対応する文字の ASCII コードを表します（これで中国語も入力できるんですよ^_^）。では、メモ帳に文字を自動で書き込む完全なプログラムを書いてみましょう。以下はその例で、これらのメッセージ定数の具体的な値も含めています。

Declare Function PostMessage Lib "user32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

Public Const WM_KEYDOWN = &amp;H100

Public Const WM_KEYUP = &amp;H101

Public Const WM_CHAR = &amp;H102

Public Const VK_A = &amp;H41

Function MakeKeyLparam(ByVal VirtualKey As Long, ByVal flag As Long) As Long

Dim s As String

Dim Firstbyte As String 'lParam の 24〜31 ビット

If flag = WM_KEYDOWN Then 'キーが押された場合

Firstbyte = "00"

Else

Firstbyte = "C0" 'キーが離された場合

End If

Dim Scancode As Long

'キーのスキャンコードを取得

Scancode = MapVirtualKey(VirtualKey, 0)

Dim Secondbyte As String 'lParam の 16〜23 ビット、つまり仮想キーのスキャンコード

Secondbyte = Right("00" &amp; Hex(Scancode), 2)

s = Firstbyte &amp; Secondbyte &amp; "0001" '0001 は lParam の 0〜15 ビット、つまり連続入力回数などの拡張情報

MakeKeyLparam = Val("&amp;H" &amp; s)

End Function

Private Sub Form_Load()

dim hwnd as long

hwnd = XXXXXX 'XXXXX はメモ帳の編集ボックスのコントロールハンドルです

PostMessage hwnd,WM_KEYDOWN，VK_A，MakeKeyLparam(VK_A,WM_KEYDOWN) 'A キーを押す

PostMessage hwnd,WM_CHAR，ASC("A"),MakeKeyLparam(VK_A,WM_KEYDOWN) '文字 A を入力する

PostMessage hwnd,WM_UP，VK_A，MakeKeyLparam(VK_A,WM_UP) 'A キーを離す

End Sub

以上が、ローカルなキーボードメッセージを使ってキーを押したようにシミュレートする方法です。この方法には大きな利点があります。バックグラウンドでキー操作をシミュレートできるので、フォアグラウンドでの作業に影響しないのです。たとえば、この方法でゲーム内のキー操作を繰り返し自動実行するプログラムを作り、その間にお茶を飲みながら QQ で女の子たちとおしゃべりを楽しむこともできます。フォアグラウンドの作業にはまったく影響しません。対象プログラムがフォーカスを得ているかどうかも関係ありません。これがバックグラウンドでのキー操作シミュレーションの原理です〜〜〜〜

2. グローバルレベルのシミュレーション

上の方法がすべてのプログラムで有効とは限らないことに気づくでしょう。大量のメッセージを送っても、プログラムがまったく反応しないことがあります。なぜでしょうか。状況によって異なります。一部のプログラム（特にゲーム）は、何らかの理由でキー操作のシミュレーションを禁止しています。どのように禁止しているのでしょうか。たとえば、プログラムが自分はアクティブウィンドウではないと判断したら、キーボードメッセージを受け付けないようにするという方法があります。あるいは、受け取ったキーボードメッセージを詳しく調べると、実際のキー入力とシミュレートされたキー入力には常に小さな違いがあることに気づくでしょう。対象プログラムはこうした小さな違いから、これは偽物だ！ 偽造されたものだ！！ と判断できるのです。そのため、PostMessage でローカルなメッセージを送ってもうまくいかない場合は、グローバルレベルのキーボードメッセージを試し、対象プログラムを欺けるかどうか確かめてみてください。

グローバルなキーボードメッセージをシミュレートする一般的な方法には、次のようなものがあります。

(1) API 関数 keybd_event を使う方法です。この関数はキーボードイベントをシミュレートできます。その VB での宣言は次のとおりです。

Declare Sub keybd_event Lib "user32" (ByVal bVk As Byte, ByVal bScan As Byte, ByVal dwFlags As Long, ByVal dwExtraInfo As Long)

パラメーター bVk はシミュレートするキーの仮想キーコード、bScan はそのキーのスキャンコード（通常は 0 を渡せます）、dwFlags はキーが押されたか離されたかを示します（押す場合は 0、離す場合は 2）。dwExtraInfo は拡張フラグで、通常は使用しません。たとえば A キーを押すようにシミュレートするには、次のようにします。

Const KEYEVENTF_KEYUP = &amp;H2

keybd_event VK_A, 0, 0, 0 'A キーを押す

keybd_event VK_A, 0, KEYEVENTF_KEYUP, 0 'A キーを離す

キーを速く押しすぎると問題が起きることがあるので、API 関数 Sleep で遅延を入れることもできます。宣言は次のとおりです。

Declare Sub Sleep Lib "kernel32" (ByVal dwMilliseconds As Long)

パラメーター dwMilliseconds は遅延時間で、単位はミリ秒です。

ファンクションキーの組み合わせをシミュレートする場合はどうでしょうか。たとえば Ctrl+C でコピーするには、次のようにします。

keybd_event VK_Ctrl, 0, 0, 0 'Ctrl キーを押す

keybd_event VK_C, 0, 0, 0 'C キーを押す

Sleep 500 '500 ミリ秒の遅延

keybd_event VK_C, 0, KEYEVENTF_KEYUP, 0 'C キーを離す

keybd_event VK_Ctrl, 0, KEYEVENTF_KEYUP, 0 'Ctrl キーを離す

では、対象プログラムを欺けるかどうか試してみてください。この関数は大部分のウィンドウプログラムで有効ですが、生成されたキーボードイベントを無視するゲームもまだ一部あります。その場合は bScan パラメーターを使う必要があります。通常 bScan は 0 を渡しますが、対象プログラムが DirectX のゲームである場合は、このパラメーターに正しいスキャンコードを渡す必要があります。そうすることで、ゲームが認識できる正しいハードウェアイベントメッセージを生成できます。そのように書くと次のようになります。

keybd_event VK_A, MapVirtualKey(VK_A, 0), 0, 0 'A キーを押す

keybd_event VK_A, MapVirtualKey(VK_A, 0), KEYEVENTF_KEYUP, 0 'A キーを離す

以上が keybd_event 関数によるキーボードイベントのシミュレーションです。この関数のほかに、SendInput 関数でもグローバルなキーボードイベントをシミュレートできます。SendInput は、メッセージをメッセージキューに直接挿入できるため、比較的低レベルの関数です。その VB での宣言は次のとおりです。

Declare Function SendInput Lib "user32.dll" (ByVal nInputs As Long, pInputs As GENERALINPUT, ByVal cbSize As Long) As Long

パラメーター：

nlnprts：plnputs が指す構造体の数を定義します。

plnputs：INPUT 構造体の配列へのポインターです。各構造体は、キーボードまたはマウスの入力ストリームに挿入されるイベントを表します。

cbSize：INPUT 構造体のサイズを定義します。cbSize が INPUT 構造体のサイズと一致しない場合、関数呼び出しは失敗します。

戻り値：キーボードまたはマウスの入力ストリームに正常に挿入されたイベントの数を返します。より詳しいエラー情報を得るには、GetlastError 関数を呼び出します。

備考：SendInput 関数は、INPUT 構造体内のイベントを順番に、キーボードまたはマウスの入力ストリームに挿入します。これらのイベントは、ユーザーが（マウスやキーボードで）入力したものや、keybd_event、mouse_event、あるいは別の SendInput で挿入された入力とは互換性がありません。

うーん、この関数は使い方がかなり複雑です。パラメーターがすべてポインターのような構造になっているからです。これを使ってキーボード入力をシミュレートするには、まずシミュレートしたいキーボードメッセージを格納する一連のデータ構造を作り、それを関数に渡す必要があります。便宜上、これを 1 つのプロシージャにまとめておけば、必要なときに呼び出すだけで済みます。コードは次のとおりです。

Declare Function SendInput Lib "user32.dll" (ByVal nInputs As Long, pInputs As GENERALINPUT, ByVal cbSize As Long) As Long

Declare Sub CopyMemory Lib "kernel32" Alias "RtlMoveMemory" (pDst As Any, pSrc As Any, ByVal ByteLen As Long)

Type GENERALINPUT

dwType As Long

xi(0 To 23) As Byte

End Type

Type KEYBDINPUT

wVk As Integer

wScan As Integer

dwFlags As Long

time As Long

dwExtraInfo As Long

End Type

Const INPUT_KEYBOARD = 1

Sub MySendKey(bkey As Long)

'bkey に押したいキーの仮想キーコードを渡すと、そのキーを押すことができます

Dim GInput(0 To 1) As GENERALINPUT

Dim KInput As KEYBDINPUT

KInput.wVk = bkey 'シミュレートするキー

KInput.dwFlags = 0 'キー押下のフラグ

GInput(0).dwType = INPUT_KEYBOARD

CopyMemory GInput(0).xi(0), KInput, Len(KInput) 'KInput のメモリ上のデータを GInput にコピーします

KInput.wVk = bkey

KInput.dwFlags = KEYEVENTF_KEYUP ' キー解放のフラグ

GInput(1).dwType = INPUT_KEYBOARD ' このメッセージがキーボードメッセージであることを示す

CopyMemory GInput(1).xi(0), KInput, Len(KInput)

'以上の処理で、キーの押下と解放の 2 つのキーボードメッセージを GInput のデータ構造に追加しました

SendInput 2, GInput(0), Len(GInput(0)) 'GInput に格納されたメッセージをメッセージキューに挿入する

End Sub

上記以外にも、グローバルフックを使ってキーボードメッセージをシミュレートすることもできます。Windows のメッセージフックの使い方をすでに理解しているなら、グローバル HOOK を設定してキーボードメッセージをシミュレートできます。たとえば、WH_JOURNALPLAYBACK フックを使ってキー押下をシミュレートできます。WH_JOURNALPLAYBACK はシステム全体に作用するグローバルフックです。WH_JOURNALRECORD と対になるもので、両者は通常、キーボードとマウスの操作を記録して再生するために使われます。WH_JOURNALRECORD フックはキーボードとマウスの操作を忠実に記録し、記録した情報はファイルに保存できます。WH_JOURNALPLAYBACK はそれらの操作を再生できます。もちろん、WH_JOURNALPLAYBACK を単独で使ってキーボード操作をシミュレートすることもできます。まず、メッセージフックを設定する SetWindowsHookEx 関数を宣言する必要があります。

Declare Function SetWindowsHookEx Lib "user32" Alias "SetWindowsHookExA" (ByVal idHook As Long,ByVal lpfn As Long, ByVal hmod As Long, ByVal dwThreadId As Long) As Long

まず WH_JOURNALPLAYBACK フックをインストールします。次に、独自のフック関数を作成します。システムがそれを呼び出すとき、シミュレートしたいイベントを、フックのパラメーター lParam が指す EVENTMSG 領域に渡すことで、キー操作のシミュレーションが実現できます。ただし、このフックを使ってキーボードイベントをシミュレートすると副作用があり、実際のマウスとキーボードがロックされてしまいます。しかし、シミュレーション中に実際のキーボード操作の干渉を受けたくない場合には、良い方法と言えるでしょう。

3. ドライバーレベルのシミュレーション

ここまでの方法をすべて試しても、対象プログラムが頑なにシミュレートされたメッセージを受け付けない場合は……ふぅ。残された最後の手段があります。それがドライバーレベルのシミュレーション、つまりキーボードのハードウェアポートを直接読み書きする方法です！

DirectX のインターフェースを使うゲームの中には、キー入力を読み取る際に Windows のメッセージの仕組みを回避し、DirectInput を使うものがあります。これは、レーシングゲームのように即時性が強く求められるゲームが、できるだけ速くキー入力に応答する必要があるためです。Windows のメッセージはキュー形式であるため、伝達時にかなりの遅延が生じ、1 秒間に十数件しか届かないこともあります。これではゲームの要求に到底追いつきません。DirectInput は Windows のメッセージを経由せず、キーボードドライバーと直接やり取りするため、ずっと効率がよくなります。そのため、こうしたプログラムに対しては、PostMessage も keybd_event もまったく効果がありません。これらの関数はより高いレベルで動作しているからです。このようなプログラムには、キーボードのポートを直接読み書きして、ハードウェアイベントをシミュレートする方法しかありません。この方法でキーボードをシミュレートするには、まずキーボードプログラミングの基礎知識を理解しておく必要があります。

DOS の時代には、ユーザーがキーを押したり離したりすると、キーボード割り込みが発生し（キーボード割り込みが許可されている場合）、プログラムは BIOS 内のキーボード割り込み処理へジャンプして実行していました。Windows のデバイスマネージャーを開くと、キーボードコントローラーが 2 つのポートで制御されていることがわかります。&H60 はデータポートで、キーボードのデータを読み取ることができます。&H64 は制御ポートで、制御信号を送るために使われます。つまり、ポート &H60 からキーの情報を読み取ることができます。このポートから 1 バイトを読み取ると、その下位 7 ビットがキーのスキャンコードを表し、最上位ビットがキーの押下か解放かを示します。キーが押されたときは最上位ビットが 0 で、これをメイクコードといいます。キーが離されたときは最上位ビットが 1 で、これをブレークコードといいます。このポートからデータを読めばキー情報が得られるなら、このポートにデータを書き込めばキー押下をシミュレートできるはずです！ QBASIC 4.5 を使ったことがある方なら、QB には指定したポートにデータを書き込む OUT 命令と、指定したポートからデータを読み取る INP 関数があることをご存じかもしれません。では、まず QB でどのようにコードを書くかを見てみましょう。

スキャンコードが &H50 のキーを押したようにシミュレートしたい場合は、次のようにします。

OUT &H64,&HD2 'データ &HD2 をポート &H64 に送る。これは KBC コマンドで、キーボードにデータを書き込むことを示す

OUT &H60,&H50 'スキャンコード &H50 をポート &H60 に送る。スキャンコードが &H50 のキーを押したことをシミュレートする

そのキーを離すには、ブレークコードを送ります。次のようにします。

OUT &H64,&HD2 'データ &HD2 をポート &H64 に送る。これは KBC コマンドで、キーボードにデータを書き込むことを示す

OUT &H60,(&H50 OR &H80) 'スキャンコード &H50 と &H80 の OR 演算を行う。これにより最上位ビットが 1 になり、ブレークコードが得られる。これはキーを離すことを示す

さて、問題は VB でポートにデータを書き込むにはどうすればよいかです。Windows では、通常のアプリケーションはポートを直接操作する権限がないため、ドライバーの助けが必要です。ここでは WINIO という部品を使って、ポートの読み書きを行うことができます。WINIO とは何でしょうか。WINIO は、ソースコード付きで完全無料、登録も不要な Windows 2000 向けのポートアクセス用ドライバー部品です（http://www.internals.com/ からダウンロードできます）。ポートだけでなくメモリも操作でき、VB だけでなく Delphi や VC などの環境でも使えます。性能も非常に優れています。部品をダウンロードして解凍すると、いくつかのフォルダが見えます。そのうち Release フォルダにある 3 つのファイルが必要なものです。WinIo.sys（Windows XP 用のドライバー）、WINIO.VXD（Windows 98 用のドライバー）、WinIo.dll（関数をラップする動的リンクライブラリ）です。必要なのは WinIo.dll の関数を呼び出すことだけで、WinIo.dll がドライバーをインストールして呼び出し、対応する機能を実行してくれます。補足すると、この部品はインストール不要のポータブルソフトです。この 3 つのファイルをプログラムと同じフォルダにコピーするだけで使えます。使い方は簡単です。まず InitializeWinIo 関数でドライバーをインストールし、その後 GetPortVal でポートを読み取り、SetPortVal でポートに書き込みます。では、ドライバーレベルのキーボードシミュレーションを作ってみましょう。まず WinIo の 3 つのファイルをプログラムのフォルダにコピーし、VB で新しいプロジェクトを作成してモジュールを追加します。そして、そのモジュールに次の WinIo 関数の宣言を追加します。

Declare Function MapPhysToLin Lib "WinIo.dll" (ByVal PhysAddr As Long, ByVal PhysSize As Long, ByRef PhysMemHandle) As Long

Declare Function UnmapPhysicalMemory Lib "WinIo.dll" (ByVal PhysMemHandle, ByVal LinAddr) As Boolean

Declare Function GetPhysLong Lib "WinIo.dll" (ByVal PhysAddr As Long, ByRef PhysVal As Long) As Boolean

Declare Function SetPhysLong Lib "WinIo.dll" (ByVal PhysAddr As Long, ByVal PhysVal As Long) As Boolean

Declare Function GetPortVal Lib "WinIo.dll" (ByVal PortAddr As Integer, ByRef PortVal As Long, ByVal bSize As Byte) As Boolean

Declare Function SetPortVal Lib "WinIo.dll" (ByVal PortAddr As Integer, ByVal PortVal As Long, ByVal bSize As Byte) As Boolean

Declare Function InitializeWinIo Lib "WinIo.dll" () As Boolean

Declare Function ShutdownWinIo Lib "WinIo.dll" () As Boolean

Declare Function InstallWinIoDriver Lib "WinIo.dll" (ByVal DriverPath As String, ByVal Mode As Integer) As Boolean

Declare Function RemoveWinIoDriver Lib "WinIo.dll" () As Boolean

' ------------------------------------ WINIO 関数宣言ここまで -------------------------------------------

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

'----------------------------------- WIN32 API 関数宣言ここまで -----------------------------------------

次に、以下のプロシージャを追加します。

Sub KBCWait4IBE() 'キーボードバッファが空になるまで待つ

Dim dwVal As Long

Do

GetPortVal &amp;H64, dwVal, 1

'この行は &H64 ポートから 1 バイトを読み取り、読み取ったデータを変数 dwVal に格納します

'GetPortVal 関数の書式は GetPortVal ポート番号, 読み取ったデータを格納する変数, 読み取る長さ です

Loop While (dwVal And &amp;H2)

End Sub

上記のプロシージャは KBC 仕様に従って書かれたもので、キーボードのポートにデータを書き込む前に、しばらく待機する役割があります。後で使用します。

次に、キーをシミュレートするための以下の 2 つのプロシージャを追加します。

Public Const KBC_KEY_CMD = &amp;H64 'キーボードコマンドポート

Public Const KBC_KEY_DATA = &amp;H60 'キーボードデータポート

Sub MyKeyDown(ByVal vKeyCoad As Long)

'キー押下をシミュレートします。引数 vKeyCoad にはキーの仮想キーコードを渡します

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'データを送る前に、キーボードバッファが空になるまで待つ必要があります

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'キーボード書き込みコマンドを送る

'SetPortVal はポートにデータを書き込みます。書式は SetPortVal ポート番号, 書き込むデータ, データの長さ です

KBCWait4IBE

SetPortVal KBC_KEY_DATA, btScancode, 1 'キー情報を書き込む：キー押下

End Sub

Sub MyKeyUp(ByVal vKeyCoad As Long)

'キーの解放をシミュレートします。引数 vKeyCoad にはキーの仮想キーコードを渡します

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'キーボードバッファが空になるまで待つ

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'キーボード書き込みコマンドを送る

KBCWait4IBE

SetPortVal KBC_KEY_DATA, (btScancode Or &amp;H80), 1 'キー情報を書き込む：キー解放

End Sub

これら 2 つのプロシージャを定義すれば、キーボード入力をシミュレートできます。フォームモジュールにタイマーコントロールを追加し、次のコードを追加します。

Private Sub Form_Load()

If InitializeWinIo = False Then

'InitializeWinIo 関数でドライバーを読み込みます。成功すると true、失敗すると false を返します

MsgBox "驅動程式載入失敗!"

Unload Me

End If

Timer1.Interval=3000

Timer1.Enabled=True

End Sub

Private Sub Form_Unload(Cancel As Integer)

ShutdownWinIo 'プログラム終了時には、ShutdownWinIo 関数でドライバーをアンロードすることを忘れないでください

End Sub

Private Sub Timer1_Timer()

Dim VK_A as Long = &amp;H41

MyKeyDown VK_A

MyKeyUp VK_A 'A キーを押して離す操作をシミュレートする

End Sub

[/quote]

上記のプログラムを実行すると、3 秒ごとに A キーを押すシミュレーションが行われます。試してみてください。今度はすべてのプログラムで有効になっていますか？

注意事項：

VB のデバッグモードで WINIO を使うには、その 3 つのファイルを VB のインストールフォルダにコピーする必要があります。

キーボードには拡張キーがあります（たとえばキーボードの矢印キーは拡張キーです）。拡張キーは、上記の MyKeyDown と MyKeyUp のプロシージャでシミュレートすべきではありません。代わりに、次の 2 つのプロシージャを使うと、拡張キーを正確にシミュレートできます。
<table border="0" cellspacing="1" cellpadding="3" width="90%" align="center">
<tbody>
<tr>
<td><span style="font-size: small;"><span><strong><span style="font-size:x-small;">引用:</span></strong></span></span></td>
</tr>
<tr>
<td class="quote"><span style="font-size: small;">Sub MyKeyDownEx(ByVal vKeyCoad As Long) ' 拡張キーの押下をシミュレートします。vKeyCoad は拡張キーの仮想キーコードです

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'キーボードバッファが空になるまで待つ

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'キーボード書き込みコマンドを送る

KBCWait4IBE

SetPortVal KBC_KEY_DATA, &amp;HE0, 1 '拡張キーのフラグ情報を書き込む

KBCWait4IBE 'キーボードバッファが空になるまで待つ

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'キーボード書き込みコマンドを送る

KBCWait4IBE

SetPortVal KBC_KEY_DATA, btScancode, 1 'キー情報を書き込む：キー押下

End Sub

Sub MyKeyUpEx(ByVal vKeyCoad As Long) '拡張キーの解放をシミュレートします

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'キーボードバッファが空になるまで待つ

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'キーボード書き込みコマンドを送る

KBCWait4IBE

SetPortVal KBC_KEY_DATA, &amp;HE0, 1 '拡張キーのフラグ情報を書き込む

KBCWait4IBE 'キーボードバッファが空になるまで待つ

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'キーボード書き込みコマンドを送る

KBCWait4IBE

SetPortVal KBC_KEY_DATA, (btScancode Or &amp;H80), 1 'キー情報を書き込む：キー解放

End Sub

</span></td>
</tr>
</tbody></table>
<span style="font-size: small;"><span> </span></span>

<span style="font-size: small;"> </span>

<span style="font-size: small;"><span style="font-size:x-small;">また、拡張キーから通常のキーに切り替える場合は、通常のキーの KeyDown イベントを 2 回送る必要があることにも注意してください。つまり、拡張キーを先に押し、次に通常のキーを押すようにシミュレートしたい場合は、その通常キーが押された情報をポートに 2 回送る必要があります。たとえば、左方向キーを押してからスペースキーを押すイベントをシミュレートしたい場合、左方向キーは拡張キー、スペースキーは通常のキーなので、流れは次のようになります。</span></span>

[quote]MyKeyDownEx VK_LEFT '左方向キーを押す

Sleep 200 '200 ミリ秒の遅延

MyKeyUpEx VK_LEFT '左方向キーを離す

Sleep 500

MyKeyDown VK_SPACE 'スペースキーを押す。2 回送る必要がある点に注意

MyKeyDown VK_SPACE

Sleep 200

MyKeyUp VK_SPACE 'スペースキーを離す
