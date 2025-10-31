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

I have been using [Immich](https://github.com/immich-app/immich) for over a year in my homelab. Immich is a photo and video management platform similar to Google Photos or iCloud Photos, but it is self-hosted. This means I own and control all data. It is open-source, runs on my own infrastructure, no subscriptions, and no company uses my family photos to train models.

Until recently, Immich was in beta. Things break in beta. That's kind of the point. I had this problem where new pictures and videos added to my external library weren't being indexed, and metadata wasn't extracted for many of these assets. I chalked it up to active development and moved on.

Immich hit stable version recently. Kudos to the team and the contributors for making it happen and giving us a great alternative to proprietary platforms.

After learning about the stable release, I pulled the latest version hoping that the issues I was facing would be fixed. Unfortunately, my photos and videos still weren't being indexed after a certain point and none of the jobs seem to work. I looked for pending issues but found none that match my problem. Then it occurred to me that maybe the issue wasn't in Immich itself. Maybe it was my setup.

## The Setup

I'm running Immich and all related services on my homelab on an Ubuntu VM using Docker Compose, mostly following the [official documentation](https://docs.immich.app/install/docker-compose).

At some point in the past, I had introduced [Traefik](https://doc.traefik.io/traefik/) as a reverse proxy for Immich, following the [tutorial from Jim's Garage](https://www.youtube.com/watch?v=CmUzMi5QLzI). Traefik gives me domain-based access to services instead of me having to remember the IP address and port number for them. The services are still accessible only on my home network, but I can reach them using an easy-to-remember address like `https://photos.home.mydomain.com`

All I had to do was add a proxy network to the services and some Traefik labels to specify the domain. A quick check had shown that I could access my previous photos and videos correctly, so I assumed everything was working.

But it turns out not everything was.

## The Issue

I had connected every service to the same proxy network. One network, everything talks to everything. What could go wrong, right?

Immich could connect to Postgres just fine and retrieve data about previously indexed photos and videos. Redis, though, wasn't receiving any jobs which caused the asynchrounous background tasks like scanning libraries to not be initiated at all.

To try to isolate the networking issue, I commented out the proxy network usage for all services and accessed immich using `<server ip>:<immich-server port>`. Running the job for rescanning external libraries worked as intended and I could see the new media in my Immich timeline.

I still am not 100% sure of the reason but I suspect it to be a timing issue. The external proxy network's DNS wasn't ready when Immich started up. Some connections succeeded by luck or retry logic. Others failed and never recovered. Redis happened to be one that failed.

## The Fix

I split the setup into two networks:
1. **Internal network**: Database, Redis, Immich machine learning engine, and Immich all communicate here
2. **Proxy network**: Only Immich server connects here so Traefik can route to it

Here's a simplified version of my new `docker-compose.yml` file:

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

The `traefik.docker.network=proxy` label tells Traefik which network to actually use for routing.

## How It Works

The internal network is created fresh, so DNS setup is guaranteed to work. When Immich needs to send jobs to Redis or read from Postgres, the names resolve consistently and quickly. External traffic from Traefik arrives on the proxy network instead. Both networks point to the same containers but through different paths, so the timing issues disappear.

Now the indexing of photos and all the other jobs, e.g.. extracting metadata, creating thumbnails work as intended.
