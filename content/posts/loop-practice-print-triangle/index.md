---
title: "三角形產生：左上、左下、右上、右下"
date: 2011-03-21T02:46:28
slug: "loop-practice-print-triangle"
aliases: ["/posts/%e8%bf%b4%e5%9c%88%e7%b7%b4%e7%bf%92-%e4%b8%89%e8%a7%92%e5%bd%a2%e7%94%a2%e7%94%9f/"]
tags: ["C++", "三角形", "迴圈"]
categories: ["C++"]
---

<p><a href="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-21_024015.jpg"><img class="size-large wp-image-379 aligncenter" title="2011-03-21_024015" src="{{< param imageBase >}}/wp-content/uploads/2011/03/2011-03-21_024015-540x492.jpg" alt="" width="540" height="492" /></a></p>
<p>這是我們程式老師上課時教迴圈時舉的一些例子，我是覺得題目本身不難，但是很適合拿來做迴圈的練習，訓練自己的反應速度，還有就是我現在寫VB的程度退化好多... 所以附上C++程式碼給大家看，自己研究吧～</p>
<p>
<!--more-->
</p>
<p>題目就是最上面那張圖，要只使用迴圈來產生上面四種三角形，解答在下面</p>
<h2>程式碼：</h2>
<p>載點： <a href="http://www.box.net/shared/p6ucecd7o0">Box.net</a>｜<a href="http://www.4shared.com/file/wnU82uNf/_cpp.html
">4Shared</a>｜<a href="http://dl.dropbox.com/u/6241767/%E9%80%90%E9%A2%A8%E6%8A%80%E8%A1%93%E8%AA%8C/%E4%B8%89%E8%A7%92%E5%BD%A2_cpp.zip">Dropbox</a>｜<a href="https://docs.google.com/leaf?id=0B7dzHNV9vYfOOGMzNmEzOGEtMzBiNC00ODkzLWE2NWUtNzM5OThiYTAzMGUz&hl=zh_TW">Google</a></p>
<pre lang="cpp">

#include <iostream>
#include <math.h>

using namespace std;

int main()
{
    int x=5;
    cout<<"三角形一："<<endl;
    for(int i=1;i<=x;i++){
        for(int y=1;y<=i;y++){
            cout<<"*";
        }
        cout<<endl;
    }
    cout<<endl;
    cout<<"三角形二："<<endl;
    for(int i=x;i>=1;i--){
        for(int y=1;y<=i;y++){
            cout<<"*";
        }
        cout<<endl;
    }
    cout<<endl;
    cout<<"三角形三："<<endl;
    for(int i=1;i<=x;i++){
        for(int y=x;y>i;y--){
            cout<<" ";
        }
        for(int y=1;y<=i;y++){
            cout<<"*";
        }

        cout<<endl;
    }
    cout<<endl;
    cout<<"三角形四："<<endl;
    for(int i=1;i<=x;i++){
        for(int y=1;y<i;y++){
            cout<<" ";
        }
        for(int y=x;y>=i;y--){
            cout<<"*";
        }

        cout<<endl;
    }
    return 0;
}

</pre>
