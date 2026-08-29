---
title: "Enable Cross-Origin Resource Sharing (CORS) for Phaser.js"
date: 2016-12-02T14:01:31
slug: "enable-cross-origin-resource-sharing-cors-for-phaser-js"
tags: ["JavaScript", "PhaserJS", "Game Develop"]
categories: []
images: ["%%IMG%%/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.56.00.jpg"]
---

當你用 Phaser JS 載入不同網域的資源、素材時，就會遇到瀏覽器同源政策的阻擋，並冒出一堆錯誤訊息，例如：
<blockquote>XMLHttpRequest cannot load http://s.ntustcoding.club/scroll-game-workshop/map.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://s.codepen.io' is therefore not allowed access.</blockquote>
實際上，Phaser 本身是有支援 跨來源資源共享 CORS 的，只要透過一行簡單的語法就可以解決囉，當然前提是你所使用的網路空間也有支援 CORS 才行。
<!--more-->
var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update}) function preload(){ game.load.crossOrigin = "anonymous"; }

注意 game.load.crossOrigin = "anonymous"; 這行要加在其他載入素材的程式碼之前才有效果哦。

此外偷偷補充，每次載入素材都要寫漏漏長的網址，像是這樣的東西看到就想哭對吧。
<pre>var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
  game.load.crossOrigin = 'anonymous';

 game.load.tilemap('map', 'http://s.ntustcoding.club/scroll-game-workshop/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background_img', 'http://s.ntustcoding.club/scroll-game-workshop/background.png');
}</pre>
事實上 Phaser JS 有所謂 base url 的參數可以設定，設定完之後，你可以把程式碼簡化成下面這樣哦。
<pre>var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
  game.load.baseURL = 'http://s.ntustcoding.club/scroll-game-workshop/';
  game.load.crossOrigin = 'anonymous';

  game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background_img', 'background.png');
}</pre>
