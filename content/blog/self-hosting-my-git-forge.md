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

For years, GitHub was where I kept all my personal Git repositories. It worked fine. I even used it to collaborate with friends during my bachelor's and master's studies. But somewhere along the way it started feeling less like a tool and more like a service I was just tolerated on.


There have been some notable issues and controversies around GitHub recently. Having to opt out of private repositories being scanned for AI training, degrading availability, and [Git history being wrongly rewritten after merging pull requests](https://github.blog/news-insights/company-news/an-update-on-github-availability/) are among some of them.

The biggest thing that prompted me to look for a self-hosted alternative was the general unease of personal data sitting somewhere with terms that can quietly change. That's more or less the thinking behind most of what I self-host. I run my own reading feed, my own photo library, and now my own Git forge. It's not the easier path but I believe ownership and privacy are worth the upfront effort.

## Why Not GitLab?

[GitLab](https://gitlab.com) was the obvious first thing to look at. I've used it professionally for years and it's solid. But it's built for teams and enterprises, and the resource usage reflects that. Running it at home means standing up a platform that wants gigabytes of RAM for things I'd never use, and my modest NUC running other services wouldn't be able to handle it.

## Why Forgejo?

[Forgejo](https://forgejo.org) is a lightweight, self-hosted Git forge run by [Codeberg e.V.](https://codeberg.org/Codeberg/org), a non-profit. It's written in Go, ships as a single binary, and sits comfortably in a few hundred megabytes of RAM.

What I actually use day-to-day:

- **Repository hosting:** That's mainly what I need it for and it does the job well.
- **Container registry:** Forgejo has a built-in OCI-compatible package registry. I push Docker images straight to my own instance.
- **[Forgejo Actions](https://forgejo.org/docs/latest/user/actions/):** For several of my projects, Actions builds the container image and pushes it to the registry. On the VM where I run my personal services, the `docker-compose` files point to my Forgejo registry directly. The syntax is close enough to GitHub Actions, and the whole workflow from code to running container stays inside my homelab.
- **Pull mirrors:** For repositories that still live on GitHub, Forgejo automatically syncs them on a schedule. It's a simple way to keep a local copy without changing the existing deployment setup.

I'm also hosting forks of a few open source projects I've tweaked. Those get built and pushed to my own registry too.

I don't use issue tracking, pull requests, or wikis yet but they are available if I need them. 

## How It's Running

Forgejo runs on a NUC at home, inside an Ubuntu VM on Proxmox, alongside a few other core services. I only access it over my home network. I could route it through Tailscale to access when I'm away but haven't felt the need yet.

Getting Forgejo Actions to run properly with the Traefik proxy and getting the build steps with Docker took a bit of trial and error. But after getting it set up, it has been working without issues for more than 3 months.

## Backups

One thing I didn't want to skip on was backups. Forgejo has a built-in `forgejo dump` command that packages up the repositories, configuration, and attachments into a single archive. I run a daily cronjob with this command alongside a separate dump of the Postgres database, and both get pushed to my NAS.

## Migrating from GitHub

The migration was easier than I expected. Forgejo has a built-in importer which pulls everything from a Github repository(code, issues, pull requests, collaboration history) by just providing it the repository URL and a GitHub personal access token.

I put my old projects to a dedicated organization on my Forgejo instance now, separate from my main account. I'm not actively working on them, but they're there if I ever need to look something up.

I also finally found a place where I could store my version-controlled personal Logseq notes. Since I own the infrastructure, I am not worried about someone else having access to them.

I still use GitHub where it makes sense. My personal website is deployed via GitHub Pages for free, so that repository stays there. I use Forgejo's pull mirror feature to automatically sync it to my instance, so I always have a local copy without changing the deployment setup. And since most open source projects are on GitHub, it's still where I go when I want to contribute to something.

## Takeaway

The setup was not complicated, the maintenance overhead is low, and there's something very satisfying about pushing code to my own infrastructure.
