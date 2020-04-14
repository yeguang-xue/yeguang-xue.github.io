---
layout: post
title: "SELinux and Firewall Settings for Hosting Flask App with Nginx (on CentOS)"
category:
  - How To
tags:
  - Web Development
  - Linux
license: CC-BY
---

#### Hosting Flask App with Nginx

Nowadays, thanks to simple web frameworks such as [Flask](https://flask.palletsprojects.com/en/1.1.x/), everyone one can quickly learn how to become a full stack developer and write his own web applications. The Udacity course [Full Stack Foundations](https://www.udacity.com/course/full-stack-foundations--ud088) is highly recommended. However, to make your web applications actually useful (e.g., within a local network), there is still a missing piece from most introductory courses or tutorials, deployment. And it turns out the deployment of flask apps are even trickier than writing the apps, especially for amateurs like me. Without strong background in networking and system administration, it's easy to run into all kinds of frustrating errors. Even everything finally works out, the server may be potentially vulnerable because you copied commands you don't fully under Google. Here I would like to share some of my setups for deploying Flask apps with Nginx on CentOS. 

During developing/testing stage, we can simply call Flask's built-in server within your application `app.py` for convenience:
{% highlight python%}
if __name__ == '__main__':
    app.run()
{% endhighlight %}

However, as suggested by the warnings when running the above python code, Flask’s built-in server is not suitable for production environment. It's never meant to handle many requests from multiple users. To fulfill the purpose above, a more powerful WSGI server is required. A popular Python WSGI HTTP server such as [Gunicorn](https://gunicorn.org/) can launch multiple worker processes to handle more server requests. E.g., the following command launches to 2 works, and binds the server with listening port 8001: 

{% highlight bash %}
gunicorn -w 2 app:app -b :8001
{% endhighlight %}

You should already be able to access your application from [http://localhost:8001](). Still, we can do better by putting Gunicorn behind a proxy server, such as [Nginx](https://www.nginx.com/). The purpose is to further optimize the performance -- for an incoming request, the Nginx can redirect it to Gunicorn if it must be handled by the web application, while Nginx itself can deal with tasks like serving static files efficiently. Of course, Nginx has more advanced features like load balancing, but those features are rarely used within the scale of a home lab or a small local network. A simple Nginx configuration file looks like the following:

{% highlight nginx %}
server {
    listen       6001 default_server;
    server_name  _;
    root         /www/my-site;
    
    location ~* \.(pdf|html)$ {
        expires max;
    }

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    }
}
{% endhighlight %}

Nginx will be listening from port 6001 from outside requests (and redirect to port 8001 if the requests are for the web application). In addition, Nginx will also serve `pdf`, `html` files within the site root by itself. Now start Nginx server with: 

{% highlight bash %}
sudo systemctl start nginx
{% endhighlight %}

The web application should finally be functional! Or not... Most likely, you will still get error codes like 404, 502, when you try to access the web application from a different machine. 

#### Firewall and SELinux Settings

For security reasons, by default, firewall and SELinux policies are enabled in most Linux distros. They tend to prohibit the uncommon behaviors, e.g., using a non-default port 6001 for http server, and permission errors will occur. The quick and dirty way of course is to disable the security settings (as some solutions posted online), however it potentially make the server vulnerable. The better approach is to only add the exceptions necessary for your appliction instead of disabling the firewall or SELinux policies entirely. Commands for related configurations are listed below: 

* To add allowed ports to firewall using `firewall-cmd`: 
{% highlight bash %}
sudo firewall-cmd --zone=public --permanent --add-port=6001-6100/tcp
sudo firewall-cmd --zone=public --list-all # Check if ports are enabled in firewall
{% endhighlight %}

* To enable ports for http in SELinux:
{% highlight bash %}
sudo semanage port -a -t http_port_t -p tcp 6001-6009
sudo semanage port -l | grep http_port_t # Check if ports are enabled for http
{% endhighlight %}

* To enable http redirection in SELinux:
{% highlight bash %}
sudo setsebool httpd_can_network_connect on
sudo semanage boolean -l | grep httpd_can_network_connect  # Check httpd_can_network_connect boolean label
{% endhighlight %}

Finally, it's always recommended for beginners to first go through some overview/introduction materials for firewall and SELinux on Linux. With some background, it will be much easier to find the root cause of errors and save you significant amount of time. 
