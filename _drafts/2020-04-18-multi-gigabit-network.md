---
layout: post
title: "Multi-Gigabit Home Network Setup"
category:
  - How To
tags:
  - Home Lab
  - Networking
  - Linux
license: CC-BY
---

#### Hardware for Multi-Gigabit Network

Network switch

Ethernet Adapters

* 2.5GBase-T PCIe Network Adapter by EDUP ([Buy at Amazon](https://amzn.to/2yU2jjd))
* 2.5GBase-T PCIe Network Adapter by TRENDnet ([Buy at Amazon](https://amzn.to/3cf8vAE))


USB3 adapter

Ethernet cables

Common interface speeds

NAS server

#### NAS Setup

NFS server

Samba server

{% highlight bash %}
gunicorn -w 2 app:app -b :8001
{% endhighlight %}
