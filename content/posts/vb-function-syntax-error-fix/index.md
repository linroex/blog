---
title: "VB如何寫函式(重大錯誤修正)"
date: 2009-04-19T07:17:00
slug: "vb-function-syntax-error-fix"
aliases: ["/posts/vb%e5%a6%82%e4%bd%95%e5%af%ab%e5%87%bd%e5%bc%8f%e9%87%8d%e5%a4%a7%e9%8c%af%e8%aa%a4%e4%bf%ae%e6%ad%a3/"]
tags: ["VB"]
categories: ["VB.NET"]
---

今天要敎大家的是如何自己寫函式

首先大家必須要先知道函式的語法規格,另外你必須把自製函式放在程式最下方
<pre lang="vb">語法格式:

Function 函式名稱(Byval 參數 As 參數型別,Byval 參數 As 參數型別)

函式名稱=執行的內容

End Function</pre>
簡單的講解一下吧,函式名稱那裡隨便你定,不需要用雙引號框住

而參數那裡可以有也可以沒有,看你的函式性質,如果是需要傳入值的就要設定


<!--more-->


至於可以設定幾個參數偶也不知,不過每個參數中間都要用, 隔開

還有你的執行內容不一定要=函式名稱

只是每個函式都必須要有傳回值

沒有傳回值的函式會錯誤

---------------------舉例----------------------

以下是一個可以判斷輸入數字是否大於20的函式
<pre lang="vb"> Public Function linroex(Byval x as object)as object

if x &gt; 20 then

linroex = true

else

linroex = false

end if

End Function</pre>
再來是敎各位如何引用自己做好的函式

引用格式如下:

變數名稱=函式名稱(參數1,參數2)

當然你也可以直接引用,變成<span style="font-size: x-small;">"函式名稱(參數1,參數2)"</span>

或是將它放進其他函式中

&nbsp;

例如放進msgbox函式的話是

msgbox(函式名稱(參數1,參數2))

以剛剛舉例的那個函式來講

<span style="font-size: x-small;"> -------------------------------------------</span>

dim x

x = linroex(11)

msgbox(x)

-------------------------------------------

則x=false

或是直接放進msgbox裡的話會變成

msgbox(linroex(12))

這樣大家看的懂了嗎?

覺得文章不錯就按一下推吧,不懂的話可以留言問我
