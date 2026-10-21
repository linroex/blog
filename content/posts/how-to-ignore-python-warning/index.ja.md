---
title: "Python の警告を正しく無視する方法"
date: 2023-03-12T13:25:45
slug: "how-to-ignore-python-warning"
tags: ["Python"]
categories: ["Programming"]
draft: false
---

<p>Python を書いていると、解決できない警告や、あまり意味のない警告に出会うことがあります。たとえば、OpenPyxl を使っていた頃、次のような警告が何度も表示されました：<code> warn("Workbook contains no default style, apply openpyxl's default")</code>。この警告は、OpenPyxl が読み込んだファイルに既定のスタイルを自動で適用する、ということを知らせるものです。では、どう解決するのかというと、Office でその Excel ファイルを開いて保存し直せばよいのです。私の場合、プログラムは Excel ファイルの内容だけを使っていて、スタイルは結果に影響しないので、この警告はあまり重要ではありません。</p>
<p>警告が出たときは、私はいつも、なぜその警告が出ているのかを確認して考えるようにしています。自分に影響がないと確認できたら、コードの中で無視します。「この警告は重要ではない」と開発者が覚えておくことに頼るのではなく、です。単に見えなくするのではなく、「表示されたすべての警告に対処する」という良い習慣を身につけるためです。</p>
<!--more-->



<p>では、警告を正しく無視するにはどうすればよいのでしょうか。よくあるのは、「すべての警告」を直接無視する方法です。たとえば次のような書き方はすべてこれに当たります。この方法はおすすめしません。見えなくしているだけで、警告が重要でないとは限らないからです。</p>
<p><strong>以下の方法は使わないでください</strong></p>
<pre class="wp-block-code"><code>import warnings

warnings.filterwarnings("ignore")

warnings.simplefilter("ignore")

warnings.filterwarnings("ignore", category=DeprecationWarning)</code></pre>
<p>Python の warnings ライブラリを使うと、警告を表示するかどうかを制御できます。上の書き方は、基本的にグローバルに無視するか、ある種類の警告をまとめて無視するものです。この種の無視はあまりおすすめしません。粒度が粗すぎて、重要な警告まで誤って無視してしまうおそれがあるからです。</p>
<p>私のおすすめは、警告の文面を見て判断する方法です。たとえば：</p>
<pre class="wp-block-code"><code>import warning

warning.filterwarnings("ignore", message="Workbook contains no default style")</code></pre>
<p>上のコードでは、"Workbook contains" で始まる警告を無視しています。別の方法として、次のように with の範囲内の警告だけを無視することもできます：</p>
<pre class="wp-block-code"><code>import warnings

with warnings.catch_warnings(record=True):
	warnings.simplefilter("always")
	myexcelfile = pd.read_excel(easy_payfile, engine="openpyxl")</code></pre>
