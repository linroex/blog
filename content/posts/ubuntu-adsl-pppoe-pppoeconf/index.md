---
title: "【Ubuntu】ADSL(PPPoE)上網教學 - pppoeconf"
date: 2010-12-15T08:00:40
slug: "ubuntu-adsl-pppoe-pppoeconf"
aliases: ["/posts/%e3%80%90ubuntu%e3%80%91adslpppoe%e4%b8%8a%e7%b6%b2%e6%95%99%e5%ad%b8-pppoeconf/"]
tags: ["Ubuntu", "Networking"]
categories: ["Hardware"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231404.jpg"><img class="size-full wp-image-4199 aligncenter" title="2010-12-13_231404" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231404.jpg" alt="" width="402" height="330" /></a></p>
幾乎現在一般人的家裡都是使用PPPoE這種連線方式,如果你家是去申請ADSL,或是你家要透過一台數據機才能上網的話那你都需要先設定PPPoE才能讓Ubuntu連上網路,如果沒記錯的話之前的Ubuntu要設定PPPoE十分麻煩,可是最近又回鍋Ubuntu 10.04,才發現新一代的Ubuntu已經有pppoeconf這個命令可以快速設定PPPoE了

補充：聽說其實pppoeconf的方式還是很慢,有更快的方式orz...... 不過跟我之前用得版本起來ppoeconf算蠻快了XD


<!--more-->
1.進入到ubuntu系統之後，開啟終端機的程式並輸入下列指令：

sudo pppoeconf

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-001.png"><img class="alignnone size-large wp-image-4185" title="2010-12-13-001" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-001-520x323.png" alt="" width="520" height="323" /></a>

2.接者輸入你當初灌ubuntu時設定的系統密碼，你輸入時螢幕不會顯示出你輸入的資料，所以輸入完密碼之後直接按Enter,不用管螢幕上有沒有出現密碼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-002.png"><img class="alignnone size-large wp-image-4186" title="2010-12-13-002" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-002-520x345.png" alt="" width="520" height="345" /></a>

3.接者會出現一個視窗說乙太網路設備等等的，就只是要看說有沒有偵測到你的網路卡還有區域網路，直接按是就可以了（如果你根本沒搜尋到任何設備那可能你的網卡不支援Ubuntu... 那就按否吧...）

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-003.png"><img class="alignnone size-large wp-image-4187" title="2010-12-13-003" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-003-520x345.png" alt="" width="520" height="345" /></a>

4.如果你有遇到這個視窗的話就直接按是，會出現這視窗是因為我之前已經設定過PPPoE的關係

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-004.png"><img class="alignnone size-large wp-image-4188" title="2010-12-13-004" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-004-520x345.png" alt="" width="520" height="345" /></a>」

5.這裡也直接按是就可以

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-005.png"><img class="alignnone size-large wp-image-4189" title="2010-12-13-005" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13-005-520x345.png" alt="" width="520" height="345" /></a>

6.這裡是要你上網時用的帳號，請把原本的文字清除掉在輸入，輸入完直接按Enter即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_225943.jpg"><img class="alignnone size-large wp-image-4190" title="2010-12-13_225943" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_225943-520x369.jpg" alt="" width="520" height="369" /></a>

7.這裡是要輸入你上網時的密碼，請把原本的文字清除掉在輸入，輸入完直接按Enter即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230012.jpg"><img class="alignnone size-large wp-image-4191" title="2010-12-13_230012" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230012-520x368.jpg" alt="" width="520" height="368" /></a>

8.這裡是再說DNS Server的意思,直接按是就可以了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230526.jpg"><img class="alignnone size-large wp-image-4192" title="2010-12-13_230526" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230526-520x368.jpg" alt="" width="520" height="368" /></a>

9.這裡也給他按是就好嚕～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230832.jpg"><img class="alignnone size-large wp-image-4193" title="2010-12-13_230832" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_230832-520x366.jpg" alt="" width="520" height="366" /></a>

10.這裡也給他按是，這樣以後開機就會自動幫你連線，不用再手動去連了

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231003.jpg"><img class="alignnone size-large wp-image-4194" title="2010-12-13_231003" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231003-520x368.jpg" alt="" width="520" height="368" /></a>

11.這裡是問說是否要立刻啟用此連線，沒有理由不要吧XD

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231057.jpg"><img class="alignnone size-large wp-image-4195" title="2010-12-13_231057" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231057-520x368.jpg" alt="" width="520" height="368" /></a>

12.設定完成～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231134.jpg"><img class="alignnone size-large wp-image-4196" title="2010-12-13_231134" src="{{< param imageBase >}}/wp-content/uploads/2010/12/2010-12-13_231134-520x367.jpg" alt="" width="520" height="367" /></a>
