---
title: "VB 鍵盤模擬"
date: 2008-11-26T10:12:00
slug: "vb-keyboard-simulation"
aliases: ["/posts/vb-%e9%8d%b5%e7%9b%a4%e6%a8%a1%e6%93%ac/"]
tags: ["VB"]
categories: ["Programming"]
---

鍵盤是我們使用電腦的一個很重要的輸入設備了，即使在滑鼠大行其道的 今天，很多程式依然離不開鍵盤來操作。但是有時候，一些重複性的，很繁瑣的鍵盤操作總會讓人疲憊，於是就有了用程式來代替人們按鍵的方法，這樣可以把很多 重複性的鍵盤操作交給程式來類比，省了很多精力，按鍵精靈就是這樣的一個軟體。那麼我們怎樣才能用VB來寫一個程式，達到與按鍵精靈類似的功能呢？那就讓 我們來先瞭解一下windows中回應鍵盤事件的機制。


<!--more-->


當用戶按下鍵盤上的一個鍵時，鍵盤內的晶片會檢測到這個動作，並把這個信號傳送到電 腦。如何區別是哪一個鍵被按下了呢？鍵盤上的所有按鍵都有一個編碼，稱作鍵盤掃描碼。當你按下一個鍵時，這個鍵的掃描碼就被傳給系統。掃描碼是跟具體的硬 體相關的，同一個鍵，在不同鍵盤上的掃描碼有可能不同。鍵盤控制器就是將這個掃描碼傳給電腦，然後交給鍵盤驅動程式。鍵盤驅動程式會完成相關的工作，並把 這個掃描碼轉換為鍵盤虛擬碼。什麼是虛擬碼呢？因為掃描碼與硬體相關，不具有通用性，為了統一鍵盤上所有鍵的編碼，於是就提出了虛擬碼概念。無論什麼鍵 盤，同一個按鍵的虛擬碼總是相同的，這樣程式就可以識別了。簡單點說，虛擬碼就是我們經常可以看到的像VK_A,VK_B這樣的常數，比如鍵A的虛擬碼是 65，寫成16進制就是&amp;H41，注意，人們經常用16進制來表示虛擬碼。當鍵盤驅動程式把掃描碼轉換為虛擬碼後，會把這個鍵盤操作的掃描碼和虛 擬碼還有其他資訊一起傳遞給作業系統。然後作業系統則會把這些資訊封裝在一個消息中，並把這個鍵盤消息插入到消息列隊。最後，要是不出意外的話，這個鍵盤 消息最終會被送到當前的活動視窗那裏，活動視窗所在的應用程式接收到這個消息後，就知道鍵盤上哪個鍵被按下，也就可以決定該作出什麼回應給用戶了。這個過 程可以簡單的如下表示：

用戶按下按鍵-----鍵盤驅動程式將此事件傳遞給作業系統-----作業系統將鍵盤事件插入消息佇列-----鍵盤消息被發送到當前活動窗口

明白了這個過程，我們就可以編程實現在其中的某個環節來類比鍵盤操作了。在VB中，有多種方法可以實現鍵盤類比，我們就介紹幾種比較典型的。

1.局部級類比

從 上面的流程可以看出，鍵盤事件是最終被送到活動視窗，然後才引起目的程式響應的。那麼最直接的模擬方法就是：直接偽造一個鍵盤消息發給目的程式。哈哈，這 實在是很簡單，windows提供了幾個這樣的API函數可以實現直接向目的程式發送消息的功能，常用的有SendMessage和 PostMessage，它們的區別是PostMessage函數直接把消息仍給目的程式就不管了，而SendMessage把消息發出去後，還要等待目 的程式返回些什麼東西才好。這裏要注意的是，類比鍵盤消息一定要用PostMessage函數才好，用SendMessage是不正確的(因為類比鍵盤消 息是不需要返回值的，不然目的程式會沒反應)，切記切記！PostMessage函數的VB聲明如下：

