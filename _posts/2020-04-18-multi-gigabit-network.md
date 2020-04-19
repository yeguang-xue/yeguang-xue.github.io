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

The user experience of NAS (network-attached storage) devices largely depends on the connect speeds. Although 10GbE (10 Gigabit Ethernet) was proposed long ago, a wide usage is still limited by the still expensive price. Most Ethernet devices today are still stuck at GbE (1Gb/s). However, with standards like 2.5GBASE-T and 5GBASE-T that support intermediate speeds between GbE and 10GbE, we are now able to experience multi-gigabit networks with affordable upgrades. This article gives a quick guide of multi-gigabit home network setup, listing the necessary hardware required.

#### PCIe Ethernet Adapters ($30-$50)

Currently almost all consumer grade motherboards by default come with Ethernet ports only supporting GbE. Fortunately, with PCIe cards, we are able to expand the desktop PCs or servers with capabilities of multi-gigabit Ethernet. Especially, 2.5GBASE-T PCIe adapters can be found at price points below $50, which makes them perfect for affordable home network:

* 2.5GBase-T PCIe Network Adapter by EDUP ([Buy at Amazon](https://amzn.to/2yU2jjd))
* 2.5GBase-T PCIe Network Adapter by TRENDnet ([Buy at Amazon](https://amzn.to/3cf8vAE))

On Windows, after installing the PCIe adapter, the driver can be automatically updated by first connecting the internet with on-board Ethernet ports. You should be able to see the network adapter is working properly and you are good to go to switch to the faster 2.5Gbps port.

On Linux, you can download the driver r8125 from [Realtek website](https://www.realtek.com/en/component/zoo/category/network-interface-controllers-10-100-1000m-gigabit-Ethernet-pci-express-software), and install following the Readme files.

#### USB3 Ethernet Adapters (~$30)

For laptops, you can use a portable USB3 Ethernet ports like the following:

* CableCreation USB 3.0 to 2.5 Gigabit LAN Ethernet Cable Adapter ([Buy at Amazon](https://amzn.to/2RPqnKP))

Both price and size are comparable to a GbE USB Ethernet adapter. In comparison, a portable 10GbE Ethernet adapter typically uses thunderbolt interface, and costs >$150. 

#### Ethernet cables

One advantage of 2.5 Gigabit networks is that most existing CAT-5e cables are already sufficient. 5GBASE-T and 10GBASE-T require at least CAT-6 cables, and CAT-6A is actually recommended for 10GBASE-T. 

#### Network Switches (>$200)

With two devices with 2.5GBASE-T Ethernet adapters, theoretically you already have your multi-gigabit Ethernet by connecting them together. But for more practical use cases, e.g., accessing NAS from multiple devices, a multi-gigabit network switch is necessary. Multi-gigabit network switches are still expensive and the cheapest cost more than $200: 

* NETGEAR 10-Port Multi-Gigabit/10G Smart Managed Pro Switch ([Buy at Amazon](https://amzn.to/3bocsDo))

#### Speed Test

Now enjoy faster connection to your NAS!

<div class="figure-center-240 mb-3">
<img src="https://i.postimg.cc/hP9gMDvt/Speed.png">
</div>

