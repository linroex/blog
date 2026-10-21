---
title: "uWSGI"
date: 2015-07-24T19:17:45
slug: "uwsgi"
tags: ["Python", "uWSGI"]
categories: ["SRE"]
draft: false
---

<h1>はじめに</h1>
uWSGI はプロトコルであり、同時にプログラムでもあります。

なぜこれほど複雑なのでしょうか。まずはプログラムの話から始めましょう。uWSGI は、もともと Python で書かれた Web アプリケーションが Nginx や Apache などの Web サーバーと通信できるようにするために作られたプログラムです。uWSGI は独自の uwsgi 通信プロトコルを採用しています。また、cgi、fastcgi、socket などほかのプロトコルにも対応しているため、Python だけでなく PHP や Go などのプログラミング言語とも連携できます。


<!--more-->
私の理解では、uWSGI はサーバーのようなもので、入口と出口があります。対応しているさまざまなプロトコルでデータを入力すると、プラグイン（python、php など）で処理されます。処理が終わると、さまざまなプロトコルでデータが出力されます。その出力データは nginx や apache に転送することも、そのまま http で出力することもできます。

uWSGI の仕組みは FastCGI とよく似ています。複数のワーカープロセスを常駐させておき、タスクが来ると、それらのプロセスに処理を任せ、処理が終わったら結果を返します。

Nginx は uWSGI をビルトインでサポートしています。
uWSGI では vhost も有効にできます。
<h1>インストール</h1>
ここでは python3 と関連ツールをインストールし、pip を使って uwsgi をインストールします。
<pre><code>$ sudo apt-get install python3 python3-pip python-dev build-essential
$ pip3 install --upgrade pip
$ pip3 install virtualenv uwsgi
</code></pre>
ネット上の記事には、apt-get で直接 uwsgi をインストールしているものもありますが、そのバージョンは古いため、pip でのインストールをおすすめします。
また、apt-get で最新版の Nginx をインストールします。
<pre><code>$ sudo apt-get install python-software-properties  
$ sudo add-apt-repository ppa:nginx/stable  
$ sudo apt-get update  
$ sudo apt-get install nginx  
</code></pre>
このようにインストールするのは、apt-get に標準で入っている nginx のバージョンが古すぎるためです。
<h1>設定</h1>
設定は大まかに Nginx 側と uWSGI 側に分かれます。その処理の流れは次の図のとおりです。

すべてのトラフィックはまず Nginx に入ります。画像、HTML、ファイルなどの静的なリクエストは Nginx が処理します。Python や PHP などの動的なリクエストは uWSGI に転送され、uWSGI で処理が終わると、その結果が Nginx に戻されます。

ここで設定する項目は次のとおりです。
1. Nginx vHost
2. uWSGI vHost and forward

また、設定は大きく2つの段階に分かれます。
1. 基本設定（Nginx、uWSGI）
2. 自動起動とサービスの設定

まずは Nginx の設定から始めましょう！

Nginx に関係する主なフォルダーは2つです：
<ul>
	<li>/etc/nginx/sites-available</li>
	<li>/etc/nginx/sites-enabled</li>
</ul>
はい、Apache の vhost の設定によく似ていますが、実際にはリンクを自分で作成する必要があります……。言い換えると、有効になるのは sites-enabled 内の設定ファイルだけです。sites-available は管理しやすくするためにあるだけです。sites-available にファイルを作成してから sites-enabled にリンクすることもできますが、私は面倒くさがりなので、sites-enabled に直接作成しています。
<pre><code>$ sudo rm /etc/nginx/sites-available/default
$ sudo rm /etc/nginx/sites-enabled/default
$ cd /etc/nginx/sites-enabled
$ sudo vi demo.conf
</code></pre>
内容はおおむね次のとおりです：
<pre><code>server {
    listen 80;
    server_name 52.68.0.97;
    charset utf-8;
    client_max_body_size 20M;

    location / {
        uwsgi_pass unix:/var/www/demo/demo.sock;
        # uwsgi_pass 127.0.0.1:8080;
        include uwsgi_params;
    }

     location /static {
          alias /var/www/demo/static;
     }
}
</code></pre>
設定ファイルは分かりやすいものです。特定のポートとドメインを待ち受けており、重要なのは uwsgi_pass の部分です。待ち受けているポートやドメインにリクエストが届くと、uwsgi_pass に設定されたものへ転送されます。設定方法は2通りあります。uWSGI が作成した sock ファイルを直接読み込む方法と、指定したポートに socket で送信する方法（そのポートで uWSGI が待ち受けます）です。

