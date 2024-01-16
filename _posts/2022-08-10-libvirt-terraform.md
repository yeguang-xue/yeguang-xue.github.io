---
layout: post
title: Provision libvirt VMs with Terraform
category:
  - Technical
tags:
  - Homelab
  - Linux
  - Virtulization
  - DevOps
license: CC-BY
last_modified_at: 2024/01/15
---

Terraform is a well-known open-source infrastructure as code (IaC) tool developed by HashiCorp. It allows users to define and provision infrastructure using a declarative configuration language. In homelab environment, it can also interacts with Linux `libvirt` hypervisor with the help of [a third-party provider](https://registry.terraform.io/providers/dmacvicar/libvirt/latest/docs).  This greatly simplifies the homelab VM management with a unified IaC language that can also be used to provision resources on public cloud like AWS, Azure and GCP. In this post, I will briefly introduce how to install `libvirt` on major Linux distros, and how to use terraform to interact with `libvirt` to create/provision VMs. 

#### Install `libvirt` 

For Ubuntu,
```shell
sudo apt install qemu-kvm libvirt-daemon-system genisoimage
sudo apt install virt-manager
```

For CentOS like,
```shell
sudo yum module install virt
sudo yum install virt-install virt-viewer
sudo systemctl start libvirtd
```

After installation, `virt-host-validate` helps to verify the system is prepared to be a virtualization host.

To manage virtual machines without `sudo`, make sure the user is added to the group `libvirt`. 
```shell
sudo adduser $USER libvirt
```

`virsh` is the command line utility to manage VMs. Common use cases include:

- List running VMs: `virsh list`
- Start, shutdown, reboot VMs
- Delete VM: `virsh undefine <VM name>`

In my use cases, `virsh` is used mainly to monitor the VMs. In most situations I prefer to provision VMs with Terraform. 

#### Terraform

To install terraform, simply download the binary (https://developer.hashicorp.com/terraform/install) and place the executable at a location available on your `$PATH`. The official website also have a list of [tutorials](https://developer.hashicorp.com/terraform/tutorials) to cover the basics of terraform. 

For `libvirt` provider, a template configuration file I used to create VMs is shown below. 

```terraform
terraform {
  required_providers {
    libvirt = {
      source = "dmacvicar/libvirt"
    }
  }
}

provider "libvirt" {
  uri = "qemu:///system"
}

locals {
  vm_name = "dev1"
  ip_addr = "192.168.122.71"
}

resource "libvirt_pool" "server_pool" {
  name = "pool-${local.vm_name}"
  type = "dir"
  path = "/home/yeguang/libvirt_pool/pool-${local.vm_name}"
}

resource "libvirt_volume" "ubuntu_base" {
  name   = "ubuntu.qcow2"
  pool   = libvirt_pool.server_pool.name
  source = "${path.module}/jammy-server-cloudimg-amd64.img"
  format = "qcow2"
}

resource "libvirt_volume" "server_disk" {
  name           = "disk.qcow2"
  size           = 10740000000
  pool           = libvirt_pool.server_pool.name
  base_volume_id = libvirt_volume.ubuntu_base.id
}

resource "libvirt_cloudinit_disk" "commoninit" {
  name           = "commoninit.iso"
  user_data      = templatefile("${path.module}/config/cloud_init.cfg", { hostname = local.vm_name })
  network_config = templatefile("${path.module}/config/network_config.cfg", { ip_addr = local.ip_addr })
  pool           = libvirt_pool.server_pool.name
}

resource "libvirt_domain" "vm" {
  name      = local.vm_name
  memory    = "8192"
  vcpu      = 4
  cloudinit = libvirt_cloudinit_disk.commoninit.id

  cpu {
    mode = "host-passthrough"
  }

  disk {
    volume_id = libvirt_volume.server_disk.id
    scsi      = "true"
  }

  network_interface {
    bridge = "virbr0"
  }

  console {
    type        = "pty"
    target_type = "serial"
    target_port = "0"
  }
}
```

`cloud_init.cfg` is used to initialize users, groups, and ssh_authorized_keys. Some examples can be found here: https://cloudinit.readthedocs.io/en/latest/reference/examples.html

`network_config.cfg` is used to initialize network interfaces. The template I use is the following:
```config
version: 2
ethernets:
  eth:
    match:
      name: en*
    dhcp4: no
    optional: true
    addresses: [${ip_addr}/24]
    gateway4: 192.168.122.1
    nameservers: 
      addresses: [192.168.122.1]
```

Note in terraform I used `templatefile` function to reuse the same `network_config.cfg` when provisioning multiple VMs. 

After `cd` into the folder, `terraform init` will install the required provider plugin `dmacvicar/libvirt`. To apply the config and create VM, first preview the changes with `terraform plan`. Once OK with the changes,  simply apply the config:

```shell
terraform apply
```

To destroy all the resources, just use `terraform destroy`. 

#### References

1. https://ubuntu.com/server/docs/virtualization-libvirt
2. https://developer.hashicorp.com/terraform/tutorials
3. https://registry.terraform.io/providers/dmacvicar/libvirt/latest/docs
4. https://github.com/dmacvicar/terraform-provider-libvirt/issues/546