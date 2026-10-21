---
title: "VB Keyboard Simulation"
date: 2008-11-26T10:12:00
slug: "vb-keyboard-simulation"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

The keyboard is still one of the most important input devices for using a computer. Even in today's mouse-dominated world, many programs still can't do without it. But repetitive, tedious keyboard operations can wear people out, so people came up with the idea of using a program to press keys in their place. That saves a lot of effort, and it is exactly what Keyboard Genie (Anjian Jingling) does. So how can we use VB to write a program with similar functionality? Let's first look at how Windows responds to keyboard events.


<!--more-->


When a user presses a key, the chip inside the keyboard detects the action and sends the signal to the computer. How do we tell which key was pressed? Every key on the keyboard has a code called the keyboard scan code. When you press a key, its scan code is sent to the system. Scan codes depend on the hardware: the same key can have different scan codes on different keyboards. The keyboard controller sends the scan code to the computer, which hands it to the keyboard driver. The keyboard driver does its work and converts the scan code into a virtual key code. What is a virtual key code? Because scan codes depend on the hardware and are not universal, the virtual key code concept was introduced to give every key a unified code. On any keyboard, the virtual key code of a given key is always the same, so programs can recognize it. Simply put, virtual key codes are the constants you often see, such as VK_A and VK_B. For example, the virtual key code of the A key is 65, which is &H41 in hexadecimal. Note that people often use hexadecimal to write virtual key codes. After the keyboard driver converts the scan code into a virtual key code, it passes the scan code, the virtual key code, and other information about the key event to the operating system. The operating system wraps this information in a message and inserts the keyboard message into the message queue. Finally, unless something goes wrong, the keyboard message is delivered to the currently active window. The application in that window receives the message, learns which key was pressed, and decides how to respond to the user. This process can be summarized as follows:

User presses a key ----- the keyboard driver passes the event to the operating system ----- the operating system inserts the keyboard event into the message queue ----- the keyboard message is sent to the currently active window

Now that we understand this process, we can program our own code to simulate keyboard operations at any one of these stages. In VB there are several ways to do this. Here we'll introduce a few typical ones.

1. Local-level simulation

Looking at the process above, keyboard events are ultimately sent to the active window, which then makes the target program respond. So the most direct way to simulate a key is to forge a keyboard message and send it straight to the target program. Haha, this is actually very simple. Windows provides several API functions that send messages directly to a target program. The common ones are SendMessage and PostMessage. The difference is that PostMessage simply hands the message to the target program and doesn't care about anything else, while SendMessage sends the message and then waits for the target program to return something. It is important to note that for simulated keyboard messages you must use PostMessage; SendMessage is wrong here, because a simulated keyboard message needs no return value, and waiting for one may leave the target program unresponsive. Remember, remember! The VB declaration of PostMessage is as follows:

Declare Function PostMessage Lib "user32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long

The parameter hwnd is the handle of the control in the target program that you want to send the message to. The parameter wMsg is the message type, which says what kind of message you are sending. Finally, wParam and lParam are data attached to the message; their exact contents depend on the message.

wMsg is the parameter that determines what kind of key event you simulate. The commonly used keyboard messages are:

WM_KEYDOWN: a regular key is pressed

WM_KEYUP: a regular key is released

WM_SYSKEYDOWN: a system key is pressed, such as Alt

WM_SYSKEYUP: a system key is released, such as Alt

If you are sure you want to send one of the messages above, let's look at how to determine the wParam and lParam parameters of a keyboard message. In a keyboard message, wParam is simpler: it is the virtual key code of the key event you want to send. For example, if you want to simulate pressing the A key on the target program, set wParam to VK_A. lParam is more complicated, because it contains several pieces of information. You can usually set it to 0, but if you want the simulation to be more realistic, it is recommended that you set it. So let's look at lParam in detail. lParam is a long-type parameter that takes 4 bytes in memory. In binary it is 00000000 00000000 00000000 00000000, which is 32 bits in total. Counting from the right, let's say the rightmost bit is bit 0 (note that counting starts from 0, not 1), and the leftmost bit is bit 31. Bits 0-15 hold extended information such as the repeat count of the key. Bits 16-23 hold the scan code of the key. Bits 24-31 indicate whether the key is pressed or released. Most people write this in hexadecimal, so it should be &H00 00 00 00. Bits 0-15 are generally &H0001. If the key is pressed, bits 24-31 are &H00; if it is released, they are &HC0. But how do we get the scan code for bits 16-23? That requires the API function MapVirtualKey. This function can convert a virtual key code into a scan code, convert a scan code into a virtual key code, and convert a virtual key code into the ASCII code of the corresponding character. Its VB declaration is as follows:

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