ここでは、少し複雑ですが sock ファイルの方法で設定します。

設定を保存したら、Nginx の再起動を忘れずに行ってください：
<pre><code>$ sudo service nginx restart
</code></pre>
次に、/var/www 内にデモ用の Python ウェブサイト（Flask）を作成します。ここで virtualenv を使っているのは、uWSGI がアプリケーションごとに異なる環境を読み込めるためです。そのため、ウェブサイトのプログラムは Python 2 でも Python 3 でも問題なく書けます。
<pre><code>$ sudo mkdir demo
$ sudo chown -R ubuntu:ubuntu demo
$ cd demo
$ virtualenv venv
$ source venv/bin/activate
$ pip install flask
$ vi hello_module.py
</code></pre>
hello_module.py ファイルに、最も基本的な Flask の例（Hello world）を書き込みます：
<pre><code>from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
</code></pre>
デモ用のプログラムを作成したら、まずは最もシンプルな uwsgi コマンドで、ここまでのすべての設定が正しく動くかをテストしましょう。段階的にテストすると、問題の箇所を見つけやすくなります。
<pre><code>$ uwsgi --module demo_module --callable app --http :1234 --venv /var/www/demo/venv
</code></pre>
このコマンドは demo_module.py をモジュールとして uWSGI に読み込ませます。さらに、Nginx から呼び出されるたびに、uWSGI は app というオブジェクト（callable）を探し、http プロトコルで 1234 番ポートに出力するように設定しています。最後に、必要なパッケージの場所（–venv）を指定しています。

ブラウザで http://localhost:1234 と入力すると確認できます。サーバーがリモートにある場合は、SSH プロキシでトンネルを構築してテストすることもできます（ ssh -ND 2001 remote_server ）

ここで問題が起きた場合は、uWSGI が画面に出力するメッセージを確認してください。通常はどこに問題があるかが書かれています。基本的に、この段階の問題は Nginx とは無関係です。現在の設定では uWSGI がすべてのパケットを処理しており、まだ Nginx とはつながっていないからです。

この段階でテストがうまくいったら、コマンドラインの方法で一時的に Nginx とつないでテストしてみましょう：
<pre><code>$ uwsgi --module demo_module --callable app --socket /var/www/demo/demo.sock --chown-socket www-data:www-data --venv /var/www/demo/venv
</code></pre>
このコマンドは前のものと似ていますが、次の項目が追加されています：

–socket：Nginx と通信するために使う sock ファイルを指定するパラメーターです。
– chown-socket：生成される sock ファイルの権限を設定します。Nginx のユーザー名である www-data に設定しています。

前の設定で Nginx と socket を使って通信している場合は、「–socket」を 127.0.0.1:8080 に設定でき、その場合は chown-socket を設定する必要はありません。

続けてブラウザを開き、http://localhost:80 にアクセスしてテストします（Nginx で設定したポートです）。Hello World が表示されるはずです。表示されない場合は、/var/log/nginx のログでエラーを確認してください。先ほど uWSGI は正常に動くことを確認済みなので、この問題は Python や uWSGI とは無関係だと判断できます。

