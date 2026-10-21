---
title: "How to Install Unverified Apps on macOS Sierra"
date: 2016-12-31T00:49:12
slug: "macos-install-unverified-apps-sierra"
tags: ["macOS"]
categories: ["Hardware"]
images: ["%%IMG%%/wp-content/uploads/2016/12/螢幕快照-2016-12-31-上午12.47.27.jpg"]
draft: false
---

Sometimes when we install apps on Mac OS, the system shows the message "“OOO” cannot be opened because it is from an unidentified developer." In the past, we all knew that you only had to go to the Security & Privacy settings in System Preferences and allow apps downloaded from anywhere. But after macOS Sierra, the "Anywhere" option mysteriously disappeared! In fact, Apple hid this option to keep users from installing malicious programs. But an unverified app isn't necessarily malicious. Many useful apps aren't certified by Apple for various reasons. For example, some apps use system permissions, or the developer hasn't bought a developer program (because it costs money!!!), so they can't get Apple's certification. It's hard to justify not letting us use them just for that, right!


<!--more-->


Actually, it's very easy to bring back the "Anywhere" option. Just enter the following command in Terminal, then type your user password, and the "Anywhere" option will appear right away!
<pre>sudo spctl --master-disable</pre>
Conversely, if you want to hide the "Anywhere" option again, enter this command:
<pre>sudo spctl --master-enable</pre>
A reader also mentioned in the comments that if you don't want to change any settings, you can hold the Ctrl key, right-click the app, and choose "Open" to launch it directly!
