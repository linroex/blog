---
title: "當 GitLab 誤刪資料庫，我們該如何管好 rm 指令？"
date: 2017-02-01T23:58:28
slug: "gitlab-deleted-database-rm-command"
aliases: ["/posts/%e7%95%b6-gitlab-%e8%aa%a4%e5%88%aa%e8%b3%87%e6%96%99%e5%ba%ab%ef%bc%8c%e6%88%91%e5%80%91%e8%a9%b2%e5%a6%82%e4%bd%95%e7%ae%a1%e5%a5%bd-rm-%e6%8c%87%e4%bb%a4%ef%bc%9f/"]
tags: ["Linux"]
categories: []
---

不小心把根目錄刪除這種慘劇，我們從小都當笑話聽，但可千萬別以為這只是個笑話！ 光小弟自己就看過無數朋友的電腦發生這種慘劇，而今天 GitLab （類似 Github 的服務）的工程師也親身示範了 rm -rf 指令的莫大威力...... 他們把 Production Server 的 Database 砍掉了...... 過去一直覺得這種慘劇不會發生在自己身上，但現在連 GitLab 這種有上萬人在用的服務，都因為大意而發生這種事情，也讓我研究了一下該如何避免，這邊就來聊聊我們該如何把 rm 指令管好吧！


<!--more-->


不過 GitLab 的處理方式也很有趣，竟然邊回復資料還開直播給大家看，也許是不錯的行銷技巧，但在我看來只是工程師的個性使然（笑） 想看直播的可以點擊 <a href="https://www.youtube.com/watch?v=nc0hPGerSd4&amp;feature=youtu.be">Youtube - GitLab Live Stream</a>。

老生常談的：
<ul>
 	<li>按下 Enter 鍵之前先看看你的當前目錄。</li>
 	<li>不要輕易使用 rm -rf 指令。</li>
 	<li>Linux 用戶權限要設定好，不輕易切換到 root。</li>
 	<li>資料要備份！</li>
</ul>
但即使你把以上四點謹記在心，人在江湖走，哪有不挨刀的，就算你再怎麼謹慎，也難保你家的貓不會幫你亂敲鍵盤（？）

最基本的做法，rm 指令有個 -i 參數，當你使用 rm -i 刪除檔案時，系統會再次跟你確認是否要刪除檔案，你可以像下面這樣設定 rm 的別名：
<pre># ~/.bashrc
alias rm="rm -i"</pre>
即使如此，如果你不小心輸入 rm -rf，因為是強制刪除，所以 -i 指令依舊會失效，更好的做法是使用 <a href="http://repo.or.cz/w/safe-rm.git">safe-rm</a> 指令，這個指令需要另外安裝，Mac、Linux 都可以使用，safe-rm 的用法和 rm 完全相同，唯一差別在於你可以預先設定某些路徑，當使用者要刪除這些預設的路徑時會直接被 safe-rm 阻止，個人建議把自己電腦、公司伺服器的 rm 指令都換成 safe-rm 以避免慘劇不小心發生，此外公司的網管人員也可以預先設定好禁止刪除的資料夾路徑，例如資料庫檔案儲存的位置。

Safe-rm Git： <a href="http://repo.or.cz/w/safe-rm.git">http://repo.or.cz/w/safe-rm.git</a>
<pre># Mac OS
brew install safe-rm

# Ubuntu
sudo apt-get install safe-rm</pre>
安裝完 safe-rm 後，建議將它設為 rm 的別名，畢竟你不能期待使用者都會用 safe-rm 指令來刪除檔案，不如直接設為預設。
<pre># ~/.bashrc
alias rm="safe-rm"</pre>
接著讓我們來設定哪些資料夾是不可被刪除的，一旦設定了，該資料夾就無法被 safe-rm 移除，即使加上 -f 參數亦然，如果想刪除就只能從設定檔內把該路徑移除；此外，只有指定了路徑無法被移除，但其內的檔案、資料夾依舊可以移除，換句話說當你設定根目錄無法被移除時，根目錄內的檔案、資料夾依舊可以移除。

設定檔分為兩個，若不存在可自行建立：
<pre># Global
/etc/safe-rm.conf

# User
~/.safe-rm</pre>
在設定檔內填入禁止移除的路徑，一行一筆資料，例如：
<pre>/home/karl
/etc/*
/var/log/**/*</pre>
最後別忘記要重開 Terminal 才會生效！

設定完成後，當你要移除「預設不可移除」的檔案時，就會出現如下指令

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-上午12.04.10.jpg"><img class="alignnone size-full wp-image-7359" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-02-上午12.04.10.jpg" alt="" width="739" height="585" /></a>

但須謹記 safe-rm 是作為最後一道防火線，更重要的應該是養成下指令前想三秒、不要輕易用 rm -rf 的好習慣，如果一昧的依賴 safe-rm，哪天換到一台新電腦，慘劇終究會發生的。
