---
title: "Mongodb的安全性設定：帳戶設定、登入IP設定"
date: 2012-01-25T15:12:55
slug: "mongodb-security-account-ip-settings"
aliases: ["/posts/mongodb%e7%9a%84%e5%ae%89%e5%85%a8%e6%80%a7%e8%a8%ad%e5%ae%9a%ef%bc%9a%e5%b8%b3%e6%88%b6%e8%a8%ad%e5%ae%9a%e3%80%81%e7%99%bb%e5%85%a5ip%e8%a8%ad%e5%ae%9a/"]
tags: ["Mongodb", "安全性"]
categories: ["Mongodb"]
---

預設情況下Mongodb是沒有任何防護的，不需要任何帳號就可以遠端登入，如果要用它來寫程式其實是很危險的，所以在這篇文章中，我會教大家如何幫Mongodb加入帳戶的設定，變成需要帳號密碼才能登入，然後也會教大家設定登入的IP限制


<!--more-->


官方教學：<a href="http://www.mongodb.org/display/DOCS/Security+and+Authentication">http://www.mongodb.org/display/DOCS/Security+and+Authentication</a>
<h1>Mongodb帳戶設定</h1>
在Mongodb裡面的帳戶設定跟一般的設定方式有些不同，當初我也是搞了很久才懂的，在Mongodb裡面，你必須要先幫整個Mongodb Server設定一組最高權限的管理帳號，當這組帳號設定之後，一旦登入Mongodb就需要輸入帳密才能存取資料，接下來就是要幫個別的資料庫設定用戶，讓資料庫可以被存取。如果你沒有先設定最高權限的帳號，那就算你幫個別資料庫設定用戶，也沒有意義，當使用者登入時，不需要輸入任何帳密就可以存取資料

請看以下演示，所謂的最高權限帳戶，就是幫admin資料庫新增用戶，此組用戶可以瀏覽整個Mongo Server的所有資料，不受個別資料庫用戶限制，如果沒有設定此用戶，則不啟動帳戶功能

還沒有設定最高權限時，輸入show dbs會直接顯示目前有的資料庫：

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141031.jpg"><img class="aligncenter size-large wp-image-806" title="2012-01-25_141031" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141031-540x352.jpg" alt="" width="540" height="352" /></a>

設定最高權限之後，沒有登入就會顯示錯誤訊息，此時就可以幫個別資料庫設定帳戶：

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141245.jpg"><img class="aligncenter size-large wp-image-807" title="2012-01-25_141245" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141245-540x365.jpg" alt="" width="540" height="365" /></a>

但如果沒有設定最高權限，直接幫個別資料庫新增用戶，則沒有任何效果：

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141856.jpg"><img class="aligncenter size-large wp-image-808" title="2012-01-25_141856" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_141856-540x365.jpg" alt="" width="540" height="365" /></a>

從上面演示可以看到一件事情，當你把admin這個資料庫設定用戶時，系統會視為你要啟用「帳戶功能」，也就是說，必須要先登入才能存取資料，但如果你沒有幫admin設定用戶，則系統視為你不啟用「帳戶功能」，此時，就算你幫其他資料庫新增帳戶，也沒有任何意義，因為沒有啟用帳戶功能，即使資料庫有設定使用者，一樣是直接可以存取資料

簡而言之，設定步驟如下：「幫admin資料庫設定用戶->登入最高權限->幫其他個別資料庫設定用戶」

※在閱讀下面的教學之前，請先啟動你的Mongod，然後在他後面加入--auth參數，這是啟動驗證功能之意，如果沒有此參數就啟動Mongod，那即使設定了帳戶，也沒有效果
<blockquote>mongod --auth</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150321.jpg"><img class="aligncenter size-large wp-image-815" title="2012-01-25_150321" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150321-540x352.jpg" alt="" width="540" height="352" /></a>
<h2>詳細說明：</h2>
1.連線進入mongod server之後，進入admin資料庫
<blockquote>mongo

use admin</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_142603.jpg"><img class="aligncenter size-large wp-image-809" title="2012-01-25_142603" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_142603-540x365.jpg" alt="" width="540" height="365" /></a>

2.新增最高權限用戶
<blockquote>db.addUser('username','passwd','readOnly')</blockquote>
<strong>說明：</strong>

db.addUser這個命令就是增加用戶用的，第一個參數username就是帳號，第二個參數passwd是密碼，第三個參數比較特別，他可以設定此帳號的權限是否是唯讀的，設為1則是唯讀，設為0則是非唯讀，也就是可以寫入資料，預設是非唯讀

另外需注意大小寫有差，另外帳號跟密碼要用單引號框住以視為字串

<strong>範例：</strong>
<blockquote>db.addUser('root','0000',1)     //帳號root，密碼0000，權限是唯讀（只能讀、不能寫入）</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143455.jpg"><img class="aligncenter size-large wp-image-810" title="2012-01-25_143455" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143455-540x365.jpg" alt="" width="540" height="365" /></a>

