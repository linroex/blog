---
title: "A Few Things About Hotel Booking Interfaces"
date: 2017-02-25T16:55:26
slug: "hotel-booking-ui-notes"
tags: ["Hotel Booking", "UX"]
categories: ["Travel"]
draft: false
---

Where do you book hotels? Agoda, Booking.com, or Airbnb? I'm about to travel to Japan, and while going back and forth between booking sites, I noticed many interesting things. For example, why won't Airbnb offer a review filter when it would be so easy to build? And date selection looks simple, but while booking this trip I saw two different approaches. If you look closely at the interfaces of different booking sites, you'll find many interesting things!


<!--more-->


Note: These are the unprofessional thoughts of one traveler, and I'd like to discuss them with everyone.

When choosing a stay's dates, there are two common approaches:
<ul>
 <li>Choose check-in and check-out dates</li>
 <li>Choose a check-in date and the number of nights</li>
</ul>
Most platforms, such as Agoda, Rakuten Travel, and Airbnb, use "choose check-in and check-out dates." But on the official website of Oedo Onsen Monogatari, I saw "choose a check-in date and the number of nights." I personally prefer the latter. Maybe I'm just bad with time, but when booking on Airbnb, I wasn't sure whether 3/5 ~ 3/9 meant four nights or five. When booking Oedo Onsen Monogatari, though, I could easily choose 3/7 for one night, which felt more intuitive to me.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.25.jpg"><img class="alignnone size-large wp-image-7521" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.25-1024x279.jpg" alt="" width="660" height="180" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.45.jpg"><img class="alignnone size-large wp-image-7522" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.17.45-1024x317.jpg" alt="" width="660" height="204" /></a>

Date selection almost always uses a date picker. I really like Airbnb's approach: fully booked dates can't be clicked, so you can see it at a glance instead of finding out after you submit. That's a good approach.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.20.53.jpg"><img class="alignnone size-full wp-image-7523" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.20.53.jpg" alt="" width="332" height="493" /></a>

Speaking of which, let me also share Peach's date selection. I absolutely love this interface! You can spot the cheapest date at a glance, without slowly clicking "previous week" and "next week" over and over. In fact, this interface is the reason I accidentally bought a plane ticket...

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.22.18.jpg"><img class="alignnone size-full wp-image-7524" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.22.18.jpg" alt="" width="988" height="604" /></a>

For how to show prices, there are several approaches for a three-day, two-person stay:
<ul>
 <li>Show the total price</li>
 <li>Show the price per day per person</li>
 <li>Show the price per day per room</li>
 <li>Show the price per day</li>
</ul>
Airbnb shows the per-day price and automatically calculates for the number of guests, while Booking.com shows the total for three days and two people. Personally, I think people naturally pick whichever number looks smallest. Even though there's no real difference, have you heard the old story of the monkeys who were fooled by "three in the morning, four in the evening"? Monkeys aren't the only ones; humans aren't much different. Also, when showing prices, you need to clearly explain whether the amount is a total or a per-day price, so users don't misunderstand. Airbnb does this too, but not very clearly. At first I thought it was the per-room, per-day price, regardless of the number of guests.

Booking.com's interface design isn't attractive, but its price labeling is very clear.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.30.50.jpg"><img class="alignnone size-full wp-image-7525" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.30.50.jpg" alt="" width="823" height="242" /></a>

Airbnb's design is very clean, but it's easy to get confused about whether a price is per day, per room, or the total.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.31.26.jpg"><img class="alignnone size-large wp-image-7526" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.31.26-1024x640.jpg" alt="" width="660" height="413" /></a>

&nbsp;

Many Airbnb users probably share my confusion: "Why can't I filter or sort by reviews on Airbnb?" Technically this isn't hard, and other booking sites all offer it. The real issue goes back to Airbnb's basic nature: the sharing economy. Most of its listings are "homes" rather than "hotels," and their operating schedules vary a lot. Unlike hotels that operate 24 hours, an Airbnb listing may only be rented out on certain days. If review filtering were offered, listings that are "less active" would easily be filtered out. So this is really a business consideration, not a technical problem. If results were sorted by reviews, listings with few reviews would naturally sink to the bottom, which would be very unfavorable to newcomers and to hosts who truly embody Airbnb's spirit.

Airbnb and other booking sites do very well at "data presentation," using various kinds of data to get users to book quickly. For example, Agoda shows "last room" or "10 other people are also looking" to tempt you. Airbnb also provides data-driven, easy-to-compare information, like "views in the past week" and "200 travelers saved this listing." I think this is a great approach: at the final step, the call to action, it provides data for an objective comparison. However, when you present these numbers, be sure to emphasize the time frame, such as "past week," because a whole year of views means little to users. And don't do what Agoda does, labeling every room as the "last room."

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.00.03.jpg"><img class="alignnone size-full wp-image-7527" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.00.03.jpg" alt="" width="340" height="515" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.45.26.jpg"><img class="alignnone size-large wp-image-7528" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.45.26-1024x453.jpg" alt="" width="660" height="292" /></a>

Finally, and most importantly, presenting complete information to travelers matters, but if you show everything without design, the page just becomes cluttered. Make good use of the interactive nature of web pages so the interface stays clean while still presenting all the information. Airbnb does this very well, and that's why I like Airbnb but dislike Agoda and Booking.com. Every time I visit traditional booking sites like Agoda, I feel like I'm looking at an ad site. The reason is simply that they show too much "complete" information without organizing it well.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.49.45.jpg"><img class="alignnone size-large wp-image-7529" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.49.45-1024x775.jpg" alt="" width="660" height="500" /></a>

Compared with Airbnb (bottom image), Agoda's listing page (top image) is obviously cluttered. It tries to show so much information that travelers can understand everything, but this only creates distraction.

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.50.27.jpg"><img class="alignnone size-large wp-image-7530" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.50.27-1024x631.jpg" alt="" width="660" height="407" /></a>

Prices are the same: is it really so hard to show one clear kind of price?

<a href="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.53.18.jpg"><img class="alignnone size-large wp-image-7531" src="{{< param imageBase >}}/wp-content/uploads/2017/02/螢幕快照-2017-02-25-下午4.53.18-1024x442.jpg" alt="" width="660" height="285" /></a>

Sometimes I feel Airbnb's UX isn't so much exceptional as its competitors just don't care enough... This is simply a short share of the small things I noticed while booking hotels.