Declare Function PostMessage Lib "user32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long

參數hwnd 是你要發送消息的目的程式上某個控制項的控制碼，參數wMsg 是消息的類型，表示你要發送什麼樣的消息，最後wParam 和lParam 這兩個參數是隨消息附加的資料，具體內容要由消息決定。

再來看看wMsg 這個參數，要類比按鍵就靠這個了。鍵盤消息常用的有如下幾個：

WM_KEYDOWN 表示一個普通鍵被按下

WM_KEYUP 表示一個普通鍵被釋放

WM_SYSKEYDOWN 表示一個系統鍵被按下，比如Alt鍵

WM_SYSKEYUP 表示一個系統鍵被釋放，比如Alt鍵

如 果你確定要發送以上幾個鍵盤消息，那麼再來看看如何確定鍵盤消息中的wParam 和lParam 這兩個參數。在一個鍵盤消息中，wParam 參數的含義較簡單，它表示你要發送的鍵盤事件的按鍵虛擬碼，比如你要對目的程式模擬按下A鍵，那麼wParam 參數的值就設為VK_A ,至於lParam 這個參數就比較複雜了，因為它包含了多個資訊，一般可以把它設為0，但是如果你想要你的模擬更真實一些，那麼建議你還是設置一下這個參數。那麼我們就詳細 瞭解一下lParam 吧。lParam 是一個long類型的參數，它在記憶體中占4個位元組，寫成二進位就是00000000 00000000 00000000 00000000 一共是32位，我們從右向左數，假設最右邊那位為第0位(注意是從0而不是從1開始計數)，最左邊的就是第31位，那麼該參數的的0-15位表示鍵的發送 次數等擴展資訊，16-23位元為按鍵的掃描碼，24-31位表示是按下鍵還是釋放鍵。大家一般習慣寫成16進制的，那麼就應該是&amp;H00 00 00 00 ，第0-15位一般為&amp;H0001，如果是按下鍵，那麼24-31位為&amp;H00，釋放鍵則為&amp;HC0,那麼16-23位元的掃描 碼怎麼會得呢？這需要用到一個API函數MapVirtualKey，這個函數可以將虛擬碼轉換為掃描碼，或將掃描碼轉換為虛擬碼，還可以把虛擬碼轉換為 對應字元的ASCII碼。它的VB聲明如下：

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

參 數wCode 表示待轉換的碼，參數wMapType 表示從什麼轉換為什麼，如果是虛擬碼轉掃描碼，則wMapType 設置為0，如果是虛擬掃描碼轉虛擬碼，則wMapType 設置為1，如果是虛擬碼轉ASCII碼，則wMapType 設置為2.相信有了這些，我們就可以構造鍵盤事件的lParam參數了。下面給出一個構造lParam參數的函數：

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

Function MakeKeyLparam(ByVal VirtualKey As Long, ByVal flag As Long) As Long

'參數VirtualKey表示按鍵虛擬碼,flag表示是按下鍵還是釋放鍵，用WM_KEYDOWN和WM_KEYUP這兩個常數表示

Dim s As String

Dim Firstbyte As String 'lparam參數的24-31位

If flag = WM_KEYDOWN Then '如果是按下鍵

Firstbyte = "00"

Else

Firstbyte = "C0" '如果是釋放鍵

End If

Dim Scancode As Long

'獲得鍵的掃描碼

Scancode = MapVirtualKey(VirtualKey, 0)

Dim Secondbyte As String 'lparam參數的16-23位元，即虛擬鍵掃描碼

Secondbyte = Right("00" &amp; Hex(Scancode), 2)

s = Firstbyte &amp; Secondbyte &amp; "0001" '0001為lparam參數的0-15位，即發送次數和其他擴展資訊

MakeKeyLparam = Val("&amp;H" &amp; s)

End Function

