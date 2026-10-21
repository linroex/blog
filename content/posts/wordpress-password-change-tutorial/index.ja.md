---
title: "WordPress のアカウントとパスワードの変更手順"
date: 2009-05-17T12:40:18
slug: "wordpress-password-change-tutorial"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

前回の記事で WordPress の設置が完了しました。システムからはアカウントとパスワードが1組発行されますが、そのパスワードは覚えにくいものでした。しかもアカウント名が adm なので推測されやすく、ブログのセキュリティ上のリスクになります。そこで今回は、アカウントとパスワードの変更方法を紹介します

一、アカウントの変更

1. レンタルサーバー（仮想ホスト）の管理画面に入り、phpmyadmin をクリックします


<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121342.jpg"><img class="alignnone size-full wp-image-1048" title="2009-05-17_121342" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121342.jpg" alt="2009-05-17_121342" width="640" height="310" /></a>

<!--more-->


2. データベースの後ろに「<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;"><strong>&lt;------------ Connect to this database",</strong>」と表示されているので、クリックするとデータベース管理画面に入れます</span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;"><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121112.gif"><img class="alignnone size-full wp-image-1049" title="2009-05-17_121112" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121112.gif" alt="2009-05-17_121112" width="549" height="376" /></a></span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">3. データベース管理画面に入ったら、ページをスクロールして「</span></span>wp_users<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">」という名前のテーブルを探します<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121715.jpg"><img class="alignnone size-full wp-image-1050" title="2009-05-17_121715" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_121715.jpg" alt="2009-05-17_121715" width="640" height="40" /></a></span></span>

<span style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: x-small;"><span style="font-family: Helvetica,Arial,sans-serif; font-size: x-small;">4. </span></span>wp_users テーブルを開くと、admin という項目があります（下図）。admin の後ろにあるペンのアイコンをクリックすると変更できます

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122024.jpg"><img class="alignnone size-full wp-image-1051" title="2009-05-17_122024" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122024.jpg" alt="2009-05-17_122024" width="702" height="106" /></a>

5. user_logi 欄位の値を希望するアカウント名に変更し、「執行」（実行）を押します

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122806.jpg"><img class="alignnone size-full wp-image-1053" title="2009-05-17_122806" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_122806.jpg" alt="2009-05-17_122806" width="640" height="461" /></a>


<!--more-->
二、パスワードの変更

次に紹介するパスワードの変更は、先ほどの方法ほど面倒ではありません。データベースに入る必要はなく、管理画面から変更できます。そこで、まず管理画面にログインしてください

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123050.jpg"><img class="alignnone size-full wp-image-1054" title="2009-05-17_123050" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123050.jpg" alt="2009-05-17_123050" width="640" height="461" /></a><a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123141.jpg"><img class="alignnone size-full wp-image-1055" title="2009-05-17_123141" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123141.jpg" alt="2009-05-17_123141" width="460" height="383" /></a>

管理画面に入ったら、「帳號」（アカウント）→「個人資訊」（プロフィール）をクリックします

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_1234411.jpg"><img class="alignnone size-full wp-image-1057" title="2009-05-17_1234411" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_1234411.jpg" alt="2009-05-17_1234411" width="173" height="511" /></a>

次に、画面を下にスクロールすると「新密碼」（新しいパスワード）の欄があります。希望するパスワードを入力して、「更新個人資訊」（プロフィールを更新）を押せば完了です

<a href="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123616.jpg"><img class="alignnone size-full wp-image-1058" title="2009-05-17_123616" src="{{< param imageBase >}}/wp-content/uploads/2009/05/2009-05-17_123616.jpg" alt="2009-05-17_123616" width="827" height="194" /></a>
