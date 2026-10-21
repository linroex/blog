---
title: "A Brief Look at the Principle Behind Packed Programs"
date: 2009-07-07T20:29:10
slug: "intro-packed-program-principle"
tags: ["Reverse Engineering"]
categories: ["Security"]
draft: false
---

Most people have heard of packers, such as UPX, but do you know how they work? Have you ever tried writing one? Is it hard? Actually, the principle is quite simple. Let me, Feng-lai, explain it for you~

The first step in writing a packer is to get the binary file of the program you want to pack. Everyone knows that every file on a computer is a binary file, right? A binary file is made up entirely of 0s and 1s. So what do you do with it once you have it? Encrypt it, of course. The simplest encryption method would be to invert every bit: each 0 becomes a 1 and each 1 becomes a 0. But you can't just run the encrypted file directly, so the second part comes next.

The second part is actually quite simple. You embed the binary code of a decryption routine, a program that can decrypt the file, inside the encrypted file. When the program starts, it automatically decrypts itself. However, this decryption is only temporary. It doesn't decrypt the file on disk; it decrypts the copy in memory. That way, as soon as the program closes, it goes back to its encrypted state.

That is the packing method I came up with on a whim yesterday. In theory, it should work @@
