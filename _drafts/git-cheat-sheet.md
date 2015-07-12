---
layout: post
title: "Git Cheat Sheet"
location: Evanston
tags:
  - CS
comments: True
---

This is a summary of common Git commands.

### Getting Started

Important first-time setup for Git

{% highlight bash %}
$ git config --global user.name [name]
$ git config --global user.email [email]
{% endhighlight %}

Some other setup commands

{% highlight bash %}
$ git config --list # Check all the basic setting
$ git config --global color.ui auto # Enables helpful colorization of command line output
$ git config --global core.editor emacs # Change default editor
{% endhighlight %}

Getting help

{% highlight bash s%}
git help [verb]
git [verb]   --help
{% endhighlight %}

To start, either we can create a repository

{% highlight bash %}
$ git init [project-name]
{% endhighlight %}

{% highlight bash %}
$ git clone [url]
$ git clone [url] [my folder]
{% endhighlight %}

###

{% highlight bash %}
$ git status
{% endhighlight %}

{% highlight sh %}
$ git diff
$ git diff --staged
{% endhighlight %}

### Make Changes

### References

1.  [Git Cheat Sheet](https://training.github.com/kit/downloads/github-git-cheat-sheet.pdf)
2. [Pro Git (Online Book)](https://progit.org/)
