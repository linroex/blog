---
title: "How to Use FTP? A FileZilla Connection Tutorial"
date: 2010-08-30T22:04:23
slug: "how-to-use-ftp-filezilla-tutorial"
tags: ["FTP", "FileZilla"]
categories: ["Software"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213528.jpg"><img class="size-large wp-image-3729 aligncenter" title="2010-08-30_213528" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213528-480x400.jpg" alt="" width="480" height="400" /></a></p>
Looks like everyone has started school today? I actually started last week. After these few days, I feel that life at vocational high school is pretty good. The only thing is that the discipline instructor is a bit strict and the teachers are a bit nagging. But the nagging is still a good thing, since at least it means we have teachers who actually care. I had heard from my junior high teachers that once you reach high school, nobody manages you anymore, and whether you succeed or not is up to you. But from what I see now, the teachers are quite responsible, perhaps even a little too responsible 0.0 But let's leave the class stuff aside, so the instructor doesn't come over and say I was cursing my teachers online? Okay~ The main reason I'm writing this post is that today, Class 15 of the Data Processing Department had an Introduction to Computing class. The teacher said that from now on, homework must be submitted via FTP, and some supplementary materials will also need to be downloaded via FTP. So I wrote this article to show everyone how to connect using <a href="http://filezilla-project.org/">FileZilla</a>.

Let me briefly introduce this program, <a href="http://filezilla-project.org/">FileZilla</a>. <a href="http://filezilla-project.org/">FileZilla</a> is an FTP client that lets you connect easily to an FTP server and upload and download files. It also has a built-in site manager that remembers the server address, username, and password for you.


<!--more-->


<h2>About FileZilla</h2>
<ul>
	<li>Official website: <a href="http://filezilla-project.org/">http://filezilla-project.org/</a></li>
	<li>Download: <a href="https://www.ohloh.net/p/filezilla/download?filename=FileZilla_3.3.4.1_win32.zip">Official download</a> | <a href="http://www.box.net/shared/u8h8j2ahkm">Box.net</a> | Xun6 | <a href="http://www.4shared.com/file/wg5jeVUR/FileZilla_3341_win32.html ">4Shared</a></li>
	<li>File size: 6 MB</li>
</ul>
<h2>FileZilla Tutorial</h2>
1. First, go to <a href="https://www.ohloh.net/projects/filezilla/download?filename=FileZilla_3.3.4.1_win32.zip">here</a> to download the FileZilla main program (or use any of the download links above), then extract it.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213926.jpg"><img class="alignnone size-large wp-image-3730" title="2010-08-30_213926" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_213926-515x400.jpg" alt="" width="515" height="400" /></a>

2. Open the folder you just extracted, then open filezilla.exe.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214156.jpg"><img class="alignnone size-large wp-image-3731" title="2010-08-30_214156" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214156-515x400.jpg" alt="" width="515" height="400" /></a>

3. In the Host field, enter the address of the FTP server. If the FTP server requires a login, enter your username and password in the Username and Password fields, then click Quickconnect. Our school's FTP does not require an account, so you only need to enter the server address and click Quickconnect, and it will automatically log you in as a guest.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214548.jpg"><img class="alignnone size-large wp-image-3732" title="2010-08-30_214548" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_214548-484x400.jpg" alt="" width="484" height="400" /></a>

4. Let's start with uploading. First, select the file you want to upload on the left side, then right-click the file (or folder) and choose Upload.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215228.jpg"><img class="alignnone size-large wp-image-3733" title="2010-08-30_215228" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215228-550x334.jpg" alt="" width="550" height="334" /></a>

5. Next, here is how to download files from FTP. It is simple: just reverse the previous steps. Earlier, you uploaded from the left side. This time, right-click on the right side and choose Download.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215525.jpg"><img class="alignnone size-large wp-image-3734" title="2010-08-30_215525" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215525-550x334.jpg" alt="" width="550" height="334" /></a>

6. That covers the basic usage. Also, once you have logged in one time, FileZilla will automatically save the FTP server details, so you can get back in quickly next time.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215907.jpg"><img class="alignnone size-large wp-image-3735" title="2010-08-30_215907" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_215907-550x334.jpg" alt="" width="550" height="334" /></a>

7. Also, when you download many files at once, you can check the progress in the transfer queue pane at the bottom of the program.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_220153.jpg"><img class="alignnone size-large wp-image-3736" title="2010-08-30_220153" src="{{< param imageBase >}}/wp-content/uploads/2010/08/2010-08-30_220153-484x400.jpg" alt="" width="484" height="400" /></a>

Note: Be careful, and I recommend not logging into instant messaging apps, MSN, or any other feature that requires an account and password on school computers. I originally thought the school probably had a restore utility installed, so viruses were not a concern. But later the department head told us that one of the hard drives is used for storing our files... which means someone could plant a virus there too. I really do not dare to use instant messaging on these computers. (I logged into my instant messenger today, and after the department head told me this, I totally freaked out....)
