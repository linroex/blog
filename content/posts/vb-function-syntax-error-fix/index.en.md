---
title: "How to Write Functions in VB (Major Error Correction)"
date: 2009-04-19T07:17:00
slug: "vb-function-syntax-error-fix"
tags: ["VB"]
categories: ["Programming"]
draft: false
---

Today I'm going to teach everyone how to write their own functions.

First, you need to know the syntax for functions. Also, you must place your own functions at the very bottom of the program.
<pre lang="vb">Syntax:

Function FunctionName(Byval Parameter As ParameterType,Byval Parameter As ParameterType)

FunctionName = (what the function does)

End Function</pre>
A quick explanation: you can name the function whatever you like, and you don't need to wrap the name in double quotes.

Parameters are optional. Whether you need them depends on what the function does. If the function needs to receive values, you have to set them up.


<!--more-->


As for how many parameters you can have, I'm not sure either, but each parameter has to be separated by a comma.

Also, the code inside the function doesn't have to be an assignment to the function name.

However, every function must return a value.

A function without a return value will cause an error.

---------------------Example----------------------

Below is a function that checks whether the input number is greater than 20.
<pre lang="vb"> Public Function linroex(Byval x as object)as object

if x &gt; 20 then

linroex = true

else

linroex = false

end if

End Function</pre>
Next, I'll show you how to call a function you've written.

The call syntax is as follows:

VariableName=FunctionName(Parameter1,Parameter2)

You can also call it directly, as in <span style="font-size: x-small;">"FunctionName(Parameter1,Parameter2)"</span>

Or you can put it inside another function.

&nbsp;

For example, putting it inside the msgbox function looks like this:

msgbox(FunctionName(Parameter1,Parameter2))

Using the function from the example above:

<span style="font-size: x-small;"> -------------------------------------------</span>

dim x

x = linroex(11)

msgbox(x)

-------------------------------------------

Then x=false

Or if you put the call directly inside msgbox, it becomes:

msgbox(linroex(12))

Does everyone understand?

If you found this useful, give it a like, and if anything is unclear, feel free to leave a comment and ask me.
