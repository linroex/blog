---
title: "WordPress のセキュリティ設定テクニック10選"
date: 2009-11-14T22:51:54
slug: "top-10-wordpress-security-tips"
tags: ["WordPress", "Hardening"]
categories: ["Blog"]
draft: false
---

<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">「大きな木は風を招く」と言われるように、WordPress は世界で最も多く使われているブログプラットフォームのため、世界中のハッカーの標的にもなりやすいものです。WordPress のセキュリティを強化することは、すべてのブロガーがやるべきことです。WordPress 公式は定期的にセキュリティアップデートを出していますが、サイトを守れるかどうかは、最終的には自分自身にもかかっています。日本のある機関が過去にコンピューターの被害（攻撃を受けること）の原因を調べたところ、その大部分はシステム自体の問題ではなく、利用者の操作ミスによるものだったそうです。そこで今回は、中国の <a href="http://www.williamlong.info/archives/1617.html">月光博客（Moonlight Blog）</a>の記事を参考に、ご自身の WordPress が十分に安全かどうかを確認する方法を紹介します。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">
<!--more-->

</span></p>

<blockquote>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">以下の内容は <a href="http://www.williamlong.info/archives/1617.html">http://www.williamlong.info/archives/1617.html</a> からの引用です</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>1. WordPress を最新バージョンにアップグレードする</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">一般に、新しいバージョンの WordPress は古いバージョンより安全性が高くなっています。既知のさまざまなセキュリティ問題が修正されており、特にメジャーアップグレードでは、より重大な問題も解決されることがあります。</span> <span onmouseover="_tipon(this)" onmouseout="_tipoff()">（たとえば、古いバージョンの WordPress には remv.php の重大な脆弱性があり、DDoS 攻撃を受ける可能性がありました。最新の 2.7 にアップグレードすれば、この問題は解決されます）</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>2. WordPress のバージョンを隠す</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">header.php テンプレートを編集し、WordPress のバージョン情報をすべて削除します。こうすると、ハッカーがページのソースを見ても、最新版を使っているかどうかを判断できなくなります。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>3. WordPress のユーザー名を変更する</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">WordPress の管理者アカウントが「admin」という名前で管理者権限を持っていることは、ハッカーなら誰でも知っています。そのため、そのアカウントが狙われます。新しいユーザーを作成して管理者権限を与え、古い admin アカウントを削除しましょう。こうすると、ハッカーに管理者のユーザー名を推測されにくくなります。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><span style="color: #ff0000;">管理人の補足</span></span></p>

<ol>
<li><span style="color: #ff0000;">この記事も参考にしてください：<a href="https://coder.tw/?p=2222"> </a></span><span style="color: #ff0000;"><a href="https://coder.tw/?p=2222">https://coder.tw/?p=2222</a></span></li>
<li><span style="color: #ff0000;">手動で変更する場合は、wp-config.php の設定も忘れずに編集してください。</span></li>
</ol>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>4. WordPress のユーザーパスワードを変更する</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">WordPress をインストールすると、システムからランダムなパスワードがメールで届きます。これを変更してください。このパスワードは 6 文字しかないため、10 文字以上で、英字・数字・記号をできるだけ組み合わせた複雑なパスワードに変更しましょう。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>5. WordPress フォルダの一覧表示を防ぐ</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">WordPress はデフォルトで /wp-content/plugins/ 以下にプラグインをインストールします。通常、このディレクトリを直接開くとインストールされているプラグイン名がすべて表示されてしまいます。これは非常に危険で、ハッカーに既知のプラグインの脆弱性を突かれるおそれがあります。対策として、このディレクトリに空の index.html ファイルを置けば防げます。もちろん、Apache の .htaccess ファイルを編集しても同じ効果があります。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>6. wp-admin フォルダを保護する</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">特定の IP アドレスからのみ WordPress の管理画面フォルダにアクセスできるように制限することで保護できます。それ以外の IP アドレスからのアクセスには、「アクセス禁止」のメッセージを返します。ただし、ブログを管理できるのは 1〜2 か所に限られます。</span> <span onmouseover="_tipon(this)" onmouseout="_tipoff()">また、ルートディレクトリの .htaccess ファイルが置き換えられないように、wp-admin ディレクトリにも新しい .htaccess ファイルを置いてください。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>7. 検索エンジンからの保護</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">WordPress のシステムファイルの多くは検索エンジンに登録される必要がないため、robots.txt ファイルを編集して「Disallow: /wp-*」という行を追加します。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><span style="color: #ff0000;">管理人の補足：robots.txt ファイルはサイトのルートディレクトリに置かれ、検索エンジンに収録させるファイルと、させないファイルを決めるものです。</span></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>8. Login Lockdown プラグインをインストールする</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><a style="text-decoration: underline; color: #4e0a13;" href="http://goo.gl/h4ap " target="_blank">このプラグイン</a>は、ログインに失敗した IP アドレスと時刻を記録します。ある IP アドレスからのログイン失敗が一定の回数を超えると、そのアドレスからのログイン試行をシステムがブロックします。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>9. WordPress データベースのセキュリティ</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">データテーブルには、デフォルトの wp_ という接頭辞を使わないほうがよいです。また、データベースのバックアッププラグインをインストールしてください。どれだけ保護していても、データベースは定期的にバックアップすべきです。WordPress Database Backup などのプラグインを使えば、定期バックアップが可能です。</span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><span style="color: #ff0000;">管理人の補足：インストール時に wp_ を変更しなかった場合は、データベースを手動で編集するか、</span><a href="https://coder.tw/?p=2222"><span style="color: #ff0000;">Wordpress Security Scan</span></a><span style="color: #ff0000;"> を使って変更できます。</span></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><strong>10. Wordpress Security Scan プラグインをインストールする</strong></span></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()"><a href="https://coder.tw/?p=2222">このプラグイン</a>は、上記のセキュリティ推奨事項に沿って WordPress を自動的にスキャンし、既存の問題を見つけてくれます。比較的簡単に使えます。</span></p>
</blockquote>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"></p>
<p style="margin-top: 10px; margin-right: 0px; margin-bottom: 15px; margin-left: 0px; word-break: break-all; padding: 0px;"><span onmouseover="_tipon(this)" onmouseout="_tipoff()">
</span></p>
