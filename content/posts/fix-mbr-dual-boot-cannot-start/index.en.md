---
title: "Won't Boot After Installing a Dual-Boot System? Let's Repair the MBR~"
date: 2010-09-11T22:19:31
slug: "fix-mbr-dual-boot-cannot-start"
tags: ["Windows"]
categories: ["Hardware"]
draft: false
---

Recently, while playing with Ubuntu, I ran into something: if you manually format the hard drive that Ubuntu is installed on, your computer will no longer be able to enter the operating system. This happens because the system's MBR file has been damaged. Formatting Ubuntu directly isn't the only way to hit this; sometimes it happens when installing a dual-boot system as well. When it does, don't panic, because the MBR file can be repaired, and the steps aren't very difficult. First, prepare a Windows installation disc, then set the computer to boot from the disc....
<!--more-->

<blockquote>For an introduction to MBR, see: <a href="http://goo.gl/iiPV ">Wikipedia</a>

<strong>Master Boot Record</strong> (MBR), also called the <strong>master boot sector</strong>, is the first sector that a <a title="Computer" href="http://zh.wikipedia.org/zh-tw/%E8%AE%A1%E7%AE%97%E6%9C%BA">computer</a> must read when accessing a <a title="Hard disk" href="http://zh.wikipedia.org/zh-tw/%E7%A1%AC%E7%9B%98">hard disk</a> after it starts up. Its three-dimensional address on the disk is (cylinder, head, sector) = (0, 0, 1).

For a hard disk, the number of bytes in one sector can be 128×2<sup>n</sup> (n=0,1,2,3). In most cases, n=2, so one sector is 512 bytes. The MBR records basic information about the hard disk itself, as well as the size and location of each partition, so it is an important entry point to your data. If it is damaged, the basic data-structure information on the disk is lost, and you have to rebuild that structure through a tedious trial-and-error process before you can access your original data again. The information in the MBR is written by FDISK. It is a product of <a title="Low-level format" href="http://zh.wikipedia.org/zh-tw/%E4%BD%8E%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96">low-level formatting</a> and has no direct relation to the operating system (the operating system is built on the disk partitions made by <a title="High-level format" href="http://zh.wikipedia.org/zh-tw/%E9%AB%98%E7%BA%A7%E6%A0%BC%E5%BC%8F%E5%8C%96">high-level formatting</a>, and is tied to a particular file system).</blockquote>
<h2>Before you begin:</h2>
<ol>
	<li>Windows installation disc</li>
</ol>
<strong>And set your computer to boot from the disc</strong>
<h2>MBR Repair Tutorial Begins</h2>
1. Put the Windows installation disc into the computer, then let it load the installation screen

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101227.jpg"><img class="alignnone size-large wp-image-3757" title="2010-09-11_101227" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101227-483x400.jpg" alt="" width="483" height="400" /></a>

2. On the Windows installation welcome screen, press R to open the Recovery Console

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101350.jpg"><img class="alignnone size-large wp-image-3758" title="2010-09-11_101350" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101350-550x387.jpg" alt="" width="550" height="387" /></a>

3. Enter the following command:

chkdsk c: /r

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101448.jpg"><img class="alignnone size-large wp-image-3759" title="2010-09-11_101448" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101448-550x387.jpg" alt="" width="550" height="387" /></a>

This command checks the hard disk for errors and takes a while to run. Change the "c:" part to the drive letter of the hard disk where your operating system is installed. After the chkdsk command finishes, enter the following command:

fixmbr

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101701.jpg"><img class="alignnone size-large wp-image-3760" title="2010-09-11_101701" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101701-504x400.jpg" alt="" width="504" height="400" /></a>

This command automatically repairs the MBR file for you. Once it's fixed, everything should be OK.

<a href="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101822.jpg"><img class="alignnone size-large wp-image-3761" title="2010-09-11_101822" src="{{< param imageBase >}}/wp-content/uploads/2010/09/2010-09-11_101822-504x400.jpg" alt="" width="504" height="400" /></a>

For related information, you can find it here: <a href="http://support.microsoft.com/kb/314058/zh-tw">http://support.microsoft.com/kb/314058/zh-tw</a>
