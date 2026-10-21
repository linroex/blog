---
title: "Does Your Program Need to Run as Administrator? Make a .NET Program Run as Administrator by Default~"
date: 2011-02-16T00:03:57
slug: "net-program-run-as-administrator-2"
tags: [".NET", "Windows"]
categories: ["Programming"]
draft: false
---

Sometimes when you develop a program in Visual Studio, it may need administrator privileges, for example to access system folders or to use certain high-level WinAPIs. On Windows XP, using administrator privileges is not a big deal. But if you want your program to run on Windows 7 or Vista, you have to grant the program administrator rights, or it will run into problems halfway through. Generally, you can ask users to right-click the program and select "Run as administrator," but that feels odd, because users would have to set it up themselves. Actually, there is another way to make your program run as administrator by default, so users don't need to configure anything.


<!--more-->
<strong>Demonstrated here with Visual Basic 2010</strong>
<h2>Make the Program Run as Administrator by Default</h2>
1. Open your project file, then on the toolbar at the top, select [Project] -> [XXX Properties]

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211333.jpg"><img class="alignnone size-large wp-image-4704" title="2011-02-08_211333" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211333-520x277.jpg" alt="" width="520" height="277" /></a>

2. Click [View Windows Settings]

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211421.jpg"><img class="alignnone size-large wp-image-4705" title="2011-02-08_211421" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211421-520x322.jpg" alt="" width="520" height="322" /></a>

3. Find [requestedExecutionLevel level="asInvoker"] and change it to:

[requestedExecutionLevel  level="requireAdministrator"]

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211659.jpg"><img class="alignnone size-large wp-image-4706" title="2011-02-08_211659" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_211659-520x322.jpg" alt="" width="520" height="322" /></a>

Thanks to nimo1993 for teaching me this trick XDD
