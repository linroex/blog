---
title: "如何修改SSH預設的22連接埠改走其他Port？"
date: 2011-04-16T10:56:20
slug: "change-ssh-default-port-22"
aliases: ["/posts/%e5%a6%82%e4%bd%95%e4%bf%ae%e6%94%b9ssh%e9%a0%90%e8%a8%ad%e7%9a%8422%e9%80%a3%e6%8e%a5%e5%9f%a0%e6%94%b9%e8%b5%b0%e5%85%b6%e4%bb%96port%ef%bc%9f/"]
tags: ["Linux", "VPS", "ssh", "Port"]
categories: ["Linux", "網際網路", "VPS"]
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105528.jpg"><img class="size-large wp-image-5027 aligncenter" title="2011-04-16_105528" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105528-520x437.jpg" alt="" width="520" height="437" /></a>▲▲透過SSH，可以遠端幫主機進行很多工作</p>
SSH幾乎是所有Linux系統都會內建的程式了，因為他可以讓你很方便的去連線、管理你的主機，只要連線到SSH就能對你的Server進行很多工作，但也因為這樣，SSH很有可能被人攻擊，預設的SSH Port都是22，只要別人猜到你的密碼，那你的Server就會變得很危險，因此這裡要教大家做第二層的防護，也就是修改掉預設的Port，這樣子別人在攻擊時除了要知道密碼，還必須知道你走哪個連接埠


<!--more-->
1.登入你的主機，然後進入到【/etc/ssh】資料夾

指令：cd /etc/ssh

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104321.jpg"><img class="alignnone size-large wp-image-5021" title="2011-04-16_104321" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104321-520x437.jpg" alt="" width="520" height="437" /></a>

2.開啟sshd_config這個設定擋

指令：vi sshd_config

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104506.jpg"><img class="alignnone size-large wp-image-5022" title="2011-04-16_104506" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104506-520x437.jpg" alt="" width="520" height="437" /></a>

3.應該是在蠻上面的地方，會有一行【Port 22】，把22改成其他你想使用的連接埠就可以了，需要注意的是80、20、21、25等連接埠可能有其他服務使用，要改成沒有服務使用的Port才能

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104619.jpg"><img class="alignnone size-large wp-image-5023" title="2011-04-16_104619" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104619-520x437.jpg" alt="" width="520" height="437" /></a>

將Port改好之後，記得要把該行前方的#號拿掉，不然SSH的程式讀不到這行設定

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104949.jpg"><img class="alignnone size-large wp-image-5024" title="2011-04-16_104949" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104949-520x437.jpg" alt="" width="520" height="437" /></a>

4.把【sshd_config】這個設定擋存好，然後重新啟動sshd這個服務

指令：service sshd restart

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105127.jpg"><img class="alignnone size-large wp-image-5025" title="2011-04-16_105127" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105127-520x437.jpg" alt="" width="520" height="437" /></a>

5.之後你要進行ssh連線就不能再走預設的22Port囉～ 要改走你剛剛設定的port

&nbsp;
