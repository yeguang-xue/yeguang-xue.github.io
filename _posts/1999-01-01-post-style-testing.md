---
layout: post
title: "Post Style Testing"
category:
  - Technical
tags:
  - Test
license: CC-BY
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Example of Video

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<div class="ratio ratio-16x9 mb-3">
<iframe src="https://www.youtube.com/embed/THuuYpEgfeU?rel=0" allowfullscreen></iframe>
</div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Example of Image Card

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

<div class="card mb-3">
  <img class="card-img-top" src="https://i.postimg.cc/zGX60FDm/station-1.jpg" alt="a image">
  <div class="card-body">
    <p class="card-text text-start">a image</p>
  </div>
</div>

## Example of Code Snippet

```bash
gdisk /dev/sda
rsync -anv dir1/ dir2
rsync -anv dir1/ dir2
```

## Example of Latex

$$ \frac{x}{y} $$

## Example of Mermaid

<pre class="mermaid">
flowchart LR
    subgraph WAN
        Internet{{Internet}} --- router1[🛜 TP-Link BE9300]:::network-essential
    end
    subgraph LAN Untrusted 192.168.0.0/24
        router1 -.- laptop([💻 Laptop])
        router1 -.- phone([📱 Smart Phone])
        router1 -.- iot1([🔉 Smart Speaker])
        router1 --- rpi1[Pi-Hole DNS1]:::network-essential
        router1 --- router2[🛜 TP-Link AC1750]:::network-essential
        
    end
    subgraph LAN Homelab 192.168.100.0/24
        router2 --- switch1[Netgear Switch]:::network-essential
        switch1 --- server1[(NAS Server)]:::network-servers
        switch1 --- server2[(PvE Server)]:::network-servers
        switch1 --- workstation1[(Workstation)]:::network-servers
        router2 -.- laptop2[💻 Laptop]
    end
    classDef network-essential fill:#f96
    classDef network-servers fill:#9f9
</pre>

{% include js-mathjax.html %}
{% include js-mermaid.html %}