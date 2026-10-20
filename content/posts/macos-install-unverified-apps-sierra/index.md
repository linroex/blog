---
title: "如何安裝未經驗證的應用程式到 macOS Sierra"
date: 2016-12-31T00:49:12
slug: "macos-install-unverified-apps-sierra"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e5%ae%89%e8%a3%9d%e6%9c%aa%e7%b6%93%e9%a9%97%e8%ad%89%e7%9a%84%e6%87%89%e7%94%a8%e7%a8%8b%e5%bc%8f%e5%88%b0-macos-sierra/"]
tags: ["macOS"]
categories: ["Hardware"]
images: ["%%IMG%%/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.47.27.jpg"]
---

有時當我們安裝應用程式到 Mac OS 時，會遇到系統提示「無法打開 OOO 因為它來自未未識別的開發者」，過去我們都知道，只要到系統偏好設定的「安全性與隱私」設定允許任何來源下載的 App 即可，但在 macOS Sierra 之後，這個「任何來源」的選項卻神秘消失了！ 其實，是 Apple 為了避免使用者安裝到惡意程式，所以將這個選項隱藏起來，但事實上並非未經驗證的應用程式就是惡意程式，很多好用的 App 因為某些原因不被 Apple 認證，例如某些 App 使用到系統權限，或是開發者沒有購買開發方案（因為要錢阿！！！）就不會被 Apple 認證，但只因為這樣就不讓我們使用它說不過去吧！


<!--more-->


其實，要讓「任何來源」再次現形十分簡單，只要在終端機 Terminal 輸入以下指令，並輸入使用者密碼，「任何來源」就會馬上出現囉！
<pre>sudo spctl --master-disable</pre>
反之，如果你希望讓「任何來源」隱藏起來，輸入這段語法：
<pre>sudo spctl --master-enable</pre>
也有朋友在留言提到，如果懶得設定的話，也可以按住 Ctrl 鍵後對 App 按右鍵，選擇「打開」就可以直接開啟囉！
