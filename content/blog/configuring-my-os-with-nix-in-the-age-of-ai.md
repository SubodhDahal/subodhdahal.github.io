---
title: "Why I let AI agents change my OS only through Nix"
description: "AI agents make it trivial to change your operating system and hard to remember what they changed. Here's why I manage NixOS and macOS from one Nix config in Git."
image: /images/nix-declarative-os-config.png
alt: "An orange robot arm writes a code diff on a sheet wired by cables to two laptops, with a stack of saved snapshots behind it"
postDate: 2026-11-26
seo:
  title: "Configuring NixOS and macOS with Nix and AI agents"
topic: nixos
tags:
  - nixos
  - nix
  - nix-darwin
  - ai
  - developer productivity
---

With an AI agent, I can change almost anything on my operating system without knowing much about what's happening. That's great until something breaks three months later and nobody, including the agent, remembers what it touched.

My answer is to let agents change my system only through Nix. Each change is code in a Git repository and each rebuild is a snapshot I can boot back into. The same config also runs my NixOS laptop and my work Mac.

The first section is how I got here, starting with the time I broke a friend's computer. If you only want the AI agent part, [skip to letting agents change the OS through Nix](#letting-ai-agents-change-my-os-only-through-nix).

## How I ended up configuring my OS with Nix

### Deleting system32 taught me that a reinstall fixes everything

When I was in school, I advised a friend to delete the system32 directory on his Windows ME computer to reclaim space. My reasoning was that he wasn't using the applications in there, so they didn't need to be there. (I was sure about this.)

Windows ME did have a feature called System File Protection that quietly restored about 900 core files if something deleted them, but it didn't warn us and it didn't save us. The files disappeared, and everything seemed to work for the rest of that session. The next time we turned the computer on, we were horrified. We couldn't log in and nothing was working.

I was afraid I had turned his computer, which was a luxury in Nepal at that time, into basically a hunk of junk. I wasn't there when he told his parents, but I doubt they were happy. A technician came a few days later. Once my friend told him what we had done, he figured a reinstall was the only way, and the guy just reinstalled the operating system. That was it.

I felt relieved, and also happy to learn that the software side of a computer wasn't that scary. Almost anything could be undone with a fresh install.

When I later got my own computer, I used that lesson to tinker. I was running Windows like most people, installing apps and poking around in settings, and if I broke something I couldn't fix, I reinstalled. We didn't have files that needed to persist, so formatting the whole drive didn't cost anything. It let me learn a lot about computers and taught me that messing up was rarely a disaster.

### Reinstalling stopped being an option

During my bachelor's studies, I installed Linux on my laptop. It felt scary at first because everything was different from Windows, and there was still the idea that Linux was hard. But I knew I could reinstall if I broke something.

By then I kept my important data on an external hard disk and on a separate data partition. I could wipe the operating system partition and leave the data alone.

As I got busier with studies and later work, I stopped having the time to reinstall every time I messed something up. So I started keeping notes about what I changed, so I could revert it.

Back then, Linux needed a lot of tweaking for specific hardware because things didn't work out of the box. When I bought my ThinkPad X1 Extreme Gen 1, its built-in NVIDIA GPU didn't work by default. I found a blog post from someone who had figured it out and made the few tweaks they described. They worked.

I don't remember much more about what I changed, and that's the problem. Fixes like that solved the problem I had, and then at some point in the future something else broke because of them, either because the operating system changed underneath or because I changed something else. That was always hard to track down months or years after I'd made the change. My notes never had enough detail. I wanted a system where I could make changes, see exactly what I'd changed, and get back to the previous state when something new broke.

### Finding Nix, and bouncing off it

That's when I came across [Nix](https://nix.dev/), a package manager with its own language for describing builds, and [NixOS](https://nixos.org/), the Linux distribution built on it. You describe your whole system (packages, services, users, settings) in files written in the Nix language, and Nix builds the system from that description.

It looked like exactly what I was looking for. I watched a few videos and skimmed through the manual. There were a lot of new concepts and a lot of barriers before I could do anything useful, and I decided Nix was too complicated before I'd installed anything. So I never tried it.

