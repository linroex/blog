---
title: "解決隱藏檔無法開啟"
date: 2009-05-03T05:38:00
slug: "fix-hidden-files-cannot-open-registry"
aliases: ["/posts/%ef%b9%9d%e7%99%bb%e9%8c%84%e6%aa%94%ef%b9%9e%e8%a7%a3%e6%b1%ba%e9%9a%b1%e8%97%8f%e6%aa%94%e7%84%a1%e6%b3%95%e9%96%8b%e5%95%9f/"]
tags: ["登錄檔"]
categories: ["Windows系列"]
---

如果中過隨身碟（USB）病毒，有些會將你的隱藏檔變得無法顯現<br/>
這篇是教你解開大部分的隱藏檔無法顯顯得問題<br/>
<br/>
首先「開始」-->「執行」-->輸入「regedit」--><br/>
「HKEY_CURRENT_USER&#92;SOFTWARE&#92;Microsoft&#92;Windows&#92;CurrentVersion&#92;Explorer&#92;Advanced&#92;Folder&#92;Hidden&#92;SHOWALL」<br/>
先慢慢解開給您們看，為了不要新手看的霧煞煞的<br/>
HKEY_CURRENT_USER&nbsp; &rarr;&nbsp; SOFTWARE&nbsp; &rarr;&nbsp; Microsoft&nbsp; &rarr;&nbsp; Windows&nbsp; &rarr;&nbsp; CurrentVersion&nbsp; &rarr;&nbsp; Explorer&nbsp; &rarr;&nbsp; Advanced&nbsp; &rarr;&nbsp; Folder&nbsp; &rarr;<br/>
Hidden&nbsp; &rarr;&nbsp; SHOWALL<br/>
<br/>
解開後，看到右邊的「CheckedValue」吧？！在那裡點兩下，16進位，框框內輸入1<br/>
<br/>
再來就重新開機，或者是「工作管理員」&nbsp; -->&nbsp; 工處理程序&nbsp; -->&nbsp; 結束「explorer.exe」&nbsp; -->&nbsp; 這時候桌面和工作列都會關閉<br/>
<br/>
然後在應用程式&nbsp; --> 空白觸按右鍵&nbsp; -->&nbsp; 「新工作（執行）」&nbsp; -->&nbsp; 輸入「explorer.exe」就可以完成