ここまでうまくいったら、おめでとうございます。先ほどの長いパラメーターの並びを設定ファイルに変換しましょう。uWSGI は ini、xml、json などの複数の設定ファイル形式に対応しています。ここでは ini を例に使います：
<pre><code>$ vi demo.config.ini
</code></pre>
次の内容を書き込みます：
<pre><code>[uwsgi]
chdir = /var/www/demo
module = demo_module
callable =  app
venv = /var/www/demo/venv
socket = /var/www/demo/demo.sock
chown-socket = www-data:www-data
</code></pre>
次にこのコマンドを実行します。ブラウザで Hello World が表示されれば、おめでとうございます、完成です！ あとは uWSGI をデーモンとして実行するだけです！
<pre><code>$ sudo uwsgi --ini demo.config.ini
</code></pre>
ここで一息ついて、お茶でも飲みましょう。次は uwsgi を起動時に自動起動するように設定します。方法はいくつもあります。たとえば、スクリプトを書いて Upstart サービスにする方法があります。この方法の利点は、簡単に起動や停止ができることです。また、多数のアプリを起動する場合（Heroku のような環境）は、uWSGI Emperor を使って管理することもできます。ここでは Upstart サービスを例に説明します：
<pre><code>$ sudo vi /etc/init/uwsgi.conf
</code></pre>
内容は次のとおりです：
<pre><code>description "uWSGI instance to serve myapp"

start on runlevel [2345]
stop on runlevel [!2345]

script
    cd /var/www/demo
    source venv/bin/activate
    exec /usr/local/bin/uwsgi --ini demo.config.ini
end script
</code></pre>
保存したら、サービスとして起動できます：
<pre><code>$ sudo service uwsgi start
</code></pre>
<h1>More config</h1>
ここでは設定に関する補足をいくつか紹介します。

参考：<a href="http://uwsgi-docs.readthedocs.org/en/latest/Options.html">公式オプションページ</a>
参考：<a href="http://www.cnblogs.com/zhouej/archive/2012/03/25/2379646.html">非公式の中国語版設定翻訳</a>
<h2>おすすめ</h2>
マスタープロセスとして設定

master = true

ワーカープロセス数を設定

processes = 4

各プロセスの物理メモリ使用量が上限を超えたら、そのプロセスを再起動

reload-on-rss = 80

各プロセスの仮想メモリ使用量が上限を超えたら、そのプロセスを再起動

reload-on-as = 80

各プロセスの仮想メモリ使用量の上限を制限

limit-as = 120

uwsgi を終了するとき、生成した sock ファイルも一緒に削除

vacuum = true

uWSGI が生成するログにメモリ使用量のフィールドを追加

memory-report = true

vhost を有効にして、1つのプロセスで複数のサイトを実行

vhost = true

ログファイルを指定した場所に置く

logto = /var/log/uwsgi/pada.log

変更があったら自動で再読み込みし、サービスを手動で再起動する必要をなくします。後に設定する秒数は、プロセスが作業中の場合に最大 N 秒待ってから強制終了することを意味します。

reload-mercy = 8
<h1>簡単なパフォーマンス最適化</h1>
先ほど触れた reload-on-rss や processes などの設定は、うまく設定すればパフォーマンスが向上しますが、うまく設定しないと問題が起きます。ここでは設定方法を簡単に説明します。

理論上は、processes の数字が大きいほど処理速度は速くなります。
理論上は、reload-on-rss の数字が小さいほど処理速度は遅くなります。

ただし、これらはあくまで理論です。実際の数字は、uWSGI 上で動かすプログラムがどのくらいのメモリを使うか、そして機器にどれだけ空きメモリがあるかによります。

memory-report を有効にすると、プログラムが1回の実行でどのくらいのメモリを消費するかを確認できます。その数字より少し高めの値を reload-on-rss に設定します。さらに、nginx、Linux、その他のサービスを動かした後にサーバーにどのくらいのメモリが残るかを計算します。たとえば、空きメモリが 500M あり、そこから他の用途のために確保しておく 200M を差し引くと、uwsgi に使える 300M が残ります。プログラムを1回実行するたびに 30M のメモリを消費するなら、processes は 10 に設定できます。