這 個函數像這樣調用，比如按下A鍵，那麼lParam=MakeKeyLparam(VK_A,WM_KEYDOWN) ，很簡單吧。值得注意的是，即使你發送消息時設置了lParam參數的值，但是系統在傳遞消息時仍然可能會根據當時的情況重新設置該參數，那麼目的程式收 到的消息中lParam的值可能會和你發送時的有所不同。所以，如果你很懶的話，還是直接把它設為0吧，對大多數程式不會有影響的，呵呵。

好了，做完以上的事情，現在我們可以向目的程式發送鍵盤消息了。首先取得目的程式接受這個消息的控制項的控制碼，比如目標控制碼是12345，那麼我們來對目標類比按下並釋放A鍵，像這樣：(為了簡單起見，lParam這個參數就不構造了，直接傳0)

PostMessage 12345，WM_KEYDOWN，VK_A，0&amp; '按下A鍵

PostMessage 12345，WM_UP，VK_A，0&amp; '釋放A鍵

好 了，一次按鍵就完成了。現在你可以迫不及待的打開記事本做實驗，先用FindWindowEx這類API函數找到記事本程式的控制碼，再向它發送鍵盤消 息，期望記事本裏能詭異的自動出現字元。可是你馬上就是失望了，咦，怎麼一點反應也沒有？你欺騙感情啊~~~~~~~~~~55555555555555 不是的哦，接著往下看啊。

一般目的程式都會含有多個控制項，並不是每個控制項都會對鍵盤消息作出反應，只有把鍵盤消息發送給接受它的控制項才 會得到期望的反應。那記事本來說，它的編輯框其實是個edit類，只有這個控制項才對鍵盤事件有反應，如果只是把消息發給記事本的表單，那是沒有用的。現 在你找出記事本那個編輯框的控制碼，比如是54321，那麼寫如下代碼：

PostMessage 54321，WM_KEYDOWN，VK_F1，0&amp; '按下F1鍵

PostMessage 54321，WM_UP，VK_F1，0&amp; '釋放F1鍵

怎麼樣，是不是打開了記事本的“幫助”資訊？這說明目的程式已經收到了你發的消息，還不錯吧~~~~~~~~

可以馬上新問題就來了，你想模擬向記事本按下A這個鍵，好在記事本裏自動輸入字元，可是，沒有任何反應！這是怎麼一回事呢？

原 來，如果要向目的程式發送字元，光靠WM_KEYDOWN和WM_UP這兩個事件還不行，還需要一個事件：WM_CHAR，這個消息表示一個字元，程式需 靠它看來接受輸入的字元。一般只有A，B，C等這樣的按鍵才有WM_CHAR消息，別的鍵(比如方向鍵和功能鍵)是沒有這個消息的，WM_CHAR消息一 般發生在WM_KEYDOWN消息之後。WM_CHAR消息的lParam參數的含義與其他鍵盤消息一樣，而它的wParam則表示相應字元的ASCII 編碼(可以輸入中文的哦^_^)，現在你可以寫出一個完整的向記事本裏自動寫入字元的程式了，下面是一個例子，並附有這些消息常數的具體值：

Declare Function PostMessage Lib "user32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

Public Const WM_KEYDOWN = &amp;H100

Public Const WM_KEYUP = &amp;H101

Public Const WM_CHAR = &amp;H102

Public Const VK_A = &amp;H41

Function MakeKeyLparam(ByVal VirtualKey As Long, ByVal flag As Long) As Long

Dim s As String

Dim Firstbyte As String 'lparam參數的24-31位

If flag = WM_KEYDOWN Then '如果是按下鍵

Firstbyte = "00"

Else

Firstbyte = "C0" '如果是釋放鍵

End If

Dim Scancode As Long

'獲得鍵的掃描碼

Scancode = MapVirtualKey(VirtualKey, 0)

Dim Secondbyte As String 'lparam參數的16-23位元，即虛擬鍵掃描碼

