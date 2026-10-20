---
title: "How to Ignore Python Warning"
date: 2023-03-12T13:25:45
slug: "how-to-ignore-python-warning"
tags: ["Python"]
categories: ["Programming"]
---

<p>在寫 Python 時偶爾會遇到一些無法解決或意義不大的警告訊息（Warning），例如前陣子使用 OpenPyxl 時它常常會提醒我：<code> warn("Workbook contains no default style, apply openpyxl's default")</code> ，這個 Warning 是提醒 OpenPyxl 會自動套用預設樣式到我載入的檔案，至於要如何解決這個 Warning？ 你需要用 Office 打開這個 Excel 檔案，重新存檔。像這就是一個對當下場景的我來說意義不大的警告訊息，因為我的程式是拿 Excel 檔的內容來使用，樣式對我沒有影響。</p>
<p>遇到警告訊息時，我的習慣還是會檢視並思考是什麼原因導致這個警告訊息，如果確認對我沒有影響，我會把它們從程式裡忽略掉，而不是依靠開發者的大腦去記得「這個警告訊息不重要」，並不是單純的眼不見為靜，而是為了養成良好的「看到警告訊息都要去處理」的習慣。</p>
<!--more-->



<p>但該如何正確的忽略警告訊息呢？ 常見的做法都是讓你直接忽略「所有警告訊息」，例如以下幾種寫法都是這類，我不推薦這種做法，因為這只是「眼不見為靜」，雖然只是警告訊息，但並不代表他們真的不重要</p>
<p><strong>以下建議勿使用</strong></p>
<pre class="wp-block-code"><code>import warnings

warnings.filterwarnings("ignore")

warnings.simplefilter("ignore")

warnings.filterwarnings("ignore", category=DeprecationWarning)</code></pre>
<p>在 Python 提供 warnings library 讓你可以去控制警告訊息是否顯示，以上幾種寫法基本上都是全域性的去做忽略，或是針對某一類去做忽略，但這類型的忽略我不是很建議，因為粒度太大，可能不小心把重要的警告訊息也忽略掉</p>
<p>我建議的寫法是，針對警告訊息的文字去判斷，例如：</p>
<pre class="wp-block-code"><code>import warning

warning.filterwarnings("ignore", message="Workbook contains no default style")</code></pre>
<p>上面的寫法，可以針對 Workbook contains 開頭的警告訊息去做忽略，另外也可以用下面的寫法，會針對 with 範圍內的警告做忽略</p>
<pre class="wp-block-code"><code>import warnings

with warnings.catch_warnings(record=True):
	warnings.simplefilter("always")
	myexcelfile = pd.read_excel(easy_payfile, engine="openpyxl")</code></pre>
