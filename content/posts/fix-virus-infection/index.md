---
title: "修正病毒照成的錯誤"
date: 2009-05-03T10:00:00
slug: "fix-virus-infection"
aliases: ["/posts/%e4%bf%ae%e6%ad%a3%e7%97%85%e6%af%92%e5%85%a5%e4%be%b5/"]
tags: ["登錄檔"]
categories: ["Windows系列"]
---

病毒有一些部分是利用登錄檔來進行破壞電腦，基本上我只貼一種，登錄檔還有很多地方也有藏，<br/>
電腦不懂的人，不要嘗試修改其他地方，輕者還沒事情，重者電腦毀了，按照下面的步驟是不會有事情<br/>
「開始」 「執行」 輸入「regedit」<br/>
&nbsp;HKEY_CLASSES_ROOT&#92;exefile&#92;shell&#92;open&#92;command<br/>
<br/>
HKEY_CLASSES_ROOT&nbsp; -->&nbsp; exefile&nbsp; -->&nbsp; shell -->&nbsp; open -->&nbsp; command<br/>
<br/>
然後「預設值」 如果是「"%1" %*」就是正常 如果不是就是被入侵了<br/>
點兩下後 修改成「"%1" %*」<br/>
<br/>
還有其他地方注意一下！！