The parameter wCode is the code to convert. The parameter wMapType says what to convert from and to: to convert a virtual key code into a scan code, set wMapType to 0; to convert a scan code into a virtual key code, set wMapType to 1; to convert a virtual key code into an ASCII code, set wMapType to 2. With these in hand, we can construct the lParam parameter of a keyboard event. Here is a function that does it:

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

Function MakeKeyLparam(ByVal VirtualKey As Long, ByVal flag As Long) As Long

'Parameter VirtualKey is the virtual key code of the key. flag indicates whether the key is pressed or released, using the constants WM_KEYDOWN and WM_KEYUP

Dim s As String

Dim Firstbyte As String 'bits 24-31 of lParam

If flag = WM_KEYDOWN Then 'if the key is pressed

Firstbyte = "00"

Else

Firstbyte = "C0" 'if the key is released

End If

Dim Scancode As Long

'Get the scan code of the key

Scancode = MapVirtualKey(VirtualKey, 0)

Dim Secondbyte As String 'bits 16-23 of lParam, i.e. the scan code of the virtual key

Secondbyte = Right("00" &amp; Hex(Scancode), 2)

s = Firstbyte &amp; Secondbyte &amp; "0001" '0001 is bits 0-15 of lParam, i.e. the repeat count and other extended information

MakeKeyLparam = Val("&amp;H" &amp; s)

End Function

You call this function like this. For example, to press the A key: lParam=MakeKeyLparam(VK_A,WM_KEYDOWN). Very simple, right? It is worth noting that even if you set the value of lParam when sending a message, the system may still reset this parameter based on the situation at the time of delivery, so the lParam the target program receives may differ from what you sent. So if you're lazy, just set it to 0. For most programs it makes no difference, hehe.

