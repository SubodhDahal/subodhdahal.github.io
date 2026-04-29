---
title: "Self-Hosting my Git forge with Forgejo"
description: Why I moved away from GitHub and chose a lightweight, community-driven alternative
image: /images/self-hosting-git-forge.png
alt: Self-hosting my git forge
postDate: 2026-04-29
tags:
  - Homelab
  - Open source
  - Self-hosting
  - Workflow
---

For years, GitHub held all my personal Git repos. It worked fine. I used it with friends during my bachelor's and master's studies. But over time it felt less like a tool and more like a service that just put up with me.

GitHub has had its share of problems lately. Repos scanned for AI training unless you opt out, outages, and [Git history rewritten after merging pull requests](https://github.blog/news-insights/company-news/an-update-on-github-availability/) are a few examples.

What pushed me to self-host was my unease with data on servers whose terms can change anytime. That's the thinking behind most of what I self-host. I run my own reading feed, my own photo library, and now my own Git forge. It's not the easy path, but ownership and privacy are worth the effort.

## Why Not GitLab?

[GitLab](https://gitlab.com) was the obvious first thing to look at. I've used it at work for years and it's solid. But it's built for teams and companies, and that shows in the resources it needs. Running it at home means a platform that needs gigabytes of RAM for things I'd never use. My small NUC runs other services and couldn't handle it.

## Why Forgejo?

[Forgejo](https://forgejo.org) is a lightweight, self-hosted Git forge from [Codeberg e.V.](https://codeberg.org/Codeberg/org), a non-profit. It's written in Go. It runs as one binary that fits in a few hundred megabytes of RAM.

What I use day to day:

- **Repository hosting:** that's mainly what I need it for and it does the job well.
- **Container registry:** there's a built-in registry for container images. I push Docker images straight to my own instance.
- **[Forgejo Actions](https://forgejo.org/docs/latest/user/actions/):** my projects use Actions to build the container image and push it to the registry. On the VM where I run my personal services, the `docker-compose` files point to my Forgejo registry directly. The syntax is close to GitHub Actions, and the whole flow from code to running container stays inside my homelab.
- **Pull mirrors:** for repos that still live on GitHub, Forgejo syncs them on a schedule. It's a simple way to keep a local copy without changing the current setup.

I'm also hosting forks of a few open source projects I've tweaked. Those get built and pushed to my own registry too.

I don't use issue tracking, pull requests, or wikis yet. They're there if I need them.

## How It's Running

Forgejo runs on a NUC at home, inside an Ubuntu VM on Proxmox, alongside a few other core services. I only access it over my home network. I could route it through Tailscale to get in when I'm away, but I haven't felt the need yet.

Getting Forgejo Actions to work with the Traefik proxy took a few tries. The Docker build steps took a while too. After that, it has worked without issues for more than 3 months.

## Backups

One thing I didn't want to skip on was backups. Forgejo has a built-in `forgejo dump` command. It packs up the repos, config, and attachments into an archive. I run a daily cronjob with this command. I also dump the Postgres database on its own. Both get pushed to my NAS.

## Migrating from GitHub

The move went better than I expected. Forgejo has a built-in import tool that pulls everything from a GitHub repo: code, issues, pull requests, and history. You just give it the repo URL and a GitHub token.

I put my old projects into an organization of their own on my Forgejo instance, away from my main account. I'm not actively working on them, but they're there if I ever need to look something up.

I also finally found a place for my Logseq notes, now stored in Git. Since I own the server, I don't worry about someone else having access to them.

I still use GitHub where it makes sense. My personal website runs on GitHub Pages at no cost, so that repo stays there. I use Forgejo's pull mirror to sync it to my instance on a schedule. That way I always have a local copy without changing the setup. Most open source projects are on GitHub, so it's still where I go when I want to contribute to something.

## Takeaway

The setup was simple, upkeep is low, and pushing code to my own server feels good.
