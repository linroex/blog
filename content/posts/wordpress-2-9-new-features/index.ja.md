---
title: "WordPress 2.9 - 新機能がかなり増えました。個人的なテストでは大きな問題はありませんでした"
date: 2009-12-19T16:11:03
slug: "wordpress-2-9-new-features"
tags: ["WordPress"]
categories: ["Blog"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162302.jpg"><img class="alignnone size-large wp-image-2386" title="2009-12-19_162302" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162302-500x303.jpg" alt="" width="500" height="303" /></a>

今日、起きて逐風者（ブログ名）にログインしたところ、ログイン画面に重要なお知らせが出ていました。WordPress 2.9 がリリースされたのです。今回はバグ修正だけでなく、機能もかなり増えています。私自身のテストでは大きな問題はなかったので、みなさんもぜひ早めにアップデートしてください！！


<!--more-->


<span style="color: #ff0000;"><strong>注：自動アップデートが使えない場合は、wp-config.php を開いて、次の命令を追加してください。<span style="color: #000000; font-family: Consolas, Monaco, 'Courier New', Courier, monospace; font-weight: normal; line-height: 18px; font-size: 12px; white-space: pre;">
</span></strong></span>

<strong> </strong>

<strong>
<pre lang="php">define('WP_MEMORY_LIMIT', '256M');</pre>
</strong>
<h3>WordPress 2.9 の新機能</h3>
<ul>
	<li>ゴミ箱：うっかり記事を削除してしまっても大丈夫です。ゴミ箱（垃圾筒）から取り戻せます！</li>
	<li>動画の埋め込み：別途プラグインをインストールする必要はありません。WordPress 2.9 には動画埋め込み機能が内蔵されています。記事に URL を貼り付けるだけで、自動的に埋め込み動画に変換されます（設定 → 媒體（メディア）で「Attempt to automatically embed all plain text URLs」を有効にしてください）</li>
	<li>プラグインの一括更新：複数のプラグインをまとめて更新できます（WordPress の管理画面から更新）</li>
	<li>画像エディターを内蔵：この機能は、名前のとおりですね！</li>
	<li>データベースの最適化・修復機能を内蔵：wp-config.php に次の命令を追加するだけで、データベースの最適化機能を有効にできます。命令：<span style="color: #ff0000;"><span style="font-family: Consolas, Monaco, 'Courier New', Courier, monospace; line-height: 18px; font-size: 12px; white-space: pre;"><pre lang=php>define('WP_ALLOW_REPAIR', true);</pre></span>

</span></li>
</ul>
<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-20_103623.jpg"><img class="alignnone size-large wp-image-2390" title="2009-12-20_103623" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-20_103623-500x303.jpg" alt="" width="500" height="303" /></a>

▲ 動画埋め込み機能を有効にする

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162400.jpg"><img class="alignnone size-large wp-image-2387" title="2009-12-19_162400" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_162400-500x303.jpg" alt="" width="500" height="303" /></a>

▲ 画像エディター

▼ ゴミ箱（垃圾筒）

<a href="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_171925.jpg"><img class="alignnone size-large wp-image-2388" title="2009-12-19_171925" src="{{< param imageBase >}}/wp-content/uploads/2009/12/2009-12-19_171925-500x303.jpg" alt="" width="500" height="303" /></a>
<h3>WordPress 2.9 関連情報</h3>
<ul>
	<li>WordPress 2.9 のダウンロード先: <a href="http://wordpress.org/latest.zip">http://wordpress.org/latest.zip</a></li>
	<li>中国語化ファイル: <a href="http://wordpress.kirin-lin.idv.tw/Home/oldfiles/latest.zip?attredirects=0">http://wordpress.kirin-lin.idv.tw/Home/oldfiles/latest.zip?attredirects=0</a></li>
	<li>P.S. 管理人（私）のテストでは、現時点で WordPress 中国語公式サイトの中国語化ファイルには、まだ翻訳されていない箇所があります（あるいは、このファイル自体が古いのかもしれません……）。ひとまずはこれで使ってみてください</li>
</ul>
