---
title: "Fixing Hidden Files That Won't Open"
date: 2009-05-03T05:38:00
slug: "fix-hidden-files-cannot-open-registry"
tags: ["Windows"]
categories: ["Hardware"]
draft: false
---

If you've ever been infected by a USB virus, some of them make your hidden files stop showing up.<br/>
This post shows you how to fix the problem of hidden files not appearing, which covers most cases.<br/>
<br/>
First: "Start" --> "Run" --> type "regedit" --><br/>
"HKEY_CURRENT_USER&#92;SOFTWARE&#92;Microsoft&#92;Windows&#92;CurrentVersion&#92;Explorer&#92;Advanced&#92;Folder&#92;Hidden&#92;SHOWALL"<br/>
I'll expand these one level at a time so beginners don't get lost.<br/>
HKEY_CURRENT_USER&nbsp; &rarr;&nbsp; SOFTWARE&nbsp; &rarr;&nbsp; Microsoft&nbsp; &rarr;&nbsp; Windows&nbsp; &rarr;&nbsp; CurrentVersion&nbsp; &rarr;&nbsp; Explorer&nbsp; &rarr;&nbsp; Advanced&nbsp; &rarr;&nbsp; Folder&nbsp; &rarr;<br/>
Hidden&nbsp; &rarr;&nbsp; SHOWALL<br/>
<br/>
Once expanded, do you see "CheckedValue" on the right? Double-click it, choose hexadecimal, and enter 1 in the box.<br/>
<br/>
Next, either restart the computer, or open Task Manager --> Processes tab --> end "explorer.exe" --> at this point the desktop and taskbar will disappear.<br/>
<br/>
Then, on the Applications tab, right-click on a blank area --> "New Task (Run)" --> enter "explorer.exe" and you're done.
