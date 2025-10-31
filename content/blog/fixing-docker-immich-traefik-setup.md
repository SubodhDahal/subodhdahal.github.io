---
title: "Fixing my broken Docker Immich+Traefik setup"
description: "Photo indexing and other jobs failed in my Immich+Traefik setup. Turns out I'd misconfigured my Docker networking with Traefik. Here's how I figured it out and what I changed."
image: /images/broken-docker-network.png
alt: "Depiction of broken docker networking"
postDate: 2025-10-31
tags:
  - homelab
  - networking
---

I've used [Immich](https://github.com/immich-app/immich) for over a year in my homelab. Immich is a photo and video app like Google Photos or iCloud, but it's self-hosted. The photos stay on my own hardware. It's open source, has no fees, and no company uses my photos to train models.

Until recently, Immich was in beta. Things break in beta. That's kind of the point. I had this problem where new pictures and videos added to my external library weren't indexed, and metadata wasn't extracted for many of these assets. I chalked it up to beta bugs and moved on.

Immich hit a stable version. Kudos to the team and contributors for the release. It's a great alternative to paid platforms.

After the stable release, I pulled the latest version. I hoped it would fix my issues. Indexing worked for a while, then stopped. None of the jobs seemed to work. I looked for open issues but found none that matched mine. Then it occurred to me that the issue might not be in Immich itself. Maybe my setup was the problem.

## The Setup

I run Immich and all its services on an Ubuntu VM with Docker Compose. I followed the [official install guide](https://docs.immich.app/install/docker-compose) to set them up.

I set up [Traefik](https://doc.traefik.io/traefik/) as a reverse proxy for Immich, using the [tutorial from Jim's Garage](https://www.youtube.com/watch?v=CmUzMi5QLzI). Traefik gives me domain access to services, so I don't have to remember IP addresses and ports. The services stay on my home network, but I can reach them at an easy address like `https://photos.home.mydomain.com`

All I had to do was add a proxy network and Traefik labels to the services. A quick check showed I could access my photos and videos, so I assumed it all worked.

It turns out not everything was.

## The Issue

I connected all services to the same proxy network. One network, everything talks to everything. What could go wrong, right?

Immich could connect to Postgres and fetch data on already indexed photos and videos. Redis, though, didn't receive any jobs. As a result, background jobs like library scans never started.

To isolate the issue, I commented out the proxy network on all services. I then accessed Immich at `<server ip>:<immich-server port>`. Rescanning the external libraries worked. I could see the new media in my Immich timeline.

I'm still not sure why, but I suspect a timing issue. The proxy network's DNS wasn't ready when Immich started. Some connections worked by luck or retry logic. Others failed and never recovered. Redis happened to be one that failed.

## The Fix

I split the setup into two networks:
1. **Internal network**: database, Redis, the machine learning engine, and Immich talk here
2. **Proxy network**: only the Immich server connects here so Traefik can route to it

Here's a short version of my new `docker-compose.yml` file:

```
services:
    immich-server:
        image: immich:latest
        networks:
        - internal # Talk to database, Redis, etc.
        - proxy    # Accessible via Traefik
        labels:
        - "traefik.enable=true"
        - "traefik.docker.network=proxy"
        - "traefik.http.routers.immich.rule=Host(`photos.home.mydomain.com`)"
        - "traefik.http.services.immich.loadbalancer.server.port=3001"

    immich-machine-learning:
        networks:
        - internal

    database:
        networks:
        - internal

    redis:
        networks:
        - internal

    networks:
        internal:
        driver: bridge
        proxy:
        external: true
```

The `traefik.docker.network=proxy` label tells Traefik which network to use for routing.

## How It Works

Compose creates the internal network fresh, so DNS always works. When Immich sends jobs to Redis or reads from Postgres, names resolve fast. Traffic from Traefik arrives on the proxy network instead. Both networks reach the same containers through different paths, so the timing issues vanish.

Now photo indexing and all the other jobs work as intended.