Secondbyte = Right("00" &amp; Hex(Scancode), 2)

s = Firstbyte &amp; Secondbyte &amp; "0001" '0001為lparam參數的0-15位，即發送次數和其他擴展資訊

MakeKeyLparam = Val("&amp;H" &amp; s)

End Function

Private Sub Form_Load()

dim hwnd as long

hwnd = XXXXXX 'XXXXX表示記事本編輯框的控制碼

PostMessage hwnd,WM_KEYDOWN，VK_A，MakeKeyLparam(VK_A,WM_KEYDOWN) '按下A鍵

PostMessage hwnd,WM_CHAR，ASC("A"),MakeKeyLparam(VK_A,WM_KEYDOWN) '輸入字元A

PostMessage hwnd,WM_UP，VK_A，MakeKeyLparam(VK_A,WM_UP) '釋放A鍵

End Sub

這 就是通過局部鍵盤消息來類比按鍵。這個方法有一個極大的好處，就是：它可以實現後臺按鍵，也就是說他對你的前臺操作不會有什麼影響。比如，你可以用這個方 法做個程式在遊戲中類比按鍵來不斷地執行某些重複的操作，而你則一邊喝茶一邊與QQ上的MM們聊得火熱，它絲毫不會影響你的前臺操作。無論目的程式是否獲 得焦點都沒有影響，這就是後臺類比按鍵的原理啦~~~~

2.全局級模擬

你會發現，用上面的方法類比按鍵並不是對所有程式都 有效的，有的程式啊，你向它發了一大堆消息，可是它卻一點反應也沒有。這是怎麼回事呢？這就要看具體的情況了，有些程式(特別是一些遊戲)出於某些原因， 會禁止用戶對它使用類比按鍵程式，這個怎麼實現呢？比如可以在程式中檢查一下，如果發現自己不是活動視窗，就不接受鍵盤消息。或者仔細檢查一下收到的鍵盤 消息，你會發現真實的按鍵和類比的按鍵消息總是有一些小差別，從這些小差別上，目的程式就能判斷出：這是假的！是偽造的！！因此，如果用 PostMessage發送局部消息類比按鍵不成功的話，你可以試一試全局級的鍵盤消息，看看能不能騙過目的程式。

類比全局鍵盤消息常見的可以有以下一些方法：

(1) 用API函數keybd_event，這個函數可以用來類比一個鍵盤事件，它的VB聲明為：

Declare Sub keybd_event Lib "user32" (ByVal bVk As Byte, ByVal bScan As Byte, ByVal dwFlags As Long, ByVal dwExtraInfo As Long)

參數bVk表示要類比的按鍵的虛擬碼，bScan表示該按鍵的掃描碼(一般可以傳0)，dwFlags表示是按下鍵還是釋放鍵(按下鍵為0，釋放鍵為2)，dwExtraInfo是擴展標誌，一般沒有用。比如要模擬按下A鍵，可以這樣：

Const KEYEVENTF_KEYUP = &amp;H2

keybd_event VK_A, 0, 0, 0 '按下A鍵

keybd_event VK_A, 0, KEYEVENTF_KEYUP, 0 '釋放A鍵

注意有時候按鍵的速度不要太快，否則會出問題，可以用API函數Sleep來進行延時，聲明如下：

Declare Sub Sleep Lib "kernel32" (ByVal dwMilliseconds As Long)

參數dwMilliseconds表示延時的時間，以毫秒為單位。

那麼如果要模擬按下功能鍵怎麼做呢？比如要按下Ctrl+C實現拷貝這個功能，可以這樣：

keybd_event VK_Ctrl, 0, 0, 0 '按下Ctrl鍵

keybd_event VK_C, 0, 0, 0 '按下C鍵

Sleep 500 '延時500毫秒

keybd_event VK_C, 0, KEYEVENTF_KEYUP, 0 '釋放C鍵

keybd_event VK_Ctrl, 0, KEYEVENTF_KEYUP, 0 '釋放Ctrl鍵

