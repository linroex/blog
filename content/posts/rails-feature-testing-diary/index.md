---
title: "Rails Capybara Feature Testing 踩雷日記"
date: 2017-01-16T20:32:53
slug: "rails-feature-testing-diary"
aliases: ["/posts/rails-%e3%84%86-feature-testing-%e8%b8%a9%e9%9b%b7%e6%97%a5%e8%a8%98/"]
tags: ["Rails", "Testing"]
categories: ["Programming"]
---

用一句話形容今天，大概是「第一次學 Capybara 踩地雷就上手」，花了整整六小時(以上)在寫兩個簡單的測試，途中遇到各種有趣的地雷，不寫一篇文章紀錄這慘烈的一天我怕今天氣到睡不著覺。 先聲明，這是第一次寫測試，所以有些觀念可能是錯誤或過舊的，歡迎大家留言告知，一定立刻修改，這不是一篇技術文，而是一篇發洩文（怒）


<!--more-->


首先遇到的問題，是 Firefox 版本和 Selenium webdriver 對不上的問題，據同事說明因為 Selenium webdriver 沒有支援最先版的 Firefox，所以如果你跟我一樣想用 Selenium 來執行 Capybara 的話，請使用 Firefox ESR 版本。

Firefox ESR：<a href="https://www.mozilla.org/en-US/firefox/organizations/faq/">https://www.mozilla.org/en-US/firefox/organizations/faq/</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-16-下午8.18.30.jpg"><img class="alignnone size-full wp-image-7263" src="{{< param imageBase >}}/wp-content/uploads/2017/01/螢幕快照-2017-01-16-下午8.18.30.jpg" alt="" width="732" height="429" /></a>

安裝完之後也別忘記要設定 Firefox ESR 所在的位置，才能夠讓 Capybara 抓到 Firefox 而不是用 webkit 來測試，大家可能會想說路徑不就：
<pre>/Applications/Firefox\ ESR.app</pre>
最開始我也是這樣認為的，直到後面發現我的測試一片慘紅，錯誤訊息觀察應該是 JavaScript 的錯，找了三個多小時，搞到最後把 Git Commit 版本一個個往回推終於找到錯誤所在的 commit，誰知道一行一行檢查了三次還是沒看到問題... 錯誤的程式碼大概像下面這樣：
<pre>function hi(name="") {
  console.log(name)
}</pre>
我看著這程式來來回回看了很久，用 Chrome 和 Firefox 測試也都成功，況且他不是應該用 Firefox ESR 執行嗎？ 明明我打開 Firefox ESR 一行錯誤都沒有，Capybara 是在搞什麼飛機！！！！！

最後強大的我同事又說了一句話： Capybara 用的 webkit 是很舊版的，不支援 Default Value 的寫法。

很好，恩，很好... 所以提醒大家，如果你遇到 Capybara 莫名其妙一直噴錯，檢查一下事不是你的 JS Function 用了預設值QQ
<pre>function hi(name) {
  console.log(name)
}</pre>
但就算這樣也不對呀，Capybara 不是應該要用 Firefox ESR 嗎，怎麼最後卻是用 webkit 呢？ 各位客官，Capybara 在設定 browser 時，要填完整的路徑，以 Mac 為例應該是：
<pre>/Applications/Firefox\ ESR.app/Contents/MacOS/firefox</pre>
看似大功告成了很開心（？） 誰知道換上 Firefox 又是慘紅一片，不過好歹錯誤訊息有變化了，這次遇到的是 Chrome 太勇猛，新的 Spec 都搶第一支援；要注意，JS 次方的運算大部分人可能會想到這樣寫：
<pre>console.log(10**3);</pre>
在最新版 Chrome 這樣很完美，但如果是 Firefox 的話就會遇到錯誤囉，建議安全的寫法是：
<pre>console.log(Math.pow(10, 3));</pre>
因為 ** 這種寫法是最新支援的，截至目前為止似乎只有 Chrome 支援（淚）也由此可知測試真的很重要，如果不是測試，根本不會發現這麼多的問題，說實話要用人力去測試過去的所有瀏覽器也不太可行。

好，寫完了，我要去吃晚餐了。
