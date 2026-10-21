---
title: "OpenHardwareMonitor ――ハードディスク・グラフィックスカード・CPU の温度をチェックする"
date: 2011-02-11T08:30:51
slug: "openhardwaremonitor-temperature-check"
tags: ["PC Hardware", "Temperature"]
categories: ["Hardware"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_203335.jpg"><img class="size-large wp-image-4690 aligncenter" title="2011-02-08_203335" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_203335-455x500.jpg" alt="" width="455" height="500" /></a></p>
以前、グラフィックスカードが焦げたようなにおいを出して壊れてしまうという苦い経験があり、そこで今まで使っていた温度チェックソフトでは機能が足りないことに気づきました。そのソフトは CPU の温度しか検出できなかったのです。そこで別のソフトを探して見つけたのが OpenHardwareMonitor です。このソフトは、ハードディスク、グラフィックスカード、CPU、マザーボードなど、パソコン内の多くのハードウェアの温度を取得できます。さらに、温度の変化をグラフにしたり、ファイルに書き出したりすることもできます。


<!--more-->

<h2>OpenHardwareMonitor の紹介：</h2>
<ul>
	<li>公式サイト：<a href="http://openhardwaremonitor.org/">http://openhardwaremonitor.org/</a></li>
	<li>ダウンロード先：Xun6 ｜ <a href="http://www.4shared.com/file/fDOTg7jQ/openhardwaremonitor-v021-beta.html ">4Shared </a>｜ <a href="http://www.box.net/shared/espvtur36n">Box.net</a> ｜ <a href="http://open-hardware-monitor.googlecode.com/files/openhardwaremonitor-v0.2.1-beta.zip">公式ダウンロード</a></li>
	<li>MD5 チェックサム：b49aa6923b202c22ef9f7e01c32e3ab0</li>
</ul>
<h2>OpenHardwareMonitor の特徴：</h2>
<ul>
	<li>温度の変化をグラフで表示できる</li>
	<li>複数のハードウェアの温度を監視できる（ハードディスク、グラフィックスカード、CPU、マザーボード）</li>
	<li>現在も更新が続けられており、多くの新しいハードウェアに対応（AMD と Intel の両方の CPU を含む）</li>
</ul>
<h2>OpenHardwareMonitor の使い方：</h2>
1.OpenHardwareMonitor の本体を起動します。起動には少し時間がかかるので、しばらく待ってください。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_200608.jpg"><img class="alignnone size-large wp-image-4682" title="2011-02-08_200608" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_200608-520x312.jpg" alt="" width="520" height="312" /></a>

2.メイン画面には、パソコン内のハードウェアの温度のほか、CPU のクロック周波数やマザーボードの型番などのハードウェア情報が表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201105.jpg"><img class="alignnone size-large wp-image-4683" title="2011-02-08_201105" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201105-282x500.jpg" alt="" width="282" height="500" /></a>

3.ハードウェアの温度を見るのは比較的簡単です。では、温度の変化をグラフにしたい場合はどうすればよいでしょうか？ 上のツールバーで【View】→【Show Plot】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201404.jpg"><img class="alignnone size-full wp-image-4684" title="2011-02-08_201404" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_201404.jpg" alt="" width="486" height="464" /></a>

4.Show Plot を開くと、プログラムの最下部に新しい枠が表示されることに気づくはずです。また、各温度の値の前に小さなチェックボックスが表示されます。チェックを入れた温度が、下の大きな枠にグラフとして描画される仕組みです。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202055.jpg"><img class="alignnone size-large wp-image-4685" title="2011-02-08_202055" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202055-282x500.jpg" alt="" width="282" height="500" /></a>

たとえば、4 つの CPU の温度を表示したい場合（私のは 4 コアです）、CPU の前にチェックを入れると、下に温度変化が表示されます。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202324.jpg"><img class="alignnone size-large wp-image-4686" title="2011-02-08_202324" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202324-426x500.jpg" alt="" width="426" height="500" /></a>

5.Windows の起動時に自動で立ち上がるように設定することもできます。上のツールバーで【Options】→【 Run On Windows Startup 】をクリックします。

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202538.jpg"><img class="alignnone size-large wp-image-4687" title="2011-02-08_202538" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-08_202538-426x500.jpg" alt="" width="426" height="500" /></a>