好 了，現在你可以試試是不是可以騙過目的程式了，這個函數對大部分的視窗程式都有效，可是仍然有一部分遊戲對它產生的鍵盤事件熟視無睹，這時候，你就要用上 bScan這個參數了。一般的，bScan都傳0，但是如果目的程式是一些DirectX遊戲，那麼你就需要正確使用這個參數傳入掃描碼，用了它可以產生 正確的硬體事件消息，以被遊戲識別。這樣的話，就可以寫成這樣：

keybd_event VK_A, MapVirtualKey(VK_A, 0), 0, 0 '按下A鍵

keybd_event VK_A, MapVirtualKey(VK_A, 0), KEYEVENTF_KEYUP, 0 '釋放A鍵

以上就是用keybd_event函數來類比鍵盤事件。除了這個函數，SendInput函數也可以類比全局鍵盤事件。SendInput可以直接把一條消息插入到消息佇列中，算是比較底層的了。它的VB聲明如下：

Declare Function SendInput Lib "user32.dll" (ByVal nInputs As Long, pInputs As GENERALINPUT, ByVal cbSize As Long) As Long

參數：

nlnprts：定義plnputs指向的結構的數目。

plnputs：指向INPUT結構陣列的指標。每個結構代表插人到鍵盤或滑鼠輸入流中的一個事件。

cbSize：定義INPUT結構的大小。若cbSize不是INPUT結構的大小，則函數調用失敗。

返回值：函數返回被成功地插人鍵盤或滑鼠輸入流中的事件的數目。若要獲得更多的錯誤資訊，可以調用GetlastError函數。

備註：Sendlnput函數將INPUT結構中的事件順序地插入鍵盤或滑鼠的輸入流中。這些事件與用戶插入的（用滑鼠或鍵盤）或調用keybd_event，mouse_event，或另外的Sendlnput插人的鍵盤或滑鼠的輸入流不相容。

嗯，這個函數用起來蠻複雜的，因為它的參數都是指標一類的東西。要用它來類比鍵盤輸入，先要構造一組資料結構，把你要類比的鍵盤消息裝進去，然後傳給它。為了方便起見，把它做在一個過程裏面，要用的時候直接調用好了，代碼如下：

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

'參數bkey傳入要類比按鍵的虛擬碼即可類比按下指定鍵

Dim GInput(0 To 1) As GENERALINPUT

Dim KInput As KEYBDINPUT

KInput.wVk = bkey '你要類比的按鍵

KInput.dwFlags = 0 '按下鍵標誌

GInput(0).dwType = INPUT_KEYBOARD

CopyMemory GInput(0).xi(0), KInput, Len(KInput) '這個函數用來把記憶體中KInput的資料複製到GInput

KInput.wVk = bkey

KInput.dwFlags = KEYEVENTF_KEYUP ' 釋放按鍵

GInput(1).dwType = INPUT_KEYBOARD ' 表示該消息為鍵盤消息

CopyMemory GInput(1).xi(0), KInput, Len(KInput)

'以上工作把按下鍵和釋放鍵共2條鍵盤消息加入到GInput資料結構中

SendInput 2, GInput(0), Len(GInput(0)) '把GInput中存放的消息插入到消息列隊

End Sub

除 了以上這些，用全局鉤子也可以類比鍵盤消息。如果你對windows中消息鉤子的用法已經有所瞭解，那麼你可以通過設置一個全局HOOK來類比鍵盤消息， 比如，你可以用WH_JOURNALPLAYBACK這個鉤子來類比按鍵。WH_JOURNALPLAYBACK是一個系統級的全局鉤子，它和 WH_JOURNALRECORD的功能是相對的，常用它們來記錄並重播鍵盤滑鼠操作。WH_JOURNALRECORD鉤子用來將鍵盤滑鼠的操作忠實地 記錄下來，記錄下來的資訊可以保存到檔中，而WH_JOURNALPLAYBACK則可以重現這些操作。當然亦可以單獨使用 WH_JOURNALPLAYBACK來類比鍵盤操作。你需要首先聲明SetWindowsHookEx函數，它可以用來安裝消息鉤子：

