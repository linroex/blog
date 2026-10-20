---
title: "你的程式需要用到系統管理員身分執行嘛？ 讓.net程式預設使用系統管理員執行～"
date: 2011-02-16T00:03:57
slug: "net-program-run-as-administrator-2"
aliases: ["/posts/%e4%bd%a0%e7%9a%84%e7%a8%8b%e5%bc%8f%e9%9c%80%e8%a6%81%e7%94%a8%e5%88%b0%e7%b3%bb%e7%b5%b1%e7%ae%a1%e7%90%86%e5%93%a1%e8%ba%ab%e5%88%86%e5%9f%b7%e8%a1%8c%e5%98%9b%ef%bc%9f-%e8%ae%93-net%e7%a8%8b-2/"]
tags: [".NET", "Windows"]
categories: ["Programming"]
---

有的時候你在使用Visual Studio開發程式時，可能會遇到一種情況就是你的程式會使用到系統管理員權限，例如要存取系統資料夾，或是可能要使用某些叫高層級的WinAPI，使用到系統管理員權限在Windows XP上其實都沒有關係，但如果你的程式想在Windows 7/Vista上執行的話，就必須要賦予此程式系統管理員的權限，否則程式就會執行到一半出問題，一般來講你可以請使用者在執行程式時按右鍵，選擇【以系統管理員身分執行】，但是這樣感覺很怪，還要使用者自己去設定，其實還有另一個方法可以讓你的程式預設就是使用系統管理員身分執行，不需要使用者在去設定


<!--more-->
<strong>此處以Visual Basic 2010做示範</strong>
<h2>讓程式預設使用系統管理員執行</h2>
1.開啟你的專案檔，然後再上方工具列選擇【專案】→【XXX屬性】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211333.jpg"><img class="alignnone size-large wp-image-4704" title="2011-02-08_211333" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211333-520x277.jpg" alt="" width="520" height="277" /></a>

2.按一下【檢視Windows設定】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211421.jpg"><img class="alignnone size-large wp-image-4705" title="2011-02-08_211421" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211421-520x322.jpg" alt="" width="520" height="322" /></a>

3.找到【requestedExecutionLevel level="asInvoker"】，並且將他改成：

【requestedExecutionLevel  level="requireAdministrator"】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211659.jpg"><img class="alignnone size-large wp-image-4706" title="2011-02-08_211659" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211659-520x322.jpg" alt="" width="520" height="322" /></a>

感謝：nimo1993教我這招XDD
