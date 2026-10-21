---
title: "【Linux】ユーザーのパスワードを変更する方法（iOS の SSH パスワード変更にも対応）"
date: 2011-03-18T15:59:06
slug: "linux-change-user-password"
tags: ["Linux", "SSH"]
categories: ["SRE"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_160128.jpg"><img class="size-large wp-image-4913 aligncenter" title="2011-03-18_160128" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_160128-520x395.jpg" alt="" width="520" height="395" /></a>

Linux システムでは、セキュリティのためにすべてのアカウントにパスワードを設定する必要があります。ユーザーは正しいパスワードを入力しなければシステムにログインできません。この記事では、Linux 系のホストや VPS を管理しているときに、アカウントのパスワードを変更する方法を説明します。この方法は、脱獄（JB）した iPad や iPhone など、iOS を使っている端末にも応用できます。iOS の初期パスワードは「alpine」です。これを変更せず、iOS 端末が脱獄されていると、攻撃されてしまうおそれがあります。
<h2>
<!--more-->
Linux ユーザーのパスワードを変更する:</h2>
1.Linux ホストに接続し、パスワードを変更したいユーザーに切り替えます。たとえば root のパスワードを変更したい場合は、まず root アカウントでログインする必要があります。

iOS 端末の場合は、パスワードを変更するために、まず root アカウントでログインしてください。初期パスワードは alpine です。そのうえで、以下の手順に従って変更してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_154627.jpg"><img class="alignnone size-large wp-image-4907" title="2011-03-18_154627" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_154627-520x337.jpg" alt="" width="520" height="337" /></a>

2.passwd と入力し、新しいパスワードを入力して Enter キーを押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155428.jpg"><img class="alignnone size-large wp-image-4908" title="2011-03-18_155428" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155428-520x337.jpg" alt="" width="520" height="337" /></a>

3.もう一度パスワードを入力し、Enter キーを押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155556.jpg"><img class="alignnone size-large wp-image-4909" title="2011-03-18_155556" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155556-520x337.jpg" alt="" width="520" height="337" /></a>

4.次のようなメッセージが表示されたら、パスワードの変更は成功です。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155625.jpg"><img class="alignnone size-large wp-image-4910" title="2011-03-18_155625" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-18_155625-520x337.jpg" alt="" width="520" height="337" /></a>
