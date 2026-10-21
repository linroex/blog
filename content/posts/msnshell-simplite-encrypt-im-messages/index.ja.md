---
title: "MSNShell と SimpLite-Yahoo でインスタントメッセージを暗号化し、管理者による盗聴を防ぐ"
date: 2010-01-22T19:26:07
slug: "msnshell-simplite-encrypt-im-messages"
tags: ["Instant Messaging", "Encryption"]
categories: ["Security"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_194640.png"><img class="alignnone size-large wp-image-2525" title="2010-01-22_194640" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_194640-375x400.png" alt="" width="375" height="400" /></a>

昨日、新聞を読んでいたら、104 人力銀行の管理職が<a href="http://tw.news.yahoo.com/article/url/d/a/100119/11/1z1hm.html">従業員のインスタントメッセージを監視していた</a>という記事が目に入りました。これについてはコメントを控えます。大人の事情ですからね。会社の立場からすれば、従業員による情報漏えいを防ぐための措置をとるのは当然ですし、会社も従業員に対して、インスタントメッセージソフトを監視することを伝えていました。ただ、従業員の立場からすれば、きっと不愉快でしょう。誰だって見張られるのは嫌ですからね。話が少しそれてしまいました～ とにかくこの記事では、<strong>MSNShell</strong> と <strong>SimpLite-Yahoo</strong> という2つのプログラムの使い方を紹介します。

<strong>
<!--more-->

</strong>

<strong>MSNShell</strong> と <strong>SimpLite-Yahoo</strong> は、<span style="color: #ff0000;"><strong>一方は MSN のメッセージを、もう一方は Yahoo のインスタントメッセージを暗号化するためのプログラムです</strong></span>。SimpLite にも MSN 向けの暗号化版がリリースされていますが、<strong>MSNShell</strong> には中国語のインターフェースがあるため、MSN の部分では MSNShell を使って説明します。MSNShell と SimpLite-Yahoo の仕組みはそれほど難しくありません。インスタントメッセージを送信するときに、相手に送る前に暗号化する、というものです。そのため、ネットワーク管理者がたとえ傍受しても、見えるのは意味のない文字の羅列だけです。ただし、MSNShell と <strong>SimpLite-Yahoo</strong> を使ううえで不便な点が1つあります。<span style="color: #ff0000;"><strong>送信側（自分）だけでなく、受信側（相手）もプログラムをインストールしなければならない</strong></span>ことです。そうしないと、相手に送ったメッセージは暗号化されません。
<blockquote><strong>補足：MSNShell には、単純な暗号化以外にも、面白い機能がたくさんあります。時間があるときに紹介するつもりですが、気になる方はぜひ</strong><a href="http://my.msnshell.com/"><strong>公式サイト</strong></a><strong>を見てみてください。また、メッセージを暗号化したい場合は、必ず両方のパソコンに暗号化プログラムをインストールしておくことを忘れないでください。たとえば、パソコン A からパソコン B にデータを送る場合は、A と B の両方に暗号化プログラムをインストールしておく必要があります。</strong></blockquote>
<h3>MSNShell の情報</h3>
<ul>
	<li>主な機能：MSN の通信内容を暗号化し、悪意のあるプログラムやネットワーク管理者による監視を防ぐ</li>
	<li>公式サイト：<a href="http://my.msnshell.com/">http://my.msnshell.com/</a></li>
	<li>ダウンロードリンク：<a href="http://dl.msnshell.net/Install-MSNShell-5.4.12.15.exe">公式ダウンロード</a>｜Xun6 | <a href="http://www.4shared.com/file/225743738/308754ae/Install-MSNShell-541221.html ">4Shared</a> | <a href="http://www.box.net/shared/id12z85y39">Box.net</a></li>
	<li>ウイルススキャンレポート：<a href="http://www.virustotal.com/analisis/c464f187c9a7af98eb7b75d352baffe2c0275a0f38b18ecace47416a381fc27a-1263915305">VirusTotal</a></li>
	<li>MD5：9ff0682054070ece83a934bec3d493fa</li>
</ul>
<h3>SimpLite-Yahoo の情報</h3>
<ul>
	<li>主な機能：インスタントメッセージの内容を暗号化し、悪意のあるプログラムやネットワーク管理者による監視を防ぐ</li>
	<li>公式サイト：<a href="http://goo.gl/SO63">http://goo.gl/SO63</a></li>
	<li>ダウンロードリンク：<a href="http://www.secway.fr/us/products/simplite_yahoo/getsimp.php">公式ダウンロード</a>｜Xun6 | <a href="http://www.4shared.com/file/225758707/6174b44d/SimpLite-Yahoo-2_2_17-en.html">4Shared</a> | <a href="http://www.box.net/shared/eyp2yjns01">Box.net</a></li>
	<li>ウイルススキャンレポート：<a href="http://www.virustotal.com/analisis/8ffc454dc529552570fb8065c54ae05b394ca094290b9c42867cf036b520d396-1262000460">VirusTotal</a></li>
	<li>MD5：c9d3007f4d74490b5ce11ec4567651e1</li>
	<li>インターフェースの言語：英語</li>
</ul>
<h3>MSNShell のインストールと使い方：</h3>
1. MSNShell のインストーラーをダウンロードしたら、ダブルクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234237.png"><img class="size-large wp-image-2482 alignnone" title="2010-01-19_234237" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234237-500x303.png" alt="" width="500" height="303" /></a>

2. セキュリティの警告が表示されたら、そのまま【実行】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234621.png"><img class="size-full wp-image-2484 alignnone" title="2010-01-19_234621" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234621.png" alt="" width="414" height="288" /></a>

3. 【正體中文（繁体字中国語）】を選び、【次へ】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234837.png"><img class="size-full wp-image-2485 alignnone" title="2010-01-19_234837" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_234837.png" alt="" width="455" height="344" /></a>

4. 【已閱讀……（読みました）】を選び、【次へ】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235024.png"><img class="alignnone size-full wp-image-2486" title="2010-01-19_235024" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235024.png" alt="" width="455" height="344" /></a>

5. 次にプログラムからいくつかの注意事項が表示されますが、重要なことはなさそうなので、そのまま【次へ】を押しました。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235151.png"><img class="alignnone size-full wp-image-2487" title="2010-01-19_235151" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235151.png" alt="" width="455" height="344" /></a>

6. インストール先を設定します。ハードディスクの容量について特に計画がなければ、初期値のままで大丈夫です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_2353151.png"><img class="alignnone size-full wp-image-2489" title="2010-01-19_235315" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_2353151.png" alt="" width="469" height="358" /></a>

7. インストールを開始します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235343.png"><img class="alignnone size-full wp-image-2490" title="2010-01-19_235343" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235343.png" alt="" width="455" height="344" /></a>

8. インストールが終わると、MSNShell は絵文字などほかの設定をするかどうか聞いてきます。必要に応じて設定してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235615.png"><img class="alignnone size-full wp-image-2491" title="2010-01-19_235615" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-19_235615.png" alt="" width="455" height="344" /></a>

9. 次に、MSN のメインプログラムを開いてサインインし、上部のツールバーで【Shell】→【設定】を選びます。（ウィンドウを最大化すると、Shell のボタンが表示されます。）

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220046.png"><img class="alignnone size-large wp-image-2493" title="2010-01-20_220046" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220046-334x400.png" alt="" width="334" height="400" /></a>

10. 【チャットの暗号化】を選び、【チャット暗号化を有効にする】にチェックを入れてから【OK】を押せば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220354.png"><img class="alignnone size-large wp-image-2494" title="2010-01-20_220354" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220354-375x400.png" alt="" width="375" height="400" /></a>
<!--nextpage-->
<h3>SimpLite-Yahoo のインストールと使い方：</h3>
1. SimpLite-Yahoo のインストーラーを開きます（セキュリティの警告が出たら、そのまま【実行】を押してください）。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220628.png"><img class="alignnone size-large wp-image-2495" title="2010-01-20_220628" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220628-500x303.png" alt="" width="500" height="303" /></a>

2. 【NEXT＞】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220736.png"><img class="alignnone size-large wp-image-2496" title="2010-01-20_220736" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220736-493x400.png" alt="" width="493" height="400" /></a>

3. 【I Agree】を選び、【Next＞】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220910.png"><img class="alignnone size-large wp-image-2497" title="2010-01-20_220910" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_220910-493x400.png" alt="" width="493" height="400" /></a>

4. SimpLite-Yahoo を誰が使えるようにするかを設定します。「Just me」か「every one」を選べます。違いは、「Just me」を選ぶと、プログラムをインストールした Windows アカウントだけがこのプログラムを開けるのに対し、「every one」を選ぶと、このパソコンのすべてのユーザーが使えるようになる点です。インストール先も設定できます。設定が済んだら【NEXT＞】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221303.png"><img class="alignnone size-large wp-image-2498" title="2010-01-20_221303" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221303-493x400.png" alt="" width="493" height="400" /></a>

5. 【NEXT＞】を押すと、インストールが始まります。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221338.png"><img class="alignnone size-large wp-image-2499" title="2010-01-20_221338" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221338-493x400.png" alt="" width="493" height="400" /></a>

6. インストールが完了したら、続く3つの手順はすべて【NEXT】を押すだけです。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221723.png"><img class="alignnone size-large wp-image-2501" title="2010-01-20_221723" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221723-493x400.png" alt="" width="493" height="400" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221827.png"><img class="alignnone size-large wp-image-2503" title="2010-01-20_221827" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221827-493x400.png" alt="" width="493" height="400" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221912.png"><img class="alignnone size-large wp-image-2502" title="2010-01-20_221912" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_221912-493x400.png" alt="" width="493" height="400" /></a>

7. 最後に【Close】を押せば完了です。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222020.png"><img class="alignnone size-large wp-image-2504" title="2010-01-20_222020" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222020-493x400.png" alt="" width="493" height="400" /></a>

8. Close を押すと、SimpLite-Yahoo のウィンドウが開きます。そのまま【Next】を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222230.png"><img class="alignnone size-large wp-image-2505" title="2010-01-20_222230" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-20_222230-500x330.png" alt="" width="500" height="330" /></a>

9. 暗号化されていないメッセージが送られてきたときに通知するかどうかの設定です。初期値のままにしておくことをおすすめします。そのうえで【Next】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180549.png"><img class="alignnone size-large wp-image-2507" title="2010-01-22_180549" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180549-500x330.png" alt="" width="500" height="330" /></a>

10. Yahoo インスタントメッセンジャーの接続方法を設定します。わからない場合は【I don't know】を選ぶと、SimpLite-Yahoo が自動で設定してくれるので、【Next】を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180813.png"><img class="alignnone size-large wp-image-2508" title="2010-01-22_180813" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_180813-500x330.png" alt="" width="500" height="330" /></a>

11. お使いのインスタントメッセンジャーのバージョンを設定します。バージョン 7〜9 の場合は選択肢 A を選んでください（下の画像を参照）。バージョンが 7 より前の場合は選択肢 B を選びます。選んだら【完了】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_181338.png"><img class="alignnone size-large wp-image-2509" title="2010-01-22_181338" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_181338-500x330.png" alt="" width="500" height="330" /></a>
<!--nextpage-->
12. 続いて、別のウィンドウが開きます。そのまま【Next】を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185155.png"><img class="alignnone size-full wp-image-2510" title="2010-01-22_185155" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185155.png" alt="" width="492" height="345" /></a>

13. 次に、使用する暗号化方式を設定します。設定方法は下の画像を参照してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185507.png"><img class="alignnone size-full wp-image-2511" title="2010-01-22_185507" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185507.png" alt="" width="492" height="345" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185507.png"></a>14. 次に、暗号化のパスワードを設定します。パスワードが単純すぎると、システムが別のパスワードを設定するよう求めてきます。再設定したくない場合は【はい】を押してください（図 A を参照）。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185834.png"><img class="alignnone size-full wp-image-2512" title="2010-01-22_185834" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185834.png" alt="" width="416" height="166" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_185834.png"></a><img class="alignnone size-full wp-image-2513" title="2010-01-22_190003" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190003.png" alt="" width="492" height="345" />

15. マウスを適当に動かしてください。プログラムがマウスの動きを利用して鍵を生成します。完了したら【Next】を押します。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190124.png"><img class="alignnone size-full wp-image-2514" title="2010-01-22_190124" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190124.png" alt="" width="492" height="345" /></a>

16. プログラムがもう一つの処理を実行します。終わったら、やはり【Next】を押してください。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190346.png"><img class="alignnone size-full wp-image-2515" title="2010-01-22_190346" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190346.png" alt="" width="492" height="345" /></a>

17. ようやく完了しました。ありがたや～

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190441.png"><img class="alignnone size-full wp-image-2516" title="2010-01-22_190441" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190441.png" alt="" width="492" height="345" /></a>

18. 今後、パソコンを起動するたびに、システムトレイの右下に小さな赤いアイコンが表示されます。これが表示されていれば、正常に起動しています。表示されない場合は、【スタート → プログラム → Secway → Simp Lite for Yahoo! → SimpLite for Yahoo!.exe】から起動できます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190807.png"><img class="alignnone size-full wp-image-2517" title="2010-01-22_190807" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_190807.png" alt="" width="410" height="206" /></a>
<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_191206.png"><img class="alignnone size-large wp-image-2518" title="2010-01-22_191206" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-22_191206-298x400.png" alt="" width="298" height="400" /></a>

19. パソコンを起動すると、パスワードの入力を求めるウィンドウも表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-23_130350.png"><img class="alignnone size-full wp-image-2542" title="2010-01-23_130350" src="{{< param imageBase >}}/wp-content/uploads/2010/01/2010-01-23_130350.png" alt="" width="398" height="314" /></a>

20. また、simplite-yahoo をインストールしている人から暗号化されたメッセージが届くと、システムが鍵を交換するかどうか尋ねてきます。【Accept】を選ぶと鍵が交換されます。交換が終わったら、相手にもこちらのパスワードを伝えてください。そうすれば、相手がログインするときにパスワードを入力できるようになります（前の手順で入力したパスワードです）。

<a href="{{< param imageBase >}}/wp-content/uploads/2010/01/617548902_c8d91b1a6b.jpg"><img class="alignnone size-full wp-image-2544" title="617548902_c8d91b1a6b" src="{{< param imageBase >}}/wp-content/uploads/2010/01/617548902_c8d91b1a6b.jpg" alt="" width="500" height="321" /></a>

<strong>注意：自分側で暗号化を設定するだけでは不十分です。相手側でも設定して初めて効果があります。</strong>

<strong>わからない場合は、<a href="http://spock.pixnet.net/blog/post/5202866">http://spock.pixnet.net/blog/post/5202866</a> を参照してください。</strong>
