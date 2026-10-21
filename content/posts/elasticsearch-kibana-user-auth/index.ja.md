---
title: "Elasticsearch・Kibana のユーザー認証の設定"
date: 2017-01-15T10:00:51
slug: "elasticsearch-kibana-user-auth"
tags: ["Elasticsearch", "Kibana"]
categories: ["SRE"]
draft: false
---

Elasticsearch と Kibana をインストールすると、すぐに大きな問題に気づきます。「あれ、アカウントとパスワードはどこ？」そうなんです。Elasticsearch と Kibana には、一般的なユーザー管理の仕組みが用意されていません。バインドする IP やポートで、内部ネットワークからだけ使えるように制限するしかありません。ただ、私の会社のように固定 IP がない場合や、複数のアカウントを設定したい場合もあるでしょう。そこでこの記事では、HTTP Auth を使って Elasticsearch と Kibana の基本的なユーザー認証を設定する方法を紹介します。


<!--more-->


もちろん、X-Pack を使ってアクセス権限を管理することもできます。これは公式が提供しているプラグインで、Elasticsearch と Kibana それぞれでユーザーごとの権限を細かく設定できます。ただ、一つ問題があります。X-Pack は有料なのです。私も最初は X-Pack を使っていましたが、30 日後に Kibana へのログインが禁止されて、初めて有料だと気づきました。最初から X-Pack を入れてしまった場合は、「<a href="https://coder.tw/?p=7238">WTF Elastic X-Pack License - How to uninstall X-Pack</a>」の記事を参考に、先にアンインストールしてください。そうしないと、Kibana に一切ログインできなくなります。

私の要件では、Kibana と Elasticsearch をインターネットと通信させる必要があったため、内部ネットワークや特定のネットワークセグメントに閉じ込めることはできませんでした。Kibana と Elasticsearch が内部ネットワークだけで使われ、複雑な権限管理やログインの記録が不要であれば、VPC を使って一つのネットワークセグメントにまとめる方法も検討できます。

構成としては、Nginx を出入口にします。すべてのリクエストはまず Nginx に届き、Nginx が Elasticsearch（または Kibana）へ転送します。Elasticsearch と Kibana は 127.0.0.1 だけで待ち受けるように設定します。Nginx 側で HTTP Basic 認証を設定して認証を行います。この方法の利点は、Elasticsearch の API 自体が HTTP Auth に対応しているため、アプリケーションのコードを変更する必要がないことです。

<a href="{{< param imageBase >}}/wp-content/uploads/2017/01/Window_和_email_backer-founder_com.png"><img class="alignnone size-full wp-image-7236" src="{{< param imageBase >}}/wp-content/uploads/2017/01/Window_和_email_backer-founder_com.png" alt="" width="401" height="242" /></a>

さらに発展させることもできます。ユーザーのログイン状況を記録したい場合や、アカウントとパスワードをデータベースと直接連携させたい場合は、Nginx 上で Lua を使ってプログラムを書くこともできます。詳しくは <a href="https://github.com/openresty/lua-nginx-module#readme">lua-nginx-module</a> を参照してください。
<h2>作業開始</h2>
まず、Elasticsearch を localhost だけで待ち受けるように設定します。/etc/elasticsearch/elasticsearch.yml を開き、次のパラメーターを探してください。新しく追加するのではなく、既存の行を探します。だいたい 55 行目あたりにあるので、コメントを外してください。
<pre>#/etc/elasticsearch/elasticsearch.yml

network.host: 127.0.0.1
http.port: 9200</pre>
Kibana も同様に、localhost だけで待ち受けるように設定します。
<pre>#/etc/kibana/kibana.yml

server.port: 5601
server.host: "127.0.0.1"</pre>
設定が終わったら、Kibana と Elasticsearch を再起動して反映させてください。外部ネットワークから本当に接続できないかも確認しておきましょう。
<pre>service elasticsearch restart
service kibana restart</pre>
外部からの入口として Nginx を使うので、Nginx をインストールします。
<pre>sudo apt-get install nginx</pre>
次に、/etc/nginx/sites-enabled の default の内容を、次の内容に書き換えます。
<pre>#/etc/nginx/sites-enabled/default

server {
 listen 80;

 auth_basic "Kibana Auth";
 auth_basic_user_file /etc/nginx/passwd/kibana.passwd;

  location / {
    proxy_pass http://127.0.0.1:5601;
    proxy_redirect off;
  }
}

server {
 listen 9201;

 auth_basic "Elasticsearch Auth";
 auth_basic_user_file /etc/nginx/passwd/elasticsearch.passwd;

  location / {
    proxy_pass http://127.0.0.1:9200;
    proxy_redirect off;
  }
}

</pre>
上記の設定ファイルにより、Nginx は外部からのリクエストを受け取り、内部の指定されたポートへ転送できるようになります。また、HTTP Basic 認証によって、最も基本的なログイン制限をかけています。

次に、Nginx がどのアカウントとパスワードを有効と判断するかを知らせるため、パスワードファイルを作成します。Apache のユーティリティをインストールしてください。
<pre>sudo apt-get install apache2-utils</pre>
次のコマンドでパスワードファイルを作成します。user_name の部分は好きな名前に変更してください。コマンドを実行すると、パスワードの入力を求められます。パスワードはハッシュ化されて保存されるため、ファイルではあっても、そこまで心配する必要はありません。
<pre>sudo htpasswd -c /etc/nginx/passwd/elasticsearch.passwd user_name
sudo htpasswd -c /etc/nginx/passwd/kibana.passwd user_name</pre>
複数のアカウントを設定するには、-c パラメーターを外します。-c は create（作成）の意味で、付けたままにすると既存のパスワードファイルが上書きされてしまうためです。
<pre>sudo htpasswd /etc/nginx/passwd/kibana.passwd userA
sudo htpasswd /etc/nginx/passwd/kibana.passwd userB</pre>
完了したら Nginx を再起動し、Elasticsearch が動作するか試してみてください（Kibana はまだ設定が終わっていないので、ここではテストしなくて構いません）。うまくいかない場合は、関連サービスのログを確認してください。私の場合は、指定したポートがすでに使われていたので、別のポートに変更しました。パスワードファイルの場所が間違っていることもあります。

Elasticsearch に接続するときは、次の形式を使います。

http://username:password@192.168.0.1:9201

最後に一つだけ作業があります。Kibana と Elasticsearch が別々のマシンにある場合、Elasticsearch に認証を設定したため、Kibana が ES に接続できなくなります。同じように kibana.yml を編集して設定してください（新しく追加するのではなく、既存の項目を探して修正します）。同じマシンにある場合は、この設定は不要です。
<pre># /etc/kibana/kibana.yml

elasticsearch.url: "http://192.168.0.1:9201"

elasticsearch.username: "username"
elasticsearch.password: "password"</pre>
&nbsp;
