---
title: "NixOS on the desktop"
description: "Fixes from running NixOS with COSMIC on Wayland on a ThinkPad, including a Razer Core X eGPU with an NVIDIA RTX card and Handy speech-to-text."
order: 3
---

My laptop runs NixOS with the COSMIC desktop on Wayland, connected to a Razer Core X eGPU. When something on that setup doesn't work, I write down how I tracked it down, layer by layer, with the NixOS config that fixed it. The snippets are NixOS, but the debugging steps apply to most Linux distributions.