Declare Function SetWindowsHookEx Lib "user32" Alias "SetWindowsHookExA" (ByVal idHook As Long,ByVal lpfn As Long, ByVal hmod As Long, ByVal dwThreadId As Long) As Long

先安裝WH_JOURNALPLAYBACK這個鉤子，然後你需要自己寫一個鉤子函數，在系統調用它時，把 你要模擬的事件傳遞給鉤子參數lParam所指向的EVENTMSG區域，就可以達到類比按鍵的效果。不過用這個鉤子類比鍵盤事件有一個副作用，就是它會 鎖定真實的滑鼠鍵盤，不過如果你就是想在模擬的時候不會受真實鍵盤操作的干擾，那麼用用它倒是個不錯的主意。

3.驅動級模擬

如果上面的方法你都試過了，可是你發現目的程式卻仍然頑固的不接受你類比的消息，寒~~~~~~~~~還好，我還剩下最後一招，這就是驅動級模擬：直接讀寫鍵盤的硬體埠！

有 一些使用DirectX介面的遊戲程式，它們在讀取鍵盤操作時繞過了windows的消息機制，而使用DirectInput.這是因為有些遊戲對即時性 控制的要求比較高，比如賽車遊戲，要求以最快速度回應鍵盤輸入。而windows消息由於是佇列形式的，消息在傳遞時會有不少延遲，有時1秒鐘也就傳遞十 幾條消息，這個速度達不到遊戲的要求。而DirectInput則繞過了windows消息，直接與鍵盤驅動程式打交道，效率當然提高了不少。因此也就造 成，對這樣的程式無論用PostMessage或者是keybd_event都不會有反應，因為這些函數都在較高層。對於這樣的程式，只好用直接讀寫鍵盤 埠的方法來類比硬體事件了。要用這個方法來類比鍵盤，需要先瞭解一下鍵盤編程的相關知識。

在DOS時代，當用戶按下或者放開一個鍵時，就會產 生一個鍵盤中斷(如果鍵盤中斷是允許的)，這樣程式會跳轉到BIOS中的鍵盤中斷處理程式去執行。打開windows的設備管理器，可以查看到鍵盤控制器 由兩個埠控制。其中&amp;H60是資料埠，可以讀出鍵盤資料，而&amp;H64是控制埠，用來發出控制信號。也就是，從&amp;H60號埠可以讀 此鍵盤的按鍵資訊，當從這個埠讀取一個位元組，該位元組的低7位元就是按鍵的掃描碼，而高1位則表示是按下鍵還是釋放鍵。當按下鍵時，最高位為0，稱為通 碼，當釋放鍵時，最高位為1，稱為斷碼。既然從這個埠讀數據可以獲得按鍵資訊，那麼向這個埠寫入資料就可以類比按鍵了！用過QbASIC4.5的朋友可能 知道，QB中有個OUT命令可以向指定埠寫入資料，而INP函數可以讀取指定埠的資料。那我們先看看如果用QB該怎麼寫代碼：

假如你想模擬按下一個鍵，這個鍵的掃描碼為&amp;H50，那就這樣

OUT &amp;H64,&amp;HD2 '把資料&amp;HD2發送到&amp;H64埠。這是一個KBC指令，表示將要向鍵盤寫入資料

OUT &amp;H60,&amp;H50 '把掃描碼&amp;H50發送到&amp;H60埠，表示類比按下掃描碼為&amp;H50的這個鍵

那麼要釋放這個鍵呢？像這樣，發送該鍵的斷碼：

OUT &amp;H64,&amp;HD2 '把資料&amp;HD2發送到&amp;H64埠。這是一個KBC指令，表示將要向鍵盤寫入資料

