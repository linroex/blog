---
title: "How to Set the BIOS to Boot from CD (Essential for Reinstalling Windows)"
date: 2009-11-29T08:32:53
slug: "how-to-set-bios-cd-boot"
tags: ["BIOS"]
categories: ["Hardware"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_074650.jpg"><img style="border-bottom: 0px; border-left: 0px; display: block; float: none; margin-left: auto; border-top: 0px; margin-right: auto; border-right: 0px" title="2009-11-29_074650" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_074650_thumb.jpg" border="0" alt="2009-11-29_074650" width="354" height="261" /></a>

Booting from a CD is the most important step when learning to reinstall a computer. Once the CD boot is set up, installing the operating system is not that hard, since it is almost always just clicking Next. So in this article, I will teach you how to change the boot settings in the BIOS.

What is the BIOS? <strong>Basic Input/Output System</strong> (<strong>BIOS</strong>, <strong>B</strong>asic <strong>I</strong>nput/<strong>O</strong>utput <strong>S</strong>ystem) is the most basic software code loaded onto a computer's hardware system. The BIOS can be thought of as a tiny operating system that specializes in communicating with the hardware. It is usually written in assembly language for compatible CPUs. (This section is based on Wikipedia.)


<!--more-->
<span style="color: #ffffff;">.</span>
<h3>Basic Operation: Opening the BIOS Menu</h3>
When the computer starts, you need to press a hotkey to enter the BIOS menu (press the key repeatedly right after pressing the power button). However, each BIOS vendor uses a different key to enter the BIOS menu. Here is how to find yours: after you turn on the computer, a lot of text appears, right? Quickly look for text like the example below, or something similar. Once you find it, you will know which key to press to enter the BIOS! In the example below, the key is DEL (Delete).

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_075910.jpg"><img title="2009-11-29_075910" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_075910_thumb.jpg" border="0" alt="2009-11-29_075910" width="504" height="371" /></a>

Note: Desktop computers usually use ESC, Delete, or F4 to enter the BIOS, while laptops usually use F2.

<span style="color: #ffffff;">.</span>
<h3>Basic Operation: BIOS Controls</h3>
Next, I need to explain how to use the BIOS. Inside the BIOS, everything is controlled with the keyboard, not the mouse. Please listen carefully!

The control instructions for each BIOS brand are usually shown in the BIOS menu, but they are in English, so here are the most common controls:

<strong>1. AMIBIOS controls</strong>

Arrow keys (↑↓): Move up or down between items. In the example below, the selection is moving between System Time and System Date.

Arrow keys (→←): Move between tabs. Tabs are the items across the top, such as Main, Power, and Boot.

ESC: Exit the BIOS menu

F10: Save settings and exit

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_080559.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_080559" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_080559_thumb.jpg" border="0" alt="2009-11-29_080559" width="504" height="371" /></a>

<strong>2. AwardBIOS controls</strong>

Arrow keys: Move up, down, left, and right

ESC: Exit the BIOS menu

F10: Save settings and exit

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082247.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082247" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082247_thumb.jpg" border="0" alt="2009-11-29_082247" width="504" height="263" /></a>
<h3><span style="color: #ffffff;">.</span></h3>
<h3>Setting the CD Boot</h3>
1. Use the arrow keys to move to the Boot tab.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082423.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082423" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082423_thumb.jpg" border="0" alt="2009-11-29_082423" width="504" height="371" /></a>

2. Press Enter on Boot Device Priority to open the boot device settings menu.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082558.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082558" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082558_thumb.jpg" border="0" alt="2009-11-29_082558" width="504" height="371" /></a>

3. Select 1st Boot Device, press Enter, use the arrow keys to highlight CDROM, then press Enter.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082726.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082726" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082726_thumb.jpg" border="0" alt="2009-11-29_082726" width="504" height="371" /></a>

Note: On some computers, you need to press the + key or F8 to move the CDROM option to the top. It is not difficult: use the arrow keys to move to the CDROM option, then press the + key.

4. After making the setting, press F10, insert the installation disc, and the computer will boot from the disc automatically.

The image below shows the boot menu of Windows PE 3.0.

<a href="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082927.jpg"><img style="border-bottom: 0px; border-left: 0px; display: inline; border-top: 0px; border-right: 0px" title="2009-11-29_082927" src="{{< param imageBase >}}/wp-content/uploads/2009/11/20091129_082927_thumb.jpg" border="0" alt="2009-11-29_082927" width="504" height="433" /></a>
