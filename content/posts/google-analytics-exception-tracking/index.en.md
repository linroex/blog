---
title: "Google Analytics Exception Tracking"
date: 2017-02-19T10:15:29
slug: "google-analytics-exception-tracking"
tags: ["Google Analytics"]
categories: ["Blog"]
draft: false
---

Google Analytics has a hidden feature called exception tracking. It collects error messages from a website's front end or back end (or from an app) so you can analyze them. Here's an example from my recent project. When a user fills out a form and submits it, I validate the information they entered. If they forgot to fill in a field, the error message is sent to GA. Afterward, I check how many times that error message appeared in GA. To some extent, this can suggest whether the interface design is poor and causing users to skip that field.


<!--more-->


Reference: <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions">Exception Tracking | Analytics for Web (analytics.js) | Google Developers</a>

The explanation below focuses on front-end JavaScript. If you want to send data from a website's back end or from an app, see the <a href="https://developers.google.com/analytics/devguides/collection/protocol/v1/">Measurement Protocol</a>.

Sending an exception to GA is very simple, similar to event tracking:
<pre>ga('send', 'exception', {
  'exDescription': err_message,
  'exFatal': false
});</pre>
<ul>
 	<li>exDescription parameter: the error message to send to GA. Think carefully about what this message should say, since different collection needs call for different approaches. Don't just send a meaningless message like "Required field not filled in." Who knows which field that is!</li>
 	<li>exFatal parameter: whether the error is fatal.</li>
</ul>
One thing to note: Google Analytics' default reports don't include an "Exceptions" item. To view the exception messages you've received, you need to use a custom report.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-19-上午10.14.59.jpg"><img class="alignnone size-full wp-image-7474" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-19-上午10.14.59.jpg" alt="" width="950" height="758" /></a>

In summary, the Exception Tracking that Google Analytics provides is very basic. It can only record a piece of text. But for some situations, that's enough. If you need more powerful features, such as error notifications or recording users, you can try <a href="https://rollbar.com/">Rollbar</a>.

&nbsp;
