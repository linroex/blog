---
title: "uWSGI"
date: 2015-07-24T19:17:45
slug: "uwsgi"
tags: ["Python", "uWSGI"]
categories: ["SRE"]
draft: false
---

<h1>Introduction</h1>
uWSGI is a protocol, and it is also a program.

Why is it so complicated? Let's start with the program. uWSGI was originally designed so that web applications written in Python could communicate with web servers such as Nginx and Apache. It uses its own uwsgi communication protocol. It also supports other protocols such as CGI, FastCGI, and sockets, so besides serving Python, it can also integrate with programming languages such as PHP and Go.


<!--more-->
My current understanding is that uWSGI is like a server with an entrance and an exit. You send data in through any of the protocols it supports, and it processes that data with its plugins (for example, for python or php). After processing, it sends the data back out through various protocols. That output can be forwarded to nginx or apache, or sent straight out as http.

uWSGI works on principles similar to FastCGI. It keeps several worker processes running persistently, hands incoming tasks to them, and returns the results once they are done.

Nginx has built-in support for uWSGI.
uWSGI can also enable vhost.
<h1>Installation</h1>
Here we install python3 and related tools, then use pip to install uwsgi.
<pre><code>$ sudo apt-get install python3 python3-pip python-dev build-essential
$ pip3 install --upgrade pip
$ pip3 install virtualenv uwsgi
</code></pre>
Some articles online install uwsgi directly with apt-get, but that version is quite old, so I recommend installing it with pip.
Also, install the latest version of Nginx with apt-get:
<pre><code>$ sudo apt-get install python-software-properties  
$ sudo add-apt-repository ppa:nginx/stable  
$ sudo apt-get update  
$ sudo apt-get install nginx  
</code></pre>
We install it this way because the version of nginx that apt-get includes by default is too old.
<h1>Configuration</h1>
The configuration is roughly divided into the Nginx side and the uWSGI side. The flow is shown in the diagram below.

All traffic enters Nginx first. Static requests, such as images, HTML, and files, are handled by Nginx. Dynamic requests, such as Python or PHP, are forwarded to uWSGI, and once uWSGI has processed them, it forwards the result back to Nginx.

Here's what we need to set up:
1. Nginx vHost
2. uWSGI vHost and forward

The setup is roughly divided into two stages:
1. Basic configuration (Nginx, uWSGI)
2. Setting up auto-start and the service

Let's start by configuring Nginx!

The two main folders related to Nginx are:
<ul>
	<li>/etc/nginx/sites-available</li>
	<li>/etc/nginx/sites-enabled</li>
</ul>
Yes, it looks a lot like Apache's vhost configuration. In practice, though, you have to create the links yourself.... In other words, only the config files in sites-enabled take effect. sites-available is just there to help you manage things. You can create a file in sites-available and then link it to sites-enabled, but personally I'm lazy, so I create files directly in sites-enabled.
<pre><code>$ sudo rm /etc/nginx/sites-available/default
$ sudo rm /etc/nginx/sites-enabled/default
$ cd /etc/nginx/sites-enabled
$ sudo vi demo.conf
</code></pre>
The contents look roughly like this:
<pre><code>server {
    listen 80;
    server_name 52.68.0.97;
    charset utf-8;
    client_max_body_size 20M;

    location / {
        uwsgi_pass unix:/var/www/demo/demo.sock;
        # uwsgi_pass 127.0.0.1:8080;
        include uwsgi_params;
    }

     location /static {
          alias /var/www/demo/static;
     }
}
</code></pre>
The config file is easy to understand. It listens on a certain port and domain, and the key part is the uwsgi_pass line. When a request arrives on the listening port and domain, it is forwarded to whatever is set in uwsgi_pass. There are two ways to set this up: reading the sock file created by uWSGI directly, or sending requests over a socket to a specified port where uWSGI is listening.

Here we'll use the sock file method, since it's a bit more involved.

After saving the file, remember to restart Nginx:
<pre><code>$ sudo service nginx restart
</code></pre>
Next, create a sample Python website (Flask) inside /var/www. You'll notice we use virtualenv here. This is because uWSGI supports loading a different environment for each application, so your website can be written in either Python 2 or Python 3 without any problem!
<pre><code>$ sudo mkdir demo
$ sudo chown -R ubuntu:ubuntu demo
$ cd demo
$ virtualenv venv
$ source venv/bin/activate
$ pip install flask
$ vi hello_module.py
</code></pre>
Put the most basic Flask example ("Hello world") into the hello_module.py file:
<pre><code>from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()
</code></pre>
Once the sample program is created, we can first use the simplest uwsgi command to test whether all the previous settings work. Testing in stages helps us find the problem.
<pre><code>$ uwsgi --module demo_module --callable app --http :1234 --venv /var/www/demo/venv
</code></pre>
This command loads demo_module.py as a module for uWSGI. In addition, whenever Nginx calls it, uWSGI looks for the app object (callable), sets it to output over the http protocol on port 1234, and finally sets the location of the required packages (–venv).

