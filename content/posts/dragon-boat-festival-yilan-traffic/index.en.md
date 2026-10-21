---
title: "Dragon Boat Festival Holiday: Saying Goodbye to Traffic Jams - Yilan Edition"
date: 2016-06-10T14:29:03
slug: "dragon-boat-festival-yilan-traffic"
tags: ["Yilan", "BigQuery"]
categories: ["Travel"]
images: ["%%IMG%%/wp-content/uploads/2016/06/IMG_2865.jpg"]
draft: false
---

It's been nearly a year since my last article, and I'm finally publishing a new one! During the 2016 Dragon Boat Festival holiday, I'm sure many friends from Taipei will choose Yilan as their first destination. Whether you drive or take a bus, if you go through the Xueshan Tunnel on National Freeway No. 5, it takes only about 40 minutes to reach Yilan <strong>if all goes well</strong>. Of course, everyone knows that during a holiday like this, things are rarely that smooth... Today I'm going to analyze the traffic patterns of the Xueshan Tunnel so you can avoid the crowds and get to Yilan smoothly! Below there will be a short technical explanation and the analysis process; if you're not technically inclined, you can jump straight to the conclusion! By the way, I'm in Yilan today, and this article was actually written at the Brown Cafe Castle.


<!--more-->

<h2>Conclusion</h2>
Speaking to the point is important in writing, so let's start with the conclusion!

The best way to avoid traffic is to avoid holidays. As the analysis below shows, there are simply too few roads leading to Yilan. You don't need a four-day holiday like this one. Even on a normal weekend, the Xueshan Tunnel gets jammed solid, and even if you make it through the tunnel, you still have to worry about traffic in town and a shortage of parking.

On weekends or consecutive holidays, the train is definitely the best choice. Today I took the Puyuma Express straight to Yilan (I bought the ticket only yesterday). It took about an hour, roughly the same as the bus, but there was absolutely no traffic!

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2840.jpg"><img class="alignnone size-large wp-image-6895" src="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2840-1024x768.jpg" alt="IMG_2840" width="660" height="495" /></a>

If you think there are too few trains, buses are also a good option. At least when traffic jams happen, you're not the one driving, so you can just lie back and sleep. But note that I don't recommend taking a bus in the morning (lol). Afternoons and late nights are the best times. Most people think leaving early will help them avoid traffic, but the analysis below shows that the traffic peaks around 10 a.m. and noon, and then gradually decreases in the afternoon.

Also, once you arrive in Yilan, don't rent a car. Rent a scooter instead, because otherwise finding parking will be a nightmare all day. This is my honest impression from riding around this morning: I saw all the cars stuck at the entrances of the parking lots, and I couldn't help feeling glad I hadn't rented a car, hehehe.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2848.jpg"><img class="alignnone size-large wp-image-6896" src="{{< param imageBase >}}/wp-content/uploads/2016/06/IMG_2848-1024x768.jpg" alt="IMG_2848" width="660" height="495" /></a>
<h3>Technical Notes</h3>
That wraps up the conclusion, so now for the technical part. The following report is based on the ETC data for highways provided by the National Freeway Bureau of the Ministry of Transportation and Communications (<a href="http://tisvcloud.freeway.gov.tw/history/TDCS/">highway ETC data</a>). If you have a technical background, you can refer to this explanation and analyze the traffic volume data for other road sections yourself.

First, I used the M03A traffic volume statistics dataset. It contains the number of vehicles passing each ETC detection station every five minutes, from January 1, 2014 to the present, along with the types of vehicles that passed. It's the best dataset for analyzing congestion on highways.
<ul>
 	<li>Raw data download: <a href="http://tisvcloud.freeway.gov.tw/history/TDCS/">http://tisvcloud.freeway.gov.tw/history/TDCS/</a></li>
 	<li>Dataset documentation: <a href="https://ntust.me/2vdn5">https://ntust.me/2vdn5</a></li>
 	<li>Data processing script: <a href="https://ntust.me/gpv6t">https://ntust.me/gpv6t</a></li>
</ul>
This dataset is quite large: M03A alone is about 11 GB, but the format is acceptable. I originally planned to load it straight into MySQL for analysis, but queries were far too slow, so in the end I moved it to Google BigQuery. I strongly recommend this service. It's very easy to use, inexpensive, and lets you query data directly with SQL.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/Google_BigQuery.png"><img class="alignnone size-large wp-image-6887" src="{{< param imageBase >}}/wp-content/uploads/2016/06/Google_BigQuery-1024x483.png" alt="Google_BigQuery" width="660" height="311" /></a>

Because the dataset is split across many files, I wrote a Python script to organize the data. After organizing it, I uploaded it to Google Cloud Storage with gsutil, then used BigQuery to read the data directly from Cloud Storage and create a table. Next, I used SQL to pull out the data I was interested in, moved it into Google Sheets for further processing, and finally plotted the charts with Plotly.

