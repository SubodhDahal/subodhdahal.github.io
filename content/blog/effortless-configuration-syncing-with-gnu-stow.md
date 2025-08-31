---
title: "Effortless configuration syncing with GNU Stow and Git: A software engineer's workflow"
description: Discover how to manage and sync configuration files across Linux and macOS using GNU Stow and Git. Simplify your workflow with centralized, version-controlled setups.
image: /images/configuration-management-across-os.jpg
alt: Supercharge your Dotfiles workflow
postDate: 2025-01-12
tags:
  - developer productivity
---

## Introduction

As a Software Engineer, I rely on tools like my terminal, shell, and text editor daily, each with its own configuration files, or **dotfiles**. Over time, I’ve fine-tuned these files to optimize my workflow. But managing and syncing them across multiple machines—like my personal laptop, home server, and work Mac—can be a tedious, error-prone process. That’s where **GNU Stow** and **Git** come in, offering a simple, efficient way to keep my configurations consistent, organized, and version-controlled. Here’s how I’ve used this setup for over five years.


## What are dotfiles?

Dotfiles are the hidden configuration files (e.g., `.zshrc`, `.vimrc`, `.gitconfig`) that control the behavior and appearance of various tools. They are typically scattered across your home directory, making manual management cumbersome—especially across multiple systems. Organizing them into a centralized repository is the key to seamless configuration management.


## The tools: GNU Stow and Git

**[GNU Stow](https://www.gnu.org/software/stow/)** is a symlink manager that helps organize and deploy dotfiles from a single repository by creating symbolic links (symlinks) in your desired directories. Paired with **Git**, you can version-control your dotfiles, making it easy to track changes, roll back mistakes, and sync configurations across systems.


## Setting up my dotfiles

### 1. Centralized Repository
I’ve set up a private Git repository to store my dotfiles. The repository mirrors the structure of my home directory, ensuring Stow can create symlinks seamlessly. Here’s an example of how I organize configurations for tools like Zsh, Git, Tmux, and Vim (truncated for simplicity):

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

One of the great features of GNU Stow is that it allows me to selectively apply configurations to each machine. Even though my dotfiles repository may contain multiple folders for different tools (e.g., Zsh, Tmux, Vim), I can choose exactly which configurations to apply to the current machine.

For example, to apply my Zsh setup I can use the `stow` command as follows:

```bash
stow --target=/home/username zsh
```

This creates symlinks in my home directory for all Zsh-related files, including `.zshrc` and files within `.config`.
If I add new files or update configurations, I can restow the directory to apply changes:

```bash
stow -R zsh
```
This unstows and re-stows the configuration, ensuring everything is up-to-date and removing obsolete symlinks.

### 3. Uninstalling configurations

To remove a configuration, like Zsh, I run:

```bash
stow -D zsh
```
This deletes all symlinks for Zsh from my home directory without affecting the files in my repository, so I can reapply them anytime.

## Pro-tip: Simplify with  `.stowrc`

By default, Stow creates symlinks in your current directory unless you specify a target using the `--target` option. To avoid typing `--target=$HOME` every time, I created a `.stowrc` file in my repository with this content:

```bash
--target=$HOME
```

Now, Stow automatically uses my home directory as the target. And you can use Stow + Git to track it.

## Synchronization with Git

Version-controlling dotfiles with Git adds several advantages:
- **Track Changes**: I can see every tweak I’ve made over the years and roll back if needed.
- **Consistent Syncing**: I push changes to a private remote repository, allowing me to pull configurations onto new machines effortlessly.
- **Cross-Platform**: Works seamlessly on both Linux and macOS, making it ideal for syncing between my personal laptop, home server, and work Mac.

For instance, when I started using macOS at work, I cloned my dotfiles repository, ran `stow zsh`, and instantly had my Zsh setup, aliases, and Oh My Posh theme ready to go.

## Additional use cases for Stow

While I primarily use Stow for dotfiles, it can manage any software or files that require consistent symlinking. Some examples include:
- Keeping scripts or binaries in a `bin` directory and linking them to `$PATH`.
- Managing custom configuration directories for tools like Docker or Kubernetes.
- Experimenting with multiple versions of configuration files without overwriting existing ones.

## Why this workflow works

This setup has transformed how I manage configurations. Here’s why:
- **Centralized Management**: All my configurations are stored in one place, simplifying updates and backups.
- **Seamless Syncing**: Using Stow and Git, I keep consistent environments across machines with minimal effort.
- **Version History**: Over five years, I’ve tracked every change to my dotfiles, giving me a clear record of my experiments and optimizations.
- **Cross-Platform Compatibility**: Whether on Linux or macOS, this workflow ensures my tools are always configured the way I need.


Using **GNU Stow** and **Git** has been a game-changer for managing dotfiles. It simplifies configuration management, ensures consistency across systems, and provides a history of every tweak I’ve made. Whether setting up a new machine or experimenting with configurations, this workflow saves time and effort, letting me focus on what matters most: building and problem-solving.