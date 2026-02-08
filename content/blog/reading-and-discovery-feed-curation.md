---
title: "Curating my own reading and discovery feed with RSS"
description: Taking concrete steps away from algorithms using FreshRSS, self-hosted tools, and a pipeline built for me.
image:  /images/reading-feed-curation.png
alt: Shaping my personal reading content flow
postDate: 2026-02-08
tags:
  - Homelab
  - Open source
  - Self-hosting
  - Workflow
---

For quite some time, I have wanted to rely less on algorithmically curated feeds. The daily scroll through YouTube, Substack, or LinkedIn felt less like discovery and more like dopamine mining. I wanted a system that delivered interesting content to satisfy my curiosity, without platforms whose best interest is to have me glued to them. These days, finding such a platform is tough. Even if one exists now, there's no guarantee it won't eventually mimic the ones I wanted to get away from.

I wanted a system where I subscribe directly to creators or communities sharing content I like. That's exactly what a feed reader does. It pulls content chronologically from blogs and sites that support RSS/Atom feeds, with no middleman filtering or recommending. 

There are a few feed reader platforms, but I wanted to have full data ownership and more control over the system. This is why I decided to self-host [FreshRSS](https://github.com/FreshRSS/FreshRSS), an open-source feed aggregator and reader, on my homelab running on a mini-PC. This also has the added advantage of being resilient compared to an online service which may stop existing for reasons beyond my control.

## Feed sources

Rather than relying on algorithms of platforms to decide which content they want to show me, I now subscribe to content from sources where I have found interesting writings before. I categorize the content sources broadly into the following:

- Communities: There's many interesting posts being shared on communities like Hacker News RSS, Lobsters, Lemmy. I started by directly subscribing to their content RSS feed. But the number of posts was overwhelming. So I now use [hnrss.com](https://hnrss.github.io/) and [upvote-rss](https://github.com/johnwarne/upvote-rss) to get only the top posts from them.
- Personal Blogs: If a post catches my eye, I check the author’s site and subscribe to their personal RSS feed if they have other content that I also find interesting.
- Substack: I subscribe to a creator's publication directly by using their Substack URL.
- Websites without RSS: Not all websites provide RSS/Atom feeds. Luckily, there's an open-source and self-hostable project called [RSSHub](https://github.com/DIYgod/RSSHub) which can generate RSS feeds for many popular websites. It acts as a bridge between my FreshRSS instance and those websites. It also has a browser extension companion: [RSSHub-Radar](https://github.com/DIYgod/RSSHub-Radar) to easily find and subscribe to RSS feeds.
- Newsletters: Previously, I had subscribed to many newsletters on my personal email. This made my email inbox messy and it felt like a chore to go and read there. I now use [Kill the Newsletter!](https://kill-the-newsletter.com/) which provides an email address to subscribe to these newsletters. It generates an Atom feed which I can subscribe to in FreshRSS. This has the benefit of keeping my inbox clean and also consolidating all my reading into a single application.
- Youtube Channels: Yes, I can directly subscribe to Youtube channels from FreshRSS and get any new uploads from the channel directly into FreshRSS.

<figure class="w-full image">
  <iframe class="w-full" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="/images/freshrss-ui.png" style="border: 1px solid black"></iframe>
  <figcaption>This is how my FreshRSS looks like</figcaption>
</figure>

Since FreshRSS is an aggregator, I don't necessarily need to use the FreshRSS interface to access my feed. There are many applications for different platforms which can use FreshRSS as the source for the feeds. I use the Readrops app on my phone. I have occasionally used the NetNewsWire app on MacOS.

## Filtering my feed

Some newsletters I subscribe to, like those covering AI news, have a short shelf life. If I haven't read them within a month, the content is usually stale and there is little point in me reading them. That's why I've set up the `-pubdate:P30D` filter to automatically mark them as read.

FreshRSS also allows me to automatically mark incoming content as read if it matches some conditions that I set. For example: I am following a Youtube channel for content on Go programming language. But the creator also posts videos on Rust, which I am not interested in at the moment. So I've set a filter `-intitle:" Rust:"` for the channel which automatically marks videos that have " Rust" in the title as read so it doesn't show up on my feed.

Despite these filters, I have a lot of unread posts in FreshRSS. I initially felt the ["phantom obligation"](https://www.terrygodier.com/phantom-obligation) to reach "inbox zero" with my feeds. Now, I accept that most of those articles are timeless. They'll still be valuable whenver I get to them, so there's no need to rush.

## Extending and customizing FreshRSS

FreshRSS is not the only self-hostable feed aggregator. The main reason I chose it is because of its support for extensions which allows for augmenting its functionality. The ones I find useful are:

- Youlag: Better interface for Youtube videos than the default view
- Af_Readability: Inlines full article content for sites that only show excerpts in feeds.
- Karakeep Button: Saves interesting posts directly to my Karakeep instance for long-term storage.

There's a lot more extensions which can be browsed in the [official repository](https://github.com/FreshRSS/Extensions).

## Conclusion

After migrating to this setup, I am reading more in-depth content than what I did before. I've discovered authors sharing valuable perspectives on topics I find interesting that are not within the current hype-cycle. It's also refreshing to follow the creators whose writing feels like the pre-SEO, pre-marketing, pre-AISlop internet.

I still haven't completely stopped randomly browsing YouTube or LinkedIn, but my default way of finding new content is now the feed reader.
