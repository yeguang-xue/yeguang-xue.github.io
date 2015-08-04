---
layout: post
title: Course Notes for Udacity CS262 "Programming Languages" Lesson 1
location: Evanston
tags:
  - CS
---

### Claim

All notes are from Udacity online course [CS262 Programming Languages](https://www.udacity.com/course/programming-languages--cs262)

### Python Basic String Functions

* Finding a pattern

Python's **string.find** function

{% highlight python %}
>>> "Hello world".find(" ")
5
>>> "1 + 1=2".find("1", 2) # find starting from position 2
4
{% endhighlight %}

* Selecting substrings

{% highlight python %}
>>> 'hello'[1:3]
'el'
>>> 'hello'[1: ]
'ello'
{% endhighlight %}

* Splitting words

Python's **string.split** function

{% highlight python %}
>>> "Jane Eyre".split( )
["Jane", "Eyre"]
{% endhighlight %}

### Regular Expression

* Python RE functions

**re.findall** function in Python's regular expression module

{% highlight python %}
>>> re.findall(r"[0-9]", "1 + 2 == 3")
['1', '2', '3']
{% endhighlight %}

* RE Basic Patterns

  + . (a period) -- matches any single character except newline '\n'
  + **\w** -- (lowercase w) matches a "word" character: a letter or digit or underbar [a-zA-Z0-9_]. Note that although "word" is the mnemonic for this, it only matches a single word char, not a whole word. **\W** (upper case W) matches any non-word character.
  + **\b** -- boundary between word and non-word
  + **\s** -- (lowercase s) matches a single whitespace character -- space, newline, return, tab, form [\n\r\t\f]. **\S** (upper case S) matches any non-whitespace character.
  + **\t**, **\n**, **\r** -- tab, newline, return
  + **\d** -- decimal digit [0-9] (some older regex utilities do not support \d, but they all support \w and \s)
  + **^** = start, **$** = end -- match the start or end of the string
  + **^** used just inside [square brackets] only means "not" or "set complement" or "everything except".
  + **\\** -- inhibit the "specialness" of a character. So, for example, use \\. to match a period or \\\\ to match a slash. If you are unsure if a character has special meaning, such as '@', you can put a slash in front of it, \@, to make sure it is treated just as a character.

  {% highlight python %}
  r"[0-9]" # matches all one digit number
  r"[a-c][1-2]" # concatenation
  r"a+" # one or more with +,  matches 'a', 'aa', 'aaa', ...
  {% endhighlight %}

* RE Repetitions

  + **+** -- 1 or more occurrences of the pattern to its left, e.g. 'i+' = one or more i's
  + **\*** -- 0 or more occurrences of the pattern to its left
  + **?** -- match 0 or 1 occurrences of the pattern to its left

  {% highlight python %}
  r"a+" # one or more with +,  matches 'a', 'aa', 'aaa', ...
  {% endhighlight %}

* RE Disjunctions

This vertical bar means matching either the thing on the left or the thing on the right.

{% highlight python %}
r"[a-z]+|[0-9]+" # match [a - z]+ or [0 - 9]+.
{% endhighlight %}

* RE Structures

Groupings in regular Expressions.

{% highlight python %}
>>> re.findall(r"(?:do+|re+|mi)+","mimi rere midore doo-wop")
["mimi", "rere", "midore", "do"]
{% endhighlight %}

### Finite State Machines

Finite state machine can be a visual representation of this regular expression. It contains states and edges( or transitions).

* Epsilon, Ambiguity and Nondeterminism

**Non-deterministic FSM** VS **lock-step FSM**: Every non-deterministic finite state machine has a corresponding deterministic finite state machine that accepts exactly the same strings

Example:

![](https://lh3.googleusercontent.com/4EtDF_tbvlSqla-r_RiX0w2v8dpnDfxk1Mccu9DJdrTYuZd9AReP47VCyu1QIDRSQcbT1yc266u09H1J0N5h)

![](https://lh3.googleusercontent.com/4QO7wmALno_zTAcHwlf39xeGX5y5lfxXGsN8iiXLe8N_I36tVKiP1N9rg2tKIpTzpaEP-W3qfDRAulxq6wU)

* FSM Simulator

{% highlight python linenos%}
# FSM Simulation

edges = {(1, 'a') : 2,
         (2, 'a') : 2,
         (2, '1') : 3,
         (3, '1') : 3}

accepting = [3]

def fsmsim(string, current, edges, accepting):
    if string == "":
        return current in accepting
    else:
        letter = string[0]
        # QUIZ: You fill this out!
        # Is there a valid edge?
        if (current,letter) in edges:
        # If so, take it.
            current=edges[(current,letter)]
            return fsmsim(string[1:], current, edges, accepting)
        # If not, return False.
        else:
             return False
        # Hint: recursion.

print fsmsim("aaa111",1,edges,accepting)
# >>> True
{% endhighlight %}


{% highlight python %}
{% endhighlight %}
{% highlight python %}
{% endhighlight %}
{% highlight python %}
{% endhighlight %}
{% highlight python %}
{% endhighlight %}
