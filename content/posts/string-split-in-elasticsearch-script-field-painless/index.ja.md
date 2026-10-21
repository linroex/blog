---
title: "Elasticsearch Script Field（Painless）での文字列 Split"
date: 2016-12-14T01:29:14
slug: "string-split-in-elasticsearch-script-field-painless"
tags: ["Elasticsearch"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/Artboard-1.png"]
draft: false
---

この記事にたどり着いたということは、きっと Elasticsearch（または Kibana）の Script Field で Split を使う方法を長いこと探していたのでしょう！ ここでは、思いつく限りのキーワードをすべて盛り込みました。私と同じように苦労しているエンジニアが、このことに人生の時間を浪費しないようにするためです……

先に結論から言うと、Painless は Java Native API をサポートしているとうたっていますが、一部使えないものがあります。そのうちの一つが split です。Elasticsearch の開発チームは、split は時間計算量が悪すぎるとして取り除いてしまったそうです。私は最初そのことを知らず、構文が正しいのかを疑うところから、Java API を import するために特別な構文が必要なのかまで、さまざまな方法を試しました。最後に Elasticsearch の Issue で次の記事を見つけました：【<a href="https://github.com/elastic/elasticsearch/issues/20952">Painless - Request for native String split function</a>】。そのときの私の気持ちは……


<!--more-->


この Issue は 2015 年に提出され、今ではもう 2016 年も終わりに近づいています！！ 公式の String.split が登場するまでは、正規表現を使うか、String.indexOf() と String.substring() を組み合わせて処理できます。私はメールのサービスプロバイダーを分析する必要があったので、indexOf() で @ の位置を見つけて、そこで切り取るだけにしました。

また注意してください。文字列の処理をするなら、keyword フィールドか not_analyzed のフィールドを使うべきです。そうしないと、Elasticsearch が勝手にトークン分割を行ってしまいます。以下は、Email フィールドを分割して Service provider を取得する例です：
<pre>def email = doc['msg.email.keyword'].value;
def domain = email.substring(email.indexOf('@'));

return domain;</pre>