The following analysis uses data from two monitoring stations, 05F0055S and 05F0055N. These two stations are at the entrance to the Xueshan Tunnel on the Taipei-to-Yilan route, and they represent southbound and northbound traffic, respectively. The time range is January 1, 2014 to May 1, 2016.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖.png"><img class="alignnone wp-image-6886 size-full" src="{{< param imageBase >}}/wp-content/uploads/2016/06/交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖.png" alt="交通部臺灣區國道高速公路局北區工程處坪林行控中心_-_Google_地圖" width="821" height="584" /></a>

<!--nextpage-->
<h3>Criteria for Determining Traffic Jams</h3>
With the highway ETC data, I can easily find the traffic volume per hour, per day, or per week. But a question remains: "How much traffic does it take to cause a jam?" A traffic volume on its own is just a string of numbers. Here I use a low threshold, an average, and a high threshold to decide whether a jam is happening. The results are as follows:

<strong>Southbound (daily)</strong>
<ul>
 	<li>Low threshold: 25,100 vehicles</li>
 	<li>Average: 28,213 vehicles</li>
 	<li>High threshold: 34,209 vehicles</li>
</ul>
<strong>Northbound (daily)</strong>
<ul>
 	<li><strong>Low threshold: </strong>25,667 vehicles</li>
 	<li>Average: 28,542 vehicles</li>
 	<li>High threshold: 33,950 vehicles</li>
</ul>
In addition, using a <a href="http://www.nownews.com/n/2015/06/21/1724384">news report</a> about the Xueshan Tunnel jam during the 2015 Dragon Boat Festival (this is where Google comes in handy), we know that the northbound Xueshan Tunnel was badly congested on May 20, 2015. The data shows that northbound traffic that day was about 35,807 vehicles, which confirms that the northbound direction does get jammed when the daily volume reaches the high threshold. Of course, daily statistics aren't precise enough; hourly data would be better, but I'll skip that here to save space (lol).
<h3>General Trend Analysis</h3>
Here I use days as the unit, combined with the low, average, and high thresholds from before, and I make good use of the conditional formatting tool in Google Sheets. We can see that on every holiday weekend, the traffic in both directions is almost always around the high threshold.

The chart below shows the traffic from Yilan to Taipei. For the complete data, click <a href="https://docs.google.com/spreadsheets/d/1dgLT3a01_adWdbgKrf7LLdKetkUMvn7eZra-_yTg5Ew/edit?usp=sharing">this link</a>.

You'll notice that traffic surges on Sundays and Mondays, while Saturday traffic is comparatively light. Weekday traffic is almost always below the low threshold.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表.png"><img class="alignnone size-full wp-image-6889" src="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表.png" alt="雪隧北上南下資料_-_Google_試算表" width="496" height="509" /></a>

The chart below shows the traffic from Taipei to Yilan. In contrast to the northbound direction, the hot spots are mostly concentrated on Saturdays and Sundays.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表-1.png"><img class="alignnone size-full wp-image-6890" src="{{< param imageBase >}}/wp-content/uploads/2016/06/雪隧北上南下資料_-_Google_試算表-1.png" alt="雪隧北上南下資料_-_Google_試算表" width="502" height="502" /></a>

From these two charts, we can reasonably guess that most people go to Yilan on Saturday and return to Taipei on Sunday or Monday for work.

Here is more detailed chart data as well. It covers Monday through Friday, with hourly intervals. This data was plotted with Plotly, and you can click or select with the mouse to see the details.

<strong>Southbound</strong>

<iframe src="https://plot.ly/~KarlLin/6.embed?share_key=gx70Z1ajvor5iCysGlCvFD" width="900" height="800" frameborder="0" scrolling="no"></iframe>

<strong>Northbound</strong>

<iframe src="https://plot.ly/~KarlLin/7.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>
<h3>Single-Day Analysis</h3>
Here I use single days as the range and hours as the interval, so you can see what time it's best to leave if you really are going to drive or take a bus. Of course, you can also work with the raw data directly, since the situation can be quite different from Monday to Sunday.

<strong>Southbound</strong>

<iframe src="https://plot.ly/~KarlLin/9.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>

<strong>Northbound</strong>

<iframe src="https://plot.ly/~KarlLin/11.embed" width="900" height="800" frameborder="0" scrolling="no"></iframe>

Beyond the analysis directions above, there are many other angles to try, such as how traffic changes during three-day or four-day holidays, or even how the weather factors in. Different detection stations may also show different patterns. If you're interested, grab your keyboard and get started! Maybe I'll write a detailed technical explanation next time, when I have the chance.
<h3></h3>
