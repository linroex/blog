---
title: "【Python】Python直譯器安裝教學"
date: 2011-02-18T22:01:26
slug: "python-interpreter-install-tutorial"
aliases: ["/posts/%e3%80%90python%e3%80%91python%e7%9b%b4%e8%ad%af%e5%99%a8%e5%ae%89%e8%a3%9d%e6%95%99%e5%ad%b8/"]
tags: ["IDLE", "Python"]
categories: ["IDE", "Python"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_214318.jpg"><img class="size-full wp-image-274 aligncenter" title="2011-02-15_214318" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_214318.jpg" alt="" width="511" height="297" /></a></p>
最近因為在玩Google Storage的關係，所以就把我塵封已久的Python書拿出來看了一下，順便搭配Google Code上的說明文件，寫了一個自動備份的小程式，目前這程式還很簡單所以先不公布出來，不過寫了這個小程式之後才讓我發現Python是一個蠻簡單的程式語言，在入手的難易度還有嚴謹度上面跟VB不相上下，但是在囉嗦程度上面Python卻贏過VB（我是說VB比較囉嗦的意思XD），例如在VB裡面的判斷式要寫成if.....then.......end if，可是在Python只要if....:就完成了，還有在Python裡面縮排很重要，沒縮排好就會導致程式無法執行，因為他的編譯器是利用縮排來判斷你的選擇結構、迴圈這些東西是否執行完畢，我個人還蠻建議新手來學Python的說，可以讓你寫出很漂亮的程式碼～


<!--more-->
不過前面有說到Python跟VB一樣不嚴謹，說難聽其實是比VB還要不嚴謹... 因為他沒有強制定義變數及型別，其實VB6也沒有強制要定義，但是VB.Net就有強制了XD，但雖然他不太嚴謹，卻還是有很多大公司都用它來開發程式，例如Google裡就有很多使用Python開發的程式，還有GAE這個服務(Google App Engine)也必須使用Python或Java來進行開發，所以別以為他很弱！！ 還有根據TIOBE的統計報告，Python已經進入第4多人使用的程式語言了，已經贏過PHP囉，而且成長率還很高呢

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_213901.jpg"><img class="alignnone size-large wp-image-273" title="2011-02-15_213901" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-15_213901-526x540.jpg" alt="" width="526" height="540" /></a>

另外目前Python最新版是python 3，有些人稱為python 3k或python 3000，不過網路上比較常見的是Python 2.x的程式碼，像GAE就是使用Python2.x來進行開發的，而Python 3.x跟2.x的差異蠻多的，因此在學習Python前最好先決定你要學習哪一種，不要一次學習兩種版本
<h2>Python資訊：</h2>
<ul>
	<li>官方網站：<a href="http://www.python.org/">http://www.python.org</a></li>
	<li>編譯器載點：<a href="http://www.python.org/getit/">http://www.python.org/getit/</a></li>
</ul>
<h2>Python特色：</h2>
<ul>
	<li>透過縮排來判斷迴圈、選擇結構是否結束</li>
	<li>可以搭配C、Java、.Net來進行開發，而市場上最常見的是C-Python</li>
	<li>不用定義變數與型別</li>
	<li>語法簡潔</li>
</ul>
<h2>Python安裝</h2>
以下我以Python 3.0來做介紹，至於Python2.x的安裝方式也是類似的，還有如果再Linux下要安裝Python的話別用yum來安裝，因為我的經驗告訴我yum內建的python版本很舊，好像是2.4的樣子....

1.先到Python的下載頁面，去下載Python的安裝程式，官網方面有提供Windows、Mac、Linux等多種作業系統的直譯器，這裡只介紹Windows的安裝方法

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222223.jpg"><img class="alignnone size-large wp-image-297" title="2011-02-18_222223" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222223-540x396.jpg" alt="" width="540" height="396" /></a>

2.執行安裝檔

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222536.jpg"><img class="alignnone size-large wp-image-298" title="2011-02-18_222536" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222536-540x399.jpg" alt="" width="540" height="399" /></a>

3.這裡是問你要將Python安裝到這台電腦的所有使用者還是只有你自己的用戶，如果你電腦是全家一起用，不想讓家人知道你在用什麼程式，那就選擇【Install just for me】→【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222827.jpg"><img class="alignnone size-full wp-image-299" title="2011-02-18_222827" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_222827.jpg" alt="" width="499" height="428" /></a>

4.這裡是設定要將Python安裝到哪裡，建議維持預設值，並且先將程式的安裝位置記下來

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223025.jpg"><img class="alignnone size-full wp-image-300" title="2011-02-18_223025" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223025.jpg" alt="" width="499" height="428" /></a>

5.直接按【Next】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223359.jpg"><img class="alignnone size-full wp-image-301" title="2011-02-18_223359" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223359.jpg" alt="" width="499" height="428" /></a>

6.安裝中請稍後～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223440.jpg"><img class="alignnone size-full wp-image-302" title="2011-02-18_223440" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223440.jpg" alt="" width="499" height="428" /></a>

7.安裝完成～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223521.jpg"><img class="alignnone size-full wp-image-303" title="2011-02-18_223521" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_223521.jpg" alt="" width="499" height="428" /></a>

8.接下來進到剛剛Python安裝的地方，也就是步驟四要你記下來的位址

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224154.jpg"><img class="alignnone size-large wp-image-306" title="2011-02-18_224154" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224154-540x399.jpg" alt="" width="540" height="399" /></a>

9.執行【python.exe】，就可以開始寫程式囉～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224319.jpg"><img class="alignnone size-large wp-image-307" title="2011-02-18_224319" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-18_224319-540x307.jpg" alt="" width="540" height="307" /></a>
