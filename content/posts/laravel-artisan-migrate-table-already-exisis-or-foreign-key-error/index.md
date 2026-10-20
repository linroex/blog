---
title: "Laravel Artisan Migrate \"Table Already Exists\" or \"Foreign Key\" Error"
date: 2016-12-12T04:57:46
slug: "laravel-artisan-migrate-table-already-exisis-or-foreign-key-error"
tags: ["PHP", "Laravel"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/laravel.png"]
---

在部署半年前用 Laravel 5.2 開發的專案時遇到不少問題，其中一個就是執行 php artisan migrate 之後卻遇到 Table Already Exists 的錯誤，但在這之前我從未建立過該 Table，後來深入研究發現該 Table 確實存在但 project_migrations Table 裡面卻沒有建立紀錄，於是我將 Table 手動刪除後在直接執行一次 php artisan migrate，果然，這次出現了真正的錯誤訊息：「General error: 1005 Can't create table 'dbname.#sql-fbc1_15e6' (errno: 121) (SQL: alter table `karl_project` add constraint `project_user_id_foreign` foreign key (`user_id`) references `karl_user`
(`id`))」


<!--more-->


&nbsp;

如果你也是遇到 Table Already Exists 錯誤，你可以檢視 migrations 資料夾是否有建立紀錄，以及該 Table 是否確實存在，如果符合，那就往下看看說不定你也遇到和我一樣的問題！

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.56.jpg"><img class="alignnone size-full wp-image-7037" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.56.jpg" alt="" width="567" height="305" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.39.jpg"><img class="alignnone size-full wp-image-7038" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.39.jpg" alt="" width="572" height="285" /></a>

這個問題發生的原因可能有兩個，其一是 MySQL Engine 你需要設為 InnoDB 才能使用 ForeignKey 功能，這可以在 config/database.php 的 mysql engine 設定，但預設 Laravel 就是使用 InnoDB，除非你的資料庫有另外設定，否則應該和此問題無關；可以用下方的 SQL 語法查詢出問題的 Table 是否有使用 InnoDB Engine：
<pre>SELECT TABLE_SCHEMA,TABLE_NAME,ENGINE FROM information_schema.TABLES WHERE TABLE_NAME = '<span style="color: #808080;">table_name</span>';</pre>
我檢查後發現已經是使用 InnoDB，所以排除該可能性。

接著我又爬了許多文，發現還有一個可能性，在 Migration File 裡面，對於 Foreign Key 我慣用以下寫法，在建立 Table 的同時也建立 Foreign Key
<pre>Schema::create('project', function($table){
    $table-&gt;increments('id');
    $table-&gt;string('project_name', 100);
    $table-&gt;string('author', 100);
    $table-&gt;timestamps();
    $table-&gt;integer('user_id')-&gt;unsigned();
    $table-&gt;foreign('user_id')-&gt;references('id')-&gt;on('user');
});</pre>
<div>過去這樣的寫法是可以成功執行 Migrate 的，我也沒有修改過任何版本號，但有文章指出是這種寫法會導致錯誤，因為要幫 user_id 建立 Foreign Key 時，該欄位根本不存在，導致這邊執行出錯，就會發生 Table 被建立但 migrations Table 沒有建立紀錄的問題，以及後續的所有 Migrate File 都沒有被執行的問題，想想蠻合理的（雖然我還是不理解為何之前可以，現在突然不行），就把程式碼改成官方建議的寫法，如下：</div>
<div>
<pre>Schema::create('project', function($table){
    $table-&gt;increments('id');
    $table-&gt;string('project_name', 100);
    $table-&gt;string('author', 100);
    $table-&gt;timestamps();
    $table-&gt;integer('user_id')-&gt;unsigned();
});

Schema::table('news', function($table) {
    $table-&gt;foreign('user_id')-&gt;references('id')-&gt;on('user');
});</pre>
</div>
<div>該寫法唯一差別就是把 Foreign Key 的建立拉出來，果然，成功執行了...</div>
