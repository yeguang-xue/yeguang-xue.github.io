---
layout: post
title: Bit Rates of Different Interfaces (Wired)
category:
  - Technical
tags:
  - IT
  - Networking
  - Storage
  - Homelab
license: CC-BY
last_modified_at: 2024/01/26
---

When purchasing computer hardwares, understanding bit rates of different interfaces is crucial for optimizing data transfer between devices by identifying the bottleneck of the data communication. This post tries to dive into some common categories of wired interfaces and provide some reference numbers for their bit rates. 

## Memory, Chiplet Communications

Within a PC, communication between CPU and DRAM is the most important. The bandwidth and latency of memory access have a direct impact on the system performance.  

DDR (double data rate) SDRAM are the most common in modern PC/laptops, and recent versions on the market include DDR3, DDR4, and DDR5. DDR. Double data rate means the bus transfers data on both the rising and falling edges of the clock signal, meaning transfer rate is twice the memory bus clock rate. A simple formula for bandwidth (bytes/s) of a DDR memory module is given by 

$$\text{Transfer rate} × 64 (\text{number of bits transferred}) / 8 (\text{number of bits/byte})$$

For a DDR4 3200 memory, 3200 marks the transfer rate, and the bandwidth is simply $3200×64/8=25600 MB/s$.  DDR memory modules some in DIMM form factor in most desktops and SODIMM form factor for laptops or mini PCs. Different number of pins are used for different DDR versions. 

Besides DDR,  LPDDR is a technology more appropriate for the mobile application (smart phones). In 2020, Apple launched M1 series of Apple silicon SoC -- which also packs LPDDR5 integrated memory on package. The whole industry was surprised by the great performance and efficiency. Recently Intel also follows by using LPDDR5X on its latest Lunar Lake CPUs. Below are a list of LPDDR transfer rates per pin. 

- LPDDR4: 3200 MT/s per pin. 
- LPDDR4X: 4267 MT/s per pin. 
- LPDDR5: 6400 MT/s per pin. 
- LPDDR5X: 8533 MT/s per pin. 

Apple M1 Pro chip as an example -- it comes with 256-bit LPDDR5 SDRAM memory, therefore delivers 200GB/s memory bandwidth. 

With recent slowing down of Moore's law, chiplet design becomes more interesting to the industry. The communication between dies have even higher requirements on bandwidth and latency. [UCIe](https://en.wikipedia.org/wiki/UCIe) built on top of [CXL](https://en.wikipedia.org/wiki/Compute_Express_Link)  is an open specification for a die-to-die interconnect and serial bus between chiplets. Another noticeable achievement in die to die communications is Apple's UltraFusion on M2 Ultra -- it uses a silicon interposer that connects the dies with more than 10,000 signals, providing over 2.5TB/s of low-latency interprocessor bandwidth.

## Storage

The bandwidth of storage devices/interfaces affects I/O performance of the system. It's an important consideration when your PC is intended for some I/O intensive applications or you are simply building a storage server. Some most common interfaces for storage devices (disks) include:

- SATA 3.0: 6 Gbps
- SATA Express: 16 Gbps
- NVMe over M.2 or U.2 (using PCI Express 3.0 ×4 link): 32 Gbps
- NVMe over M.2 or U.2 (using PCI Express 4.0 ×4 link): 64 Gbps
- NVMe over M.2 or U.2 (using PCI Express 5.0 ×4 link): 128 Gbps

When purchasing storage devices like SSDs, mix use of terms like NAMe, SATA, M.2, might make people confused. Here is a quick summary of their differences and relationships: 

- NVMe is a protocol for access of non-volatile memory via the PCI Express bus.
- SATA can refer to both SATA protocol and physical interface (SATA port/cable).
- M.2 is just a form factor or physical interface. M.2 slots can support both SATA and NVMe. 

  In short, NVMe SSD drives typically use the M.2 form factor, but some SATA SSD may also come with M.2 form factor. As you can see from above, the speed limit of SATA is significantly lower than NVMe. For modern high end SSDs, in order to fully utilize the read/write potential, NVMe interface is recommended. 

## USB

