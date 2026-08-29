---
title: "Code::Blocks 10.05 - 能夠媲美Dev C++的C/C++ IDE"
date: 2010-10-28T19:03:28
slug: "codeblocks-cross-platform-c-compiler-2"
aliases: ["/posts/codeblocks-10-05-%e8%83%bd%e5%a4%a0%e5%aa%b2%e7%be%8edev-c%e7%9a%84cc%e7%b7%a8%e8%ad%af%e5%99%a8%e8%b7%a8%e5%b9%b3%e5%8f%b0ubuntu%e3%80%81windows%e3%80%81mac-2/"]
tags: ["Ubuntu", "編譯器", "Mac", "C", "C++", "Dev C++"]
categories: ["軟體分享", "C/C++", "編譯器"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_182355.jpg"><img class="alignnone size-full wp-image-3910" title="2010-10-28_182355" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_182355.jpg" alt="" width="440" height="217" /></a></p>
<p>相信大家都知道Dev C++這套編譯器吧？ 因為很多的學校在教C語言時都是以這套編譯器做平台來教學的,例如高中的前三志願電腦課用的好像就是他,不過在這裡我們要跟各位介紹的不是Dev C++,而是<strong><a href="http://www.codeblocks.org/">Code::Blocks</a></strong>,Code::Blocks跟Dev C++同樣都是C語言(c和c++)的編譯器,不過如果你有在注意Dev C++的版本的話你可能會發現他已經好久沒有更新了,而<strong><a href="http://www.codeblocks.org/">Code::Blocks</a></strong>這套編譯器不但和Dev C++一樣是免費、開源,也支援Windows與Linux的多作業系統,所以想再Ubuntu裡面寫C程式的話可以試試看這套軟體</p>
<p>此教學為Windows用教學</p>
<p>
<!--more-->
</p>
<p>個人測試過Code::Blocks的感想是蠻不錯用的,Dev C++有的功能Code::Blocks也都有,不過有一點讓我不太高興就是Code::Blocks沒有繁體中文語系,會讓使用的門檻提高,雖然說會寫程式的人大多數英文都很好(小弟是個例外XD),但是使用中文的軟體畢竟比較習慣的說,另外他有一個特色就是說你可以指定要用來編譯程式碼的編譯器,不一定要用它的編譯器,像你現在用Code::Blocks撰寫程式碼,可是你想要使用VC++來編譯程式的話可以直接在他裡面設定</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_182239.jpg"><img class="alignnone size-large wp-image-3909" title="2010-10-28_182239" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_182239-520x390.jpg" alt="" width="520" height="390" /></a></p>
<p><strong>Code::Blocks資訊</strong></p>
<ul>
<li>官方網站：<a href="http://www.codeblocks.org/">http://www.codeblocks.org/</a></li>
<li>支援語系：英文...</li>
<li>下載頁面：<a href="http://www.codeblocks.org/downloads/26">http://www.codeblocks.org/downloads/26</a></li>
<li><a href="http://www.codeblocks.org/downloads/26"></a>支援作業系統：Linux、Windows（2000～7）、Mac</li>
</ul>
<h2>Code::Blocks特色</h2>
<ul>
<li>支援三種作業系統</li>
<li>可以使用Plugin</li>
<li>持續更新中(不像Dev C++)</li>
</ul>
<h2>Code::Blocks安裝教學</h2>
<p><span style="color: #ff0000;">本篇文章僅以Windows做介紹</span></p>
<p>1.先到<a href="http://www.codeblocks.org/downloads/26">Code::Blocks官網</a>下載他的主程式,然後執行安裝檔</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_182821.jpg"><img class="alignnone size-large wp-image-3911" title="2010-10-28_182821" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_182821-520x282.jpg" alt="" width="520" height="282" /></a></p>
<p>2.按一下【Next】</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183608.jpg"><img class="alignnone size-full wp-image-3912" title="2010-10-28_183608" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183608.jpg" alt="" width="503" height="393" /></a></p>
<p>3.按一下【I Agree】</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183650.jpg"><img class="alignnone size-full wp-image-3914" title="2010-10-28_183650" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183650.jpg" alt="" width="503" height="393" /></a></p>
<p>4.按一下【Next】</p>
<p><img class="alignnone size-full wp-image-3913" title="2010-10-28_183701" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183701.jpg" alt="" width="503" height="393" /></p>
<p>5.按一下【Install】就會開始安裝了</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183837.jpg"><img class="alignnone size-full wp-image-3915" title="2010-10-28_183837" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_183837.jpg" alt="" width="503" height="393" /></a></p>
<h2>Code::Blocks使用教學-新增Console專案</h2>
<p>在這篇使用教學,我只會簡單的講一下一般初學者最常用到的東西,也就是主控台應用程式,畢竟Code::Blocks的功能太多不可能一一介紹,不過其實Code::Blocks可以開發的程式很多種,在他內建的Project裡面除了有Console以外,還有Code::Blocks Plugins、Directx、ARM Project.....等各種範本可以使用,大家程度夠的話在自己去玩看看吧</p>
<p>1.開啟Code::Blocks主程式,依序點選【File】→【New】→【Project】</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_184650.jpg"><img class="alignnone size-large wp-image-3916" title="2010-10-28_184650" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_184650-456x500.jpg" alt="" width="456" height="500" /></a></p>
<p>2.在左邊那裏選擇【Projects】,然後選擇【Console Application】在按【Go】</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_184857.jpg"><img class="alignnone size-large wp-image-3917" title="2010-10-28_184857" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_184857-520x389.jpg" alt="" width="520" height="389" /></a></p>
<p>3.這裡是選擇你要使用C還是C++來開發程式,選擇完之後按【Next】</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_184939.jpg"><img class="alignnone size-large wp-image-3918" title="2010-10-28_184939" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_184939-520x422.jpg" alt="" width="520" height="422" /></a></p>
<p>4.設定該專案的存放位置,專案名稱的資訊</p>
<p>『Project Title』是專案名稱</p>
<p>『Folder to create project in』是專案儲存位置</p>
<p>至於下面兩項則不用設定</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_185209.jpg"><img class="alignnone size-large wp-image-3919" title="2010-10-28_185209" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_185209-520x422.jpg" alt="" width="520" height="422" /></a></p>
<p>5.設定編譯相關資訊,建議維持預設值即可,設定完之後按【Finish】</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_185529.jpg"><img class="alignnone size-large wp-image-3920" title="2010-10-28_185529" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_185529-520x422.jpg" alt="" width="520" height="422" /></a></p>
<p>6.按下Finish之後你可能會疑惑為什麼沒看到東西出現,別著急,從主程式的左邊專案總館那裡可以開啟你剛剛新增的專案,然後按鍵盤的【F9】就可以編譯程式囉</p>
<p><a href="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_185848.jpg"><img class="alignnone size-large wp-image-3921" title="2010-10-28_185848" src="{{< param imageBase >}}/wp-content/uploads/2010/10/2010-10-28_185848-520x390.jpg" alt="" width="520" height="390" /></a></p>
