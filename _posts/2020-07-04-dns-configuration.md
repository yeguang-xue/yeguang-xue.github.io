---
layout: post
title: "DNS Configuration and Using Domain Names for Applications in Local Network"
category:
  - Technical
tags:
  - Homelab
  - Linux
  - Networking
  - DNS
license: CC-BY
---

Since I started my home networking project, various applications have been deployed in the local network. For a very long time, I have relied on IP addresses and ports to access different apps. However, as the number of applications increase, assigning domain names becomes a more attractive option. In order to resolve the domain names, one way is to add entries in hosts files of each machine. However, it's time consuming to edit all machines whenever modifications are required. A central domain name server (DNS) addresses this issue. This post introduces how to configure DNS in a local home network and how to use domain names for different applications. 

## DNS Server Setup

The table below listed details of the hosts/applications that will be used.

| IP | Domain Name | Role |
| ----------- | ----------- | ----------- |
| 192.168.1.101 | ns.homelab.net | DNS server |
| 192.168.1.102 | web.homelab.net | Web server hosting application |
| 192.168.1.102 | gitlab.homelab.net | [Gitlab](https://about.gitlab.com) application (running in docker container, at port 7001) |
| 192.168.1.102 | wiki.homelab.net | [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) application (running in docker container, at port 7002) |
{: .table .table-striped}

As you can see from the table, multiple applications may share the same physical server, which is particularly common for home networking projects. Nginx can help deal with the issue. But as the first step, we only need to establish the correspondence between IP addresses and domain names. I followed the tutorial by DigitalOcean [[1]](https://www.digitalocean.com/community/tutorials/how-to-configure-bind-as-a-private-network-dns-server-on-centos-7) to setup the DNS server. BIND is used as name server software, which can be easily installed using software packages tools like `apt` or `dnf`/`yum`. To setup BIND, create or modify the following corresponding files:

`/etc/named.conf`

```conf
options {
    # listen-on port 53 { 127.0.0.1; };
    # listen-on-v6 port 53 { ::1; };
    ...
    allow-query     { 192.168.1.0/24;};
    ...
}

zone "homelab.net" {
    type master;
    file "/etc/named/zones/db.homelab.net"; # zone file path
};

zone "1.168.192.in-addr.arpa" {
    type master;
    file "/etc/named/zones/db.192.168.1";  # 192.168.1.0/24 subnet
};
```

`/etc/named/zones/db.homelab.net`

```conf
TTL    604800
@       IN      SOA     ns.homelab.net. admin.homelab.net. (
                  3     ; Serial
             604800     ; Refresh
              86400     ; Retry
            2419200     ; Expire
             604800 )   ; Negative Cache TTL
;
; name servers - NS records
     IN      NS      ns.homelab.net.

; name servers - A records
ns.homelab.net.          IN      A      192.168.1.101

; 192.168.1.0/24 - A records
web.homelab.net.         IN      A      192.168.1.102
gitlab.homelab.net.      IN      A      192.168.1.102
wiki.homelab.net.        IN      A      192.168.1.102

```

`/etc/named/zones/db.192.168.1`

```conf
$TTL    604800
@       IN      SOA     homelab.net. admin.homelab.net. (
                              3         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
; name servers
      IN      NS      ns.homelab.net.

; PTR Records
101   IN      PTR     ns.homelab.net.      ; 192.168.1.101
102   IN      PTR     web.homelab.net.     ; 192.168.1.102
102   IN      PTR     gitlab.homelab.net.  ; 192.168.1.102
102   IN      PTR     wiki.homelab.net.    ; 192.168.1.102
```

The following commands can be used to check the syntax:

```shell
sudo named-checkconf
```

```shell
sudo named-checkzone /etc/named/zones/db.homelab.net
sudo named-checkzone /etc/named/zones/db.192.168.1
```

After making sure everything is correct, start/restart BIND service. 

```shell
sudo systemctl start named
```

## Nginx Setup

In the last section, I mentioned multiple applications can share the same IP address, distinguished by ports. Nginx can help get rid of ports when accessing the applications. Using the Nginx configuration below, Gitlab application and MediaWiki application are assigned with corresponding domain names. 

```nginx
server {
    listen       80;
    server_name  gitlab.homelab.net;
    
    location / {
        proxy_pass http://127.0.0.1:7001;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    }
}
```

```nginx
server {
    listen       80;
    server_name  wiki.homelab.net;
    
    location / {
        proxy_pass http://127.0.0.1:7002;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
    }
}
```

If you run into any firewall or SELinux issues, you can check my [earlier post](/blog/2020/04/12/flask-nginx-firewall-selinux-configuration) for solutions. 

## Setting DNS in Clients

As a last step, we need to setup clients like desktop PCs, or mobile devices. Simply change the DNS server from automatic to manual and enter the DNS server address `192.168.1.101`. I tried all different mainstream operating systems including Windows, Linux, Mac OS, iOS, Android without having any difficulties. Now test and enjoy your private web applications in your client browser!

## References

1. [How To Configure BIND as a Private Network DNS Server on CentOS 7](https://www.digitalocean.com/community/tutorials/how-to-configure-bind-as-a-private-network-dns-server-on-centos-7)
