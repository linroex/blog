---
title: "How to Write Good Code: Indentation, Declaring Variables and Types, and Comments!"
date: 2011-01-29T22:07:05
slug: "good-code-indentation-variables-types-2"
tags: ["Coding"]
categories: ["Programming"]
draft: false
---

<p style="text-align: center;"><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_215359.jpg"><img class="size-large wp-image-4494 aligncenter" title="2011-01-29_215359" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_215359-520x428.jpg" alt="" width="520" height="428" /></a></p>
Most people who are just learning to program write code with a few obvious flaws. The code usually isn't indented, and it has almost no comments. If you started with a language like VB6, you probably also skipped declaring variable names and types. Code like that can run, but it is a pain to maintain. This article is just my own small opinion, so if I got something wrong, please let me know.


<!--more-->

<h2>1. Why Declaring Variables and Types Matters:</h2>
Let me start with why declaring variables and types matters, and that means talking about VB. Most beginners learn VB6 or VB.NET. How do I describe VB? It's actually a language that suits beginners very well, letting them get into programming quickly. In other words, it is simple. Because VB is so simple, it isn't very strict in some areas. For example, VB6 doesn't force you to declare variables. You can use a variable without declaring it. This isn't unique to VB, either. PHP and JavaScript work the same way. VB.NET made some progress by requiring you to declare variables, but it doesn't require you to declare their types. So what are the consequences? In VB6, if you don't declare a variable's type, or don't declare the variable at all, the system automatically makes it a Variant. (VB.NET automatically makes undeclared variables Objects.) A Variant takes up 16 bytes of memory. 16 bytes doesn't sound like much, since memory these days starts at 2 GB as a matter of course. So let me put it in relative terms. Please look at these two pieces of code:

<strong>1. Without declaring a type</strong>
<pre lang="vb">Dim x = 5
Dim y = 10
print( x + y)</pre>
<strong>2. With declared types</strong>
<pre lang="vb">Dim x As Byte= 5
Dim y As Byte= 10
print( x + y)</pre>
Both pieces of code give you the correct result, 15, but that's only on the surface. In reality, the code that doesn't declare types uses 32 bytes of memory, while the code that declares the variables as Byte uses only 2 bytes. (I'm thinking purely in terms of variable types and not counting anything else.) Compare the two, and that's a 16x difference in memory usage. Scary, right? This is the benefit of choosing variable types carefully. And since this is just a simple addition, it was already using very little memory to begin with. <strong>If you're writing a large project, such as a web browser, whether variables are declared can be a major factor in the browser's performance.</strong>

For more on variables in VB, see <a href="http://goo.gl/kwl3T">http://goo.gl/kwl3T</a>

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_214701.jpg"><img class="alignnone size-full wp-image-4491" title="2011-01-29_214701" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_214701.jpg" alt="" width="371" height="76" /></a></strong>

↑↑Byte takes up only 1 byte

↓↓Object takes up 4 bytes, while VB6's Variant takes up 16 bytes

<strong><a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_214925.jpg"><img class="alignnone size-full wp-image-4492" title="2011-01-29_214925" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_214925.jpg" alt="" width="230" height="110" /></a></strong>

Beyond the extra memory, which is the smaller drawback, not declaring variables can often make code error-prone or hide bugs. Anyone who has studied programming knows that each variable type has its own characteristics. For example, an Integer can only store whole numbers. If you store a decimal in an Integer variable, the system will quietly process it for you. And if a number is too large, an Integer can't hold it, so you need a bigger type such as Long. Say you write a currency converter. Exchange rates usually go out to the second or third decimal place. If you do the calculation with integers, the numbers may only be off by 1 at the start. But once you convert them into exchange rates, the gap grows to thousands, tens of thousands, or even millions. <strong>You really can't be careless when choosing and declaring types and variables!</strong>

P.S. Besides not forcing you to declare variables and types, VB has plenty of other drawbacks. But this article isn't meant to attack VB. It's about the dangers of not declaring variables. And to be honest, VB is a very good language for beginners.
<h2>2. Why Indentation and Comments Matter</h2>
Unlike the importance of types and variables we just covered, indentation and comments don't affect whether a program runs. But they do affect whether you count as a competent programmer. I won't go too far with this, since many people learn programming just to get through exams and school. At this point, a teacher named Lin at Taipei Business Technology College said something that made me want to cheer: "If students in our Information Management department hand in code without indentation, I will fail them." The teachers at that college may be more understanding and also stricter. But did you know that even high school and vocational school teachers already take a lot of points off when they see code without indentation?

I've been going on about how important indentation and comments are without really explaining why. This section is where I finally explain, so here we go~ First, look at these two pieces of code:

<strong>1. No indentation</strong>
<pre>If x > 2 Then
If x > 5 Then
Print("x>5")
End If
Print("5>x>2")
End If</pre>
<strong>2. With indentation</strong>
<pre>If x > 2 Then
	If x > 5 Then
		Print("x>5")
	End If
	Print("5>x>2")
End If</pre>
When there's an error, which version is easier to find the problem in: the first one without indentation, or the second one with indentation? I'm sure you can figure this out without me explaining. That's the importance of indentation: it lets you find errors in your code quickly. I've noticed that many classmates write very messy code without indenting it. When something goes wrong, they keep asking others to find the bug. What they don't realize is that the person helping them has a hard time too. Their eyes get tired, to put it lightly. So for your own sake and for everyone else's, please indent your code~

While I was making up the unindented example earlier, I found out that the VS family of IDEs indents automatically. That's why I ended up writing my fake code in Notepad. Although VS can take care of indentation nicely, unfortunately most high schools still teach VB6, which doesn't indent automatically. Even if your IDE indents for you, don't take it for granted. You still need to build the habit yourself.

<a href="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_214409.jpg"><img class="alignnone size-large wp-image-4490" title="2011-01-29_214409" src="{{< param imageBase >}}/wp-content/uploads/2011/01/2011-01-29_214409-520x370.jpg" alt="" width="520" height="370" /></a>

That covers indentation. In short, it makes debugging easier and makes code more readable. Comments serve the same purpose. Here I'll bring back that teacher's line: "After you graduate, most of the time you'll be modifying code that other people wrote, not writing a brand-new program." What does that mean? As I always say, anyone who has studied programming knows that one function can often be implemented with many different pieces of code. Say you want to compute an arithmetic series. Some people use a loop to add the numbers one by one, while smarter people use the formula. If your code has no comments, the people reading it will get tired. It takes them a while to figure out what you're doing. Some people won't understand what you wrote at all, or won't bother to try. And if you put that code away for a year or two and then take it out again, would you even understand your own thinking?

"Plant trees, and later generations will enjoy the shade." If you spend half an hour writing comments for your code now, the people who use it later can save two, three, or even more hours. And when you need to change your own code, you won't have to spend a lot of time first figuring out the original before you can keep going. Doesn't it make sense to do something that helps others and yourself at the same time?
<h2>Conclusion:</h2>
Writing good code takes more than what I've covered here. But what I've covered is the very basics, and if you can't even manage the basics, why talk about anything deeper? When I have time, I'll share more of my own thoughts. But honestly, these are old points that many people have heard before, and not everyone actually does them. Grades don't require students to meet this standard. In high school and vocational programming classes, it's a win if your code simply works. Very few schools are like the Taipei Business Technology College, which will fail you for code without proper formatting. You have to wait until you're in the working world and get dirty looks from others before you learn to do these things well... All of this can only be understood through experience and practice.
