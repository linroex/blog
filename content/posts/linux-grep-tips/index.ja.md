---
title: "Linux Grep のコツ - 指定した文字列を含む行を検索する"
date: 2017-01-20T18:32:31
slug: "linux-grep-tips"
tags: ["Linux"]
categories: ["SRE"]
draft: false
---

Linux では、ファイルの中からキーワードを含む「行」を素早く検索したいことがよくあります。たとえばログを見ているときに、ある時刻に発生したエラーを探したい場合があります。ファイルを開いて一行ずつ探すのはあまり効率的ではありません。そんなときに grep の出番です！


<!--more-->


grep は簡単に覚えられます。指定したキーワードを使って、そのキーワードを含む行をすばやく表示してくれます。ここでは例として、syslog の中から CRON を含むすべての記録を探すとします。状況に応じて使えるように、いくつかの書き方を紹介します。
<pre>cat /var/log/syslog* | grep "CRON"

grep "CRON" /var/log/syslog*

grep "CRON" /var/log/syslog* &gt; result.txt</pre>
大文字と小文字は区別されるので注意してください！

ただ、これだけでは足りません。ここからは grep のさまざまなコツをまとめます。
<h3>キーワードに色を付けて表示する</h3>
grep の検索結果は、初期状態では色が付きません。キーワードを色付きで強調表示したい場合は、--color オプションを付けてください。
<pre>grep "CRON" --color /var/log/syslog*</pre>
<h3>A または B の検索</h3>
A または B に一致するデータを検索したい場合、二回に分けて実行する必要はありません。次のどちらの書き方でもかまいません。
<pre>grep -E "A|B" /var/log/syslog*

grep -e "A" -e "B" /var/log/syslog*</pre>
<h3>A と B の検索</h3>
A と B の両方に一致するデータを探したい場合、たとえば CRON と apache の両方を含む記録を探すときは、一つにまとめた検索パターンを使う必要はありません。次のように入力します。
<pre>grep "CRON" /var/log/syslog* | grep "apache"</pre>
同じ考え方で、三つ、四つ、またはそれ以上のキーワードを使うこともできますし、A または B と組み合わせることもできます。
<pre># CRON、apache、command がすべて含まれる行だけが検索される
grep "CRON" /var/log/syslog* | grep "apache" | grep "command"

# CRON+apache または CRON+backup
grep "CRON" /var/log/syslog* | grep -E "apache|backup"</pre>
<h3>前後 N 行を表示する</h3>
grep は初期状態では、検索に一致した行だけを表示します。しかし、前後の経緯を理解するために、前後の数行も見たい場合があります。その場合は、後ろ N 行を表示する -A オプションと、前 N 行を表示する -B オプションを使います。
<pre># 前後それぞれ 3 行
grep "CRON" -A3 -B3 /var/log/syslog*</pre>
