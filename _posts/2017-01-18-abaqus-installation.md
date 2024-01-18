---
layout: post
title: "Abaqus 2016 Installation on Linux: Issues and Solutions"
category:
  - Technical
tags:
  - Abaqus
  - Linux
license: CC-BY
---

Recently, I installed Abaqus 2016 on a few different Linux Distros for workstations in my lab and my PC. Here's a summary of the issues I encountered and my solutions.

## Unsupported Linux Distribution

ABAQUS 2016 officially only has support for SUSE and Red Hat (and CentOS). By default, the installer runs a prerequisites check and an error will return if you runs an unsupported Linux release. I have Fedora 25 for one of my PCs and I successfully installed Abaqus 2016 on it using the following workaround.

The Abaqus installer get the release info using the script located at `<installer_dir>/Linux64/1/inst/common/init/Linux.sh`. I overrode the command to obtain the OS release using

{% highlight bash%}
DSY_OS_Release="CentOS"
{% endhighlight %}

I chose CentOS because Fedora is close to Red Hat Linux. I also disabled other system checks by defining environmental variable `DSY_Skip_CheckPrereq` in the shell before the installation.

{% highlight bash%}
export DSY_Skip_CheckPrereq=1
{% endhighlight %}

To satisfy the prerequisites of Abaqus, some additional packages must be installed. For example, the `libstdc++.so.5` can be installed by

{% highlight bash%}
sudo dnf install compat-libstdc++-33
{% endhighlight %}

Now you should be able to install Abaqus on your favorite Linux distribution.

## Graphical Issues

I failed to start the Abaqus/CAE when the installation done. I got an "X Error" telling me "fmd_GLContext::create(): glXCreateContext() failed". My Nvidia driver version was 375.26. I found my problem similar to [this post](https://polymerfem.com/forum/finite-element-modeling/computer-software-aa/3288-glx-error-when-launching-abaqus-on-debian). They also gave a suggestion to run Abaqus using

{% highlight bash%}
XLIB_SKIP_ARGB_VISUALS=1 abaqus cae -mesa
{% endhighlight %}

This works, however, at the price of disabling the hardware acceleration. After some research online, I found this error was related to the indirect GLX rendering. In recent versions, `Xorg` changed its behavior to disallow indirect GLX by default, probably due to some security concerns.

I tried a few different methods to re-enable the indirect GLX rendering, including modifying the `xorg.conf` and adding `serverargs` in `startx`, but all failed. Finally I found solution in [this post](https://bugzilla.gnome.org/show_bug.cgi?id=586777) to add a wrap for `Xorg` command. Slightly different in my Fedora 25, my `/usr/bin/Xorg` is already a wrap, so I simply added the "+iglx" argument in the script:

{% highlight bash%}
exec "$basedir"/Xorg "$@" +iglx
{% endhighlight %}

Might not be a perfect solution, but hey, now Abaqus can be run natively on my Nvidia GTX 1080!

## Fonts Issues

The fonts in my Abaqus/CAE GUI was extremely small and ugly at first. I solved it by installing the 100dpi font in my system:

{% highlight bash%}
sudo dnf install xorg-x11-fonts-ISO8859-15-100dpi-7.5-16
{% endhighlight %}

I have no idea why this works and I still don't know how to switch to other fonts. Let me know if you have better ideas about that.
