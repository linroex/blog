---
title: "VB Syntax for Showing and Closing Forms"
date: 2009-04-17T12:40:00
slug: "vb-call-close-form-syntax"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

<font size="2">&nbsp;In VB, if you want to switch to another form, you can use the show() syntax.<br/>
The syntax is as follows:<br/>
FormName.show()<br/>
FormName is the name of the form you want to switch to.<br/>
For example, if you want to switch to a form called form2,<br/>
enter form2.show().<br/>
<br/>
If you want to open a new form and then close the old one, the syntax is:<br/>
FormName.close()<br/>
To close the form itself, enter me.close()&nbsp;&nbsp;&nbsp;&nbsp; &#39; means "close myself"<br/>
This syntax can also be used to close other forms.<br/>
The only condition is that the form you close must belong to your own program (well, obviously~~)</font>
