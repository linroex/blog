---
title: "Laravel Artisan Migrate \"Table Already Exists\" or \"Foreign Key\" Error"
date: 2016-12-12T04:57:46
slug: "laravel-artisan-migrate-table-already-exisis-or-foreign-key-error"
tags: ["PHP", "Laravel"]
categories: ["Programming"]
images: ["%%IMG%%/wp-content/uploads/2016/12/laravel.png"]
draft: false
---

While deploying a project I had developed half a year earlier with Laravel 5.2, I ran into quite a few problems. One of them: after running php artisan migrate, I got a "Table Already Exists" error. But I had never created that table before. Digging deeper, I found that the table did exist, but there was no record for it in the project_migrations table. So I deleted the table manually and ran php artisan migrate once more. Sure enough, this time the real error message appeared: "General error: 1005 Can't create table 'dbname.#sql-fbc1_15e6' (errno: 121) (SQL: alter table `karl_project` add constraint `project_user_id_foreign` foreign key (`user_id`) references `karl_user`
(`id`))"


<!--more-->


&nbsp;

If you also get the Table Already Exists error, check whether the migrations folder has a record for it and whether the table actually exists. If that matches your situation, read on. Maybe you'll run into the same problem I did!

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.56.jpg"><img class="alignnone size-full wp-image-7037" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.56.jpg" alt="" width="567" height="305" /></a>

<a href="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.39.jpg"><img class="alignnone size-full wp-image-7038" src="{{< param imageBase >}}/wp-content/uploads/2016/12/螢幕快照-2016-12-12-上午3.22.39.jpg" alt="" width="572" height="285" /></a>

There are two possible causes. The first is that the MySQL engine must be set to InnoDB to use the foreign key feature. You can set this in the mysql engine setting in config/database.php. But Laravel uses InnoDB by default, so unless your database has a different setting, this should not be the cause. You can check whether the problem table uses the InnoDB engine with the SQL below:
<pre>SELECT TABLE_SCHEMA,TABLE_NAME,ENGINE FROM information_schema.TABLES WHERE TABLE_NAME = '<span style="color: #808080;">table_name</span>';</pre>
After checking, I found it was already InnoDB, so I ruled out that possibility.

Next I read through many more articles and found another possibility. In my migration files, I usually write foreign keys like this, creating the foreign key at the same time as the table:
<pre>Schema::create('project', function($table){
    $table-&gt;increments('id');
    $table-&gt;string('project_name', 100);
    $table-&gt;string('author', 100);
    $table-&gt;timestamps();
    $table-&gt;integer('user_id')-&gt;unsigned();
    $table-&gt;foreign('user_id')-&gt;references('id')-&gt;on('user');
});</pre>
<div>This way of writing had always run successfully, and I had not changed any version numbers. But some articles pointed out that this style causes the error: when creating the foreign key for user_id, that column does not exist yet, so the statement fails. That explains why the table gets created but no record appears in the migrations table, and why none of the subsequent migration files run. It sounds reasonable (although I still don't understand why it worked before and suddenly stopped). So I changed the code to the style the official documentation recommends, as follows:</div>
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
<div>The only difference in this approach is that the foreign key creation has been pulled out into a separate statement. And sure enough, it ran successfully...</div>
