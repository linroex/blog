---
title: "The Art of Naming in Programming"
date: 2017-02-06T23:59:25
slug: "naming-art-in-programming"
tags: ["Coding"]
categories: ["Programming"]
draft: false
---

Naming is an old, familiar topic in programming. From variable names to function and object names, not many people get it right. Do you really understand why variable names matter? Beyond making sure basic variable names are meaningful, how should you choose between common naming styles like Hungarian notation and camelCase? Here I'll briefly share some of my thoughts on variable naming.


<!--more-->


I don't want to discuss the pros and cons of camelCase or Hungarian notation. You can find mountains of material on that on Wikipedia or Google. I think what matters more is why we need good variable names, and how to "choose" a naming style.

Here I'll use "variable names" throughout, but the same logic applies to function names and object names.

Why do variable names matter so much? I think there are two sides to it. The well-known side is that bad variable names reduce the readability of code. Computers can still compile and run it, but code is written for people. When you maintain it later, it takes anyone a lot of time to understand what was written, even the original author. I deeply feel this myself, and I'm sure anyone with a few years of real-world experience would agree. So variable names need to be meaningful. Avoid names like x1, x2, and x3.

But beyond making variable names meaningful, you have probably seen these naming styles:
<pre>var studentList

var StudentList

var student_list

var arrStudent

var students</pre>
Everyone knows variable names should be meaningful so that you can understand them yourself. But taking it a step further: should you use underscores, or capitalization? Many people pick a favorite style and use it in every programming language. Others don't distinguish at all, using underscores whenever they like and capitals whenever they like. But in fact, the naming style should be decided by the development team and by the conventions of the programming language!

First, on the topic of language conventions: every programming language has its own coding style guide that recommends how to name things. For example, Python has different requirements for variables, constants, functions, objects, methods, and attributes. Objects should start with a capital letter, constants are written entirely in capitals, and variables are separated by underscores. At first I thought this made no sense. But later I found that learning a language's conventions and style speeds up development significantly. When I write Java or Python, even when I use a third-party library, I can type function names very quickly without checking the docs. It's not that I memorized the usage. It's that the official and third-party libraries all follow the same naming conventions, so I can guess function names quickly.

Simply put: every programming language has its own conventions, so follow them as closely as you can when you write code. That makes your code easier for others to read, and it saves you from constantly checking the docs when you use libraries.

So don't use one style across every language! In fact, each language's conventions can differ.

Next, on the topic of development teams: in a team, some people may be used to underscores and others to camelCase. But if you're writing the same program together, you should define a team-specific naming style to avoid having a single file full of mixed styles. Part of this is my own obsession with clean code. Seeing two different styles of variable names in one file makes no logical sense to me. Why do some function names use underscores while others use capitals? What's the logic behind that?! Like language conventions, imagine a team without a unified naming style. Before you could call a function, you'd first have to look through your colleague's file to check whether they used underscores or something else. Doesn't that sound tedious?

Same simple summary: if you're writing code with other people, define a team-specific naming style (and respect language conventions where you can). Avoid having everyone use the style they're used to. Otherwise, even if the code styles are all over the place, you'd still have to dig through someone else's code just to call a function. That's a huge waste of time!

In fact, when working in a team, you'd usually also define a team-specific Coding Style. For example, whether to use spaces or tabs, and whether to indent by two or four spaces. I've seen code that mixed two-space indentation with four-space tabs. I have to say, it was extremely painful......
