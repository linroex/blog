---
title: "Googleの2段階認証を有効にして、スマートフォンでGoogleアカウントにもう一つ鍵をかけよう！"
date: 2011-08-09T13:09:12
slug: "google-two-step-verification"
tags: ["Two-Step Verification", "Google"]
categories: ["Security"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_130834.jpg"><img class="alignnone size-large wp-image-5626" title="2011-08-09_130834" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_130834-520x368.jpg" alt="" width="520" height="368" /></a>

オンラインゲームをプレイしている方なら、「通訊鎖（通信ロック）」を聞いたことがあるかもしれません。これはゲーム会社が考えた盗難防止策で、ゲームアカウントにログインする前に、ゲーム会社に登録した電話番号から指定の専用回線に電話をかけ、つながって初めてログインできる仕組みです。この方法で、多くのゲーマーがアカウントを盗まれる問題を防げます。ハッカーはIDとパスワードを簡単に盗めても、まさか携帯電話まで持っていくことはできませんからね。今日ご紹介するGoogleの2段階認証は、実はこの通信ロックにとてもよく似ています。


<!--more-->
では、Googleの2段階認証とは何でしょうか。ログインする前に、Googleのシステムが自動的に携帯電話へSMSで認証コードを送ってきて、そのコードを入力するとログインできる仕組みです。また、一部のアプリは認証コードを使ってログインできないため、その場合は「アプリ用パスワード」を使えます。ログインは一度入力するだけでよいので、このアプリ用パスワードは覚えておく必要はありません。

Googleの2段階認証には、SMS、音声通話、iOS/Androidアプリなど、複数の認証方法があります。個人的には、SMSがいちばん手軽だと思うのでおすすめです。アプリの方法はスマートフォンが必要ですが、スマートフォンを持っていない人もいるでしょう。でも携帯電話ならほとんどの人が持っていますし、いつも持ち歩いているので、認証にはぴったりです。もちろん、スマートフォンをお持ちなら、アプリで認証するほうが便利なのでおすすめです。

使い方

1. Googleアカウントにログインして、「アカウント設定」に進みます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_121427.jpg"><img class="alignnone size-large wp-image-5608" title="2011-08-09_121427" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_121427-520x304.jpg" alt="" width="520" height="304" /></a>

2. 「2段階認証プロセスの使用」の欄で「編集」を選ぶと、Googleからもう一度パスワードの入力を求められます

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_121642.jpg"><img class="alignnone size-large wp-image-5609" title="2011-08-09_121642" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_121642-520x480.jpg" alt="" width="520" height="480" /></a>

3. パスワードを入力すると、2段階認証の画面に進みます。青いボタンには「設定兩步」（「驗證」の字が抜けている）と書かれていて、きっと打ち忘れたのでしょう…XD

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_121930.jpg"><img class="alignnone size-large wp-image-5610" title="2011-08-09_121930" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_121930-520x368.jpg" alt="" width="520" height="368" /></a>

4. ここでは、どの認証方法を使うかを設定します。この記事では「SMS（テキストメッセージ）または音声通話」を使って説明します。

「SMS（テキストメッセージ）または音声通話」を選んだら、携帯電話番号を入力し、「SMS」を選んで認証コードを送信します。もちろん「音声」を選ぶこともできますが、電話を取り逃がすことがあるので、私はSMSをおすすめします～ ただ、家庭用の固定電話は入力しないことを強くおすすめします。固定電話ではSMSを受信できませんし、外出中はGoogleアカウントにログインできなくなってしまいますから……

音声の場合は、携帯電話に直接電話がかかってきて、認証コードを読み上げます。SMSの場合は、認証コードがSMSで届きます。

関連情報を入力すると、「次へ」を押せないことに気づくと思います。これは「テストコードを送信」をしていないためでしょう。この手順では、携帯電話で認証コードを実際に受け取れるかどうかをテストします。「テストコードを送信」をクリックして数分待つと、携帯電話に電話またはSMSが届きます。認証コードを入力すれば完了です～

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_1230411.jpg"><img class="alignnone size-large wp-image-5615" title="2011-08-09_123041" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_1230411-439x500.jpg" alt="" width="439" height="500" /></a>

5. この画面に特に意味はありません（笑）。そのまま「次へ」を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_1231591.jpg"><img class="alignnone size-large wp-image-5630" title="2011-08-09_123159" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_1231591-520x392.jpg" alt="" width="520" height="392" /></a>

6. この画面では「バックアップコード」が10個表示されます。携帯電話をなくしたときは、このコードを使ってGoogleにログインし、認証に使う電話番号を変更するか、2段階認証を解除できます。これでログインできなくなる事態を防げます。ただし、バックアップコードは一度しか使えません。何となく使うのはやめましょう。本当に必要になったときに困ってしまいます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_123538.jpg"><img class="alignnone size-large wp-image-5613" title="2011-08-09_123538" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_123538-505x500.jpg" alt="" width="505" height="500" /></a>

7. 次に、予備の電話番号を入力します。元の携帯電話をなくし、バックアップコードも忘れてしまった場合に、この予備の電話でアカウントを復旧できます。ここでは家庭用の固定電話を入力してもかまいません（固定電話の場合は必ず市外局番も入力してください）。

予備の番号はテストしなくてもかまいませんが、万が一のときに後悔しないよう、テストしておくことをおすすめします……

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124056.jpg"><img class="alignnone size-large wp-image-5616" title="2011-08-09_124056" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124056-483x500.jpg" alt="" width="483" height="500" /></a>

8. ここでは、後で「アプリ用パスワード」の設定が必要になる可能性があることが表示されます。これは、一部のアプリがまだ2段階認証のコードでログインできないためで、そのアプリ専用のパスワードが必要になるからです。アプリごとに別々のパスワードを設定できます。このパスワードは覚えなくてかまいません。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124441.jpg"><img class="alignnone size-full wp-image-5617" title="2011-08-09_124441" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124441.jpg" alt="" width="516" height="467" /></a>

9. 「2段階認証を有効にする」をクリックします。あれ……先ほどの「アプリ用パスワード」は？ 大丈夫、大丈夫。まだ作らなくていいですよ（笑）

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124638.jpg"><img class="alignnone size-large wp-image-5618" title="2011-08-09_124638" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124638-520x257.jpg" alt="" width="520" height="257" /></a>

10. 次に、2段階認証でログインする流れを実際に試してみましょう。まず、ログインする場所と画面はいつもと同じです。アカウントとパスワードを入力して「ログイン」をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124832.jpg"><img class="alignnone size-large wp-image-5619" title="2011-08-09_124832" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_124832-520x368.jpg" alt="" width="520" height="368" /></a>

11. 次に「認証コード」の画面が表示されます。数分待つと、システムから携帯電話にSMSが届きます。SMSに書かれた認証コードを入力すればログインできます。また、「今後 30 日間はこのコンピューターを認証済みとして保持する」の項目は、ネットカフェや図書館などの共用パソコンなら、チェックを入れないでください。自分のパソコンならチェックを入れてかまいません～ チェックしておくと、今後 30 日間はこのパソコンでは認証コードが不要になります（ほかのパソコンでは引き続き必要です）。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125100.jpg"><img class="alignnone size-full wp-image-5620" title="2011-08-09_125100" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125100.jpg" alt="" width="472" height="284" /></a>

12. 初めてログインすると、「アプリ用パスワード」の作成を促されます。「パスワードを作成」をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125428.jpg"><img class="alignnone size-large wp-image-5621" title="2011-08-09_125428" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125428-520x197.jpg" alt="" width="520" height="197" /></a>

上の画面が表示されない場合は、「アプリ用パスワードを管理」を直接クリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125534.jpg"><img class="alignnone size-large wp-image-5622" title="2011-08-09_125534" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125534-520x213.jpg" alt="" width="520" height="213" /></a>

13. 入力欄に名前を入力します。たとえばこのパスワードをPicasa用にするなら、「Picasa」と入力します。ここは自分がわかればなんでもかまいません。入力したら「パスワードを生成」をクリックしてください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125920.jpg"><img class="alignnone size-large wp-image-5623" title="2011-08-09_125920" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_125920-520x368.jpg" alt="" width="520" height="368" /></a>

14. 次に、ランダムなパスワードが生成されます。とても長いですが、覚えなくてかまいません。コピーして、認証したいアカウントに貼り付けてください。先ほど説明したとおり、これはPicasa用なので、Picasaのログイン画面に貼り付けます。ここで疑問に思う方もいるかもしれません。先ほど、このパスワードを誰に使うかは設定しておらず、名前を適当に入力しただけでした。これは、最初に使ったアプリにパスワードを「紐づける」仕組みだと思います。このパスワード自体は、PicasaでもGoogleトーク（GTalk）でも使えて、特定のアプリに制限されていません。<strong>ただし、このパスワードは「最初に使用した」アプリと紐づけられます</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_130300.jpg"><img class="alignnone size-large wp-image-5624" title="2011-08-09_130300" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_130300-520x217.jpg" alt="" width="520" height="217" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_130348.jpg"><img class="alignnone size-large wp-image-5625" title="2011-08-09_130348" src="{{< param imageBase >}}/wp-content/uploads/2011/08/2011-08-09_130348-465x500.jpg" alt="" width="465" height="500" /></a>

ここまでで設定は完了です。ただ、「アプリ用パスワード」の部分は一時的なものだと思います。Googleと連携しているサービスが多すぎるので、すべてのアプリを一度に認証コードに対応させるのは難しいでしょう。でも、1〜2年もすれば、すべてを認証コードだけで使えるようになるかもしれません～ その時になったら、私も2段階認証を有効にすることにします（笑）

&nbsp;
