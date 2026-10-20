---
title: "使用Visual Studio，然後設計出來的介面跟編譯後的介面不一樣嘛？"
date: 2011-08-10T17:46:36
slug: "visual-studio-ui-mismatch-after-compile"
aliases: ["/posts/%e4%bd%bf%e7%94%a8visual-studio%ef%bc%8c%e7%84%b6%e5%be%8c%e8%a8%ad%e8%a8%88%e5%87%ba%e4%be%86%e7%9a%84%e4%bb%8b%e9%9d%a2%e8%b7%9f%e7%b7%a8%e8%ad%af%e5%be%8c%e7%9a%84%e4%bb%8b%e9%9d%a2%e4%b8%8d/"]
tags: ["Visual Studio"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-02_200036.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="2011-08-02_200036" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-02_200036_thumb.jpg" alt="2011-08-02_200036" width="520" height="319" border="0" /></a>

這是小弟最近寫程式時遇到的問題，如果你也是用Visual Studio開發程式，而且剛好你也遇到類似問題，也就是「VS上的介面設計」跟「執行出來的結果」不一樣，那就建議妳來看一下我的解決方法，很蝦，可是很有效XD


<!--more-->

<h2>問題敘述：</h2>
我用Visual Studio開發程式，然後我編譯程式之後，發現執行的結果跟我在Visual Studio上拉的介面是完全不一樣的

但是我的程式碼裡面都沒有任何會影響介面的東西
<h2>解決方法：</h2>
會出現這個問題，可能是你有動到Form的Language參數，開啟方案總管，然後檢查是否有語系檔在裡面，像是「Form1.zh-Hant.resx」這類的檔案，把它刪掉，然後重新編譯一次，理論上就可以解決了

你可能做了以下動作：

1.調整Form的Language=繁體中文

2.動了一下控制項

3.調整Form的Language=預設

4.在動一下控制項，然後編譯，這時就會不同了XD

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-10_173326.jpg"><img style="background-image: none; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px; border: 0px;" title="2011-08-10_173326" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-10_173326_thumb.jpg" alt="2011-08-10_173326" width="381" height="480" border="0" /></a>
<h2>原因：</h2>
原本我以為這是很神奇的Bug，後來Bill大大告訴我它會這樣子的原理我才知道原來不是Bug

整理一下思緒...

剛剛前面有講出事的步驟：

1.調整Form的Language=繁體中文

2.動了一下控制項

3.調整Form的Language=預設

4.在動一下控制項，然後編譯，這時就會不同了XD

在第2個動作時會產生Form1.zh-Hant.resx這個語系檔

這時候一切都是正常的

但是第3個步驟，我們把Language改成預設，這時候Visual Studio它的介面設計是看你原始的程式碼的，但是編譯時會把「Form1.zh-Hant.resx」放進來編譯，剛好我的電腦又是設定繁體中文語系的，這時候就遇到一個問題了，程式會自動檢查你作業系統的語系，然後套用對應的語系檔，但是語系檔裡是包含控制項位置的，所以<strong>程式執行時會套用語系檔裡的控制項位置，但是設計時是用你程式原本的，就演變成：設計、執行不同調</strong>