Universal Serial Bus (USB) is the most common interface to extend a PC. The naming of different USB versions was most confusing and leads to misunderstandings among consumers. E.g., USB 3.0, USB 3.1 Gen 1, and USB 3.2 Gen 1 are actually the same thing. Here are a list of bit rates of different USB versions (with their old names).

- USB 2.0: 480 Mbps
- USB 3.2 Gen 1 (USB 3.0, USB 3.1 Gen 1): 5 Gbps
- USB 3.2 Gen 2 (USB 3.1, USB 3.1 Gen 2): 10 Gbps
- USB 3.2 Gen 2x2 (USB 3.2,): 20 Gbps
- USB4 Gen 2x2 (USB 20Gbps): 20 Gbps
- USB4 Gen 3x2 (USB 40Gbps): 40 Gbps
- USB4 Gen 4 (USB 80Gbps): 80 Gbps

USB also come with different connectors (USB type A, B, C). With the same USB type C connector, the supported USB protocol version can be different. This is something to keep in mind when purchasing USB devices/cables. 

## Ethernet
 
Ethernet is the standard for wired local network connections. Gigabit Ethernet (with a bit rate of 1 Gbps) is the most popular many home and office setups. In recent years, [multi-gigabit ethernets]({% post_url 2020-04-18-multi-gigabit-network %}) (e.g. 2.5 Gigabit ethernet) are becoming more and more popular as the equipments gets more affordable. When building a [home NAS]({% post_url 2020-05-18-nas-raid %}), choosing a server with 2.5G or even 5G, 10G ethernet interface helps you to access your fast SSDs with better speed. 

One thing to notice is that the bandwidth of ethernet is also limited ethernet cable types and cable length. The most common cable categories include:

- **Cat 5e**: Up to 1 Gbps
- **Cat 6**, **Cat 6a**: Up to 10 Gbps. Cat 6 supports 10 Gbps up to 55m. 
- **Cat 8**: Up to 40 Gbps at 30 meters. 

Cat 7 is skipped here mainly because it's not really a standard approved by IEEE and EIA (Electronic Industries Alliance). In home setups, Cat 6a should be enough while for more demanding application we should just consider Cat 8 instead.

## Video Output

 The last category of interfaces I want to mention here is the video output interfaces. With higher resolution (4k or even 8k) monitors, TVs going into the market, the demand on video output bandwidth is also growing. Here just list the bit rates of some common video interfaces for reference. 
 
- HDMI 1.3: 10.2 Gbps
- HDMI 2.0: 18 Gbps
- HDMI 2.1: 48 Gbps
- DisplayPort 1.2, 1.2a: 21.6 Gbps
- DisplayPort 1.3, 1.4: 32.4 Gbps
- DisplayPort 2.0: 80 Gbps
- Thunderbolt 3: 40 Gbps

## Conclusions

This post summarizes common wired interfaces and their bit rates. When talking about a communication interface, protocol and form factor are the two pillars. Communication protocols define how data is exchanged, while form factor determines the physical attributes and connectors used for communication interfaces, ensuring compatibility and standardized connectivity between devices.  As we already see from the discussions above, as communication standards keep evolving, it's common that one form factor may support different protocols. E.g. USB type C can supports from USB 2.0 to USB4 or even Thunderbolt protocols, M.2. can support both SATA and NVMe. This may cause some confusions among consumers. I hope this post helps you to get better understanding of the specs of computer hardwares on the market and make better decisions. 

## References

1. [Wikipedia: List of interface bit rates](https://en.wikipedia.org/wiki/List_of_interface_bit_rates)
2. [Wikipedia: UCIe](https://en.wikipedia.org/wiki/UCIe)
3. [Wikipedia: Compute Express Link](https://en.wikipedia.org/wiki/Compute_Express_Link)
4. [Apple introduces M2 Ultra](https://www.apple.com/newsroom/2023/06/apple-introduces-m2-ultra/)
5. [What is Cat7 - And Why You Don’t Need It](https://www.cablematters.com/Blog/Networking/what-is-cat7-and-why-you-don-t-need-it)

{% include js-mathjax.html %}