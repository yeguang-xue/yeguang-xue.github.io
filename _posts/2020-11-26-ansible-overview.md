---
layout: post
title: IT Automation with Ansible
category:
  - Technical
tags:
  - Homelab
  - Linux
  - DevOps
license: CC-BY
last_modified_at: 2024/02/02
---

Automation has always been the dream of any IT person. Today, requirements of fast deployment and iterations further advance the development of IT automation tools. Among the popular automation tools, Ansible is one of the simplest while still providing rich set of functions. Here I would like to give a quick overview of this powerful tool.

## Why Ansible? 

To answer the question why using Ansible, we first need to understand what's wrong without Ansible. Without Ansible, we can still do IT automation using our own shell/python scripts, and actually I myself had been doing things this way for a long time before I tried Ansible. The pain point in such approach is that you need to handle numerous details not directly related to the tasks. E.g., you need to take care of the script uploading, execution, and logging; You need to write code to adapt to each specific environment. As the complexity of tasks increases, the automation script will quickly grow in size. Without careful design the automation scripts will soon be hard to maintain or reuse. Ansible provides an abstraction to hide many details mentioned above, letting us focus on the management tasks. E.g., Ansible greatly simplifies the process of grouping of an inventory of servers/VMs, connecting to a selection of machines and execute commands/modules over SSH. It is designed to be simple and even small personal projects or homelab can benefit from Ansible.

## Syntax

Before further diving into Ansible itself, let me briefly cover the syntax used by Ansible playbooks (the configuration management language of Ansible). 

Ansible uses [YAML](https://yaml.org) formats for almost all its configurations. Many in web development field may have already been familiar with JSON, YAML is yet another similar format for describing data, but intended to be more human-readable. E.g., Python style indentation is used to indicate nesting. Lists and dictionaries are still key data structures. List members are denoted by leading hyphen (-) and Key/value pairs are separated by colon space (colon must be followed by space). Full spec of YAML format can be found on the official YAML web site [1]. 

[Jinja2 templating](https://jinja.palletsprojects.com) is another language used in Ansible to enable dynamic expressions and some programming features. Right, if you have used [Flask](https://flask.palletsprojects.com) before, you should already be familiar with this templating engine. The most commonly used features in Ansible include: 

- \{\{ ... }} for expressions to print to output. E.g., a variable can be put inside double-curly braces, and later it will be replaced by its value. 
- **Filters** are used to modify variables and are separated from the variable by a pipe symbol (\|). Filters are handy for text manipulation, pattern matching/search/replace, and much more.  
- **Tests** are used to test a variable against a common expression. They are useful in conditionals which will be introduced later. 

Note that Ansible not only include standard filters/tests shipped with Jinja2, but also add lots of additional Ansible specific filters/tests. Check both Jinja2 Docs[2] and Ansible User Guide[3] when you try to find a specific filter/test that suites your problem.

## Key Concepts

Now let's come back to Ansible. There are tons of good resources for introduction of Ansible, so here I just hope to outline some key concepts.

As I mentioned early, Ansible is designed to be simple and requires minimal dependencies. It is only required to be installed on a **Controlled Node**, and all remote hosts will be managed through SSH (most commonly).

**Inventory** is a list of remote hosts to be managed, including the hostnames and other meta info. In the inventory file, remote hosts can be grouped so that you can easily apply different management tasks on different groups, or intersection/union of multiple groups. 

Once you the inventory ready, you can already apply ad-hock commands on a single host or a group of hosts. The units of code in Ansible is called **Modules**, which are predefined task. Ansible comes with lots of pre-defined modules for various tasks. E.g., `ping` module is used to test connection with remote hosts:

```shell
ansible webservers -m ping
```

In latest Ansible version (2.10), modules are grouped into **Collections** with different namespaces. E.g., `ping` module belong to `Ansible.Builtin` collection.

In real-life scenarios, we typically need to define a list of tasks for more complicated applications and **Playbook** is exactly for this purpose. In last section, we already covered the YAML syntax for Ansible playbooks. An Ansible playbook contains an ordered lists of tasks that can be saved and run repeatedly. Moreover, playbooks can realize dynamic features by harnessing the power of variables, conditionals, and loops. And one can further modularize the tasks with **Roles**. 

## Conclusion

Though there's much we didn't cover in this post, simply with the concepts/knowledge above, we are already capable of dealing with many common IT automation tasks in Ansible, and get rid of some tedious shell/python scripts. And don't forget there's [Ansible Galaxy](https://galaxy.ansible.com) where lots of roles and playbooks shared by community can be found. 

## References

1. [YAML 1.2 Specification](https://yaml.org/spec/1.2/spec.html)
2. [Jinja Template Designer Documentation](https://jinja.palletsprojects.com/en/2.11.x/templates/)
3. [Ansible User Guide](https://docs.ansible.com/ansible/latest/user_guide/)
4. [Ansible Collection Index](https://docs.ansible.com/ansible/latest/collections/index.html)