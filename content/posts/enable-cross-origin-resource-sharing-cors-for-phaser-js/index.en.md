---
title: "Enable Cross-Origin Resource Sharing (CORS) for Phaser.js"
date: 2016-12-02T14:01:31
slug: "enable-cross-origin-resource-sharing-cors-for-phaser-js"
tags: ["JavaScript", "CORS"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/螢幕快照-2016-12-02-下午1.56.00.jpg"]
draft: false
---

When you load resources and assets from a different domain in Phaser JS, the browser's same-origin policy blocks them, and you get a pile of error messages, such as:
<blockquote>XMLHttpRequest cannot load http://s.ntustcoding.club/scroll-game-workshop/map.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://s.codepen.io' is therefore not allowed access.</blockquote>
Actually, Phaser itself supports Cross-Origin Resource Sharing (CORS). You can solve this with one simple line, as long as the web hosting you use also supports CORS.
<!--more-->
var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update}) function preload(){ game.load.crossOrigin = "anonymous"; }

Note that the line game.load.crossOrigin = "anonymous"; has to come before any other code that loads assets, or it won't take effect.

As a side note, having to type out long URLs every time you load an asset is painful. Just looking at something like this makes you want to cry, right?
<pre>var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
  game.load.crossOrigin = 'anonymous';

 game.load.tilemap('map', 'http://s.ntustcoding.club/scroll-game-workshop/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background_img', 'http://s.ntustcoding.club/scroll-game-workshop/background.png');
}</pre>
In fact, Phaser JS has a base URL parameter you can set. Once it's set, you can simplify the code to the following.
<pre>var game = new Phaser.Game(1000, 650, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
  game.load.baseURL = 'http://s.ntustcoding.club/scroll-game-workshop/';
  game.load.crossOrigin = 'anonymous';

  game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('background_img', 'background.png');
}</pre>
