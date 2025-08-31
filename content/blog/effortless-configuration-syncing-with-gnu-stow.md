---
title: "Effortless configuration syncing with GNU Stow and Git: a software engineer's workflow"
description: Use GNU Stow and Git to keep config files in sync across Linux and macOS. Keep them in one repo with full history, and set up new machines in minutes.
image: /images/configuration-management-across-os.jpg
alt: Supercharge your Dotfiles workflow
postDate: 2025-01-12
tags:
  - developer productivity
---

## Introduction

As a software engineer, I use my terminal, shell, and text editor every day. Each tool has its own config files, or **dotfiles**. Over time, I've tuned these files to fit how I work. Keeping them in sync across machines takes time and is easy to break. My laptop, home server, and work Mac all have their own setups. That's where **GNU Stow** and **Git** come in. They keep my configs neat and in sync. I've relied on this setup for over five years.

## What are dotfiles?

Dotfiles are config files that start with a dot, such as `.zshrc`, `.vimrc`, and `.gitconfig`. They control how your tools look and act. These files sit all over your home folder, so sorting them by hand is a chore. That becomes tedious when you use more than one machine. Putting them in one repo is the key to easy config handling.

## The tools: GNU Stow and Git

**[GNU Stow](https://www.gnu.org/software/stow/)** is a symlink manager. It takes dotfiles from one repo and links them into the folders you pick. Pair it with **Git**, and every change is easy to track and undo. Your setup then syncs across machines.

## Setting up my dotfiles

### 1. Centralized Repository
I keep my dotfiles in a private Git repo. The repo mirrors the layout of my home folder, so Stow can link files where they belong. Here's how I lay out configs for Zsh, Git, Tmux, and Vim (shortened for this post):

```bash
dotfiles
├── git
│   └── .gitconfig
├── tmux
│   ├── .tmux.conf
├── zsh
│   ├── .config
│   │   ├── aliasrc.sh
│   │   ├── custom_fns.sh
│   │   ├── env.zsh
│   │   ├── oh-my-posh
│   │   │   └── info.toml
│   └── .zshrc
└── vim
  └── .vimrc
```

### 2. Stowing and restowing configurations

A big plus of GNU Stow is that you can pick which configs go on which machine. My repo holds a folder for each tool, such as Zsh, Tmux, and Vim. When I set up a machine, I choose the folders I want and leave the rest.

For example, to apply my Zsh setup I run the `stow` command like this:

```bash
stow --target=/home/username zsh
```

This links my Zsh files into my home folder, including `.zshrc` and everything in `.config`.
When I add files or change a config, I restow the folder to apply the update:

```bash
stow -R zsh
```
This clears the old links and makes new ones, so nothing is stale.

### 3. Uninstalling configurations

To remove a config, such as Zsh, I run:

```bash
stow -D zsh
```
This deletes every Zsh link in my home folder but leaves the files in my repo alone. I can put them back anytime.

## Pro-tip: Simplify with `.stowrc`

By default, Stow links files into your current folder unless you set a target with `--target`. I got tired of typing `--target=$HOME` every time, so I made a `.stowrc` file in my repo:

```bash
--target=$HOME
```

Now Stow uses my home folder on its own, and you can track the file with Git too.

## Syncing with Git

Tracking dotfiles with Git has three big benefits:
- **Change history**: see every tweak I've made over the years and roll back if needed.
- **Sync across machines**: push changes to a private repo, then pull them onto any new machine.
- **Works on Linux and macOS**: the same setup works on both, and every machine stays in sync.

For instance, when I got a Mac at work, I cloned my dotfiles repo. After running `stow zsh`, my Zsh setup, aliases, and Oh My Posh theme were ready right away.

## More use cases for Stow

I use Stow for dotfiles, but it can handle any files that need symlinks. Some examples:
- Scripts live in a `bin` folder and link into `$PATH`.
- Config folders for tools like Docker or Kubernetes are easy to manage.
- You can test a new version of a config file without touching the current one.

## The benefits of this workflow

This setup changed how I manage configs. Here's what it gives me:
- My configs live in one place, so updates and backups are simple.
- Stow and Git get a new machine ready in minutes.
- After five years of tweaks, I can still look back at what I tried and what worked.
- The same setup works on Linux and macOS.

**GNU Stow** and **Git** make this whole setup possible. My configs stay in sync without much effort, and every machine ends up the same. Every tweak I make leaves a trail, so I can undo mistakes. That leaves me more time to build and solve problems.