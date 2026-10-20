---
title: "透過Gettext for PHP快速做出多國語系程式"
date: 2011-07-18T22:47:40
slug: "php-gettext-multilanguage-program"
aliases: ["/posts/%e9%80%8f%e9%81%8egettext-for-php%e5%bf%ab%e9%80%9f%e5%81%9a%e5%87%ba%e5%a4%9a%e5%9c%8b%e8%aa%9e%e7%b3%bb%e7%a8%8b%e5%bc%8f/"]
tags: ["PHP", "Gettext"]
categories: ["Programming"]
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_224707.jpg"><img class="alignnone size-large wp-image-555" title="2011-07-18_224707" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_224707-540x378.jpg" alt="" width="540" height="378" /></a>

Gettext是由GNU所推出的一個... 嗯，我也不知道該怎形容他，類似規範吧，可是也算是一組library，反正就是可以讓你很方便的幫你的程式作多國語系的東西啦～ 而這篇文章要講的就是如何把Gettext用在PHP上面，開發多國語系的程式、網站


<!--more-->
GNU Gettext專案網址：<a href="http://www.gnu.org/s/gettext/">http://www.gnu.org/s/gettext/</a>

在以前我們如果要幫程式作多國語系，不外乎以下幾種方式，其一就是自己開發讀取語系檔的函式，去讀取外部的語系檔，然後修改程式內部的字串，像是Imgburn就是如此，再來還有一種方式就是透過反編譯的技術去修改主程式，方法一的缺點是要自己去寫函式來讀取語系檔，方法二的缺點則是反編譯其實有點麻煩... 而且有版權的問題

在這裡要介紹的Gettext他原理跟方法一類似，是透過讀取語系檔來做多國語系的，但是他的好處是他已經幫你寫好函式啦～ 而且他的語系檔格式是很流行的，所以當網友想幫你做多國語系時，就不用再特別去研究你的語系檔格式

Gettext目前在很多語言上都可以使用，例如C++、Python、Java、PHP... ，而且很多的程式都支援他，例如知名的CMS系統：WordPress就是使用Gettext做到多國語系的，只是他的作法跟本文不太一樣，WordPress是使用他們自己開發的函式來讀取Gettext的語系檔

P.S.Gettext的語系檔是.po與.mo檔～ .po是給翻譯人員看的，.mo則是給程式看的，並且要製作語系檔的話可以使用poedit這套程式，這部份等之後會在做教學

以下我就簡單教大家如何在PHP裡面使用Gettext吧
<h2>Gettext for PHP</h2>
1.先開啟你的PHP設定檔（php.ini），然後把gettext啟動

原本：【;extension=php_gettext.dll】改成【extension=php_gettext.dll】

<a href="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_223826.jpg"><img class="alignnone size-large wp-image-554" title="2011-07-18_223826" src="{{< param imageBase >}}/wp-content/uploads/2011/07/2011-07-18_223826-540x425.jpg" alt="" width="540" height="425" /></a>

P.S.把最前面的分號拿掉

2.在你的伺服器裡面建立一個資料夾取名：gettext_demo，並且在該資料夾中建立一個檔案（index.php），輸入下列內容：
<script src='http://pastie.org/2231997.js'></script>
這裡簡單解釋上面的語法
<ul>
	<li>textdomain()這個是設定你的專案名稱，這可以隨便設定，只是之後語系檔的名稱要跟這裡設定一樣</li>
	<li>bindtextdomain()是設定語系檔的存放位置，像我上面的寫法代表語系檔會存在Languages底下</li>
	<li>putenv、setlocale這兩個函式是設定「要顯示的語系」，比如我原本是用中文開發程式，然後我現在要顯示英文，則設定en_US，如果要顯示簡體則是zh_CN，格式就照範例就可以了</li>
	<li>gettext()的部份則是要作多國語系的文字，gettext函式會自動去檢查語系檔，如果語系檔裡面有文字跟gettext內帶的參數一樣的字串，則會用語系檔的字串來顯示，如果語系檔裡沒有，則直接顯示gettext內的參數，以本例來講：函式會去檢查語系檔裡面是否含有「測試gettext」跟「逐風者」兩個字串的對應文字，如果語系檔裡面有對應的文字，那gettest這個函式就會顯示語系檔內的文字，否則就直接顯示「測試gettext」跟「逐風者」</li>
	<li>至於_()則是gettext()的代稱，這是為了方便開發者而設計的，直接用底線來代表gettext，這樣寫程式時可以少打很多字</li>
</ul>
3.再來請於gettext_demo資料夾底下建立一個Language資料夾，然後再Language底下建立en_US資料夾，最後再en_US底下建立LC_MESSAGES資料夾

整個路徑看起來就是：gettext_demo/Language/en_US/LC_MESSAGES

4.將語系檔放到./gettext_demo/Language/en_US/LC_MESSAGES底下

語系檔可以使用Poedit製作，或是到專案檔裡面找我做好的簡易語系檔

以本文來講是用英文的語系檔做介紹，所以放到en_US底下，可是如果改天你要做簡體的，那就改成zh_CN，也就是路徑會變成：gettext_demo/Language/zh_CN/LC_MESSAGES

還有「Language」的部份是看你bindtextdomain()的設定來決定這個資料夾，例如Languages($project_name,'lan');，則你的語系檔應該要放在lan資料夾而非Language，這些都是會變得請自行變通

最後就是我之前一直沒處理好的地方，他的語系檔的命名原則是使用你testdomain()所設定的那個名字，例如：textdomain('xxx')，則語系檔要命名成xxx.mo以及xxx.po，而且不管是哪個語言的語系檔都是這樣子命名！ 之前被WordPress影響，所以一直以為命名方法是zh_TW.po、zh_TW.mo這樣子... 後來被網友提醒才發現原來不是XD

專案檔下載：<a href="https://docs.google.com/viewer?a=v&amp;pid=explorer&amp;chrome=true&amp;srcid=0B7dzHNV9vYfOZTQ2MWZlYzEtN2RhYS00ZjYwLTllZDEtOTQ5NTNlZDVjMTFi&amp;hl=zh_TW" target="_blank">Google</a>｜<a href="http://www.4shared.com/file/HaCLICB-/gettext_demo.html " target="_blank">4Shared</a>｜<a href="http://www.box.net/shared/uk679f32278822jkak4l" target="_blank">Box.net</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/gettext_demo.zip" target="_blank">Dropbox</a>

P.S.你可以直接把專案檔裝到你的伺服器上面測試看看，記得要開始PHP的設定才能使用