3.再來，就可以去幫其他資料庫新增用戶，例如幫test資料庫增加一個「root_test」用戶

不過<strong>在幫其他資料庫建立用戶之前，必須先登入到有資格儲存資料的用戶（Not ReadOnly），以目前來講，只有最高權限，所以就登入到最高權限的帳戶，才能幫其他資料庫建立用戶</strong>
<blockquote>use admin    //要登入最高權限，都必須切換到admin資料庫

db.auth('root','0000')</blockquote>
<blockquote>use test       //切換到test db

db.addUser('root_test','0000')</blockquote>
說明：db.auth就是登入用的命令，第一個參數是帳號，第二個參數是密碼

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143739.jpg"><img class="aligncenter size-large wp-image-811" title="2012-01-25_143739" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_143739-540x365.jpg" alt="" width="540" height="365" /></a>

※另外請大家注意，在Mongodb裡面， <strong>用戶的新增是「沒有全域性的」</strong>，也就是說你在testA資料庫增加了一個root帳號，你也可以在testB新增一個root帳號，這也就是為何登入最高權限時，要先切換到admin資料庫，因為最高權限的帳號是屬於admin資料庫的，只不過系統設定admin資料庫的帳號有最高權限

4.如此，就算是啟動帳戶保護了，你可以在去幫其他資料庫設定帳戶，之後連線進來時，看你要使用哪個資料庫，就<strong>先切換進入該資料庫，然後再做登入即可</strong>

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_144426.jpg"><img class="aligncenter size-large wp-image-812" title="2012-01-25_144426" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_144426-540x365.jpg" alt="" width="540" height="365" /></a>

5.如果你想要刪除掉某個資料庫的某個用戶，先切換到該資料庫，然後再刪除他即可，例如，刪除test db的root_test用戶（需要是登入狀態，可以修改資料）
<blockquote>use test

db.removeUser('root_test')</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145018.jpg"><img class="aligncenter size-large wp-image-813" title="2012-01-25_145018" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145018-540x365.jpg" alt="" width="540" height="365" /></a>

如果要檢視該資料庫目前擁有的帳戶有哪些，可以輸入db.system.users.find()

這是因為所有帳戶資料，都存在system.users這個Collection裡面

<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145156.jpg"><img class="aligncenter size-large wp-image-814" title="2012-01-25_145156" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_145156-540x365.jpg" alt="" width="540" height="365" /></a>

<strong>總結：</strong>前面講的有點紛亂，這邊做個結語，簡而言之，要讓Mongodb能夠有帳戶保護的功能，你必須先新增一組最高權限的帳戶，而所謂最高權限，就是在admin資料庫建立的帳戶就是最高權限，建立完此組帳戶之後，要記得先登入最高權限，然後再去幫個別資料庫新增用戶，另外Mongodb裡面的用戶沒有全域性，A資料庫的用戶是屬於A的，B資料庫的用戶是屬於B的，所以在登入、刪除用戶時，都必須要切換到正確的資料庫，例如A、 B都有root這個帳號，我要刪除A資料庫的test，就要先use A，然後再db.removeUser('root')才可以，不然可能會刪錯資料庫的用戶，或者我要登入的是B資料庫的root，那我就要先切換到B資料庫在登入，如果我在A資料庫輸入db.auth()，那我登入到的其實是A資料庫的帳戶，是不能存取B資料庫的資料的！

還有第一次幫一般資料庫（非admin db）建立用戶時，需要先登入admin資料庫的用戶（也就是最高權限），登入之後才可以新增「第一筆」用戶資料，但是當一般資料庫有了第一筆用戶資料時，你就可以直接登入該筆用戶，然後做新增用戶的動作，而不需要登入到最高權限，這是因為在第一次建立用戶時，該資料庫裡面沒有任何用戶具有存取的權限，除了最高權限，然而addUser其實是把用戶資料寫進指定資料庫的Collection裡面，所以必須先登入最高權限，獲得寫入的權力以後，才能新增用戶。
<h1>登入IP設定</h1>
在Mongodb裡面，你可以設定所謂的白名單，也就是說只有指定的IP才能連線到Mongod Server

設定上很簡單，只要在啟動mongod時，加入參數--bind_ip就可以了，例如我要限制只有本機可以登入，則啟動mongod時的命令是：
<blockquote>mongod --bind_ip 127.0.0.1</blockquote>
<a href="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150959.jpg"><img class="aligncenter size-large wp-image-816" title="2012-01-25_150959" src="{{< param imageBase >}}/wp-content/uploads/2012/01/2012-01-25_150959-540x352.jpg" alt="" width="540" height="352" /></a>

不過目前還在研究能不能綁定多個IP，目前的操作方式只能指定一個IP做白名單...
