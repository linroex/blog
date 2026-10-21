---
title: "AES Encrypt/Decrypt File on Mac OS"
date: 2016-12-28T14:06:30
slug: "aes-encryptdecrypt-file-on-mac-os"
tags: ["AES", "macOS"]
categories: ["Security"]
draft: false
---

When you need to send sensitive data through Facebook or email, such as a Google API token or a company's annual accounts, do you really trust those online services? Personally, I don't. There are too many possibilities, from hacker attacks to poor internal controls at a company that let employees view customer data. Because of these possibilities, I'm not really willing to send confidential data over the internet. But in this day and age, sending data without using services like email or Facebook Messenger is almost impossible. In that case, you can use AES to encrypt the file, and then share the password through a channel you trust, such as a phone call or in person. Or at the very least, send the password through a different channel than the file, to reduce the risk of everything being compromised at once.


<!--more-->


On Linux and Mac OS, you can quickly handle AES encryption and decryption with openssl. Operating systems usually come with openssl built in, so you can use it directly. If you're not comfortable with the command line, you can also use the <a href="https://itunes.apple.com/us/app/encrypto-encrypt-files-you/id935235287">Encrypto</a> app developed by MacPaw to do AES encryption and decryption through a graphical interface. It isn't open source, but since it was developed by MacPaw, it should be fairly trustworthy.
<h2>Encrypting a File with AES</h2>
<pre>openssl enc -aes-256-cbc -salt -in file.txt -out file.enc</pre>
<h2>Decrypting a File with AES</h2>
<pre>openssl enc -d -aes-256-cbc -in file.enc -out file.txt</pre>
<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-28-下午2.05.55.jpg"><img class="alignnone size-large wp-image-7167" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-28-下午2.05.55-1024x522.jpg" alt="" width="660" height="336" /></a>

If you want to encrypt the file and output it in base64 instead of binary, add the -a option. Decryption works the same way:
<pre>openssl enc -aes-256-cbc -salt <strong><span style="color: #ff0000;">-a</span></strong> -in file.txt -out file.enc

openssl enc -d -aes-256-cbc <strong><span style="color: #ff0000;">-a</span></strong> -in file.enc -out file.txt</pre>
After you enter the encryption command, openssl will ask you to type the password twice (the password, then the same password again to confirm). It is used to encrypt the file. When decrypting, a password prompt also appears.

If you're not comfortable with commands, I personally recommend the <a href="https://itunes.apple.com/us/app/encrypto-encrypt-files-you/id935235287">Encrypto</a> app on Mac OS. You can download it directly from the Mac App Store. Just drag a file into it to encrypt or decrypt. It's very simple, and the interface is beautifully designed. Encrypto also uses AES 256, but it seems to have its own proprietary format. So if you encrypt with Encrypto, the recipient also needs the same app to decrypt it (there is a Windows version too). I haven't looked into its format in detail yet.

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/aes.gif"><img class="size-full wp-image-7166 aligncenter" src="{{< param imageBase >}}/wp-content/uploads/2016/12/aes.gif" alt="" width="420" height="526" /></a>
