---
title: "Enable Cross-Origin Resource Sharing (CORS) for Phaser.js"
date: 2016-12-02T14:01:31
slug: "enable-cross-origin-resource-sharing-cors-for-phaser-js"
tags: ["JavaScript", "CORS"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.56.00.jpg"]
draft: false
---

Phaser JS で別のドメインにあるリソースや素材を読み込もうとすると、ブラウザの同一生成元ポリシーにブロックされ、次のようなエラーメッセージがいくつも表示されます。
<blockquote>XMLHttpRequest cannot load http://s.ntustcoding.club/scroll-game-workshop/map.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://s.codepen.io' is therefore not allowed access.</blockquote>
実は、Phaser 自体がクロスオリジンリソース共有（CORS）に対応しており、簡単な一行を書くだけで解決できます。ただし、利用しているホスティングサービスも CORS に対応している必要があります。
<!--more-->
var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update}) function preload(){ game.load.crossOrigin = "anonymous"; }

注意：game.load.crossOrigin = "anonymous"; の行は、素材を読み込むほかのコードより前に書かないと効果がありません。

ちなみに、素材を読み込むたびに長い URL を書くのは大変ですよね。こういうコードを見ると、思わずため息が出てしまいます。
<pre>var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
  game.load.crossOrigin = 'anonymous';

 game.load.tilemap('map', 'http://s.ntustcoding.club/scroll-game-workshop/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background_img', 'http://s.ntustcoding.club/scroll-game-workshop/background.png');
}</pre>
実は Phaser JS には base URL というパラメーターがあり、設定しておくと、コードを次のように簡潔にできます。
<pre>var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
  game.load.baseURL = 'http://s.ntustcoding.club/scroll-game-workshop/';
  game.load.crossOrigin = 'anonymous';

  game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background_img', 'background.png');
}</pre>
