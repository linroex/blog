---
title: "WordPress外掛&佈景主題安裝教學(此教學適用於WP2.9以下版本)"
date: 2010-06-01T13:36:01
slug: "wordpress-plugin-theme-install-tutorial"
aliases: ["/posts/wordpress%e5%a4%96%e6%8e%9b%e4%bd%88%e6%99%af%e4%b8%bb%e9%a1%8c%e5%ae%89%e8%a3%9d%e6%95%99%e5%ad%b8/"]
tags: ["WordPress", "WordPress外掛", "theme", "Plugins", "WordPress佈景"]
categories: ["WordPress"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_112430.jpg"><img class="size-large wp-image-3230 aligncenter" title="2010-06-01_112430" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_112430-500x303.jpg" alt="" width="350" height="212" /></a></p>
上次有人問我WordPress有哪些功能,其實這是個很難回答的問題,因為WordPress的擴充性很好,你可以利用外掛(Plugins)的方式幫你的網誌增加很多功能,甚至要把網誌搞得根本不是網誌都可以^^ 另外WordPress還可以讓使用者去安裝佈景,把Blog裝扮得美美的,如果你技術夠好的話也可以自己去設計佈景,不過這方面不是我這篇文章要教的,這篇文章主要是教大家如何安裝外掛與佈景
<h2>
<!--more-->
</h2>
<h2>一.外掛安裝教學 - 後台快速安裝法</h2>
P.S.使用此方法免下載主程式,可以直接安裝外掛

後台安裝是我最常用的方法,因為很方便,你不需要在去下載外掛的主程式也不用準備啥FTP程式,只需要開啟WordPress的後台就能安裝外掛

1.進入到WordPress的後台,依序點選【外掛】→【新增】,然後再搜尋那裏輸入你要安裝的外掛再按【搜尋外掛】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114355.jpg"><img class="alignnone size-large wp-image-3232" title="2010-06-01_114355" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114355-500x303.jpg" alt="" width="500" height="303" /></a>

2.系統會列出他所蒐尋到的外掛名單,通常最上面的就是你要安裝的那個外掛,你可以大概看一下外掛的介紹是否是你要安裝的那個外掛,然後選擇你要安裝的外掛後面的【安裝】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114827.jpg"><img class="alignnone size-large wp-image-3233" title="2010-06-01_114827" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_114827-500x303.jpg" alt="" width="500" height="303" /></a>

3.按下安裝後系統會給你關於這個外掛更詳細的資料,隨便看看就好,按【立刻安裝】即可

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115026.jpg"><img class="alignnone size-large wp-image-3234" title="2010-06-01_115026" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115026-500x303.jpg" alt="" width="500" height="303" /></a>

4.輸入你的FTP帳號.密碼以及FTP的位置然後按【繼續】(連線型態的部分選擇FTP即可,除非你很重視資訊安全再按SSL,不過用SSL也要伺服器方面支援才行)

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115239.jpg"><img class="alignnone size-large wp-image-3235" title="2010-06-01_115239" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115239-500x303.jpg" alt="" width="500" height="303" /></a>

5.安裝完外掛之後如果出現『成功地安裝外掛XXX。』代表你安裝成功了,如果不是代表你失敗了,通常安裝失敗的話你可以在嘗試第二次,但如果第二次還是失敗的話妳就用FTP安裝吧

▼▼按一下【啟用外掛】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_121302.jpg"><img class="alignnone size-large wp-image-3240" title="2010-06-01_121302" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_121302-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>二.外掛安裝教學 - FTP安裝法</h2>
雖然後臺安裝又快速又方便,但在某些虛擬主機它會限制你不能使用後台安裝的方式,這時候最傳統的FTP安裝就能派上用場嚕

1.在這裡我以<a href="http://filezilla-project.org/">FileZilla</a>做教學,首先請開啟FTP傳檔程式,然後登入你的FTP站台

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115741.jpg"><img class="alignnone size-large wp-image-3236" title="2010-06-01_115741" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_115741-500x303.jpg" alt="" width="500" height="303" /></a>

2.依序進入WordPress目錄→wp-content資料夾→plugins資料夾

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120004.jpg"><img class="alignnone size-large wp-image-3237" title="2010-06-01_120004" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120004-500x303.jpg" alt="" width="500" height="303" /></a>

3.把你的外掛主程式上傳到plugins資料夾

<strong>注意:你從官網下載下來的外掛主程式都是壓縮檔,先將他解壓縮,然後在上傳,注意要上傳的是一個資料夾,而不是很多個資料夾(檔案)</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120320.jpg"><img class="alignnone size-large wp-image-3238" title="2010-06-01_120320" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120320-500x303.jpg" alt="" width="500" height="303" /></a>

4.上傳完之後進入到後台,依序進入【外掛】→【已安裝】,然後對剛才上傳的那個外掛按【啟用】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120849.jpg"><img class="alignnone size-large wp-image-3239" title="2010-06-01_120849" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_120849-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>三.佈景安裝教學 - 後台安裝法</h2>
與外掛後台安裝有一樣的優點,快速而且方便,但是也有一個缺點就是只能安裝WordPress官方網站收錄的那些佈景

1.登入到WordPress後台,依序進入外觀新增佈景主題,然後再搜尋那裏輸入你要安裝的佈景名稱再按搜尋

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_130725.jpg"><img class="alignnone size-large wp-image-3242" title="2010-06-01_130725" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_130725-499x398.jpg" alt="" width="499" height="398" /></a>

2.系統會列出搜尋到的外掛,選擇你要安裝的那個然後按【安裝】→【立刻安裝】,或者你可以按【預覽】先看看這佈景的樣子

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131620.jpg"><img class="alignnone size-large wp-image-3243" title="2010-06-01_131620" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131620-500x303.jpg" alt="" width="500" height="303" /></a>

3.輸入你的FTP站資料然後按【繼續】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131809.jpg"><img class="alignnone size-large wp-image-3244" title="2010-06-01_131809" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_131809-500x303.jpg" alt="" width="500" height="303" /></a>

4.安裝完佈景之後按一下【啟用】就可以囉

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132419.jpg"><img class="alignnone size-large wp-image-3245" title="2010-06-01_132419" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132419-499x398.jpg" alt="" width="499" height="398" /></a>
<h2>四.佈景安裝教學 - FTP安裝法</h2>
有時候你在網路上會看到一些很漂亮的WordPress佈景,但是那些佈景並非是官方網站所收錄的,這時候你就可以用FTP的方式上傳佈景到你的網站中再來安裝

1.開啟FTP傳檔程式,登入到你的FTP站台,然後進入WordPress目錄→wp-content資料夾→themes資料夾

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132733.jpg"><img class="alignnone size-large wp-image-3246" title="2010-06-01_132733" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132733-500x303.jpg" alt="" width="500" height="303" /></a>

2.把你的佈景上傳到themes資料夾

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132951.jpg"><img class="alignnone size-large wp-image-3247" title="2010-06-01_132951" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_132951-500x303.jpg" alt="" width="500" height="303" /></a>

下面這個是錯誤示範▼▼

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133031.jpg"><img class="alignnone size-large wp-image-3248" title="2010-06-01_133031" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133031-456x400.jpg" alt="" width="456" height="400" /></a>

3.上傳完之後依序進入到【後台】→【外觀】→【佈景主題】,然後對你剛剛上傳的那個佈景按【啟用】

<a href="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133250.jpg"><img class="alignnone size-large wp-image-3249" title="2010-06-01_133250" src="{{< param imageBase >}}/wp-content/uploads/2010/06/2010-06-01_133250-500x303.jpg" alt="" width="500" height="303" /></a>
<h2>常見的非官方佈景提供網站</h2>
<ul>
	<li><a href="http://www.smashingmagazine.com/" target="_blank">Smashing Magazine</a> (英文)</li>
	<li><a href="http://www.simplethemes.net/" target="_blank">Simple Themes</a> (英文)</li>
	<li><a href="http://www.skinpress.com/">SkinPress</a> (英文)</li>
</ul>
<strong>補充:剛看到一份很棒的<a href="http://www.boxcn.net/shared/rsk3lfcr37">WordPress外掛設計教學</a>,想研究的人可以去看看 </strong>