Okay, with all that done, we can now send keyboard messages to the target program. First, get the handle of the control in the target program that receives the message. For example, if the target control handle is 12345, then to simulate pressing and releasing the A key on that target, do this (to keep things simple, we won't construct lParam here and will just pass 0):

PostMessage 12345，WM_KEYDOWN，VK_A，0&amp; 'Press the A key

PostMessage 12345，WM_UP，VK_A，0&amp; 'Release the A key

Well, one keypress is done. Now you can't wait to open Notepad and try it: use an API function such as FindWindowEx to find Notepad's control handle, send it the keyboard messages, and expect characters to appear in Notepad automatically. But you're immediately disappointed. Huh, why no reaction at all? You're toying with my feelings~~~~~~~~~~55555555555555 No, wait, keep reading.

Generally, a target program has multiple controls, and not every control responds to keyboard messages. Only when the keyboard messages are sent to the control that accepts them do you get the expected reaction. In Notepad's case, the editing area is an edit-class control, and only that control responds to keyboard events. Sending the message to Notepad's main form does nothing. Now find the handle of Notepad's edit box, say 54321, and write the following code:

PostMessage 54321，WM_KEYDOWN，VK_F1，0&amp; 'Press the F1 key

PostMessage 54321，WM_UP，VK_F1，0&amp; 'Release the F1 key

How about that? Did Notepad's Help window pop up? That shows the target program has received the message you sent. Not bad, right~~~~~~~~

But a new problem comes up right away. You want to simulate pressing the A key so that Notepad automatically types a character, but there is no response at all! What's going on?

It turns out that to send a character to the target program, WM_KEYDOWN and WM_KEYUP alone are not enough. You also need one more event: WM_CHAR. This message represents a character, and programs rely on it to receive typed characters. Generally only keys such as A, B, and C produce a WM_CHAR message; other keys, such as the arrow keys and function keys, do not. The WM_CHAR message usually occurs after a WM_KEYDOWN message. The lParam parameter of a WM_CHAR message has the same meaning as in the other keyboard messages, while its wParam holds the ASCII code of the corresponding character (you can even type Chinese this way^_^). Now you can write a complete program that automatically writes characters into Notepad. Here is an example, with the constant values for these messages included:

Declare Function PostMessage Lib "user32" Alias "PostMessageA" (ByVal hwnd As Long, ByVal wMsg As Long, ByVal wParam As Long, lParam As Any) As Long

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

Public Const WM_KEYDOWN = &amp;H100

Public Const WM_KEYUP = &amp;H101

Public Const WM_CHAR = &amp;H102

Public Const VK_A = &amp;H41

Function MakeKeyLparam(ByVal VirtualKey As Long, ByVal flag As Long) As Long

Dim s As String

Dim Firstbyte As String 'bits 24-31 of lParam

If flag = WM_KEYDOWN Then 'if the key is pressed

Firstbyte = "00"

Else

Firstbyte = "C0" 'if the key is released

End If

Dim Scancode As Long

'Get the scan code of the key

Scancode = MapVirtualKey(VirtualKey, 0)

Dim Secondbyte As String 'bits 16-23 of lParam, i.e. the scan code of the virtual key

Secondbyte = Right("00" &amp; Hex(Scancode), 2)

s = Firstbyte &amp; Secondbyte &amp; "0001" '0001 is bits 0-15 of lParam, i.e. the repeat count and other extended information

MakeKeyLparam = Val("&amp;H" &amp; s)

End Function

Private Sub Form_Load()

dim hwnd as long

hwnd = XXXXXX 'XXXXX is the handle of Notepad's edit box

PostMessage hwnd,WM_KEYDOWN，VK_A，MakeKeyLparam(VK_A,WM_KEYDOWN) 'Press the A key

PostMessage hwnd,WM_CHAR，ASC("A"),MakeKeyLparam(VK_A,WM_KEYDOWN) 'Type the character A

PostMessage hwnd,WM_UP，VK_A，MakeKeyLparam(VK_A,WM_UP) 'Release the A key

End Sub

That is how to simulate key presses with local keyboard messages. This method has one great advantage: it can simulate keys in the background, so it doesn't interfere with your foreground work. For example, you could use this method to write a program that presses keys in a game to repeat certain actions, while you sit back, drink tea, and chat happily with the girls on QQ, without any effect on your foreground work. It doesn't matter whether or not the target program has focus. That is the principle of background key simulation~~~~

2. Global-level simulation

You'll find that the method above doesn't work for every program. Sometimes you send a big pile of messages and the program doesn't react at all. Why? It depends on the situation. Some programs (especially games) block simulated key presses for their own reasons. How can they do that? For example, a program can check whether it is the active window, and if it isn't, refuse keyboard messages. Or, if you examine the keyboard messages it receives closely, you'll find that real key presses and simulated ones always differ in small ways. From these small differences, the target program can tell: this is fake! It's forged!! So if sending local messages with PostMessage doesn't work, you can try global-level keyboard messages and see whether they can fool the target program.

Common ways to simulate global keyboard messages include the following:

(1) Use the API function keybd_event, which simulates a keyboard event. Its VB declaration is:

Declare Sub keybd_event Lib "user32" (ByVal bVk As Byte, ByVal bScan As Byte, ByVal dwFlags As Long, ByVal dwExtraInfo As Long)

The parameter bVk is the virtual key code of the key to simulate. bScan is the scan code of that key (you can usually pass 0). dwFlags indicates whether the key is pressed or released (0 for pressed, 2 for released). dwExtraInfo is an extra flag and is usually not used. For example, to simulate pressing the A key, you can do this:

Const KEYEVENTF_KEYUP = &amp;H2

keybd_event VK_A, 0, 0, 0 'Press the A key

keybd_event VK_A, 0, KEYEVENTF_KEYUP, 0 'Release the A key

Note that sometimes pressing keys too fast causes problems, so you can use the API function Sleep to add a delay. Its declaration is:

Declare Sub Sleep Lib "kernel32" (ByVal dwMilliseconds As Long)

The parameter dwMilliseconds is the length of the delay, in milliseconds.

What about simulating a key combination? For example, to press Ctrl+C to copy, you can do this:

keybd_event VK_Ctrl, 0, 0, 0 'Press the Ctrl key

keybd_event VK_C, 0, 0, 0 'Press the C key

Sleep 500 'Delay 500 milliseconds

keybd_event VK_C, 0, KEYEVENTF_KEYUP, 0 'Release the C key

keybd_event VK_Ctrl, 0, KEYEVENTF_KEYUP, 0 'Release the Ctrl key

Okay, now you can try whether this fools the target program. The function works for most window programs, but some games still ignore the keyboard events it generates. In that case, you need to use the bScan parameter. Generally bScan is passed as 0, but if the target program is a DirectX game, you need to pass the correct scan code in this parameter. Doing so generates correct hardware event messages that the game can recognize. Then you can write it like this:

keybd_event VK_A, MapVirtualKey(VK_A, 0), 0, 0 'Press the A key

keybd_event VK_A, MapVirtualKey(VK_A, 0), KEYEVENTF_KEYUP, 0 'Release the A key

That is how to simulate keyboard events with the keybd_event function. Besides this function, the SendInput function can also simulate global keyboard events. SendInput can insert a message directly into the message queue, so it is fairly low-level. Its VB declaration is:

Declare Function SendInput Lib "user32.dll" (ByVal nInputs As Long, pInputs As GENERALINPUT, ByVal cbSize As Long) As Long

Parameters:

nlnprts: defines the number of structures that plnputs points to.

plnputs: a pointer to an array of INPUT structures. Each structure represents an event to be inserted into the keyboard or mouse input stream.

cbSize: defines the size of the INPUT structure. If cbSize is not the size of the INPUT structure, the function call fails.

Return value: the function returns the number of events successfully inserted into the keyboard or mouse input stream. To get more error information, call GetlastError.

Remarks: SendInput inserts the events in the INPUT structures, in order, into the keyboard or mouse input stream. These events are not compatible with keyboard or mouse input made by the user (with the mouse or keyboard), or with input inserted by keybd_event, mouse_event, or another SendInput call.

Well, this function is quite complicated to use, because its parameters are all pointer-like structures. To use it to simulate keyboard input, you first need to build a set of data structures, put the keyboard messages you want to simulate into them, and then pass them to the function. For convenience, I'll wrap this in a procedure so you can just call it when you need it. The code is as follows:

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

'Pass the virtual key code of the key to simulate in bkey to press that key

Dim GInput(0 To 1) As GENERALINPUT

Dim KInput As KEYBDINPUT

KInput.wVk = bkey 'The key to simulate

KInput.dwFlags = 0 'Flag for key press

GInput(0).dwType = INPUT_KEYBOARD

CopyMemory GInput(0).xi(0), KInput, Len(KInput) 'Copies the data of KInput in memory into GInput

KInput.wVk = bkey

KInput.dwFlags = KEYEVENTF_KEYUP ' Flag for key release

GInput(1).dwType = INPUT_KEYBOARD ' Indicates this message is a keyboard message

CopyMemory GInput(1).xi(0), KInput, Len(KInput)

'The above adds two keyboard messages, one press and one release, to the GInput data structure

SendInput 2, GInput(0), Len(GInput(0)) 'Insert the messages stored in GInput into the message queue

End Sub

Besides all of the above, you can also simulate keyboard messages with a global hook. If you already understand how message hooks work in Windows, you can set a global HOOK to simulate keyboard messages. For example, you can use the WH_JOURNALPLAYBACK hook to simulate key presses. WH_JOURNALPLAYBACK is a system-wide global hook. It is the counterpart of WH_JOURNALRECORD, and the two are often used to record and replay keyboard and mouse operations. The WH_JOURNALRECORD hook faithfully records keyboard and mouse actions, and the recorded information can be saved to a file. WH_JOURNALPLAYBACK can then replay those actions. Of course, you can also use WH_JOURNALPLAYBACK on its own to simulate keyboard operations. First you need to declare the SetWindowsHookEx function, which installs message hooks:

Declare Function SetWindowsHookEx Lib "user32" Alias "SetWindowsHookExA" (ByVal idHook As Long,ByVal lpfn As Long, ByVal hmod As Long, ByVal dwThreadId As Long) As Long

First install the WH_JOURNALPLAYBACK hook. Then write your own hook function. When the system calls it, you pass the event you want to simulate into the EVENTMSG structure that the hook's lParam parameter points to, and that achieves the key simulation. However, using this hook to simulate keyboard events has a side effect: it locks the real mouse and keyboard. But if you want the simulation to be free from interference by real keyboard operations, it is a good idea.

3. Driver-level simulation

If you have tried all the methods above and the target program still stubbornly refuses the simulated messages, sigh~~~~~~~~~ Luckily, I still have one last trick: driver-level simulation, which means reading and writing the keyboard hardware ports directly!

Some games that use the DirectX interface read keyboard input by bypassing the Windows message mechanism and using DirectInput instead. This is because some games need very high real-time responsiveness, such as racing games, which must respond to keyboard input as quickly as possible. Windows messages are queue-based, so they have considerable delay in transit; sometimes only a dozen or so messages get delivered per second, which is far too slow for these games. DirectInput bypasses Windows messages and deals directly with the keyboard driver, so it is much more efficient. Therefore, for such programs, neither PostMessage nor keybd_event will have any effect, because those functions operate at a higher level. For these programs, the only option is to read and write the keyboard ports directly to simulate hardware events. To simulate the keyboard this way, you first need to understand some basics of keyboard programming.

In the DOS era, when a user pressed or released a key, a keyboard interrupt was generated (if keyboard interrupts were enabled), and the program jumped to the keyboard interrupt handler in the BIOS. If you open Device Manager in Windows, you can see that the keyboard controller is controlled by two ports. Port &H60 is the data port, which can be used to read keyboard data, while &H64 is the control port, used to send control signals. In other words, you can read the key information from port &H60. When you read one byte from this port, its lower 7 bits are the scan code of the key, and its highest bit indicates whether the key was pressed or released. When a key is pressed, the highest bit is 0, which is called the make code; when a key is released, the highest bit is 1, which is called the break code. Since reading data from this port gives you key information, writing data to this port can simulate key presses! Friends who have used QBASIC 4.5 may know that QB has an OUT command that writes data to a specified port, and an INP function that reads data from a specified port. So let's first look at how you would write this in QB:

Suppose you want to simulate pressing a key whose scan code is &H50. You would do this:

OUT &H64,&HD2 'Send data &HD2 to port &H64. This is a KBC command, meaning data is about to be written to the keyboard

OUT &H60,&H50 'Send scan code &H50 to port &H60, simulating a press of the key whose scan code is &H50

To release the key, send its break code, like this:

OUT &H64,&HD2 'Send data &HD2 to port &H64. This is a KBC command, meaning data is about to be written to the keyboard

OUT &H60,(&H50 OR &H80) 'OR the scan code &H50 with &H80. This sets its highest bit to 1, giving the break code, which means releasing this key

Okay, now the question is how to write data to a port in VB. In Windows, ordinary applications are not allowed to access ports directly, so we need a driver to help us. Here we can use a component called WINIO to read and write ports. What is WINIO? WINIO is a completely free, no-registration-required port access driver component for Windows 2000 that comes with its source code (you can download it from http://www.internals.com/). It can operate not only on ports but also on memory, and it can be used not only in VB but also in Delphi, VC, and other environments. Its performance is excellent. After downloading and unzipping the component, you'll see several folders. The three files in the Release folder are the ones we need: WinIo.sys (the driver for Windows XP), WINIO.VXD (the driver for Windows 98), and WinIo.dll (the dynamic link library that wraps the functions). We only need to call the functions in WinIo.dll, which installs and calls the driver to do the work. Worth mentioning: this component is completely portable (green software), with no installation needed. You just copy these three files into the same folder as your program and you can use them. Usage is simple: first install the driver with the InitializeWinIo function, then use GetPortVal to read a port or SetPortVal to write to one. Okay, let's build a driver-level keyboard simulation. First copy the three WinIo files into your program's folder, then create a new project in VB, add a module, and add the following WinIo function declarations to the module:

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

' ------------------------------------ End of WINIO function declarations -------------------------------------------

Declare Function MapVirtualKey Lib "user32" Alias "MapVirtualKeyA" (ByVal wCode As Long, ByVal wMapType As Long) As Long

'----------------------------------- End of WIN32 API function declarations -----------------------------------------

Next, add the following procedure:

Sub KBCWait4IBE() 'Wait until the keyboard buffer is empty

Dim dwVal As Long

Do

GetPortVal &amp;H64, dwVal, 1

'This reads one byte from port &H64 and stores it in the variable dwVal

'The syntax of GetPortVal is: GetPortVal port number, variable to store the data, length to read

Loop While (dwVal And &amp;H2)

End Sub

The procedure above is written according to the KBC specification. Its job is to wait for the keyboard buffer to become free before data is written to the keyboard port. It will be used later.

Then add the following two procedures, which are used to simulate key presses:

Public Const KBC_KEY_CMD = &amp;H64 'Keyboard command port

Public Const KBC_KEY_DATA = &amp;H60 'Keyboard data port

Sub MyKeyDown(ByVal vKeyCoad As Long)

'Simulates pressing a key. The parameter vKeyCoad takes the virtual key code of the key

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'Before sending data, wait until the keyboard buffer is empty

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'Send the keyboard write command

'SetPortVal writes data to a port. Its syntax is: SetPortVal port number, data to write, length of the data

KBCWait4IBE

SetPortVal KBC_KEY_DATA, btScancode, 1 'Write the key information: key pressed

End Sub

Sub MyKeyUp(ByVal vKeyCoad As Long)

'Simulates releasing a key. The parameter vKeyCoad takes the virtual key code of the key

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'Wait until the keyboard buffer is empty

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'Send the keyboard write command

KBCWait4IBE

SetPortVal KBC_KEY_DATA, (btScancode Or &amp;H80), 1 'Write the key information: key released

End Sub

With these procedures defined, we can use them to simulate keyboard input. Add a Timer control to the form module, then add the following code:

Private Sub Form_Load()

If InitializeWinIo = False Then

'InitializeWinIo loads the driver. It returns true on success and false otherwise

MsgBox "驅動程式載入失敗!"

Unload Me

End If

Timer1.Interval=3000

Timer1.Enabled=True

End Sub

Private Sub Form_Unload(Cancel As Integer)

ShutdownWinIo 'Remember to unload the driver with ShutdownWinIo when the program ends

End Sub

Private Sub Timer1_Timer()

Dim VK_A as Long = &amp;H41

MyKeyDown VK_A

MyKeyUp VK_A 'Simulate pressing and releasing the A key

End Sub

[/quote]

Run the program above, and it will simulate pressing the A key once every 3 seconds. Give it a try. Does it now work with every program?

Things to note:

To use WINIO in VB's debug mode, you need to copy those three files into VB's installation directory.

Some keys are extended keys (for example, the arrow keys on the keyboard are extended keys). For extended keys, you should not use the MyKeyDown and MyKeyUp procedures above. Instead, you can use the following two procedures to simulate extended keys accurately:
<table border="0" cellspacing="1" cellpadding="3" width="90%" align="center">
<tbody>
<tr>
<td><span style="font-size: small;"><span><strong><span style="font-size:x-small;">Quote:</span></strong></span></span></td>
</tr>
<tr>
<td class="quote"><span style="font-size: small;">Sub MyKeyDownEx(ByVal vKeyCoad As Long) 'Simulates pressing an extended key. vKeyCoad is the virtual key code of the extended key

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'Wait until the keyboard buffer is empty

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'Send the keyboard write command

KBCWait4IBE

SetPortVal KBC_KEY_DATA, &amp;HE0, 1 'Write the extended-key flag

KBCWait4IBE 'Wait until the keyboard buffer is empty

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'Send the keyboard write command

KBCWait4IBE

SetPortVal KBC_KEY_DATA, btScancode, 1 'Write the key information: key pressed

End Sub

Sub MyKeyUpEx(ByVal vKeyCoad As Long) 'Simulates releasing an extended key

Dim btScancode As Long

btScancode = MapVirtualKey(vKeyCoad, 0)

KBCWait4IBE 'Wait until the keyboard buffer is empty

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'Send the keyboard write command

KBCWait4IBE

SetPortVal KBC_KEY_DATA, &amp;HE0, 1 'Write the extended-key flag

KBCWait4IBE 'Wait until the keyboard buffer is empty

SetPortVal KBC_KEY_CMD, &amp;HD2, 1 'Send the keyboard write command

KBCWait4IBE

SetPortVal KBC_KEY_DATA, (btScancode Or &amp;H80), 1 'Write the key information: key released

End Sub

</span></td>
</tr>
</tbody></table>
<span style="font-size: small;"><span> </span></span>

<span style="font-size: small;"> </span>

<span style="font-size: small;"><span style="font-size:x-small;">Also note: if you switch from an extended key to a regular key, the KeyDown event for the regular key must be sent twice. That is, if you want to simulate pressing an extended key first and then a regular key, you need to send the regular key's pressed information to the port twice. For example, suppose you want to simulate pressing the Left Arrow key and then the Spacebar. Because the Left Arrow is an extended key and the Spacebar is a regular key, the sequence should be as follows:</span></span>

[quote]MyKeyDownEx VK_LEFT 'Press the Left Arrow key

Sleep 200 'Delay 200 milliseconds

MyKeyUpEx VK_LEFT 'Release the Left Arrow key

Sleep 500

MyKeyDown VK_SPACE 'Press the Spacebar; note that this must be sent twice

MyKeyDown VK_SPACE

Sleep 200

MyKeyUp VK_SPACE 'Release the Spacebar