OUT &amp;H60,(&amp;H50 OR &amp;H80) '把掃描碼&amp;H50與資料&amp;H80進行或運算，可以把它的高位置1，得到斷碼，表示釋放這個鍵

好 了，現在的問題就是在VB中如何向埠寫入資料了。因為在windows中，普通應用程式是無權操作埠的，於是我們就需要一個驅動程式來幫助我們實現。在這 裏我們可以使用一個元件WINIO來完成讀寫埠操作。什麼是WINIO？WINIO是一個全免費的、無需註冊的、含根源程式的WINDOWS2000埠操 作驅動程式元件(可以到http://www.internals.com/上去下載)。它不僅可以操作埠，還可以操作記憶體；不僅能在VB下用，還可以 在DELPHI、VC等其他環境下使用，性能特別優異。下載該元件，解壓縮後可以看到幾個檔夾，其中Release檔夾下的3個檔就是我們需要的，這3個 檔是WinIo.sys(用於win xp下的驅動程式)，WINIO.VXD(用於win 98下的驅動程式)，WinIo.dll(封裝函數的動態連結程式庫)，我們只需要調用WinIo.dll中的函數，然後WinIo.dll就會安裝並調 用驅動程式來完成相應的功能。值得一提的是這個元件完全是綠色的，無需安裝，你只需要把這3個檔複製到與你的程式相同的檔夾下就可以使用了。用法很簡單， 先用裏面的InitializeWinIo函數安裝驅動程式，然後就可以用GetPortVal來讀取埠或者用SetPortVal來寫入埠了。好，讓我 們來做一個驅動級的鍵盤類比吧。先把winio的3個檔拷貝到你的程式的檔夾下，然後在VB中新建一個工程，添加一個模組，在模組中加入下面的winio 函數聲明:

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

' ------------------------------------以上是WINIO函數聲明-------------------------------------------

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

'-----------------------------------以上是WIN32 API函數聲明-----------------------------------------

再添加下面這個過程：

Sub KBCWait4IBE() '等待鍵盤緩衝區為空

Dim dwVal As Long

Do

GetPortVal &amp;H64, dwVal, 1

'這句表示從&amp;H64埠讀取一個位元組並把讀出的資料放到變數dwVal中

'GetPortVal函數的用法是GetPortVal 埠號,存放讀出資料的變數,讀入的長度

Loop While (dwVal And &amp;H2)

End Sub

上面的是一個根據KBC規範寫的過程，它的作用是在向鍵盤埠寫入資料前等待一段時間，後面將會用到。

然後再添加如下過程，這2個過程用來類比按鍵：

Public Const KBC_KEY_CMD = &amp;H64 '鍵盤命令埠

Public Const KBC_KEY_DATA = &amp;H60 '鍵盤資料埠

Sub MyKeyDown(ByVal vKeyCoad As Long)

'這個用來模擬按下鍵，參數vKeyCoad傳入按鍵的虛擬碼

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE '發送資料前應該先等待鍵盤緩衝區為空

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 '發送鍵盤寫入命令

'SetPortVal函數用於向埠寫入資料，它的用法是SetPortVal 埠號,欲寫入的資料，寫入資料的長度

KBCWait4IBE

SetPortVal KBC_KEY_DATA, btScancode, 1 '寫入按鍵資訊,按下鍵

End Sub

Sub MyKeyUp(ByVal vKeyCoad As Long)

'這個用來模擬釋放鍵，參數vKeyCoad傳入按鍵的虛擬碼

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE '等待鍵盤緩衝區為空

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 '發送鍵盤寫入命令

KBCWait4IBE

SetPortVal KBC_KEY_DATA, (btScancode Or &amp;H80), 1 '寫入按鍵資訊，釋放鍵

End Sub

定義了上面的過程後，就可以用它來類比鍵盤輸入了。在表單模組中添加一個計時器控制項，然後加入以下代碼：

Private Sub Form_Load()

If InitializeWinIo = False Then

'用InitializeWinIo函數載入驅動程式，如果成功會返回true，否則返回false

MsgBox "驅動程式載入失敗!"

Unload Me

End If

Timer1.Interval=3000

Timer1.Enabled=True

End Sub

Private Sub Form_Unload(Cancel As Integer)

ShutdownWinIo '程式結束時記得用ShutdownWinIo函數卸載驅動程式

End Sub

Private Sub Timer1_Timer()

Dim VK_A as Long = &amp;H41

MyKeyDown VK_A

MyKeyUp VK_A '模擬按下並釋放A鍵

End Sub

[/quote]

運行上面的程式，就會每隔3秒鐘模擬按下一次A鍵，試試看，怎麼樣，是不是對所有程式都有效果了？

需要注意的問題：

要在VB的調試模式下使用WINIO，需要把那3個檔拷貝到VB的安裝目錄中。

鍵盤上有些鍵屬於擴展鍵(比如鍵盤上的方向鍵就是擴展鍵)，對於擴展鍵不應該用上面的MyKeyDown和MyKeyUp過程來模擬，可以使用下面的2個過程來準確模擬擴展鍵：
<table border="0" cellspacing="1" cellpadding="3" width="90%" align="center">
<tbody>
<tr>
<td><span style="font-size: small;"><span><strong><span style="font-size:x-small;">引言回覆:</span></strong></span></span></td>
</tr>
<tr>
<td class="quote"><span style="font-size: small;">Sub MyKeyDownEx(ByVal vKeyCoad As Long) '模擬擴展鍵按下，參數vKeyCoad是擴展鍵的虛擬碼

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE '等待鍵盤緩衝區為空

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 '發送鍵盤寫入命令

KBCWait4IBE

SetPortVal KBC_KEY_DATA, &amp;HE0, 1 '寫入擴展鍵標誌資訊

KBCWait4IBE '等待鍵盤緩衝區為空

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 '發送鍵盤寫入命令

KBCWait4IBE

SetPortVal KBC_KEY_DATA, btScancode, 1 '寫入按鍵資訊,按下鍵

End Sub

Sub MyKeyUpEx(ByVal vKeyCoad As Long) '模擬擴展鍵彈起

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE '等待鍵盤緩衝區為空

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 '發送鍵盤寫入命令

KBCWait4IBE

SetPortVal KBC_KEY_DATA, &amp;HE0, 1 '寫入擴展鍵標誌資訊

KBCWait4IBE '等待鍵盤緩衝區為空

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 '發送鍵盤寫入命令

KBCWait4IBE

SetPortVal KBC_KEY_DATA, (btScancode Or &amp;H80), 1 '寫入按鍵資訊，釋放鍵

End Sub

</span></td>
</tr>
</tbody></table>
<span style="font-size: small;"><span> </span></span>

<span style="font-size: small;"> </span>

<span style="font-size: small;"><span style="font-size:x-small;">還 應該注意的是，如果要從擴展鍵轉換到普通鍵，那麼普通鍵的KeyDown事件應該發送兩次。也就是說，如果我想模擬先按下一個擴展鍵，再按下一個普通鍵， 那麼就應該向埠發送兩次該普通鍵被按下的資訊。比如，我想模擬先按下左方向鍵，再按下空白鍵這個事件，由於左方向鍵是擴展鍵，空白鍵是普通鍵，那麼流程就 應該是這樣的：</span></span>

[quote]MyKeyDownEx VK_LEFT '按下左方向鍵

Sleep 200 '延時200毫秒

MyKeyUpEx VK_LEFT '釋放左方向鍵

Sleep 500

MyKeyDown VK_SPACE '按下空白鍵，注意要發送兩次

MyKeyDown VK_SPACE

Sleep 200

MyKeyUp VK_SPACE '釋放空白鍵