You can view it by entering http://localhost:1234 in your browser. If your server is remote, you can also test it by building a tunnel with an SSH proxy ( ssh -ND 2001 remote_server )

If something goes wrong here, check the messages uWSGI prints to the screen. They usually explain where the problem is. In general, problems at this stage have nothing to do with Nginx, because the current setup has uWSGI handling all the packets and it isn't connected to Nginx yet.

If this test works, we can temporarily connect it to Nginx using the command-line method and test again:
<pre><code>$ uwsgi --module demo_module --callable app --socket /var/www/demo/demo.sock --chown-socket www-data:www-data --venv /var/www/demo/venv
</code></pre>
This command is similar to the previous one, but adds:

–socket : this option sets the sock file used to communicate with Nginx.
– chown-socket : sets the permissions of the generated sock file to www-data, because that is the user name Nginx runs as.

If you set up communication with Nginx over a socket earlier, you can set "–socket" to 127.0.0.1:8080 instead, and then you don't need the chown-socket option.

Next, open your browser and go to http://localhost:80 to test (the port we set earlier in Nginx). You should see Hello World. If you don't, check the logs in /var/log/nginx for any errors. Since we already confirmed earlier that uWSGI works, we can conclude that the problem is not related to Python or uWSGI.

If everything has gone smoothly up to this point, congratulations! Now let's turn that long list of parameters into a config file. uWSGI supports several config file formats, including ini, xml, and json. Here we'll use ini as the example:
<pre><code>$ vi demo.config.ini
</code></pre>
Write the following contents:
<pre><code>[uwsgi]
chdir = /var/www/demo
module = demo_module
callable =  app
venv = /var/www/demo/venv
socket = /var/www/demo/demo.sock
chown-socket = www-data:www-data
</code></pre>
Next, run this command. If you can still see Hello World in your browser, congratulations, you're all set! The only thing left is to run uWSGI as a daemon!
<pre><code>$ sudo uwsgi --ini demo.config.ini
</code></pre>
Time for a break and a cup of tea. Next up is setting uwsgi to start automatically on boot. There are many ways to do this. For example, you can write a script and turn it into an Upstart service. The benefit is that you can easily start and stop it. You could also use uWSGI Emperor to handle it, especially if you have many apps to start (like Heroku does). Here we'll use an Upstart service as the example:
<pre><code>$ sudo vi /etc/init/uwsgi.conf
</code></pre>
The contents are as follows:
<pre><code>description "uWSGI instance to serve myapp"

start on runlevel [2345]
stop on runlevel [!2345]

script
    cd /var/www/demo
    source venv/bin/activate
    exec /usr/local/bin/uwsgi --ini demo.config.ini
end script
</code></pre>
Once saved, you can start it as a service:
<pre><code>$ sudo service uwsgi start
</code></pre>
<h1>More config</h1>
Here are some configuration notes:

Ref. <a href="http://uwsgi-docs.readthedocs.org/en/latest/Options.html">Official Options Page</a>
Ref. <a href="http://www.cnblogs.com/zhouej/archive/2012/03/25/2379646.html">Unofficial Chinese translation of the settings</a>
<h2>Recommended</h2>
Set as the master process

master = true

Set the number of worker processes

processes = 4

Restart a process when its physical memory usage exceeds a limit

reload-on-rss = 80

Restart a process when its virtual memory usage exceeds a limit

reload-on-as = 80

Limit the maximum virtual memory usage for each process

limit-as = 120

When uwsgi shuts down, also remove the sock file it created

vacuum = true

Add a memory usage field to the logs uWSGI generates

memory-report = true

Enable vhost, so that a single process runs multiple websites

vhost = true

Put the log file in a specified location

logto = /var/log/uwsgi/pada.log

Automatically reload when there are changes, so you don't have to restart the service manually. The number set below is the number of seconds: if a process is still busy working, wait up to N seconds before forcibly shutting it down.

reload-mercy = 8
<h1>Simple Performance Tuning</h1>
Earlier we mentioned settings like reload-on-rss and processes. Set them well and performance improves; set them badly and things go wrong. Here's a brief explanation of how to set them.

In theory, the higher the processes number, the faster the processing.
In theory, the lower the reload-on-rss number, the slower the processing.

But these are only theories. The actual numbers depend on how much memory the program running on uWSGI needs and how much idle memory your machine has available.

You can enable memory-report to see roughly how much memory your program uses on each run, and then set reload-on-rss a bit higher than that number. Also, calculate how much memory will be left on your server after nginx, Linux, and your other services are running. Suppose there is 500M of idle memory. After subtracting 200M reserved for other uses, 300M is available for uwsgi. If each run of the program uses 30M of memory, processes can be set to 10.
