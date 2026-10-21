---
title: "SSH のデフォルトポート 22 を別のポートに変更する方法は？"
date: 2011-04-16T10:56:20
slug: "change-ssh-default-port-22"
tags: ["SSH", "VPS"]
categories: ["SRE"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105528.jpg"><img class="size-large wp-image-5027 aligncenter" title="2011-04-16_105528" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105528-520x437.jpg" alt="" width="520" height="437" /></a>▲▲SSH を使えば、リモートからホストに対して多くの作業ができます</p>
SSH はほぼすべての Linux システムに標準で入っているプログラムです。ホストへの接続や管理が簡単にできるため、SSH で接続すればサーバーに対して多くの作業を行えます。しかしそのぶん、SSH は攻撃の標的にもなりやすいという問題があります。SSH のデフォルトポートは 22 なので、パスワードを推測されてしまうと、サーバーは非常に危険な状態になります。そこでこの記事では、もう一段階の防御として、デフォルトのポートを変更する方法を紹介します。こうしておけば、攻撃者はパスワードを知るだけでなく、どのポートを使っているかも知る必要が出てきます。


<!--more-->
1.ホストにログインして、【/etc/ssh】フォルダに移動します

コマンド：cd /etc/ssh

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104321.jpg"><img class="alignnone size-large wp-image-5021" title="2011-04-16_104321" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104321-520x437.jpg" alt="" width="520" height="437" /></a>

2.【sshd_config】という設定ファイルを開きます

コマンド：vi sshd_config

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104506.jpg"><img class="alignnone size-large wp-image-5022" title="2011-04-16_104506" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104506-520x437.jpg" alt="" width="520" height="437" /></a>

3.ファイルの上のほうに【Port 22】という行があるはずです。22 を使いたいポート番号に変更してください。ただし、80、20、21、25 などのポートはほかのサービスで使われている可能性があるため、どのサービスも使っていないポートを選ぶ必要があります。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104619.jpg"><img class="alignnone size-large wp-image-5023" title="2011-04-16_104619" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104619-520x437.jpg" alt="" width="520" height="437" /></a>

ポートを変更したら、その行の先頭にある # を忘れずに削除してください。削除しないと、SSH のプログラムがこの設定を読み込めません。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104949.jpg"><img class="alignnone size-large wp-image-5024" title="2011-04-16_104949" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_104949-520x437.jpg" alt="" width="520" height="437" /></a>

4.【sshd_config】の設定ファイルを保存して、sshd サービスを再起動します

コマンド：service sshd restart

<a href="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105127.jpg"><img class="alignnone size-large wp-image-5025" title="2011-04-16_105127" src="{{< param imageBase >}}/wp-content/uploads/2011/04/2011-04-16_105127-520x437.jpg" alt="" width="520" height="437" /></a>

5.これ以降、SSH 接続にデフォルトの 22 番ポートは使えなくなります。先ほど設定したポートを使って接続してください。

&nbsp;
