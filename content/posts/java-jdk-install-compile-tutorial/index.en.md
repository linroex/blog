---
title: "[Java] JDK Installation and Java Source Code Compilation Tutorial"
date: 2011-01-27T23:11:20
slug: "java-jdk-install-compile-tutorial"
tags: ["Java"]
categories: ["Programming"]
draft: false
---

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_232013.jpg"><img class="alignnone size-large wp-image-4475" title="2011-01-27_232013" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_232013-520x339.jpg" alt="" width="520" height="339" /></a>

Over the past week, I've been taking Java, JSP, and SQL courses at Taipei Business College. I had planned to learn Java anyway. A netizen once told me that the languages every engineer needs to know are C++ and Java. I've dabbled a little in C++ and can write small programs, but I had never touched Java at all. When my teacher asked whether I wanted to take classes at Taipei Business College, I went right away, very happy about it.

I originally thought Java wasn't very useful. I wanted to learn it because it's a required skill for engineers, and also because of its cross-platform nature: I could easily write Java programs for desktop and even mobile phones. Android's basics are also built on Java. But after a few classes, I started to like Java. It gave me the same drive I had when I first learned a programming language. I started staying up until midnight with a book in my hands... It's the same feeling I had back when I learned VB.NET!!


<!--more-->


Without further ado, here's how to install the JDK, the tool you use to compile Java programs after writing them, and how to compile Java code. The following tutorial uses the Command Prompt rather than Eclipse.
<h2>Java Information</h2>
<ul>
	<li>Official Java website: <a href="http://www.java.com/zh_TW/">http://www.java.com/zh_TW/</a></li>
	<li>JDK official website: <a href="http://www.oracle.com/us/technologies/java/index.html">http://www.oracle.com/us/technologies/java/index.html</a></li>
	<li>Latest version number: 1.6</li>
	<li>Application areas: Java can be used for mobile apps, network applications, general desktop programs, and more</li>
</ul>
<h2>Installing the JDK</h2>
1. Download the JDK first. Here are the Windows download links. If a download link no longer works, you can <a href="https://coder.tw/?page_id=1909">[report it here]</a>

JDK download page: <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">http://www.oracle.com/technetwork/java/javase/downloads/index.html</a>

JDK Windows 32bit: <a href="http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS_Developer-Site/en_US/-/USD/VerifyItem-Start/jdk-6u23-windows-i586.exe?BundledLineItemUUID=48.J_hCuQboAAAEtzvpZDb0I&amp;OrderID=1POJ_hCu3aQAAAEtwvpZDb0I&amp;ProductID=_omJ_hCwMp4AAAEsQIMcKluK&amp;FileName=/jdk-6u23-windows-i586.exe">Official download</a> | <a href="http://www.4shared.com/file/rHlCLIcI/jdk-6u23-windows-i586.html ">4Shared</a>

JDK Windows 64bit: <a href="http://cds.sun.com/is-bin/INTERSHOP.enfinity/WFS/CDS-CDS_Developer-Site/en_US/-/USD/VerifyItem-Start/jdk-6u23-windows-x64.exe?BundledLineItemUUID=qaaJ_hCuZa8AAAEtOwdZDb0K&amp;OrderID=so6J_hCupHsAAAEtMAdZDb0K&amp;ProductID=ZUuJ_hCwEmwAAAEsOoMcKluK&amp;FileName=/jdk-6u23-windows-x64.exe">Official download</a> | <a href="http://www.4shared.com/file/wTQCoTsm/jdk-6u23-windows-x64.html ">4Shared</a>

2. Run the JDK installer you just downloaded, then click [Next].

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_220638.jpg"><img class="alignnone size-full wp-image-4454" title="2011-01-27_220638" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_220638.jpg" alt="" width="504" height="382" /></a>

3. This page sets where the JDK will be installed. I recommend keeping the default value to avoid trouble with the settings later.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221009.jpg"><img class="alignnone size-full wp-image-4455" title="2011-01-27_221009" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221009.jpg" alt="" width="504" height="382" /></a>

4. Installing, please wait~

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221940.jpg"><img class="alignnone size-full wp-image-4456" title="2011-01-27_221940" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_221940.jpg" alt="" width="504" height="382" /></a>