### LLMs got me over the learning curve

Then LLMs came along, and writing code where you describe what you want and get it done became much easier.

That's when I went all in. My dotfiles repository has commits going back to 2019, but the first Nix commit is from August 2025. I was still on Fedora at the time, so in early September I started from a starter configuration and used Nix with Home Manager just to install packages and manage my user setup. Twelve days later the laptop was running NixOS, and I was configuring the whole operating system in Nix.

I had a lot of help from LLMs, because there were so many things I didn't know. Nix also changes between versions, so what worked in a tutorial a year ago sometimes doesn't work now. The LLMs were good enough to figure out what was breaking and fix it, which is the part I would have given up on alone.

### One Nix config for my NixOS laptop and my work Mac

I first used Nix only on my personal laptop. Then I found [nix-darwin](https://github.com/nix-darwin/nix-darwin), which lets you install packages and manage a good part of the system configuration on macOS with Nix too.

That solved a small but constant annoyance. I'd discover a tool on the weekend on my personal laptop, then reach for it on Monday on my work Mac and realize it wasn't installed or configured there. It's not a big problem, but it happened all the time.

With one flake, I now describe both machines and share most of the configuration between them. The layout looks like this:

```
nix/
├── flake.nix           # nixosConfigurations + darwinConfigurations
├── hosts/
│   ├── nixos/          # laptop: hardware, NVIDIA, eGPU, services
│   └── darwin/         # work Mac: system defaults, Homebrew casks
├── modules/profiles/   # minimal, workstation, server
├── lib/                # builders and shared Home Manager config
└── pkgs/               # packages I build myself (more on that below)
```

The shared profiles contain the packages and settings both machines need. The `hosts/` directories only contain what's specific to that machine, like the [eGPU fixes on the laptop](/blog/razer-core-x-egpu-hotplug-nixos/).

## Letting AI agents change my OS only through Nix

When I had lots of free time, I could try out new distros and desktop environments, then switch back. With adult responsibilities, getting something new set up and figuring out its issues takes time I rarely have.

Now I point my agent at my Nix config and some documentation, describe what I want, and it figures out what to change. In November 2025 my config gained a switch between GNOME, Hyprland and COSMIC, so trying a desktop became a one-line change and a rebuild. A month later COSMIC became the default, and it still is. This is the part I care about most.

### Why direct changes from an agent are hard to track

Plenty of people use AI agents to change their operating system directly: run this command, edit that file in `/etc`, install this package. It often works. But if you make a lot of changes that way, it's hard to keep track of what the agent did, and you're back to my old problem of a fix from months ago breaking something today.

### Every agent change is a Git diff I can read

With Nix, the agent's changes show up as a diff in my config repository. I read the diff before I rebuild, and most of the time it's easy to understand. Even when I don't understand every line, I at least get a sense of what's happening, and it's in Git if I need to come back to it later.

Here's a real one. My [eGPU only worked if I timed switching it on against booting the laptop](/blog/razer-core-x-egpu-hotplug-nixos/), and in November 2026 I asked Claude to fix it. The fix touched one file, `egpu.nix`, with 20 lines added and 2 removed. It replaced a kernel parameter that reserved a 4-gigabyte memory window the firmware could never place with smaller windows that fit, and it added a udev rule to create the `/dev/nvidia` device node when the driver binds to a hotplugged card. The commit message explains both changes, so future me knows why they're there.

The more interesting commit came the same day. While we were in that file, the agent noticed `pcie_aspm=off` in my kernel parameters. My laptop's firmware already tells the kernel it doesn't support power management on PCIe links (ASPM), so the kernel turns it off anyway and the flag did nothing. I had added it in December 2025, during my first round of eGPU troubleshooting, and forgotten about it. That's exactly the kind of leftover fix I used to lose track of on Fedora. This time the flag was one line in a file I could read, a commit told me when it arrived, and removing it took a one-line diff.

### Rolling back to a previous NixOS generation

If a rebuild breaks something, NixOS keeps each rebuild as a generation until I garbage-collect it. I can pick a previous generation from the boot menu, or roll back from a terminal:

```bash
# Switch back to the previous NixOS generation
sudo nixos-rebuild switch --rollback
```

When I started writing this post, my laptop had 128 generations going back to September 2025, and the boot menu shows the last 10. (That number turned out to be a bug, more on that in the trade-offs.) Most of them I'll never need, but the one I need is always there. From the last working state, I can either leave the change out or hand the broken diff to the agent and let it debug.

For someone like me who likes having tools set up the way I want rather than the default way, this combination is what makes tinkering safe again. It's the closest I've gotten to the "just reinstall" safety net I had as a kid, without losing anything.

## Trade-offs of managing my OS with Nix

Nix still has a barrier to entry, even with an LLM next to you. These are the things that bother me.

### nixpkgs has the most packages, but some lag behind

According to [Repology](https://repology.org/repositories/statistics/total), nixpkgs unstable has about 121,000 projects, more than any other repository, and about 86% are at the newest version. The other 13,000 or so wait until a contributor updates them. (The project has also had [its share of leadership drama](https://lwn.net/Articles/970824/), but that was about governance, not packages.)

### Packaging from GitHub releases is yours to maintain

When a package is out of date, my agent packages it from the project's GitHub releases. Six of my 13 custom packages, including [Worktrunk](/blog/worktrees-with-worktrunk/), work this way. (I'm now the maintainer of six packages I never meant to maintain.) When their dependencies change, I have to ask the agent to fix them again.

### Upstream flakes can mean building locally

When a project publishes its own Nix flake outside nixpkgs, the official binary cache doesn't cover it. Unless the project runs its own cache, you build it yourself, and that can take a long time.

### Programs downloaded from the internet don't run as is

NixOS has no `/lib` or `/usr/lib`, so programs built for other distributions fail with `cannot execute: required file not found`. I work around it with `nix-ld` for Python wheels, `autoPatchelf` for one GitHub release package, and a wrapper for [Handy](/blog/handy-speech-to-text-nixos-cosmic-egpu/) that lists 18 libraries its AppImage expects. On other distributions, you'd download the file and run it.

### Old generations fill the disk unless you clean them up

Each generation keeps its packages around, and builds leave leftovers, so the Nix store grows with every rebuild. Mine had filled 84% of my disk.

My config runs the garbage collector weekly, so I thought I had this handled. While researching this post, I found out why I still had 128 generations: the job had been failing every week, before it collected anything.

```
error: invalid number of days specifier '1w', expected something like '14d'
```

It only understands days, so `1w` had to be `7d`. (So much for reading every diff.) Running `nix-collect-garbage` by hand afterwards deleted 35,749 store paths and freed 84.6 GiB, which took the disk down to 72%. Nix also hard-links identical files, and that was already saving another 111 GiB.

### Config changes need a rebuild, so some dotfiles stay in GNU Stow

Changing a config managed by Nix needs a rebuild, and for a tool I'm still experimenting with, that's enough friction to stop me from trying things. So when I start using a new program, its config files (dotfiles) start in [GNU Stow](/blog/effortless-configuration-syncing-with-gnu-stow/), and move into Nix once I stop changing them. Both live in the same repository, so it doesn't matter much which one manages a file.

## Conclusion

The kid who deleted system32 learned that a reinstall could undo almost anything. My friend and I aren't in touch anymore, and I suspect he took a different lesson from it, since he never got into working with computers the way I did.

Nix gave me that safety net back, without the blank disk. Every change, mine or an agent's, is a diff I can read, and every rebuild is a generation I can roll back to. The barrier to entry is real. But if you like tinkering and you're letting AI agents change your system, it's the best way I've found to keep track of what they did.

Next, I'd like to move the Ubuntu VMs on my [home server](/topics/self-hosting/) to Nix, or to NixOS altogether. They run services I depend on, and the server can't run a test VM next to them, so with hardware prices what they are, that'll probably wait until I get a more powerful machine.
