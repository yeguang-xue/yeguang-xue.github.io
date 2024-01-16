---
layout: post
title: Resize Virtual Machine Disk Size (KVM)
category:
  - Technical
tags:
  - Homelab
  - Linux
  - Virtulization
license: CC-BY
last_modified_at: 2024/01/15
---

When using VMs, we often run into situations that requires expanding the disk size. This post summarizes steps to resize a disk attached to `libvirt` managed VM. 

#### On Host Machine:
 
1. Shutdown virtual machine
```shell
virsh shutdown guest-vm
```

2. Resize virtual disk
```shell
sudo qemu-img resize /site/vm/guest-disk.qcow2 +10G
```

3. Restart VM and update 
```shell
virsh start guest-vm
```

#### Inside Virtual Machine:

In some cases, within the VM, filesystem needs to be updated to take advantage of the expanded disk space. For disk type='volume', VM filesystem seems to grow automatically. 

For `Btrfs` based filesystem, follow the following commands:
```shell
sudo fdisk /dev/vda # remove old partition, add new partition. 
sudo btrfs filesystem resize +10g /
```

On LVM managed filesystem, 
```shell
sudo growpart /dev/vda3
sudo pvresize /dev/vda3
sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```

To validate the filesystem is successfully resized:
```shell
lsblk
```