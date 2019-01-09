---
layout: post
title: "Kernel Update without Reinstalling Nvidia Driver"
category:
  - How To
tags:
  - Linux
license: CC-BY
---

Fedora is always known as a cutting edge distribution with frequent updates. I love it so much expect when I have to reinstall my Nvidia driver everytime the kernel is updated. Recently I found a [solution](http://askubuntu.com/questions/492217/nvidia-driver-reset-after-each-kernel-update) online using [DKMS](https://github.com/dell/dkms). DKMS, short for Dynamic Kernel Module Support, is used to automatically recompiles all DKMS modules when installing a kernel upgrade, thus allowing the drivers to continue working.

For the Nvidia driver on Fedora, simply install the DKMS package and install the Nvidia driver with "-dkms" option.

{% highlight bash%}
sudo dnf install dkms
sudo sh ./<DRIVER>.run --dkms
{% endhighlight %}
