---
title: "Trello API メモ"
date: 2017-02-22T23:59:29
slug: "trello-api-note"
tags: ["Trello", "API"]
categories: ["Programming"]
draft: false
---

今回、会社のダッシュボードを開発することになり、毎日の開発ポイントを計算するプログラムが必要になりました。ダッシュボードに毎月のポイントの推移を表示したかったので、Trello API を試してみました。その簡単なメモをここに残します。前提として、私たちの部署では Scrum のポイント方式で開発の進捗を見積もっており、各 Issue に難易度ポイントを設定して、Trello Scrum プラグインと組み合わせて使っています。


<!--more-->


Trello API はかなり強力で、Trello に対してさまざまなことができます。開発ドキュメントは JavaScript を中心に書かれており、ブラウザ拡張機能のようなアプリを作ることを想定しているようです。<a href="https://developers.trello.com/clientjs">JS SDK</a> も提供されています。ただ、API 自体は HTTP なので、他の言語からでも問題なく使えますし、レスポンスは JSON で返ってきます。

API リファレンス：<a href="https://developers.trello.com/advanced-reference">https://developers.trello.com/advanced-reference</a>

API の使い方は他のサイトとよく似ています。Facebook API などの開発経験があれば、ドキュメントはすぐに理解できるでしょう。認証は OAuth と Auth Router（URL にリダイレクトする方式）に対応しています。ただ面白いことに、公式サイトを自分で見て回ると、認証に関する情報はずいぶん奥のほうに隠れているのが分かります...

重要なページへの近道を紹介します。自動的にリダイレクトされないので、先に Trello にログインしておいてください：
<ul>
 	<li>App Key の取得：<a href="https://trello.com/app-key">https://trello.com/app-key</a></li>
 	<li>認証関連のドキュメント：<a href="https://developers.trello.com/authorize">https://developers.trello.com/authorize</a></li>
</ul>
また Trello は開発用に Sandbox を提供しています。正直なところ、名前は分かりにくいと思います。機能は Facebook Graph API Explorer と同じで、その場で JS を書いてデータを取得できます。

私が必要だったのは、毎日完了したカードを取得し、カード名と使用したポイントをデータベースに保存することです。カード名は次のような形式です：バグ修正バグ修正うぅぅ (3.5)。末尾の (3) が実際に消費した難易度です。

認証については、OAuth を実装するのが面倒だったので、いちばん簡単な方法を選びました。client.js を使って expire: never のトークンを取得し、そのまま出力します。client.js は認証が完了すると、トークンを自動的に localStorage へ保存する点に注意してください。コードは次のとおりです：
<pre>&lt;script&gt;
  localStorage.clear();
  Trello.authorize({
    type: 'redirect',
    name: '貝殼放大',
    expiration: 'never',
    success: ()=&gt;console.log(localStorage.trello_token)
  });
&lt;/script&gt;</pre>
P.S. Trello の client.js は jQuery と組み合わせて使う必要があります。

access_token を取得できたら、<a href="https://developers.trello.com/advanced-reference">API リファレンス</a>を見ながら作業を始められます！

Trello のドキュメントはかなり充実していますが、ひとつ注意しておきます。カードを取得する場合、デフォルトでは「作成日」順に並ぶうえ、並び順の向き（昇順・降順）やフィールドを指定できません（残念な点その 1）。また、返ってくるデータには「最終更新日時」はあっても「作成日」が含まれていません！！！

P.S. 1 枚のカードの作成日を取得したい場合は、GET /cards/{card_id}/actions?filter=createCard で取得できます。