5. Installation complete

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222027.jpg"><img class="alignnone size-full wp-image-4457" title="2011-01-27_222027" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222027.jpg" alt="" width="504" height="382" /></a>

That's the JDK installed. But is it really that simple? Of course not. Next, we need to set up the environment variables, which tell the operating system where the JDK is installed on your computer.
<h2>Setting Environment Variables</h2>
1. Right-click My Computer and select [Properties].

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222555.jpg"><img class="alignnone size-full wp-image-4458" title="2011-01-27_222555" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_222555.jpg" alt="" width="351" height="307" /></a>

2. If you're using Windows 7, first click [Advanced system settings], then click [Advanced] → [Environment Variables]. If you're using XP, just click [Advanced] → [Environment Variables].

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223454.jpg"><img class="alignnone size-large wp-image-4459" title="2011-01-27_223454" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223454-520x408.jpg" alt="" width="520" height="408" /></a>

3. Select [PATH] and click [Edit].

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223744.jpg"><img class="alignnone size-full wp-image-4460" title="2011-01-27_223744" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223744.jpg" alt="" width="394" height="406" /></a>

4. Add [C:Program FilesJavajdk1.6.0_23bin;] to the end of the variable value. Be careful not to overwrite the existing value. You need to add to the end of the original value! If you changed the installation location when you installed the JDK, you also need to change this path.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223848.jpg"><img class="alignnone size-full wp-image-4461" title="2011-01-27_223848" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_223848.jpg" alt="" width="357" height="145" /></a>

5. When you're done, click OK.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224126.jpg"><img class="alignnone size-full wp-image-4462" title="2011-01-27_224126" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224126.jpg" alt="" width="396" height="404" /></a>

6. Then open cmd (Command Prompt) to test whether the change worked.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224314.jpg"><img class="alignnone size-large wp-image-4463" title="2011-01-27_224314" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224314-368x500.jpg" alt="" width="368" height="500" /></a>

Type javac and press Enter. If you see the message "'javac' is not recognized as an internal or external command, operable program or batch file.", your settings are wrong.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224459.jpg"><img class="alignnone size-large wp-image-4464" title="2011-01-27_224459" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_224459-520x339.jpg" alt="" width="520" height="339" /></a>
<h2>Tutorial on Compiling Java Source Code</h2>
When you've written a Java program, you need to save it as a *.java file and then compile it. The JDK's job is to do the compiling. So below, I'll show you how to compile and run a Java program.

1. Open cmd, then type javac <your source file path> →→ there must be a space between javac and the source file path! Also, the source file path must be the full path, including the drive letter, the file name, and the extension.

Press Enter after typing it.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225638.jpg"><img class="alignnone size-large wp-image-4468" title="2011-01-27_225638" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225638-520x339.jpg" alt="" width="520" height="339" /></a>

2. If no message appears, the compilation succeeded, and you should find a file with the .class extension in the same folder as your source code.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225347.jpg"><img class="alignnone size-large wp-image-4467" title="2011-01-27_225347" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_225347-520x358.jpg" alt="" width="520" height="358" /></a>

3. Next, to run the class file, open cmd again. The steps are a bit more involved:

(1) If the class file is not on the C drive, first type the drive letter where the class file is located. For example, if it's on the D drive, type d: and cmd will switch to the D drive.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230234.jpg"><img class="alignnone size-large wp-image-4470" title="2011-01-27_230234" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230234-520x339.jpg" alt="" width="520" height="339" /></a>

(2) Type cd <your class file path>

p.s. You don't need to include the file name.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230504.jpg"><img class="alignnone size-large wp-image-4471" title="2011-01-27_230504" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_230504-520x339.jpg" alt="" width="520" height="339" /></a>

(3) Type java <your Java program name>

p.s. Assuming the program is named test.class, type [java test]. No file extension is needed.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_231018.jpg"><img class="alignnone size-large wp-image-4472" title="2011-01-27_231018" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-27_231018-520x294.jpg" alt="" width="520" height="294" /></a>

That's the end of the tutorial~ I hope you have fun with Java.
