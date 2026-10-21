---
title: "Fixing Errors Caused by a Virus"
date: 2009-05-03T10:00:00
slug: "fix-virus-infection"
tags: ["Windows"]
categories: ["Security"]
draft: false
---

Some viruses use the registry to damage computers. Basically, I'm only posting one example here; the registry has many other places where things can be hidden,<br/>
so if you don't know much about computers, don't try to change other places. At best nothing happens, at worst the computer is ruined. Following the steps below is safe.<br/>
"Start" "Run", type "regedit"<br/>
&nbsp;HKEY_CLASSES_ROOT&#92;exefile&#92;shell&#92;open&#92;command<br/>
<br/>
HKEY_CLASSES_ROOT&nbsp; -->&nbsp; exefile&nbsp; -->&nbsp; shell -->&nbsp; open -->&nbsp; command<br/>
<br/>
Then check the "(Default)" value. If it is "%1" %* it is normal. If it isn't, your computer has been infected.<br/>
Double-click it and change it to "%1" %*<br/>
<br/>
Also, pay attention to other places!!
