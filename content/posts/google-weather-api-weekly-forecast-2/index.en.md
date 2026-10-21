---
title: "Google Weather API - Get a Full Week of Weather Data"
date: 2011-02-04T00:48:56
slug: "google-weather-api-weekly-forecast-2"
tags: ["Google API", "PHP"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_004255.jpg"><img class="size-large wp-image-4648 aligncenter" title="2011-02-04_004255" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_004255-520x416.jpg" alt="" width="520" height="416" /></a></p>
<strong>Google Weather API</strong> is something I discovered today. I wanted to add a weather lookup feature to the Plurk bot I've been developing recently, so I searched online for ways to get weather data. My original plan was to read the Central Weather Bureau's web pages and parse the data there. But then I found that both Google and Yahoo offer weather APIs. I preferred the Google Weather API, because it returns XML, which is easier to parse. Yahoo, on the other hand, returns HTML... Also, the Google Weather API lets you specify a city name directly. For example, if I want the weather for Taipei City, I just pass "Taipei" to the API. Yahoo's weather API isn't that simple, though. You have to enter a city code, which means I'd need to look up the code for the city I want before I could use Yahoo's API.
<h2>
<!--more-->
Google Weather API Features</h2>
<ul>
	<li>You can search by city name (in Chinese or English)</li>
	<li>You can search by latitude and longitude</li>
	<li>Returns a full week of data, including high and low temperatures and cloud cover</li>
	<li>The data is returned as XML, encoded in Big5</li>
</ul>
<h2>Google Weather API Format</h2>
http://www.google.com/ig/api?hl=zh-tw&amp;weather=<strong>city_name</strong>

Enter the city name or the latitude and longitude you want to query in <strong>city_name</strong>.

<strong>e.g., checking the weather in Taipei</strong>

http://www.google.com/ig/api?hl=zh-tw&amp;weather=<strong>Taipei</strong>

<strong>
</strong>
<h2>PHP Example</h2>
Sample file download: Xun6 ｜<a href="http://www.4shared.com/file/nLlIIABH/google_weather_api.html ">4Shared </a>｜ <a href="http://www.box.net/shared/godst1y4q7">Box.net</a>

<a href="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_003925.jpg"><img class="alignnone size-large wp-image-4649" title="2011-02-04_003925" src="{{< param imageBase >}}/wp-content/uploads/2011/02/2011-02-04_003925-520x218.jpg" alt="" width="520" height="218" /></a>
